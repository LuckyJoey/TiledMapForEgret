/**
 * 地图类mwt 2020.03.25
 */
class TiledMap 
{
	private static _instance: TiledMap;
      public static get Instance(): TiledMap {
        if(this._instance == null) {
            this._instance = new TiledMap();
        }
        return this._instance;
    }
	private mapContainer;
	private url:string;
    private request:egret.HttpRequest;
	private tmxTileMap: tiled.TMXTilemap;
	public get TmxTileMap(): tiled.TMXTilemap
	{
		return this.tmxTileMap;
	}
	private renderOffset;//渲染区域单边偏移值-由实际地图决定
	private renderWidth:number;
	private renderHeight:number;
	private initMapPointX:number;
	private initMapPointY:number;
	private blockIndex:number;//不能穿越区块层-由实际地图决定
	private playerIndex:number;//角色所在层级index-由实际地图决定
    private maplayers:tiled.TMXLayer[]=[];//整块地图-所有层级
    private data;
    private rectX:number;//渲染区域原点坐标x
    private rectY:number;//渲染区域原点坐标y
	/*加载地图*/
	public LoadMap(mapContainer:egret.DisplayObjectContainer,url:string):void
	{
		this.mapContainer = mapContainer;
        /*初始化资源加载路径*/
        this.url = url;
        /*初始化请求*/
        this.request = new egret.HttpRequest();
		//console.log("地图开始加载:"+TimeMgr.Instance.NowTime)
        /*监听资源加载完成事件*/
        this.request.once( egret.Event.COMPLETE,this.onMapComplete,this);
        /*发送请求*/
        this.request.open(this.url,egret.HttpMethod.GET);
        this.request.send();
	}
	 /*地图加载完成*/
    private onMapComplete(event:egret.Event) {
		//console.log("地图数据开始解析:"+TimeMgr.Instance.NowTime)
        /*获取到地图数据*/
        this.data = egret.XML.parse(event.currentTarget.response);
		//console.log("地图数据解析完成:"+TimeMgr.Instance.NowTime)
        /*初始化地图*/
		this.InitMapData();
        this.UpdateTiledMapRender();
		this.InitMapPoint();
    }
	//初始化地图数据
	private InitMapData():void
	{
		this.initMapPointX=800;
		this.initMapPointY=600;
		this.renderOffset=100;
		this.blockIndex=2;
		this.playerIndex=3;
		this.rectX=this.initMapPointX;
        this.rectY=this.initMapPointY;
		this.renderWidth = GameData.stageWidth + this.renderOffset * 2;
		this.renderHeight = GameData.stageHeight + this.renderOffset * 2;
	}
	//初始化地图坐标
	private InitMapPoint():void
	{
		 this.maplayers.forEach((layer:tiled.TMXLayer,i)=>{
			layer.x = -this.rectX -	this.renderOffset;
			layer.y = -this.rectY -	this.renderOffset;
        });
	}
	 //更新地图渲染
    private UpdateTiledMapRender()
    {
        this.SetPlayerParent(this.mapContainer.stage,0);
        if(this.tmxTileMap!=null)
        {
            this.tmxTileMap.destory();
            this.tmxTileMap=null;
        }
		//console.log("地图开始解析:"+TimeMgr.Instance.NowTime)
        this.tmxTileMap = new tiled.TMXTilemap(this.rectX,this.rectY,this.renderWidth, this.renderHeight, this.data, this.url);
		this.tmxTileMap.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE,()=>
			{
				//console.log("地图解析完成："+TimeMgr.Instance.NowTime)
			},this)
        this.tmxTileMap.render();
        /*将地图添加到显示列表*/
        this.mapContainer.addChild(this.tmxTileMap);

        this.tmxTileMap.touchEnabled = true;

        this.maplayers.forEach(( layer:tiled.TMXLayer,i)=>{
            this.maplayers.pop();
        });
        // 获取地图所有图形层
        this.tmxTileMap.getLayers().forEach(
            (layer:tiled.TMXLayer,i)=>
            {
                //console.log("layer:"+layer.name+",layerIndex:"+i);
                this.maplayers.push(layer)
            });
        //获取所有对象    
        this.tmxTileMap.getObjects().forEach((obj,i)=>
            {
                // let group:tiled.TMXObjectGroup = obj as tiled.TMXObjectGroup;
                // console.log("obj:"+group.name+"_group.getObjectCount:"+group.getObjectCount());
            });
        this.SetPlayerParent(this.tmxTileMap,this.playerIndex);
    }
	private oldmirrorRectX:number=-100000;
    private oldmirrorRectY:number;
	private mirrorRectX:number;
    private mirrorRectY:number;
    private tiledPointArray:egret.Point[]=[];
    //移动地图
    public TiledMapMove(x:number,y:number)
    {
        if(!this.VerifyTiledMapMove(x,y))return;
        this.rectX += x;
        this.rectY += y;
        this.mirrorRectX = -this.rectX;
        this.mirrorRectY = -this.rectY;
		//地图位置偏移校验并矫正
        if(this.mirrorRectX>=0)
        {
            this.mirrorRectX=0;
            this.rectX=0;
        }
        if(this.mirrorRectY>=0)
        {
            this.mirrorRectY=0;
            this.rectY=0;
        }
        if(this.mirrorRectX<=GameData.stageWidth-this.tmxTileMap.width)
        {
            this.mirrorRectX = GameData.stageWidth-this.tmxTileMap.width;
            this.rectX = -this.mirrorRectX;
        }
        if(this.mirrorRectY<=GameData.stageHeight-this.tmxTileMap.height)
        {
            this.mirrorRectY = GameData.stageHeight-this.tmxTileMap.height;
            this.rectY = -this.mirrorRectY;
        }
		if(this.oldmirrorRectX==-100000)
		{
			this.oldmirrorRectX = this.mirrorRectX;
			this.oldmirrorRectY = this.mirrorRectY;
		}
		//渲染并移动地图
        this.UpdateTiledMapRender();
        this.maplayers.forEach((layer:tiled.TMXLayer,i)=>{
			layer.x = this.oldmirrorRectX-this.renderOffset;
			layer.y = this.oldmirrorRectY-this.renderOffset;
			egret.Tween.get(layer).to({x:this.mirrorRectX-this.renderOffset,y:this.mirrorRectY-this.renderOffset}, PlayerCtrl.Instance.speed);
        });
		this.oldmirrorRectX = this.mirrorRectX;
		this.oldmirrorRectY = this.mirrorRectY;
    }
	//校验是否可以移动-校验角色四个顶点是否触碰不可行走格子
    private VerifyTiledMapMove(x:number,y:number):boolean
    {
        let gid:number=0;
        let tiledX = PlayerCtrl.Instance.player.pointX + this.rectX+this.renderOffset +x;
        let tiledY = PlayerCtrl.Instance.player.pointY + this.rectY+this.renderOffset +y;
        this.tiledPointArray.push(new egret.Point(tiledX-PlayerCtrl.Instance.player.width/2, tiledY - PlayerCtrl.Instance.player.height/2));
        this.tiledPointArray.push(new egret.Point(tiledX-PlayerCtrl.Instance.player.width/2, tiledY + PlayerCtrl.Instance.player.height/2));
        this.tiledPointArray.push(new egret.Point(tiledX+PlayerCtrl.Instance.player.width/2, tiledY - PlayerCtrl.Instance.player.height/2));
        this.tiledPointArray.push(new egret.Point(tiledX+PlayerCtrl.Instance.player.width/2, tiledY + PlayerCtrl.Instance.player.height/2));
        for(let i=this.tiledPointArray.length-1;i>=0;i--)
        {
            let id:number= this.maplayers[this.blockIndex].getTileId(this.tiledPointArray[i].x,this.tiledPointArray[i].y);
            gid+=id;
            this.tiledPointArray.pop();
        }
        return gid==0;
    }
    //设置角色父物体
    private SetPlayerParent(parent:egret.DisplayObjectContainer,index:number)
    {
        if(PlayerCtrl.Instance.player.body==null)return;
        parent.addChildAt(PlayerCtrl.Instance.player.body,index);
    }
}
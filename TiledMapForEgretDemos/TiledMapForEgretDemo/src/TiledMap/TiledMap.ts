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
    private loadMapCompleteFun:Function;
	public get TmxTileMap(): tiled.TMXTilemap
	{
		return this.tmxTileMap;
	}
	private renderOffset;//渲染区域单边偏移值-由实际地图决定
	private renderWidth:number;
	private renderHeight:number;
	private initMapPointX:number;//地图初始坐标x
	private initMapPointY:number;//地图初始坐标y
    private obstacleLayerIndexs:number[];//障碍层索引
    private maplayers:tiled.TMXLayer[]=[];//整块地图-所有层级
    private data;
    private rectX:number;//渲染区域原点坐标x
    private rectY:number;//渲染区域原点坐标y
	/*加载地图*/
	public LoadMap(mapContainer:egret.DisplayObjectContainer,url:string,LoadMapCompleteFun:Function):void
	{
        this.loadMapCompleteFun = LoadMapCompleteFun;
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
        if(this.loadMapCompleteFun)
        {
            this.loadMapCompleteFun();
        }
    }
	//初始化地图数据
	private InitMapData():void
	{
		this.initMapPointX=TiledMapData.initMapPointX;
		this.initMapPointY=TiledMapData.initMapPointY;
		this.renderOffset=TiledMapData.renderOffset;
		this.obstacleLayerIndexs=TiledMapData.obstacleLayerIndexs;
		this.rectX=this.initMapPointX;
        this.rectY=this.initMapPointY;
		this.renderWidth = GameData.stageWidth + this.renderOffset * 2;
		this.renderHeight = GameData.stageHeight + this.renderOffset * 2;
	}
	//初始化地图坐标
	private InitMapPoint():void
	{
        this.tmxTileMap.x = -this.rectX -	this.renderOffset;
        this.tmxTileMap.y = -this.rectY -	this.renderOffset;
	}
	 //更新地图渲染
    private UpdateTiledMapRender()
    {
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
        this.maplayers.splice(0);
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
     
    }
	private oldmirrorRectX:number=-100000;
    private oldmirrorRectY:number;
	private mirrorRectX:number;
    private mirrorRectY:number;
    private tiledPointArray:egret.Point[]=[];
    private moveSpeed:number=200;
    //移动地图
    public TiledMapMove(x:number,y:number,moveSpeed:number=200)
    {
        this.moveSpeed = moveSpeed;
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
        if(this.mirrorRectX<=GameData.stageWidth-this.tmxTileMap.width+this.renderOffset*2)
        {
            this.mirrorRectX = GameData.stageWidth-this.tmxTileMap.width+this.renderOffset*2;
            this.rectX = -this.mirrorRectX;
        }
        if(this.mirrorRectY<=GameData.stageHeight-this.tmxTileMap.height+this.renderOffset*2)
        {
            this.mirrorRectY = GameData.stageHeight-this.tmxTileMap.height+this.renderOffset*2;
            this.rectY = -this.mirrorRectY;
        }
		if(this.oldmirrorRectX==-100000)
		{
			this.oldmirrorRectX = this.mirrorRectX;
			this.oldmirrorRectY = this.mirrorRectY;
		}
		//渲染并移动地图
        this.UpdateTiledMapRender();
        this.tmxTileMap.x = this.oldmirrorRectX-this.renderOffset;
        this.tmxTileMap.y = this.oldmirrorRectY-this.renderOffset;
        egret.Tween.get(this.tmxTileMap).to({x:this.mirrorRectX-this.renderOffset,y:this.mirrorRectY-this.renderOffset}, this.moveSpeed);
		this.oldmirrorRectX = this.mirrorRectX;
		this.oldmirrorRectY = this.mirrorRectY;
    }
    private tiled:tiled.TMXTile;
    /**
     * 校验角色是否碰撞障碍层
     * @param moveX 移动x
     * @param moveY 移动y
     * @param playerWidth 角色宽
     * @param playerHeight 角色长
     * @param playerX 角色坐标x
     * @param playerY 角色坐标y
     */
    public VerifyObstacleTiled(moveX:number,moveY:number,playerWidth:number,playerHeight:number,playerX:number,playerY:number):tiled.TMXTile
    {
        this.tiled=null;
        let tiledX = playerX +moveX;
        let tiledY = playerY +moveY;
        this.tiledPointArray.push(new egret.Point(tiledX-playerWidth/2, tiledY - playerHeight/2));
        this.tiledPointArray.push(new egret.Point(tiledX-playerWidth/2, tiledY + playerHeight/2));
        this.tiledPointArray.push(new egret.Point(tiledX+playerWidth/2, tiledY - playerHeight/2));
        this.tiledPointArray.push(new egret.Point(tiledX+playerWidth/2, tiledY + playerHeight/2));
        for(let i=this.tiledPointArray.length-1;i>=0;i--)
        {
            if(!this.tiled)
            {
                for(let j=0;j<this.obstacleLayerIndexs.length;j++)
                {
                    this.tiled = this.maplayers[this.obstacleLayerIndexs[j]].getTile(this.tiledPointArray[i].x,this.tiledPointArray[i].y);
                }
            }
        }
        this.tiledPointArray.splice(0);
        return this.tiled;
    }
    /**
     * mark:2020.04.01
     * 地图编辑器中可对单个格子添加自定义属性(比如障碍属性，关于障碍属性，通过设置障碍层判断，计算复杂度更小)
     * tiled.d.ts接口中暂未找到获得格子自定义属性的方法，可能要改tiled.js源码
     * let tiledset:tiled.TMXTileset = this.tiled.tileset;
     * tiledset.firstgid
     * this.tiled.tileset.getSpecialTileDataByTileId(11))
     */
}
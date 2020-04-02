class GameSceneUI extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
        this.addChild(TiledMapContainer.Instance.Init("resource/cute.tmx",()=>{this.LoadMapCompleteFun()}));
		this.TestBtn();
	}
	private LoadMapCompleteFun():void
	{
		PlayerCtrl.Instance.CreatePlayer();
	}
    private TestBtn():void
    {
        let btnLeft=new eui.Button();
        btnLeft.label="left"
        this.addChild(btnLeft);
        btnLeft.x=100;
        btnLeft.y=100;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{PlayerCtrl.Instance.PlayerMove(-50,0)},this )
        //console.log("zindex:"+btnLeft.zIndex)
        let btnRight=new eui.Button();
        btnRight.label="right"
        this.addChild(btnRight);
        btnRight.x=100;
        btnRight.y=200;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{PlayerCtrl.Instance.PlayerMove(50,0)},this )
        //console.log("zindex:"+btnRight.zIndex)
        let btnDown=new eui.Button();
        btnDown.label="down"
        this.addChild(btnDown);
        btnDown.x=100;
        btnDown.y=300;
        btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{PlayerCtrl.Instance.PlayerMove(0,50)},this )
        //console.log("zindex:"+btnDown.zIndex)
        let btnUp=new eui.Button();
        btnUp.label="up"
        this.addChild(btnUp);
        btnUp.x=100;
        btnUp.y=400;
        btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{PlayerCtrl.Instance.PlayerMove(0,-50)},this )
    }
}
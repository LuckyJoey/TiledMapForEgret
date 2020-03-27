class GameScene extends egret.DisplayObjectContainer {

    private url:string;
    private request:egret.HttpRequest;
    public constructor() {
        super();
        this.CreatePlayer();
        TiledMap.Instance.LoadMap(this,"resource/cute.tmx");
    }

    //创建角色
    private CreatePlayer()
    {
        PlayerCtrl.Instance.player.body = new eui.Image();
        PlayerCtrl.Instance.player.body.source = "640_jpg"
        PlayerCtrl.Instance.player.width=100;
        PlayerCtrl.Instance.player.height=100;
        PlayerCtrl.Instance.player.body.name="player";
        this.addChildAt(PlayerCtrl.Instance.player.body,2);
        PlayerCtrl.Instance.player.body.anchorOffsetX=50;
        PlayerCtrl.Instance.player.body.anchorOffsetY=50;
        //角色固定在屏幕某点
        PlayerCtrl.Instance.player.pointX = 360;
        PlayerCtrl.Instance.player.pointY = 850;
    }
   

}
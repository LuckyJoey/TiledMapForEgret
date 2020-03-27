var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.CreatePlayer();
        TiledMap.Instance.LoadMap(_this, "resource/cute.tmx");
        return _this;
    }
    //创建角色
    GameScene.prototype.CreatePlayer = function () {
        PlayerCtrl.Instance.player.body = new eui.Image();
        PlayerCtrl.Instance.player.body.source = "640_jpg";
        PlayerCtrl.Instance.player.width = 100;
        PlayerCtrl.Instance.player.height = 100;
        PlayerCtrl.Instance.player.body.name = "player";
        this.addChildAt(PlayerCtrl.Instance.player.body, 2);
        PlayerCtrl.Instance.player.body.anchorOffsetX = 50;
        PlayerCtrl.Instance.player.body.anchorOffsetY = 50;
        //角色固定在屏幕某点
        PlayerCtrl.Instance.player.pointX = 360;
        PlayerCtrl.Instance.player.pointY = 850;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map
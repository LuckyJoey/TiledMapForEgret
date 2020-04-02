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
var GameSceneUI = (function (_super) {
    __extends(GameSceneUI, _super);
    function GameSceneUI() {
        return _super.call(this) || this;
    }
    GameSceneUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameSceneUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.addChild(TiledMapContainer.Instance.Init("resource/cute.tmx", function () { _this.LoadMapCompleteFun(); }));
        this.TestBtn();
    };
    GameSceneUI.prototype.LoadMapCompleteFun = function () {
        PlayerCtrl.Instance.CreatePlayer();
    };
    GameSceneUI.prototype.TestBtn = function () {
        var btnLeft = new eui.Button();
        btnLeft.label = "left";
        this.addChild(btnLeft);
        btnLeft.x = 100;
        btnLeft.y = 100;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { PlayerCtrl.Instance.PlayerMove(-50, 0); }, this);
        //console.log("zindex:"+btnLeft.zIndex)
        var btnRight = new eui.Button();
        btnRight.label = "right";
        this.addChild(btnRight);
        btnRight.x = 100;
        btnRight.y = 200;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { PlayerCtrl.Instance.PlayerMove(50, 0); }, this);
        //console.log("zindex:"+btnRight.zIndex)
        var btnDown = new eui.Button();
        btnDown.label = "down";
        this.addChild(btnDown);
        btnDown.x = 100;
        btnDown.y = 300;
        btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { PlayerCtrl.Instance.PlayerMove(0, 50); }, this);
        //console.log("zindex:"+btnDown.zIndex)
        var btnUp = new eui.Button();
        btnUp.label = "up";
        this.addChild(btnUp);
        btnUp.x = 100;
        btnUp.y = 400;
        btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { PlayerCtrl.Instance.PlayerMove(0, -50); }, this);
    };
    return GameSceneUI;
}(eui.Component));
__reflect(GameSceneUI.prototype, "GameSceneUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameSceneUI.js.map
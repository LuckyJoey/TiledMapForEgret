var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerCtrl = (function () {
    function PlayerCtrl() {
        this.player = new Player();
        this.speed = 200;
    }
    Object.defineProperty(PlayerCtrl, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new PlayerCtrl();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerCtrl;
}());
__reflect(PlayerCtrl.prototype, "PlayerCtrl");
//# sourceMappingURL=PlayerCtrl.js.map
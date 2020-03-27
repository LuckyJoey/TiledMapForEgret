var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player() {
    }
    Object.defineProperty(Player.prototype, "width", {
        get: function () {
            return this.body.width;
        },
        set: function (value) {
            this.body.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "height", {
        get: function () {
            return this.body.height;
        },
        set: function (value) {
            this.body.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "pointX", {
        get: function () {
            return this.body.x;
        },
        set: function (value) {
            this.body.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "pointY", {
        get: function () {
            return this.body.y;
        },
        set: function (value) {
            this.body.y = value;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map
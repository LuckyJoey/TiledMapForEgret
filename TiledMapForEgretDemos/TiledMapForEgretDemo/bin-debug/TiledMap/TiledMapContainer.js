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
/**
 * 地图容器类 mwt 2020.03.31
 */
var TiledMapContainer = (function (_super) {
    __extends(TiledMapContainer, _super);
    function TiledMapContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TiledMapContainer, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new TiledMapContainer();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    TiledMapContainer.prototype.Init = function (url, LoadMapCompleteFun) {
        TiledMap.Instance.LoadMap(this, url, LoadMapCompleteFun);
        return this;
    };
    return TiledMapContainer;
}(egret.DisplayObjectContainer));
__reflect(TiledMapContainer.prototype, "TiledMapContainer");
//# sourceMappingURL=TiledMapContainer.js.map
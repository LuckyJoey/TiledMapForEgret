var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
单例类
mwt 2020/03/03
*/
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.Instance = function (c) {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    };
    Singleton.instance = null;
    return Singleton;
}());
__reflect(Singleton.prototype, "Singleton");
//# sourceMappingURL=Singleton.js.map
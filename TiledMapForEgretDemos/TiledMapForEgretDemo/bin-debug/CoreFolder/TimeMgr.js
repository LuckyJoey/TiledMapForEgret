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
 * 时间管理器类
 * mwt 2020/03/04
 */
var TimeMgr = (function (_super) {
    __extends(TimeMgr, _super);
    function TimeMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TimeMgr, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new TimeMgr();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    //创建计时器
    TimeMgr.prototype.CreateTimer = function (dealy /*秒*/, startF, endF, repet, isOnce) {
        if (repet === void 0) { repet = 1; }
        if (isOnce === void 0) { isOnce = true; }
        var timer = new egret.Timer(dealy * 1000, repet);
        //注册事件侦听器
        timer.once(egret.TimerEvent.TIMER, startF, this);
        timer.once(egret.TimerEvent.TIMER_COMPLETE, endF, this);
        //开始计时
        timer.start();
        if (isOnce) {
            timer.once(egret.TimerEvent.TIMER_COMPLETE, function () { timer.stop(); timer = null; }, this);
        }
        return timer;
    };
    Object.defineProperty(TimeMgr.prototype, "NowTime", {
        get: function () {
            var now = new Date();
            return now.getUTCMilliseconds();
        },
        enumerable: true,
        configurable: true
    });
    return TimeMgr;
}(egret.DisplayObjectContainer));
__reflect(TimeMgr.prototype, "TimeMgr");
//# sourceMappingURL=TimeMgr.js.map
// 字符串工具 lihui 2020/3/5
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringTools = (function () {
    function StringTools() {
    }
    //大于万缩写格式x万x
    StringTools.TenThousandFormat = function (data, isShort) {
        if (isShort === void 0) { isShort = false; }
        if (data >= 10000) {
            return Math.floor(data / 10000) + "万" + (isShort ? "" : (data % 10000 > 0 ? data % 10000 : ""));
        }
        return data.toString();
    };
    StringTools.timeFormat = function (s) {
        //var hours  = Math.round(s/3600) ;
        var minutes = Math.round(s / 60) % 60;
        var seconds = s % 60;
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    };
    return StringTools;
}());
__reflect(StringTools.prototype, "StringTools");
//# sourceMappingURL=StringTools.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 绘制EUI管理类
 * mwt 2020/03/06
 */
var DrawEUIMgr = (function () {
    function DrawEUIMgr() {
        //设置灰度滤镜效果 lihui 2020/3/14
        this.colorGrayMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
    }
    Object.defineProperty(DrawEUIMgr, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new DrawEUIMgr();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    //创建容器节点
    DrawEUIMgr.prototype.CreateNode = function (n, w, h, x, y) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var node = new eui.Group();
        node.width = w;
        node.height = h;
        n.addChild(node);
        n.touchThrough = true;
        n.touchEnabled = false;
        n.touchChildren = true;
        node.anchorOffsetX = node.width / 2;
        node.anchorOffsetY = node.height / 2;
        node.x = x;
        node.y = y;
        return node;
    };
    //创建图片
    DrawEUIMgr.prototype.CreateImage = function (n, txt, touchEnabled, x, y, rotation) {
        if (touchEnabled === void 0) { touchEnabled = false; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (rotation === void 0) { rotation = 0; }
        var img = new eui.Image();
        n.addChild(img);
        img.source = txt;
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
        img.x = x,
            img.y = y;
        img.touchEnabled = touchEnabled;
        return img;
    };
    //创建文字
    DrawEUIMgr.prototype.CreateLabel = function (n, s, size, x, y, textColor, rotation) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (textColor === void 0) { textColor = 1; }
        if (rotation === void 0) { rotation = 0; }
        var label = new eui.Label;
        n.addChild(label);
        label.fontFamily = "SimHei";
        label.text = s;
        label.size = size;
        label.anchorOffsetX = label.width / 2;
        label.anchorOffsetY = label.height / 2;
        // label.width=label.width;
        // label.height=label.height;
        label.textColor = textColor;
        label.x = x;
        label.y = y;
        label.rotation = rotation;
        label.touchEnabled = false;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        //label.tou
        return label;
    };
    DrawEUIMgr.prototype.SetGrayFilter = function (display, isSet) {
        if (isSet === void 0) { isSet = true; }
        if (display == null) {
            return;
        }
        display.filters = isSet ? [new egret.ColorMatrixFilter(this.colorGrayMatrix)] : null;
    };
    return DrawEUIMgr;
}());
__reflect(DrawEUIMgr.prototype, "DrawEUIMgr");
//# sourceMappingURL=DrawEUIMgr.js.map
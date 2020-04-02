var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图数据类
 */
var TiledMapData = (function () {
    function TiledMapData() {
    }
    TiledMapData.initMapPointX = 800; //地图初始坐标x
    TiledMapData.initMapPointY = 600; //地图初始坐标y
    TiledMapData.renderOffset = 100; //渲染区域单边偏移值-由实际地图决定
    TiledMapData.obstacleLayerIndexs = [2]; //障碍层索引
    TiledMapData.playerIndex = 3; //角色所在地图层
    return TiledMapData;
}());
__reflect(TiledMapData.prototype, "TiledMapData");
//# sourceMappingURL=TiledMapData.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图类mwt 2020.03.25
 */
var TiledMap = (function () {
    function TiledMap() {
        this.maplayers = []; //整块地图-所有层级
        this.oldmirrorRectX = -100000;
        this.tiledPointArray = [];
        this.moveSpeed = 200;
        /**
         * mark:2020.04.01
         * 地图编辑器中可对单个格子添加自定义属性(比如障碍属性，关于障碍属性，通过设置障碍层判断，计算复杂度更小)
         * tiled.d.ts接口中暂未找到获得格子自定义属性的方法，可能要改tiled.js源码
         * let tiledset:tiled.TMXTileset = this.tiled.tileset;
         * tiledset.firstgid
         * this.tiled.tileset.getSpecialTileDataByTileId(11))
         */
    }
    Object.defineProperty(TiledMap, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new TiledMap();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TiledMap.prototype, "TmxTileMap", {
        get: function () {
            return this.tmxTileMap;
        },
        enumerable: true,
        configurable: true
    });
    /*加载地图*/
    TiledMap.prototype.LoadMap = function (mapContainer, url, LoadMapCompleteFun) {
        this.loadMapCompleteFun = LoadMapCompleteFun;
        this.mapContainer = mapContainer;
        /*初始化资源加载路径*/
        this.url = url;
        /*初始化请求*/
        this.request = new egret.HttpRequest();
        //console.log("地图开始加载:"+TimeMgr.Instance.NowTime)
        /*监听资源加载完成事件*/
        this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
        /*发送请求*/
        this.request.open(this.url, egret.HttpMethod.GET);
        this.request.send();
    };
    /*地图加载完成*/
    TiledMap.prototype.onMapComplete = function (event) {
        //console.log("地图数据开始解析:"+TimeMgr.Instance.NowTime)
        /*获取到地图数据*/
        this.data = egret.XML.parse(event.currentTarget.response);
        //console.log("地图数据解析完成:"+TimeMgr.Instance.NowTime)
        /*初始化地图*/
        this.InitMapData();
        this.UpdateTiledMapRender();
        this.InitMapPoint();
        if (this.loadMapCompleteFun) {
            this.loadMapCompleteFun();
        }
    };
    //初始化地图数据
    TiledMap.prototype.InitMapData = function () {
        this.initMapPointX = TiledMapData.initMapPointX;
        this.initMapPointY = TiledMapData.initMapPointY;
        this.renderOffset = TiledMapData.renderOffset;
        this.obstacleLayerIndexs = TiledMapData.obstacleLayerIndexs;
        this.rectX = this.initMapPointX;
        this.rectY = this.initMapPointY;
        this.renderWidth = GameData.stageWidth + this.renderOffset * 2;
        this.renderHeight = GameData.stageHeight + this.renderOffset * 2;
    };
    //初始化地图坐标
    TiledMap.prototype.InitMapPoint = function () {
        this.tmxTileMap.x = -this.rectX - this.renderOffset;
        this.tmxTileMap.y = -this.rectY - this.renderOffset;
    };
    //更新地图渲染
    TiledMap.prototype.UpdateTiledMapRender = function () {
        var _this = this;
        if (this.tmxTileMap != null) {
            this.tmxTileMap.destory();
            this.tmxTileMap = null;
        }
        //console.log("地图开始解析:"+TimeMgr.Instance.NowTime)
        this.tmxTileMap = new tiled.TMXTilemap(this.rectX, this.rectY, this.renderWidth, this.renderHeight, this.data, this.url);
        this.tmxTileMap.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, function () {
            //console.log("地图解析完成："+TimeMgr.Instance.NowTime)
        }, this);
        this.tmxTileMap.render();
        /*将地图添加到显示列表*/
        this.mapContainer.addChild(this.tmxTileMap);
        this.tmxTileMap.touchEnabled = true;
        this.maplayers.splice(0);
        // 获取地图所有图形层
        this.tmxTileMap.getLayers().forEach(function (layer, i) {
            //console.log("layer:"+layer.name+",layerIndex:"+i);
            _this.maplayers.push(layer);
        });
        //获取所有对象    
        this.tmxTileMap.getObjects().forEach(function (obj, i) {
            // let group:tiled.TMXObjectGroup = obj as tiled.TMXObjectGroup;
            // console.log("obj:"+group.name+"_group.getObjectCount:"+group.getObjectCount());
        });
    };
    //移动地图
    TiledMap.prototype.TiledMapMove = function (x, y, moveSpeed) {
        if (moveSpeed === void 0) { moveSpeed = 200; }
        this.moveSpeed = moveSpeed;
        this.rectX += x;
        this.rectY += y;
        this.mirrorRectX = -this.rectX;
        this.mirrorRectY = -this.rectY;
        //地图位置偏移校验并矫正
        if (this.mirrorRectX >= 0) {
            this.mirrorRectX = 0;
            this.rectX = 0;
        }
        if (this.mirrorRectY >= 0) {
            this.mirrorRectY = 0;
            this.rectY = 0;
        }
        if (this.mirrorRectX <= GameData.stageWidth - this.tmxTileMap.width + this.renderOffset * 2) {
            this.mirrorRectX = GameData.stageWidth - this.tmxTileMap.width + this.renderOffset * 2;
            this.rectX = -this.mirrorRectX;
        }
        if (this.mirrorRectY <= GameData.stageHeight - this.tmxTileMap.height + this.renderOffset * 2) {
            this.mirrorRectY = GameData.stageHeight - this.tmxTileMap.height + this.renderOffset * 2;
            this.rectY = -this.mirrorRectY;
        }
        if (this.oldmirrorRectX == -100000) {
            this.oldmirrorRectX = this.mirrorRectX;
            this.oldmirrorRectY = this.mirrorRectY;
        }
        //渲染并移动地图
        this.UpdateTiledMapRender();
        this.tmxTileMap.x = this.oldmirrorRectX - this.renderOffset;
        this.tmxTileMap.y = this.oldmirrorRectY - this.renderOffset;
        egret.Tween.get(this.tmxTileMap).to({ x: this.mirrorRectX - this.renderOffset, y: this.mirrorRectY - this.renderOffset }, this.moveSpeed);
        this.oldmirrorRectX = this.mirrorRectX;
        this.oldmirrorRectY = this.mirrorRectY;
    };
    /**
     * 校验角色是否碰撞障碍层
     * @param moveX 移动x
     * @param moveY 移动y
     * @param playerWidth 角色宽
     * @param playerHeight 角色长
     * @param playerX 角色坐标x
     * @param playerY 角色坐标y
     */
    TiledMap.prototype.VerifyObstacleTiled = function (moveX, moveY, playerWidth, playerHeight, playerX, playerY) {
        this.tiled = null;
        var tiledX = playerX + moveX;
        var tiledY = playerY + moveY;
        this.tiledPointArray.push(new egret.Point(tiledX - playerWidth / 2, tiledY - playerHeight / 2));
        this.tiledPointArray.push(new egret.Point(tiledX - playerWidth / 2, tiledY + playerHeight / 2));
        this.tiledPointArray.push(new egret.Point(tiledX + playerWidth / 2, tiledY - playerHeight / 2));
        this.tiledPointArray.push(new egret.Point(tiledX + playerWidth / 2, tiledY + playerHeight / 2));
        for (var i = this.tiledPointArray.length - 1; i >= 0; i--) {
            if (!this.tiled) {
                for (var j = 0; j < this.obstacleLayerIndexs.length; j++) {
                    this.tiled = this.maplayers[this.obstacleLayerIndexs[j]].getTile(this.tiledPointArray[i].x, this.tiledPointArray[i].y);
                }
            }
        }
        this.tiledPointArray.splice(0);
        return this.tiled;
    };
    return TiledMap;
}());
__reflect(TiledMap.prototype, "TiledMap");
//# sourceMappingURL=TiledMap.js.map
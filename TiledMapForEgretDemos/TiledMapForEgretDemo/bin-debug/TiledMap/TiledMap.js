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
    TiledMap.prototype.LoadMap = function (mapContainer, url) {
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
    };
    //初始化地图数据
    TiledMap.prototype.InitMapData = function () {
        this.initMapPointX = 800;
        this.initMapPointY = 600;
        this.renderOffset = 100;
        this.blockIndex = 2;
        this.playerIndex = 3;
        this.rectX = this.initMapPointX;
        this.rectY = this.initMapPointY;
        this.renderWidth = GameData.stageWidth + this.renderOffset * 2;
        this.renderHeight = GameData.stageHeight + this.renderOffset * 2;
    };
    //初始化地图坐标
    TiledMap.prototype.InitMapPoint = function () {
        var _this = this;
        this.maplayers.forEach(function (layer, i) {
            layer.x = -_this.rectX - _this.renderOffset;
            layer.y = -_this.rectY - _this.renderOffset;
        });
    };
    //更新地图渲染
    TiledMap.prototype.UpdateTiledMapRender = function () {
        var _this = this;
        this.SetPlayerParent(this.mapContainer.stage, 0);
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
        this.maplayers.forEach(function (layer, i) {
            _this.maplayers.pop();
        });
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
        this.SetPlayerParent(this.tmxTileMap, this.playerIndex);
    };
    //移动地图
    TiledMap.prototype.TiledMapMove = function (x, y) {
        var _this = this;
        if (!this.VerifyTiledMapMove(x, y))
            return;
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
        if (this.mirrorRectX <= GameData.stageWidth - this.tmxTileMap.width) {
            this.mirrorRectX = GameData.stageWidth - this.tmxTileMap.width;
            this.rectX = -this.mirrorRectX;
        }
        if (this.mirrorRectY <= GameData.stageHeight - this.tmxTileMap.height) {
            this.mirrorRectY = GameData.stageHeight - this.tmxTileMap.height;
            this.rectY = -this.mirrorRectY;
        }
        if (this.oldmirrorRectX == -100000) {
            this.oldmirrorRectX = this.mirrorRectX;
            this.oldmirrorRectY = this.mirrorRectY;
        }
        //渲染并移动地图
        this.UpdateTiledMapRender();
        this.maplayers.forEach(function (layer, i) {
            layer.x = _this.oldmirrorRectX - _this.renderOffset;
            layer.y = _this.oldmirrorRectY - _this.renderOffset;
            egret.Tween.get(layer).to({ x: _this.mirrorRectX - _this.renderOffset, y: _this.mirrorRectY - _this.renderOffset }, PlayerCtrl.Instance.speed);
        });
        this.oldmirrorRectX = this.mirrorRectX;
        this.oldmirrorRectY = this.mirrorRectY;
    };
    //校验是否可以移动-校验角色四个顶点是否触碰不可行走格子
    TiledMap.prototype.VerifyTiledMapMove = function (x, y) {
        var gid = 0;
        var tiledX = PlayerCtrl.Instance.player.pointX + this.rectX + this.renderOffset + x;
        var tiledY = PlayerCtrl.Instance.player.pointY + this.rectY + this.renderOffset + y;
        this.tiledPointArray.push(new egret.Point(tiledX - PlayerCtrl.Instance.player.width / 2, tiledY - PlayerCtrl.Instance.player.height / 2));
        this.tiledPointArray.push(new egret.Point(tiledX - PlayerCtrl.Instance.player.width / 2, tiledY + PlayerCtrl.Instance.player.height / 2));
        this.tiledPointArray.push(new egret.Point(tiledX + PlayerCtrl.Instance.player.width / 2, tiledY - PlayerCtrl.Instance.player.height / 2));
        this.tiledPointArray.push(new egret.Point(tiledX + PlayerCtrl.Instance.player.width / 2, tiledY + PlayerCtrl.Instance.player.height / 2));
        for (var i = this.tiledPointArray.length - 1; i >= 0; i--) {
            var id = this.maplayers[this.blockIndex].getTileId(this.tiledPointArray[i].x, this.tiledPointArray[i].y);
            gid += id;
            this.tiledPointArray.pop();
        }
        return gid == 0;
    };
    //设置角色父物体
    TiledMap.prototype.SetPlayerParent = function (parent, index) {
        if (PlayerCtrl.Instance.player.body == null)
            return;
        parent.addChildAt(PlayerCtrl.Instance.player.body, index);
    };
    return TiledMap;
}());
__reflect(TiledMap.prototype, "TiledMap");
//# sourceMappingURL=TiledMap.js.map
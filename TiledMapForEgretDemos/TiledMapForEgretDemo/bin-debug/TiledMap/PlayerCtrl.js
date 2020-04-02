var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色控制器 mwt 2020.04.01
 */
var PlayerCtrl = (function () {
    function PlayerCtrl() {
        this.player = new Player();
        this.oldTargetX = -100000;
        this.oldTargetY = -100000;
        this.canMove = true;
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
    //创建角色
    PlayerCtrl.prototype.CreatePlayer = function () {
        this.player.body = new eui.Image();
        this.player.body.source = "640_jpg";
        this.player.width = 80;
        this.player.height = 80;
        this.player.body.name = "player";
        this.player.body.anchorOffsetX = this.player.width / 2;
        this.player.body.anchorOffsetY = this.player.height / 2;
        this.SetParent(TiledMap.Instance.TmxTileMap, TiledMapData.playerIndex);
        //角色固定在屏幕某点
        this.player.pointX = PlayerData.originPointX - TiledMap.Instance.TmxTileMap.x;
        this.player.pointY = PlayerData.originPointY - TiledMap.Instance.TmxTileMap.y;
    };
    //设置角色父物体
    PlayerCtrl.prototype.SetParent = function (parent, index) {
        if (index === void 0) { index = 0; }
        if (this.player.body == null)
            return;
        parent.addChildAt(this.player.body, index);
    };
    //角色移动
    PlayerCtrl.prototype.PlayerMove = function (moveX, moveY) {
        var _this = this;
        if (!this.canMove)
            return;
        if (this.oldTargetX != -100000) {
            this.player.pointX = this.oldTargetX;
            this.player.pointY = this.oldTargetY;
        }
        //角色到达格子边缘时，矫正移动距离
        this.tiled = TiledMap.Instance.VerifyObstacleTiled(moveX, moveY, this.player.width, this.player.height, this.player.pointX, this.player.pointY);
        if (this.tiled) {
            //console.log("this.tiled.bitmap:"+this.tiled.bitmap+",id"+this.tiled.gid+","+this.tiled.height)
            if (moveX < 0) {
                moveX = (this.tiled.bitmap.x + this.tiled.bitmap.width) - (this.player.pointX - this.player.width / 2) + PlayerData.playerFitObstacleDistance;
            }
            else if (moveX > 0) {
                moveX = this.tiled.bitmap.x - (this.player.pointX + this.player.width / 2) - PlayerData.playerFitObstacleDistance;
            }
            if (moveY < 0) {
                moveY = (this.tiled.bitmap.y + this.tiled.bitmap.height) - (this.player.pointY - this.player.height / 2) + PlayerData.playerFitObstacleDistance;
            }
            else if (moveY > 0) {
                moveY = this.tiled.bitmap.y - (this.player.pointY + this.player.height / 2) - PlayerData.playerFitObstacleDistance;
            }
        }
        //角色移动
        this.canMove = false;
        var targetX = this.player.pointX + moveX;
        var targetY = this.player.pointY + moveY;
        egret.Tween.get(this.player.body).to({ x: targetX, y: targetY }, PlayerData.playerMoveSpeed).call(function () {
            _this.canMove = true;
        });
        this.oldTargetX = targetX;
        this.oldTargetY = targetY;
        //角色是否前往地图边界
        if (this.IsGoBorder(moveX, moveY))
            return;
        //移动地图
        this.SetParent(TiledMapContainer.Instance);
        TiledMap.Instance.TiledMapMove(moveX, moveY, PlayerData.playerMoveSpeed);
        this.SetParent(TiledMap.Instance.TmxTileMap, TiledMapData.playerIndex);
    };
    //校验角色前往地图边界
    PlayerCtrl.prototype.IsGoBorder = function (moveX, moveY) {
        if (moveX != 0 &&
            (this.player.pointX <= PlayerData.originPointX + TiledMapData.renderOffset ||
                this.player.pointX >= TiledMap.Instance.TmxTileMap.width - (GameData.stageWidth - PlayerData.originPointX) - TiledMapData.renderOffset)
            || moveY != 0 &&
                (this.player.pointY <= PlayerData.originPointY + TiledMapData.renderOffset ||
                    this.player.pointY >= TiledMap.Instance.TmxTileMap.height - (GameData.stageHeight - PlayerData.originPointY) - TiledMapData.renderOffset)) {
            return true;
        }
        return false;
    };
    return PlayerCtrl;
}());
__reflect(PlayerCtrl.prototype, "PlayerCtrl");
//# sourceMappingURL=PlayerCtrl.js.map
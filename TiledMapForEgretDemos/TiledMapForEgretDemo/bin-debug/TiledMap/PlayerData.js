var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerData = (function () {
    function PlayerData() {
    }
    PlayerData.playerMoveSpeed = 100;
    PlayerData.originPointX = 360;
    PlayerData.originPointY = 860;
    PlayerData.playerFitObstacleDistance = 3; //角色与障碍块贴合距离
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map
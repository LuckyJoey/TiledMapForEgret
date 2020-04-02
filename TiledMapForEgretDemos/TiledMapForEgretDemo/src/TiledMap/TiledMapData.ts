/**
 * 地图数据类
 */
class TiledMapData 
{
	static initMapPointX = 800;//地图初始坐标x
	static initMapPointY = 600;//地图初始坐标y
	static renderOffset = 100;//渲染区域单边偏移值-由实际地图决定
	static obstacleLayerIndexs:number[] = [2];//障碍层索引
	static playerIndex:number =3;//角色所在地图层
}
/**
 * 地图容器类 mwt 2020.03.31
 */
class TiledMapContainer extends egret.DisplayObjectContainer 
{
    private static _instance: TiledMapContainer;
    public static get Instance(): TiledMapContainer {
        if(this._instance == null) {
            this._instance = new TiledMapContainer();
        }
        return this._instance;
    }
    public Init(url:string,LoadMapCompleteFun:Function):TiledMapContainer
    {
        TiledMap.Instance.LoadMap(this,url,LoadMapCompleteFun);
        return this;
    }
}
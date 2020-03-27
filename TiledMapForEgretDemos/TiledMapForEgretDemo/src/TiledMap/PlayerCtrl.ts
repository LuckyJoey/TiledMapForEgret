class PlayerCtrl {
	private static _instance: PlayerCtrl;
      public static get Instance(): PlayerCtrl {
        if(this._instance == null) {
            this._instance = new PlayerCtrl();
        }
        return this._instance;
    }
	public player:Player=new Player();
	public speed:number=200;
}
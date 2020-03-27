class Player {
	//public node:eui.Group;
	public body:eui.Image;
	public set width(value:number)
	{
		this.body.width=value;
	}
	public get width():number
	{
		return this.body.width;
	}
	public set height(value:number)
	{
		this.body.height=value;
	}
	public get height():number
	{
		return this.body.height;
	}
	public set pointX(value:number)
	{
		this.body.x=value;
	}
	public get pointX():number
	{
		return this.body.x;
	}
	public set pointY(value:number)
	{
		this.body.y=value;
	}
	public get pointY():number
	{
		return this.body.y;
	}
}
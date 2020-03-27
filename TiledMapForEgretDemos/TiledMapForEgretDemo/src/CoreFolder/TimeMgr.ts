/**
 * 时间管理器类
 * mwt 2020/03/04
 */
class TimeMgr extends egret.DisplayObjectContainer
{
	private static instance:TimeMgr;
	public static get Instance() :TimeMgr
	{
		if(this.instance == null)
		{
			this.instance = new TimeMgr();
		}
		return this.instance;
	}
	//创建计时器
	public CreateTimer(dealy:number /*秒*/,startF:Function,endF:Function, repet:number=1,isOnce:boolean=true):egret.Timer
	{
		var timer:egret.Timer = new egret.Timer(dealy*1000,repet);
        //注册事件侦听器
        timer.once(egret.TimerEvent.TIMER,startF,this);
        timer.once(egret.TimerEvent.TIMER_COMPLETE,endF,this);
        //开始计时
        timer.start();
		if(isOnce)
		{
			timer.once(egret.TimerEvent.TIMER_COMPLETE,()=>{timer.stop();timer=null},this);
		}
		return timer;
	}
	public get NowTime():number
	{
		let now = new Date();
		return now.getUTCMilliseconds();
	}
}
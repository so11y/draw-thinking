
export default (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //设置全局的填充色,可以之后在内部在修改
    ctx.fillStyle = "#000";

    //设置线条的头尾样式,这里是让线条头尾变的圆润
    ctx.lineCap = "round";
    //设置线条的连接点样式 这里是让连接变的圆润
    ctx.lineJoin = "miter";

    ctx.lineWidth = 10;
    // ctx.miterLimit = 1;
    ctx.save();
    //新建一条线路
    ctx.beginPath();
    //移动画笔到100,100 坐标
    ctx.moveTo(100, 100);
    //接着上面的坐标画到150,150坐标
    ctx.lineTo(150, 150);
    // ctx.lineTo(150, 200);
    ctx.fillStyle = "red";
    //结束画笔,并且把起始和结尾连接起来，
    ctx.closePath();
    // ctx.fill();
    //填充绘制
    ctx.stroke();
    ctx.restore();


    //新建一条线路
    ctx.beginPath();
    //移动画笔到100,100 坐标
    ctx.moveTo(200, 200);
    //接着上面的坐标画到150,150坐标
    ctx.lineTo(250, 300);
    ctx.lineTo(350, 300);
    //结束画笔
    // ctx.closePath();

    // ctx.fill();
    //填充绘制
    ctx.stroke();
}

``` ts
    //设置描边的样式 渐变 什么的都可以设置
    ctx.strokeStyle

    //新建一条线路
    ctx.beginPath();
    //移动画笔到100,100 坐标
    ctx.moveTo(100,100);
    //接着上面的坐标画到150,150坐标
    ctx.lineTo(150,150);
    ctx.lineTo(150,100);
    //结束画笔,并且把起始和结尾连接起来，
    ctx.closePath();
    //绘制线条
    ctx.stroke();
    //整个填充 如果没用使用closePath也没关系,fill会直接闭合路线
    ctx.fill();


    //这两个配套使用
    //比如之前在外部定于一些canvas的全局配置
    //然后需要在内部修改，修改完之后还需要在还回之前全局的配置
    //需要使用这两个来配合使用
    ctx.save();
    /**
     * you inside code
    */
    ctx.restore();




    //设置线条的头尾样式,这里是让线条头尾变的圆润
    ctx.lineCap = "round";
    //设置线条的连接点样式 这里是让连接变的圆润
    ctx.lineJoin = "round";

```
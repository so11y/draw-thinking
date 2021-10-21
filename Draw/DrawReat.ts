import { move } from "../gesture/move";
import { IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";

/**
 * 必须实现IDraw中定义的类型
 * 虽然继承了Draw但是并没有初始化接口中定义的类型
 * 这里之后在想办法调整
 */
export class DrawRect extends Draw implements IDraw {

    x: number = 100;

    y: number = 100;

    width: number = 100;

    height: number = 100;

    //申明需要用到的手势
    plugins = [move];

    draw() {
        const { x, y, width, height } = this;
        const [context] = useContext();
        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.fillStyle = '#fff';
        context.ctx.rect(x, y, width, height);
        context.ctx.stroke();
        context.ctx.fill();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();
    }
}
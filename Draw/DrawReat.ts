import { move } from "../gesture/move";
import { scale } from "../gesture/scale";
import { IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";
export class DrawRect extends Draw implements IDraw {

    x: number = 100;

    y: number = 100;

    width: number = 100;

    height: number = 100;

    //申明需要用到的手势
    plugins = [move,scale];

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
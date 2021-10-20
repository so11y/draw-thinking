import { IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";

/**
 * 描邊組件不需要添加手勢
 * 在沒有目標的時候會自己渲染描邊
 * 縂的來說這個比較特殊
 */
export class DrawContour extends Draw implements IDraw {

    componentKey = "drawContour";

    x: number = 0;

    y: number = 0;

    width: number = 0;

    height: number = 0;

    plugins = [];

    draw() {
        const { x, y, width, height } = this;
        const [context] = useContext();
        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.strokeStyle = '#29aad7';
        context.ctx.fillStyle = 'rgba(41,170,215,0.1)';
        context.ctx.rect(x, y, width, height);
        context.ctx.stroke();
        context.ctx.fill();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();
    }
}
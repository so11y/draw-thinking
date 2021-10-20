import { IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";
import { move } from "../gesture/move";

export class DrawWarp extends Draw implements IDraw {

    componentKey = "DrawWarp";

    x: number = 0;

    y: number = 0;

    width: number = 0;

    height: number = 0;

    plugins = [move];

    draw() {
        const margin = 10;
        const { x, y, width, height } = this;
        const [context] = useContext();
        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.lineWidth = 1;
        context.ctx.strokeStyle = '#29aad7';
        context.ctx.rect(x - margin, y - margin, width + margin * 2, height + margin * 2);
        context.ctx.stroke();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();
    }
}
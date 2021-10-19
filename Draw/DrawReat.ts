import { useContext } from "../util/useSingle";
import { IDraw } from "./DrawMode";
import { Draw } from "./parentDraw";

export class DrawRect extends Draw implements IDraw {
    x: number = 0;
    y: number = 0;
    width: number = 100;
    height: number = 100;

    draw() {
        this.highlightDraw();
        super.draw();
    }
    highlightDraw() {
        const [context] = useContext();
        context.ctx.beginPath();
        context.ctx.save();
        if (this.isHighlight) {
            context.ctx.strokeStyle = "red";
        }
        this.beforeDraw();
        context.ctx.restore();
        context.ctx.closePath();
    }

    beforeDraw() {
        const { x, y, width, height } = this;
        const [context] = useContext();
        context.ctx.rect(x, y, width, height);
        context.ctx.stroke();
    }
}
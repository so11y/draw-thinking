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
        this.ctx.beginPath();
        this.ctx.save();
        if (this.isHighlight) {
            this.ctx.strokeStyle = "red";
        }
        this.beforeDraw();
        this.ctx.restore();
        this.ctx.closePath();
    }

    beforeDraw() {
        const { x, y, width, height, ctx } = this;
        this.ctx.rect(x, y, width, height);
        ctx.stroke();
    }
}
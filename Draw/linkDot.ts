import { Idirection, IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";

export class LinkDot extends Draw implements IDraw {

    componentKey = "LinkDot";

    x: number = 0;

    y: number = 0;

    width: number = 6;

    height: number = 6;

    inject = ["linkLine"];

    direction: Idirection = "top-center";

    constructor(d: Idirection) {
        super();
        this.direction = d;
    }
    draw() {
        const { x, y, width,height } = this;
        const [context] = useContext();
        context.ctx.save()
        context.ctx.beginPath();
        this.setDirection();
        context.ctx.fillStyle = '#f7b75d';
        context.ctx.strokeStyle = '#f7b75d';
        context.ctx.rect(x, y, width, height);
        context.ctx.fill();
        context.ctx.stroke();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();

    }
    setDirection() {
        switch (this.direction) {
            case "top-center":
                this.x = this.parent.x + this.parent.width / 2;
                this.y = this.parent.y - this.height / 2;
                break;
            case "left-center":
                this.x = this.parent.x;
                this.y = this.parent.y + this.parent.height / 2;
                break;
            case "right-center":
                this.x = this.parent.x + this.parent.width - this.width / 2;
                this.y = this.parent.y + this.parent.height / 2;
                break;
            case "button-center":
                this.x = this.parent.x + this.parent.width / 2;
                this.y = this.parent.y + this.parent.height - this.height / 2;
                break;
        }
    }
}
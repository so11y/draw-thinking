import { scale } from "../gesture/scale";
import { Idirection, IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";

export class Dot extends Draw implements IDraw {

    componentKey = "Dot";

    x: number = -100;

    y: number = 100;

    width: number = 6;

    inject = ["scale"];

    height: number = 6;

    direction: Idirection = "top-left";

    constructor(d: Idirection) {
        super();
        this.direction = d;
    }

    draw() {
        const { x, y, width, height } = this;
        const [context] = useContext();
        this.setDirection();
        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.strokeStyle = '#f7b75d';
        context.ctx.fillStyle = '#fff';
        context.ctx.rect(x, y, width, height);
        context.ctx.stroke();
        context.ctx.fill();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();
    }

    setDirection() {
        switch (this.direction) {
            case "top-left":
                this.x = this.parent.x - this.width / 2;
                this.y = this.parent.y - this.width / 2;
                break;
            case "top-right":
                this.x = this.parent.x + this.parent.width + - this.width / 2;
                this.y = this.parent.y - this.width / 2;
                break;
            case "bottom-left":
                this.x = this.parent.x + - this.width / 2;
                this.y = this.parent.y + this.parent.height - this.width / 2;
                break;
            case "buttom-right":
                this.x = this.parent.x + this.parent.width + - this.width / 2;
                this.y = this.parent.y + this.parent.height - this.width / 2;
                break;
            default:
                break;
        }
    }
}
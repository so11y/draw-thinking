import { Idirection, IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";
import { move } from "../gesture/move";

export class LinkDot extends Draw implements IDraw {

    componentKey = "LinkDot";

    x: number = 0;

    y: number = 0;

    width: number = 12;

    height: number = 0;

    plugins = [move];

    direction: Idirection = "top-center";

    constructor(d: Idirection) {
        super();
        this.direction = d;
    }
    draw() {
        const { x, y, width, height } = this;
        const [context] = useContext();
        context.ctx.save()
        context.ctx.beginPath();
        this.setDirection();
        context.ctx.fillStyle = '#f7b75d';
        context.ctx.arc(x, y, width / 2, 0, Math.PI * 2, true);
        context.ctx.fill();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();

    }
    setDirection() {
        switch (this.direction) {
            case "top-center":
                this.x = this.parent.x + this.parent.width / 2;
                this.y = this.parent.y;
                break;
            case "left-center":
                this.x = this.parent.x;
                this.y = this.parent.y + this.parent.height / 2;
                break;
            case "right-center":
                this.x = this.parent.x + this.parent.width;
                this.y = this.parent.y + this.parent.height / 2;;
                break;
            case "button-center":
                this.x = this.parent.x + this.parent.width / 2;
                this.y = this.parent.y + this.parent.height;
                break;
        }
    }
}
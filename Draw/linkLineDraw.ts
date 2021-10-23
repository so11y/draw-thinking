import { IDraw } from "../types/draw";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";


export class LinkLine extends Draw implements IDraw {

    componentKey= "LinkLine";

    width = 0;
    height = 0;
    x = 0;
    y = 0;
    pointXy: Array<[number, number]> = [];


    draw() {
        const [context] = useContext();
        const { pointXy } = this;
        const { x, y } = this.parent;

        context.ctx.beginPath();

        context.ctx.moveTo(x, y);

        pointXy.forEach(xy => {
            context.ctx.lineTo(xy[0], xy[1]);
        })
        context.ctx.stroke();

        context.ctx.closePath();
    }

}
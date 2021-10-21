import { IDraw } from "../types/draw";
import { getFrist } from "../util/functional";
import { useContext } from "../util/useSingle";
import { Draw } from "./baseDraw";

export class HighlightDraw extends Draw implements IDraw {

    componentKey = "HighlightDraw";

    //这个组件会在创建时注入当前子组件插件
    plugins = [];

    draw() {
        const margin = 10;
        const [context] = useContext();
        const { x, y, width, height } = getFrist(this.depend)
        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.lineWidth = 1;
        context.ctx.strokeStyle = '#f7b75d';
        context.ctx.rect(x - margin, y - margin, width + margin * 2, height + margin * 2);
        context.ctx.stroke();
        context.ctx.closePath();
        context.ctx.restore();
        super.draw();
    }
}
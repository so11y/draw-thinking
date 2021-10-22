import { IDraw } from "../types/draw";
import { getFrist } from "../util/functional";
import { useContext, useProxyEvent } from "../util/useSingle";
import { Draw } from "./baseDraw";
export class HighlightDraw extends Draw implements IDraw {

    componentKey = "HighlightDraw";

    //这个组件会在创建时注入当前子组件插件
    plugins = [];

    init() {
        const margin = 10;
        const { x, y, width, height } = getFrist(this.depend);
        this.x = x - margin;
        this.y = y - margin;
        this.width = width + margin * 2;
        this.height = height + margin * 2;
    }

    draw() {
        const [context] = useContext();

        this.init();

        context.ctx.save()
        context.ctx.beginPath();
        context.ctx.lineWidth = 1;
        context.ctx.strokeStyle = '#f7b75d';
        context.ctx.rect(this.x, this.y, this.width, this.height);
        context.ctx.stroke();
        context.ctx.closePath();
        context.ctx.restore();

        super.draw();
    }
}
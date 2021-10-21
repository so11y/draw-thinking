import { useProxyEvent } from "../util/useSingle";
import { Draw } from "./baseDraw";

export class DrawGo {

    public canvas: HTMLCanvasElement;

    public registerDrawCanvas: Map<string, typeof Draw> = new Map();

    activeCanvas: Draw;

    ctx: CanvasRenderingContext2D;

    //存放当前画布上已经绘制的类实例
    contextCanvasList: Array<Draw> = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    register(key: string, registerCanvas: typeof Draw): DrawGo {
        this.registerDrawCanvas.set(key, registerCanvas);
        return this
    }

    configCanvas() {

        const canvas = this.canvas;

        canvas.width = canvas.parentElement.clientWidth;

        canvas.height = canvas.parentElement.clientHeight;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";

        ctx.strokeStyle = "black";

        ctx.lineWidth = 5;

        this.ctx = ctx;
    }

    get offset() {
        return {
            top: this.canvas.offsetTop,
            left: this.canvas.offsetLeft
        }
    }

    go() {

        this.configCanvas();

        const fragmaent = document.createDocumentFragment();

        for (const [key, value] of this.registerDrawCanvas.entries()) {

            const button = document.createElement('button');

            button.addEventListener("click", () => {

                const drawItem = new value();

                this.contextCanvasList.push(drawItem);

                this.draw();
            });

            button.textContent = key;

            fragmaent.append(button);
        }

        document.querySelector(".app-header").append(fragmaent);

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.contextCanvasList.forEach(v => v.draw());

        console.log(this.contextCanvasList);
    }
}

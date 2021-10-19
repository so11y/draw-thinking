import { useContext } from "../util/useSingle";
import { Draw } from "./parentDraw";

type DrawRect = Pick<Draw, "x" | "y" | "width" | "height">;


export class ProxyEvent {

    x: number;
    y: number;

    drawMap = new WeakMap<Draw, { key: Draw, value: DrawRect }>();

    constructor() {
        window.addEventListener("mousedown", this.mouseDown.bind(this));
    }

    mouseDown(e: MouseEvent) {
        this.x = e.clientX;
        this.y = e.clientY;
        const [context] = useContext();
        context.contextCanvasList.forEach(v => {
            const { value } = this.drawMap.get(v);
            if (this.areaDetection(this.x, this.y, value)) {
                context.activeCanvas = v;
                this.x = Math.abs(context.activeCanvas.x - this.x);
                this.y = Math.abs(context.activeCanvas.y - this.y);
            }
        })
        const mouseMove = this.mouseMove.bind(this);
        const mouseUp = () => {
            context.activeCanvas = null;

            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp)
        }
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    }

    /**
   * 碰撞檢測
   */
    // crashDetection() {

    //     const activeCanvas = this.context.activeCanvas,
    //         left1 = activeCanvas.x,
    //         top1 = activeCanvas.y,
    //         right1 = activeCanvas.x + activeCanvas.width,
    //         bottom1 = activeCanvas.y + activeCanvas.height;


    //     this.context.contextCanvasList.forEach(v => {
    //         if (v != activeCanvas) {

    //             const left2 = v.x,
    //                 top2 = v.y,
    //                 right2 = v.x + v.width,
    //                 bottom2 = v.y + v.height;

    //             const isCrash = right1 < left2 || bottom1 < top2 || left1 > right2 || top1 > bottom2;

    //             v.isHighlight = !isCrash;
    //             activeCanvas.parent = v;
    //             toggleDepend(v.isHighlight, v, activeCanvas);

    //         } else {

    //             activeCanvas.parent = null;
    //             v.isHighlight = false;
    //             v.depend = []
    //         }
    //     })
    // }


    mouseMove(e: MouseEvent) {
        const [context] = useContext();
        if (context.activeCanvas) {
            const x = Math.abs(this.x - e.clientX);
            const y = Math.abs(this.y - e.clientY);

            context.activeCanvas.x = x;
            context.activeCanvas.y = y;

            context.draw();
        }
    }

    areaDetection(x: number, y: number, drawItem: DrawRect) {
        /**
         * 距离头部的y需要加一下
         */
        const inX = (x >= drawItem.x && x <= drawItem.x + drawItem.width);
        const inY = (y >= drawItem.y && y <= drawItem.y + drawItem.height);

        if (inX && inY) {
            return true;
        }
        return false;
    }

    add(proxyDraw: Draw) {

        const { x, y, height, width } = proxyDraw;

        this.drawMap.set(proxyDraw, {
            key: proxyDraw,
            value: { x, y, height, width }
        });

    }

}

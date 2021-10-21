import { Draw } from "../Draw/baseDraw";
import { HighlightDraw } from "../Draw/highlightDraw";
import { IApplyInterface } from "../types/gesture";
import { areaDetection, unMounted } from "../util/functional";
import { useContext, useObserveMove } from "../util/useSingle";
import { contour } from "./contour";

const crateHighlight = (isActive: Draw) => {
    const [context] = useContext();
    if (!isActive.parent && isActive.depend.length == 0) {
        //高亮
        const highlightDraw = new HighlightDraw();
        isActive.parent = highlightDraw;
        highlightDraw.depend.push(isActive);
        highlightDraw.plugins.push(...isActive.plugins)
        context.contextCanvasList.push(highlightDraw);
        context.activeCanvas = highlightDraw;
        context.draw();
    }
}




export class ProxyEvent {

    private _register = new WeakMap<Draw, Array<IApplyInterface>>();

    constructor() {
        window.addEventListener("mousedown", this.apply.bind(this));
    }

    apply(e: MouseEvent) {

        const isActive = this.getTag(e);

        if (isActive && isActive.plugins.length) {
            // 調用公开绘制组件注册的手势
            this.publicApply(isActive, e);
        } else {
            // 用内置注册手势事件
            this.privateApply(e);
        }
    }

    publicApply(isActive: Draw, e: MouseEvent) {

        unMounted("HighlightDraw");

        const [context] = useContext();

        context.activeCanvas = isActive;

        crateHighlight(isActive);

        const activeCanvasPlugins = this._register.get(context.activeCanvas);

        const plugins = activeCanvasPlugins.map(v => v());

        const [run] = useObserveMove({
            start() {
                plugins.forEach(v => v.start(e));
            },
            move(e) {
                plugins.forEach(v => v.move(e));
                context.draw();
            },
            end(e) {
                plugins.forEach(v => v.end(e));
                context.activeCanvas = null;
                context.draw();
            }
        });

        run(e);
    }

    privateApply(e: MouseEvent) {

        unMounted("DrawWarp");
        unMounted("HighlightDraw");

        const [context] = useContext();
        const applyContour = contour();

        const [run] = useObserveMove({
            start(e) {
                applyContour.start(e);
            },
            move(e) {
                applyContour.move(e);
                context.draw();
            },
            end(e) {
                applyContour.end(e);
                context.draw();
            }
        });

        run(e);
    }

    /**
    * 獲取当前激活目标
    */
    getTag(e: MouseEvent) {
        const [context] = useContext();
        let active = null;
        const x = e.clientX - context.offset.left;
        const y = e.clientY - context.offset.top;
        context.contextCanvasList.forEach(v => {
            if (areaDetection(x, y, v)) active = v;
        })
        return active;
    }

    register(draw: Draw, applys: Array<IApplyInterface>) {
        const is = this._register.has(draw);
        if (!is) {
            this._register.set(draw, applys);
        }
    }

}

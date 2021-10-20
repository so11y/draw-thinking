import { Draw } from "../Draw/baseDraw";
import { IApplyInterface } from "../types/gesture";
import { areaDetection } from "../util/functional";
import { useContext, useObserveMove } from "../util/useSingle";
import { contour } from "./contour";

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

        const [context] = useContext();

        context.activeCanvas = isActive;

        const activeCanvasPlugins = this._register.get(context.activeCanvas);

        const plugins = activeCanvasPlugins.map(v => v());

        const [run] = useObserveMove({
            start() {
                plugins.forEach(v => v.start(e));
            },
            move(e) {
                plugins.forEach(v => v.move(e));
            },
            end(e) {
                plugins.forEach(v => v.end(e));
                context.activeCanvas = null;
            }
        });

        run(e);
    }

    privateApply(e: MouseEvent) {

        const [context] = useContext();

        context.contextCanvasList =
            context.contextCanvasList.filter(v => v.componentKey !== "DrawWarp");

        const applyContour = contour();

        const [run] = useObserveMove({
            start(e) {
                applyContour.start(e);
            },
            move(e) {
                applyContour.move(e);
            },
            end(e) {
                applyContour.end(e);
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

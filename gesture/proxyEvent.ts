import { Draw } from "../Draw/baseDraw";
import { IApplyInterface  } from "../types/gesture";
import { areaDetection } from "../util/functional";
import { useContext } from "../util/useSingle";

export class ProxyEvent {

    private _register = new WeakMap<Draw, Array<IApplyInterface>>();

    constructor() {
        window.addEventListener("mousedown", this.apply.bind(this));
    }

    apply(e: MouseEvent) {

        const [context] = useContext();

        const isActive = this.getTag(e);

        if (isActive && isActive.plugins.length) {

            context.activeCanvas = isActive;

            const activeCanvasPlugins = this._register.get(context.activeCanvas);

            const plugins = activeCanvasPlugins.map(v => v());

            plugins.forEach(v => v.start(e));

            const mouseMove = (e: MouseEvent) => {
                plugins.forEach(v => v.move(e));
            };

            const mouseUp = (e: MouseEvent) => {

                plugins.forEach(v => v.end(e));

                context.activeCanvas = null;

                window.removeEventListener("mousemove", mouseMove);
                window.removeEventListener("mouseup", mouseUp)
            }

            window.addEventListener("mousemove", mouseMove);

            window.addEventListener("mouseup", mouseUp);
        }

    }
    /**
    * 设置当前激活目标
    */
    getTag(e: MouseEvent) {
        const [context] = useContext();
        let active = null;
        context.contextCanvasList.forEach(v => {
            if (areaDetection(e.clientX, e.clientY, v))
                active = v;
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

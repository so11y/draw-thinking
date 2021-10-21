import { Draw } from "../Draw/baseDraw";
import { Dot } from "../Draw/dot";
import { HighlightDraw } from "../Draw/highlightDraw";
import { Idirection } from "../types/draw";
import { unMounted } from "../util/functional";
import { useContext } from "../util/useSingle";

const haveHighlight = (draw: Draw) => {
    if (draw instanceof HighlightDraw) {
        return {
            is: true,
            draw: draw
        };
    }
    if (draw.parent) {
        return haveHighlight(draw.parent);
    }
    return {
        is: false,
        draw: null
    }
}

const useDot = (d: Idirection, parent: HighlightDraw) => {
    const [context] = useContext();
    const dot = new Dot(d);
    dot.parent = parent;
    parent.depend.push(dot);
    context.contextCanvasList.push(dot);
}
/**
 * 创建高亮组件
 */
export const useHighlight = () => {
    const [context] = useContext();
    const isActive = context.activeCanvas;

    if (!isActive.parent && isActive.depend.length == 0) {
        //高亮
        const highlightDraw = new HighlightDraw();
        isActive.parent = highlightDraw;
        highlightDraw.depend.push(isActive);
        highlightDraw.plugins.push(...isActive.plugins)
        context.contextCanvasList.push(highlightDraw);
        context.activeCanvas = highlightDraw;

        const directions: Array<Idirection> = ["top-left", "top-right", "bottom-left", "buttom-right"];

        directions.forEach(v => useDot(v, highlightDraw));

        context.draw();
    }
}

export const unHighlight = () => {
    unMounted("HighlightDraw");
    unMounted("Dot");
}

export const unOtherHighlight = (draw: Draw) => {
    const [context] = useContext();
    if (draw) {
        const count = context.contextCanvasList.filter(v => v instanceof HighlightDraw);
        const isHighlight = haveHighlight(draw);
        /**
         * 如果当前点击自己和父级都不存在高亮组件
         * 并且已经存在一个高亮组件那么就直接卸载
         */
        if (!isHighlight.is && count.length >= 1) {
            unHighlight();
        }
    }
}
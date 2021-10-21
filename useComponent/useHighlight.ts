import { Dot } from "../Draw/dot";
import { HighlightDraw } from "../Draw/highlightDraw";
import { Idirection } from "../types/draw";
import { unMounted } from "../util/functional";
import { useContext } from "../util/useSingle";


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
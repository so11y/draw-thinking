import { Draw } from "../Draw/baseDraw";
import { DrawWarp } from "../Draw/drawWarp";
import { getMaxRect, getMinRect } from "../util/functional";
import { useContext } from "../util/useSingle";

/**
 * @description 获取最大的边框
 */
const maxRect = (draw: Draw) => {

    const top = getMinRect("y", draw);
    const left = getMinRect("x", draw);
    const width = getMaxRect("x", draw) - left + getMaxRect("width", draw);
    const height = getMaxRect("y", draw) - top + getMaxRect("height", draw);

    return {
        top,
        left,
        width,
        height
    }
}

export const useDrawWarp = (draw: Draw) => {
    const [context] = useContext();
    const rect = maxRect(draw);
    const warpInstanc = new DrawWarp();
    warpInstanc.x = rect.left;
    warpInstanc.y = rect.top;
    warpInstanc.width = rect.width;
    warpInstanc.height = rect.height;
    draw.depend.forEach(v => {
        v.parent = warpInstanc;
        warpInstanc.depend.push(v);
    })

    draw.depend = [];
    context.contextCanvasList.push(warpInstanc);
}
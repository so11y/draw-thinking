import { Draw } from "../Draw/baseDraw";
import { DrawContour } from "../Draw/drawContour";
import { DrawWarp } from "../Draw/drawWarp";
import { IApplyInterface } from "../types/gesture";
import { clearDep, getMaxRect, getMinRect, unloadDrawItem } from "../util/functional";
import { useContext } from "../util/useSingle";

/**
  * 碰撞檢測
  */
const crashDetection = (draw: Draw) => {
    const [context] = useContext();

    const top1 = Math.min(draw.y, draw.y + draw.height),
        bottom1 = Math.max(draw.y, draw.y + draw.height),
        left1 = Math.min(draw.x, draw.x + draw.width),
        right1 = Math.max(draw.x, draw.x + draw.width);


    context.contextCanvasList.forEach(v => {
        if (v != draw) {
            const left2 = v.x,
                top2 = v.y,
                right2 = left2 + v.width,
                bottom2 = top2 + v.height;

            const isCrash = right1 < left2 || bottom1 < top2 || left1 > right2 || top1 > bottom2;

            if (!isCrash) {

                v.parent = draw;
                draw.depend.push(v);
            }
        }
    })
}
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
/**
 * @description 绘制drawWarp组件
 */
const isDrawWarp = (draw: Draw) => {
    if (draw.depend.length) {

        const [context] = useContext();

        const rect = maxRect(draw);

        const warpInstanc = new DrawWarp();

        warpInstanc.x = rect.left;
        warpInstanc.y = rect.top;
        warpInstanc.width = rect.width;
        warpInstanc.height = rect.height;

        //将全选框的依赖添加到warpInstanc中
        draw.depend.forEach(v => {
            v.parent = warpInstanc;
            warpInstanc.depend.push(v);
        })

        draw.depend = [];

        context.contextCanvasList.push(warpInstanc);
    }
}


export const contour: IApplyInterface = () => {

    const [context] = useContext();

    const drawContour = new DrawContour();

    const { top, left } = context.offset;

    return {
        type: "contour",

        start(e: MouseEvent) {
            drawContour.x = Math.abs(drawContour.x - e.clientX) - left;
            drawContour.y = Math.abs(drawContour.y - e.clientY) - top;
            context.contextCanvasList.push(drawContour);
        },
        move(e: MouseEvent) {
            //清除依赖
            clearDep(drawContour);
            drawContour.width = e.clientX - drawContour.x - left;
            drawContour.height = e.clientY - drawContour.y - top;
            //添加依赖
            crashDetection(drawContour);
            context.draw();
        },
        end() {

            isDrawWarp(drawContour);

            //这里等画边框组件把数据用完之后就把拖拽描边组件给删除了
            unloadDrawItem(drawContour)

            context.draw();

            console.log(context.contextCanvasList);
        }
    }
}



import { Draw } from "../Draw/baseDraw";
import { DrawContour } from "../Draw/drawContour";
import { IApplyInterface } from "../types/gesture";
import { useDrawWarp } from "../useComponent/useDrawWarp";
import { useHighlight } from "../useComponent/useHighlight";
import { clearDep, getFrist, unMounted } from "../util/functional";
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
 * @description 绘制drawWarp组件
 */
const isDrawWarp = (draw: Draw) => {
    const [context] = useContext();
    if (draw.depend.length) {
        if (draw.depend.length == 1) {
            context.activeCanvas = getFrist(draw.depend);
            context.activeCanvas.parent = null;
            useHighlight();
            context.draw();
            draw.depend = [];
            context.activeCanvas = null;
        } else {
            useDrawWarp(draw);
        }
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
        },
        end() {

            isDrawWarp(drawContour);

            //这里等画边框组件把数据用完之后就把拖拽描边组件给删除了
            unMounted(drawContour)
        }
    }
}



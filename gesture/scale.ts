import { Dot } from "../Draw/dot";
import { IApplyInterface } from "../types/gesture";
import { useBreakEvent, useContext } from "../util/useSingle";



export const scale: IApplyInterface = () => {

    const [context] = useContext();

    /**
     * 这边也是设计缺陷了 导致先这么搞一下
     * 没有设计跳过的步骤
     */
    if (context.activeCanvas.componentKey != "Dot") {
        return useBreakEvent();
    }

    const { top, left } = context.offset;

    const activeCanvas: Dot = context.activeCanvas as Dot;

    const { parent } = activeCanvas;

    //获取当前的需要更改的组件
    const draw = parent.depend.find(v => v.componentKey != "Dot");

    const drawW = draw.width,
        drawH = draw.height,
        drawX = draw.x,
        drawY = draw.y;

    const point = {
        x: 0,
        y: 0
    }

    return {
        type: "scale",

        start({ clientX, clientY }: MouseEvent) {
            point.x = clientX - left;
            point.y = clientY - top;
        },
        move({ clientX, clientY }: MouseEvent) {

            /**
             *简单实现下放大缩小
             */
            switch (activeCanvas.direction) {
                case "top-left":
                    draw.x = Math.abs(point.x - clientX - drawX) - left;
                    draw.width = Math.abs(point.x - clientX + drawW) - left;
                    break;
                case "top-right":
                    draw.width = Math.abs(point.x - clientX - drawW) - left;
                    break;
                case "bottom-left":
                case "buttom-right":
                    draw.height = Math.abs(point.y - clientY - drawH) - top;
                    break;
            }
        },
        end(e: MouseEvent) {

        }
    }
}
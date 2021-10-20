import { DrawContour } from "../Draw/drawContour";
import { IApplyInterface } from "../types/gesture";
import { useContext } from "../util/useSingle";

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
            drawContour.width = e.clientX - drawContour.x - left;
            drawContour.height = e.clientY - drawContour.y - top;
            context.draw();
        },
        end() {
            context.contextCanvasList = context.contextCanvasList.filter(v => v != drawContour);
            context.draw();
        }
    }
}



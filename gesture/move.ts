import { IApplyInterface } from "../types/gesture";
import { areaDetection } from "../util/functional";
import { useContext } from "../util/useSingle";




export const move: IApplyInterface = () => {

    const [context] = useContext();

    const point = {
        x: 0,
        y: 0
    }
    return {
        type: "move",

        start(e: MouseEvent) {
            point.x = Math.abs(context.activeCanvas.x - e.clientX);
            point.y = Math.abs(context.activeCanvas.y - e.clientY);
        },
        move(e: MouseEvent) {
            const x = Math.abs(point.x - e.clientX);
            const y = Math.abs(point.y - e.clientY);
            context.activeCanvas.x = x;
            context.activeCanvas.y = y;
            context.draw();
        },
        end() {

        }
    }
}

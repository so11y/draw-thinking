import { IApplyInterface } from "../types/gesture";
import { useContext } from "../util/useSingle";

export const move: IApplyInterface = () => {

    const [context] = useContext();

    const { top, left } = context.offset;

    const point = {
        x: 0,
        y: 0
    }
    return {
        type: "move",

        start(e: MouseEvent) {
            point.x = Math.abs(context.activeCanvas.x - e.clientX) - left;
            point.y = Math.abs(context.activeCanvas.y - e.clientY) - top;
        },
        move(e: MouseEvent) {
            const x = Math.abs(point.x - e.clientX) - left;
            const y = Math.abs(point.y - e.clientY) - top;
            context.activeCanvas.x = x;
            context.activeCanvas.y = y;
            context.draw();
        },
        end() {

        }
    }
}

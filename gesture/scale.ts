import { IApplyInterface } from "../types/gesture";
import { useContext } from "../util/useSingle";



export const scale: IApplyInterface = () => {
    const [context] = useContext();

    console.log(context.activeCanvas);

    // context.activeCanvas.parent.

    const point = {
        x: 0,
        y: 0
    }

    return {
        type: "scale",

        start({ clientX, clientY }: MouseEvent) {
            point.x = clientX;
            point.y = clientY;
        },
        move(e: MouseEvent) {

        },
        end(e: MouseEvent) {

        }
    }
}
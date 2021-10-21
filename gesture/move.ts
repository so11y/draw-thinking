import { IApplyInterface } from "../types/gesture";
import { useContext } from "../util/useSingle";


const getPrevXy = () => {
    const xy = [];
    const [context] = useContext();
    if (context.activeCanvas.depend.length) {
        xy.push(
            ...context.activeCanvas.depend.map(v => {
                return {
                    x: v.x,
                    y: v.y
                }
            })
        );
    }
    return xy;
}

export const move: IApplyInterface = () => {

    const [context] = useContext();

    const { top, left } = context.offset;

    const activeX = context.activeCanvas.x,
        activeY = context.activeCanvas.y;

    const dependXy = getPrevXy();

    const point = {
        x: 0,
        y: 0,
    }
    return {
        type: "move",

        start(e: MouseEvent) {
            point.x = e.clientX - left;
            point.y = e.clientY - top;
        },
        move({ clientX, clientY }: MouseEvent) {

            context.activeCanvas.x = Math.abs(point.x - clientX - activeX)- left;
            context.activeCanvas.y = Math.abs(point.y - clientY - activeY) - top;

            if (context.activeCanvas.depend.length) {

                context.activeCanvas.depend.forEach((v, i) => {
                    v.x = Math.abs(point.x - clientX - dependXy[i].x) - left;
                    v.y = Math.abs(point.y - clientY - dependXy[i].y) - top;
                })
            }

        },
        end() {

        }
    }
}

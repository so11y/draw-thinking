import { IApplyInterface } from "../types/gesture";
import { useContext } from "../util/useSingle";

const linkLine: IApplyInterface = () => {


    const [context] = useContext();

    const width = context.activeCanvas.width;
    const height = context.activeCanvas.height;

    return {

        type: "linkLine",

        start() {
            context.activeCanvas.width = width * 2;
            context.activeCanvas.height = height * 2;
        },
        move() {

        },
        end() {
            context.activeCanvas.width = width;
            context.activeCanvas.height = height;
        }
    }
}

linkLine.ignore = () => {
    const [context] = useContext();
    return context.activeCanvas.componentKey != "LinkDot";
}

export {
    linkLine
}
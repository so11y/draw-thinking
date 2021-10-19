import { IApplyInterface } from "../types/gesture";
import { IDraw } from "../util/draw";
import { Draw } from "./parentDraw";

export class DrawMode implements IDraw {
    x: number;
    y: number;
    width: number;
    height: number;
    parent: Draw;
    depend: Array<Draw> = [];
    isHighlight: boolean = false;
    plugins: IApplyInterface[];
}

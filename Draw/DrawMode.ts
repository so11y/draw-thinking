import { IApplyInterface } from "../types/gesture";
import { IDraw } from "../types/draw";
import { Draw } from "./baseDraw";

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

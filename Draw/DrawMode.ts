import { Draw } from "./parentDraw";

export interface IDraw {
    x: number;
    y: number;
    width: number;
    height: number;
    parent: Draw;
    depend: Array<Draw>;
    isHighlight: boolean;
}

export class DrawMode implements IDraw {
    x: number;
    y: number;
    width: number;
    height: number;
    parent: Draw;
    depend: Array<Draw> = [];
    isHighlight: boolean = false;
}

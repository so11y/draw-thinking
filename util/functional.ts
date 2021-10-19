import { DrawRect } from "../types/draw";

export const areaDetection = (x: number, y: number, drawItem: DrawRect) => {
    /**
     * 距离头部的y需要加一下
     */
    const inX = (x >= drawItem.x && x <= drawItem.x + drawItem.width);
    const inY = (y >= drawItem.y && y <= drawItem.y + drawItem.height);

    if (inX && inY) {
        return true;
    }
    return false;
}

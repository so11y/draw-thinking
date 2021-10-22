import { Draw } from "../Draw/baseDraw";
import { DrawContour } from "../Draw/drawContour";
import { DrawRect } from "../types/draw";
import { GetDrawNumberType } from "../types/gesture";
import { useContext } from "./useSingle";

const getInject = (draw: Draw) => {

    const plugins = draw.plugins.slice();

    const getParentPlugins = (draw: Draw, pluginsKey: string) => {
        if (draw.parent) {
            const plugin = draw.parent.plugins.find(v => v.name === pluginsKey);

            if (plugin) return plugin;

            return getParentPlugins(draw.parent, pluginsKey);
        }
        throw new Error(`Inject ${pluginsKey} in parent not found`);
    }

    while (draw.inject.length) {
        const key = draw.inject.pop();
        plugins.push(getParentPlugins(draw, key))
    }

    draw.plugins = [...draw.plugins, ...plugins]
}



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


export const getMaxRect = (key: GetDrawNumberType, draw: Draw) => {
    return Math.max(...draw.depend.map(v => {
        return v[key];
    }));
}

export const getMinRect = (key: GetDrawNumberType, draw: Draw) => {
    return Math.min(...draw.depend.map(v => {
        return v[key];
    }));
}

export const clearDep = (drawContour: DrawContour) => {
    if (drawContour.depend.length) {
        drawContour.depend.forEach(v => v.parent = null)
    }
    drawContour.depend = [];
}

export const unMounted = (draw: Draw | string) => {
    const [context] = useContext();
    context.contextCanvasList = context.contextCanvasList.filter(v => {
        if (typeof draw == "string" && v.componentKey === draw) {
            clearDep(v);
            return false;
        } else if (v === draw) {
            clearDep(draw);
            return false;
        }
        return true;
    });
}

export const useInject = (draw: Draw) => {
    if (draw.inject.length) {
        if (!draw.parent) {
            throw new Error("useInject need parent");
        }
        getInject(draw);
    }
}

export const getFrist = <T extends any[]>(arr: T): T[0] => {
    return arr[0];
}

export const linkDepend = (parent:Draw,child:Draw) => {
    const [context] = useContext();
    child.parent = parent;
    parent.depend.push(child);
    context.contextCanvasList.push(child);
}
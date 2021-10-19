import { DrawGo } from "../Draw/draw";

export class useSingle {

    private static _instanceMap = new WeakMap();

    static useInstance<T>(cot: new (...arg: any[]) => T, ...arg: any[]): T {
        const v = useSingle._instanceMap.has(cot);
        if (!v) {
            useSingle._instanceMap.set(cot, new cot(...arg));
        }
        return useSingle._instanceMap.get(cot);
    }
}

export const useContext = (canvas?: HTMLCanvasElement): [DrawGo] => {
    return [useSingle.useInstance(DrawGo, canvas)];
}
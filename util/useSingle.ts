import { DrawGo } from "../Draw/draw";
import { ProxyEvent } from "../gesture/proxyEvent";
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

/**
 * @description 获取全局上下文
 */
export const useContext = (canvas?: HTMLCanvasElement): [DrawGo] => {
    return [useSingle.useInstance(DrawGo, canvas)];
}

/**
 * @description 获取单例事件代理
 */
export const useProxyEvent = (): [ProxyEvent] => {
    return [useSingle.useInstance(ProxyEvent)]
}
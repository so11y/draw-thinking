import { DrawGo } from "../Draw/draw";
import { ProxyEvent } from "../gesture/proxyEvent";
import { IgestureInstance } from "../types/gesture";
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

export const NOOP = () => { };

/**
 *
 * @description 这边也是设计缺陷了 导致先这么搞一下
 * 没有设计跳过的步骤
 */
export const useBreakEvent = (): IgestureInstance => {
    return {
        type: "NOOP",
        start: NOOP,
        move: NOOP,
        end: NOOP
    }
}

export const useObserveMove = (obEvent: Omit<IgestureInstance, "type">): [(e: MouseEvent) => void] => {
    const end = (e: MouseEvent) => {
        obEvent.end(e);
        window.removeEventListener("mousemove", obEvent.move);
        window.removeEventListener("mouseup", end);
    }
    window.addEventListener("mousemove", obEvent.move);
    window.addEventListener("mouseup", end);

    return [(e: MouseEvent) => {
        obEvent.start(e);
    }];
}

import { useProxyEvent } from "../util/useSingle";
import { DrawMode } from "./DrawMode";
import { ProxyEvent } from "./proxyEvent";

export class Draw extends DrawMode {

    ctx: CanvasRenderingContext2D;

    proxyEvent: ProxyEvent;

    constructor(ctx: CanvasRenderingContext2D) {

        super();

        this.ctx = ctx;

        const [proxyEvent] = useProxyEvent();

        this.proxyEvent = proxyEvent;

    }

    addProxy() {
        this.proxyEvent.add(this);
    }

    draw() {
        this.addProxy();
    };

}

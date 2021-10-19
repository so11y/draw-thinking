
import { useProxyEvent } from "../util/useSingle";
import { DrawMode } from "./DrawMode";
import { ProxyEvent } from "./proxyEvent";

export class Draw extends DrawMode {

    proxyEvent: ProxyEvent;

    constructor() {

        super();

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

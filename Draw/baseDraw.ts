
import { useInject } from "../util/functional";
import { useProxyEvent } from "../util/useSingle";
import { DrawMode } from "./DrawMode";

export class Draw extends DrawMode {

    addProxy() {

        const [proxyEvent] = useProxyEvent();

        useInject(this);

        proxyEvent.register(this,this.plugins);
    }

    draw() {
        this.addProxy();
    }

}

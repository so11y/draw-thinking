
import { useProxyEvent } from "../util/useSingle";
import { DrawMode } from "./drawMode";

export class Draw extends DrawMode {

    addProxy() {

        const [proxyEvent] = useProxyEvent();

        proxyEvent.register(this,this.plugins);
    }

    draw() {
        this.addProxy();
    }

}

import { DrawRect } from "./Draw/DrawReat";
import { useContext } from "./util/useSingle";


const [drawGo] = useContext(
    document.querySelector("canvas"));


drawGo
    .register("绘制矩形", DrawRect)
    .go();

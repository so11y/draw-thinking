import { Draw } from "../Draw/baseDraw";

type InstanceType = "move" | "contour" | "scale" | "linkLine" | "NOOP";
//手势
export type Igesture = Array<InstanceType>;

export interface IgestureInstance {
    type: InstanceType
    /**
     * @description 开始
     */
    start(e: MouseEvent): any;
    /**
     * @description 移动
     */
    move(e: MouseEvent): any;
    /**
     * @description 结束
     */
    end(e: MouseEvent): any;
}

export type IApplyInterface = {
    (): IgestureInstance;
    ignore?(): boolean
}



export type GetDrawNumberType = {
    [P in keyof Draw]: Draw[P] extends number ? P : never;
}[keyof Draw]
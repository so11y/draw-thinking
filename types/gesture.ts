type InstanceType = "move" | "contour";
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

export type IApplyInterface = () => IgestureInstance;
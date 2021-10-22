import { Draw } from "../Draw/baseDraw";
import { IApplyInterface } from "./gesture";

export type DrawRect = Pick<Draw, "x" | "y" | "width" | "height">;
export interface IDraw {
    /**
     * @description 組件名稱 唯一
     */
    componentKey: string;
    /**
     * @description 左
     */
    x: number;
    /**
     * @description 上
     */
    y: number;
    /**
     * @description 右
     */
    width: number;
    /**
     * @description 下
     */
    height: number;
    /**
     * @description 父级 一般情况下应该没有父级 现在肯定没有 还没实现
     */
    parent: Draw;
    /**
     * @description 依赖 比如全选拖拽 连接线
     */
    depend: Array<Draw>;
    /**
     * @description 申明需要使用到的手势
     */
    plugins: IApplyInterface[];
    /**
     * @description 注入手势
     */
    inject: string[];
}

export type Idirection = "top-left"     |
                         "top-right"    |
                         "bottom-left"  |
                         "buttom-right" |
                         "top-center"   |
                         "left-center"  |
                         "button-center"|
                         "right-center";
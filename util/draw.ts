import { Draw } from "../Draw/parentDraw";
import { IApplyInterface } from "../types/gesture";

export type DrawRect = Pick<Draw, "x" | "y" | "width" | "height">;


export interface IDraw {
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
     * @description 是否是当前激活象
     */
    isHighlight: boolean;
    /**
     * @description 申明需要使用到的手势
     */
    plugins: IApplyInterface[];
}
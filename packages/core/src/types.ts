import type { Observer } from "./observer";
import type { Renderer } from "./renderer";

export type OptionalValue<T> = T | undefined;
export type OptionalNumber = OptionalValue<number>;
export type OptionalString = OptionalValue<string>;
export type OptionalBoolean = OptionalValue<boolean>;

export type NullableValue<T> = T | null;
export type NullableNumber = NullableValue<number>;
export type NullableString = NullableValue<string>;
export type NullableBoolean = NullableValue<boolean>;

export interface WatermarkInitOptions {
  renderer?: Renderer;
  observer?: Observer;
}

export interface WatermarkBaseOptions {
  /**
   * 水印文字
   */
  text: string;
  /**
   * 水印起始位置x坐标（单位：px）
   */
  x: number;
  /**
   * 水印起始位置y坐标（单位：px）
   */
  y: number;
  /**
   * 水印行数（默认值：自动计算）
   */
  rows: number;
  /**
   * 水印列数（默认值：自动计算）
   */
  cols: number;
  /**
   * 水印x轴间距（单位：px）
   */
  xGap: number;
  /**
   * 水印y轴间隔（单位：px）
   */
  yGap: number;
  /**
   * 水印子项宽度（单位：px）
   */
  itemWidth: number;
  /**
   * 水印子项高度（单位：px）
   */
  itemHeight: number;
  /**
   * 水印字体大小
   */
  fontSize: string;
  /**
   * 水印字体
   */
  fontFamily: string;
  /**
   * 水印文字颜色
   */
  color: string;
  /**
   * 水印透明度（取值范围：`0` ~ `1`）
   */
  opacity: number;
  /**
   * 水印旋转角度（取值范围：`0` ~ `360`）
   */
  rotate: number;
}

export interface WatermarkDomOptions extends WatermarkBaseOptions {
  /**
   * 水印元素id
   */
  el: string;
  /**
   * 水印的 `z-index`
   */
  zIndex: number | string;
  /**
   * 水印子项id前缀
   */
  itemIdPrefix: string;
  /**
   * 水印挂载父元素（默认值：`document.body`）
   */
  parentEl?: string | HTMLElement;
  /**
   * 是否监听水印改变并自动重建
   */
  monitor: boolean;
}

export interface WatermarkWithoutDomOptions extends WatermarkBaseOptions {
  /**
   * 水印宽度（单位：px）
   */
  width: number;
  /**
   * 水印高度（单位：px）
   */
  height: number;
}

export type WatermarkOptions = WatermarkDomOptions | WatermarkWithoutDomOptions;
import { getEl } from "../helpers";
import type { WatermarkDomOptions } from "../types";
import type { Watermark } from "../watermark";
import { Renderer } from "./Renderer";

export class DomRenderer extends Renderer {

  _getOptions(wm: Watermark): WatermarkDomOptions {
    return wm._options as WatermarkDomOptions;
  }

  _getParentEl(wm: Watermark): HTMLElement {
    return getEl(this._getOptions(wm).parentEl) || document.body;
  }

  public update(wm: Watermark): void {
    const options = this._getOptions(wm);

    const parentEl = this._getParentEl(wm);

    const parentWidth = Math.max(parentEl.scrollWidth, parentEl.clientWidth);
    const parentHeight = Math.max(parentEl.scrollHeight, parentEl.clientHeight);

    const el = document.createElement("div");

    el.id = options.el;
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.zIndex = `${options.zIndex}`;
    el.style.pointerEvents = "none";

    const parentChildren = parentEl.children;
    const randomIndex = Math.floor(Math.random() * parentChildren.length);
    if (parentChildren[randomIndex]) {
      parentEl.insertBefore(el, parentChildren[randomIndex]!);
    } else {
      parentEl.appendChild(el);
    }

    const finalCols = options.cols > 0
      ? options.cols
      : Math.floor(
          (parentWidth - options.x)
          / (options.itemWidth + options.xGap)
        );
    const finalRows = options.rows > 0
      ? options.rows
      : Math.floor(
          (parentHeight - options.y)
          / (options.itemHeight + options.yGap)
        );

    const finalXGap = Math.floor(
      (parentWidth - options.x - options.itemWidth * finalCols)
      / finalCols
    );
    const finalYGap = Math.floor(
      (parentHeight - options.y - options.itemHeight * finalRows)
      / finalRows
    );

    const totalWidth =
      options.x + options.itemWidth * finalCols + finalXGap * (finalCols - 1);
    const totalHeight =
      options.y + options.itemHeight * finalRows + finalYGap * (finalRows - 1);

    for (let i = 0; i < finalRows; i += 1) {
      const y =
        options.y
        + (parentHeight - totalHeight) / 2
        + (options.itemHeight + finalYGap) * i;

      for (let j = 0; j < finalCols; j += 1) {
        const x =
          options.x
          + (parentWidth - totalWidth) / 2
          + (options.itemWidth + finalXGap) * j;

        const itemEl = document.createElement("div");
        const itemTextEl = document.createTextNode(options.text);

        itemEl.appendChild(itemTextEl);

        itemEl.id = `${options.itemIdPrefix}${i}${j}`;
        itemEl.style.position = "absolute";
        itemEl.style.top = `${y}px`;
        itemEl.style.left = `${x}px`;
        itemEl.style.display = "flex";
        itemEl.style.alignItems = "center";
        itemEl.style.justifyContent = "center";
        itemEl.style.width = `${options.itemWidth}px`;
        itemEl.style.height = `${options.itemHeight}px`;
        itemEl.style.fontSize = options.fontSize;
        itemEl.style.fontFamily = options.fontFamily;
        itemEl.style.color = options.color;
        itemEl.style.opacity = `${options.opacity}`;
        itemEl.style.transform = `rotate(-${options.rotate}deg)`;
        itemEl.style.overflow = "hidden";

        el.appendChild(itemEl);
      }
    }
  }

  public clear(wm: Watermark): void {
    const el = getEl(this._getOptions(wm).el);

    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

}
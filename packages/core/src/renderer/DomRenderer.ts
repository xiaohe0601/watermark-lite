import { getEl } from "../helpers";
import type { Watermark } from "../watermark";
import { Renderer } from "./Renderer";

export class DomRenderer extends Renderer {

  public update(wm: Watermark): void {
    wm._manualUnmount = false;

    const parentEl = wm._getParentEl();

    const parentWidth = Math.max(parentEl.scrollWidth, parentEl.clientWidth);
    const parentHeight = Math.max(parentEl.scrollHeight, parentEl.clientHeight);

    const el = document.createElement("div");

    el.id = wm._options.el;
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.zIndex = `${wm._options.zIndex}`;
    el.style.pointerEvents = "none";

    const parentChildren = parentEl.children;
    const randomIndex = Math.floor(Math.random() * parentChildren.length);
    if (parentChildren[randomIndex]) {
      parentEl.insertBefore(el, parentChildren[randomIndex]!);
    } else {
      parentEl.appendChild(el);
    }

    const finalCols = wm._options.cols > 0
      ? wm._options.cols
      : Math.floor(
        (parentWidth - wm._options.x)
        / (wm._options.itemWidth + wm._options.xGap)
      );
    const finalRows = wm._options.rows > 0
      ? wm._options.rows
      : Math.floor(
        (parentHeight - wm._options.y)
        / (wm._options.itemHeight + wm._options.yGap)
      );

    const finalXGap = Math.floor(
      (parentWidth - wm._options.x - wm._options.itemWidth * finalCols)
      / finalCols
    );
    const finalYGap = Math.floor(
      (parentHeight - wm._options.y - wm._options.itemHeight * finalRows)
      / finalRows
    );

    const totalWidth =
      wm._options.x + wm._options.itemWidth * finalCols + finalXGap * (finalCols - 1);
    const totalHeight =
      wm._options.y + wm._options.itemHeight * finalRows + finalYGap * (finalRows - 1);

    for (let i = 0; i < finalRows; i += 1) {
      const y =
        wm._options.y
        + (parentHeight - totalHeight) / 2
        + (wm._options.itemHeight + finalYGap) * i;

      for (let j = 0; j < finalCols; j += 1) {
        const x =
          wm._options.x
          + (parentWidth - totalWidth) / 2
          + (wm._options.itemWidth + finalXGap) * j;

        const itemEl = document.createElement("div");
        const itemTextEl = document.createTextNode(wm._options.text);

        itemEl.appendChild(itemTextEl);

        itemEl.id = `${wm._options.itemIdPrefix}${i}${j}`;
        itemEl.style.position = "absolute";
        itemEl.style.top = `${y}px`;
        itemEl.style.left = `${x}px`;
        itemEl.style.display = "flex";
        itemEl.style.alignItems = "center";
        itemEl.style.justifyContent = "center";
        itemEl.style.width = `${wm._options.itemWidth}px`;
        itemEl.style.height = `${wm._options.itemHeight}px`;
        itemEl.style.fontSize = wm._options.fontSize;
        itemEl.style.fontFamily = wm._options.fontFamily;
        itemEl.style.color = wm._options.color;
        itemEl.style.opacity = `${wm._options.opacity}`;
        itemEl.style.transform = `rotate(-${wm._options.rotate}deg)`;
        itemEl.style.overflow = "hidden";

        el.appendChild(itemEl);
      }
    }
  }

  public remove(wm: Watermark): void {
    const el = getEl(wm._options.el);

    if (el && el.parentNode) {
      wm._manualUnmount = true;

      el.parentNode.removeChild(el);
    }
  }

}
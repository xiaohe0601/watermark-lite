import type { NullableValue, WatermarkOptions } from "./types";
import { combineOptions, getEl } from "./helpers";

export class Watermark {
  _options = combineOptions();

  _manualUnmount = false;

  _getParentEl(): HTMLElement {
    return getEl(this._options.parentEl) || document.body;
  }

  _resizeHandler: NullableValue<() => void> = null;

  _startResizeListener(): void {
    if (this._resizeHandler != null) {
      this._stopResizeListener();
    }

    this._resizeHandler = () => {
      this._update();
    };

    window.addEventListener("resize", this._resizeHandler);
  }

  _stopResizeListener(): void {
    if (this._resizeHandler == null) {
      return;
    }

    window.removeEventListener("resize", this._resizeHandler);

    this._resizeHandler = null;
  }

  _observer: NullableValue<MutationObserver> = null;

  _startMutationObserver(): void {
    if (this._observer != null) {
      this._stopMutationObserver();
    }

    this._observer = new MutationObserver((mutations) => {
      if (this._manualUnmount) {
        return;
      }

      const [mutation] = mutations;

      if (mutation == null) {
        return;
      }

      if (mutation.target === this._getParentEl()) {
        const [removedNode] = mutation.removedNodes;

        if (removedNode != null
          && removedNode instanceof HTMLElement
          && removedNode.id === this._options.el) {
          this._update();
        }

        return;
      }

      const el = getEl(this._options.el);

      if (el == null) {
        return;
      }

      if (mutation.target === el) {
        this._update();
        return;
      }

      if (mutation.target instanceof HTMLElement
        && mutation.target.id.length > 0
        && mutation.target.id.startsWith(this._options.itemIdPrefix)) {
        this._update();
      }
    });

    this._observer.observe(this._getParentEl(), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style"]
    });
  }

  _stopMutationObserver(): void {
    if (this._observer == null) {
      return;
    }

    this._observer.disconnect();
    this._observer = null;
  }

  _update(): void {
    this._remove();

    this._manualUnmount = false;

    const parentEl = this._getParentEl();

    const parentWidth = Math.max(parentEl.scrollWidth, parentEl.clientWidth);
    const parentHeight = Math.max(parentEl.scrollHeight, parentEl.clientHeight);

    const el = document.createElement("div");

    el.id = this._options.el;
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "0";
    el.style.zIndex = `${this._options.zIndex}`;
    el.style.pointerEvents = "none";

    const parentChildren = parentEl.children;
    const randomIndex = Math.floor(Math.random() * parentChildren.length);
    if (parentChildren[randomIndex]) {
      parentEl.insertBefore(el, parentChildren[randomIndex]!);
    } else {
      parentEl.appendChild(el);
    }

    const finalCols = this._options.cols > 0
      ? this._options.cols
      : Math.floor(
        (parentWidth - this._options.x)
        / (this._options.itemWidth + this._options.xGap)
      );
    const finalRows = this._options.rows > 0
      ? this._options.rows
      : Math.floor(
        (parentHeight - this._options.y)
        / (this._options.itemHeight + this._options.yGap)
      );

    const finalXGap = Math.floor(
      (parentWidth - this._options.x - this._options.itemWidth * finalCols)
      / finalCols
    );
    const finalYGap = Math.floor(
      (parentHeight - this._options.y - this._options.itemHeight * finalRows)
      / finalRows
    );

    const totalWidth
      = this._options.x + this._options.itemWidth * finalCols + finalXGap * (finalCols - 1);
    const totalHeight
      = this._options.y + this._options.itemHeight * finalRows + finalYGap * (finalRows - 1);

    for (let i = 0; i < finalRows; i += 1) {
      const y
        = this._options.y
        + (parentHeight - totalHeight) / 2
        + (this._options.itemHeight + finalYGap) * i;

      for (let j = 0; j < finalCols; j += 1) {
        const x
          = this._options.x
          + (parentWidth - totalWidth) / 2
          + (this._options.itemWidth + finalXGap) * j;

        const itemEl = document.createElement("div");
        const itemTextEl = document.createTextNode(this._options.text);

        itemEl.appendChild(itemTextEl);

        itemEl.id = `${this._options.itemIdPrefix}${i}${j}`;
        itemEl.style.position = "absolute";
        itemEl.style.top = `${y}px`;
        itemEl.style.left = `${x}px`;
        itemEl.style.width = `${this._options.itemWidth}px`;
        itemEl.style.height = `${this._options.itemHeight}px`;
        itemEl.style.fontSize = this._options.fontSize;
        itemEl.style.fontFamily = this._options.fontFamily;
        itemEl.style.textAlign = "center";
        itemEl.style.color = this._options.color;
        itemEl.style.opacity = `${this._options.opacity}`;
        itemEl.style.transform = `rotate(-${this._options.angle}deg)`;
        itemEl.style.overflow = "hidden";

        el.appendChild(itemEl);
      }
    }

    if (this._options.monitor) {
      this._startMutationObserver();
    }
  }

  _remove(): void {
    const el = getEl(this._options.el);

    if (el && el.parentNode) {
      this._manualUnmount = true;

      el.parentNode.removeChild(el);
    }
  }

  mount(options?: Partial<WatermarkOptions>): void {
    this._options = combineOptions(options);

    this._update();

    this._startResizeListener();
  }

  unmount(): void {
    this._stopResizeListener();
    this._stopMutationObserver();

    this._remove();
  }
}
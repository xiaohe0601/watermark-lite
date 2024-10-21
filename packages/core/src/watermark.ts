import { throttle } from "throttle-debounce";
import { combineOptions, getEl } from "./helpers";
import { DomRenderer } from "./renderer/DomRenderer";
import type { Renderer } from "./renderer/Renderer";
import type { NullableValue, WatermarkOptions } from "./types";

export class Watermark {

  _renderer: Renderer;

  _options = combineOptions();

  _manualUnmount = false;

  constructor(renderer: Renderer = new DomRenderer()) {
    this._renderer = renderer;
  }

  _getParentEl(): HTMLElement {
    return getEl(this._options.parentEl) || document.body;
  }

  _parentSize: NullableValue<ResizeObserverSize> = null;

  _resizeObserver: NullableValue<ResizeObserver> = null;

  _startResizeObserver(): void {
    if (this._resizeObserver != null) {
      this._stopResizeObserver();
    }

    this._resizeObserver = new ResizeObserver((entries) => {
      const [entry] = entries;

      if (entry == null) {
        return;
      }

      const entrySize = entry.borderBoxSize[0];

      if (entrySize == null) {
        return;
      }

      if (this._parentSize == null) {
        this._parentSize = entrySize;
        return;
      }

      if (this._parentSize.inlineSize !== entrySize.inlineSize
        || this._parentSize.blockSize !== entrySize.blockSize) {
        this._throttleUpdate();
      }
    });

    this._resizeObserver.observe(this._getParentEl());
  }

  _stopResizeObserver(): void {
    if (this._resizeObserver == null) {
      return;
    }

    this._resizeObserver.disconnect();
    this._resizeObserver = null;

    this._parentSize = null;
  }

  _mutationObserver: NullableValue<MutationObserver> = null;

  _startMutationObserver(): void {
    if (this._mutationObserver != null) {
      this._stopMutationObserver();
    }

    this._mutationObserver = new MutationObserver((mutations) => {
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
          this._throttleUpdate();
        }

        return;
      }

      const el = getEl(this._options.el);

      if (el == null) {
        return;
      }

      if (mutation.target === el) {
        this._throttleUpdate();
        return;
      }

      if (mutation.target instanceof HTMLElement
        && mutation.target.id.length > 0
        && mutation.target.id.startsWith(this._options.itemIdPrefix)) {
        this._throttleUpdate();
      }
    });

    this._mutationObserver.observe(this._getParentEl(), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style"]
    });
  }

  _stopMutationObserver(): void {
    if (this._mutationObserver == null) {
      return;
    }

    this._mutationObserver.disconnect();
    this._mutationObserver = null;
  }

  _update(): void {
    this._remove();

    this._renderer.update(this);

    if (this._options.monitor) {
      this._startMutationObserver();
    }
  }

  _throttleUpdate = throttle(200, this._update);

  _remove(): void {
    this._renderer.remove(this);
  }

  mount(options?: Partial<WatermarkOptions>): void {
    this._options = combineOptions(options);

    this._update();

    this._startResizeObserver();
  }

  unmount(): void {
    this._stopResizeObserver();
    this._stopMutationObserver();

    this._remove();
  }

}

export const watermark = new Watermark();

export const wm = watermark;
import { getEl } from "../helpers";
import type { NullableValue, WatermarkDomOptions } from "../types";
import type { Watermark } from "../watermark";
import { Observer } from "./Observer";

export class DomObserver extends Observer {

  _getOptions(wm: Watermark): WatermarkDomOptions {
    return wm._options as WatermarkDomOptions;
  }

  _getParentEl(wm: Watermark): HTMLElement {
    return getEl(this._getOptions(wm).parentEl) || document.body;
  }

  _parentSize: NullableValue<ResizeObserverSize> = null;

  _resizeObserver: NullableValue<ResizeObserver> = null;

  public observeResize(wm: Watermark): void {
    if (this._resizeObserver != null) {
      this.neglectResize();
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
        wm._throttleUpdate();
      }
    });

    this._resizeObserver.observe(this._getParentEl(wm));
  }

  public neglectResize(): void {
    if (this._resizeObserver == null) {
      return;
    }

    this._resizeObserver.disconnect();
    this._resizeObserver = null;

    this._parentSize = null;
  }

  _mutationObserver: NullableValue<MutationObserver> = null;

  public observeMutate(wm: Watermark): void {
    if (this._mutationObserver != null) {
      this.neglectMutate();
    }

    this._mutationObserver = new MutationObserver((mutations) => {
      if (this.isManualUnmount()) {
        return;
      }

      const [mutation] = mutations;

      if (mutation == null) {
        return;
      }

      const options = this._getOptions(wm);

      if (mutation.target === this._getParentEl(wm)) {
        const [removedNode] = mutation.removedNodes;

        if (removedNode != null
          && removedNode instanceof HTMLElement
          && removedNode.id === options.el) {
          wm._throttleUpdate();
        }

        return;
      }

      const el = getEl(options.el);

      if (el == null) {
        return;
      }

      if (mutation.target === el) {
        wm._throttleUpdate();
        return;
      }

      if (mutation.target instanceof HTMLElement
        && mutation.target.id.length > 0
        && mutation.target.id.startsWith(options.itemIdPrefix)) {
        wm._throttleUpdate();
      }
    });

    this._mutationObserver.observe(this._getParentEl(wm), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style"]
    });
  }

  public neglectMutate(): void {
    if (this._mutationObserver == null) {
      return;
    }

    this._mutationObserver.disconnect();
    this._mutationObserver = null;
  }

}
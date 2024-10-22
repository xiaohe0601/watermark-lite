import { throttle } from "throttle-debounce";
import { combineOptions, getEl } from "./helpers";
import type { Observer } from "./observer";
import { DomObserver } from "./observer";
import type { Renderer } from "./renderer";
import { DomRenderer } from "./renderer";
import type { WatermarkInitOptions, WatermarkOptions } from "./types";

export class Watermark {

  _renderer: Renderer;

  _observer: Observer;

  _options = combineOptions();

  _manualUnmount = false;

  constructor(options: WatermarkInitOptions = {}) {
    this._renderer = options.renderer || new DomRenderer();
    this._observer = options.observer || new DomObserver();
  }

  _getParentEl(): HTMLElement {
    return getEl(this._options.parentEl) || document.body;
  }

  _update(): void {
    this._remove();

    this._renderer.update(this);

    if (this._options.monitor) {
      this._observer.observeMutate(this);
    }
  }

  _throttleUpdate = throttle(200, this._update);

  _remove(): void {
    this._renderer.remove(this);
  }

  mount(options?: Partial<WatermarkOptions>): void {
    this._options = combineOptions(options);

    this._update();

    this._observer.observeResize(this);
  }

  unmount(): void {
    this._observer.neglectResize();
    this._observer.neglectMutate();

    this._remove();
  }

}

export const watermark = new Watermark();

export const wm = watermark;
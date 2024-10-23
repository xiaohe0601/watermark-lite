import { throttle } from "throttle-debounce";
import { combineOptions } from "./helpers";
import type { Observer } from "./observer";
import { DomObserver } from "./observer";
import type { Renderer } from "./renderer";
import { DomRenderer } from "./renderer";
import type { WatermarkInitOptions, WatermarkOptions } from "./types";

export class Watermark {

  _renderer: Renderer;

  _observer: Observer;

  _options = combineOptions();

  constructor(options: WatermarkInitOptions = {}) {
    this._renderer = options.renderer || new DomRenderer();
    this._observer = options.observer || new DomObserver();
  }

  _update(): void {
    this._clear();

    this._observer.setManualUnmount(false);

    this._renderer.update(this);

    if ("monitor" in this._options && this._options.monitor) {
      this._observer.observeMutate(this);
    }
  }

  _throttleUpdate = throttle(200, this._update);

  _clear(): void {
    this._observer.setManualUnmount(true);

    this._renderer.clear(this);
  }

  mount(options?: Partial<WatermarkOptions>): void {
    this._options = combineOptions(options);

    this._update();

    this._observer.observeResize(this);
  }

  unmount(): void {
    this._observer.neglectResize();
    this._observer.neglectMutate();

    this._clear();
  }

}

export const watermark = new Watermark();

export const wm = watermark;
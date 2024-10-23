import type { Watermark } from "../watermark";

export abstract class Observer {

  _manualUnmount = false;

  isManualUnmount(): boolean {
    return this._manualUnmount;
  }

  setManualUnmount(value: boolean): void {
    this._manualUnmount = value;
  }

  abstract observeResize(wm: Watermark): void;

  abstract neglectResize(): void;

  abstract observeMutate(wm: Watermark): void;

  abstract neglectMutate(): void;

}
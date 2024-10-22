import type { Watermark } from "../watermark";

export abstract class Observer {

  abstract observeResize(wm: Watermark): void;

  abstract neglectResize(): void;

  abstract observeMutate(wm: Watermark): void;

  abstract neglectMutate(): void;

}
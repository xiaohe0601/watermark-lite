import type { Watermark } from "../watermark";

export abstract class Renderer {

  abstract update(wm: Watermark): void;

  abstract clear(wm: Watermark): void;

}
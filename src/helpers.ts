import type { NullableValue, OptionalValue, WatermarkOptions } from "./types";
import { defaultSettings } from "./config";

export function combineOptions(...options: Partial<WatermarkOptions | undefined>[]): WatermarkOptions {
  return Object.assign({}, defaultSettings, ...options);
}

export function getEl(el: OptionalValue<string | HTMLElement>): NullableValue<HTMLElement> {
  if (typeof el === "string") {
    return document.getElementById(el);
  }

  return el || null;
}
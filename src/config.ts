import type { WatermarkOptions } from "./types";

export const defaultSettings: WatermarkOptions = {
  el: "watermark",
  text: "default watermark",
  x: 0,
  y: 0,
  rows: 0,
  cols: 0,
  xGap: 50,
  yGap: 50,
  zIndex: 99999,
  itemIdPrefix: "watermark-item",
  itemWidth: 100,
  itemHeight: 100,
  fontSize: "14px",
  fontFamily: "inherit",
  color: "#000000",
  opacity: 0.15,
  angle: 15,
  monitor: true
};
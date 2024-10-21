import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index.ts"
  ],
  clean: true,
  declaration: true,
  externals: [
    "throttle-debounce"
  ],
  rollup: {
    emitCJS: true
  }
});
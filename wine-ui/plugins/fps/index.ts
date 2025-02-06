import type { App } from "vue";
import FpsMonitor from "./FpsMonitor.vue";

export interface FpsOptions {
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  margin?: number;
  show?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  interval?: number;
}

const globalOptions: FpsOptions = {};

export default {
  install: (app: App, options: FpsOptions = {}) => {
    Object.assign(globalOptions, options);
    app.provide("fps-options", globalOptions);
    app.component("FpsMonitor", FpsMonitor);
  },
};

export { FpsMonitor, globalOptions };

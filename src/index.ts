import type { App } from "vue";
import Topbar from "./components/Topbar";
import type { MenuItem } from "./components/Topbar/types";

export { Topbar };
export type { MenuItem }; // 导出类型

export default {
  install(app: App) {
    app.component("xTopbar", Topbar);
  },
};

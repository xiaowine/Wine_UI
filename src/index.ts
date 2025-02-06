import type { App } from "vue";
import Topbar from "./components/Topbar";
import ThemeTransition from "./components/ThemeTransition";
import ThemeSwitch from "./components/ThemeSwitch";
import type { MenuItem } from "./components/Topbar/types";

export { Topbar, ThemeTransition, ThemeSwitch };
export type { MenuItem };

export default {
  install(app: App) {
    app.component("xTopbar", Topbar);
    app.component("xThemeTransition", ThemeTransition);
  },
};

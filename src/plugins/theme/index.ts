import type { App } from "vue";
import { createTheme } from "./theme";
import type { ThemeOptions } from "./types";

export * from "./types";

export default {
  install: (app: App, options: ThemeOptions = {}) => {
    const theme = createTheme(options);

    // 注入全局属性
    app.config.globalProperties.$theme = theme;

    // 提供注入
    app.provide("theme", theme);

    // 只有在未保存主题且启用自动模式时才启用系统主题跟随
    if (
      options.auto !== false &&
      !localStorage.getItem(options.storageKey || "wine-ui-theme")
    ) {
      theme.enableAutoTheme();
    }

    // 清理函数
    app.config.globalProperties.$dispose = () => {
      theme.disableAutoTheme();
    };
  },
};

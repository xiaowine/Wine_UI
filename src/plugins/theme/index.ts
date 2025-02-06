import type { App } from "vue";
import { createTheme } from "./theme";
import type { ThemeOptions } from "./types";

export * from "./types";

export default {
  install: (app: App, options: ThemeOptions = {}) => {
    const theme = createTheme(options);

    // 确保初始主题被正确设置
    theme.setTheme(options.defaultTheme || "light");

    // 注入全局属性
    app.config.globalProperties.$theme = theme;

    // 提供注入
    app.provide("theme", theme);

    // 自动启用系统主题跟随
    if (options.auto !== false) {
      theme.enableAutoTheme();
    }

    // 清理函数
    app.config.globalProperties.$dispose = () => {
      theme.disableAutoTheme();
    };
  },
};

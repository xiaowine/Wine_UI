import { ref, computed } from "vue";
import type { Theme, ThemeContext, ThemeOptions } from "./types";

export function createTheme(options: ThemeOptions = {}): ThemeContext {
  const THEME_KEY = options.storageKey || "wine-ui-theme";
  const defaultTheme = options.defaultTheme || "light";

  // 获取保存的主题或默认主题
  const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
  const currentTheme = ref<Theme>(savedTheme || defaultTheme);

  // 立即应用保存的主题
  document.documentElement.setAttribute("data-theme", currentTheme.value);

  const systemThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)");

  const updateTheme = (theme: Theme) => {
    currentTheme.value = theme;
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    options.onThemeChange?.(theme);
  };

  const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const theme: Theme = e.matches ? "dark" : "light";
    updateTheme(theme);
  };

  return {
    theme: computed(() => currentTheme.value),

    setTheme(theme: Theme) {
      updateTheme(theme);
    },

    toggleTheme() {
      const theme: Theme = currentTheme.value === "light" ? "dark" : "light";
      updateTheme(theme);
    },

    enableAutoTheme() {
      handleSystemThemeChange(systemThemeMatcher);
      systemThemeMatcher.addEventListener("change", handleSystemThemeChange);
    },

    disableAutoTheme() {
      systemThemeMatcher.removeEventListener("change", handleSystemThemeChange);
    },
  };
}

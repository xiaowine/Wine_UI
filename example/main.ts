import { createApp } from "vue";
import App from "./App.vue";
import ThemePlugin from "@/plugins/theme";

const app = createApp(App);
app.use(ThemePlugin, {
  defaultTheme: "dark",
  auto: false,
  onThemeChange: (theme) => {
    console.log("主题切换为:", theme);
  },
});
app.mount("#app");

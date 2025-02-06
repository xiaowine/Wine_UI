import { createApp } from "vue";
import App from "./App.vue";
import ThemePlugin from "wine-ui/plugins/theme";
import FpsPlugin from "wine-ui/plugins/fps";

const app = createApp(App);
app.use(ThemePlugin, {
  defaultTheme: "light",
  auto: true,
  onThemeChange: (theme) => {
    console.log("主题切换为:", theme);
  },
});
app.use(FpsPlugin, {
  position: "bottomRight",
  marginRight: 20,
  marginBottom: 10,
  show: true,
});

app.mount("#app");

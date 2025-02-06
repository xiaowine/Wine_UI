import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  plugins: [vue()],
  root: "example",
  publicDir: resolve(__dirname, "example/public"),
  resolve: {
    alias: {
      "@": resolve(__dirname, "wine-ui"),
      "@components": resolve(__dirname, "wine-ui/components"),
      "@example": resolve(__dirname, "example"),
      "wine-ui": resolve(__dirname, "wine-ui"),
      // 添加样式别名
      "@theme": resolve(__dirname, "wine-ui/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/theme.scss";;`,
        includePaths: [resolve(__dirname)],
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "example/index.html"),
      },
    },
  },
  preview: {
    port: 5000,
    strictPort: true,
    host: true,
  },
});

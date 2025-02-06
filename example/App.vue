<template>
  <div class="app-container">
    <Topbar
      v-model="isTopbarMenuOpen"
      :logo="logo"
      title="Wine UI"
      nav-position="left"
      :items="menuItems"
      mobile-nav-gap="20px"
      @before-open="handleBeforeOpen"
      @before-close="handleBeforeClose"
      @opened="handleOpened"
      @closed="handleClosed"
      @before-select="handleBeforeSelect"
      @select="handleSelect"
      @selected="handleSelected"
    >
      <template #right>
        <ThemeSwitch
          :theme="themeContext?.theme.value ?? 'light'"
          @toggleThemeEvent="toggleTheme"
        />
      </template>
    </Topbar>
    <div class="main-content">
      <div class="container">
        <h1>Wine UI 组件库示例</h1>
      </div>
    </div>
    <ThemeTransition
      ref="themeTransitionRef"
      @transition-complete="onTransitionComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { Topbar, type MenuItem, ThemeTransition } from "wine-ui";
import logo from "@example/assets/vue.svg";
import type { MenuEventType } from "@/components/Topbar/types";
import type { ThemeContext } from "@/plugins/theme/types";
import ThemeSwitch from "./components/ThemeSwitch.vue";

const isTopbarMenuOpen = ref(false);

// 注入主题实例
const themeContext = inject<ThemeContext>("theme");

const themeTransitionRef = ref();

const menuItems: MenuItem[] = [
  {
    key: "home",
    label: "首页",
    link: "#",
    onClick: () => console.log("点击首页"),
  },
  {
    key: "products",
    label: "产品",
    link: "#products",
  },
  {
    key: "about",
    label: "关于",
    link: "#about",
  },
];

const handleSelect = (item: MenuItem) => {
  console.log("选中菜单项:", item.label);
};

const handleBeforeOpen = () => {
  console.log("即将打开菜单");
  return true; // 返回 false 可以阻止打开
};

const handleBeforeClose = (type: MenuEventType) => {
  console.log("即将关闭菜单", type);
  return true; // 返回 false 可以阻止关闭
};

const handleOpened = () => {
  console.log("菜单已打开");
};

const handleClosed = (type: MenuEventType) => {
  console.log("菜单已关闭", type);
  isTopbarMenuOpen.value = false;
};

const handleBeforeSelect = (item: MenuItem) => {
  console.log("即将选择菜单项:", item.label);
  // 返回 false 可以阻止选择和后续的关闭操作
  return true;
};

const handleSelected = (item: MenuItem) => {
  console.log("菜单项已选择:", item.label);
};

// 新增：主题切换相关变量
let pendingThemeChange = false;

// 新增：动画完成后的回调
const onTransitionComplete = () => {
  if (pendingThemeChange) {
    themeContext?.toggleTheme();
    pendingThemeChange = false;
  }
};

// 修改切换主题方法
const toggleTheme = () => {
  const nextTheme = themeContext?.theme.value === "light" ? "dark" : "light";
  const nextColor = nextTheme === "light" ? "#ffffff" : "#1a1a1a";

  pendingThemeChange = true;
  themeTransitionRef.value?.trigger(nextColor);
};
</script>

<style lang="scss">
@use "wine-ui/styles/theme.scss" as *;

.app-container {
  min-height: 100vh;
  background-color: var(--w-bg-color);
  color: var(--w-text-color);
}

.main-content {
  padding-top: var(--w-topbar-height, 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @include mobile {
    padding: 15px;
  }
}
</style>

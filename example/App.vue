<template>
  <div class="app-container">
    <Topbar
      v-model="isTopbarMenuOpen"
      :logo="toplogo"
      title="Wine UI"
      nav-position="right"
      :items="menuItems"
      :shadow="true"
      :fixed="true"
      gap="20px"
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
    <div class="card-example">
      <h3>卡片组件RoundCard示例</h3>
      <div class="card-example-container">
        <RoundCard class="image-card" :radius="0">
          <img src="https://picsum.photos/300/200" alt="示例图片" />
        </RoundCard>
        <RoundCard
          v-for="i in 6"
          :key="i"
          class="image-card"
          :radius="i * 7 * 2"
        >
          <img src="https://picsum.photos/300/200" alt="示例图片" />
        </RoundCard>
        <RoundCard class="image-card">
          <img src="https://picsum.photos/300/200" alt="示例图片" />
        </RoundCard>
      </div>
    </div>
  </div>
  <ThemeTransition
    ref="themeTransitionRef"
    @transition-complete="onTransitionComplete"
  />
  <FpsMonitor
    position="bottomRight"
    marginRight="20"
    marginBottom="10"
    :show="true"
    :interval="1000"
  />
</template>

<script setup lang="ts">
import toplogo from "/vue.svg";
import { ref, inject } from "vue";
import {
  Topbar,
  ThemeTransition,
  ThemeSwitch,
  FpsMonitor,
  RoundCard,
  type MenuItem,
} from "wine-ui";
import { debounce } from "wine-ui/utils";
import type { MenuEventType } from "wine-ui/components/Topbar/types";
import type { ThemeContext } from "wine-ui/plugins/theme/types";

const isTopbarMenuOpen = ref(false);

const themeContext = inject<ThemeContext>("theme");

const themeTransitionRef = ref();

let pendingThemeChange = false;

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
  return true;
};

const handleBeforeClose = (type: MenuEventType) => {
  console.log("即将关闭菜单", type);
  return true;
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
  return true;
};

const handleSelected = (item: MenuItem) => {
  console.log("菜单项已选择:", item.label);
};

const onTransitionComplete = () => {
  if (pendingThemeChange) {
    console.log("主题切换动画完成");
    themeContext?.toggleTheme();
    pendingThemeChange = false;
  }
};

// 使用防抖包装主题切换函数
const toggleTheme = debounce(async () => {
  if (pendingThemeChange || themeTransitionRef.value?.isAnimating) return;

  const nextTheme = themeContext?.theme.value === "light" ? "dark" : "light";
  const nextColor = getComputedStyle(document.documentElement)
    .getPropertyValue(
      nextTheme === "light" ? "--w-bg-color-light" : "--w-bg-color-dark"
    )
    .trim();

  pendingThemeChange = await themeTransitionRef.value?.trigger(nextColor);
  console.log("开始主题切换动画", pendingThemeChange);
}, 300);
</script>

<style lang="scss">
@use "@theme/theme.scss" as *;

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
.card-example {
  padding: 50px;
  &-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
}

.image-card {
  width: 200px;
  height: 166px;
}
</style>

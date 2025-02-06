<template>
  <div
    class="w-topbar"
    :class="{ 'w-topbar-fixed': fixed }"
    :style="topbarStyle"
  >
    <div class="w-topbar-content">
      <div class="w-logo">
        <img v-if="logo" :src="logo" :alt="title" />
        <span v-else>{{ title }}</span>
      </div>
      <nav class="w-nav-menu" :class="menuClasses" :style="navStyle">
        <slot name="menu">
          <template v-if="items?.length">
            <a
              v-for="item in items"
              :key="item.key"
              :href="item.link || '#'"
              class="nav-item"
              @click.prevent="handleItemClick(item)"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.label }}
            </a>
          </template>
          <slot v-else></slot>
        </slot>
      </nav>

      <div class="w-topbar-right">
        <slot name="right"></slot>
        <div
          class="w-menu-toggle"
          :class="{ 'is-active': modelValue }"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type {
  TopbarProps,
  TopbarEmits,
  TopbarVars,
  MenuItem,
  MenuEventType,
} from "./types";

const props = withDefaults(defineProps<TopbarProps>(), {
  modelValue: false,
  logo: "",
  title: "Logo",
  fixed: true,
  zIndex: 1000,
  height: "60px",
  shadow: true,
  navPosition: "center",
  navGap: "30px",
  mobileNavGap: "15px",
  items: () => [],
});

const emit = defineEmits<TopbarEmits>();

const topbarStyle = computed<Partial<TopbarVars>>(() => ({
  "--w-topbar-height":
    typeof props.height === "number" ? `${props.height}px` : props.height,
  "--w-topbar-z-index": props.zIndex,
  "--w-topbar-shadow": props.shadow ? `var(--w-shadow)` : "none",
}));

const navStyle = computed<Partial<TopbarVars>>(() => ({
  "--w-nav-gap":
    typeof props.navGap === "number" ? `${props.navGap}px` : props.navGap,
  "--w-mobile-nav-gap":
    typeof props.mobileNavGap === "number"
      ? `${props.mobileNavGap}px`
      : props.mobileNavGap,
}));

// 修改计算属性，确保正确获取 navPosition
const currentPosition = computed(() => {
  console.log("Current navPosition:", props.navPosition); // 添加调试日志
  return props.navPosition ?? "center"; // 使用空值合并运算符
});

const menuClasses = computed(() => ({
  "w-nav-menu-active": props.modelValue,
  [`w-nav-menu-${currentPosition.value}`]: true, // 确保使用 .value
}));

// 处理打开菜单
const handleOpen = async () => {
  const beforeOpen = await Promise.resolve(emit("before-open") !== false);
  if (!beforeOpen) return;

  emit("update:modelValue", true);
  emit("opened");
};

// 处理关闭菜单
const handleClose = async (type: MenuEventType) => {
  const beforeClose = await Promise.resolve(
    emit("before-close", type) !== false
  );
  if (!beforeClose) return;

  emit("update:modelValue", false);
  emit("closed", type);
};

// 处理菜单切换
const toggleMenu = async () => {
  if (props.modelValue) {
    await handleClose("menu");
  } else {
    await handleOpen();
  }
};

// 处理菜单项点击
const handleItemClick = async (item: MenuItem) => {
  const beforeSelect = await Promise.resolve(
    emit("before-select", item) !== false
  );
  if (!beforeSelect) return;

  emit("select", item);
  emit("selected", item);
  item.onClick?.();

  // 移动端点击后自动关闭，但也要经过 beforeClose 检查
  if (window.innerWidth <= 768) {
    await handleClose("menu");
  }
};

// ESC 键关闭处理
onMounted(() => {
  const handleEsc = async (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.modelValue) {
      await handleClose("escape");
    }
  };

  document.addEventListener("keydown", handleEsc);
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEsc);
  });
});
</script>

<style lang="scss">
@use "./index.scss";
</style>

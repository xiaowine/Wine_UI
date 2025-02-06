<template>
  <div
    class="w-topbar"
    :class="{ 'w-topbar-fixed': fixed }"
    :style="topbarStyle"
  >
    <div class="w-topbar-content">
      <div class="w-topbar-left">
        <div class="w-logo">
          <img v-if="logo" :src="logo" :alt="title" />
          <span v-else>{{ title }}</span>
        </div>
        <NavMenu
          v-if="currentPosition === 'left'"
          :items="items"
          position="left"
          :active="modelValue"
          :nav-gap="navGap"
          :mobile-nav-gap="mobileNavGap"
          @select="handleItemClick"
        />
        <slot name="left"></slot>
      </div>

      <div class="w-topbar-center">
        <slot name="center"></slot>
        <NavMenu
          v-if="currentPosition === 'center'"
          :items="items"
          position="center"
          :active="modelValue"
          :nav-gap="navGap"
          :mobile-nav-gap="mobileNavGap"
          @select="handleItemClick"
        />
      </div>

      <div class="w-topbar-right">
        <slot name="right"></slot>
        <NavMenu
          v-if="currentPosition === 'right'"
          :items="items"
          position="right"
          :active="modelValue"
          :nav-gap="navGap"
          :mobile-nav-gap="mobileNavGap"
          @select="handleItemClick"
        />
        <div
          class="w-menu-toggle"
          :class="{ 'is-active': modelValue }"
          @click="() => toggleMenu(modelValue)"
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
import type { TopbarProps, TopbarEmits, TopbarVars } from "./types";
import { useMenu } from "./composables/useMenu";
import NavMenu from "./components/NavMenu.vue";

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
const { handleClose, toggleMenu, handleItemClick } = useMenu(emit);

const topbarStyle = computed<Partial<TopbarVars>>(() => ({
  "--w-topbar-height":
    typeof props.height === "number" ? `${props.height}px` : props.height,
  "--w-topbar-z-index": props.zIndex,
  "--w-topbar-shadow": props.shadow ? `var(--w-shadow)` : "none",
}));

const currentPosition = computed(() => props.navPosition ?? "center");

// ESC 键关闭处理
onMounted(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.modelValue) {
      handleClose("escape");
    }
  };

  document.addEventListener("keydown", handleEsc);
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEsc);
  });
});
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>

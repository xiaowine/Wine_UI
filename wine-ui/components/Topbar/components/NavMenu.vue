<template>
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
    </slot>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MenuItem } from "../types";

interface NavMenuProps {
  items?: MenuItem[];
  position?: "left" | "center" | "right";
  active?: boolean;
  navGap?: string | number;
  mobileNavGap?: string | number;
}

const props = withDefaults(defineProps<NavMenuProps>(), {
  items: () => [],
  position: "center",
  active: false,
  navGap: "30px",
  mobileNavGap: "15px",
});

const emit = defineEmits<{
  (e: "select", item: MenuItem): void;
}>();

const navStyle = computed(() => ({
  "--w-nav-gap":
    typeof props.navGap === "number" ? `${props.navGap}px` : props.navGap,
  "--w-mobile-nav-gap":
    typeof props.mobileNavGap === "number"
      ? `${props.mobileNavGap}px`
      : props.mobileNavGap,
}));

const menuClasses = computed(() => ({
  "w-nav-menu-active": props.active,
  [`w-nav-menu-${props.position}`]: true,
}));

const handleItemClick = (item: MenuItem) => {
  emit("select", item);
  item.onClick?.();
};
</script>
<style lang="scss" scoped>
@use "../index.scss";
</style>

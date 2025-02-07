<template>
  <nav
    class="w-nav-menu"
    :class="{
      'w-nav-menu-left': position === 'left',
      'w-nav-menu-right': position === 'right',
      'w-nav-menu-center': position === 'center',
      'w-nav-menu-active': active,
    }"
    :style="{
      '--w-nav-gap': navGap
        ? `${typeof navGap === 'number' ? navGap + 'px' : navGap}`
        : undefined,
      '--w-nav-item-gap-mobile': mobileItemGap
        ? `${
            typeof mobileItemGap === 'number'
              ? mobileItemGap + 'px'
              : mobileItemGap
          }`
        : undefined,
      '--w-nav-container-padding': mobileNavGap
        ? `${
            typeof mobileNavGap === 'number'
              ? mobileNavGap + 'px'
              : mobileNavGap
          }`
        : undefined,
    }"
  >
    <div class="w-nav-menu-content" v-for="item in items" :key="item.key">
      <a
        class="w-nav-item"
        :href="item.link"
        :class="{ 'w-nav-link-active': item.key === modelValue }"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { MenuItem, MenuProps } from "../types";

const props = defineProps<MenuProps>();
const emit = defineEmits<{
  (e: "select", item: MenuItem): void;
}>();

const handleClick = (item: MenuItem) => {
  if (item.onClick) {
    item.onClick();
  }
  emit("select", item);
};
</script>

<style lang="scss" scoped>
@use "../index.scss";
</style>

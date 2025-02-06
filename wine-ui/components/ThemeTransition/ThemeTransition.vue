<template>
  <Teleport to="body">
    <div
      class="theme-transition"
      :class="{ 'theme-transition--active': active }"
      :style="{
        '--origin-x': `${x}px`,
        '--origin-y': `${y}px`,
        '--next-theme-color': nextThemeColor,
      }"
      @transitionend="onTransitionEnd"
    ></div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const x = ref(0);
const y = ref(0);
const nextThemeColor = ref("");
const isAnimating = ref(false);

const emit = defineEmits<{
  (e: "transitionComplete"): void;
}>();

const onTransitionEnd = () => {
  active.value = false;
  nextThemeColor.value = "";
  isAnimating.value = false;
  emit("transitionComplete");
};

const trigger = (nextColor: string) => {
  if (isAnimating.value) return false;

  isAnimating.value = true;
  nextThemeColor.value = nextColor;
  active.value = false;

  requestAnimationFrame(() => {
    active.value = true;
  });

  return true;
};

defineExpose({
  trigger,
  isAnimating,
});
</script>

<style lang="scss" scoped>
@use "./index.scss";
</style>

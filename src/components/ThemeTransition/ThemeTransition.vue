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
.theme-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  visibility: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 300vmax;
    height: 300vmax;
    background-color: var(--next-theme-color);
    transform-origin: center;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    opacity: 0;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &--active {
    visibility: visible;

    &::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
}
</style>

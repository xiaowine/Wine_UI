<template>
  <div class="fps-monitor" v-show="isVisible" :style="monitorStyle">
    FPS: {{ isVisible ? currentFps : 0 }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, inject } from "vue";
import type { FpsOptions } from "./index";

const fpsConfig = inject<FpsOptions>("fps-options", {});

// 计算属性：配置值
const monitorPosition = computed(() => fpsConfig.position ?? "bottomLeft");
const isVisible = computed(() => fpsConfig.show ?? true);

// 边距配置，优先使用具体方向的边距
const margins = computed(() => ({
  top: fpsConfig.marginTop ?? fpsConfig.margin ?? 10,
  bottom: fpsConfig.marginBottom ?? fpsConfig.margin ?? 10,
  left: fpsConfig.marginLeft ?? fpsConfig.margin ?? 10,
  right: fpsConfig.marginRight ?? fpsConfig.margin ?? 10,
}));

const currentFps = ref(0);
let frameCount = 0;
let previousTimestamp = Date.now();
let animationFrameHandle: number | null = null;

const requestNextFrame =
  window.requestAnimationFrame ||
  ((callback) => window.setTimeout(callback, 1000 / 60));

const updateInterval = computed(() => fpsConfig.interval ?? 1000);

const updateFps = () => {
  if (!isVisible.value) {
    return;
  }

  const currentTimestamp = Date.now();
  frameCount++;

  if (currentTimestamp > updateInterval.value + previousTimestamp) {
    currentFps.value = Math.round(
      (frameCount * 1000) / (currentTimestamp - previousTimestamp)
    );
    frameCount = 0;
    previousTimestamp = currentTimestamp;
  }

  animationFrameHandle = requestNextFrame(updateFps);
};

const startMonitoring = () => {
  if (!animationFrameHandle) {
    frameCount = 0;
    previousTimestamp = Date.now();
    updateFps();
  }
};

const stopMonitoring = () => {
  if (animationFrameHandle) {
    cancelAnimationFrame(animationFrameHandle);
    animationFrameHandle = null;
    currentFps.value = 0;
  }
};

// 监听显示状态变化
watch(
  isVisible,
  (newValue) => {
    if (newValue) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (isVisible.value) {
    startMonitoring();
  }
});

onUnmounted(() => {
  stopMonitoring();
});

const monitorStyle = computed(() => {
  const style: Record<string, string> = {};

  switch (monitorPosition.value) {
    case "topLeft":
      style.top = `${margins.value.top}px`;
      style.left = `${margins.value.left}px`;
      break;
    case "topRight":
      style.top = `${margins.value.top}px`;
      style.right = `${margins.value.right}px`;
      break;
    case "bottomLeft":
      style.bottom = `${margins.value.bottom}px`;
      style.left = `${margins.value.left}px`;
      break;
    case "bottomRight":
      style.bottom = `${margins.value.bottom}px`;
      style.right = `${margins.value.right}px`;
      break;
  }

  return style;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>

<template>
  <div class="fps-monitor" v-show="props.show" :style="monitorStyle">
    FPS: {{ props.show ? currentFps : 0 }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import type { FpsProps } from "./index";

const props = withDefaults(defineProps<FpsProps>(), {
  position: "bottomLeft",
  show: true,
  interval: 1000,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
});
console.log(props);
const monitorStyle = computed(() => {
  const style: Record<string, string> = {};

  switch (props.position) {
    case "topLeft":
      style.top = `${props.marginTop}px`;
      style.left = `${props.marginLeft}px`;
      break;
    case "topRight":
      style.top = `${props.marginTop}px`;
      style.right = `${props.marginRight}px`;
      break;
    case "bottomLeft":
      style.bottom = `${props.marginBottom}px`;
      style.left = `${props.marginLeft}px`;
      break;
    case "bottomRight":
      style.bottom = `${props.marginBottom}px`;
      style.right = `${props.marginRight}px`;
      break;
  }

  return style;
});

const currentFps = ref(0);
let frameCount = 0;
let previousTimestamp = Date.now();
let animationFrameHandle: number | null = null;

const requestNextFrame =
  window.requestAnimationFrame ||
  ((callback) => window.setTimeout(callback, 1000 / 60));

const updateFps = () => {
  if (!props.show) {
    return;
  }

  const currentTimestamp = Date.now();
  frameCount++;

  if (currentTimestamp > props.interval + previousTimestamp) {
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

watch(
  () => props.show,
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
  if (props.show) {
    startMonitoring();
  }
});

onUnmounted(() => {
  stopMonitoring();
});
</script>

<style scoped lang="scss">
.fps-monitor {
  position: fixed;
  z-index: 9999;
  padding: 6px 10px;
  font-size: 1rem;
  font-family: monospace;
  user-select: none;
  background: var(--w-bg-color);
  color: var(--w-text-color);
  box-shadow: var(--w-topbar-shadow);
  border-radius: var(--w-border-radius);
  display: flex;
  align-items: center;
}
</style>

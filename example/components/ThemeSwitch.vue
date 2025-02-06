<template>
  <button class="theme-switch" @click="handleThemeChange">
    <div class="theme-switch-container">
      <TransitionGroup name="theme-transition">
        <span class="theme-switch-icon" :key="'icon-' + theme">
          {{ theme === "light" ? "🌞" : "🌙" }}
        </span>
        <span class="theme-switch-text" :key="'text-' + theme">
          {{ theme === "light" ? "暗色" : "亮色" }}
        </span>
      </TransitionGroup>
    </div>
  </button>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{ theme: string }>(), {
  theme: "light",
});
const emit = defineEmits();
const handleThemeChange = () => {
  emit("toggleThemeEvent");
};
</script>

<style scoped lang="scss">
@use "wine-ui/styles/theme.scss" as *;

.theme-switch {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid var(--w-primary-color);
  border-radius: 20px;
  background: transparent;
  color: var(--w-text-color);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &-icon {
    font-size: 16px;
    display: inline-block;
  }

  &-text {
    font-weight: 500;
    display: inline-block;
  }

  &:hover {
    background: var(--w-primary-color);
    color: #fff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @include mobile {
    padding: 6px 12px;

    &-text {
      display: none;
    }
  }
}

// 动画相关样式
.theme-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  &-leave-active {
    position: absolute;
  }

  &-move {
    transition: transform 0.3s ease;
  }
}
</style>

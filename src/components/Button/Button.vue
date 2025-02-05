<template>
  <button
    v-if="btnType !== 'link'"
    :class="classes"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
  <a v-else :class="classes" :href="href" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "./button.scss";

type ButtonType = "primary" | "default" | "danger" | "link";
type ButtonSize = "lg" | "sm";

interface ButtonProps {
  btnType?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  href?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  btnType: "default",
  disabled: false,
});

const classes = computed(() => {
  return [
    "wine-btn",
    `wine-btn-${props.btnType}`,
    {
      [`wine-btn-${props.size}`]: props.size,
      disabled: props.btnType === "link" && props.disabled,
    },
  ];
});
</script>

<template>
  <button
    ref="_ref"
    class="mini-button"
    :class="{
      [`mini-button--${type}`]: type,
      [`mini-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :type="nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
  >
    <Icon :icon="icon" v-if="icon" />
    <Icon v-if="loading" icon="spinner" spin />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonInstance, ButtonProps } from './types';

import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'MiniButton'
});

const _ref = ref<HTMLButtonElement>();

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
});

defineExpose<ButtonInstance>({
  ref: _ref
});
</script>

<style scoped>
</style>

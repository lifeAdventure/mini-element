<template>
  <div
    class="mini-input"
    :class="{
      [`mini-input--${type}`]: type,
      [`mini-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="mini-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="mini-input__wrapper">
        <span v-if="$slots.prefix" class="mini-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="mini-input__inner"
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
        />
        <span v-if="$slots.suffix" class="mini-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <div v-if="$slots.append" class="mini-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="mini-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputEmits, InputProps } from './type';

defineOptions({
  name: 'MiniInput'
});
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
});

const emits = defineEmits<InputEmits>();
</script>

<style scoped></style>

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
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div v-if="$slots.prepend" class="mini-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="mini-input__wrapper">
        <!-- prefix -->
        <span v-if="$slots.prefix" class="mini-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="mini-input__inner"
          ref="_ref"
          v-bind="attrs"
          v-model="innerValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <!-- suffix -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="mini-input__suffix">
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="mini-input__clear"
            @click="handleClear"
            @mousedown.prevent="() => {}"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="mini-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="mini-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append -->
      <div v-if="$slots.append" class="mini-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="mini-textarea__wrapper"
        v-model="innerValue"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        ref="_ref"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import type { InputEmits, InputProps } from './type';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'MiniInput',
  inheritAttrs: false
});
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
});
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const _ref = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);

const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);

const handleInput = () => {
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
};
const handleChange = () => {
  emits('change', innerValue.value);
};
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emits('focus', e);
};
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false;
  emits('blur', e);
};
const handleClear = () => {
  _ref.value?.focus();
  innerValue.value = '';
  emits('update:modelValue', '');
  emits('input', '');
  emits('change', '');
  emits('clear');
};
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

defineExpose({
  ref: _ref
});
</script>

<style scoped></style>

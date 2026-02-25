<template>
  <Transition name="fade">
    <div
      class="mini-alert"
      :class="{ [`mini-alert--${type}`]: type, [`mini-alert--${effect}`]: effect }"
      v-if="alertVisible"
    >
      <div class="mini-alert__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div class="mini-alert__close-btn" @click="handleCloseByClick" v-if="closable">
        <Icon icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { AlertEmits, AlertInstance, AlertProps } from './types';
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';

defineOptions({ name: 'MiniAlert' });

const props = withDefaults(defineProps<AlertProps>(), {
  content: '',
  type: 'info',
  effect: 'light',
  closable: true,
  manual: false
});

const emits = defineEmits<AlertEmits>();

const alertVisible = ref<boolean>(true);

const closeAlert = (manualCall: boolean = false) => {
  if (props.manual === manualCall && props.closable) {
    alertVisible.value = false;
    emits('close');
  }
};

const handleCloseByClick = () => closeAlert(false);

defineExpose<AlertInstance>({
  close: () => closeAlert(true)
});
</script>

<style scoped>
</style>

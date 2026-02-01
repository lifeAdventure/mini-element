<template>
  <div ref="popperContainerNode" class="mini-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="mini-tooltip__trigger" v-on="events">
      <slot />
    </div>
    <Transition :name="transition" @after-leave="handleAfterLeave">
      <div ref="popperNode" class="mini-tooltip__popper" v-show="isOpen">
        <slot name="content">
          <div class="mini-tooltip__popper__content">{{ content }}</div>
          <div id="arrow" data-popper-arrow></div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';

defineOptions({
  name: 'MiniTooltip'
});

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
});

const emits = defineEmits<TooltipEmits>();

const popperContainerNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
const popperNode = ref<HTMLElement | null>(null);
const isOpen = ref<boolean>(false);
let popperInstance: null | Instance = null;

const open = () => {
  isOpen.value = true;
  emits('visible-change', true);
};
const close = () => {
  isOpen.value = false;
  emits('visible-change', false);
};

const debounceOpen = debounce(open, props.openDelay);
const debounceClose = debounce(close, props.closeDelay);
const finalOpen = () => {
  debounceClose.cancel();
  debounceOpen();
};
const finalClose = () => {
  debounceOpen.cancel();
  debounceClose();
};

const togglePopper = () => {
  if (isOpen.value) {
    finalClose();
  } else {
    finalOpen();
  }
};

const events = computed<Record<string, any>>(() => {
  if (props.manual) return {};
  return props.trigger === 'click'
    ? {
        click: togglePopper
      }
    : {
        mouseenter: finalOpen
      };
});
const outerEvents = computed<Record<string, any>>(() => {
  if (props.manual) return {};
  return props.trigger === 'click'
    ? {}
    : {
        mouseleave: finalClose
      };
});

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  };
});

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
      }
    }
  },
  { flush: 'post' }
);
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    finalClose();
  }
  if (isOpen.value) {
    emits('click-outside', true);
  }
});
const handleAfterLeave = () => {
  popperInstance?.destroy();
  popperInstance = null;
};
onUnmounted(() => {
  handleAfterLeave();
});

defineExpose<TooltipInstance>({
  show: finalOpen,
  hide: finalClose
});
</script>

<style scoped></style>

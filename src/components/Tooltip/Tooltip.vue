<template>
  <div ref="popperContainerNode" class="mini-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="mini-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <Transition :name="transition" @after-leave="handleAfterLeave">
      <!-- 新增：给popper节点绑定鼠标进入/离开事件 -->
      <div
        ref="popperNode"
        class="mini-tooltip__popper"
        v-show="isOpen"
        @mouseenter="handlePopperMouseEnter"
        @mouseleave="handlePopperMouseLeave"
      >
        <slot name="content">
          <div class="mini-tooltip__popper__content">{{ content }}</div>
        </slot>
        <div id="arrow" data-popper-arrow></div>
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
// 新增：标记鼠标是否在popper区域内
const isMouseInPopper = ref<boolean>(false);
let popperInstance: null | Instance = null;

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

// 改动：调整容器mouseleave逻辑，仅当鼠标不在popper内时才关闭
const outerEvents = computed<Record<string, any>>(() => {
  if (props.manual) return {};
  return props.trigger === 'click'
    ? {}
    : {
        mouseleave: () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!isMouseInPopper.value) {
                finalClose();
              }
          });
          });
        }
      };
});

const open = () => {
  if (isOpen.value) {
    return;
  }
  isOpen.value = true;
  emits('visible-change', true);
};
const close = () => {
  if (!isOpen.value) {
    return;
  }
  isOpen.value = false;
  emits('visible-change', false);
};

const debounceOpen = debounce(open, props.openDelay);
const debounceClose = debounce(close, props.closeDelay);
const finalOpen = () => {
  debounceClose.cancel();
  debounceOpen();
};
const finalClose = (): void => {
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

// 新增：popper鼠标进入 - 取消关闭、保持打开
const handlePopperMouseEnter = () => {
  isMouseInPopper.value = true;
  debounceClose.cancel(); // 取消正在等待的关闭定时器
};
// 新增：popper鼠标离开 - 触发关闭（保留closeDelay）
const handlePopperMouseLeave = () => {
  isMouseInPopper.value = false;
  finalClose();
};

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
  debounceOpen.cancel();
  debounceClose.cancel();
});

defineExpose<TooltipInstance>({
  show: finalOpen,
  hide: finalClose
});
</script>

<style scoped></style>

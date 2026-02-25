<template>
  <Teleport to="body">
    <Transition :name="transition" @after-enter="updateHeight" @after-leave="destroyComponent">
      <div
        class="mini-message"
        :class="{ [`mini-message--${type}`]: type, ['is-close']: showClose }"
        :style="cssStyle"
        v-show="visible"
        ref="messageRef"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
      >
        <div class="mini-message__content">
          <slot>
            <RenderVNode :v-node="resolvedMessage"></RenderVNode>
          </slot>
        </div>
        <div class="mini-message__close-btn" v-if="showClose" @click.stop="visible = false">
          <Icon icon="xmark" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import RenderVNode from '../Common/RenderVNode';
import Icon from '../Icon/Icon.vue';
import { computed, isRef, onMounted, ref } from 'vue';
import { getLastBottomOffset } from './method';
import useEventListener from '@/hooks/useEventListener';

import type { MessageProps } from './types';

defineOptions({
  name: 'MiniMessage'
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  showClose: false,
  duration: 3000,
  offset: 20,
  transition: 'fade-up'
});

const resolvedMessage = computed(() =>
  isRef(props.message) ? props.message.value : props.message
);
const visible = ref<boolean>(false);
const messageRef = ref<HTMLDivElement | null>(null);
const height = ref<number>(0);
// 获得上一个message的底部离上上个message底部的距离，没有上一个message则为0，保持响应性(依赖instances)
const lastBottomOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => lastBottomOffset.value + props.offset);
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}));

let timer: any;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

const clearTimer = () => {
  clearTimeout(timer);
};

const destroyComponent = () => {
  if (!visible.value) {
    props.destroy();
  }
};

const updateHeight = () => {
  height.value = messageRef.value!.getBoundingClientRect().height;
};

const handleKeyDown = (e: Event, key: string) => {
  const event = e as KeyboardEvent;
  if (event.code === key) {
    visible.value = false;
  }
};
useEventListener(document, 'keydown', (e: Event) => {
  handleKeyDown(e, 'Escape');
});

onMounted(async () => {
  visible.value = true;
  startTimer();
});

defineExpose({
  visible,
  bottomOffset
});
</script>

<style scoped></style>

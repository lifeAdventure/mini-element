<template>
  <div
    class="mini-message"
    :class="{ [`mini-message--${type}`]: type }"
    :style="cssStyle"
    v-show="visible"
    ref="messageRef"
  >
    <div class="mini-message__content">
      <slot>
        <RenderVNode :v-node="message"></RenderVNode>
      </slot>
    </div>
    <div class="mini-message__close-btn" v-if="showClose" @click.stop="visible = false">
      <Icon icon="xmark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderVNode from '../Common/RenderVNode';
import type { MessageProps } from './types';
import Icon from '../Icon/Icon.vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset } from './method';

defineOptions({
  name: 'MiniMessage'
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  showClose: false,
  duration: 3000,
  offset: 20
});

const visible = ref<boolean>(false);
const messageRef = ref<HTMLDivElement | null>(null);
const height = ref<number>(0);

// 获得上一个message的底部离上上个message底部的距离，没有上一个message则为0，保持响应性(依赖instances)
const lastBottomOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => lastBottomOffset.value + props.offset);
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
}));

const startTimer = () => {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};
watch(visible, (newValue) => {
  if (!newValue) {
    props.destroy();
  }
});

onMounted(async () => {
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
});

defineExpose({
  bottomOffset
});
</script>

<style scoped>
.mini-message {
  width: max-content;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #222;
}
</style>

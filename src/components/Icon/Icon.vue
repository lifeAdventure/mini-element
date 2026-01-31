<template>
  <i
    class="mini-icon"
    :class="{ [`mini-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { omit } from 'lodash-es';
import type { FontAwesomeIconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineOptions({
  name: 'MiniIcon',
  inheritAttrs: false
});

const props = defineProps<FontAwesomeIconProps>();
//若不用computed包裹，则只运行一次，当有属性是计算得来的，就要包一层computed保持响应性
const filteredProps = computed(() => omit(props, ['type', 'color']));
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>
<style scoped>
</style>

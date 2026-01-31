<template>
  <div class="mini-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { collapseContextKey, type NameType, type CollapseProps, type CollapseEmits } from './types';

defineOptions({
  name: 'MiniCollapse'
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

// props本身是reactive，所以它的属性是原始类型，不具备响应性，那就不能用computed包裹
// 本来组件自身就需要使用activeNames，为了兼容外界的自定义modelValue并且避免直接操作props.modelValue（Vue 中应视 props 为只读）
// ref(props.modelValue) 只是一次性快照，需要用watch手动追踪更新
const activeNames = ref<NameType[]>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);

const handleItemClick = (name: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === name ? '' : name];
  } else {
    const index = activeNames.value.indexOf(name);
    // 如果数组中存在该(item组件)名字，则清除出去，否则将该名称加入数组
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(name);
    }
  }
  emits('update:modelValue', activeNames.value);
  emits('change', activeNames.value);
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick
});
</script>

<style scoped>
</style>

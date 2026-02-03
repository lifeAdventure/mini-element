<template>
  <div class="mini-dropdown">
    <Tooltip
      ref="tooltipRef"
      :content="content"
      :placement="placement"
      :trigger="trigger"
      :transition="transition"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
    >
      <slot></slot>
      <template #content>
        <slot name="content">
          <ul class="mini-dropdown__menu">
            <template v-for="option in menuOptions" :key="option.key">
              <li v-if="option.divided" class="divided-placeholder"></li>
              <li
                class="mini-dropdown__item"
                :class="{ 'is-disabled': option.disabled, 'is-divided': option.divided }"
                @click="() => optionClick(option)"
              >
                <RenderVNode :v-node="option.label"/>
              </li>
            </template>
          </ul>
        </slot>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '../Tooltip/Tooltip.vue';
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types';
import RenderVNode from '../Common/RenderVNode';
import { ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';

defineOptions({
  name: 'MiniDropdown'
});
const props = withDefaults(defineProps<DropdownProps>(), {
  placement: 'bottom',
  trigger: 'click',
  transition: 'fade',
  openDelay: 500,
  closeDelay: 500,
  hideAfterClick: true
});
const emits = defineEmits<DropdownEmits>();

const tooltipRef = ref<TooltipInstance | null>(null);
const visibleChange = (value: boolean) => {
  emits('visible-change', value);
};

const optionClick = (option: MenuOption) => {
  if (option.disabled) {
    return;
  }
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
  emits('select', option);
};

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
});
</script>
<style scoped></style>

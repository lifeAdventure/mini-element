<template>
  <div class="mini-collapse-item" :class="{ 'is-disabled': disabled }" @click="handleClick">
    <div
      :id="`item-header-${name}`"
      class="mini-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
    >
      <slot name="title">
        <h3>
          {{ title }}
        </h3>
      </slot>
      <Icon icon="angle-right" class="header-angle" v-if="!disabled" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="mini-collapse-item__wrapper" v-show="isActive">
        <div
          :id="`item-content-${name}`"
          class="mini-collapse-item__content"
          :class="{ 'is-disabled': disabled, 'is-active': isActive }"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type CollapseItemProps } from './types';
import Icon from '../Icon/Icon.vue';
defineOptions({
  name: 'MiniCollapseItem'
});
const props = defineProps<CollapseItemProps>();
const context = inject(collapseContextKey);
const isActive = computed(() => context?.activeNames.value.includes(props.name));
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  context?.handleItemClick(props.name);
};
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(el) {
    el.style.height = '0px';
  },
  afterLeave(el) {
    el.style.height = '';
    el.style.overflow = '';
  }
};
</script>

<style scoped>
</style>

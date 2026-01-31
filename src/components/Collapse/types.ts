import type { Ref, InjectionKey } from 'vue';

export type NameType = string;
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  // content直接利用插槽传递
  disabled?: boolean;
}
export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
export interface CollapseEmits {
  'update:modelValue': [value: NameType[]];
  change: [value: NameType[]];
}
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey');

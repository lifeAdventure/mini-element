import type { VNode } from 'vue';
import type { TooltipProps } from '../Tooltip/types';

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[];
  hideAfterClick?: boolean;
}

export interface MenuOption {
  label: string | VNode;
  key: string | number;
  divided?: boolean;
  disabled?: boolean;
}

export interface DropdownEmits {
  'visible-change': [value: boolean];
  'select': [item: MenuOption];
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}



import type { Options, Placement } from '@popperjs/core';

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  popperOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
  manual?: boolean;
}

export interface TooltipEmits {
  'visible-change': [value: boolean];
  'click-outside': [value: boolean];
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}

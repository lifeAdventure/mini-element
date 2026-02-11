import type { ComponentInternalInstance, VNode } from 'vue';

export interface MessageProps {
  message?: string | VNode;
  type?: 'success' | 'info' | 'warning' | 'danger';
  showClose?: boolean;
  duration?: number;
  offset?: number;
  destroy: () => void;
  id: string;
  zIndex?: number;
  transition?: string;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  destroy: () => void;
}

export type CreateMessageProps = Omit<MessageProps, 'destroy' | 'id' | 'zIndex' | 'transition'>;

import type { ComponentInternalInstance, VNode, Ref } from 'vue';

export type messageContent = string | VNode | Ref<string | VNode>;
export interface MessageProps {
  message?: messageContent;
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

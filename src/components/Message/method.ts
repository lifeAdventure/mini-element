import { h, render, shallowReactive } from 'vue';
import type { CreateMessageProps, MessageContext } from './types';
import Message from './Message.vue';
import useZIndex from '@/hooks/useZIndex';

let seed = 1;
const instances: MessageContext[] = shallowReactive([]);
export function createMessage(props: CreateMessageProps) {
  const id = `mini-message_${seed++}`;
  const container = document.createElement('div');
  const destroy = () => {
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx !== -1) {
      instances.splice(idx, 1);
    }
    render(null, container);
  };
  const manualDestroy = () => {
    const idx = instances.findIndex((instance) => instance.id === id);
    instances[idx].vm.exposed!.visible.value = false;
  };

  const { nextZIndex } = useZIndex();
  const newProps = {
    ...props,
    id,
    destroy,
    zIndex: nextZIndex()
  };
  const vnode = h(Message, newProps);

  //把vnode挂载在真实dom树
  render(vnode, container);

  const vm = vnode.component!;

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy
  };
  instances.push(instance);
  return instance;
}

export function getLastInstance() {
  return instances.at(-1);
}

export function getLastBottomOffset(id: string) {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) {
    return 0;
  } else {
    return instances[idx - 1].vm.exposed!.bottomOffset.value;
  }
}

import { h, render, shallowReactive } from 'vue';
import type { CreateMessageProps, MessageContext } from './types';
import Message from './Message.vue';

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
  const newProps = {
    ...props,
    id,
    destroy
  };
  const vnode = h(Message, newProps);  
 
  //把vnode挂载在真实dom树
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);

 const vm = vnode.component!;

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    props: newProps
  };
  instances.push(instance);
  return instance;
}

export function getLastInstance() {
  return instances.at(-1);
}

export function getLastBottomOffset(id: string) {
  const idx = instances.findIndex((instance) => instance.id === id);
  console.log(id, idx, instances.length);
  if (idx <= 0) {
    return 0;
  } else {
    return instances[idx - 1].vm.exposed!.bottomOffset.value;
  }
}

<template>
  <main>
    <h1>Buttton</h1>
    <Button
      ref="buttonRef"
      round
      @click="createMessage({ message: 'hello world', showClose: true, duration: 3000 })"
      >Test</Button
    >
    <Button circle>Test</Button>
    <Button plain>Test</Button>
    <Button type="danger" disabled>Test</Button>
    <Button size="large">Test</Button>
    <br />
    <br />
    <Button type="primary" plain>Test1</Button>
    <Button type="warning" plain>Test1</Button>
    <Button type="info" plain>Test1</Button>
    <Button type="danger" plain>Test1</Button>
    <Button type="success" plain disabled>Test1</Button>
    <br />
    <br />
    <Button type="primary">Test2</Button>
    <Button type="warning">Test2</Button>
    <Button type="info">Test2</Button>
    <Button type="danger">Test2</Button>
    <Button type="success" disabled>Test2</Button>
    <br />
    <br />
    <h2>Button with Icon</h2>
    <Button icon="arrow-up" type="primary">Arrow-up</Button>
    <Button icon="user" type="warning">User</Button>
    <Button loading>Loading...</Button>
  </main>
  <br />
  <br />
  <main>
    <h1>Collapse</h1>
    <Collapse v-model="currentNames">
      <CollapseItem name="number1" title="Title 1">
        Consistent with real life: in line with the process and logic of real life, and comply with
        languages and habits that the users are used to; Consistent within interface: all elements
        should be consistent, such as: design style, icons and texts, position of elements, etc.
      </CollapseItem>
      <CollapseItem name="number2">
        <template #title>
          <h1>这是一个自定义标题</h1>
        </template>
        <h2>dsdsafjladskj</h2>
        <p>内容段落展示 - 索拉卡党风建设肯定放假睡觉了附件开始的</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea numquam, quia, tenetur
          exercitationem recusandae voluptates quam explicabo repudiandae natus nisi laborum
          quaerat! Obcaecati quo dolorem illo incidunt vero accusantium numquam? Maxime voluptatem,
          ratione, ducimus iure numquam vel asperiores consequuntur provident, perferendis
          perspiciatis deleniti! Saepe labore, officiis asperiores harum molestiae quod? Corporis
          iste suscipit repudiandae aut provident impedit in quasi quas! Perspiciatis perferendis
          suscipit veritatis, totam eaque recusandae deleniti error rem quidem commodi illo a. Velit
          nemo optio iure aspernatur eius, fuga ipsum doloremque necessitatibus id commodi
        </p>
      </CollapseItem>
      <CollapseItem name="number3" title="Title 3">
        <p>内容段落展示 - 索拉卡党风建设肯定放假睡觉了附件开始的</p>
      </CollapseItem>
      <CollapseItem name="number4" title="Title 4">
        <p>内容段落展示 - 索拉卡党风建设肯定放假睡觉了附件开始的</p>
      </CollapseItem>
      <CollapseItem name="number5" title="Title 5" disabled>
        <p>内容段落展示 - 索拉卡党风建设肯定放假睡觉了附件开始的</p>
      </CollapseItem>
    </Collapse>
  </main>
  <br />
  <br />
  <main style="max-width: 600px">
    <h1>Alert</h1>
    <Alert>This is a default alert</Alert>
    <Alert content="Primary alert" type="primary" />
    <Alert type="success" effect="light">
      <h1>Success alert from slot</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed quaerat mollitia dolores
        praesentium numquam voluptatibus inventore quo corporis dicta quidem veniam fuga, earum,
        nisi possimus ullam similique dolore? Accusantium, eius.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed quaerat mollitia dolores
        praesentium numquam voluptatibus inventore quo corporis dicta quidem veniam fuga, earum,
        nisi possimus ullam similique dolore? Accusantium, eius.
      </p>
    </Alert>
    <Alert content="Dark mode warning + close emits" type="warning" effect="dark" @close="hello" />
    <Alert
      content="Dark mode info + manual close when mouse enter"
      type="info"
      effect="dark"
      ref="alertRef"
      manual
      @mouseenter="manualClose"
    />
    <Alert content="Closable is false: Error alert" type="danger" :closable="false" />
  </main>
  <main>
    <h1>Tooltip</h1>
    <Tooltip
      ref="tooltipRef"
      content="123123"
      :trigger="trigger"
      :popper-options="{ placement: 'right' }"
    >
      <img src="../docs/public/img/logo.jpg" alt="logo" width="200" height="200" />
    </Tooltip>
    <br />
    <br />
    <Button @click="showPopper">show tooltip</Button>
    <Button @click="hidePopper">hide tooltip</Button>
  </main>
  <main>
    <h1>Dropdown</h1>
    <Dropdown :menu-options="options" trigger="hover">
      <Button type="primary">下拉菜单</Button>
    </Dropdown>
    <span>===</span>
    <Dropdown placement="bottom" :menu-options="options" trigger="click" manual ref="dropdownRef">
      <Button>菜单容器</Button>
    </Dropdown>
    <br />
    <br />
    <Button type="primary" @click="open">点击手动触发显示</Button>
    <Button type="danger" @click="close">点击手动触发隐藏</Button>
  </main>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue';
import type { ButtonInstance } from './components/Button/types';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import type { NameType } from './components/Collapse/types';
import Alert from './components/Alert/Alert.vue';
import type { AlertInstance } from './components/Alert/types';
import Tooltip from './components/Tooltip/Tooltip.vue';
import type { TooltipInstance } from './components/Tooltip/types';
import Dropdown from './components/Dropdown/Dropdown.vue';
import type { DropdownInstance } from './components/Dropdown/types';
import { createMessage } from './components/Message/method';

const buttonRef = ref<ButtonInstance | null>(null);
const alertRef = ref<AlertInstance | null>(null);
const currentNames = ref<NameType[]>(['number1']);
const trigger = ref<any>('hover');
const tooltipRef = ref<TooltipInstance | null>(null);
const dropdownRef = ref<DropdownInstance | null>(null);
const options = [
  { key: 1, label: h('button', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
];
const dynamicStr = ref<string>('hello');

// button test:
// onMounted(() => {
//   if (buttonRef.value) {
//     console.log('buttonRef', buttonRef.value.ref);
//   }
// });

// collapse test:
// setTimeout(() => {
//   currentNames.value = ['number1', 'number2'];
// }, 2000);

// alert test:
const hello = () => {
  alert('Hello world!');
};
const manualClose = () => {
  alertRef.value?.close();
};

// tooltip test
const showPopper = () => {
  tooltipRef.value && tooltipRef.value.show();
};
const hidePopper = () => {
  tooltipRef.value && tooltipRef.value.hide();
};

// dropdown test
const open = () => {
  dropdownRef.value?.show();
};
const close = () => {
  dropdownRef.value?.hide();
};

// message test
createMessage({ message: dynamicStr, type: 'warning', showClose: true, duration: 0 });
createMessage({ message: 'hello world third', type: 'success', showClose: true, duration: 0 });
onMounted(() => {
  setTimeout(() => {
    dynamicStr.value = 'world';
  }, 2000);
});
</script>

<style scoped></style>

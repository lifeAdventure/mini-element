<template>
  <main>
    <h1>Buttton</h1>
    <Button ref="buttonRef" round @click="console.log('Test')">Test</Button>
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
    <Button type="success">Test2</Button>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue';
import type { ButtonInstance } from './components/Button/types';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import type { NameType } from './components/Collapse/types';

const buttonRef = ref<ButtonInstance | null>(null);
const currentNames = ref<NameType[]>(['number1']);

// Button test:
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref);
  }
});

// collapse test:
setTimeout(() => {
  currentNames.value = ['number1', 'number2'];
}, 2000);
</script>

<style scoped></style>

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
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue';
import type { ButtonInstance } from './components/Button/types';

const buttonRef = ref<ButtonInstance | null>(null);

//  button test:
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref);
  }
});


</script>

<style scoped></style>

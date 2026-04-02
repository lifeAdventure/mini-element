## 快速上手

::: tip 提示

mini-element 基于 Vue3 + Ts 仿照 Element Plus 开发的组件库

:::

## 安装

```bash:no-line-numbers
npm install mini-element
```


## 使用
### 全局使用
``` ts
// main.ts
// 引入所有组件
import MiniElement from 'mini-element'
// 引入样式
import 'mini-element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(MiniElement).mount('#app')
```

```vue
<template>
  <mini-button type="primary">我是 MiniButton</mini-button>
</template>
```

### 按需导入
```ts
// main.ts
// 引入样式
import 'mini-element/dist/index.css'
```

```vue
<template>
  <mini-button type="primary">我是 MiniButton</mini-button>
</template>

<script setup lang="ts">
import { MiniButton } from 'v3-element'
</script>
```


### Git 提交规范（PR提交规范）

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;


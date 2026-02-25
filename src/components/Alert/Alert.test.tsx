import { describe, test, expect, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper, DOMWrapper } from '@vue/test-utils';
import Alert from './Alert.vue';

describe('Alert.vue', () => {
  // 测试基础结构和属性
  describe('基础渲染', () => {
    let wrapper: VueWrapper;

    beforeAll(() => {
      wrapper = mount(Alert, {
        props: {
          content: '这是一条提示信息',
          type: 'success',
          effect: 'dark',
          closable: true
        },
        global: {
          stubs: ['Icon'] // 对 Icon 组件进行存根
        }
      });
    });

    test('组件应该正确渲染', () => {
      const alert = wrapper.find('.mini-alert');
      expect(alert.exists()).toBe(true);
    });

    test('应该根据 type 和 effect 添加对应类名', () => {
      const alert = wrapper.find('.mini-alert');
      expect(alert.classes()).toContain('mini-alert--success');
      expect(alert.classes()).toContain('mini-alert--dark');
    });

    test('应该正确显示 content 内容', () => {
      expect(wrapper.find('.mini-alert__content').text()).toBe('这是一条提示信息');
    });

    test('当 closable 为 true 时，应该显示关闭按钮', () => {
      const closeBtn = wrapper.find('.mini-alert__close-btn');
      expect(closeBtn.exists()).toBe(true);
    });
  });

  // 测试不同类型的渲染
  describe('类型和效果', () => {
    test.each([
      ['primary', 'light'],
      ['warning', 'dark'],
      ['danger', 'light'],
      ['info', 'dark']
    ] as const)('type 为 %s，effect 为 %s 时类名正确', (type, effect) => {
      const wrapper = mount(Alert, {
        props: { type, effect },
        global: { stubs: ['Icon'] }
      });
      const alert = wrapper.find('.mini-alert');
      expect(alert.classes()).toContain(`mini-alert--${type}`);
      expect(alert.classes()).toContain(`mini-alert--${effect}`);
    });
  });

  // 测试插槽内容
  test('插槽内容优先级高于 content 属性', () => {
    const wrapper = mount(Alert, {
      props: { content: '属性内容' },
      slots: { default: '插槽内容' },
      global: { stubs: ['Icon'] }
    });
    expect(wrapper.find('.mini-alert__content').text()).toBe('插槽内容');
  });

  // 测试 closable 为 false 时不显示关闭按钮
  test('当 closable 为 false 时，不显示关闭按钮', () => {
    const wrapper = mount(Alert, {
      props: { closable: false },
      global: { stubs: ['Icon'] }
    });
    const closeBtn = wrapper.find('.mini-alert__close-btn');
    expect(closeBtn.exists()).toBe(false);
  });

  // 测试点击关闭按钮的行为
  describe('点击关闭按钮', () => {
    let wrapper: VueWrapper;
    let closeBtn: DOMWrapper<Element>;

    beforeAll(() => {
      wrapper = mount(Alert, {
        props: { closable: true, manual: false },
        global: { stubs: ['Icon'] },
        attachTo: document.body // 为了后续检查可见性，但 v-if 移除元素后无法通过 isVisible 检查，直接用存在性判断
      });
      closeBtn = wrapper.find('.mini-alert__close-btn');
    });

    test('点击后组件应该消失', async () => {
      await closeBtn.trigger('click');
      const alert = wrapper.find('.mini-alert');
      expect(alert.exists()).toBe(false);
    });

    test('应该触发 close 事件', () => {
      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')?.length).toBe(1);
    });
  });

  // 测试 manual 属性
  describe('manual 属性', () => {
    test('点击关闭按钮不应关闭组件和触发 close 事件', async () => {
      const wrapper = mount(Alert, {
        props: { closable: true, manual: true },
        global: { stubs: ['Icon'] },
        attachTo: document.body
      });
      const closeBtn = wrapper.find('.mini-alert__close-btn');

      await closeBtn.trigger('click');
      const alert = wrapper.find('.mini-alert');
      expect(alert.exists()).toBe(true);
      expect(wrapper.emitted('close')).toBeFalsy();
    });

    test('调用暴露的 close 方法应该关闭组件并触发事件', async () => {
      const wrapper = mount(Alert, {
        props: { closable: true, manual: true },
        global: { stubs: ['Icon'] },
        attachTo: document.body
      });
      
      wrapper.vm.close();
      await wrapper.vm.$nextTick();

      const alert = wrapper.find('.mini-alert');
      expect(alert.exists()).toBe(false);
      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  // 测试暴露的 close 方法单独使用
  test('通过 ref 调用 close 方法可直接关闭', async () => {
    const wrapper = mount(Alert, {
      props: { manual: false, closable: true },
      global: { stubs: ['Icon'] }
    });
    wrapper.vm.close(); // 直接调用
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.mini-alert').exists()).toBe(true); // manual 为 false，不应关闭
    expect(wrapper.emitted('close')).toBeFalsy();

    const wrapper2 = mount(Alert, {
      props: { manual: true, closable: true },
      global: { stubs: ['Icon'] }
    });
    wrapper2.vm.close();
    await wrapper2.vm.$nextTick();
    expect(wrapper2.find('.mini-alert').exists()).toBe(false);
    expect(wrapper2.emitted('close')).toBeTruthy();
  });
});

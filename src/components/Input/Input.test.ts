import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Input from './Input.vue';

type InputInstance = InstanceType<typeof Input>;
describe('Input.vue', () => {
  it('基本展示', () => {
    // Input (input)
    const wrapper: VueWrapper<InputInstance> = mount(Input, {
      props: {
        size: 'small',
        type: 'text',
        modelValue: ''
      },
      slots: {
        prepend: () => 'prepend',
        prefix: () => 'prefix'
      }
    });

    // Input (textarea)
    const wrapper2: VueWrapper<InputInstance> = mount(Input, {
      props: {
        size: 'small',
        type: 'textarea',
        modelValue: ''
      },
      slots: {
        prepend: () => 'prepend'
      }
    });
    // text
    // classes
    expect(wrapper.classes()).toContain('mini-input--small');
    expect(wrapper.classes()).toContain('is-prepend');
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.get('input').attributes('type')).toBe('text');
    // slots
    expect(wrapper.find('.mini-input__prepend').exists()).toBeTruthy();
    expect(wrapper.find('.mini-input__prepend').text()).toBe('prepend');
    expect(wrapper.find('.mini-input__prefix').exists()).toBeTruthy();
    expect(wrapper.find('.mini-input__prefix').text()).toBe('prefix');

    // textarea
    // classes
    expect(wrapper2.classes()).toContain('mini-input--small');
    expect(wrapper2.classes()).toContain('is-prepend');
    // should render input
    expect(wrapper2.find('textarea').exists()).toBeTruthy();
    // slots
    expect(wrapper2.find('.mini-input__prepend').exists()).toBeFalsy();
  });

  it('支持 v-model', async () => {
    const wrapper: VueWrapper<InputInstance> = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (val: string) => {
          wrapper.setProps({ modelValue: val });
        }
      }
    });
    // 初始值
    const input = wrapper.get('input');
    expect(input.element.value).toBe('test');
    // 更新值
    await input.setValue('update');
    expect(wrapper.props('modelValue')).toBe('update');
    expect(input.element.value).toBe('update');
    // 注意 setValue 是组合事件会触发 input 以及 change
    console.log('the events', wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()).toHaveProperty('change');
    // [ [ 'update' ], ...更多事件 ]
    const inputEvent = wrapper.emitted('input');
    const changeEvent = wrapper.emitted('change');
    expect(inputEvent![0]).toEqual(['update']);
    expect(changeEvent![0]).toEqual(['update']);

    // v-model的异步更新
    await wrapper.setProps({ modelValue: 'async update' });
    expect(input.element.value).toBe('async update');
  });

  it('清除操作', async () => {
    const wrapper: VueWrapper<InputInstance> = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text',
        'onUpdate:modelValue': (val: string) => {
          wrapper.setProps({ modelValue: val });
        }
      },
      global: {
        stubs: ['Icon']
      }
    });
    expect(wrapper.find('.mini-input__clear').exists()).toBeFalsy();
    const input = wrapper.get('input');
    // 聚焦文本框
    await input.trigger('focus');
    // 出现清除Icon
    expect(wrapper.find('.mini-input__clear').exists()).toBeTruthy();
    //点击清空
    await wrapper.get('.mini-input__clear').trigger('click');
    expect(input.element.value).toBe('');
    expect(wrapper.props('modelValue')).toBe('');
    // 测试事件提交
    // 点击值变为空并且消失，特别注意这里不仅仅会触发 clear 事件，对应的 input 以及 change 应该都会被触发，因为对应的值发生了变化
    expect(wrapper.emitted()).toHaveProperty('clear');
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()).toHaveProperty('change');
    const inputEvent = wrapper.emitted('input');
    const changeEvent = wrapper.emitted('change');
    expect(inputEvent![0]).toEqual(['']);
    expect(changeEvent![0]).toEqual(['']);
    await input.trigger('blur');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });
  it('密码切换显示', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    });
    expect(wrapper.find('.mini-input__password').exists()).toBeFalsy();
    const input = wrapper.get('input');
    //  出现 Icon 区域
    await input.setValue('123');
    expect(input.element.type).toBe('password');
    const eyeIcon = wrapper.find('.mini-input__password');
    expect(eyeIcon.exists()).toBeTruthy();
    expect(eyeIcon.attributes('icon')).toBe('eye-slash');
    // 点击值变会切换input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click');
    expect(input.element.type).toBe('text');
    expect(wrapper.find('.mini-input__password').attributes('icon')).toBe('eye');
  });
});

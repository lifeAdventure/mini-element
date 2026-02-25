import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';
//去掉模拟 比如样式
vi.mock('@popperjs/core');
const onVisibleChange = vi.fn();
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip content="hello tooltip" trigger="click" onVisible-change={onVisibleChange}>
            <button id="trigger">Trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body
      }
    );
    // 静态测试
    const triggerArea = wrapper.find('#trigger');
    expect(triggerArea.exists()).toBeTruthy();
    expect(wrapper.find('.mini-tooltip__popper').isVisible()).toBe(false);
    // 测试点击行为
    triggerArea.trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.mini-tooltip__popper').isVisible()).toBe(true);
    expect(wrapper.get('.mini-tooltip__popper').text()).toBe('hello tooltip');
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    wrapper.get('#outside').trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.mini-tooltip__popper').isVisible()).toBe(false);
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  });
});

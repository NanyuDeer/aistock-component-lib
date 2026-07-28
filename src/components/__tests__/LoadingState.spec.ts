import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingState from '../LoadingState.vue'

describe('LoadingState', () => {
  it('renders text', () => {
    const wrapper = mount(LoadingState, { props: { text: '加载中...' } })
    expect(wrapper.text()).toContain('加载中')
  })

  // 适配说明：LoadingState 的 size class 挂在 spinner 子元素（as-loading__spinner--${size}），不在根节点
  it('applies size class to spinner', () => {
    const wrapper = mount(LoadingState, { props: { size: 'lg' } })
    expect(wrapper.find('.as-loading__spinner--lg').exists()).toBe(true)
  })

  it('applies vertical layout class', () => {
    const wrapper = mount(LoadingState, { props: { layout: 'vertical' } })
    expect(wrapper.classes()).toContain('as-loading--vertical')
  })

  it('matches snapshot', () => {
    const wrapper = mount(LoadingState, { props: { text: '加载中', size: 'md' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

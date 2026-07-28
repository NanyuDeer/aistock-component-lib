import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from '../Progress.vue'

describe('Progress', () => {
  it('renders label', () => {
    const wrapper = mount(Progress, { props: { value: 68, label: '进度' } })
    expect(wrapper.text()).toContain('进度')
  })

  it('renders percentage value', () => {
    const wrapper = mount(Progress, { props: { value: 68 } })
    // 进度条宽度内联样式携带 value（label 为空时文本块不渲染，故从 bar 宽度验证 value 落地）
    expect(wrapper.find('.as-progress__bar').attributes('style')).toContain('68%')
  })

  // 适配说明：Progress 的 status class（is-${status}）挂在 as-progress__bar 子元素，根节点无 as-progress--danger
  it('applies danger status class to bar', () => {
    const wrapper = mount(Progress, { props: { value: 85, status: 'danger' } })
    expect(wrapper.find('.as-progress__bar.is-danger').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(Progress, { props: { value: 68, label: '同步进度', status: 'primary' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

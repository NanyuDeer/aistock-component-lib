import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'

describe('Badge', () => {
  it('renders text content', () => {
    const wrapper = mount(Badge, { slots: { default: '新' } })
    expect(wrapper.text()).toBe('新')
  })

  it('applies primary type class', () => {
    const wrapper = mount(Badge, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('as-badge--primary')
  })

  // 适配说明：Badge.vue 的 dot 是 boolean prop（非 type 值），改为测试真实 dot 模式
  it('applies dot mode', () => {
    const wrapper = mount(Badge, { props: { dot: true } })
    expect(wrapper.classes()).toContain('as-badge--dot')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Badge, { props: { type: 'warning' }, slots: { default: '待审核' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

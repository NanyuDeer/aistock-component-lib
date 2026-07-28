import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders with title', () => {
    const wrapper = mount(Card, {
      props: { title: '趋势股评级' }
    })
    expect(wrapper.text()).toContain('趋势股评级')
  })

  it('renders with subtitle', () => {
    const wrapper = mount(Card, {
      props: { title: '标题', subtitle: '副标题' }
    })
    expect(wrapper.text()).toContain('副标题')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Card, {
      props: { title: '标题' },
      slots: { default: '<div class="content">内容</div>' }
    })
    expect(wrapper.html()).toContain('内容')
  })

  it('renders footer slot', () => {
    const wrapper = mount(Card, {
      slots: { footer: '<div class="footer">底部</div>' }
    })
    expect(wrapper.html()).toContain('底部')
  })

  // 适配说明：Card.vue 实际无 paddingRm prop，改为测试真实的 clickable 交互态
  it('applies clickable class', () => {
    const wrapper = mount(Card, {
      props: { clickable: true }
    })
    expect(wrapper.classes()).toContain('is-clickable')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Card, {
      props: { title: '标题', subtitle: '副标题' },
      slots: { default: '内容' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

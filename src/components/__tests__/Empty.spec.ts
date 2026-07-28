import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Empty from '../Empty.vue'

describe('Empty', () => {
  it('renders title', () => {
    const wrapper = mount(Empty, { props: { title: '暂无数据' } })
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('renders description', () => {
    const wrapper = mount(Empty, { props: { title: '暂无数据', description: '请稍后重试' } })
    expect(wrapper.text()).toContain('请稍后重试')
  })

  // 适配说明：Empty.vue 无具名 action slot，操作区由默认 slot 渲染
  it('renders action via default slot', () => {
    const wrapper = mount(Empty, {
      props: { title: '空' },
      slots: { default: '<button>刷新</button>' }
    })
    expect(wrapper.html()).toContain('刷新')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Empty, { props: { title: '暂无搜索结果', description: '尝试更换关键词' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

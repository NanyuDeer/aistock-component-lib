import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'

describe('Tag', () => {
  it('renders text content', () => {
    const wrapper = mount(Tag, { slots: { default: '涨幅' } })
    expect(wrapper.text()).toBe('涨幅')
  })

  it('applies up type class', () => {
    const wrapper = mount(Tag, { props: { type: 'up' } })
    expect(wrapper.classes()).toContain('as-tag--up')
  })

  it('applies down type class', () => {
    const wrapper = mount(Tag, { props: { type: 'down' } })
    expect(wrapper.classes()).toContain('as-tag--down')
  })

  it('applies size class', () => {
    const wrapper = mount(Tag, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('as-tag--lg')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Tag, { props: { type: 'up' }, slots: { default: '+3.2%' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

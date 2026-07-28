import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '../Avatar.vue'

describe('Avatar', () => {
  it('renders text avatar', () => {
    const wrapper = mount(Avatar, { props: { text: '张三' } })
    expect(wrapper.text()).toContain('张三')
  })

  it('applies size class', () => {
    const wrapper = mount(Avatar, { props: { text: 'A', size: 'lg' } })
    expect(wrapper.classes()).toContain('as-avatar--lg')
  })

  it('applies variant class', () => {
    const wrapper = mount(Avatar, { props: { text: 'A', variant: 'gold' } })
    expect(wrapper.classes()).toContain('as-avatar--gold')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Avatar, { props: { text: '晋研', size: 'md', variant: 'primary' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '../Skeleton.vue'

describe('Skeleton', () => {
  it('renders title variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'title' } })
    expect(wrapper.classes()).toContain('as-skeleton--title')
  })

  it('renders text variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text' } })
    expect(wrapper.classes()).toContain('as-skeleton--text')
  })

  it('renders block variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'block' } })
    expect(wrapper.classes()).toContain('as-skeleton--block')
  })

  it('applies custom width', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text', width: '60%' } })
    expect(wrapper.attributes('style')).toContain('60%')
  })

  it('matches snapshot', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'title' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

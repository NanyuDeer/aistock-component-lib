import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../Rate.vue'

describe('Rate', () => {
  it('renders correct number of stars', () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, max: 5 } })
    const stars = wrapper.findAll('.as-rate__star')
    expect(stars).toHaveLength(5)
  })

  it('marks active stars', () => {
    const wrapper = mount(Rate, { props: { modelValue: 4, max: 5 } })
    const activeStars = wrapper.findAll('.as-rate__star.is-active')
    expect(activeStars).toHaveLength(4)
  })

  it('shows text when showText is true', () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, max: 5, showText: true } })
    expect(wrapper.text()).toContain('3/5')
  })

  it('does not emit when readonly', async () => {
    const wrapper = mount(Rate, { props: { modelValue: 3, readonly: true } })
    const stars = wrapper.findAll('.as-rate__star')
    await stars[1].trigger('tap')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Rate, { props: { modelValue: 4, max: 5, type: 'gold', showText: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

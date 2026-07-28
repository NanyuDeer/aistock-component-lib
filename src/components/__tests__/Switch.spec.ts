import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Switch from '../Switch.vue'

describe('Switch', () => {
  it('renders off state', () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    expect(wrapper.classes()).not.toContain('is-on')
  })

  it('renders on state', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('is-on')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits change event on click', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Switch, { props: { modelValue: false, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Switch, { props: { modelValue: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

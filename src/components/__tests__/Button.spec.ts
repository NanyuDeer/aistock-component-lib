import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders default button', () => {
    const wrapper = mount(Button, {
      slots: { default: '点击我' }
    })
    expect(wrapper.text()).toContain('点击我')
  })

  it('applies primary type class', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: 'Primary' }
    })
    expect(wrapper.classes()).toContain('as-btn')
    expect(wrapper.classes()).toContain('as-btn--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      slots: { default: 'Large' }
    })
    expect(wrapper.classes()).toContain('as-btn--lg')
  })

  it('disables interaction when disabled', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event when not disabled', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Click' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('matches snapshot', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary', size: 'md' },
      slots: { default: 'Snapshot' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

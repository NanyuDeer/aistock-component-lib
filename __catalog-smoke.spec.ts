import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import CatalogPage from './dev/CatalogPage.vue'

describe('CatalogPage smoke (Task 4)', () => {
  it('renders all 41 component cards', () => {
    const wrapper = mount(CatalogPage)
    const cards = wrapper.findAll('.catalog-card')
    expect(cards.length).toBe(41)
    // 标题与计数
    expect(wrapper.text()).toContain('组件目录')
    expect(wrapper.text()).toContain('共 41 个组件')
  })

  it('search filters cards by name', async () => {
    const wrapper = mount(CatalogPage)
    expect(wrapper.findAll('.catalog-card').length).toBe(41)
    const input = wrapper.find('.as-input__inner')
    await input.setValue('Modal')
    await flushPromises()
    expect(wrapper.findAll('.catalog-card').length).toBe(1)
    expect(wrapper.find('.catalog-card-name').text()).toBe('Modal')
  })

  it('category filter narrows cards', async () => {
    const wrapper = mount(CatalogPage)
    // 点击「图表」分类
    const chartChip = wrapper.findAll('.catalog-category').find(c => c.text() === '图表')!
    await chartChip.trigger('click')
    await flushPromises()
    // 图表类共 5 个组件
    expect(wrapper.findAll('.catalog-card').length).toBe(5)
  })

  it('clicking a card opens the preview panel', async () => {
    const wrapper = mount(CatalogPage)
    expect(wrapper.find('.catalog-preview').exists()).toBe(false)
    await wrapper.find('.catalog-card').trigger('click')
    await flushPromises()
    expect(wrapper.find('.catalog-preview').exists()).toBe(true)
  })

  it('shows empty state when no match', async () => {
    const wrapper = mount(CatalogPage)
    await wrapper.find('.as-input__inner').setValue('zzzznotexist')
    await flushPromises()
    expect(wrapper.find('.catalog-empty').exists()).toBe(true)
    expect(wrapper.findAll('.catalog-card').length).toBe(0)
  })
})

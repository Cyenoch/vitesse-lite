import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Footer from '~/components/layout/default/Footer.vue'

describe('component of Footer.vue', () => {
  it('should render', () => {
    const wrapper = mount(Footer, { props: {} })
    // expect(wrapper.text()).toContain('10')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be interactive', async () => {
    const wrapper = mount(Footer, { props: { } })

    toggleDark(false)

    expect(wrapper.find('.toggle-dark').exists()).toBe(true)

    await wrapper.get('.toggle-dark').trigger('click')

    expect(isDark.value).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CustomLabels from '../CustomLabels.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      common: {
        tba: 'TBA',
      },
    },
  },
})

describe('CustomLabels', () => {
  it('renders with basic props', () => {
    const wrapper = mount(CustomLabels, {
      global: {
        plugins: [i18n],
      },
      props: {
        tag: 'p',
      },
      slots: {
        default: 'Test Content',
      },
    })

    expect(wrapper.text()).toBe('Test Content')
    expect(wrapper.element.tagName).toBe('P')
  })
})

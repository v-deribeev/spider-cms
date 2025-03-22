import { describe, it, expect } from 'vitest'
import CommonButton from '../CommonButton.vue'
import { shallowMount } from '@vue/test-utils'

describe('CommonButton', () => {
  it('imports', () => {
    expect(CommonButton).toBeDefined()
  })

  it('has correct props', () => {
    expect(CommonButton.props.label).toBeDefined()
    expect(CommonButton.props.variant.default).toBe('primary')
    expect(CommonButton.props.size.default).toBe('medium')
    expect(CommonButton.props.type.default).toBe('button')
  })

  it('has additional props with correct defaults', () => {
    expect(CommonButton.props.disabled.default).toBe(false)
    expect(CommonButton.props.loading.default).toBe(false)
    expect(CommonButton.props.customClass.default).toBe('')
    expect(CommonButton.props.arias.default).toBe('')
  })

  it('validates prop values', () => {
    expect(CommonButton.props.variant.validator('primary')).toBe(true)
    expect(CommonButton.props.variant.validator('secondary')).toBe(true)
    expect(CommonButton.props.variant.validator('invalid')).toBe(false)

    expect(CommonButton.props.size.validator('small')).toBe(true)
    expect(CommonButton.props.size.validator('medium')).toBe(true)
    expect(CommonButton.props.size.validator('large')).toBe(true)
    expect(CommonButton.props.size.validator('invalid')).toBe(false)
  })
})
describe('CommonButton Computed Properties', () => {
  it('computes customCardClass correctly', () => {
    // Test with the variant as 'card' and no customClass
    const wrapper = shallowMount(CommonButton, {
      props: {
        variant: 'card',
      },
    })
    expect(wrapper.vm.customCardClass).toBe('card')

    // Test with the variant as 'card' and a customClass provided
    const customWrapper = shallowMount(CommonButton, {
      props: {
        variant: 'card',
        customClass: 'custom-card-class',
      },
    })
    expect(customWrapper.vm.customCardClass).toBe('custom-card-class')
  })
})

import { describe, test, expect } from 'vitest'
import { useCalculator } from '@/composables/useCalculator'

describe('useCalculator', () => {
  test('suma correctamente dos números', () => {
    const { displayValue, inputDigit, inputOperator, calculate } = useCalculator()

    // Simulamos pulsar: 5, +, 3, =
    inputDigit('5')
    inputOperator('+')
    inputDigit('3')
    calculate()

    expect(displayValue.value).toBe('8')
  })
})

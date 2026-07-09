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

  test('muestra Error al dividir entre cero', () => {
    const { displayValue, inputDigit, inputOperator, calculate } = useCalculator()

    // Simulamos: 5, /, 0, =
    inputDigit('5')
    inputOperator('/')
    inputDigit('0')
    calculate()

    expect(displayValue.value).toBe('Error')
  })

  test('resetea todo al pulsar CE', () => {
    const { displayValue, inputDigit, clear } = useCalculator()

    inputDigit('9')
    clear()

    expect(displayValue.value).toBe('0')
  })
})

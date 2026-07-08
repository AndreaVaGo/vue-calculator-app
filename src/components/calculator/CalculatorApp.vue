<script setup>
import { useCalculator } from '@/composables/useCalculator'
import CalculatorScreen from './CalculatorScreen.vue'
import CalculatorKeypad from './CalculatorKeypad.vue'

const { displayValue, inputDigit, inputDecimal, inputOperator, calculate, clear } = useCalculator()
</script>

<template>
  <div class="calculator">
    <CalculatorScreen :value="displayValue" />
    <CalculatorKeypad
      @digit="inputDigit"
      @decimal="inputDecimal"
      @operator="inputOperator"
      @equals="calculate"
      @clear="clear"
    />
  </div>
</template>

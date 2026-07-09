<script setup>
import { useCalculator } from '@/composables/useCalculator'
import { useMemoryStore } from '@/stores/memoryStore'
import CalculatorScreen from './CalculatorScreen.vue'
import CalculatorKeypad from './CalculatorKeypad.vue'

const { displayValue, inputDigit, inputDecimal, inputOperator, calculate, clear } = useCalculator()

const memoryStore = useMemoryStore()

// M+: guarda el número actual de pantalla en memoria
function memoryAdd() {
  memoryStore.saveValue(displayValue.value)
}

// MR: recupera el valor guardado y lo pone en pantalla
function memoryRecall() {
  if (memoryStore.storedValue !== null) {
    displayValue.value = memoryStore.storedValue
  }
}

// MC: borra el valor guardado en memoria
function memoryClear() {
  memoryStore.clearMemory()
}
</script>

<template>
  <div class="calculator card p-3 shadow-sm">
    <CalculatorScreen :value="displayValue" />
    <CalculatorKeypad
      @digit="inputDigit"
      @decimal="inputDecimal"
      @operator="inputOperator"
      @equals="calculate"
      @clear="clear"
      @memory-add="memoryAdd"
      @memory-recall="memoryRecall"
      @memory-clear="memoryClear"
    />
  </div>
</template>

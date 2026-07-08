<script setup>
// Eventos que este componente puede emitir hacia su padre (Calculator.vue)
const emit = defineEmits([
  'digit',
  'decimal',
  'operator',
  'equals',
  'clear',
  'memory-add',
  'memory-recall',
  'memory-clear',
])
</script>

<template>
  <div class="calculator-keypad">
    <!-- CE: resetea la calculadora, no lleva dato -->
    <button @click="emit('clear')">CE</button>
    <button @click="emit('memory-clear')">MC</button>
    <button @click="emit('memory-recall')">MR</button>
    <button @click="emit('memory-add')">M+</button>

    <!-- Fila de dígitos 7-8-9 + operador división -->
    <button @click="emit('digit', '7')">7</button>
    <button @click="emit('digit', '8')">8</button>
    <button @click="emit('digit', '9')">9</button>
    <button @click="emit('operator', '/')">/</button>

    <!-- Fila de dígitos 4-5-6 + operador multiplicación -->
    <button @click="emit('digit', '4')">4</button>
    <button @click="emit('digit', '5')">5</button>
    <button @click="emit('digit', '6')">6</button>
    <button @click="emit('operator', '*')">*</button>

    <!-- Fila de dígitos 1-2-3 + operador resta -->
    <button @click="emit('digit', '1')">1</button>
    <button @click="emit('digit', '2')">2</button>
    <button @click="emit('digit', '3')">3</button>
    <button @click="emit('operator', '-')">-</button>

    <!-- Fila final: 0, punto decimal, igual, operador suma -->
    <button @click="emit('digit', '0')">0</button>
    <button @click="emit('decimal')">.</button>
    <button @click="emit('equals')">=</button>
    <button @click="emit('operator', '+')">+</button>
  </div>
</template>

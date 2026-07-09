<script setup>
// Eventos que este componente puede emitir hacia su padre (CalculatorApp.vue)
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
  <div class="calculator-keypad d-grid gap-1" style="grid-template-columns: repeat(4, 1fr)">
    <button class="btn btn-sm btn-info" @click="emit('memory-clear')">MC</button>
    <button class="btn btn-sm btn-info" @click="emit('memory-recall')">MR</button>
    <button class="btn btn-sm btn-info" @click="emit('memory-add')">M+</button>
    <button class="btn btn-sm btn-danger" @click="emit('clear')">CE</button>

    <button class="btn btn-sm btn-secondary" @click="emit('digit', '7')">7</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '8')">8</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '9')">9</button>
    <button class="btn btn-sm btn-warning" @click="emit('operator', '/')">/</button>

    <button class="btn btn-sm btn-secondary" @click="emit('digit', '4')">4</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '5')">5</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '6')">6</button>
    <button class="btn btn-sm btn-warning" @click="emit('operator', '*')">*</button>

    <button class="btn btn-sm btn-secondary" @click="emit('digit', '1')">1</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '2')">2</button>
    <button class="btn btn-sm btn-secondary" @click="emit('digit', '3')">3</button>
    <button class="btn btn-sm btn-warning" @click="emit('operator', '-')">-</button>

    <button class="btn btn-sm btn-secondary" @click="emit('digit', '0')">0</button>
    <button class="btn btn-sm btn-secondary" @click="emit('decimal')">.</button>
    <button class="btn btn-sm btn-success" @click="emit('equals')">=</button>
    <button class="btn btn-sm btn-warning" @click="emit('operator', '+')">+</button>
  </div>
</template>

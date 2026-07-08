<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="calculator-screen">
    {{ value }}
  </div>
</template>

<style scoped>
.calculator-screen {
  background-color: #222;
  color: white;
  font-size: 2rem;
  text-align: right;
  padding: 1rem;
  border-radius: 8px;
}
</style>

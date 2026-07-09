<script setup>
defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="calculator-screen bg-dark text-white text-end p-3 mb-2 rounded fs-2">
    {{ value }}
  </div>
</template>

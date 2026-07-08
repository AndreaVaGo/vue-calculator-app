<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCurrencyConverter } from '@/composables/useCurrencyConverter'

const { rates, isLoading, error, fetchRates, convert } = useCurrencyConverter()

// Estado local del formulario (no vive en el composable porque es específico de este componente)
const amount = ref(1)
const fromCurrency = ref('EUR')
const toCurrency = ref('USD')

// computed: se recalcula automáticamente cada vez que amount, fromCurrency o toCurrency cambian
const convertedAmount = computed(() => {
  if (!rates.value) return null
  return convert(amount.value, fromCurrency.value, toCurrency.value)
})

// onMounted: en cuanto el componente aparece en pantalla, pedimos las tasas a la API
onMounted(() => {
  fetchRates()
})
</script>

<template>
  <div class="currency-converter">
    <h3>Conversor de Divisas</h3>

    <p v-if="isLoading">Cargando tasas de cambio...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else>
      <input v-model.number="amount" type="number" min="0" />

      <select v-model="fromCurrency">
        <option value="EUR">Euro (€)</option>
        <option value="USD">Dólar ($)</option>
        <option value="JPY">Yen (¥)</option>
      </select>

      <span>→</span>

      <select v-model="toCurrency">
        <option value="EUR">Euro (€)</option>
        <option value="USD">Dólar ($)</option>
        <option value="JPY">Yen (¥)</option>
      </select>

      <p>Resultado: {{ convertedAmount?.toFixed(2) }}</p>
    </div>
  </div>
</template>

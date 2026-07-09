<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCurrencyConverter } from '@/composables/useCurrencyConverter'

const { rates, isLoading, error, fetchRates, convert } = useCurrencyConverter()

const amount = ref(1)
const fromCurrency = ref('EUR')
const toCurrency = ref('USD')

const convertedAmount = computed(() => {
  if (!rates.value) return null
  return convert(amount.value, fromCurrency.value, toCurrency.value)
})

onMounted(() => {
  fetchRates()
})
</script>

<template>
  <div class="currency-converter card p-3 h-100">
    <h3 class="card-title">Conversor de Divisas</h3>

    <p v-if="isLoading" class="text-muted">Cargando tasas de cambio...</p>
    <p v-else-if="error" class="text-danger">{{ error }}</p>

    <div v-else>
      <div class="mb-3">
        <input v-model.number="amount" type="number" min="0" class="form-control" />
      </div>

      <div class="d-flex align-items-center gap-2 mb-3">
        <select v-model="fromCurrency" class="form-select">
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dólar ($)</option>
          <option value="JPY">Yen (¥)</option>
        </select>

        <span class="fs-4">→</span>

        <select v-model="toCurrency" class="form-select">
          <option value="EUR">Euro (€)</option>
          <option value="USD">Dólar ($)</option>
          <option value="JPY">Yen (¥)</option>
        </select>
      </div>

      <p class="fs-5 fw-bold">Resultado: {{ convertedAmount?.toFixed(2) }}</p>
    </div>
  </div>
</template>

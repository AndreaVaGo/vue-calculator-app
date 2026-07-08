import { ref } from 'vue'
import CurrencyRepository from '@/core/repositories/CurrencyRepository.js'

// Instancia única del repository, reutilizada por este composable
const currencyRepository = new CurrencyRepository()

export function useCurrencyConverter() {
  // Estado reactivo
  const rates = ref(null) // Guardará el objeto { EUR: "0.92", USD: "1", JPY: "150.2" }
  const isLoading = ref(false) // true mientras esperamos respuesta de la API
  const error = ref(null) // Mensaje de error si algo falla

  // Pide las tasas de cambio actuales a la API
  async function fetchRates() {
    isLoading.value = true
    error.value = null

    try {
      const data = await currencyRepository.getRates()
      rates.value = data.rates
      // Añadimos USD manualmente, porque la API no lo devuelve en "rates"
      // (USD es la base, así que su tasa respecto a sí mismo siempre es 1)
      rates.value.USD = '1'
    } catch (err) {
      error.value = 'No se pudieron cargar las tasas de cambio'
    } finally {
      // "finally" se ejecuta siempre, haya ido bien o mal la petición
      isLoading.value = false
    }
  }

  // Convierte una cantidad de una divisa a otra, usando USD como intermediario
  function convert(amount, fromCurrency, toCurrency) {
    if (!rates.value) return null

    const numericAmount = Number(amount)
    const rateFrom = Number(rates.value[fromCurrency])
    const rateTo = Number(rates.value[toCurrency])

    // Primero pasamos la cantidad a USD, luego de USD a la divisa destino
    const amountInUsd = numericAmount / rateFrom
    const result = amountInUsd * rateTo

    return result
  }

  return {
    rates,
    isLoading,
    error,
    fetchRates,
    convert,
  }
}

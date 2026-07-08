import { ref } from 'vue'
import WeatherRepository from '@/core/repositories/WeatherRepository.js'
import { mapWeatherData } from '@/core/mappers/weatherMapper.js'

// Instancia única del repository, reutilizada por este composable
const weatherRepository = new WeatherRepository()

export function useWeather() {
  // Estado reactivo
  const cities = ref([]) // Lista de ciudades de Asturias, ya mapeadas y listas para pintar
  const nationalForecast = ref(null) // Texto del pronóstico nacional
  const isLoading = ref(false) // true mientras esperamos respuesta de la API
  const error = ref(null) // Mensaje de error si algo falla

  // Pide el tiempo de Asturias (provincia = '33') y mapea cada ciudad recibida
  async function fetchAsturias() {
    isLoading.value = true
    error.value = null

    try {
      const data = await weatherRepository.getByProvince('33')

      // .map() recorre el array "ciudades" y aplica mapWeatherData a cada una,
      // devolviendo un array nuevo ya transformado y limpio para el componente
      cities.value = data.ciudades.map(mapWeatherData)
    } catch (err) {
      // Si la API falla o no responde, guardamos un mensaje de error legible
      error.value = 'No se pudo cargar el tiempo de Asturias'
    } finally {
      // finally se ejecuta siempre, haya ido bien o mal la petición
      isLoading.value = false
    }
  }

  // Pide el tiempo nacional: solo trae un texto-resumen (today.p), sin ciudades individuales
  async function fetchNational() {
    isLoading.value = true
    error.value = null

    try {
      const data = await weatherRepository.getNational()
      nationalForecast.value = data.today.p
    } catch (err) {
      error.value = 'No se pudo cargar el tiempo nacional'
    } finally {
      isLoading.value = false
    }
  }

  return {
    cities,
    nationalForecast,
    isLoading,
    error,
    fetchAsturias,
    fetchNational,
  }
}

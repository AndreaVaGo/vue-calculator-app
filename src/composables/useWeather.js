import { ref } from 'vue'
import WeatherRepository from '@/core/repositories/WeatherRepository.js'
import { mapWeatherData } from '@/core/mappers/weatherMapper.js'

const weatherRepository = new WeatherRepository()

// Corrige textos con codificación incorrecta que vienen de la API
// (algunos caracteres especiales como acentos o "ñ" llegan mal codificados)
function fixEncoding(text) {
  return decodeURIComponent(escape(text))
}

export function useWeather() {
  const cities = ref([])
  const nationalForecast = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchAsturias() {
    isLoading.value = true
    error.value = null

    try {
      const data = await weatherRepository.getByProvince('33')
      cities.value = data.ciudades.map(mapWeatherData)
    } catch (err) {
      error.value = 'No se pudo cargar el tiempo de Asturias'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchNational() {
    isLoading.value = true
    error.value = null

    try {
      const data = await weatherRepository.getNational()
      const rawText = data.descripcion_prediccion.p.join(' ')
      nationalForecast.value = fixEncoding(rawText)
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

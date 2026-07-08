// Diccionario que traduce el código AEMET (stateSky.id) a un emoji representativo.
// Códigos oficiales de AEMET: https://www.aemet.es (11=despejado, 12=poco nuboso, etc.)
const skyIcons = {
  11: '☀️', // Despejado
  12: '🌤️', // Poco nuboso
  13: '⛅', // Intervalos nubosos
  14: '☁️', // Nuboso
  15: '☁️', // Muy nuboso
  16: '☁️', // Cubierto
  17: '🌫️', // Nubes altas
  23: '🌦️', // Intervalos nubosos con lluvia
  24: '🌧️', // Nuboso con lluvia
  26: '🌧️', // Cubierto con lluvia
  43: '⛈️', // Intervalos nubosos con tormenta
  44: '⛈️', // Nuboso con tormenta
  46: '⛈️', // Cubierto con tormenta
}

// Transforma los datos "en bruto" de la API en un objeto limpio para nuestro componente
export function mapWeatherData(rawCity) {
  return {
    name: rawCity.name,
    maxTemp: rawCity.temperatures.max,
    minTemp: rawCity.temperatures.min,
    skyDescription: rawCity.stateSky.description,
    skyIcon: skyIcons[rawCity.stateSky.id] || '❓', // valor por defecto si el código no está en nuestro diccionario
  }
}

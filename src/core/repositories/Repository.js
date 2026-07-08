import axios from 'axios'

// Clase base genérica para hacer peticiones HTTP con Axios.
// Otras clases (CurrencyRepository, WeatherRepository) heredarán de esta,
// cada una apuntando a su propia API distinta.
export default class Repository {
  constructor(baseUrl) {
    // Guardamos la URL base de la API concreta (ej: currencyfreaks o el-tiempo.net)
    this.baseUrl = baseUrl
  }

  // Método genérico para hacer peticiones GET.
  // "async" porque una petición HTTP tarda un tiempo en responder;
  // usamos "await" para esperar esa respuesta sin bloquear el resto del código.
  async get(params = {}) {
    // Axios construye la URL final añadiendo los "params" como query string
    // (ej: ?apikey=xxx&symbols=EUR,USD,JPY), sin que tengamos que concatenar strings a mano
    const response = await axios.get(this.baseUrl, { params })

    // Axios devuelve un objeto con mucha info extra (status, headers...);
    // a nosotros solo nos interesa el JSON real que envió la API, que está en "data"
    return response.data
  }
}

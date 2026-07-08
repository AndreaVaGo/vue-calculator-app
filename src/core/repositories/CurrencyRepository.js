import Repository from './Repository.js'

// Repository específico para la API de CurrencyFreaks.
// Hereda de Repository, así que ya tiene el método get() listo para usar.
export default class CurrencyRepository extends Repository {
  constructor() {
    // Le pasamos al constructor de la clase padre (Repository) la URL fija de esta API
    super('https://api.currencyfreaks.com/v2.0/rates/latest')
  }

  // Método propio: pide las tasas de cambio para EUR, USD y JPY
  async getRates() {
    const apiKey = import.meta.env.VITE_CURRENCYFREAKS_API_KEY

    // Llamamos al get() heredado, pasándole los parámetros que necesita esta API en concreto
    const data = await this.get({
      apikey: apiKey,
      symbols: 'EUR,USD,JPY',
    })

    return data
  }
}

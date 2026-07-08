import Repository from './Repository.js'

// Repository para la API de el-tiempo.net (no requiere API key)
export default class WeatherRepository extends Repository {
  constructor() {
    super('https://api.el-tiempo.net/json/v3')
  }

  // Tiempo nacional
  async getNational() {
    const data = await this.get({}, '/general')
    return data
  }

  // Tiempo de una provincia (Asturias = '33')
  async getByProvince(codProv) {
    const data = await this.get({}, `/provincias/${codProv}`)
    return data
  }
}

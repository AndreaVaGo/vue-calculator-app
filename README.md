# Calculadora Multifuncional — Vue 3

Aplicación web de una sola vista (SPA) desarrollada con Vue 3 que combina una calculadora funcional con un conversor de divisas y un módulo de información meteorológica en tiempo real.

## Enlaces

- Repositorio: https://github.com/AndreaVaGo/vue-calculator-app
- Aplicación desplegada: https://andreavago.github.io/vue-calculator-app/
- Prototipo: https://app-clone-132.preview.emergentagent.com/?utm_source=share

## Objetivo del proyecto

Integrar en una única vista:

- Una calculadora con las operaciones básicas (suma, resta, multiplicación, división)
- Un conversor de divisas en tiempo real (Euro, Dólar, Yen)
- Un módulo de información meteorológica (nacional o de Asturias)
- Una función de memoria (M+, MR, MC) gestionada con Pinia

## Funcionalidades

### Calculadora

- Operaciones básicas: suma (+), resta (-), multiplicación (\*), división (/)
- Teclas numéricas del 0 al 9
- Tecla de coma decimal (.)
- Tecla de resultado (=)
- Tecla de reseteo (CE)
- Control de errores: división entre cero, evita decimales duplicados
- Memoria: M+ (guardar), MR (recuperar), MC (borrar), usando Pinia

### Conversor de divisas

- Conversión entre Euro (€), Dólar ($) y Yen (¥)
- Tasas de cambio en tiempo real vía la API de [CurrencyFreaks](https://currencyfreaks.com/)
- Cálculo de conversión cruzada usando USD como divisa intermedia

### El Tiempo

- Datos meteorológicos en tiempo real vía la API de [el-tiempo.net](https://www.el-tiempo.net/api)
- Selector entre información nacional o de la provincia de Asturias
- Icono representativo del estado del cielo (stateSky) para cada localidad
- Gestión de estados de carga y error

## Stack tecnológico

- Vue 3 (Composition API)
- Vite
- Pinia
- Axios
- Bootstrap 5
- Vitest
- Playwright
- ESLint + Prettier

## Arquitectura

El proyecto no sigue un patrón MVC estricto, ya que Vue no está pensado para ese modelo, sino una arquitectura basada en Composition API, más cercana a MVVM (Model-View-ViewMode). La separación de responsabilidades es la siguiente:

| Capa       | Ubicación                                                                         | Responsabilidad                                                                                   |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Model      | `core/repositories/`, `core/mappers/`, estado (`ref()`) dentro de los composables | Acceso a datos externos y transformación a un formato limpio                                      |
| View       | `<template>` de cada componente `.vue`                                            | Presentación visual, sin lógica de negocio                                                        |
| Controller | `composables/` (`useCalculator`, `useCurrencyConverter`, `useWeather`)            | Reciben la intención del usuario desde los componentes y coordinan Model y View de forma reactiva |

Además, el acceso a las APIs externas sigue el patrón Repository: una clase base (`Repository.js`) con la lógica común de peticiones HTTP, y una clase específica por cada API (`CurrencyRepository.js`, `WeatherRepository.js`) que hereda de ella.

## Estructura del proyecto

​```
src/
├── assets/ # Recursos estáticos
├── components/
│ ├── calculator/ # Componentes de la calculadora
│ ├── currency/ # Componente del conversor de divisas
│ └── weather/ # Componente del módulo del tiempo
├── composables/ # Lógica reactiva reutilizable
│ ├── useCalculator.js
│ ├── useCurrencyConverter.js
│ └── useWeather.js
├── core/
│ ├── mappers/ # Transformación de datos de las APIs
│ └── repositories/ # Acceso a las APIs externas (patrón Repository)
├── stores/ # Store de Pinia (memoria de la calculadora)
├── **tests**/ # Tests unitarios con Vitest
├── App.vue
└── main.js

e2e/ # Tests end-to-end con Playwright
​```

## Instalación y uso local

1. Clona el repositorio:

​`bash
git clone https://github.com/AndreaVaGo/vue-calculator-app.git
cd vue-calculator-app
​`

2. Instala las dependencias:

​`bash
npm install
​`

3. Crea un archivo `.env` en la raíz del proyecto con tu clave de la API de CurrencyFreaks:

​`
VITE_CURRENCYFREAKS_API_KEY=tu_clave_aqui
​`

Puedes obtener una clave gratuita registrándote en [currencyfreaks.com](https://currencyfreaks.com/). La API de el-tiempo.net no requiere clave.

4. Arranca el servidor de desarrollo:

​`bash
npm run dev
​`

## Testing

Tests unitarios (Vitest), cubren la lógica de la calculadora (suma, división por cero, reseteo):

​`bash
npm run test:unit
​`

Tests E2E (Playwright), simulan la interacción real del usuario con la calculadora en el navegador:

​`bash
npx playwright test
​`

Requiere tener el servidor de desarrollo corriendo (`npm run dev`) en otra terminal.

## Build y despliegue

​`bash
npm run build
​`

Genera la versión de producción en la carpeta `dist/`, desplegada en GitHub Pages.

## Autora

Andrea

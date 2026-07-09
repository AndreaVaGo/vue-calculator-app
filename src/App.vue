<script setup>
import CalculatorApp from './components/calculator/CalculatorApp.vue'
import CurrencyConverter from './components/currency/CurrencyConverter.vue'
import WeatherWidget from './components/weather/WeatherWidget.vue'
</script>

<template>
  <div class="container py-3 py-md-5" style="background-color: #f4f6f9; min-height: 100vh">
    <h1 class="text-center mb-4 fw-bold">Calculadora Multifuncional</h1>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <CalculatorApp />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-lg-6 mb-4">
        <CurrencyConverter />
      </div>
      <div class="col-12 col-lg-6 mb-4">
        <WeatherWidget />
      </div>
    </div>
  </div>
</template>

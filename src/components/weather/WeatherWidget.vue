<script setup>
import { ref, onMounted } from 'vue'
import { useWeather } from '@/composables/useWeather'

const { cities, nationalForecast, isLoading, error, fetchAsturias, fetchNational } = useWeather()

const selectedView = ref('asturias')

function handleViewChange() {
  if (selectedView.value === 'asturias') {
    fetchAsturias()
  } else {
    fetchNational()
  }
}

onMounted(() => {
  fetchAsturias()
})
</script>

<template>
  <div class="weather-widget card p-3 h-100">
    <h3 class="card-title">El Tiempo</h3>

    <select v-model="selectedView" @change="handleViewChange" class="form-select mb-3">
      <option value="asturias">Asturias</option>
      <option value="national">Nacional</option>
    </select>

    <p v-if="isLoading" class="text-muted">Cargando el tiempo...</p>
    <p v-else-if="error" class="text-danger">{{ error }}</p>

    <div
      v-else-if="selectedView === 'national'"
      class="national-forecast"
      style="max-height: 300px; overflow-y: auto"
    >
      <p class="lh-lg">{{ nationalForecast }}</p>
    </div>

    <ul v-else class="list-group list-group-flush">
      <li v-for="city in cities" :key="city.name" class="list-group-item">
        {{ city.skyIcon }} <strong>{{ city.name }}</strong
        >: {{ city.skyDescription }} ({{ city.minTemp }}°C - {{ city.maxTemp }}°C)
      </li>
    </ul>
  </div>
</template>

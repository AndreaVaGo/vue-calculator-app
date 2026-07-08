import { ref } from 'vue'
import { defineStore } from 'pinia'

// Store de Pinia para la memoria de la calculadora (M+, MR, MC)
export const useMemoryStore = defineStore('memory', () => {
  // State: el valor guardado en memoria (null si no hay nada guardado)
  const storedValue = ref(null)

  // Action: guarda un valor en memoria (tecla M+)
  function saveValue(value) {
    storedValue.value = value
  }

  // Action: borra el valor guardado (tecla MC)
  function clearMemory() {
    storedValue.value = null
  }

  return {
    storedValue,
    saveValue,
    clearMemory,
  }
})

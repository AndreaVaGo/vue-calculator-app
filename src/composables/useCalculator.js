import { ref } from 'vue'

export function useCalculator() {
  // Estado de la calculadora
  const displayValue = ref('0') // Lo que se muestra en pantalla (arranca en "0", como al encenderla)
  const previousValue = ref(null) // Número archivado antes de aplicar un operador
  const operator = ref(null) // Operador pendiente de aplicar (+, -, *, /)
  const waitingForNewNumber = ref(false) // true = el siguiente dígito debe reemplazar la pantalla

  // Cuando se pulsa un dígito (0-9)
  function inputDigit(digit) {
    if (waitingForNewNumber.value === true) {
      // Empezamos un número nuevo: reemplazamos la pantalla
      displayValue.value = digit
      // Desactivamos la bandera, ya no esperamos "número nuevo"
      waitingForNewNumber.value = false
    } else {
      // Seguimos escribiendo el mismo número
      if (displayValue.value === '0') {
        // Si la pantalla solo tiene "0", lo reemplazamos (evita "05")
        displayValue.value = digit
      } else {
        // Si ya hay dígitos, concatenamos el nuevo al final
        displayValue.value = displayValue.value + digit
      }
    }
  }

  // Cuando se pulsa "." para decimales:
  // añadimos el punto solo si la pantalla todavía no tiene uno
  function inputDecimal() {
    if (waitingForNewNumber.value === true) {
      // Empezamos número nuevo con "0." (ej: tras un operador, pulsar ".")
      displayValue.value = '0.'
      waitingForNewNumber.value = false
      return
    }
    // Si ya hay un punto, no hacemos nada (evita "12..5")
    if (!displayValue.value.includes('.')) {
      displayValue.value = displayValue.value + '.'
    }
  }

  // Cuando se pulsa un operador (+, -, *, /):
  // si no había operador pendiente, archivamos el número actual;
  // si ya había uno, lo sustituimos por el nuevo (permite encadenar, ej: 5, +, *)
  function inputOperator(nextOperator) {
    if (operator.value == null) {
      // Primera vez que se pulsa un operador: archivamos el número actual
      previousValue.value = displayValue.value
      operator.value = nextOperator
    } else {
      // Ya había un operador pendiente: solo actualizamos el operador
      operator.value = nextOperator
    }
    // En ambos casos, el siguiente dígito debe reemplazar la pantalla
    waitingForNewNumber.value = true
  }

  // Cuando se pulsa "="
  function calculate() {
    const prev = Number(previousValue.value)
    const current = Number(displayValue.value)
    let result = 0

    if (operator.value === '+') {
      result = prev + current
    } else if (operator.value === '-') {
      result = prev - current
    } else if (operator.value === '*') {
      result = prev * current
    } else if (operator.value === '/') {
      // Control de errores: evitamos dividir entre cero antes de operar
      if (current === 0) {
        displayValue.value = 'Error'
        previousValue.value = null
        operator.value = null
        return // cortamos aquí para no sobreescribir "Error" más abajo
      }
      result = prev / current
    }

    // Mostramos el resultado y dejamos la calculadora lista para la siguiente operación
    displayValue.value = result.toString()
    previousValue.value = null
    operator.value = null
  }

  // Cuando se pulsa "CE": volvemos la calculadora a su estado inicial,
  // como si se acabara de encender
  function clear() {
    displayValue.value = '0'
    previousValue.value = null
    operator.value = null
    waitingForNewNumber.value = false
  }

  return {
    displayValue,
    previousValue,
    operator,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clear,
  }
}

import { ref, computed } from 'vue'

export function useCountdown(initialSeconds = 116) {
  const secondsLeft = ref(initialSeconds)
  const expired = ref(false)
  let timerId = null

  const minutes = computed(() => String(Math.floor(secondsLeft.value / 60)).padStart(2, '0'))
  const seconds = computed(() => String(secondsLeft.value % 60).padStart(2, '0'))

  const start = () => {
    expired.value = false
    secondsLeft.value = initialSeconds
    clearInterval(timerId)
    timerId = setInterval(() => {
      if (secondsLeft.value > 0) {
        secondsLeft.value--
      } else {
        expired.value = true
        clearInterval(timerId)
      }
    }, 1000)
  }

  const reset = () => start()

  return { minutes, seconds, expired, start, reset }
}

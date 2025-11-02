import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const phone = ref('')
  const isLoggedIn = ref(false)

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? decodeURIComponent(match[2]) : null
  }

  function isLoginValid() {
    const loginTimestamp = getCookie('loginTimestamp')
    if (!loginTimestamp) return false
    const now = Date.now()
    const THIRTY_MINUTES = 30 * 60 * 1000
    return now - Number(loginTimestamp) < THIRTY_MINUTES
  }

  function setPhone(value) {
    phone.value = value
  }

  function login() {
    isLoggedIn.value = true
    document.cookie = `loginTimestamp=${Date.now()}; max-age=${30 * 60}; path=/`
  }

  function logout() {
    isLoggedIn.value = false
    phone.value = ''
    document.cookie = 'loginTimestamp=; Max-Age=0; path=/'
  }

  function checkCooki() {
    isLoggedIn.value = isLoginValid()
  }

  return { phone, isLoggedIn, setPhone, login, logout, checkCooki }
})

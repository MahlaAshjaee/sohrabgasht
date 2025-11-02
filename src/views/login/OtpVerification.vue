<template>
  <form class="my-auto" @submit.prevent="confirmCode">
    <PageTitle title="کد تایید" />
    <div class="flex justify-between items-center mb-4">
      <p class="text-sm font-medium text-gray-600">کد ارسال شده به شماره همراه را وارد کنید</p>
      <div class="flex items-center text-xs">
        <span v-if="!expired" class="text-gray-500">{{ minutes }}:{{ seconds }}</span>
        <button v-else @click="reset" class="text-brand-red font-bold">ارسال مجدد</button>
      </div>
    </div>

    <BaseOtpInput ref="otpRef" v-model="otp" :length="OTP_LENGTH" />

    <BaseButton
      :variant="otpComplete ? 'primary' : ''"
      label="تأیید"
      :disabled="!otpComplete"
      type="submit"
    />

    <div class="mt-4">
      <router-link
        :to="{ name: 'password-login' }"
        class="text-brand-red text-sm font-medium text-right block"
      >
        ورود با رمز عبور
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import { useCountdown } from '@/composables/useCountdown'
import { useAuthStore } from '@/stores/auth'
import BaseOtpInput from '@/components/login/BaseOtpInput.vue'
import PageTitle from '@/components/login/PageTitle.vue'

const router = useRouter()
const authStore = useAuthStore()
const OTP_LENGTH = 5
const otp = ref(Array(OTP_LENGTH).fill(''))
const otpRef = ref(null)
const loading = ref(false)

const otpComplete = computed(() => otp.value.join('').length === OTP_LENGTH)
const { minutes, seconds, expired, start, reset } = useCountdown(116)

onMounted(() => {
  start()
  nextTick(() => otpRef.value?.focusFirstEmpty?.())
})

async function confirmCode() {
  if (!otpComplete.value) return
  loading.value = true

  try {
    const code = otp.value.join('').trim()
    // شبیه‌سازی درخواست واقعی تأیید کد
    await new Promise((resolve) => setTimeout(resolve, 500))

    authStore.login()
    router.push({ name: 'home' })
  } catch (err) {
    alert('کد وارد شده صحیح نیست یا خطا رخ داده است.')
  } finally {
    loading.value = false
  }
}
</script>

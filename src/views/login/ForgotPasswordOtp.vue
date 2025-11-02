<template>
  <form class="my-auto" @submit.prevent="confirmOtp">
    <PageTitle title="کد تایید" />
    <p class="text-sm text-gray-600 mb-4">کد تایید را وارد کنید</p>
    <BaseOtpInput ref="otpRef" v-model="otp" :length="OTP_LENGTH" />
    <BaseButton
      variant="primary"
      label="تأیید"
      type="submit"
      :disabled="!otpComplete"
    />
  </form>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseOtpInput from '@/components/login/BaseOtpInput.vue'
import PageTitle from '@/components/login/PageTitle.vue'

const router = useRouter()
const OTP_LENGTH = 5
const otp = ref(Array(OTP_LENGTH).fill(''))
const otpRef = ref(null)

const otpComplete = computed(() => otp.value.join('').length === OTP_LENGTH)

onMounted(() => {
  nextTick(() => otpRef.value?.focusFirstEmpty?.())
})

const confirmOtp = () => {
  if (!otpComplete.value) return

  router.push({ name: 'forgot-password-new' })
}
</script>

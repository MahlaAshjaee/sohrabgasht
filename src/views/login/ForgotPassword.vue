<template>
  <form class="my-auto" @submit.prevent="sendOtp">
    <PageTitle title="تغییر رمز عبور" />
    <BaseField
      id="phone"
      name="phone"
      label="شماره همراه"
      v-model="phone"
      type="tel"
      inputmode="numeric"
      placeholder="شماره همراه خود را وارد کنید"
    />
    <BaseButton type="submit" variant="primary" label="ورود" :disabled="!phone.length" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import PageTitle from '@/components/login/PageTitle.vue'

const router = useRouter()
const phone = ref('')

const sendOtp = () => {
  if (!phone.value.trim()) return

  // 🔹 هدایت به صفحه وارد کردن کد
  router.push({ name: 'forgot-password-otp' })
}
</script>

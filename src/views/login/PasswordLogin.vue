<template>
  <form class="my-auto" @submit.prevent="loginWithPassword">
    <PageTitle title="ورود با رمز عبور" />
    <BaseField
      id="password"
      name="password"
      label="رمز عبور"
      v-model="password"
      type="tel"
      inputmode="numeric"
      placeholder="رمز عبور خود را وارد کنید"
    />

    <BaseButton variant="primary" label="ورود" :disabled="!password.length" type="submit" />

    <div class="mt-4 flex justify-between text-sm">
      <router-link :to="{ name: 'verify' }" class="text-brand-red text-sm font-medium">
        ورود با کد یکبار مصرف
      </router-link>
      <router-link :to="{ name: 'forgot-password' }" class="text-gray-600 font-medium text-sm">
        فراموشی رمز عبور
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import PageTitle from '@/components/login/PageTitle.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const password = ref('')

const loginWithPassword = () => {
  if (!password.value.trim()) return

  try {
    // ✅ اینجا منطق واقعی لاگین
    // مثلاً ارسال رمز عبور به سرور، یا فعلاً شبیه‌سازی
    authStore.login()
    router.push({ name: 'home' })
  } catch (err) {
    console.error(err)
    alert('خطا در ورود. لطفاً دوباره تلاش کنید.')
  }
}
</script>

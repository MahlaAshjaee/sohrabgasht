<template>
  <section class="flex flex-col h-[100svh] bg-white px-4">
    <div class="flex-1 overflow-auto pt-20 pb-4">
      <div class="flex flex-col items-center font-medium mb-8">
        <BrandLogo />
        <h1 class="text-xl font-extrabold mt-4 text-center">سهراب گشت</h1>
      </div>

      <PageTitle title="ورود رانندگان" />

      <form @submit.prevent="submitForm" class="w-full space-y-3">
        <BaseField
          id="phone"
          name="phone"
          v-model="localPhone"
          type="tel"
          label="شماره همراه"
          inputmode="numeric"
          placeholder="شماره همراه خود را وارد کنید "
        />
        <BaseButton
          variant="primary"
          label="ورود"
          type="submit"
          :disabled="!/^09\d{9}$/.test(localPhone.trim())"
        />
      </form>

      <p class="text-gray-700 font-normal text-xs text-right py-3">
        در صورت تغییر تلفن همراه با پشتیبانی تماس بگیرید
      </p>
    </div>

    <!-- ناحیه پایین (ثابت و بدون حرکت) -->
    <footer class="py-4 text-center border-t border-gray-200 bg-white">
      <a
        href="tel:021xxxxxxx"
        class="inline-flex items-center text-sm text-brand-red font-bold select-none"
      >
        <BaseIcon src="headphone" />
        تماس با پشتیبانی
      </a>
    </footer>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import BrandLogo from '@/components/login/BrandLogo.vue'
import BaseField from '@/components/common/BaseField.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import PageTitle from '@/components/login/PageTitle.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const auth = useAuthStore()
const router = useRouter()
const localPhone = ref('')
const loading = ref(false)

async function submitForm(e) {
  if (!/^09\d{9}$/.test(localPhone.value.trim())) {
    alert('شماره موبایل معتبر وارد کنید')
    return
  }

  loading.value = true
  try {
    auth.setPhone(localPhone.value.trim())
    auth.login()
    router.push({ name: 'verify' })
  } catch (err) {
    alert('خطا در اتصال به سرور')
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <section class="px-4 pt-6 pb-16 space-y-4">
    <h2 class="text-sm font-bold text-gray-900 flex items-center gap-1">
      <span class="text-red-600 text-lg">•</span>
      فرم زیر را جهت درخواست کارت سرویس تکمیل نمایید
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseField
        id="month"
        label="ماه مورد نظر را انتخاب کنید"
        type="select"
        v-model="form.month"
        :options="monthOptions"
        placeholder="انتخاب کنید"
        required
      />

      <BaseField
        id="desc"
        label="توضیحات"
        type="textarea"
        v-model="form.desc"
        placeholder="توضیحات خود را وارد کنید"
        required
      />

      <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
        <BaseButton type="submit" label="ثبت درخواست" variant="primary" fullWidth />
      </div>
    </form>

    <SuccessToast v-model:visible="toastVisible" message="درخواست کارت سرویس با موفقیت ارسال شد" />
  </section>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import SuccessToast from '@/components/common/SuccessToast.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
  month: '',
  desc: '',
})
const monthOptions = [
  { key: 'فروردین', label: 'فروردین' },
  { key: 'اردیبهشت', label: 'اردیبهشت' },
  { key: 'خرداد', label: 'خرداد' },
  { key: 'tir', label: 'تیر' },
  { key: 'مرداد', label: 'مرداد' },
  { key: 'شهریور', label: 'شهریور' },
  { key: 'مهر', label: 'مهر' },
  { key: 'آبان', label: 'آبان' },
  { key: 'آذر', label: 'آذر' },
  { key: 'دی', label: 'دی' },
  { key: 'بهمن', label: 'بهمن' },
  { key: 'اسفند', label: 'اسفند' },
]
const toastVisible = ref(false)

function handleSubmit() {
  if (!form.month || !form.desc.trim()) {
    alert('لطفاً تمام فیلدها را تکمیل کنید.')
    return
  }

  const newRequest = {
    id: Date.now(),
    month: form.month,
    desc: form.desc.trim(),
    status: 'پذیرفته شده',
    date: new Date().toLocaleDateString('fa-IR'),
  }

  const saved = JSON.parse(localStorage.getItem('serviceCardRequests') || '[]')
  saved.unshift(newRequest)
  localStorage.setItem('serviceCardRequests', JSON.stringify(saved))

  toastVisible.value = true

  setTimeout(() => {
    router.push({ name: 'service-card-fill', query: { reload: true } })
  }, 1500)

  form.month = ''
  form.desc = ''
}
</script>

<style scoped></style>

<template>
  <section class="px-4 pt-6 pb-16 space-y-4 min-h-[100svh]">
    <h2 class="text-sm font-bold text-gray-900 flex items-center gap-1">
      <span class="text-brand-red font-bold text-lg">•</span>
      فرم زیر را به جهت درخواست گواهی اشتغال تکمیل نمایید
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseField
        v-model="selectedType"
        label="درخواست گواهی اشتغال به"
        type="select"
        :options="[
          { key: 'bank', label: 'بانک' },
          { key: 'other', label: 'سایر' },
        ]"
        placeholder="انتخاب کنید"
      />

      <template v-if="selectedType === 'bank'">
        <BaseField v-model="bankName" label="نام بانک" placeholder="نام بانک را وارد کنید" />
        <BaseField v-model="branchCode" label="کد شعبه" placeholder="کد شعبه را وارد کنید" />
        <BaseField v-model="bankCode" label="کد بانک" placeholder="کد بانک را وارد کنید" />
      </template>

      <template v-if="selectedType === 'other'">
        <BaseField
          v-model="organization"
          label="نام کامل شرکت/ارگان"
          placeholder="نام شرکت یا ارگان را وارد کنید"
        />
      </template>

      <BaseField
        v-model="description"
        label="علت درخواست خود را شرح دهید"
        type="textarea"
        placeholder="توضیحات خود را وارد کنید"
      />

      <footer class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4 bg-white">
        <BaseButton type="submit" label="ثبت درخواست" color="brand-red" class="w-full" />
      </footer>
    </form>
  </section>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['update-header'])

const selectedType = ref('')
const bankName = ref('')
const branchCode = ref('')
const bankCode = ref('')
const organization = ref('')
const description = ref('')

// آپدیت دکمه هدر
watch(selectedType, (val) => {
  if (val === 'bank') emit('update-header', 'ثبت درخواست گواهی اشتغال جهت ارائه به بانک')
  else if (val === 'other')
    emit('update-header', 'ثبت درخواست گواهی اشتغال جهت ارائه به سایر ارگان‌ها')
  else emit('update-header', 'ثبت درخواست')
})

function handleSubmit() {
  const newRequest = {
    id: Date.now(),
    date: new Date().toLocaleDateString('fa-IR'),
    month: new Date().toLocaleDateString('fa-IR', { month: 'long' }),
    status: 'در حال بررسی',
    selectedType: selectedType.value,
    bankName: bankName.value.trim(),
    branchCode: branchCode.value.trim(),
    bankCode: bankCode.value.trim(),
    organization: organization.value.trim(),
    description: description.value.trim(),
  }

  const existing = JSON.parse(localStorage.getItem('employmentRequests') || '[]')
  existing.push(newRequest)
  localStorage.setItem('employmentRequests', JSON.stringify(existing))
  router.push({ name: 'employment-container' })
}
</script>

<style scoped></style>

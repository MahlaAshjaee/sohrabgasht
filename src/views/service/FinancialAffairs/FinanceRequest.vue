<template>
  <section class="px-4 pt-6 pb-16 space-y-4">
    <h2 class="text-sm font-bold text-gray-900 flex items-center gap-1">
      <span class="text-red-600 text-lg">•</span>
      فرم زیر را جهت درخواست مساعده تکمیل نمایید
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseField
        id="amount"
        label="مبلغ مورد نظر (تومان)"
        type="text"
        v-model="displayAmount"
        placeholder="مبلغ مورد درخواست خود را وارد کنید"
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
      <InfoBox
        title="نکات مهم قبل از درخواست"
        :items="[
          'مبلغ درخواست حداکثر تا ۳۰٪ کارکرد ماهانه قابل قبول است.',
          'مبلغ مساعده پس از واریز از کارکرد همان ماه کسر می‌شود.',
          'مساعده فقط به حساب بانکی ثبت‌شده در پروفایل راننده واریز خواهد شد.',
        ]"
      />
      <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
        <BaseButton type="submit" label="ثبت درخواست" variant="primary" fullWidth />
      </div>
    </form>
    <SuccessToast v-model:visible="toastVisible" message="درخواست شما با موفقیت ارسال شد" />
  </section>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import SuccessToast from '@/components/common/SuccessToast.vue'
import InfoBox from '@/components/service/FinanceRequest/InfoBox.vue'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const emits = defineEmits(['submit-request'])

const form = reactive({ amount: '', desc: '' })
const toastVisible = ref(false)
const displayAmount = ref('')
watch(displayAmount, (val) => {
  const raw = val.replace(/[^\d]/g, '')
  form.amount = raw

  displayAmount.value = raw.replace(/\B(?=(\d{3})+(?!\d))/g, '،')
})

function handleSubmit() {
  const newReq = {
    status: 'پذیرفته شده',
    amount: Number(form.amount),
    date: new Date().toLocaleDateString('fa-IR'),
    desc: form.desc.trim(),
  }

  const saved = JSON.parse(localStorage.getItem('financeRequests') || '[]')
  saved.unshift(newReq)
  localStorage.setItem('financeRequests', JSON.stringify(saved))

  toastVisible.value = true
  setTimeout(() => {
    router.push({ name: 'financial-fill' })
  }, 1500)

  form.amount = ''
  displayAmount.value = ''
  form.desc = ''
}
</script>

<style scoped></style>

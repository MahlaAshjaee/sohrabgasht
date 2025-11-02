<template>
  <form class="px-4 py-6 space-y-6" @submit.prevent="submitRequest">
    <p class="text-gray-700 leading-relaxed">
      <span class="text-brand-red font-bold text-2xl">.</span>
      فرم زیر را جهت درخواست طرح ترافیک تکمیل نمایید
    </p>

    <div v-for="(d, idx) in dates" :key="idx" class="space-y-2">
      <label class="block text-sm text-gray-700 mb-1">تاریخ</label>
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="openCalendar(idx)"
          class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 w-full text-sm"
        >
          <span class="text-gray-500">
            {{ dates[idx] || 'تاریخ را انتخاب کنید' }}
          </span>
          <BaseIcon src="calendar" />
        </button>

        <button
          v-if="idx > 0"
          type="button"
          @click.stop="removeDate(idx)"
          class="text-gray-400 active:scale-95"
        >
          <BaseIcon src="trash" />
        </button>
      </div>
    </div>

    <button
      type="button"
      @click="addDate"
      class="flex items-center text-brand-red-dark text-sm font-medium gap-1 active:scale-95 transition-transform"
    >
      <span class="text-xl">+</span>
      <span>افزودن تاریخ</span>
    </button>

    <BaseField
      v-model="description"
      type="textarea"
      label="علت درخواست خود را شرح دهید"
      placeholder="توضیحات خود را وارد کنید"
    />

    <div class="fixed bottom-0 max-w-md mx-auto left-0 right-0 px-5 py-4 bg-white border-gray-100">
      <BaseButton label="ثبت درخواست" variant="primary" fullWidth type="submit" />
    </div>
    <BaseBottomSheet :visible="calendarMode" @close="closeCalendar">
      <div class="p-4 space-y-4">
        <p class="text-right text-sm font-medium text-gray-700 mb-2">
          تاریخ مورد نظر را انتخاب کنید
        </p>

        <Vue3PersianDatetimePicker
          v-model="tempDate"
          color="var(--brand-red)"
          format="jYYYY/jMM/jDD"
          locale="fa"
          type="date"
          :input="false"
          :auto="false"
          :teleport="false"
          :inline="true"
        />
        <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
          <BaseButton
            label="ثبت تاریخ"
            variant="primary"
            fullWidth
            class="mt-5"
            @click="applyCalendar"
          />
        </div>
      </div>
    </BaseBottomSheet>
    <SuccessToast v-model:visible="toastVisible" message="درخواست شما با موفقیت ارسال شد" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseField from '@/components/common/BaseField.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import SuccessToast from '@/components/common/SuccessToast.vue'
import BaseBottomSheet from '@/components/service/BaseBottomSheet.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'
const toastVisible = ref(false)

const dates = ref([''])
const description = ref('')
const router = useRouter()

const calendarMode = ref(false)
const activeField = ref(null)
const tempDate = ref('')

const openCalendar = (idx) => {
  activeField.value = idx
  tempDate.value = dates.value[idx] || ''
  calendarMode.value = true
}
const closeCalendar = () => {
  calendarMode.value = false
  activeField.value = null
}
const applyCalendar = () => {
  if (activeField.value !== null) {
    dates.value[activeField.value] = tempDate.value
  }
  closeCalendar()
}
const addDate = () => dates.value.push('')
const removeDate = (idx) => dates.value.splice(idx, 1)

const submitRequest = () => {
  toastVisible.value = true
  setTimeout(() => {
    router.push({
      name: 'traffic-plan-list',
      query: {
        dates: JSON.stringify(dates.value),
        description: description.value,
      },
    })
  }, 1500)

  description.value = ''
  dates.value = ['']
}
</script>
<style>
.finance-datepicker-sheet .vpd-is-selected,
.finance-datepicker-sheet .selected-day {
  background-color: var(--brand-red) !important;
  color: #fff !important;
  border-radius: 8px;
}
.vpd-header {
  display: none !important;
}
span.vpd-input-group input {
  display: none;
}

.vpd-day.vpd-selected span.vpd-day-text {
  background: rgb(206, 17, 17);
  padding: 6px 8px;
  border-radius: 55%;
}
</style>

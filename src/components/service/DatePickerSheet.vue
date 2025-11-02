<template>
  <BaseBottomSheet :visible="visible" @close="handleClose">
    <h2 class="text-center text-gray-900 font-semibold my-4">تاریخ مورد نظر را انتخاب کنید</h2>
    <div v-show="!calendarMode" class="space-y-5">
      <div class="px-5">
        <label class="block text-sm text-gray-700 mb-1">از تاریخ</label>
        <button
          @click="openCalendar('from')"
          class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 w-full"
        >
          <div class="flex items-center gap-2 text-sm">
            <BaseIcon src="calendar" />
            <span class="text-gray-500">
              {{ selected.from || 'تاریخ را انتخاب کنید' }}
            </span>
          </div>
        </button>
      </div>

      <div class="px-5 pb-20">
        <label class="block text-sm text-gray-700 mb-1">تا تاریخ</label>
        <button
          @click="openCalendar('to')"
          class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 w-full"
        >
          <div class="flex items-center gap-2 text-sm">
            <BaseIcon src="calendar" />
            <span class="text-gray-500">
              {{ selected.to || 'تاریخ را انتخاب کنید' }}
            </span>
          </div>
        </button>
      </div>
      <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
        <BaseButton label="ثبت تاریخ" variant="primary" @click="submitDate" fullWidth />
      </div>
    </div>

    <!-- حالت دوم: تقویم -->
    <div v-if="calendarMode && activeField" class="finance-datepicker-sheet px-4">
      <div
        class="calendar-card bg-white border border-gray-200 rounded-xl p-2 shadow-sm overflow-y-auto mb-20"
      >
        <Vue3PersianDatetimePicker
          ref="calendarPickerRef"
          v-model="dateModel[activeField]"
          color="var(--brand-red)"
          format="jYYYY/jMM/jDD"
          locale="fa"
          type="date"
          :input="false"
          :auto="false"
          :custom-input="false"
          :teleport="false"
          :inline="true"
        />
      </div>
      <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
        <BaseButton label="ثبت تاریخ" @click="applyCalendar" />
      </div>
    </div>
  </BaseBottomSheet>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import BaseBottomSheet from '@/components/service/BaseBottomSheet.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import BaseIcon from '@/components/common/BaseIcon.vue'

const props = defineProps({ visible: Boolean })
const emits = defineEmits(['close', 'submit'])

const selected = ref({ from: null, to: null })
const dateModel = ref({ from: null, to: null })
const calendarMode = ref(false)
const activeField = ref(null)
const calendarPickerRef = ref(null)

const handleClose = () => {
  emits('close')
}
const openCalendar = (field) => {
  activeField.value = field
  calendarMode.value = true
  nextTick(() => {
    calendarPickerRef.value?.$forceUpdate?.()
  }, 200)
}

const applyCalendar = () => {
  if (!dateModel.value[activeField.value]) return
  selected.value[activeField.value] = dateModel.value[activeField.value]
  activeField.value = null
  calendarMode.value = false
}

const submitDate = () => {
  selected.value = {
    from: dateModel.value.from || selected.value.from,
    to: dateModel.value.to || selected.value.to,
  }
  emits('submit', selected.value)
  emits('close')
}
watch(
  dateModel,
  (newVal) => {
    if (activeField.value && newVal[activeField.value]) {
      selected.value[activeField.value] = newVal[activeField.value]
    }
  },
  { deep: true },
)
</script>

<style>
.finance-datepicker-sheet ::deep(.vpd-body) {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  border: none !important;
}

.finance-datepicker-sheet ::deep(.vpd-calendar) {
  border-radius: 12px;
  font-family: var(--font-iransans);
  background: #fff;
}

.finance-datepicker-sheet ::deep(.vpd-input-group) {
  display: none !important;
}

.finance-datepicker-sheet .vpd-header {
  color: #1d1d1d !important;
  font-weight: 600;
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

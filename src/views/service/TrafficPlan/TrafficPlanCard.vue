<template>
  <section
    class="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100 transition hover:shadow-md"
  >
    <div class="flex justify-between items-center mb-8">
      <span class="text-sm font-medium text-gray-900"> درخواست خرید طرح ترافیک </span>

      <span
        :class="useStatusColor(status)"
        class="text-xs font-normal text-center w-24 py-1 rounded-2xl"
      >
        {{ status || 'در حال بررسی' }}
      </span>
    </div>

    <div class="flex justify-between items-end">
      <div class="text-sm text-gray-700">
        <p>تاریخ: {{ date }}</p>
      </div>

      <button
        v-if="status === 'پذیرفته شده' || status === 'رد شده'"
        class="flex items-center text-brand-red-dark font-medium text-sm gap-1 active:scale-95 transition-transform"
        @click="$emit('show-detail')"
      >
        <span>مشاهده نتیجه</span>
        <BaseIcon src="arrow-left" />
      </button>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../../../components/common/BaseIcon.vue'

const props = defineProps({
  id: Number,
  date: String,
  status: String,
})

const statusClasses = {
  'در حال بررسی': 'bg-yellow-100 text-yellow-600 border border-yellow-300',
  'پذیرفته شده': 'bg-green-100 text-green-600 border border-green-300',
  'رد شده': 'bg-red-100 text-red-600 border border-red-300',
}

const useStatusColor = (status) =>
  statusClasses[status] || 'bg-gray-100 text-gray-600 border border-gray-300'
</script>

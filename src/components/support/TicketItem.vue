<template>
  <article
    @click="$emit('open')"
    class="bg-gray-100 rounded-xl px-4 py-3 shadow-sm flex flex-col space-y-4 active:scale-[0.98] transition-transform cursor-pointer"
    dir="rtl"
  >
    <div class="text-sm font-bold text-gray-800 leading-relaxed line-clamp-2">
      {{ title }}
    </div>

    <div class="text-xs font-medium text-gray-500">تاریخ: {{ date }}</div>

    <div class="flex justify-between items-center mt-1">
      <span :class="['px-4 py-1 rounded-full text-xs font-medium', statusColorClass]">
        {{ status }}
      </span>

      <div class="flex items-center text-sm font-medium text-brand-red cursor-pointer">
        <span>جزئیات</span>
        <BaseIcon src="arrowLeft" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import BaseIcon from '../common/BaseIcon.vue'

const props = defineProps({
  id: { type: [Number, String], required: false },
  title: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
})

const statusColorClass = computed(() => {
  switch (props.status) {
    case 'در حال انتظار':
      return 'bg-orange-50 text-orange-600 border border-orange-200'
    case 'پاسخ داده شده':
      return 'bg-green-50 text-green-600 border border-green-200'
    case 'بسته شده':
      return 'bg-red-600 text-white border border-red-500'
    default:
      return 'bg-gray-50 text-grey-500 border border-gray-200'
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

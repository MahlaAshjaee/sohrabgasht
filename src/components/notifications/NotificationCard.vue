<template>
  <article class="bg-white rounded-lg shadow-xl p-4 mb-5 flex items-start">
    <BaseIcon src="vector" />
    <div class="flex-1 ml-3">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-sm text-gray-800 mr-2">{{ title }}</h3>
        <span v-if="isNew" class="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full">
          جدید
        </span>
      </div>
      <div class="text-xs font-medium text-gray-600 my-3">تاریخ: {{ date }}</div>

      <p class="text-gray-600 font-medium text-sm mt-1 leading-6">
        {{ description }}
      </p>
    </div>
  </article>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'

defineProps({
  title: String,
  description: String,
  date: String,
  isNew: Boolean,
})
</script>

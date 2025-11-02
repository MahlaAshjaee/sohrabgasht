<template>
  <div class="bg-gray-100 flex justify-between rounded-xl p-4">
    <div class="flex items-center relative">
      <BaseIcon src="whatsapp" class="absolute -right-11" />
      <span class="text-sm text-gray-700 font-medium mr-9">شماره واتساپ پشتیبانی:</span>
    </div>
    <div class="flex items-center text-sm font-medium text-gray-900">
      {{ phoneNumber }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const phoneNumber = ref('---')

onMounted(async () => {
  try {
    phoneNumber.value = '09113894304'
  } catch (err) {
    phoneNumber.value = 'اتصال برقرار نیست'
  }
})
</script>

<style scoped></style>

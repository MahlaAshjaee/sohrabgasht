<template>
  <div
    class="flex flex-col mt-32 justify-center items-center flex-grow text-gray-500 text-center"
    dir="rtl"
  >
    <BaseIcon src="FileIcon" />
    <p class="text-sm font-medium mt-3">{{ message }}</p>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'

const props = defineProps({
  message: {
    type: String,
    default: 'فعلاً درخواستی ثبت نکرده‌اید',
  },
})
</script>

<style scoped>
.text-gray-500 {
  direction: rtl;
}
</style>

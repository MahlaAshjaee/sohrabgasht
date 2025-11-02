<template>
  <div class="flex flex-col items-center justify-center py-20 text-gray-500">
    <BaseIcon src="FileIcon" />
    <p class="text-sm font-medium mt-4">در حال بررسی وضعیت درخواست‌ها...</p>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const hasData = true 

  await new Promise(resolve => setTimeout(resolve, 1200))

  if (hasData) {
    router.replace({ name: 'financial-fill' })
  } else {
    router.replace({ name: 'financial-affairs' })
  }
})
</script>

<style scoped>
.text-gray-500 {
  direction: rtl;
  text-align: center;
}
</style>

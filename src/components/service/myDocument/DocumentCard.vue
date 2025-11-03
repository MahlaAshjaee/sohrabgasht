<template>
  <div class="p-4 space-y-4">
    <div v-if="front || back" class="space-y-3">
      <div
        v-for="(imgSrc, idx) in [front, back].filter(Boolean)"
        :key="idx"
        class="relative rounded-lg border overflow-hidden"
      >
        <BaseIcon :src="imgSrc" classes="w-full object-cover" />
        <div
          v-if="statusText"
          :class="[
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] font-medium px-4 py-1 rounded-full shadow backdrop-blur-sm bg-opacity-85',
            statusClass,
          ]"
        >
          {{ statusText }}
        </div>
      </div>
    </div>

    <div
      v-if="status === 'empty' || status === 'rejected' || status === 'expired'"
      class="space-y-3"
    >
      <p v-if="message" class="text-sm text-gray-800 flex items-start gap-1">
        <span class="mt-1.5 w-2 h-2 bg-brand-red rounded-full inline-block"></span>
        {{ message }}
      </p>

      <DocumentDropzone @upload="handleFileChange" />
    </div>

    <p v-else-if="message" class="text-sm text-red-600 leading-relaxed flex items-start gap-1">
      <span class="mt-1.5 w-2 h-2 bg-red-600 rounded-full inline-block"></span>
      {{ message }}
    </p>

    <p v-if="date" class="text-xs text-gray-500">آخرین بروزرسانی: {{ date }}</p>

    <div v-if="showRetry" class="fixed bottom-0 left-0 right-0 px-5 py-4 max-w-md mx-auto">
      <BaseButton
        label="ثبت درخواست تغییر"
        variant="primary"
        fullWidth
        @click="$emit('retry', key)"
      />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '../../common/BaseIcon.vue'
import DocumentDropzone from '@/components/service/myDocument/DocumentDropzone.vue'
import { computed } from 'vue'

const props = defineProps({
  key: String,
  title: String,
  front: String,
  back: String,
  status: String,
  message: String,
  date: String,
})

const statusText = computed(() => {
  const map = {
    underReview: 'در حال بررسی',
    rejected: 'رد شده',
    expired: 'منقضی شده',
    warning: 'در حال انقضا',
  }
  return map[props.status] || ''
})

const statusClass = computed(() => {
  const map = {
    underReview: 'bg-yellow-50 text-yellow-700 border border-yellow-300',
    rejected: 'bg-red-50 text-red-700 border border-red-300',
    expired: 'bg-gray-100 text-gray-700 border border-gray-300',
    warning: 'bg-orange-50 text-orange-700 border border-orange-300',
  }
  return map[props.status] || 'bg-gray-50 text-gray-600 border border-gray-300'
})

const showRetry = computed(() => props.status === 'rejected' || props.status === 'expired')

function handleFileChange(file) {
  if (!file) return
}
</script>

<style scoped>
img {
  aspect-ratio: 3 / 2;
}
</style>

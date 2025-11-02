<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-xl w-[90%] max-w-md p-6 text-center shadow-lg">
      <div class="mx-auto mb-4">
        <BaseIcon src="icon-info" />
      </div>

      <h2 class="text-base font-semibold text-gray-900 mb-3">{{ title }}</h2>

      <p class="text-sm leading-6 text-gray-600 mb-6 px-2">
        {{ message }}
      </p>

      <button
        class="w-full bg-brand-red text-white font-medium py-3 rounded-lg active:scale-[0.98] transition"
        @click="$emit('close')"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  buttonText: { type: String, default: 'متوجه شدم' },
})
</script>

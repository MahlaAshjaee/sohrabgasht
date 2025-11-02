<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
  >
    <div
      class="bg-white w-10/12 max-w-md rounded-lg shadow-lg p-7 text-center space-y-5 animate-fade"
    >
      <div class="flex justify-center">
        <img :src="status === 'success' ? successIcon : errorIcon" :alt="status" class="mx-auto" />
      </div>

      <h2
        class="font-semibold text-gray-800 text-base"
        :class="status === 'success' ? 'text-green-700' : 'text-red-700'"
      >
        {{ status === 'success' ? 'درخواست شما با موفقیت ثبت شد' : 'درخواست رد شده است' }}
      </h2>

      <p class="text-sm text-gray-600 leading-relaxed">
        {{
          status === 'success'
            ? 'نتیجه درخواست شما بعد از بررسی کارشناسان در بخش اعلانات به شما اطلاع‌رسانی می‌شود'
            : 'توضیحات مربوط به علت رد درخواست از طریق بخش اعلانات اطلاع‌رسانی می‌شود'
        }}
      </p>

      <BaseButton label="متوجه شدم" variant="primary" fullWidth @click="closeDialog" />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  status: { type: String, default: 'success' },
  visible: { type: Boolean, default: false },
})

const successIcon = new URL('@/assets/img/success.svg', import.meta.url).href
const errorIcon = new URL('@/assets/img/error.svg', import.meta.url).href

const emit = defineEmits(['close'])
const closeDialog = () => emit('close')
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

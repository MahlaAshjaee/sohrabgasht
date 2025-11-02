<template>
  <transition name="slide-down" dir="ltr">
    <div
      v-if="visible"
      class="fixed top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-[90%] max-w-md flex flex-row-reverse z-[9999]"
      dir="rtl"
    >
      <div class="flex items-center justify-center bg-green-50 w-20 py-4 px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-7 h-7"
        >
          <path d="M22 11.08V12a10 10 0 1 1-10-10 10.09 10.09 0 0 1 9 5.05" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div class="flex flex-col justify-center px-4 py-3 text-right w-full">
        <span class="font-bold text-black mb-1 text-sm">موفق</span>
        <span class="text-gray-700 text-xs">{{ message }}</span>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-[3px] bg-green-600 progress-bar"></div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: 'عملیات با موفقیت انجام شد' },
  duration: { type: Number, default: 3500 },
})

const emit = defineEmits(['update:visible'])

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      setTimeout(() => emit('update:visible', false), props.duration)
    }
  },
)
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.progress-bar {
  animation: fillProgress var(--duration, 1.5s) linear forwards;
}
@keyframes fillProgress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>

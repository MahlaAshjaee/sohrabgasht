<template>
  <transition name="bottom-sheet">
    <div v-if="visible" class="fixed inset-0 flex items-end justify-center z-[100]">
      <div class="absolute inset-0 flex justify-center bg-transparent">
        <div class="w-full max-w-md bg-black/40 backdrop-blur-sm"></div>
      </div>

      <div
        class="relative bg-white rounded-t-2xl w-full max-w-md mx-auto overflow-y-auto p-4 shadow-lg transform transition-transform duration-300 ease-out"
        :style="{ transform: `translateY(${translateY}px)` }"
        @touchstart="handleStart"
        @touchmove.prevent="handleMove"
        @touchend="handleEnd"
        @mousedown="handleMouseStart"
      >
        <div class="flex justify-center mb-3 cursor-grab active:cursor-grabbing select-none">
          <div class="h-1.5 w-16 rounded-full bg-gray-300"></div>
        </div>

        <h2 class="text-sm font-bold mt-8 mb-5 text-start">ایستگاه‌های {{ title }}</h2>

        <div class="space-y-3 overflow-y-auto max-h-[85vh] pb-10">
          <StationCard
            v-for="station in stations"
            :key="station.id"
            :station-id="station.id"
            :service-id="serviceId"
            :name="station.name"
            :address="station.address"
            :passengerCount="station.passengerCount"
            :time="station.time"
            :serviceDays="station.serviceDays"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import StationCard from '@/components/service/myServices/StationCard.vue'

const props = defineProps({
  title: { type: String, required: true },
  stations: { type: Array, required: true },
})
const emit = defineEmits(['close'])

const visible = ref(true)
const translateY = ref(0)
const startY = ref(0)

function handleStart(e) {
  startY.value = e.touches[0].clientY
}
function handleMove(e) {
  const deltaY = e.touches[0].clientY - startY.value
  if (deltaY > 0) translateY.value = Math.min(deltaY, 200)
}
function handleEnd() {
  if (translateY.value > 100) {
    visible.value = false
    setTimeout(() => emit('close'), 300)
  } else translateY.value = 0
}

function handleMouseStart(e) {
  let start = e.clientY
  const move = (ev) => {
    const delta = ev.clientY - start
    if (delta > 0) translateY.value = Math.min(delta, 200)
  }
  const up = () => {
    if (translateY.value > 100) {
      visible.value = false
      setTimeout(() => emit('close'), 300)
    } else translateY.value = 0
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}
</script>

<style scoped>
.bottom-sheet-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.bottom-sheet-enter-active {
  transition: all 0.3s ease-out;
}
.bottom-sheet-enter-to {
  opacity: 1;
  transform: translateY(0%);
}

.bottom-sheet-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
.bottom-sheet-leave-active {
  transition: all 0.3s ease-in;
}
.bottom-sheet-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

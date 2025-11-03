<template>
  <teleport to="body">
    <div
      v-show="visible"
      class="fixed inset-x-0 bottom-0 z-50 flex justify-center transition-opacity duration-300"
      @click.self="close"
    >
      <div
        ref="sheet"
        class="w-full max-w-md bg-white rounded-t-2xl p-4 shadow-lg transform transition-transform duration-300"
        :style="{ translate: `0 ${translateY}px` }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <div class="h-1 w-28 bg-gray-300 rounded-full mx-auto mb-7"></div>

        <div
          v-for="n in 3"
          :key="n"
          class="flex flex-col text-sm p-4 border rounded-lg my-3 border-gray-300 bg-gray-50 gap-5"
        >
          <span class="font-medium text-sm">مصطفی رضایی</span>
          <div class="flex justify-between items-center">
            <span class="flex items-center gap-2">
              <BaseIcon src="call" />
              09113234455
            </span>
            <span
              class="text-brand-red cursor-pointer font-bold text-sm active:scale-95 transition"
            >
              تماس
            </span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import BaseIcon from '../../common/BaseIcon.vue'
import { ref } from 'vue'

const emit = defineEmits(['close'])
const visible = ref(true)
const translateY = ref(0)
let startY = 0
let dragging = false

function close() {
  visible.value = false
  setTimeout(() => emit('close'), 300)
}

function startDrag(e) {
  dragging = true
  startY = e.touches ? e.touches[0].clientY : e.clientY
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', endDrag)
}

function onDrag(e) {
  if (!dragging) return
  const currentY = e.touches ? e.touches[0].clientY : e.clientY
  const diff = currentY - startY
  if (diff > 0 && diff < 200) translateY.value = diff
  if (diff >= 170) close()
}

function endDrag() {
  dragging = false
  translateY.value = 0
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
}
</script>

<style scoped>
div[ref='sheet'] {
  touch-action: none;
}
</style>

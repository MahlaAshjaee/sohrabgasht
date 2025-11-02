<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="fixed inset-0 z-40 bg-black/50 max-w-md m-auto flex items-end justify-center"
      @click.self="close"
    ></div>
  </transition>

  <transition name="bottom-sheet">
    <div
      v-show="visible"
      ref="sheet"
      class="fixed inset-x-0 bottom-0 z-50 w-full bg-white rounded-t-3xl shadow-lg touch-none max-w-md m-auto"
      :style="sheetStyle"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="w-28 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-2"></div>
      <div class="max-h-[85vh] overflow-y-auto mb-20">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close'])
const observer = ref(null)
onMounted(() => {
  // وقتی محتوای sheet تغییر کرد، ارتفاع را تنظیم کن
  observer.value = new MutationObserver(() => {
    if (sheet.value && state.value !== 'expanded') {
      contentHeight.value = `${sheet.value.scrollHeight}px`
    }
  })
  if (sheet.value) observer.value.observe(sheet.value, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (observer.value) observer.value.disconnect()
})

const sheet = ref(null)
const offsetY = ref(0)
let startY = 0
let dragging = false
const state = ref('normal')
const contentHeight = ref('auto')

function close() {
  emit('close')
}

watch(
  () => props.visible,
  async (v) => {
    if (v) {
      state.value = 'normal'
      offsetY.value = 0
      await nextTick()
      if (sheet.value) {
        contentHeight.value = `${sheet.value.scrollHeight}px`
      }
    }
  },
)

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
  offsetY.value = Math.min(Math.max(diff, -300), 250)
}

function endDrag() {
  dragging = false

  if (offsetY.value > 100) close()
  else if (offsetY.value < -120) state.value = 'expanded'
  else if (state.value === 'expanded' && offsetY.value > 80) state.value = 'normal'
  offsetY.value = 0

  if (sheet.value) contentHeight.value = `${sheet.value.scrollHeight}px`

  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
}

onBeforeUnmount(() => endDrag())

const sheetStyle = computed(() => ({
  transform: state.value === 'expanded' ? 'translateY(0)' : `translateY(${offsetY.value}px)`,
  height: state.value === 'expanded' ? '100vh' : contentHeight.value,
  transition: dragging ? 'none' : 'transform 0.25s ease, height 0.25s ease',
  borderRadius: state.value === 'expanded' ? '0' : '1rem 1rem 0 0',
}))
</script>

<style scoped>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
span.vpd-input-group input {
  display: none;
}
</style>

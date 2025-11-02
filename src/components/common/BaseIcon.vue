<template>
  <img v-if="resolvedSrc" :src="resolvedSrc" :alt="resolvedAlt" :class="classes" loading="lazy" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: [String, Object], required: true }, // می‌تونه import یا URL باشه
  alt: { type: String, default: '' },
  classes: { type: String, default: '' },
  ext: { type: String, default: 'svg' },
})

const basePath = '/src/assets/img/'

const resolvedSrc = computed(() => {
  if (!props.src) return ''

  const val = String(props.src)

  if (
    val.startsWith('http') ||
    val.startsWith('/src/') ||
    val.startsWith('/assets/') ||
    val.includes('blob:')
  ) {
    return val
  }

  try {
    return new URL(`${basePath}${props.src}.${props.ext}`, import.meta.url).href
  } catch {
    console.warn(`[BaseImage] File not found: ${props.src}.${props.ext}`)
    return ''
  }
})

const resolvedAlt = computed(() => props.alt || props.src)
</script>

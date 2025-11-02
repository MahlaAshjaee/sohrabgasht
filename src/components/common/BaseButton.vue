<template>
  <button
    :type="type"
    :class="[
      'font-medium text-sm rounded-md py-3 mt-4 transition w-full text-white',
      variantClass,
      fullWidth ? 'w-full' : '',
      disabled ? 'bg-gray-500 cursor-not-allowed' : '',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  label: { type: String, required: true },
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  fullWidth: Boolean,
})
const variantClass = computed(() => {
  return {
    primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800',
    outline: 'border border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
  }[props.variant]
})

function handleClick(e) {
  if (props.type === 'submit' || props.disabled) return
  emit('click', e)
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="flex gap-3 justify-center w-full" dir="ltr">
    <input
      v-for="(digit, index) in internalValue"
      :key="index"
      :name="`otp-${index}`"
      :ref="
        (el) => {
          inputs[index] = el
        }
      "
      type="tel"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="1"
      class="w-12 h-12 rounded-[12px] bg-gray-100 text-center text-lg font-bold focus:bg-gray-200 outline-none"
      v-model="internalValue[index]"
      @input="onInput(index)"
      @keydown.backspace="onBackspace(index, $event)"
    />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, nextTick } from 'vue'

const props = defineProps({
  length: { type: Number, default: 5 },
  modelValue: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue', 'complete'])

const internalValue = ref(Array(props.length).fill(''))
let inputs = []

watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val) && val.length === props.length) {
      const newValStr = val.join('')
      const currentValStr = internalValue.value.join('')
      if (newValStr !== currentValStr) {
        internalValue.value = [...val]
      }
    }
  },
)

watch(
  internalValue,
  (val) => {
    const trimmed = val.map((v) => v?.toString().trim())
    if (trimmed.join('') !== props.modelValue.join('')) {
      emit('update:modelValue', trimmed)
    }
    emit(
      'complete',
      trimmed.every((v) => v.length === 1),
    )
  },
  { deep: true },
)

const onInput = (index) => {
  const value = internalValue.value[index]?.trim()
  if (value.length === 1) {
    const emptyIndex = internalValue.value.findIndex((v, idx) => v === '' && idx > index)
    if (emptyIndex !== -1) {
      nextTick(() => inputs[emptyIndex]?.focus())
    } else if (index < props.length - 1) {
      nextTick(() => inputs[index + 1]?.focus())
    }
  } else if (value.length > 1) {
    internalValue.value[index] = value[0]
  }
}

const onBackspace = (index, event) => {
  if (!internalValue.value[index] && index > 0 && event.key === 'Backspace') {
    nextTick(() => inputs[index - 1]?.focus())
  }
}

const focusFirstEmpty = () => {
  const emptyIndex = internalValue.value.findIndex((v) => v === '')
  if (emptyIndex !== -1) {
    nextTick(() => inputs[emptyIndex]?.focus())
  }
}

defineExpose({ focusFirstEmpty })
</script>

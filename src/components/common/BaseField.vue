<template>
  <div class="w-full space-y-1.5">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div v-if="type === 'select'" class="rounded-lg border border-gray-300 bg-gray-50 px-4">
      <select
        :id="id"
        :name="name"
        :required="required"
        :value="internalValue"
        @change="(e) => emit('update:modelValue', e.target.value)"
        class="w-full h-12 text-right text-sm bg-gray-50 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-0"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.key ?? option" :value="option.key ?? option">
          {{ option.label ?? option }}
        </option>
      </select>
    </div>

    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="internalValue"
      @input="handleInput"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 my-1 py-2 text-right text-sm placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-0 min-h-[90px] resize-none"
    ></textarea>
    <input
      v-else
      :id="id"
      :type="type"
      :name="name"
      :inputmode="inputmode"
      :placeholder="placeholder"
      :required="required"
      :value="internalValue"
      @input="handleInput"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 my-1 h-12 text-right text-sm placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-0"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  name: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  inputmode: String,
  required: { type: Boolean, default: false },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const internalValue = computed(() => props.modelValue)
const handleInput = (e) => {
  let val = e.target.value

  if (props.type === 'number') {
    val = val.trim() === '' ? '' : Number(val)
  } else if (props.type !== 'textarea') {
    val = val.trimStart()
  }

  emit('update:modelValue', val)
}
</script>

<style scoped>
input,
textarea {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: var(--brand-red, #d32f2f);
  box-shadow: 0 0 0 1px var(--brand-red, #d32f2f);
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}
</style>

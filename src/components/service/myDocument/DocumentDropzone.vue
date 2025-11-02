<template>
  <label
    class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-8 text-center cursor-pointer transition hover:border-brand-red/70"
  >
    <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
    <span class="text-gray-500 text-sm">
      {{ textBefore }}
      <span class="text-brand-red font-medium">{{ textAction }}</span>
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  textBefore: {
    type: String,
    default: 'فایل مورد نظر را به اینجا بکشید یا',
  },
  textAction: {
    type: String,
    default: 'انتخاب فایل',
  },
})

const emit = defineEmits(['upload'])

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  emit('upload', file)
}
</script>

<style scoped>
</style>

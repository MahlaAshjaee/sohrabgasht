<template>
  <h2 class="text-lg font-extrabold pb-8 text-right w-full">
    {{ title }}
  </h2>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

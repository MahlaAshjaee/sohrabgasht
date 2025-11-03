<template>
  <div class="border border-red-200 rounded-lg p-3 bg-red-50 mb-20" role="alert">
    <div class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-5 mt-2">
      <BaseIcon src="!" />
      {{ title }}
    </div>

    <ul class="space-y-2 text-sm leading-8 text-gray-700 rtl">
      <li v-for="(item, i) in items" :key="i" class="flex items-start gap-1">
        <span class="mt-1">
          <BaseIcon src="tick" />
        </span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import BaseIcon from '../../common/BaseIcon.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'نکات مهم',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.rtl {
  direction: rtl;
}
</style>

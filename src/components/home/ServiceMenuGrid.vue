<template>
  <section class="w-full px-2 my-6 pb-24 flex flex-1 overflow-y-auto">
    <div class="grid grid-cols-2 gap-4 border-2 border-gray-100 rounded-2xl p-4 w-full">
      <RouterLink
        v-for="item in items"
        :key="item.label"
        :to="item.route"
        class="bg-gray-100 rounded-xl p-3 flex flex-col items-center cursor-pointer transition-colors duration-200 hover:bg-gray-200"
      >
        <img :src="item.icon" alt="" class="mb-3" />
        <span class="text-sm font-medium text-gray-700">{{ item.label }}</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import BaseIcon from '../common/BaseIcon.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

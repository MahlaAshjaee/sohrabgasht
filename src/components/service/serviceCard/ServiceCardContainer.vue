<template>
  <div class="flex flex-col flex-1">
    <template v-if="loading">
      <div class="text-center py-20 text-gray-500">در حال بارگذاری...</div>
    </template>

    <template v-else-if="!cards.length">
      <EmptyState message="فعلاً هیچ کارت سرویسی ثبت نکرده‌اید" />
    </template>

    <template v-else>
      <header class="flex items-center justify-between text-gray-700 mb-3">
        <span class="font-semibold text-gray-900">لیست کارت‌های سرویس</span>

        <button
          @click="$emit('reload')"
          class="text-gray-500 text-xl active:scale-95 transition-transform"
        >
        <BaseIcon src="Filter" />
        </button>
      </header>

      <div class="space-y-3">
        <ServiceCardCard
          v-for="(item, index) in cards"
          :key="index"
          v-bind="item"
          @show-result="$emit('show-result', item)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue';
import EmptyState from '../EmptyState.vue'
import ServiceCardCard from './ServiceCardCard.vue'

const props = defineProps({
  loading: Boolean,
  cards: {
    type: Array,
    default: () => [],
  },
})
</script>

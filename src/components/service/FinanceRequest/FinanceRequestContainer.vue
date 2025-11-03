<template>
  <div>
    <template v-if="loading">
      <div class="text-center py-20 text-gray-500">در حال بارگذاری...</div>
    </template>

    <template v-else-if="!requests.length">
      <EmptyState message="فعلاً درخواستی ثبت نکرده‌اید" />
    </template>
    <template v-else>
      <header class="flex items-center justify-between text-gray-700 mb-3">
        <span class="font-semibold text-gray-900">درخواست‌ها</span>
        <button
          @click="$emit('reload')"
          class="text-gray-500 text-xl active:scale-95 transition-transform"
        >
          <BaseIcon src="Filter" />
        </button>
      </header>

      <div class="space-y-3">
        <FinanceRequestCard
          v-for="(item, index) in requests"
          :key="index"
          v-bind="item"
          @show-result="$emit('show-result', item)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import BaseIcon from '../../common/BaseIcon.vue'
import EmptyState from '@/components/service/EmptyState.vue'
import FinanceRequestCard from '@/components/service/FinanceRequest/FinanceRequestCard.vue'

defineProps({
  loading: Boolean,
  requests: Array,
})
</script>

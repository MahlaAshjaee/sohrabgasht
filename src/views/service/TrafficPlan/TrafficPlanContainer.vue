<template>
  <div>
    <template v-if="loading">
      <div class="text-center py-20 text-gray-500">در حال بارگذاری...</div>
    </template>

    <template v-else-if="!plans.length">
      <EmptyState message="فعلاً هیچ درخواست طرح ترافیکی ثبت نکرده‌اید" />
    </template>

    <template v-else>
      <header class="flex items-center justify-between text-gray-700 mb-3">
        <span class="font-semibold text-gray-900">لیست درخواست‌های طرح ترافیک</span>

        <!-- دکمه‌ی فیلتر -->
        <button
          @click="$emit('reload')"
          class="text-gray-500 text-xl active:scale-95 transition-transform"
        >
          <BaseIcon src="Filter" />
        </button>
      </header>

      <div class="space-y-3">
        <TrafficPlanCard
          v-for="(plan, index) in plans"
          :key="index"
          v-bind="plan"
          @show-detail="$emit('show-detail', plan)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import EmptyState from '@/components/service/EmptyState.vue'
import TrafficPlanCard from './TrafficPlanCard.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

defineProps({
  loading: Boolean,
  plans: {
    type: Array,
    default: () => [],
  },
})
</script>

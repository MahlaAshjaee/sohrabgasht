<template>
  <div class="p-4">
    <header class="flex items-center justify-between text-gray-700 mb-4">
      <span class="font-semibold text-gray-900">سرویس‌های من</span>
    </header>

    <template v-if="loading">
      <div class="text-center py-20 text-gray-500">در حال بارگذاری...</div>
    </template>

    <template v-else-if="!services.length">
      <EmptyState message="فعلاً سرویسی ثبت نشده است" />
    </template>

    <template v-else>
      <div class="space-y-5">
        <ServiceCard
          v-for="(item, index) in services"
          :key="index"
          :id="item.id"
          :title="item.title"
          :arrivalTime="item.arrivalTime"
          :image="Maps"
          @view-details="openDetails(item)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmptyState from '@/components/service/EmptyState.vue'
import ServiceCard from '@/components/service/myServices/ServiceCard.vue'

import Maps from '../../../assets/img/Maps.svg'

const loading = ref(true)
const services = ref([])

onMounted(() => {
  setTimeout(loadData, 800)
})

function loadData() {
  services.value = [
    {
      id: 1,
      title: 'سرویس کارخانه نمک',
      arrivalTime: '06:15',
    },
    {
      id: 2,
      title: 'اداره استانداردی',
      arrivalTime: '06:15',
    },
  ]

  loading.value = false
}

function openDetails(item) {
  console.log('نمایش جزئیات سرویس:', item)
}
</script>

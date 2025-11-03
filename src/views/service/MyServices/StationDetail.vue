<template>
  <div class="p-4">
    <header class="mb-4">
      <h1 class="text-base font-semibold text-gray-900">{{ station.name }}</h1>
    </header>

    <div class="rounded-xl border-2 border-brand-red overflow-hidden">
      <BaseIcon :src="Maps" class="w-full object-cover" />
    </div>

    <div class="flex justify-between gap-3 my-5">
      <button
        @click="goToOnlineMap"
        class="flex-1 py-2 border border-brand-red-dark text-brand-red-dark rounded-lg text-sm font-semibold active:scale-95 transition"
      >
        نمایش آنلاین نقشه
      </button>
      <button
        class="flex-1 py-2 border border-brand-red-dark text-brand-red-dark rounded-lg text-sm font-semibold active:scale-95 transition"
      >
        دانلود کروکی
      </button>
    </div>

    <ServiceInfoSection
      :destinationAddress="station.address"
      :serviceDays="station.serviceDays"
      :passengerCount="station.passengerCount"
      :arrivalDestination="station.time"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import Maps from '../../../assets/img/Maps.svg'
import ServiceInfoSection from '@/components/service/myServices/ServiceInfoSection.vue'
import BaseIcon from '../../../components/common/BaseIcon.vue'

const route = useRoute()
const router = useRouter()

const station = {
  id: route.params.stationId,
  name: route.query.name,
  address: route.query.address,
  passengerCount: Number(route.query.passengerCount),
  time: route.query.time,
  serviceDays: route.query.serviceDays,
}

function goToOnlineMap() {
  router.push({
    name: 'my-services-station-map',
    params: {
      id: route.params.id,
      stationId: route.params.stationId,
    },
    query: {
      step: 1,
      name: station.name,
      address: station.address,
      passengerCount: station.passengerCount,
      time: station.time,
    },
  })
}
</script>

<template>
  <div
    class="border border-gray-200 bg-gray-50 rounded-lg p-4 active:scale-[0.98] transition cursor-pointer"
    @click="goToStationDetail"
  >
    <div class="flex-1 flex-col">
      <div class="flex items-center mb-1">
        <BaseIcon src="ic_Pin" />
        <h3 class="font-bold text-gray-900 text-sm">{{ name }}</h3>
        <div class="font-medium text-xs text-gray-500 mr-3">{{ passengerCount }} نفر</div>
      </div>
      <p class="text-sm text-gray-700 font-medium leading-5">
        <span class="text-gray-500">آدرس:</span> {{ address }}
      </p>
    </div>

    <div class="flex items-center gap-2 text-sm font-medium text-gray-700 min-w-[60px]">
      <BaseIcon src="clock" />
    </div>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const { serviceId, stationId, name, address, passengerCount, time, serviceDays } = defineProps({
  serviceId: { type: Number, required: true },
  stationId: { type: Number, required: true },
  name: String,
  address: String,
  passengerCount: Number,
  time: String,
  serviceDays: String,
})

function goToStationDetail() {
  router.push({
    name: 'my-services-station-detail',
    params: { id: serviceId, stationId },
    query: { name, address, passengerCount, time, serviceDays },
  })
}
</script>

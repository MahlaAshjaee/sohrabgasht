<template>
  <div class="p-4">
    <header class="mb-4">
      <h1 class="text-base font-semibold text-gray-900">{{ service.title }}</h1>
    </header>

    <div class="rounded-xl border-2 border-brand-red overflow-hidden">
      <BaseIcon :src="Maps" class="w-full object-cover" />
    </div>

    <div class="flex justify-between gap-3 my-5 px-7">
      <button
        class="flex-1 mx-1 py-2 border border-brand-red-dark text-brand-red-dark rounded-lg text-sm font-semibold active:scale-95 transition"
      >
        نمایش آنلاین نقشه
      </button>
      <button
        class="flex-1 mx-1 py-2 border border-brand-red-dark text-brand-red-dark rounded-lg text-sm font-semibold active:scale-95 transition"
      >
        دانلود کروکی
      </button>
    </div>
    <ServiceInfoSection
      :destinationAddress="service.destinationAddress"
      :serviceDays="service.serviceDays"
      :passengerCount="service.passengerCount"
      :arrivalFirst="service.arrivalFirst"
      :arrivalDestination="service.arrivalDestination"
    />
    <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
      <BaseButton
        @click="openStations"
        type="button"
        label="مشاهده ایستگاه‌ها"
        variant="primary"
        fullWidth
      />
      <teleport to="body">
        <StationsSheet
          v-if="showStations"
          :title="serviceTitle"
          :stations="stationList"
          @close="showStations = false"
        />
      </teleport>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Maps from '@/assets/img/Maps.svg'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import StationsSheet from '@/components/service/myServices/StationsSheet.vue'
import ServiceInfoSection from '@/components/service/myServices/ServiceInfoSection.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const route = useRoute()
const showStations = ref(false)
const serviceTitle = ref('')
const stationList = ref([])

const service = ref({
  id: route.params.id,
  title: route.params.title || 'سرویس کارخانه نمک',
  passengerCount: 4,
  arrivalFirst: '07:00',
  arrivalDestination: '08:00',
  serviceDays: 'شنبه تا سه شنبه',
})

const dummyStations = [
  {
    id: 1,
    name: 'ایستگاه اول',
    address: 'لورم ایپسوم...',
    time: '06:00',
    passengerCount: 3,
    serviceDays: 'شنبه تا چهارشنبه',
  },
  {
    id: 2,
    name: 'ایستگاه دوم',
    address: 'لورم ایپسوم...',
    time: '06:15',
    passengerCount: 3,
    serviceDays: 'شنبه تا چهارشنبه',
  },
  {
    id: 3,
    name: 'ایستگاه سوم',
    address: 'لورم ایپسوم...',
    time: '06:30',
    passengerCount: 3,
    serviceDays: 'شنبه تا چهارشنبه',
  },
]

function openStations() {
  serviceTitle.value = service.value.title
  stationList.value = dummyStations
  showStations.value = true
}
</script>

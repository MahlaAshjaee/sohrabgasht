<template>
  <section class="fixed inset-0 max-w-md w-full m-auto bg-white overflow-hidden">
    <BaseIcon :src="mapSrc" class="absolute inset-0 w-full h-full object-cover select-none" />

    <div class="relative z-10 flex justify-center items-end w-full h-full">
      <div class="w-full p-4">
        <div class="bg-white p-3 rounded-xl border border-gray-200 space-y-4 shadow-sm">
          <div class="flex items-center">
            <BaseIcon src="ic_Pin" class="pt-1" />
            <h2 class="font-semibold text-gray-800">
              {{ currentStationLabel }}
            </h2>
            <span class="text-xs text-gray-500 mr-2"> {{ station.passengerCount }} نفر </span>
          </div>

          <p class="text-sm text-gray-600 leading-6">
            <span class="text-gray-500">آدرس:</span>
            {{ station.address }}
          </p>

          <div class="flex justify-between items-center text-xs text-gray-500 border-t pt-5 pb-2">
            <div class="flex items-center gap-1">
              <BaseIcon src="map" />
              <span>۱.۸km</span>
            </div>
            <div class="flex items-center gap-1">
              <BaseIcon src="timer" />
              <span>۳ دقیقه</span>
            </div>
            <button
              v-if="step < 4"
              @click="openContactsSheet"
              class="text-brand-red-dark font-medium cursor-pointer active:scale-95 transition"
            >
              شماره تماس‌ها
            </button>
          </div>
        </div>

        <button
          @click="nextStep"
          class="w-full mt-4 py-3 rounded-md bg-brand-red text-white font-semibold text-sm active:scale-95 transition"
        >
          {{ nextButtonLabel }}
        </button>

        <p class="text-xs text-center text-gray-500 mt-2">
          {{ statusMessage }}
        </p>
      </div>
    </div>

    <ContactsSheet v-if="showSheet" @close="showSheet = false" />
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ContactsSheet from '@/components/service/myServices/ContactsSheet.vue'
import BaseIcon from '../../../components/common/BaseIcon.vue'

const route = useRoute()
const router = useRouter()
const showSheet = ref(false)

const step = computed(() => Number(route.query.step || 1))

const station = {
  name: route.query.name || '',
  address: route.query.address || '',
  passengerCount: route.query.passengerCount || '',
  time: route.query.time || '',
  serviceDays: route.query.serviceDays || '',
  arrivalDestination: route.query.arrivalDestination || '',
}
const currentStationLabel = computed(() => {
  switch (step.value) {
    case 1:
      return 'ایستگاه اول'
    case 2:
      return 'ایستگاه دوم'
    case 3:
      return 'ایستگاه سوم'
    case 4:
      return 'مقصد'
    default:
      return 'ایستگاه'
  }
})

const nextButtonLabel = computed(() => {
  if (step.value === 1) return 'شروع حرکت'
  if (step.value < 4) return 'به ایستگاه بعد برو'
  return 'به مقصد رسیدم'
})

const statusMessage = computed(() => {
  switch (step.value) {
    case 1:
      return 'آماده شروع حرکت از ایستگاه اول'
    case 2:
      return 'به ایستگاه اول رسیدیم، حرکت به ایستگاه دوم'
    case 3:
      return 'به ایستگاه دوم رسیدیم، حرکت به ایستگاه سوم'
    case 4:
      return 'به مقصد رسیدیم'
    default:
      return ''
  }
})

const mapSrc = computed(() => {
  switch (step.value) {
    case 1:
      return new URL('../assets/img/map-step1.svg', import.meta.url).href
    case 2:
      return new URL('../assets/img/map-step2.svg', import.meta.url).href
    case 3:
      return new URL('../assets/img/map-step3.svg', import.meta.url).href
    case 4:
      return new URL('../assets/img/map-step4.svg', import.meta.url).href
    default:
      return new URL('../assets/img/full-map.svg', import.meta.url).href
  }
})

function openContactsSheet() {
  showSheet.value = true
}

function nextStep() {
  const next = step.value + 1
  if (next <= 4) {
    router.replace({
      name: 'my-services-station-map',
      params: route.params,
      query: { ...route.query, step: next },
    })
  } else {
    console.log(' سفر تمام شد، به مقصد رسیدیم')
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
:root {
  overscroll-behavior-y: contain;
}
</style>

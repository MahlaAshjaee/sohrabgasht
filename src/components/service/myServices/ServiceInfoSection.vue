<template>
  <section class="mt-7 space-y-4 text-sm font-medium text-gray-700 overflow-y-auto">
    <p class="text-gray-700 leading-6 mb-5">
      <span class="text-brand-red font-bold text-2xl ml-1">•</span>
      <span class="text-gray-500">آدرس مقصد: </span>
      {{ destinationAddress }} لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم صنعت چاپ و با استفاده
      از طراحان گرافیک است
    </p>

    <div class="flex items-center gap-2 text-gray-700">
      <BaseIcon src="calendar-red" />
      <span class="text-gray-500">تعداد روزهای سرویس: </span>
      {{ serviceDays }}
    </div>

    <div class="flex items-center gap-2 text-gray-700">
      <BaseIcon src="person" />
      <span class="text-gray-500">تعداد مسافر: </span>
      {{ passengerCount }}
    </div>

    <div class="flex items-center gap-2 text-gray-700">
      <BaseIcon src="clock" />
      <span class="text-gray-500">ساعت رسیدن به اولین ایستگاه: </span>
      {{ arrivalDestination }}
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../../common/BaseIcon.vue'

const props = defineProps({
  destinationAddress: { type: String, required: true },
  serviceDays: { type: String, required: true },
  passengerCount: { type: [Number, String], required: true },
  arrivalFirst: { type: String, required: true },
  arrivalDestination: { type: String, required: true },
})
</script>

<template>
  <section
    class="bg-white rounded-xl shadow-md p-4 space-y-2 relative z-10 mt-10 border-2 border-gray-100"
  >
    <div class="flex items-center gap-3">
      <BaseIcon :src="user.avatar" alt="prifil" />
      <div class="flex flex-col space-y-4">
        <h2 class="font-bold text-gray-950 text-base">{{ user.name }}</h2>
        <p class="text-sm font-medium text-gray-600">{{ user.phone }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-3">
      <p class="font-medium text-gray-700">
        <span class="text-xs">خودرو: </span>
        <span class="text-sm">{{ user.car }}</span>
      </p>
      <div class="flex items-center border-2 border-gray-300 rounded-md px-2 gap-2 py-1">
        <div class="text-xs font-normal w-[29px] text-gray-500 border-l-2 border-gray-300 pl-1">
          <div class="flex items-center flex-col">
            <span> ایران </span
            ><span class="text-gray-900 font-medium">{{ user.plateRegion }}</span>
          </div>
        </div>
        <div class="text-sm font-bold text-gray-900 p-2">{{ user.plateNumber }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../common/BaseIcon.vue'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

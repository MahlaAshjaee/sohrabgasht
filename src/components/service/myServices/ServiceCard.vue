<template>
  <section class="bg-white rounded-xl border shadow-xl overflow-hidden transition">
    <div class="w-full mb-3 border-1 border-brand-red rounded-xl p-4">
    <BaseIcon :src="image" classes="w-full object-cover rounded-xl" /> 
    </div>

    <div class="px-4 pb-4">
      <h3 class="text-sm font-bold text-gray-900 mb-1">{{ title }}</h3>

      <div class="flex justify-between items-center mt-4">
        <p class="text-xs font-medium text-gray-500">
          ساعت رسیدن به اولین ایستگاه: <span class="text-sm text-gray-700">{{ arrivalTime }}</span>
        </p>
        <button
          @click="goToDetails"
          class="flex items-center gap-1 text-brand-red-dark text-sm font-semibold active:scale-95 transition"
        >
          <span>مشاهده جزئیات</span>
          <BaseIcon src="arrow-left" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseIcon from '../../common/BaseIcon.vue'
import { useRouter } from 'vue-router'

const { id, title, arrivalTime, image } = defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  arrivalTime: { type: String, default: '' },
  image: { type: String, default: '' },
})

const router = useRouter()

const goToDetails = () => {
  router.push({ name: 'my-services-detail', params: { id } })
}
</script>

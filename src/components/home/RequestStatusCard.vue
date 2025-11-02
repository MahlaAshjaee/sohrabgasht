<template>
  <section>
    <div
      v-if="requests.length === 0"
      class="bg-white flex justify-center gap-2 rounded-lg p-4 py-7 text-center text-sm font-medium border-2 border-gray-100"
    >
      <BaseIcon src="Icon" /> درخواستی وجود ندارد <BaseIcon src="Icon" />
    </div>
    <div v-else>
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="1.1"
        :space-between="12"
        navigation
        class="rounded-lg overflow-hidden relative"
        dir="rtl"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="(req, index) in requests"
          :key="index"
          class="bg-white rounded-lg p-3 border-2 border-gray-100 flex flex-col gap-3 shadow-sm"
        >
          <div class="flex justify-between items-center font-medium mb-3">
            <div class="text-sm truncate max-w-[70%] flex gap-2">
              <BaseIcon src="Icon" alt="Icon" /> {{ req.title }}
            </div>
            <div class="text-xs text-gray-700">{{ req.date }}</div>
          </div>
          <div>
            <span
              class="px-3 py-1 text-xs font-medium rounded-2xl p-2"
              :class="
                req.status === 'done'
                  ? 'bg-lime-100 text-lime-700'
                  : 'bg-yellow-100 text-yellow-600'
              "
            >
              {{ req.statusText }}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import BaseIcon from '../common/BaseIcon.vue'

defineProps({
  requests: {
    type: Array,
    required: true,
  },
})
let swiperInstance = null

function onSwiper(swiper) {
  swiperInstance = swiper
  updateNavVisibility(swiper)
}
function onSlideChange() {
  updateNavVisibility(swiperInstance)
}
function updateNavVisibility(swiper) {
  const prevBtn = swiper.navigation.prevEl
  const nextBtn = swiper.navigation.nextEl
  if (!prevBtn || !nextBtn) return
  prevBtn.style.display = swiper.isBeginning ? 'none' : 'flex'
  nextBtn.style.display = swiper.isEnd ? 'none' : 'flex'
}
</script>
<style scoped>
:deep(.swiper) {
  --swiper-navigation-size: 12px;
  --swiper-navigation-color: #333333;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 24px;
  height: 24px;
  top: 80%;
  transform: translateY(-50%);
  background: #e5e2e2;
  border-radius: 30%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}
:deep(.swiper-button-prev) {
  left: 4px;
}
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: var(--swiper-navigation-size);
  font-weight: 800;
}
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
}
</style>

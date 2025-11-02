<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 p-4 space-y-4">
      <div class="flex items-center my-3">
        <span class="text-brand-red text-2xl ml-1">•</span>
        <p class="text-sm font-bold">تصویر کارت سرویس {{ month }} {{ year }}</p>
      </div>
      <div
        class="flex flex-col bg-brand-red-dark rounded-lg shadow-md p-4 w-full max-w-sm mx-auto space-y-4 text-white"
      >
        <div>
          <BaseIcon src="imgView" class="w-full h-auto" />
        </div>
        <div class="flex justify-between">
          <p class="text-sm font-semibold mt-2">تاریخ درخواست: 1404/09/09</p>
          <BaseIcon src="don" />
        </div>
      </div>
    </main>

    <footer class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4">
      <button
        @click="goToComplaintPage"
        class="w-full py-2 border-2 border-brand-red text-brand-red rounded-md font-medium active:scale-[0.98] transition"
      >
        ثبت درخواست اعتراض
      </button>
    </footer>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id)
const month = computed(() => route.query.month || '—')
const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' })
const dynamicTitle = computed(() => `کارت سرویس ${month.value} ${year}`)
onMounted(() => {
  route.meta.title = dynamicTitle.value
})

watch(dynamicTitle, (val) => {
  route.meta.title = val
})

const goToComplaintPage = () => {
  router.push({
    name: 'service-card-complaint',
    query: { month: month.value, year },
  })
}
</script>

<template>
  <section class="flex flex-col h-fullbg-gray-50">
    <nav
      class="flex w-full overflow-x-auto border-b bg-white sticky top-0 z-20 whitespace-nowrap scroll-smooth select-none no-scrollbar"
    >
      <div class="flex w-max cursor-grab active:cursor-grabbing">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-3 text-sm font-medium min-w-max transition-all',
            activeTab === tab.key ? 'border-b-4 border-brand-red text-brand-red' : 'border-b-4 border-white text-gray-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </nav>

    <main class="flex-1 overflow-y-auto p-4 space-y-4">
      <DocumentCard
        v-for="doc in filteredDocuments"
        :key="doc.key"
        v-bind="doc"
        @retry="handleRetry"
      />

      <DocumentCard
        v-if="filteredDocuments.length === 0"
        :key="activeTab"
        :title="tabs.find((t) => t.key === activeTab).label"
        status="empty"
        front=""
        back=""
        :message="`تصویر ${tabs.find((t) => t.key === activeTab).label} خود را بارگذاری کنید.`"
        date=""
      />
    </main>
  </section>
</template>

<script setup>
import DocumentCard from '@/components/service/myDocument/DocumentCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { key: 'national', label: 'کارت ملی' },
  { key: 'birth', label: 'شناسنامه' },
  { key: 'car', label: 'کارت خودرو' },
  { key: 'license', label: 'گواهینامه' },
  { key: 'insurance', label: 'بیمه شخص ثالث' },
  { key: 'technical', label: 'معاینه فنی' },
]

const activeTab = ref('national')

onMounted(() => {
  const q = route.query.tab
  if (q && tabs.find((t) => t.key === q)) activeTab.value = q
})

const documentsList = ref([
  {
    key: 'national',
    title: 'کارت ملی',
    status: 'underReview',
    front: new URL('@/assets/img/IDCard.svg', import.meta.url).href,
    back: new URL('@/assets/img/IDCard1.svg', import.meta.url).href,
    date: '1404/07/01',
    message: '',
  },
  {
    key: 'birth',
    title: 'شناسنامه',
    status: 'rejected',
    front: new URL('@/assets/img/birthCertificate.svg', import.meta.url).href,
    back: '',
    date: '1404/08/10',
    message: 'تصویر واضح نیست، لطفاً مجدد آپلود کنید.',
  },
  {
    key: 'car',
    title: 'کارت خودرو',
    status: 'underReview',
    front: '',
    back: '',
    date: '1404/07/15',
    message: 'تصویر پشت و روی کارت خودرو خود را بارگزاری کنید.',
  },
  {
    key: 'license',
    title: 'گواهینامه',
    status: 'expired',
    front: new URL('@/assets/img/birthCertificate.svg', import.meta.url).href,
    back: new URL('@/assets/img/birthCertificate.svg', import.meta.url).href,
    date: '1404/06/20',
    message: 'مدرک منقضی شده است، لطفاً مجدد بارگذاری کنید.',
  },
  {
    key: 'insurance',
    title: 'بیمه شخص ثالث',
    status: 'warning',
    front: new URL('@/assets/img/birthCertificate.svg', import.meta.url).href,
    back: '',
    date: '1404/05/10',
    message: 'تاریخ بیمه شخص ثالث شما به پایان رسیده است.',
  },
  {
    key: 'technical',
    title: 'معاینه فنی',
    status: 'rejected',
    front: new URL('@/assets/img/birthCertificate.svg', import.meta.url).href,
    back: '',
    date: '1404/08/01',
    message: 'تصویر ارسالی واضح نیست.',
  },
])

const filteredDocuments = computed(() => {
  const docs = documentsList.value.filter((doc) => doc.key === activeTab.value)
  const validDocs = docs.filter((doc) => doc.front || doc.back)
  return validDocs
})

function handleRetry(key) {
  router.push({ name: 'my-documents-request', query: { tab: key } })
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
section {
  overflow-x: hidden;
}
</style>

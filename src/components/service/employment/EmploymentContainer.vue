<template>
  <div>
    <template v-if="loading">
      <div class="text-center py-20 text-gray-500">در حال بارگذاری...</div>
    </template>

    <template v-else-if="!requests.length">
      <EmptyState message="فعلاً درخواستی ثبت نشده است" />
    </template>

    <template v-else>
      <header class="flex items-center justify-between text-gray-700 mb-3">
        <span class="font-semibold text-gray-900">درخواست‌ها</span>
        <button
          @click="showFilterSheet = true"
          class="text-gray-500 text-xl active:scale-95 transition-transform"
        >
          <BaseIcon src="Filter" />
        </button>
      </header>

      <div class="space-y-3">
        <EmploymentCard
          v-for="(item, index) in requests"
          :key="index"
          :id="item.id"
          :date="item.date"
          :status="item.status"
          :selectedType="item.selectedType"
          :bankName="item.bankName"
          :organization="item.organization"
          :description="item.description"
          @show-result="showResult"
        />
      </div>
      <DatePickerSheet
        :visible="showFilterSheet"
        @close="showFilterSheet = false"
        @submit="applyDateFilter"
      />
      <DialogInfo
        v-if="showNoticeDialog"
        :visible="showNoticeDialog"
        title="همکار گرامی"
        message="لورم ایپسوم متن ساختگی با تولید سادگی ..."
        @close="closeResultDialog"
      />
    </template>
  </div>
</template>

<script setup>
import EmptyState from '@/components/service/EmptyState.vue'
import { ref, onMounted } from 'vue'
import DialogInfo from '@/components/common/DialogInfo.vue'
import EmploymentCard from './EmploymentCard.vue'
import DatePickerSheet from '@/components/service/DatePickerSheet.vue'
import BaseIcon from '../../common/BaseIcon.vue'

const loading = ref(true)
const requests = ref([])
const filteredRequests = ref([])
const showFilterSheet = ref(false)
const showNoticeDialog = ref(false)
const selectedRequest = ref(null)
onMounted(() => {
  setTimeout(loadData, 800)
})

function loadData() {
  const saved = JSON.parse(localStorage.getItem('employmentRequests') || '[]')
  requests.value = saved
  filteredRequests.value = saved
  loading.value = false
}

function showResult(item) {
  selectedRequest.value = item
  showNoticeDialog.value = true
}

function closeResultDialog() {
  showNoticeDialog.value = false
  selectedRequest.value = null
}
function applyDateFilter(selected) {
  const { from, to } = selected
  if (!from && !to) {
    filteredRequests.value = requests.value
    showFilterSheet.value = false
    return
  }
  const fromDate = from ? new Date(from.replace(/\//g, '-')) : null
  const toDate = to ? new Date(to.replace(/\//g, '-')) : null
  filteredRequests.value = requests.value.filter((req) => {
    const reqDate = new Date(req.date.replace(/\//g, '-'))
    return (!fromDate || reqDate >= fromDate) && (!toDate || reqDate <= toDate)
  })
  showFilterSheet.value = false
}
</script>

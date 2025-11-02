<template>
  <div class="px-4 pt-4 pb-20 space-y-4 min-h-[100svh]">
    <FinanceRequestContainer
      :requests="filteredRequests"
      :loading="loading"
      @reload="showSheet = true"
      @show-result="showResult"
    />
    <DatePickerSheet :visible="showSheet" @close="showSheet = false" @submit="handleDateFilter" />
    <DialogResult :visible="dialogVisible" :status="dialogStatus" @close="dialogVisible = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DatePickerSheet from '@/components/service/DatePickerSheet.vue'
import FinanceRequestContainer from '@/components/service/FinanceRequest/FinanceRequestContainer.vue'
import DialogResult from '@/components/common/DialogResult.vue'

const loading = ref(true)
const requests = ref([])
const showSheet = ref(false)

const filterDates = ref({ from: null, to: null })

const dialogVisible = ref(false)
const dialogStatus = ref('success')

onMounted(async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 800))

  const saved = JSON.parse(localStorage.getItem('financeRequests') || '[]')
  requests.value = saved
  loading.value = false
})

const handleDateFilter = (dates) => {
  console.log('📅 تاریخ‌های انتخاب‌شده از Calendar:', dates)
  const normalizeJalaliDate = (dateStr) => {
    if (!dateStr) return null
    const [y, m, d] = dateStr.split('/')
    const mm = m.padStart(2, '0')
    const dd = d.padStart(2, '0')
    return `${y}/${mm}/${dd}`
  }

  filterDates.value = {
    from: normalizeJalaliDate(dates.from),
    to: normalizeJalaliDate(dates.to),
  }

  showSheet.value = false
}
const filteredRequests = computed(() => {
  const { from, to } = filterDates.value
  if (!from && !to) return requests.value

  const normalizeJalaliDate = (dateStr) => {
    if (!dateStr) return null
    const [y, m, d] = dateStr.split('/')
    const mm = m.padStart(2, '0')
    const dd = d.padStart(2, '0')
    return `${y}/${mm}/${dd}`
  }

  const toNumber = (dateStr) => Number(normalizeJalaliDate(dateStr).replaceAll('/', ''))

  return requests.value.filter((req) => {
    const reqDate = toNumber(req.date)
    const fromDate = from ? toNumber(from) : null
    const toDate = to ? toNumber(to) : null

    if (fromDate && toDate) {
      return reqDate >= fromDate && reqDate <= toDate
    } else if (fromDate) {
      return reqDate >= fromDate
    } else if (toDate) {
      return reqDate <= toDate
    }
    return true
  })
})

const showResult = (item) => {
  if (item.status === 'در حال بررسی') return

  dialogStatus.value = item.status === 'پذیرفته شده' ? 'success' : 'error'
  dialogVisible.value = true
}
</script>

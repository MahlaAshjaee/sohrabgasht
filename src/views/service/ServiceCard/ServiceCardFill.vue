<template>
 <div class="flex flex-col flex-1 px-4 pt-4 space-y-4">
    <ServiceCardContainer
      :cards="filteredCards"
      :loading="loading"
      @reload="showSheet = true"
      @show-result="showResult"
    />
    <ServiceDatePickerSheet
      :visible="showSheet"
      @close="showSheet = false"
      @submit="handleDateFilter"
    />
    <DialogResult :visible="dialogVisible" :status="dialogStatus" @close="dialogVisible = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import ServiceCardContainer from '@/components/service/serviceCard/ServiceCardContainer.vue'
import ServiceDatePickerSheet from '@/components/service/DatePickerSheet.vue'
import DialogResult from '@/components/common/DialogResult.vue'

const loading = ref(true)
const cards = ref([])
const showSheet = ref(false)

const filterDates = ref({ from: null, to: null })

const dialogVisible = ref(false)
const dialogStatus = ref('success')

onMounted(async () => {
  loading.value = true
  cards.value = []
  await new Promise((r) => setTimeout(r, 600))

  const saved = JSON.parse(localStorage.getItem('serviceCardRequests') || '[]')
  cards.value = Array.isArray(saved) ? saved : []
  await nextTick()
  loading.value = false
})
const handleDateFilter = (dates) => {
  const normalize = (str) => {
    if (!str) return null
    const [y, m, d] = str.split('/')
    return `${y}/${m.padStart(2, '0')}/${d.padStart(2, '0')}`
  }
  filterDates.value = { from: normalize(dates.from), to: normalize(dates.to) }
  showSheet.value = false
}
const filteredCards = computed(() => {
  const { from, to } = filterDates.value
  if (!from && !to) return cards.value

  const normalize = (str) => {
    if (!str) return null
    const [y, m, d] = str.split('/')
    return `${y}/${m.padStart(2, '0')}/${d.padStart(2, '0')}`
  }
  const toNum = (str) => Number(normalize(str).replaceAll('/', ''))
  return cards.value.filter((c) => {
    const val = toNum(c.date)
    const fromVal = from ? toNum(from) : null
    const toVal = to ? toNum(to) : null
    if (fromVal && toVal) return val >= fromVal && val <= toVal
    if (fromVal) return val >= fromVal
    if (toVal) return val <= toVal
    return true
  })
})
const showResult = (item) => {
  if (item.status === 'در حال بررسی') return
  dialogStatus.value = item.status === 'پذیرفته شده' ? 'success' : 'error'
  dialogVisible.value = true
}
</script>

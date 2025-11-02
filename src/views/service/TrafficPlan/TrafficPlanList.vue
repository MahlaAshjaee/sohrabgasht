<template>
  <div class="px-4 pt-4 min-h-[100svh]">
    <TrafficPlanContainer
      :plans="filteredPlans"
      :loading="loading"
      @reload="showSheet = true"
      @show-detail="showDetail"
    />
    <ServiceDatePickerSheet
      :visible="showSheet"
      @close="showSheet = false"
      @submit="handleDateFilter"
    />
    <DialogInfo
      v-if="dialogVisible"
      :visible="dialogVisible"
      :status="dialogStatus"
      title="همکار گرامی"
      :message="dialogMessage"
      @close="closeDialog"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import TrafficPlanContainer from './TrafficPlanContainer.vue'
import ServiceDatePickerSheet from '@/components/service/DatePickerSheet.vue'
import DialogInfo from '@/components/common/DialogInfo.vue'

const route = useRoute()

const loading = ref(true)
const plans = ref([])
const showSheet = ref(false)
const filterDates = ref({ from: null, to: null })

const dialogVisible = ref(false)
const dialogStatus = ref('success')
const dialogMessage = ref('')
const selectedPlan = ref(null)

onMounted(async () => {
  loading.value = true
  plans.value = JSON.parse(localStorage.getItem('trafficPlanRequests') || '[]')

  const { dates, description } = route.query
  if (dates && description) {
    plans.value.push({
      id: Date.now(),
      date: JSON.parse(dates)[0], 
      status: 'رد شده',
      description,
    })
    localStorage.setItem('trafficPlanRequests', JSON.stringify(plans.value))
  }

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

const filteredPlans = computed(() => {
  const { from, to } = filterDates.value
  if (!from && !to) return plans.value
  const normalize = (str) => {
    if (!str) return null
    const [y, m, d] = str.split('/')
    return `${y}/${m.padStart(2, '0')}/${d.padStart(2, '0')}`
  }
  const toNum = (str) => Number(normalize(str).replaceAll('/', ''))
  return plans.value.filter((p) => {
    const val = toNum(p.date)
    const fromVal = from ? toNum(from) : null
    const toVal = to ? toNum(to) : null
    if (fromVal && toVal) return val >= fromVal && val <= toVal
    if (fromVal) return val >= fromVal
    if (toVal) return val <= toVal
    return true
  })
})

const showDetail = (plan) => {
  if (plan.status === 'در حال بررسی') return 
  selectedPlan.value = plan

  if (plan.status === 'پذیرفته شده') {
    dialogStatus.value = 'success'
    dialogMessage.value = 'درخواست شما پذیرفته شده است و طرح ترافیک خریداری خواهد شد.'
  } else {
    dialogStatus.value = 'error'
    dialogMessage.value = 'درخواست شما رد شده است، لطفاً دوباره بررسی یا با پشتیبانی تماس بگیرید.'
  }

  dialogVisible.value = true
}
const closeDialog = () => {
  dialogVisible.value = false
  dialogMessage.value = ''
  selectedPlan.value = null
}
</script>

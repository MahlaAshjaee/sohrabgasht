<template>
  <section class="min-h-screen flex flex-col">
    <main class="flex-1 p-4 space-y-4">
      <p class="text-sm font-medium text-gray-700 mt-4">
        دلیل اعتراض خود به کارت سرویس را ذکر کنید
      </p>
      <BaseField
        v-model="reason"
        type="textarea"
        placeholder="توضیحات خود را  وارد کنید"
        required
      />
    </main>

    <footer class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4 bg-white">
      <BaseButton label="ثبت درخواست" color="brand-red" class="w-full" @click="submitComplaint" />
    </footer>

    <DialogResult v-if="success" status="success" :visible="success" @close="closeModal" />
  </section>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import DialogResult from '@/components/common/DialogResult.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const route = useRoute()
const reason = ref('')
const success = ref(false)

const month = computed(() => route.query.month || '—')
const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' })
const dynamicTitle = computed(() => `کارت سرویس ${month.value} ${year}`)
onMounted(() => {
  route.meta.title = dynamicTitle.value
})
watch(dynamicTitle, (val) => {
  route.meta.title = val
})

const submitComplaint = () => {
  if (!reason.value.trim()) {
    alert('لطفاً دلیل اعتراض را وارد کنید')
    return
  }
  success.value = true
}

const closeModal = () => {
  success.value = false
  reason.value = ''

  setTimeout(() => {
    router.push({ name: 'service-card-fill', query: { reload: true } }) 
  }, 300)
}
</script>

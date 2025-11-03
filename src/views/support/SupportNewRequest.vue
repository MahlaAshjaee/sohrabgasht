<template>
  <div class="h-screen flex flex-col" dir="rtl">
    <HeaderBar title="ثبت تیکت جدید" :showBack="true" />
    <main class="flex-1 overflow-y-auto p-5 space-y-5 pt-20 pb-36">
      <div class="flex justify-center mb-3">
        <BaseIcon src="headset" />
      </div>

      <form @submit.prevent="submitTicket" class="space-y-5 flex flex-col">
        <BaseField
          v-model="form.title"
          label="عنوان درخواست"
          placeholder="عنوان درخواست را بنویسید"
        />

        <BaseField
          v-model="form.message"
          type="textarea"
          label="متن درخواست"
          placeholder="متن پیام خود را در این بخش بنویسید"
          rows="4"
        />

        <div class="space-y-4">
          <div
            class="bg-gray-100 border border-dashed border-gray-400 rounded-xl p-4 py-8 text-center cursor-pointer hover:border-red-400 transition"
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input ref="fileInput" type="file" class="hidden" @change="handleFileSelect" />
            <div v-if="!form.fileName" class="text-gray-700 text-sm font-medium">
              فایل مورد نظر را به اینجا بکشید
              <span class="text-red-600 font-medium pr-1">انتخاب فایل</span>
            </div>
            <div v-else class="flex items-center justify-between text-sm text-gray-700 mt-2">
              <span>نام فایل: {{ form.fileName }}</span>
              <button type="button" @click="removeFile" class="text-red-500">
                <BaseIcon src="Delete" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>

    <div class="fixed bottom-24 max-w-md m-auto left-0 right-0 px-5 py-4">
      <BaseButton label="ثبت تیکت" color="brand-red" class="w-full" @click="submitTicket" />
    </div>
    <SuccessToast v-model:visible="showSuccess" message="درخواست شما با موفقیت ثبت شد" />
  </div>
</template>

<script setup>
import HeaderBar from '@/components/common/HeaderBar.vue'
import SuccessToast from '@/components/common/SuccessToast.vue'
import { ref } from 'vue'
import { useTickets } from '@/stores/useTickets'
import { useRouter } from 'vue-router'
import BaseField from '@/components/common/BaseField.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseIcon from '../../components/common/BaseIcon.vue'
const router = useRouter()
const { addTicket } = useTickets()
const form = ref({
  title: '',
  message: '',
  file: null,
  fileName: '',
})
const fileInput = ref(null)
const showSuccess = ref(false)
const triggerFileInput = () => fileInput.value?.click()
const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return
  form.value.file = file
  form.value.fileName = file.name
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (!file) return
  form.value.file = file
  form.value.fileName = file.name
}

const removeFile = () => {
  form.value.file = null
  form.value.fileName = ''
}

const submitTicket = () => {
  if (!form.value.title.trim() || !form.value.message.trim()) {
    console.warn('⚠️ لطفاً عنوان و متن درخواست را کامل پر کنید.')
    return
  }
  const newTicket = {
    id: Date.now(),
    title: form.value.title,
    message: form.value.message,
    fileName: form.value.fileName,
    date: new Date().toLocaleDateString('fa-IR'),
    status: 'در حال انتظار',
  }
  try {
    addTicket(newTicket)
    showSuccess.value = true
    form.value = {
      title: '',
      message: '',
      file: null,
      fileName: '',
    }
    setTimeout(() => {
      router.push({ name: 'support' })
    }, 3500)
  } catch (err) {
    console.error('❌ خطا در ثبت تیکت:', err)
  }
}
</script>

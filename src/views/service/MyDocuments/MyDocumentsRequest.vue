<template>
  <section class="flex flex-col justify-between h-full bg-white">
    <form @submit.prevent="submitRequest" class="p-5 space-y-5">
      <p class="text-sm font-medium text-gray-800">
        <span class="text-brand-red text-2xl font-black">.</span>
        فرم زیر را به جهت درخواست تغییر مدارک تکمیل نمایید
      </p>
      <BaseField
        label="مدرک"
        type="text"
        placeholder="انتخاب کنید"
        v-model="form.documentTypeLabel"
        readonly
        @click="openSheet"
      />
      <BaseField
        id="description"
        name="description"
        label="علت درخواست خود را شرح دهید"
        type="textarea"
        placeholder="توضیحات خود را وارد کنید"
        v-model="form.description"
        required
      />

      <div class="fixed bottom-0 max-w-md m-auto left-0 right-0 px-5 py-4 border-gray-200 bg-white">
        <BaseButton type="submit" label="ثبت درخواست" variant="primary" fullWidth />
      </div>
    </form>
    <BaseBottomSheet :visible="sheetVisible" @close="sheetVisible = false">
      <p class="text-center text-gray-800 font-medium my-4">مدرک مورد نظر را انتخاب کنید</p>

      <ul class="space-y-3">
        <li
          v-for="item in documentsList"
          :key="item.key"
          class="flex items-center justify-between px-2"
        >
          <label
            class="flex items-center space-x-2 py-2 rtl:space-x-reverse cursor-pointer text-gray-700 text-sm"
          >
            <input
              type="checkbox"
              name="document"
              :value="item.key"
              v-model="tempSelectedKey"
              class="accent-brand-red w-4 h-4"
            />
            <span>{{ item.label }}</span>
          </label>
        </li>
      </ul>

      <div class="mt-6">
        <BaseButton label="انتخاب" variant="primary" fullWidth @click="confirmSelection" />
      </div>
    </BaseBottomSheet>
    <!-- دیالوگ موفقیت -->
    <DialogResult :visible="dialogOpen" :status="dialogStatus" @close="handleDialogClose" />
  </section>
</template>

<script setup>
import BaseBottomSheet from '@/components/service/BaseBottomSheet.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import DialogResult from '@/components/common/DialogResult.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  documentTypeKey: '',
  documentTypeLabel: '',
  description: '',
})

const dialogOpen = ref(false)
const dialogStatus = ref('success')
const sheetVisible = ref(false)
const tempSelectedKey = ref('')

const documentsList = [
  { key: 'national', label: 'کارت ملی' },
  { key: 'birth', label: 'شناسنامه' },
  { key: 'car', label: 'کارت خودرو' },
  { key: 'license', label: 'گواهینامه' },
  { key: 'insurance', label: 'بیمه شخص ثالث' },
  { key: 'technical', label: 'معاینه فنی' },
]

function openSheet() {
  sheetVisible.value = true
}

function confirmSelection() {
  const found = documentsList.find((doc) => doc.key === tempSelectedKey.value)
  if (found) {
    form.value.documentTypeKey = found.key
    form.value.documentTypeLabel = found.label
  }
  sheetVisible.value = false
}

function submitRequest() {
  dialogStatus.value = 'success'
  dialogOpen.value = true
}

function handleDialogClose() {
  dialogOpen.value = false
  router.push({ name: 'my-documents', query: { tab: form.value.documentTypeKey } })

  form.value = {
    documentTypeKey: '',
    documentTypeLabel: '',
    description: '',
  }
  tempSelectedKey.value = ''
}
</script>

<style scoped></style>

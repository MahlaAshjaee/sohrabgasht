<template>
  <div class="min-h-screen">
    <HeaderBar title="درخواست تغییر پروفایل" :showBack="true" />

    <main class="p-5">
      <p class="text-sm text-gray-900 font-bold pb-5">
        <span class="text-red-600 font-bold ml-1">*</span>
        فرم زیر را به جهت درخواست تغییر پروفایل تکمیل نمایید
      </p>

      <div class="flex flex-col space-y-5">
        <BaseField
          label="دسته اصلی"
          type="select"
          v-model="form.mainCategory"
          placeholder="انتخاب کنید"
          :options="categoryLabels"
        />

        <BaseField
          v-if="subCategories.length"
          label="زیر دسته"
          type="select"
          v-model="form.subCategory"
          :options="subCategories"
          placeholder="انتخاب کنید"
        />

        <BaseField
          v-model="form.reason"
          label="علت درخواست خود را شرح دهید"
          type="textarea"
          placeholder="توضیحات خود را وارد کنید"
          rows="4"
        />
      </div>
    </main>

    <footer class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4">
      <BaseButton label="ثبت درخواست" color="brand-red" class="w-full" @click="submitRequest" />
    </footer>

    <DialogResult
      v-if="showSuccess"
      status="success"
      :visible="showSuccess"
      @close="showSuccess = false"
    />
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import DialogResult from '@/components/common/DialogResult.vue'
import HeaderBar from '@/components/common/HeaderBar.vue'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  mainCategory: '',
  subCategory: '',
  reason: '',
})

const categoryData = ref({})
const subCategories = ref([])

const categoryLabels = [
  { key: 'personal', label: 'اطلاعات شخصی' },
  { key: 'car', label: 'اطلاعات خودرو' },
  { key: 'bank', label: 'اطلاعات بانکی' },
]

watch(
  () => form.value.mainCategory,
  (newVal) => {
    form.value.subCategory = ''
    subCategories.value = categoryData.value[newVal] || []
  },
)
async function fetchCategories() {
  categoryData.value = {
    personal: ['نام و نام خانوادگی', 'کد ملی', 'شماره موبایل'],
    car: ['شماره خودرو', 'مدل خودرو', 'رنگ خودرو'],
    bank: ['شماره شبا', 'نام بانک', 'شماره کارت'],
  }
}
const showSuccess = ref(false)
async function submitRequest() {
  const { mainCategory, subCategory, reason } = form.value
  if (!mainCategory || !subCategory || !reason.trim()) {
    alert('لطفا همه فیلدها را تکمیل کنید.')
    return
  }
  showSuccess.value = true
}

onMounted(fetchCategories)
</script>

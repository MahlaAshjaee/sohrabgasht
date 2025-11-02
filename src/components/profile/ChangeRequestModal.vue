<template>
  <section class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">ثبت درخواست تغییر اطلاعات</h2>

      <div class="space-y-5">
        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">دسته‌بندی تغییر</label>
          <select v-model="form.category" class="border rounded-md p-2 text-sm outline-none">
            <option disabled value="">انتخاب کنید</option>
            <option>اطلاعات شخصی</option>
            <option>اطلاعات خودرو</option>
            <option>اطلاعات بانکی</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-sm text-gray-600 mb-1">علت درخواست</label>
          <textarea
            v-model="form.reason"
            rows="3"
            placeholder="توضیح کوتاه در مورد تغییر"
            class="border rounded-md p-2 text-sm outline-none resize-none"
          ></textarea>
        </div>
      </div>

      <div class="mt-6 flex justify-between">
        <button @click="$emit('close')" class="text-gray-600 text-sm">انصراف</button>
        <button
          @click="handleSubmit"
          class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          ثبت درخواست
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const emits = defineEmits(['close', 'submit'])

const form = ref({ category: '', reason: '' })

function handleSubmit() {
  if (!form.value.category || !form.value.reason) return
  emits('submit', form.value)
}
</script>

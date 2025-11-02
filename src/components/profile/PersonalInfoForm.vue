<template>
  <div class="space-y-5">
    <div class="flex justify-center">
      <BaseIcon :src="avatarImg" />
    </div>
    <BaseField
      v-for="field in fields"
      :key="field.key"
      v-model="localData[field.key]"
      :label="field.label"
      :placeholder="field.placeholder"
    />
  </div>
</template>

<script setup>
import { watch, reactive } from 'vue'
import avatarImg from '@/assets/img/avatar.svg'
import BaseField from '@/components/common/BaseField.vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

const props = defineProps({ modelValue: Object })
const emits = defineEmits(['update:modelValue'])

const localData = reactive({ ...props.modelValue })

watch(localData, (val) => emits('update:modelValue', val), { deep: true })

const fields = [
  { key: 'firstName', label: 'نام و نام خانوادگی', placeholder: 'مثلاً علی حسینی' },
  { key: 'fatherName', label: 'نام پدر', placeholder: 'حسین' },
  { key: 'nationalId', label: 'شماره شناسنامه', placeholder: '---' },
  { key: 'nationality', label: 'کد ملی', placeholder: '---' },
  { key: 'birthDate', label: 'تاریخ تولد', placeholder: '1366/09/12' },
  { key: 'IssuingLover', label: 'محل صدور', placeholder: 'گرگان' },
  { key: 'gender', label: 'جنسیت', placeholder: 'مرد / زن' },
  { key: 'maritalStatus', label: 'وضعیت تأهل', placeholder: 'مجرد / متأهل' },
  { key: 'numberOfChildren', label: 'تعداد فرزند', placeholder: 'مجرد / متأهل' },
  { key: 'insuranceNumber', label: 'شماره بیمه ', placeholder: '---' },
  { key: 'naturalization', label: 'تابیعیت', placeholder: '---' },
  { key: 'phone', label: 'شماره تماس', placeholder: '0912...' },
  { key: 'address', label: 'آدرس', placeholder: 'آدرس دقیق محل سکونت' },
]
</script>

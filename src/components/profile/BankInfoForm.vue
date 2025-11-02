<template>
  <section class="space-y-5">
    <BaseField
      v-for="field in fields"
      :key="field.key"
      v-model="localData[field.key]"
      :label="field.label"
      :placeholder="field.placeholder"
      :type="field.key === 'agentBank' ? 'select' : 'text'"
      :options="field.key === 'agentBank' ? banks : undefined"
    />
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseField from '../common/BaseField.vue'

const props = defineProps({ modelValue: Object })
const emits = defineEmits(['update:modelValue'])

const localData = reactive({ ...props.modelValue })
watch(localData, (val) => emits('update:modelValue', val), { deep: true })

const banks = ['ملت', 'ملی', 'صادرات', 'تجارت', 'رفاه']

const fields = [
  { key: 'accountNumber', label: 'شماره حساب واریزی', placeholder: '123456789' },
  { key: 'bankName', label: 'شماره کارت عابربانک', placeholder: '603799********' },
  { key: 'iban', label: 'شماره شبا', placeholder: 'IR1234567890000' },
  { key: 'cardNumber', label: 'نام صاحب حساب', placeholder: 'علی محمدی' },
  { key: 'agentBank', label: 'بانک عامل', placeholder: 'انتخاب کنید' },
]
</script>

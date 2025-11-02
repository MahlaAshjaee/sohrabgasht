<template>
  <div class="space-y-6">
      <BaseField
      v-for="field in fields"
      :key="field.key"
      v-model="localData[field.key]"
      :label="field.label"
      :placeholder="field.placeholder"
      type="text"
    />
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseField from '../common/BaseField.vue'
const props = defineProps({ modelValue: Object })
const emits = defineEmits(['update:modelValue'])

const localData = reactive({ ...props.modelValue })
watch(localData, (val) => emits('update:modelValue', val), { deep: true })

const fields = [
  { key: 'model', label: 'مدل خودرو', placeholder: 'پژو پارس' },
  { key: 'type', label: 'نوع خودرو', placeholder: 'سواری / کامیون / برقی' },
  { key: 'color', label: 'رنگ خودرو', placeholder: 'سفید' },
  { key: 'fuel', label: 'نوع سوخت', placeholder: 'بنزین' },
  { key: 'capacity', label: 'ظرفیت', placeholder: '4نفر' },
  { key: 'chain', label: 'شماره سلسل', placeholder: 'IR12345' },
  { key: 'plate', label: 'شماره پلاک', placeholder: '12الف345' },
]
</script>

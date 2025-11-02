<template>
  <form class="my-auto" @submit.prevent="setNewPassword">
    <PageTitle title="رمز عبور جدید" />
    <BaseField
      id="newPassword"
      name="newPassword"
      label="رمز عبور جدید"
      v-model="newPassword"
      placeholder="رمز عبور جدید را وارد کنید"
    />
    <BaseButton variant="primary" label="تأیید" type="submit" :disabled="!newPassword.length" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseField from '@/components/common/BaseField.vue'
import PageTitle from '@/components/login/PageTitle.vue'

const router = useRouter()
const newPassword = ref('')

const setNewPassword = () => {
  if (!newPassword.value.trim().length) return
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <HeaderBar title="پروفایل" :showBack="true">
      <template #left>
        <button
          @click="$router.push({ name: 'change-request' })"
          class="flex items-center gap-1 text-brand-red active:scale-95 transition-transform cursor-pointer"
        >
          <span class="text-2xl mt-2 font-normal p-1">+</span>
          <span class="text-sm font-medium">درخواست ثبت تغییر</span>
        </button>
      </template>
    </HeaderBar>

    <nav
      class="fixed flex max-w-md w-full border-b mb-3 bg-white text-sm font-medium shrink-0 top-[64px] z-20"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'flex-1 py-3 text-center transition-all',
          activeTab === tab.key
            ? 'border-b-4 border-brand-red'
            : 'border-b-4 border-white text-gray-800',
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>

    <main class="flex-1 overflow-y-auto py-36 p-5 min-h-0">
      <component :is="currentComponent" v-model="profile[activeTab]" />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import PersonalInfoForm from '@/components/profile/PersonalInfoForm.vue'
import CarInfoForm from '@/components/profile/CarInfoForm.vue'
import BankInfoForm from '@/components/profile/BankInfoForm.vue'
import HeaderBar from '@/components/common/HeaderBar.vue'

const tabs = [
  { key: 'personal', label: 'اطلاعات شخصی' },
  { key: 'car', label: 'اطلاعات خودرو' },
  { key: 'bank', label: 'اطلاعات حساب بانکی' },
]
const activeTab = ref('personal')
const isModalOpen = ref(false)
const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'personal':
      return PersonalInfoForm
    case 'car':
      return CarInfoForm
    case 'bank':
      return BankInfoForm
  }
})
const profile = ref({
  personal: {
    firstName: 'علی',
    lastName: 'پرویش',
    nationalId: '******',
    birthDate: '1366/09/12',
    gender: 'مرد',
    maritalStatus: 'مجرد',
    phone: '0912...',
    address: '',
  },
  car: {
    model: 'پژو پارس',
    type: 'بنزینی',
    color: 'سفید',
    vin: 'IR12345',
  },
  bank: {
    bankName: 'ملت',
    accountNumber: '123456789',
    iban: 'IR1234567890000',
  },
})

function openChangeRequest() {
  isModalOpen.value = true
}

async function submitChangeRequest(payload) {
  isModalOpen.value = false
}
</script>

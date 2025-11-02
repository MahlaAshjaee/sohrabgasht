<template>
  <div class="h-screen flex flex-col bg-gray-100" dir="rtl">
    <HeaderBar :title="ticket?.title || 'پشتیبانی'" :showBack="true" />

    <main class="flex-1 overflow-y-auto p-4 py-20 space-y-6 bg-white rounded-t-2xl">
      <div
        class="flex justify-between items-center border border-gray-200 text-xs font-semibold rounded-xl p-3"
      >
        <div class="text-gray-700 p-2">تاریخ: {{ ticket.date }}</div>
        <button
          @click="closeChat"
          class="border-2 border-brand-red text-brand-red rounded-lg p-2 active:scale-[0.98] transition"
        >
          بستن گفتگو
        </button>
      </div>

      <div class="flex justify-center items-center mt-4">
        <div class="flex-grow h-px bg-gray-200 mx-3 shadow"></div>
        <span class="text-gray-700 text-xs p-1">
          {{ formatPersianDate(ticket.date) }}
        </span>
        <div class="flex-grow h-px bg-gray-200 mx-3 shadow"></div>
      </div>

      <div class="space-y-4">
        <div class="flex justify-start">
          <div
            class="max-w-[80%] bg-white border border-gray-200 text-gray-800 text-sm px-4 py-2 rounded-t-2xl rounded-bl-2xl shadow-sm"
          >
            نمونه پیام کاربر در تیکت "{{ ticket.title }}"
            <div class="text-[10px] text-gray-500 mt-1 text-left">17:13</div>
          </div>
        </div>

        <div class="flex justify-end mt-2">
          <BaseIcon
            src="sample-photo"
            class="w-32 h-32 object-cover rounded-2xl border border-gray-200 shadow-sm"
          />
        </div>
        <div class="flex justify-end items-end gap-2">
          <div
            class="max-w-[80%] bg-brand-red text-white text-sm px-4 py-2 rounded-t-2xl rounded-br-2xl shadow-sm"
          >
            نمونه پیام کاربر در "{{ ticket.title }}"
            <div class="text-[10px] text-gray-100 mt-1 text-left">17:13</div>
          </div>
          <BaseIcon src="avatar" classes="w-10 h-10 rounded-xl object-cover" />
        </div>
      </div>
    </main>

    <footer
      class="fixed max-w-md m-auto bottom-[110px] left-0 right-0 border-gray-200 flex items-center gap-2 px-4 py-3"
    >
      <button
        class="bg-brand-red text-white p-3 rounded-full flex items-center justify-center active:scale-[0.95] transition"
      >
        <BaseIcon src="send" />
      </button>
      <input
        v-model="newMessage"
        type="text"
        placeholder="متن خود را تایپ کنید"
        class="flex-1 rounded-xl border border-gray-200 shadow p-3 text-sm focus:outline-none"
      />
    </footer>
  </div>
</template>

<script setup>
import BaseIcon from '@/components/common/BaseIcon.vue'
import HeaderBar from '@/components/common/HeaderBar.vue'
import { useTickets } from '@/stores/useTickets'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { tickets } = useTickets()
const ticket = computed(() => tickets.value.find((t) => t.id === Number(route.params.id)) || null)
const newMessage = ref('')
function formatPersianDate(dateStr) {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return `${date.getDate()} ${new Intl.DateTimeFormat('fa-IR', { month: 'short' }).format(date)}`
  } catch {
    return dateStr
  }
}
function closeChat() {
  router.push({ name: 'support' })
}
</script>
<style scoped>
.bg-brand-red {
  background-color: #d90000;
}
</style>

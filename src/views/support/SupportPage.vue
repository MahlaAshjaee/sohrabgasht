<template>
  <div class="h-screen flex flex-col" dir="rtl">
    <HeaderBar title="پشتیبانی" :showBack="true">
      <template #left>
        <div @click="$router.push({ name: 'support-new' })"
          class="flex items-center gap-1 text-brand-red active:scale-95 transition-transform cursor-pointer">
          <span class="text-2xl mt-2 font-normal p-1">+</span>
          <span class="text-sm font-medium">درخواست پشتیبانی</span>
        </div>
      </template>
    </HeaderBar>
    <main class="flex-1 overflow-y-auto min-h-0 px-4 py-20 space-y-4">
      <WhatsappCard />
      <div class="space-y-5">
        <TicketItem v-for="(ticket, index) in tickets" :key="index" :title="ticket.title" :date="ticket.date"
          :status="ticket.status" @open="openChat(ticket.id)" />
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/common/HeaderBar.vue'
import TicketItem from '@/components/support/TicketItem.vue'
import WhatsappCard from '@/components/support/WhatsappCard.vue'
import { useTickets } from '@/stores/useTickets'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tickets } = useTickets()

const openChat = (id) => router.push({ name: 'support-chat', params: { id } })
</script>

<style scoped></style>

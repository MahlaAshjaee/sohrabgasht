import { ref } from 'vue'

const tickets = ref([
  {
    id: 1,
    title: 'محل قرارگیری عنوان که کاربر موقع ثبت تیکت تایپ کرده...',
    date: '۱۴۰۴/۰۷/۰۹',
    status: 'در حال انتظار',
  },
  {
    id: 2,
    title: 'محل قرارگیری عنوان که کاربر موقع ثبت تیکت تایپ کرده...',
    date: '۱۴۰۴/۰۷/۰۹',
    status: 'پاسخ داده شده',
  },
  {
    id: 3,
    title: 'محل قرارگیری عنوان که کاربر موقع ثبت تیکت تایپ کرده...',
    date: '۱۴۰۴/۰۷/۰۹',
    status: 'بسته شده',
  },
])

export function useTickets() {
  const addTicket = (ticket) => {
    tickets.value.unshift(ticket) 
  }

  return { tickets, addTicket }
}

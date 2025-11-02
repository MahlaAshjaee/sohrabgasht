<template>
  <nav
    dir="rtl"
    class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white flex justify-around items-center h-28 z-50"
  >
    <div
      class="absolute top-0 left-0 w-full h-[24px] bg-gradient-to-t from-gray-400/10 to-transparent"
    ></div>
    <button
      v-for="nav in bottomNav"
      :key="nav.label"
      @click="navigate(nav.route)"
      class="flex flex-col items-center pt-1 pb-1 transition-colors duration-150"
    >
      <div
        v-if="isActive(nav.route)"
        class="absolute bottom-[86px] w-[30px] h-[4px] bg-red-700 rounded-full"
      ></div>
      <img
        :src="isActive(nav.route) ? nav.iconActive : nav.iconInactive"
        :alt="nav.label"
        class="w-6 h-6 mb-1"
      />
      <span class="text-xs font-medium">{{ nav.label }}</span>
      <span
        v-if="nav.label === 'اعلانات' && notificationsCount > 0"
        class="absolute top-7 left-14 bg-red-100 border-2 border-red-800 text-red-700 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none"
      >
        {{ notificationsCount }}
      </span>
    </button>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const notificationsCount = ref(0)

onMounted(() => {
  notificationsCount.value = 6
})
const bottomNav = [
  {
    label: 'خانه',
    route: '/',
    iconActive: new URL('@/assets/img/home-active.svg', import.meta.url).href,
    iconInactive: new URL('@/assets/img/home.svg', import.meta.url).href,
  },
  {
    label: 'پشتیبانی',
    route: '/support',
    iconActive: new URL('@/assets/img/support-active.svg', import.meta.url).href,
    iconInactive: new URL('@/assets/img/support.svg', import.meta.url).href,
  },
  {
    label: 'پروفایل',
    route: '/profile',
    iconActive: new URL('@/assets/img/profile-active.svg', import.meta.url).href,
    iconInactive: new URL('@/assets/img/profile.svg', import.meta.url).href,
  },
  {
    label: 'اعلانات',
    route: '/notifications',
    iconActive: new URL('@/assets/img/notifications-active.svg', import.meta.url).href,
    iconInactive: new URL('@/assets/img/notifications.svg', import.meta.url).href,
  },
]

function navigate(path) {
  if (path) router.push(path)
}
function isActive(path) {
  return route.path === path
}
</script>

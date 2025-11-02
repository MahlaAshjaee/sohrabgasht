<template>
  <div class="min-h-[100svh] flex flex-col">
    <main class="flex-1  overflow-hidden">
      <router-view />
    </main>
    <div class="max-w-md mx-auto w-full">
      <BottomNavigation
        v-if="route.path.startsWith('/') && !route.path.includes('/change-request')"
      />
    </div>
  </div>
</template>

<script setup>
import BottomNavigation from '@/components/common/BottomNavigation.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

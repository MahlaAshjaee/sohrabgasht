<template>
  <div class="flex flex-col min-h-[100svh]">
    <HeaderBar :title="$route.meta.title" :showBack="showBack">
      <template #left>
        <button
          v-if="$route.meta.headerLeftButton"
          @click="$router.push($route.meta.headerLeftButton.to)"
          class="flex items-center gap-1 text-brand-red active:scale-95 transition-transform cursor-pointer"
        >
          <span class="text-2xl font-normal mt-1">{{ $route.meta.headerLeftButton.icon }}</span>
          <span class="text-sm font-medium">{{ $route.meta.headerLeftButton.text }}</span>
        </button>
      </template>
    </HeaderBar>

    <main class="flex-1 overflow-y-auto py-16">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/common/HeaderBar.vue'

defineProps({
  showBack: { type: Boolean, default: true },
})
</script>

<style scoped>
.text-brand-red {
  color: #d32f2f;
}
</style>

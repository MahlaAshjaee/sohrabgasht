<template>
  <header
    dir="rtl"
    class="fixed max-w-md w-full top-0 bg-white shadow z-10 h-14 flex items-center justify-between px-4"
  >
    <div class="flex items-center">
      <button v-if="showBack" @click="$router.back()" class="active:scale-95 transition-transform">
        <BaseIcon src="backArrow" />
      </button>
      <h1 class="text-sm font-bold text-gray-900">{{ title }}</h1>
    </div>

    <div>
      <slot name="left" />
    </div>
  </header>
</template>

<script setup>
import BaseIcon from './BaseField.vue'

defineProps({
  title: String,
  showBack: { type: Boolean, default: true },
})
</script>

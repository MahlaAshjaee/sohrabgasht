<template>
  <div class="flex flex-col h-screen">
    <HeaderBar title="اعلانات" />
    <main class="flex-1 overflow-y-auto py-20 p-5 min-h-0">
      <NotificationCard
        v-for="(item, index) in notifications"
        :key="index"
        :title="item.title"
        :description="item.description"
        :date="item.date"
        :isNew="item.isNew"
      />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/common/HeaderBar.vue'
import NotificationCard from '@/components/notifications/NotificationCard.vue'

const notifications = [
  {
    title: 'درخواست تعویض کارت ملی',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    date: '۱۴۰۴/۰۷/۰۹',
    isNew: true,
  },
  {
    title: 'درخواست تعویض کارت ملی',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    date: '۱۴۰۴/۰۷/۰۹',
    isNew: false,
  },
  {
    title: 'درخواست تعویض کارت ملی',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    date: '۱۴۰۴/۰۷/۰۹',
    isNew: false,
  },
]
</script>

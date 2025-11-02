<template>
  <div class="home-page bg-white flex flex-col h-full overflow-hidden">
    <div class="header-wrapper relative px-4 pb-14 text-white flex-shrink-0">
      <div class="absolute inset-0 z-0 header-overlay"></div>
      <ProfileCard :user="user" />
    </div>

    <div class="relative z-10 px-4 -mt-10 flex-shrink-0">
      <RequestStatusCard :requests="requests" />
    </div>

    <div class="px-4 mt-auto mb-22 flex-shrink-0">
      <ServiceMenuGrid :items="menuItems" />
    </div>
  </div>
</template>

<script setup>
import ProfileCard from '@/components/home/ProfileCard.vue'
import RequestStatusCard from '@/components/home/RequestStatusCard.vue'
import ServiceMenuGrid from '@/components/home/ServiceMenuGrid.vue'
import avatarImg from '@/assets/img/avatar.svg'
import serviceCardIcon from '@/assets/img/service-card.svg'
import myServicesIcon from '@/assets/img/my-services.svg'
import workCertIcon from '@/assets/img/work-cert.svg'
import financialAffairsIcon from '@/assets/img/financial-affairs.svg'
import myDocumentsIcon from '@/assets/img/my-documents.svg'
import trafficPlanIcon from '@/assets/img/traffic-plan.svg'

const user = {
  name: 'علی شریفی مقدم',
  phone: '09139012345',
  car: 'پژو پارس نقره‌ای',
  plateRegion: '50',
  plateNumber: '34735',
  avatar: avatarImg,
}

const requests = [
  {
    date: '1404/06/09',
    title: 'درخواست صدور گواهی اشتغال',
    status: 'done',
    statusText: 'پاسخ داده شده',
  },
  {
    date: '1404/06/09',
    title: 'درخواست صدور گواهی اشتغال',
    status: 'done',
    statusText: 'پاسخ داده شده',
  },
]

const menuItems = [
  { label: 'کارت سرویس', icon: serviceCardIcon, route: '/service/card' },
  { label: 'سرویس های من', icon: myServicesIcon, route: '/my/services' },
  { label: 'گواهی اشتغال', icon: workCertIcon, route: '/employment/certificate' },
  { label: 'دریافت مساعده', icon: financialAffairsIcon, route: '/financial/affairs' },
  { label: 'مدارک من', icon: myDocumentsIcon, route: '/my/documents' },
  { label: 'طرح ترافیک', icon: trafficPlanIcon, route: '/traffic/plan' },
]
</script>
<style scoped>
.header-wrapper {
  min-height: 260px;
  background-color: #ab060a;
  background-image: url('@/assets/img/Group.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
}

.header-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 50%);
  position: absolute;
  inset: 0;
  z-index: 0;
}
</style>

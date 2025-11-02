import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/views/login/LoginForm.vue'
import OtpVerification from '@/views/login/OtpVerification.vue'
import ForgotPassword from '@/views/login/ForgotPassword.vue'
import ForgotPasswordOtp from '@/views/login/ForgotPasswordOtp.vue'
import Home from '@/views/home/Home.vue'
import { useAuthStore } from '@/stores/auth'
import PasswordLogin from '@/views/login/PasswordLogin.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import ProfilePage from '@/views/profilePage/ProfilePage.vue'
import ForgotNewPassword from '@/views/login/ForgotNewPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: 'login', name: 'login', component: LoginForm },
        { path: 'password', name: 'password-login', component: PasswordLogin },
        { path: 'verify', name: 'verify', component: OtpVerification },
        { path: 'forgot', name: 'forgot-password', component: ForgotPassword },
        { path: 'forgot/otp', name: 'forgot-password-otp', component: ForgotPasswordOtp },
        { path: 'forgot/new', name: 'forgot-password-new', component: ForgotNewPassword },
      ],
    },

    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfilePage,
          meta: { requiresAuth: true },
        },
        {
          path: 'profile/change-request',
          name: 'change-request',
          component: () => import('@/views/profilePage/ChangeRequestPage.vue'),
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('@/views/notifications/NotificationsPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'support',
          name: 'support',
          component: () => import('@/views/support/SupportPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'support/new',
          name: 'support-new',
          component: () => import('@/views/support/SupportNewRequest.vue'),
        },
        {
          path: 'support/:id',
          name: 'support-chat',
          component: () => import('@/views/support/SupportChat.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/service/card',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'کارت سرویس' },
      children: [
        {
          path: '',
          name: 'service-card-fill',
          component: () => import('@/views/service/ServiceCard/ServiceCardFill.vue'),
          meta: {
            title: 'کارت سرویس',
            headerLeftButton: {
              text: 'ثبت درخواست',
              icon: '+',
              to: { name: 'service-card-request' },
            },
          },
        },
        {
          path: 'view/:id',
          name: 'service-card-view',
          component: () => import('@/views/service/ServiceCard/ServiceCardView.vue'),
          props: true,
          meta: {
            title: 'مشاهده کارت سرویس',
            headerLeftButton: { back: true },
          },
        },
        {
          path: 'complaint',
          name: 'service-card-complaint',
          component: () => import('@/views/service/ServiceCard/ServiceCardComplaint.vue'),
          meta: { title: 'درخواست اعتراض' },
        },
        {
          path: 'request',
          name: 'service-card-request',
          component: () => import('@/views/service/ServiceCard/ServiceCardRequest.vue'),
          meta: { title: 'ثبت درخواست جدید', headerLeftButton: { back: true } },
        },
      ],
    },
    {
      path: '/employment/certificate',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'گواهی اشتغال' },
      children: [
        {
          path: '',
          name: 'employment-container',
          component: () =>
            import('@/views/service/EmploymentCertificate/EmploymentCertificate.vue'),
          meta: {
            title: 'گواهی اشتغال',
            headerLeftButton: {
              text: 'ثبت درخواست',
              icon: '+',
              to: { name: 'employment-request' },
            },
          },
        },
        {
          path: 'request',
          name: 'employment-request',
          component: () => import('@/views/service/EmploymentCertificate/EmploymentRequest.vue'),
          meta: {
            title: 'ثبت درخواست جدید',
            headerLeftButton: { back: true },
          },
        },
      ],
    },
    {
      path: '/my/services',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'سرویس های من' },
      children: [
        {
          path: '',
          name: 'my-services',
          component: () => import('@/views/service/MyServices/MyServicesList.vue'),
          meta: {
            title: 'سرویس های من',
            // headerLeftButton: { back: true },
          },
        },
        {
          path: ':id',
          name: 'my-services-detail',
          component: () => import('@/views/service/MyServices/MyServiceDetail.vue'),
          props: true,
          meta: {
            title: 'جزئیات سرویس',
            headerLeftButton: { back: true },
          },
        },
        {
          path: ':id/station/:stationId',
          name: 'my-services-station-detail',
          component: () => import('@/views/service/MyServices/StationDetail.vue'),
          props: (route) => ({
            id: route.params.id,
            stationId: route.params.stationId,
          }),
          meta: {
            title: 'جزئیات ایستگاه',
            headerLeftButton: { back: true },
          },
        },
        {
          path: ':id/station/:stationId/map',
          name: 'my-services-station-map',
          component: () => import('@/views/service/MyServices/OnlineMap.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/financial/affairs',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'درخواست مساعده' },
      children: [
        {
          path: '',
          name: 'financial-fill',
          component: () => import('@/views/service/FinancialAffairs/FinanceFill.vue'),
          meta: {
            title: 'درخواست مساعده',
            headerLeftButton: {
              text: 'ثبت درخواست',
              icon: '+',
              to: { name: 'financial-request' },
            },
          },
        },
        {
          path: 'request',
          name: 'financial-request',
          component: () => import('@/views/service/FinancialAffairs/FinanceRequest.vue'),
          meta: { title: 'ثبت درخواست جدید', headerLeftButton: { back: true } },
        },
      ],
    },
    {
      path: '/traffic/plan',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'طرح ترافیک' },
      children: [
        {
          path: '',
          name: 'traffic-plan-list',
          component: () => import('@/views/service/TrafficPlan/TrafficPlanList.vue'),
          meta: {
            title: 'درخواست خرید طرح ترافیک',
            headerLeftButton: {
              text: 'ثبت درخواست',
              icon: '+',
              to: { name: 'traffic-plan-form' },
            },
          },
        },
        {
          path: 'request',
          name: 'traffic-plan-form',
          component: () => import('@/views/service/TrafficPlan/TrafficPlanForm.vue'),
          meta: {
            title: 'ثبت درخواست طرح ترافیک',
            headerLeftButton: { back: true },
          },
        },
      ],
    },

    {
      path: '/my/documents',
      component: () => import('@/layouts/ServiceLayout.vue'),
      props: { title: 'مدارک من' },
      children: [
        {
          path: '',
          name: 'my-documents',
          component: () => import('@/views/service/MyDocuments/MyDocumentsList.vue'),
          meta: {
            title: 'مدارک من',
            headerLeftButton: {
              text: 'درخواست ثبت تغییر',
              icon: '+',
              to: { name: 'my-documents-request' },
            },
          },
        },
        {
          path: 'request',
          name: 'my-documents-request',
          component: () => import('@/views/service/MyDocuments/MyDocumentsRequest.vue'),
          meta: {
            title: 'ثبت درخواست تغییر مدارک',
            headerLeftButton: { back: true },
          },
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // بررسی کوکی در هر ناوبری
  authStore.checkCooki()

  const loggedIn = authStore.isLoggedIn
  const requiresAuth = to.meta.requiresAuth === true

  // اگر مسیر نیاز به احراز داره و کاربر لاگین نیست
  if (requiresAuth && !loggedIn) {
    next({ name: 'login' })
  }
  // اگر وارد مسیر login شد و لاگین معتبره، بفرستش به home
  else if (to.name === 'login' && loggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

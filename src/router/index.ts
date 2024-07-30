import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home page',
          component: () => import('@/views/HomePage.vue')
        },
        {
          path: 'workers',
          name: 'workers page',
          component: () => import('@/views/workers/ListPage.vue')
        },
        {
          path: 'workers/:id',
          props: true,
          name: 'worker details page',
          component: () => import('@/views/workers/DetailsPage.vue')
        },
        {
          name: 'settings page',
          path: 'me/settings',
          component: () => import('@/views/SettingsPage.vue')
        }
      ]
    },
    {
      name: 'auth page',
      path: '/auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          name: 'login page',
          path: 'signin',
          component: () => import('@/views/auth/LoginPage.vue')
        },
        {
          name: 'otp verification page',
          path: 'otp-code',
          component: () => import('@/views/auth/OTPCode.vue')
        },
        {
          name: 'account creation page',
          path: 'signup',
          component: () => import('@/views/auth/RegistrationPage.vue')
        }
      ]
    }
  ]
})

export default router

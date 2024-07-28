import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/IndexPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'workers page',
          component: () => import('@/views/workers/ListPage.vue')
        },
        {
          path: ':id',
          props: true,
          name: 'worker details page',
          component: () => import('@/views/workers/DetailsPage.vue')
        },
      ]
    },
    {
      name: 'login page',
      path: '/auth/signin',
      component: () => import('@/views/auth/LoginPage.vue')
    },
    {
      name: 'account creation page',
      path: '/auth/signup',
      component: () => import('@/views/auth/RegistrationPage.vue')
    },
    {
      name: 'settings page',
      path: '/me/settings',
      component: () => import('@/views/SettingsPage.vue')
    },
  ]
})

export default router

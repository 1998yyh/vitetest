import { createRouter, createWebHashHistory } from 'vue-router'

const three = () => import('../pages/three/index.vue')

const routes = [
  { path: '/', redirect: '/three' },
  {
    path: '/three',
    name: 'three',
    component: three
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

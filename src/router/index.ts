import { createRouter, createWebHashHistory } from 'vue-router'

const three = () => import('../pages/three/index.vue')
const home = () => import('../pages/home/index.vue')

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/three',
    name: 'three',
    component: three
  }, {
    path: '/home',
    name: 'home',
    component: home
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

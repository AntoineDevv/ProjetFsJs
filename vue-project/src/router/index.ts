import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotfoundView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/a-propos',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/bonplan',
      name: 'Bonplan',
      component: () => import('../views/BonplanView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/inscription',
      name: 'Inscription',
      component: () => import('../views/InscriptionView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotfoundView.vue') 
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
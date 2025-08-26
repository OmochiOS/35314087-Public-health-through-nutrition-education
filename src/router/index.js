import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProgramsView from '@/views/ProgramsView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/programs', name: 'programs', component: ProgramsView },
    { path: '/resources', name: 'resources', component: ResourcesView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/login', name: 'auth', component: LoginView },                  
    { path: '/register', redirect: { name: 'auth', query: { mode: 'register' } } }, 
  ],
  scrollBehavior: () => ({ top: 0 })
})

export default router


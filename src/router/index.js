import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProgramsView from '@/views/ProgramsView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import AccountView from '@/views/AccountView.vue'
import AdminView from '@/views/AdminView.vue'
import { useUserStore } from '@/stores/User'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/programs', name: 'programs', component: ProgramsView },
    { path: '/resources', name: 'resources', component: ResourcesView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/login', name: 'auth', component: LoginView },
    { path: '/register', redirect: { name: 'auth', query: { mode: 'register' } } },
    { path: '/account', name: 'account', component: AccountView, meta: { requiresAuth: true } },
    { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAdmin: true } },
  ],
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  const auth = useUserStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'auth', query: { redirect: to.fullPath } }  
  }
  if (to.meta.requiresAdmin && auth.role !== 'admin') {
    return { name: 'auth', query: { redirect: to.fullPath } } 
  }
})

export default router

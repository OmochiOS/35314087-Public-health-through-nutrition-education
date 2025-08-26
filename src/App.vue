<template>
  <div>
    <Navbar/>
    <main class="shell">
      <RouterView/>
    </main>
    <footer class="footer">© 2025 NutriSphere</footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue' 
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/User' 

const user = useUserStore()
onMounted(() => {
  user.ensureAdminSeed()
  console.log('[seed] users =', user.users)     
})
</script>

<style>
.shell {
  max-width: 1200px;       
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.footer {
  margin-top: 32px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  color: #666;
}
</style>

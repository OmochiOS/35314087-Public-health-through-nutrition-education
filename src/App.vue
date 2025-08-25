<template>
  <div class="shell">
    <Navbar />
    <RouterView />
    <footer class="footer"><large>© {{ new Date().getFullYear() }} NutriSphere </large></footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style>
.shell{max-width:960px;margin:0 auto;padding:20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
.footer{margin-top:32px;padding-top:12px;border-top:1px solid #eee;color:#666}
</style>

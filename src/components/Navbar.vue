<template>
  <nav class="nav">
    <div class="brand">NutriSphere</div>

    <button class="menu" @click="open = !open" aria-label="Toggle menu">☰</button>

    <ul :class="['links', { open }]">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/programs">Programs</RouterLink></li>
      <li><RouterLink to="/resources">Resources</RouterLink></li>
      <li><RouterLink to="/contact">Contact Us</RouterLink></li>
      <li><RouterLink to="/login">Login</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}
.brand{font-weight:700}
.menu{display:none;border:1px solid #ddd;background:#f8f8f8;padding:6px 10px;border-radius:8px}
.links{display:flex;gap:16px;list-style:none;margin:0;padding:0}
a{text-decoration:none;color:#333}
a.router-link-active{text-decoration:underline}
@media (max-width:576px){
  .menu{display:block}
  .links{
    display:none;flex-direction:column;gap:10px;
    background:#fafafa;padding:10px;position:absolute;top:50px;right:10px;
    border:1px solid #eee;border-radius:8px
  }
  .links.open{display:flex}
}
</style>


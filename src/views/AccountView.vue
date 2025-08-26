<template>
  <section class="wrap">
    <h2>Welcome! {{ auth.username }}.</h2>
    <ul>
      <li>Email: {{ auth.currentUser?.email || '—' }}</li>
      <li>Role: {{ auth.role }}</li>
    </ul>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/User'
const auth = useUserStore()
</script>

<style scoped>
.wrap{max-width:720px;margin:0 auto}
</style>

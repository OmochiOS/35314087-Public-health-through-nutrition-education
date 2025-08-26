<template>
  <header class="hero">
    <h1>Building Healthier Communities Through Nutrition </h1>
    <p class="tag">Nourish the Collective</p>
    <RouterLink class="cta" to="/programs">Explore The Program</RouterLink>
  </header>
    <section style="margin-top:16px">
    <h3>Subscribe To Nutrition Tips</h3>
    <SubscribeForm/>
  </section>
</template>

<script setup>
import SubscribeForm from '@/components/SubscribeForm.vue';

</script>

<style scoped>
.hero{display:grid;gap:8px;padding:12px 0}
.tag{color:#555}
.cta{display:inline-block;margin-top:8px;padding:8px 12px;border:1px solid #ddd;border-radius:10px;text-decoration:none}
</style>

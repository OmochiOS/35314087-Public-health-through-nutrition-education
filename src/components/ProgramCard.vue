<template>
  <article class="card">
    <header>
      <h3>{{ p.title }}</h3>
      <small>Level: {{ p.level }} · {{ p.weeks }} weeks</small>
    </header>

    <div class="meta">
      Remaining :
      <strong :class="{ danger: p.spots === 0 }">{{ p.spots }}</strong>
    </div>

    <button :disabled="p.spots === 0" @click="$emit('enrol', p.id)">
      {{ p.spots === 0 ? 'Full' : 'Enrollment' }}
    </button>
  </article>
</template>

<script setup>
defineProps({ p: { type: Object, required: true } })
defineEmits(['enrol'])
</script>

<style scoped>
.card { border:1px solid #eee; border-radius:12px; padding:12px; display:grid; gap:8px; }
.meta { color:#555; } .danger { color:#c0392b; }
button { padding:6px 10px; border:1px solid #ddd; border-radius:8px; background:#fafafa; cursor:pointer; }
button:disabled { opacity:.5; cursor:not-allowed; }
</style>

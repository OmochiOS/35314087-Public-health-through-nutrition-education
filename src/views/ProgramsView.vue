<template>
  <section class="wrap">
    <h2>Programs</h2>

    <!-- filter bar -->
    <div class="filters">
      <input v-model.trim="q" class="ipt" placeholder="Search title..." />
      <select v-model="level" class="sel">
        <option value="">All levels</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>All</option>
      </select>
      <span class="meta">Total: {{ filtered.length }}</span>
    </div>

    <div class="grid">
      <ProgramCard
        v-for="prog in filtered"
        :key="prog.id"
        :p="prog"
        @enrol="enrol"
      />
    </div>

    <p v-if="!filtered.length" class="empty">No programs found.</p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProgramsStore } from '@/stores/Programs'
import ProgramCard from '@/components/ProgramCard.vue'

const store = useProgramsStore()

// filter bar
const q = ref('')
const level = ref('')

const filtered = computed(() => {
  const kw = q.value.toLowerCase()
  return store.list.filter(p => {
    const okKeyword = !kw || p.title.toLowerCase().includes(kw)
    const okLevel = !level.value || p.level === level.value
    return okKeyword && okLevel
  })
})

// Enroll（spots - 1）
function enrol(id) {
  store.signUp(id)
}
</script>

<style scoped>
.wrap { max-width: 1100px; margin: 0 auto; display: grid; gap: 16px; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ipt, .sel { padding: 8px; border: 1px solid #ddd; border-radius: 8px; }
.meta { color:#666; }

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1200px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px)  { .grid { grid-template-columns: 1fr; } }

.empty { color:#666; }
</style>

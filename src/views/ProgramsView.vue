<template>
  <h2>Programs</h2>

  <div class="grid">
    <ProgramCard
      v-for="item in list"
      :key="item.id"
      :p="item"
      @enrol="enrol"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProgramCard from '@/components/ProgramCard.vue'
import { programs } from '@/data/programs'


const list = ref([])
onMounted(() => {
  setTimeout(() => {
    list.value = programs.map(p => ({ ...p }))  
  }, 200)
})

function enrol(id) {
  const target = list.value.find(x => x.id === id)
  if (target && target.spots > 0) {
    target.spots -= 1
    alert(`Enrollment Success：${target.title}（Remain ${target.spots}）`)
  }
}
</script>

<style scoped>
.grid { display:grid; gap:12px; grid-template-columns:repeat(3, 1fr); }
@media (max-width: 992px) { .grid { grid-template-columns:repeat(2, 1fr); } }
@media (max-width: 576px) { .grid { grid-template-columns:1fr; } }
</style>


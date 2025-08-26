<template>
  <section class="wrap">
    <h2>System Management</h2>

    <!-- Add New Program -->
    <form class="row" @submit.prevent="add">
      <input v-model="title" placeholder="Program title" required />
      <input v-model="level" placeholder="Level" required />
      <input v-model.number="weeks" type="number" min="1" placeholder="Weeks" />
      <input v-model.number="spots" type="number" min="0" placeholder="Spots" />
      <button>Add Program</button>
    </form>

    <!-- Program List -->
    <ul class="list">
      <li v-for="p in store.list" :key="p.id">
        {{ p.title }} · {{ p.level }} · {{ p.weeks }} weeks · Spots: {{ p.spots }}
        <button class="del" @click="store.removeProgram(p.id)">Delete</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useProgramsStore } from '@/stores/Programs'

const store = useProgramsStore()

// Form Field
const title = ref('')
const level = ref('All')
const weeks = ref(4)
const spots = ref(10)

// Add Program
function add() {
  if (!title.value) return
  store.addProgram({
    title: title.value,
    level: level.value,
    weeks: weeks.value,
    spots: spots.value
  })
  // Reset Forms
  title.value = ''
  level.value = 'All'
  weeks.value = 4
  spots.value = 10
}
</script>

<style scoped>
.wrap {
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.del {
  margin-left: 8px;
  background: #f8d7da;
  border: 1px solid #f5c2c7;
  color: #842029;
}
.list {
  display: grid;
  gap: 6px;
  list-style: none;
  padding: 0;
}
</style>

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgramsStore = defineStore('programs', () => {
  const list = ref([
    { id: 1, title: 'Community Introductory Workshop', level: 'Beginner', weeks: 2, spots: 12 },
    { id: 2, title: 'Low-budget healthy eating', level: 'All', weeks: 4, spots: 10 },
    { id: 3, title: 'Family nutrition and meal preparation', level: 'Intermediate', weeks: 6, spots: 8 }
  ])

  function addProgram(p) {
    list.value.push({ ...p, id: Date.now() })
  }

  function removeProgram(id) {
    list.value = list.value.filter(p => p.id !== id)
  }

  function signUp(id) {
    const prog = list.value.find(p => p.id === id)
    if (prog && prog.spots > 0) prog.spots--
  }

  return { list, addProgram, removeProgram, signUp }
})
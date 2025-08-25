<template>
  <form class="form" @submit.prevent="onSubmit" novalidate>
    <label class="lbl">
      Subscribe to Weekly Nutrition Tips
      <input
        v-model.trim="email"
        type="email"
        placeholder="Enter your email to receive healthy eating tips"
        @input="clearIfTyping"
        :aria-invalid="!!error"
      />
    </label>
    <p v-if="error" class="err">{{ error }}</p>
    <button type="submit" :disabled="pending">
      {{ pending ? 'Subscribing…' : 'Subscribe' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const error = ref('')
const pending = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function onSubmit () {
  if (!email.value) {
    error.value = 'Email is required'
    return
  }
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  error.value = ''
  pending.value = true
  setTimeout(() => {
    alert(`Thanks for subscribing! We'll send nutrition tips to: ${email.value}`)
    email.value = ''
    pending.value = false
  }, 500)
}

function clearIfTyping () {
  if (error.value) error.value = ''
}
</script>

<style scoped>
.form{display:grid;gap:8px;max-width:420px}
.lbl{display:grid;gap:6px}
input{padding:8px;border:1px solid #ddd;border-radius:8px}
input[aria-invalid="true"]{border-color:#e74c3c}
.err{color:#e74c3c;font-size:14px;margin-top:-2px}
button{padding:8px 12px;border:1px solid #ddd;border-radius:8px;background:#f8f8f8;cursor:pointer}
button[disabled]{opacity:.6;cursor:not-allowed}
</style>

<template>
  <section class="wrap">
    <h2>Contact Us</h2>
    <form class="form" @submit.prevent="submit" novalidate>
      <label class="lbl">
        Name
        <input v-model.trim="name" type="text" placeholder="Your name" :aria-invalid="!!errors.name"/>
      </label>
      <p v-if="errors.name" class="err">{{ errors.name }}</p>

      <label class="lbl">
        Email
        <input v-model.trim="email" type="email" placeholder="you@example.com" :aria-invalid="!!errors.email"/>
      </label>
      <p v-if="errors.email" class="err">{{ errors.email }}</p>

      <label class="lbl">
        Message
        <textarea v-model.trim="message" rows="5" placeholder="How can we help?"
                  :aria-invalid="!!errors.message"></textarea>
      </label>
      <p v-if="errors.message" class="err">{{ errors.message }}</p>

      <button type="submit" :disabled="pending">
        {{ pending ? 'Sending…' : 'Send message' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const pending = ref(false)
const errors = reactive({ name:'', email:'', message:'' })
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate () {
  errors.name = name.value ? '' : 'Name is required'
  if (!email.value) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(email.value)) {
    errors.email = 'Please enter a valid email address'
  } else {
    errors.email = ''
  }
  const len = message.value.length
  if (!len) errors.message = 'Message is required'
  else if (len < 10) errors.message = 'Message must be at least 10 characters'
  else if (len > 200) errors.message = 'Message must be at most 200 characters'
  else errors.message = ''


  return !errors.name && !errors.email && !errors.message
}

function submit () {
  if (!validate()) return
  pending.value = true
  setTimeout(() => {
    alert('Message received. Thank you!')
    name.value = ''; email.value=''; message.value=''
    pending.value = false
  }, 600)
}
</script>

<style scoped>
.wrap{max-width:640px;margin:0 auto}
.form{display:grid;gap:10px}
.lbl{display:grid;gap:6px}
input,textarea{padding:8px;border:1px solid #ddd;border-radius:8px;width:100%}
input[aria-invalid="true"], textarea[aria-invalid="true"]{border-color:#e74c3c}
.err{color:#e74c3c;font-size:14px;margin-top:-4px}
button{padding:10px 14px;border:1px solid #ddd;border-radius:10px;background:#f8f8f8;cursor:pointer;justify-self:start}
button[disabled]{opacity:.6;cursor:not-allowed}
</style>


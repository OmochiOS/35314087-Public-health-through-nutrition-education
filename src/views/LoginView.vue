<template>
  <section class="wrap">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>

    <!-- Login -->
    <form v-if="isLogin" class="form" @submit.prevent="doLogin" novalidate>
      <label class="lbl">
        Username
        <input v-model.trim="loginUsername" type="text" placeholder="yourname" />
      </label>
      <label class="lbl">
        Password
        <input v-model.trim="loginPassword" type="password" placeholder="••••••••" />
      </label>
      <p v-if="loginError" class="err">{{ loginError }}</p>
      <button type="submit" :disabled="pending">{{ pending ? 'Signing in…' : 'Login' }}</button>

      <p class="hint">
        Don’t have an account?
        <button type="button" class="linklike" @click="goRegister">Register</button>
      </p>
    </form>

    <!-- Register -->
    <form v-else class="form" @submit.prevent="doRegister" novalidate>
      <label class="lbl">
        Username
        <input v-model.trim="regUsername" type="text" placeholder="yourname" />
      </label>
      <label class="lbl">
        Email
        <input v-model.trim="regEmail" type="email" placeholder="you@example.com" />
      </label>
      <label class="lbl">
        Password
        <input v-model.trim="regPassword" type="password" placeholder="At least 6 characters" />
      </label>
      <p v-if="regError" class="err">{{ regError }}</p>
      <button type="submit" :disabled="pending">{{ pending ? 'Creating…' : 'Create account' }}</button>

      <p class="hint">
        Already have an account?
        <button type="button" class="linklike" @click="goLogin">Login</button>
      </p>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/User' 

const route = useRoute()
const router = useRouter()
const auth = useUserStore()
const pending = ref(false)

const mode = ref(route.query.mode === 'register' ? 'register' : 'login')
watch(() => route.query.mode, (m) => { mode.value = (m === 'register') ? 'register' : 'login' })
const isLogin = computed(() => mode.value === 'login')

// Login state
const loginUsername = ref(''); const loginPassword = ref(''); const loginError = ref('')

// Register state
const regUsername = ref(''); const regEmail = ref(''); const regPassword = ref(''); const regError = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function goRegister() { router.replace({ name: 'auth', query: { mode: 'register' } }) }
function goLogin()    { router.replace({ name: 'auth', query: {} }) }

async function doLogin () {
  loginError.value = ''
  if (!loginUsername.value || !loginPassword.value) {
    loginError.value = 'Username and password are required'; return
  }
  try {
    pending.value = true
    await new Promise(r => setTimeout(r, 200))
    auth.login({ username: loginUsername.value, password: loginPassword.value })
    router.push('/')
  } catch (e) {
    loginError.value = e.message || 'Login failed'
  } finally { pending.value = false }
}

async function doRegister () {
  regError.value = ''
  if (!regUsername.value) { regError.value = 'Username is required'; return }
  if (!regEmail.value || !emailRegex.test(regEmail.value)) { regError.value = 'Valid email is required'; return }
  if (!regPassword.value || regPassword.value.length < 6) { regError.value = 'Password must be at least 6 characters'; return }

  try {
    pending.value = true
    await new Promise(r => setTimeout(r, 300))
    auth.register({ username: regUsername.value, email: regEmail.value, password: regPassword.value })
    router.push('/')
  } catch (e) {
    regError.value = e.message || 'Registration failed'
  } finally { pending.value = false }
}
</script>

<style scoped>
.wrap{max-width:420px;margin:0 auto}
.form{display:grid;gap:10px}
.lbl{display:grid;gap:6px}
input{padding:8px;border:1px solid #ddd;border-radius:8px;width:100%}
.err{color:#e74c3c}
button{padding:10px 14px;border:1px solid #ddd;border-radius:10px;background:#f8f8f8;cursor:pointer}
.hint{margin-top:10px}
.linklike{background:none;border:none;padding:0;cursor:pointer;text-decoration:underline;color:#333}
</style>

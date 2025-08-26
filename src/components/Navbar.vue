<template>
  <nav class="nav">
    <div class="brand">NutriSphere</div>

    <button class="menu" @click="openNav = !openNav" aria-label="Toggle menu">☰</button>

    <ul :class="['links', { open: openNav }]">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/programs">Programs</RouterLink></li>
      <li><RouterLink to="/resources">Resources</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>

      <!-- Not logged in: Show Login -->
      <template v-if="!auth.isLoggedIn">
        <li><RouterLink to="/login">Login</RouterLink></li>
      </template>

      <!-- Logged in: show username + dropdown -->
      <template v-else>
        <li class="user-wrap" ref="menuRef">
          <button class="user-btn" @click="openMenu = !openMenu" aria-haspopup="true" aria-expanded="openMenu">
            {{ auth.username }} ▾
          </button>
          <ul v-if="openMenu" class="dropdown" role="menu">
            <li><RouterLink to="/account" @click="closeAll">Manage Your Account</RouterLink></li>
            <li><button class="linklike" @click="logout">Logout</button></li>
          </ul>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/User' 

const auth = useUserStore()
const router = useRouter()

const openNav = ref(false)   
const openMenu = ref(false)  
const menuRef = ref(null)

function closeAll() {
  openMenu.value = false
  openNav.value = false
}
function onClickOutside(e) {
  if (!menuRef.value) return
  if (!menuRef.value.contains(e.target)) openMenu.value = false
}
function logout() {
  auth.logout()
  closeAll()
  router.push('/') 
}

onMounted(() => window.addEventListener('click', onClickOutside))
onBeforeUnmount(() => window.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}
.brand{font-weight:700}
.menu{display:none;border:1px solid #ddd;background:#f8f8f8;padding:6px 10px;border-radius:8px}
.links{display:flex;gap:16px;list-style:none;margin:0;padding:0;position:relative}
a{text-decoration:none;color:#333}
a.router-link-active{text-decoration:underline}

.user-wrap{position:relative}
.user-btn{background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:6px 10px;cursor:pointer}
.dropdown{
  position:absolute; right:0; top:34px; min-width:180px;
  background:#fff; border:1px solid #eaeaea; border-radius:10px;
  box-shadow:0 6px 18px rgba(0,0,0,.08); padding:8px; display:grid; gap:6px; z-index:20;
}
.linklike{background:none;border:none;padding:0;cursor:pointer;text-align:left;text-decoration:underline;color:#333;width:100%}

</style>
<style scoped>
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}
.brand{font-weight:1000}
.menu{display:none;border:1px solid #ddd;background:#f8f8f8;padding:6px 10px;border-radius:8px}
.links{display:flex;gap:16px;list-style:none;margin:0;padding:0}
a{text-decoration:none;color:#333}
a.router-link-active{text-decoration:underline}
@media (max-width:576px){
  .menu{display:block}
  .links{
    display:none;flex-direction:column;gap:10px;
    background:#fafafa;padding:10px;position:absolute;top:50px;right:10px;
    border:1px solid #eee;border-radius:8px
  }
  .links.open{display:flex}
}
</style>


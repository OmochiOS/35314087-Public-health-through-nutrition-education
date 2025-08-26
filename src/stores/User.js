// src/stores/User.js
import { defineStore } from 'pinia'

const LS_KEY = 'hb-auth-v1'

function loadState () {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
}
function saveState (state) { localStorage.setItem(LS_KEY, JSON.stringify(state)) }

export const useUserStore = defineStore('user', {
  state: () => ({
    users: loadState().users || [],          // [{ username, email, password, role }]
    currentUser: loadState().currentUser || null
  }),
  getters: {
    isLoggedIn: (s) => !!s.currentUser,
    role:     (s) => s.currentUser?.role || 'guest',
    username: (s) => s.currentUser?.username || ''
  },
  actions: {
    register ({ username, email, password }) {
      if (this.users.some(u => u.username === username)) throw new Error('Username already exists')
      if (this.users.some(u => u.email === email))       throw new Error('Email already registered')
      const newUser = { username, email, password, role: 'user' } // Step 7 再做密码哈希
      this.users.push(newUser)
      this.currentUser = { username, email, role: 'user' }
      saveState({ users: this.users, currentUser: this.currentUser })
    },
    login ({ username, password }) {
      const found = this.users.find(u => u.username === username && u.password === password)
      if (!found) throw new Error('Invalid username or password')
      this.currentUser = { username: found.username, email: found.email, role: found.role }
      saveState({ users: this.users, currentUser: this.currentUser })
    },
    logout () {
      this.currentUser = null
      saveState({ users: this.users, currentUser: this.currentUser })
    },
    ensureAdminSeed () {
      if (!this.users.some(u => u.username === 'admin')) {
        this.users.push({ username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' })
        saveState({ users: this.users, currentUser: this.currentUser })
      }
    }
  }
})

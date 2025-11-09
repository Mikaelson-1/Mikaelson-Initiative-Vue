<template>
  <div class="rio-shell">
    <aside class="rio-sidebar" role="navigation" aria-label="Rio sidebar">
      <h3 class="brand">Rio AI</h3>
      <ul>
        <li :class="{ active: current === 'dashboard' }" @click="current = 'dashboard'">Dashboard</li>
        <li :class="{ active: current === 'challenges' }" @click="current = 'challenges'">Challenges</li>
        <li :class="{ active: current === 'social' }" @click="current = 'social'">Social Feed</li>
        <li :class="{ active: current === 'community' }" @click="current = 'community'">Community</li>
      </ul>
    </aside>

    <main class="rio-main">
      <component :is="currentComponent" v-if="currentComponent" />
      <div v-else class="empty">Select a view from the sidebar</div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'RioAI',
  setup() {
    const current = ref<'dashboard'|'challenges'|'social'|'community'>('dashboard')

    // Lazy-load views from the main Mikaelson Frontend folder
    // Paths are relative to this file: ../../../Frontend/src/...
    const Dashboard = defineAsyncComponent(() => import('../../../Frontend/src/views/Dashboard.vue'))
    const Challenges = defineAsyncComponent(() => import('../../../Frontend/src/views/ChallengesFeed.vue'))
    const Social = defineAsyncComponent(() => import('../../../Frontend/src/views/SocialFeed.vue'))
    const Community = defineAsyncComponent(() => import('../../../Frontend/src/stores/views/Community.vue'))

    const currentComponent = computed(() => {
      switch (current.value) {
        case 'dashboard': return Dashboard
        case 'challenges': return Challenges
        case 'social': return Social
        case 'community': return Community
        default: return null
      }
    })

    return { current, currentComponent }
  }
})
</script>

<style scoped>
:root{--muted:#6b7280;--accent:#5ce1e6;--dark:#374151;--ink:#111827}
.rio-shell{display:flex;min-height:70vh;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial}
.rio-sidebar{width:260px;background:#fff;border-right:1px solid #e6e7eb;padding:1.25rem 1rem}
.rio-sidebar .brand{font-weight:800;margin:0 0 1rem;color:var(--ink)}
.rio-sidebar ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem}
.rio-sidebar li{padding:0.6rem 0.8rem;border-radius:8px;cursor:pointer;color:var(--dark);font-weight:600}
.rio-sidebar li.active{background:var(--accent);color:#fff}
.rio-sidebar li:hover{background:rgba(92,225,230,0.08)}
.rio-main{flex:1;padding:1rem;background:#f8fafc}
.empty{color:var(--muted);padding:2rem;text-align:center}

@media (max-width:900px){
  .rio-shell{flex-direction:column}
  .rio-sidebar{width:100%;display:flex;justify-content:space-between;align-items:center}
  .rio-sidebar ul{flex-direction:row;gap:0.25rem}
  .rio-main{padding:0.5rem}
}
</style>

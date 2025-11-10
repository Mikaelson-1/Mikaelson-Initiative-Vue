<template>
  <aside class="rio-sidebar">
    <!-- Logo Header -->
    <div class="sidebar-header">
      <div class="logo-section">
        <img src="/assets/images/mikaelsonlogo.png" alt="RIO" class="rio-logo" />
        <span class="brand-name">RIO Hub</span>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">Main</div>
        <ul class="nav-list">
          <li 
            v-for="item in mainNavItems" 
            :key="item.id"
            class="nav-item" 
            :class="{ active: activeTab === item.id }"
          >
            <a 
              href="#" 
              class="nav-link" 
              @click.prevent="$emit('update:activeTab', item.id)"
            >
              <i :class="['nav-icon', item.icon]"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div class="nav-section">
        <div class="nav-section-title">Tools</div>
        <ul class="nav-list">
          <li 
            v-for="item in toolsNavItems" 
            :key="item.id"
            class="nav-item"
          >
            <router-link 
              v-if="item.route" 
              :to="item.route" 
              class="nav-link"
            >
              <i :class="['nav-icon', item.icon]"></i>
              <span>{{ item.label }}</span>
            </router-link>
            <a 
              v-else 
              href="#" 
              class="nav-link"
              @click.prevent="handleToolClick(item.id)"
            >
              <i :class="['nav-icon', item.icon]"></i>
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- User Profile Footer -->
    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-info">
          <div class="user-name">John Doe</div>
          <div class="user-status">Active</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'RioSidebar',
  
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },

  emits: ['update:activeTab'],

  data() {
    return {
      mainNavItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
        { id: 'challenges', label: 'Challenges', icon: 'fas fa-trophy' },
        { id: 'social', label: 'Social Feed', icon: 'fas fa-users' }
      ],
      toolsNavItems: [
        { id: 'community', label: 'Community', icon: 'fas fa-comments', route: { name: 'Community' } },
        { id: 'settings', label: 'Settings', icon: 'fas fa-cog', route: null }
      ]
    }
  },

  methods: {
    handleToolClick(toolId) {
      // Handle tool clicks that don't have routes
      console.log('Tool clicked:', toolId)
    }
  }
}
</script>

<style scoped>
.rio-sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rio-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 0;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #111827;
}

.nav-item.active .nav-link {
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(59, 130, 246, 0.1));
  color: #5ce1e6;
  border-right: 3px solid #5ce1e6;
}

.nav-icon {
  width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.user-status {
  font-size: 0.75rem;
  color: #10b981;
}

@media (max-width: 1024px) {
  .rio-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .rio-sidebar.mobile-open {
    transform: translateX(0);
  }
}
</style>

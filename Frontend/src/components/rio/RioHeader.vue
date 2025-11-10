<template>
  <header class="rio-header">
    <div class="header-left">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <p class="page-subtitle">{{ pageSubtitle }}</p>
    </div>
    <div class="header-right">
      <button class="header-btn" @click="$emit('notification-click')" aria-label="Notifications">
        <i class="fas fa-bell"></i>
        <span v-if="notificationCount" class="notification-badge">{{ notificationCount }}</span>
      </button>
      <button class="header-btn" @click="$emit('search-click')" aria-label="Search">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'RioHeader',
  
  props: {
    activeTab: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['notification-click', 'search-click'],

  data() {
    return {
      notificationCount: 3
    }
  },

  computed: {
    pageTitle() {
      const titles = {
        dashboard: 'Dashboard',
        challenges: 'Challenges',
        social: 'Social Feed'
      }
      return titles[this.activeTab] || 'RIO Hub'
    },

    pageSubtitle() {
      const subtitles = {
        dashboard: 'Track your progress and stay accountable',
        challenges: 'Join challenges and compete with your community',
        social: 'Connect with your community and share your journey'
      }
      return subtitles[this.activeTab] || 'Welcome to RIO Hub'
    }
  }
}
</script>

<style scoped>
.rio-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 0.75rem;
}

.header-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

@media (max-width: 768px) {
  .rio-header {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }
}
</style>

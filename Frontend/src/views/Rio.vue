<template>
  <div class="rio-app">
    <!-- PWA Install Banner -->
    <transition name="slide-down">
      <div v-if="showInstallBanner" class="pwa-install-banner">
        <div class="banner-content">
          <i class="fas fa-download"></i>
          <span>Install RIO Hub for a better experience</span>
        </div>
        <div class="banner-actions">
          <button @click="installPWA" class="btn-install">Install</button>
          <button @click="dismissInstallBanner" class="btn-dismiss">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Offline Indicator -->
    <transition name="slide-down">
      <div v-if="!isOnline" class="offline-indicator">
        <i class="fas fa-wifi"></i>
        <span>You're offline. Some features may be limited.</span>
      </div>
    </transition>

    <!-- Update Available Banner -->
    <transition name="slide-down">
      <div v-if="showUpdateBanner" class="update-banner">
        <div class="banner-content">
          <i class="fas fa-sync-alt"></i>
          <span>New version available!</span>
        </div>
        <div class="banner-actions">
          <button @click="reloadApp" class="btn-update">Update</button>
          <button @click="dismissUpdateBanner" class="btn-dismiss">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- Sidebar Navigation -->
    <RioSidebar 
      :active-tab="activeTab" 
      @update:activeTab="handleTabChange"
    />

    <!-- Main Content Area -->
    <main class="rio-main">
      <!-- Top Header -->
      <RioHeader 
        :active-tab="activeTab"
        :user="currentUser"
      />

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Dashboard Tab -->
        <RioDashboard v-if="activeTab === 'dashboard'" />

        <!-- Challenges Tab -->
        <RioChallenges v-else-if="activeTab === 'challenges'" />

        <!-- Social Feed Tab -->
        <RioSocial v-else-if="activeTab === 'social'" />
      </div>
    </main>
  </div>
</template>

<script>
import RioSidebar from '@/components/rio/RioSidebar.vue'
import RioHeader from '@/components/rio/RioHeader.vue'
import RioDashboard from '@/components/rio/RioDashboard.vue'
import RioChallenges from '@/components/rio/RioChallenges.vue'
import RioSocial from '@/components/rio/RioSocial.vue'
import {
  registerServiceWorker,
  setupInstallPrompt,
  promptInstall,
  isAppInstalled,
  setupNetworkListeners,
  requestNotificationPermission
} from '@/utils/pwa'

export default {
  name: 'Rio',
  
  components: {
    RioSidebar,
    RioHeader,
    RioDashboard,
    RioChallenges,
    RioSocial
  },

  data() {
    return {
      activeTab: 'dashboard',
      currentUser: {
        name: 'John Doe',
        avatar: null,
        status: 'Active'
      },
      showInstallBanner: false,
      showUpdateBanner: false,
      isOnline: navigator.onLine
    }
  },

  methods: {
    handleTabChange(newTab) {
      this.activeTab = newTab
    },

    async installPWA() {
      const installed = await promptInstall()
      if (installed) {
        this.showInstallBanner = false
      }
    },

    dismissInstallBanner() {
      this.showInstallBanner = false
      localStorage.setItem('pwa-install-dismissed', 'true')
    },

    dismissUpdateBanner() {
      this.showUpdateBanner = false
    },

    reloadApp() {
      window.location.reload()
    },

    handleOnline() {
      this.isOnline = true
      console.log('[RIO] App is online')
    },

    handleOffline() {
      this.isOnline = false
      console.log('[RIO] App is offline')
    },

    async initializePWA() {
      try {
        // Register service worker
        await registerServiceWorker()
        
        // Setup install prompt
        setupInstallPrompt()
        
        // Setup network listeners
        setupNetworkListeners(this.handleOnline, this.handleOffline)
        
        // Request notification permission
        await requestNotificationPermission()
        
        console.log('[RIO] PWA initialized successfully')
      } catch (error) {
        console.error('[RIO] PWA initialization failed:', error)
      }
    }
  },

  mounted() {
    // Initialize PWA features
    this.initializePWA()
    
    // Check if should show install banner
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (!dismissed && !isAppInstalled()) {
      setTimeout(() => {
        this.showInstallBanner = true
      }, 3000) // Show after 3 seconds
    }
    
    // Listen for PWA events
    window.addEventListener('pwa-install-available', () => {
      this.showInstallBanner = true
    })
    
    window.addEventListener('pwa-install-completed', () => {
      this.showInstallBanner = false
    })
    
    window.addEventListener('pwa-update-available', () => {
      this.showUpdateBanner = true
    })
    
    // Load user data from store or API
    // this.loadUserData()
  },

  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('pwa-install-available', () => {})
    window.removeEventListener('pwa-install-completed', () => {})
    window.removeEventListener('pwa-update-available', () => {})
  }
}
</script>

<style scoped>
.rio-app {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.rio-main {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
}

/* PWA Banners */
.pwa-install-banner,
.offline-indicator,
.update-banner {
  position: fixed;
  top: 0;
  left: 280px;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pwa-install-banner {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: white;
}

.offline-indicator {
  background: #f59e0b;
  color: white;
}

.update-banner {
  background: #10b981;
  color: white;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.banner-content i {
  font-size: 1.25rem;
}

.banner-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-install,
.btn-update {
  padding: 0.5rem 1.5rem;
  background: white;
  color: #111827;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-install:hover,
.btn-update:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-dismiss {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-dismiss:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

@media (max-width: 1024px) {
  .rio-main {
    margin-left: 0;
  }
  
  .pwa-install-banner,
  .offline-indicator,
  .update-banner {
    left: 0;
    padding: 0.75rem 1rem;
  }
  
  .banner-content span {
    font-size: 0.875rem;
  }
}
</style>

<template>
  <div class="admin-page">
    <!-- Login View -->
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-box">
        <div class="login-header">
          <img src="/assets/images/mikaelsonlogo.png" alt="Logo" class="login-logo" />
          <h1 class="login-title">Admin Login</h1>
          <p class="login-subtitle">Enter your credentials to access the admin panel</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="loginForm.username"
              class="form-input"
              placeholder="admin"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="loginForm.password"
              class="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div v-if="loginError" class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            {{ loginError }}
          </div>

          <button type="submit" class="login-btn" :disabled="isLoggingIn">
            <span v-if="!isLoggingIn">Sign In</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
              Signing in...
            </span>
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="back-home">
            <i class="fas fa-arrow-left"></i>
            Back to Home
          </router-link>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard (shown when authenticated) -->
    <div v-else>
      <!-- Minimal Top Bar -->
      <header class="topbar">
        <div class="topbar-left">
          <img src="/assets/images/mikaelsonlogo.png" alt="Logo" class="logo" />
          <span class="brand">Admin</span>
        </div>
        <div class="topbar-right">
          <button @click="handleLogout" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </button>
          <router-link to="/" class="back-link">
            <i class="fas fa-arrow-left"></i>
            Back to Site
          </router-link>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main">
        <div class="container">
          <!-- Page Title -->
          <div class="page-header">
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Overview of your platform</p>
          </div>

          <!-- Stats Grid -->
          <div class="stats">
            <div class="stat-box">
              <div class="stat-label">Total Users</div>
              <div class="stat-value">1,234</div>
              <div class="stat-change positive">+12% this month</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Waitlist</div>
              <div class="stat-value">156</div>
              <div class="stat-change positive">+8% this month</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Engagement</div>
              <div class="stat-value">89%</div>
              <div class="stat-change positive">+24% this month</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Messages</div>
              <div class="stat-value">45</div>
              <div class="stat-change neutral">No change</div>
            </div>
          </div>

          <!-- Waitlist Section -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">Recent Waitlist Signups</h2>
              <router-link to="/waitlist" class="view-all">View All →</router-link>
            </div>
            <div class="table-wrapper">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 8" :key="i">
                    <td><strong>User {{ i }}</strong></td>
                    <td class="text-gray">user{{ i }}@example.com</td>
                    <td class="text-gray">Nov {{ 20 + i }}, 2025</td>
                    <td><span class="badge">Community</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="section">
            <h2 class="section-title">Quick Actions</h2>
            <div class="actions">
              <button class="action">
                <i class="fas fa-download"></i>
                <span>Export Data</span>
              </button>
              <router-link to="/waitlist" class="action">
                <i class="fas fa-list"></i>
                <span>View Waitlist</span>
              </router-link>
              <button class="action">
                <i class="fas fa-chart-bar"></i>
                <span>Analytics</span>
              </button>
              <button class="action">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'Admin',
  setup() {
    const isAuthenticated = ref(false);
    const isLoggingIn = ref(false);
    const loginError = ref('');

    const loginForm = reactive({
      username: '',
      password: ''
    });

    // Check if already logged in (from localStorage)
    onMounted(() => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth === 'true') {
        isAuthenticated.value = true;
      }
    });

    const handleLogin = async () => {
      loginError.value = '';
      isLoggingIn.value = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple authentication check (you can replace with real API call)
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        isAuthenticated.value = true;
        localStorage.setItem('adminAuth', 'true');
        loginForm.username = '';
        loginForm.password = '';
      } else {
        loginError.value = 'Invalid username or password';
      }

      isLoggingIn.value = false;
    };

    const handleLogout = () => {
      isAuthenticated.value = false;
      localStorage.removeItem('adminAuth');
      loginForm.username = '';
      loginForm.password = '';
    };

    return {
      isAuthenticated,
      isLoggingIn,
      loginError,
      loginForm,
      handleLogin,
      handleLogout
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.admin-page {
  min-height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Login Styles */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.login-box {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 420px;
  border: 1px solid #e9ecef;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 0.875rem;
  color: #6c757d;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #495057;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #20c9c0;
  box-shadow: 0 0 0 3px rgba(32, 201, 192, 0.1);
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #f5c6cb;
}

.login-btn {
  padding: 0.875rem 1.5rem;
  background: #20c9c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  background: #1ab3aa;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.back-home {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.back-home:hover {
  color: #212529;
}

/* Top Bar */
.topbar {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.brand {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212529;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  color: white;
  background: #20c9c0;
  border: 1px solid #20c9c0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #1ab3aa;
  border-color: #1ab3aa;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.3);
}

.back-link {
  color: white;
  background: #20c9c0;
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid #20c9c0;
}

.back-link:hover {
  background: #1ab3aa;
  border-color: #1ab3aa;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.3);
}

/* Main Content */
.main {
  padding: 3rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1rem;
  color: #6c757d;
}

/* Stats Grid */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-box {
  background: rgba(92, 225, 230, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #20c9c0;
  transition: all 0.2s;
}

.stat-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.2);
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: #198754;
}

.stat-change.neutral {
  color: #6c757d;
}

/* Section */
.section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}

.view-all {
  color: #20c9c0;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.view-all:hover {
  opacity: 0.8;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.table thead {
  background: #f8f9fa;
}

.table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e9ecef;
}

.table td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #212529;
  border-bottom: 1px solid #f8f9fa;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background: #f8f9fa;
}

.text-gray {
  color: #6c757d;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e7f5ff;
  color: #1864ab;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Actions */
.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action {
  background: rgba(92, 225, 230, 0.1);
  border: 1px solid #20c9c0;
  padding: 1.25rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: #212529;
  font-size: 0.875rem;
  font-weight: 500;
}

.action:hover {
  background: #20c9c0;
  border-color: #20c9c0;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 201, 192, 0.3);
}

.action i {
  font-size: 1.25rem;
  color: inherit;
}

/* Responsive */
@media (max-width: 768px) {
  .login-box {
    padding: 2rem 1.5rem;
  }

  .main {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 1.5rem;
  }

  .topbar {
    padding: 1rem;
  }

  .topbar-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .actions {
    grid-template-columns: 1fr;
  }
}
</style>

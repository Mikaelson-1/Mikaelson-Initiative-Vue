<template>
  <div>
    <!-- Navigation -->
    <Navbar />
    
    <div class="waitlist-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-rocket"></i>
          <span>Coming Soon</span>
        </div>
        <h1 class="hero-title">Join the Waitlist</h1>
        <p class="hero-subtitle">
          Be among the first to experience the future of personal transformation. 
          Get exclusive early access and special perks when we launch.
        </p>
      </div>
      
      <div class="hero-visual">
        <div class="floating-card card-1">
          <i class="fas fa-star"></i>
          <span>Premium Features</span>
        </div>
        <div class="floating-card card-2">
          <i class="fas fa-users"></i>
          <span>Community Access</span>
        </div>
        <div class="floating-card card-3">
          <i class="fas fa-trophy"></i>
          <span>Early Rewards</span>
        </div>
      </div>
    </section>

    <!-- Waitlist Form Section -->
    <section class="form-section">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">Reserve Your Spot</h2>
          <p class="form-description">Join {{ waitlistCount }} others already on the list</p>
        </div>

        <form @submit.prevent="submitWaitlist" class="waitlist-form">
          <div class="form-group">
            <label for="name" class="form-label">
              <i class="fas fa-user"></i>
              Your Name *
            </label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              class="form-input"
              placeholder="John Doe"
              required 
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">
              <i class="fas fa-envelope"></i>
              Email Address *
            </label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              class="form-input"
              placeholder="john.doe@example.com"
              required 
            />
          </div>

          <div class="form-group">
            <label for="interest" class="form-label">
              <i class="fas fa-lightbulb"></i>
              What interests you most?
            </label>
            <select id="interest" v-model="formData.interest" class="form-input">
              <option value="">Select an option</option>
              <option value="habits">Habit Tracking</option>
              <option value="community">Community Features</option>
              <option value="challenges">Challenges & Competitions</option>
              <option value="analytics">Personal Analytics</option>
              <option value="all">Everything!</option>
            </select>
          </div>

          <div class="form-group">
            <label for="referral" class="form-label">
              <i class="fas fa-user-friends"></i>
              How did you hear about us?
            </label>
            <input 
              type="text" 
              id="referral" 
              v-model="formData.referral" 
              class="form-input"
              placeholder="Friend, social media, etc."
            />
          </div>

          <div class="form-checkbox">
            <input 
              type="checkbox" 
              id="newsletter" 
              v-model="formData.newsletter" 
              class="checkbox-input"
            />
            <label for="newsletter" class="checkbox-label">
              I want to receive updates and exclusive content via email
            </label>
          </div>

          <button 
            type="submit" 
            class="submit-btn"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane"></i>
              Join the Waitlist
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
              Submitting...
            </span>
          </button>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>Welcome aboard! 🎉</h3>
          <p>Thanks {{ formData.name }}! We'll send you updates at {{ formData.email }}</p>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <h2 class="section-title">Why Join Early?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <h3 class="benefit-title">Early Access</h3>
          <p class="benefit-description">
            Be the first to try new features and shape the product's future
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-gift"></i>
          </div>
          <h3 class="benefit-title">Exclusive Perks</h3>
          <p class="benefit-description">
            Get special rewards, discounts, and lifetime benefits
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-crown"></i>
          </div>
          <h3 class="benefit-title">Founder Status</h3>
          <p class="benefit-description">
            Receive a special badge and recognition as a founding member
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3 class="benefit-title">Direct Input</h3>
          <p class="benefit-description">
            Help us build features that matter most to you
          </p>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="social-proof">
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-number">{{ waitlistCount }}+</div>
          <div class="stat-label">On Waitlist</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">50+</div>
          <div class="stat-label">Countries</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">95%</div>
          <div class="stat-label">Satisfaction</div>
        </div>
      </div>
    </section>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Waitlist',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const waitlistCount = ref(1247);
    const isSubmitting = ref(false);
    const showSuccess = ref(false);

    const formData = reactive({
      name: '',
      email: '',
      interest: '',
      referral: '',
      newsletter: true
    });

    const submitWaitlist = async () => {
      isSubmitting.value = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      showSuccess.value = true;
      waitlistCount.value += 1;
      isSubmitting.value = false;

      // Hide form
      setTimeout(() => {
        // Reset form (optional)
        // formData.firstName = '';
        // formData.lastName = '';
        // etc.
      }, 2000);
    };

    return {
      formData,
      waitlistCount,
      isSubmitting,
      showSuccess,
      submitWaitlist
    };
  }
};
</script>

<style scoped>
.waitlist-container {
  min-height: 100vh;
  background: rgba(92, 225, 230, 0.5);
  padding: 2rem;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  color: #111827;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;
  text-shadow: none;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #374151;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

.hero-visual {
  margin-top: 3rem;
  position: relative;
  height: 200px;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 1.25rem 1.75rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #374151;
  animation: floatCard 4s ease-in-out infinite;
}

.floating-card i {
  font-size: 1.5rem;
  color: #20c9c0;
}

.card-1 {
  left: 10%;
  top: 20px;
  animation-delay: 0s;
}

.card-2 {
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  animation-delay: 0.5s;
}

.card-3 {
  right: 10%;
  top: 20px;
  animation-delay: 1s;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
}

/* Form Section */
.form-section {
  max-width: 600px;
  margin: 0 auto 4rem;
}

.form-container {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.form-description {
  color: #6b7280;
  font-size: 1rem;
}

.waitlist-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-label i {
  color: #20c9c0;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.form-input:focus {
  outline: none;
  border-color: #20c9c0;
  box-shadow: 0 0 0 4px rgba(32, 201, 192, 0.1);
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 10px;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #20c9c0;
}

.checkbox-label {
  color: #4b5563;
  font-size: 0.9rem;
  cursor: pointer;
}

.submit-btn {
  padding: 1.125rem 2rem;
  background: #20c9c0;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(32, 201, 192, 0.4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(32, 201, 192, 0.5);
  background: #1ab3aa;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border-radius: 16px;
  margin-top: 2rem;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-message i {
  font-size: 3rem;
  color: #059669;
  margin-bottom: 1rem;
}

.success-message h3 {
  font-size: 1.5rem;
  color: #065f46;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #047857;
}

/* Benefits Section */
.benefits-section {
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 3rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 3rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.benefit-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background: #20c9c0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-icon i {
  font-size: 2rem;
  color: white;
}

.benefit-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
}

.benefit-description {
  color: #6b7280;
  line-height: 1.6;
}

/* Social Proof */
.social-proof {
  max-width: 900px;
  margin: 0 auto 4rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Footer */
.waitlist-footer {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111827;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  transition: all 0.3s;
}

.footer-link:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: 2rem 1.5rem;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .floating-card {
    font-size: 0.85rem;
    padding: 0.75rem 1rem;
  }

  .card-1, .card-3 {
    left: 5%;
    right: auto;
  }

  .card-3 {
    left: auto;
    right: 5%;
  }
}
</style>

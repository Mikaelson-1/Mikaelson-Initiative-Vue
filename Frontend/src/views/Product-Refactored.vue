<template>
  <div class="product-page">
    <Navbar />

    <!-- Hero Section -->
    <ProductHero :animated-lines="animatedLines" :is-chip-active="isChipActive" />

    <!-- Core Features Section -->
    <ProductFeatures 
      :visible-features="visibleFeatures" 
      ref="featuresSection" 
    />

    <!-- Products Grid Section -->
    <ProductsGrid 
      :products="products" 
      :visible-cards="visibleCards" 
      ref="productsSection" 
    />

    <!-- How It Works Section -->
    <HowItWorks 
      :visible-steps="visibleSteps" 
      ref="howItWorksSection" 
    />

    <!-- RIO Hub Section -->
    <RioHubIntro 
      :hub-visible="hubVisible" 
      ref="rioHubSection" 
    />

    <!-- Testimonials Section -->
    <ProductTestimonials :testimonials="testimonials" />

    <!-- Final CTA -->
    <ProductCTA />

    <Footer />

    <!-- Mouse Glow Effect -->
    <div 
      class="mouse-glow" 
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ProductHero from '@/components/product/ProductHero.vue'
import ProductFeatures from '@/components/product/ProductFeatures.vue'
import ProductsGrid from '@/components/product/ProductsGrid.vue'
import HowItWorks from '@/components/product/HowItWorks.vue'
import RioHubIntro from '@/components/product/RioHubIntro.vue'
import ProductTestimonials from '@/components/product/ProductTestimonials.vue'
import ProductCTA from '@/components/product/ProductCTA.vue'
import { useProductAnimations } from '@/composables/useProductAnimations'

export default {
  name: 'Product',
  components: {
    Navbar,
    Footer,
    ProductHero,
    ProductFeatures,
    ProductsGrid,
    HowItWorks,
    RioHubIntro,
    ProductTestimonials,
    ProductCTA
  },
  setup() {
    const featuresSection = ref(null)
    const productsSection = ref(null)
    const howItWorksSection = ref(null)
    const rioHubSection = ref(null)
    const isChipActive = ref(false)

    // Use animation composable
    const {
      visibleCards,
      visibleSteps,
      visibleFeatures,
      hubVisible,
      mouseX,
      mouseY,
      initialize,
      cleanup
    } = useProductAnimations()

    // Animated lines for hero
    const animatedLines = [
      { path: 'M 100 400 Q 300 200, 500 400 T 900 400', dotX: 100, dotY: 400 },
      { path: 'M 200 600 Q 400 400, 600 600 T 1000 600', dotX: 200, dotY: 600 },
      { path: 'M 150 200 Q 350 100, 550 200 T 950 200', dotX: 150, dotY: 200 }
    ]

    // Products data
    const products = [
      {
        id: 'hub',
        title: 'RIO Hub',
        description: 'Track academic progress, study habits, and engagement. Empower students and educators with data-driven insights for better learning outcomes.',
        image: '/assets/images/product-hub.svg',
        features: ['Student progress tracking', 'Educator effectiveness analytics', 'Institutional insights dashboard']
      }
    ]

    // Testimonials data
    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'Community Manager',
        text: 'RIO AI transformed how our community stays productive. The habit tracking and leaderboard features keep everyone motivated!',
        avatar: '/assets/images/avatar1.jpg'
      },
      {
        name: 'Michael Chen',
        role: 'Student Leader',
        text: 'The unified dashboard makes it so easy to manage my study habits and connect with peers. Game-changer for productivity!',
        avatar: '/assets/images/avatar2.jpg'
      }
    ]

    onMounted(() => {
      setTimeout(() => {
        isChipActive.value = true
      }, 500)

      // Initialize animations
      initialize({
        featuresSection: featuresSection.value,
        productsSection: productsSection.value,
        howItWorksSection: howItWorksSection.value,
        rioHubSection: rioHubSection.value
      })
    })

    onUnmounted(() => {
      cleanup()
    })

    return {
      featuresSection,
      productsSection,
      howItWorksSection,
      rioHubSection,
      isChipActive,
      animatedLines,
      products,
      testimonials,
      visibleCards,
      visibleSteps,
      visibleFeatures,
      hubVisible,
      mouseX,
      mouseY
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/product/animations.css';
@import '@/assets/styles/product/features.css';
@import '@/assets/styles/product/sections.css';

/* Base Styles */
.product-page {
  background: #ffffff;
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
}
</style>

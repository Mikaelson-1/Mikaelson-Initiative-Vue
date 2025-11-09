<template>
  <div class="product-page">
    <Navbar />

    <!-- Hero Section with Vite-inspired animations -->
    <section class="hero-vite">
      <!-- Animated background lines -->
      <div class="hero-visuals">
        <svg class="hero-lines" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#5ce1e6" stop-opacity="0" />
              <stop offset="20%" stop-color="#5ce1e6" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#5ce1e6" stop-opacity="0.8" />
              <stop offset="80%" stop-color="#5ce1e6" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#5ce1e6" stop-opacity="0" />
            </linearGradient>
            <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#5ce1e6" stop-opacity="1" />
              <stop offset="100%" stop-color="#5ce1e6" stop-opacity="0" />
            </radialGradient>
          </defs>
          
          <!-- Animated lines -->
          <g v-for="(line, index) in animatedLines" :key="index" class="line-group">
            <path :d="line.path" stroke="url(#lineGradient)" stroke-width="2" fill="none" class="animated-line" :style="{ animationDelay: `${index * 0.3}s` }" />
            <circle :cx="line.dotX" :cy="line.dotY" r="4" fill="#5ce1e6" class="animated-dot" :style="{ animationDelay: `${index * 0.3}s` }">
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      <div class="hero-content container">
        <h1 class="hero-title">
          The Productivity Companion
          <br />
          <span class="gradient-text">for Communities</span>
        </h1>
        
        <p class="hero-subtitle">
          RIO AI is a blazing fast productivity platform powering the next generation of community-driven applications.
        </p>
        
        <div class="hero-actions">
          <router-link class="btn btn-primary" :to="{ name: 'Signup' }">
            Get Started
          </router-link>
          <router-link class="btn btn-secondary" :to="{ name: 'ProductDetail', params: { id: 'hub' } }">
            Learn More
          </router-link>
        </div>
      </div>
      
      <!-- Floating Vite-style chip -->
      <div class="vite-chip" :class="{ active: isChipActive }">
        <div class="chip-background">
          <div class="chip-border"></div>
          <div class="chip-edge"></div>
        </div>
        <div class="chip-content">
          <span class="chip-text">RIO</span>
        </div>
      </div>
    </section>

    <!-- Core Features Section -->
    <section class="features-showcase" ref="featuresSection">
      <div class="container">
        <h2 class="section-title">Core Features</h2>
        <p class="section-subtitle">Everything you need to build productive habits and stay accountable</p>
        
        <div class="features-grid">
          <!-- Feature 1: Unified Experience -->
          <div 
            class="feature-box" 
            :class="{ 'feature-visible': visibleFeatures.includes(0) }"
            style="animation-delay: 0s"
          >
            <div class="feature-visual">
              <div class="visual-container unified-visual">
                <div class="unified-icon">🧩</div>
                <div class="connection-dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </div>
            <h3>Unified Experience</h3>
            <p>Combine Community, Challenge, and Dashboard into a single, intuitive post-login environment and social feed.</p>
          </div>

          <!-- Feature 2: Habit Dashboard -->
          <div 
            class="feature-box" 
            :class="{ 'feature-visible': visibleFeatures.includes(1) }"
            style="animation-delay: 0.15s"
          >
            <div class="feature-visual">
              <div class="visual-container dashboard-visual">
                <div class="dashboard-grid">
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                </div>
              </div>
            </div>
            <h3>Habit Dashboard</h3>
            <p>Create new habits and monitor progress in real-time. Track your productivity journey with intuitive visualizations.</p>
          </div>

          <!-- Feature 3: Leaderboard -->
          <div 
            class="feature-box" 
            :class="{ 'feature-visible': visibleFeatures.includes(2) }"
            style="animation-delay: 0.3s"
          >
            <div class="feature-visual">
              <div class="visual-container leaderboard-visual">
                <div class="leaderboard-bars">
                  <div class="bar bar-1"></div>
                  <div class="bar bar-2"></div>
                  <div class="bar bar-3"></div>
                  <div class="bar bar-4"></div>
                </div>
              </div>
            </div>
            <h3>Leaderboard</h3>
            <p>See the top productive people in your community. Stay motivated through friendly competition and recognition.</p>
          </div>

          <!-- Feature 4: Social Feed -->
          <div 
            class="feature-box" 
            :class="{ 'feature-visible': visibleFeatures.includes(3) }"
            style="animation-delay: 0.45s"
          >
            <div class="feature-visual">
              <div class="visual-container social-visual">
                <div class="feed-items">
                  <div class="feed-item"></div>
                  <div class="feed-item"></div>
                  <div class="feed-item"></div>
                </div>
              </div>
            </div>
            <h3>Social Feed</h3>
            <p>Tweet updates and watch videos simultaneously. Engage with your community while staying productive.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section" ref="productsSection">
      <div class="products-container">
        <div class="products-header">
          <h2 class="products-title">RIO Hub Solutions</h2>
          <div class="search-filter">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search ecosystems..." 
              class="search-input"
            />
          </div>
        </div>

        <div class="products-intro">
          <p>
            <strong>RIO Hub</strong> is an intelligent productivity platform designed to transform how communities track progress, build habits, and achieve goals. By combining real-time analytics, AI-driven insights, and collaborative accountability tools, RIO Hub empowers individuals and organizations across every industry to optimize their workflows and maximize their potential.
          </p>
          <p>
            Whether you're in education, business, creative industries, or public service, RIO Hub adapts to your unique ecosystem—delivering personalized recommendations, actionable metrics, and the tools you need to drive meaningful improvement and sustainable success.
          </p>
        </div>
        
        <div class="products-grid-large">
          <div 
            class="product-venue-card" 
            v-for="(product, index) in filteredPaginatedProducts" 
            :key="product.id"
            :class="[
              'card-visible',
              `card-${getProductColor(product.id)}`
            ]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="venue-visual">
              <div class="venue-title-outline">{{ product.title }}</div>
              <div class="venue-icon-large">{{ getProductIcon(product.id) }}</div>
              <div class="venue-decoration"></div>
            </div>
            
            <div class="venue-footer">
              <div class="venue-info">
                <span class="venue-category">
                  <i class="fas fa-tag"></i> {{ getProductCategory(product.id) }}
                </span>
              </div>
              <button @click="openModal(product)" class="venue-btn">
                Explore <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Pagination Controls -->
        <div class="pagination-controls" v-if="totalPages > 1">
          <button class="nav-arrow" @click="prevPage" :disabled="currentPage === 1">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="page-dots">
            <span 
              v-for="page in totalPages" 
              :key="page" 
              :class="['dot', { active: currentPage === page }]"
              @click="goToPage(page)"
            ></span>
          </div>
          <button class="nav-arrow" @click="nextPage" :disabled="currentPage === totalPages">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
      </div>
    </section>

    <!-- Product Modal -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-icon">{{ getProductIcon(selectedProduct?.id) }}</div>
              <h2>{{ selectedProduct?.title }}</h2>
              <span class="modal-category">{{ getProductCategory(selectedProduct?.id) }}</span>
            </div>
            
            <div class="modal-body">
              <!-- YouTube Video Section -->
              <div class="modal-video">
                <h3>See How It Works</h3>
                <div class="video-container">
                  <iframe 
                    :src="getProductVideoUrl(selectedProduct?.id)" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <h3>How RIO Hub Solves This</h3>
              <p class="modal-description">{{ selectedProduct?.description }}</p>
              
              <div class="modal-features">
                <h4>Key Features</h4>
                <ul>
                  <li v-for="feature in selectedProduct?.features" :key="feature">
                    <i class="fas fa-check-circle"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <div class="modal-solution">
                <h4>The Solution</h4>
                <p>{{ getProductSolution(selectedProduct?.id) }}</p>
              </div>
            </div>
            
            <div class="modal-footer">
              <router-link to="/signup" class="modal-btn primary">
                Get Started <i class="fas fa-arrow-right"></i>
              </router-link>
              <button @click="closeModal" class="modal-btn secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- How It Works -->
    <section class="how-it-works" ref="howItWorksSection">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        
        <!-- Animated connection lines -->
        <svg class="connection-lines" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#5ce1e6" stop-opacity="0" />
              <stop offset="50%" stop-color="#5ce1e6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#5ce1e6" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path 
            class="flow-line" 
            d="M 200 100 L 600 100" 
            stroke="url(#lineGradientFlow)" 
            stroke-width="2" 
            fill="none"
          />
          <path 
            class="flow-line" 
            d="M 600 100 L 1000 100" 
            stroke="url(#lineGradientFlow)" 
            stroke-width="2" 
            fill="none"
          />
          <circle class="flow-dot" cx="200" cy="100" r="4" fill="#5ce1e6" />
          <circle class="flow-dot" cx="600" cy="100" r="4" fill="#5ce1e6" />
          <circle class="flow-dot" cx="1000" cy="100" r="4" fill="#5ce1e6" />
        </svg>
        
        <div class="steps">
          <div 
            class="step" 
            v-for="(step, index) in steps" 
            :key="index"
            :class="{ 'step-visible': visibleSteps.includes(index) }"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">What Our Users Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial">
            <p>"RIO Hub transformed how we manage community projects. The AI insights are game-changing."</p>
            <cite>- Sarah Johnson, Community Manager</cite>
          </div>
          <div class="testimonial">
            <p>"The energy optimization features helped us reduce costs by 30%. Highly recommend!"</p>
            <cite>- Michael Chen, Sustainability Lead</cite>
          </div>
          <div class="testimonial">
            <p>"RIO Accelerator sped up our program delivery. It's like having an expert team on call."</p>
            <cite>- Amina Hassan, Program Director</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="container">
        <h2>Ready to Transform Your Community?</h2>
        <p>Join thousands of organizations using RIO AI to drive meaningful change</p>
        <div class="cta-buttons">
          <router-link class="btn primary" :to="{ name: 'Signup' }">Start Free Trial</router-link>
          <router-link class="btn secondary" :to="{ name: 'ContactUs' }">Contact Sales</router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Product',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      visibleFeatures: [],
      visibleCards: [],
      visibleSteps: [],
      hubVisible: false,
      currentPage: 1,
      itemsPerPage: 4,
      searchQuery: '',
      showModal: false,
      selectedProduct: null,
      steps: [
        {
          title: 'Choose Your Product',
          description: 'Select the RIO AI tool that fits your needs'
        },
        {
          title: 'Integrate & Customize',
          description: 'Seamlessly integrate with your existing workflows'
        },
        {
          title: 'Scale & Grow',
          description: 'Monitor impact and scale your initiatives'
        }
      ],
      products: [
        {
          id: 'hub-education',
          title: 'RIO Hub for Education',
          description: 'Track academic progress, study habits, and engagement. Empower students and educators with data-driven insights for better learning outcomes.',
          image: '/assets/images/product-hub.svg',
          features: ['Student progress tracking', 'Educator effectiveness analytics', 'Institutional insights dashboard']
        },
        {
          id: 'hub-corporate',
          title: 'RIO Hub for Companies',
          description: 'Boost workplace productivity and employee engagement. Track team performance, collaboration metrics, and professional development goals.',
          image: '/assets/images/product-hub.svg',
          features: ['Team productivity analytics', 'Employee engagement tracking', 'Performance insights dashboard']
        },
        {
          id: 'hub-creators',
          title: 'RIO Hub for Content Creators',
          description: 'Manage content schedules, track creative output, and build consistent habits. Stay accountable to your audience and creative goals.',
          image: '/assets/images/product-hub.svg',
          features: ['Content calendar management', 'Creative habit tracking', 'Audience engagement metrics']
        },
        {
          id: 'hub-developers',
          title: 'RIO Hub for Developers',
          description: 'Track coding habits, project milestones, and technical skill development. Build consistent development practices and collaborate effectively.',
          image: '/assets/images/product-hub.svg',
          features: ['Code contribution tracking', 'Project milestone management', 'Technical skill progression']
        },
        {
          id: 'hub-startups',
          title: 'RIO Hub for Startups',
          description: 'Monitor innovation cycles, team productivity, and startup growth metrics. Foster a culture of accountability and rapid iteration.',
          image: '/assets/images/product-hub.svg',
          features: ['Sprint tracking', 'Team velocity metrics', 'Innovation pipeline management']
        },
        {
          id: 'hub-government',
          title: 'RIO Hub for Government',
          description: 'Enhance public sector productivity and service delivery. Track project timelines, citizen engagement, and departmental performance.',
          image: '/assets/images/product-hub.svg',
          features: ['Project timeline tracking', 'Service delivery metrics', 'Departmental analytics']
        },
        {
          id: 'hub-nonprofit',
          title: 'RIO Hub for Nonprofits',
          description: 'Maximize impact with volunteer management, program tracking, and donor engagement insights. Build sustainable community initiatives.',
          image: '/assets/images/product-hub.svg',
          features: ['Volunteer coordination', 'Program impact tracking', 'Donor engagement analytics']
        },
        {
          id: 'hub-sports',
          title: 'RIO Hub for Sports & Fitness',
          description: 'Track training routines, athletic performance, and team coordination. Build winning habits and achieve fitness goals consistently.',
          image: '/assets/images/product-hub.svg',
          features: ['Training schedule management', 'Performance metrics tracking', 'Team coordination tools']
        },
        {
          id: 'hub-creative',
          title: 'RIO Hub for Creative Media',
          description: 'Manage creative projects, track production workflows, and collaborate with teams. Deliver creative excellence on schedule.',
          image: '/assets/images/product-hub.svg',
          features: ['Production workflow tracking', 'Creative project management', 'Team collaboration tools']
        },
        {
          id: 'hub-research',
          title: 'RIO Hub for Research',
          description: 'Track research milestones, manage academic collaborations, and monitor publication progress. Advance knowledge systematically.',
          image: '/assets/images/product-hub.svg',
          features: ['Research milestone tracking', 'Collaboration management', 'Publication progress monitoring']
        }
      ],
      animatedLines: [
        { path: 'M 100 400 Q 300 200 600 400 T 1100 400', dotX: 100, dotY: 400 },
        { path: 'M 150 300 Q 400 150 700 300 T 1050 300', dotX: 150, dotY: 300 },
        { path: 'M 200 500 Q 500 300 800 500 T 1000 500', dotX: 200, dotY: 500 }
      ],
      isChipActive: false
    }
  },
  mounted() {
    document.title = 'RIO AI Products - Mikaelson Initiative'
    
    // Activate chip animation after mount
    setTimeout(() => {
      this.isChipActive = true
    }, 500)
    
    // Animate dots along paths
    this.animateDots()
    
    // Setup scroll observer for animations
    this.setupScrollObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products
      return this.products.filter(product => 
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    filteredPaginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    }
  },
  methods: {
    animateDots() {
      const dots = document.querySelectorAll('.animated-dot')
      dots.forEach((dot, index) => {
        this.animateDotAlongPath(dot, index)
      })
    },
    animateDotAlongPath(dot, index) {
      const paths = document.querySelectorAll('.animated-line')
      if (!paths[index]) return
      
      const path = paths[index]
      const pathLength = path.getTotalLength()
      let progress = 0
      
      const animate = () => {
        progress += 0.005
        if (progress > 1) progress = 0
        
        const point = path.getPointAtLength(progress * pathLength)
        dot.setAttribute('cx', point.x)
        dot.setAttribute('cy', point.y)
        
        requestAnimationFrame(animate)
      }
      
      animate()
    },
    setupScrollObserver() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px'
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === this.$refs.featuresSection) {
              this.visibleFeatures = [0, 1, 2, 3]
            }
            if (entry.target === this.$refs.productsSection) {
              this.visibleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
            if (entry.target === this.$refs.howItWorksSection) {
              this.visibleSteps = [0, 1, 2]
            }
            if (entry.target === this.$refs.rioHubSection) {
              this.hubVisible = true
            }
          }
        })
      }, options)
      
      // Observe sections
      if (this.$refs.featuresSection) this.observer.observe(this.$refs.featuresSection)
      if (this.$refs.productsSection) this.observer.observe(this.$refs.productsSection)
      if (this.$refs.howItWorksSection) this.observer.observe(this.$refs.howItWorksSection)
      if (this.$refs.rioHubSection) this.observer.observe(this.$refs.rioHubSection)
    },
    handleCardHover(event, index) {
      const card = event.currentTarget
      card.classList.add('card-hovered')
    },
    handleCardMouseMove(event, index) {
      const card = event.currentTarget
      const rect = card.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    },
    handleCardLeave(index) {
      const cards = document.querySelectorAll('.product-card')
      if (cards[index]) {
        cards[index].classList.remove('card-hovered')
      }
    },
    getProductIcon(productId) {
      const icons = {
        'hub-education': '🎓',
        'hub-corporate': '🏢',
        'hub-creators': '🎬',
        'hub-developers': '💻',
        'hub-startups': '🚀',
        'hub-government': '🏛️',
        'hub-nonprofit': '🤝',
        'hub-sports': '⚽',
        'hub-creative': '🎨',
        'hub-research': '🔬'
      }
      return icons[productId] || '📦'
    },
    getProductColor(productId) {
      const colors = {
        'hub-education': 'blue',
        'hub-corporate': 'cyan',
        'hub-creators': 'purple',
        'hub-developers': 'green',
        'hub-startups': 'orange',
        'hub-government': 'red',
        'hub-nonprofit': 'pink',
        'hub-sports': 'teal',
        'hub-creative': 'indigo',
        'hub-research': 'violet'
      }
      return colors[productId] || 'blue'
    },
    getProductCategory(productId) {
      const categories = {
        'hub-education': 'Education & Learning',
        'hub-corporate': 'Business & Enterprise',
        'hub-creators': 'Content & Media',
        'hub-developers': 'Technology & Dev',
        'hub-startups': 'Innovation & Startups',
        'hub-government': 'Public Sector',
        'hub-nonprofit': 'Social Impact',
        'hub-sports': 'Sports & Wellness',
        'hub-creative': 'Creative Industries',
        'hub-research': 'Research & Academia'
      }
      return categories[productId] || 'General'
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.visibleCards = []
        this.$nextTick(() => {
          this.visibleCards = [0, 1, 2, 3]
        })
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.visibleCards = []
        this.$nextTick(() => {
          this.visibleCards = [0, 1, 2, 3]
        })
      }
    },
    goToPage(page) {
      this.currentPage = page
      this.visibleCards = []
      this.$nextTick(() => {
        this.visibleCards = [0, 1, 2, 3]
      })
    },
    openModal(product) {
      this.selectedProduct = product
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
      document.body.style.overflow = 'auto'
    },
    getProductSolution(productId) {
      const solutions = {
        'hub-education': 'RIO Hub for Education transforms learning environments by providing real-time analytics on student engagement, progress tracking, and personalized learning paths. Educators gain actionable insights to improve teaching effectiveness while students stay motivated through gamified challenges and peer accountability.',
        'hub-corporate': 'RIO Hub for Companies revolutionizes workplace productivity by tracking team collaboration, project milestones, and employee wellness. Our AI-driven insights help managers identify bottlenecks, optimize workflows, and foster a culture of continuous improvement and accountability.',
        'hub-creators': 'RIO Hub for Content Creators streamlines content production with intelligent scheduling, audience analytics, and creative habit tracking. Stay consistent with your content calendar while building sustainable creative practices that keep your audience engaged.',
        'hub-developers': 'RIO Hub for Developers enhances coding productivity through commit tracking, project milestone management, and skill progression analytics. Build better coding habits, collaborate effectively with your team, and advance your technical expertise systematically.',
        'hub-startups': 'RIO Hub for Startups accelerates innovation by tracking sprint velocity, team productivity, and product development cycles. Foster a culture of rapid iteration and accountability while maintaining clear visibility into your startup\'s growth metrics.',
        'hub-government': 'RIO Hub for Government improves public sector efficiency through project timeline tracking, service delivery metrics, and departmental performance analytics. Enhance transparency, accountability, and citizen engagement with data-driven governance.',
        'hub-nonprofit': 'RIO Hub for Nonprofits maximizes social impact through volunteer coordination, program effectiveness tracking, and donor engagement analytics. Build sustainable community initiatives with clear metrics that demonstrate your organization\'s impact.',
        'hub-sports': 'RIO Hub for Sports & Fitness optimizes athletic performance through training schedule management, performance metrics tracking, and team coordination tools. Build winning habits, track progress, and achieve fitness goals with data-driven insights.',
        'hub-creative': 'RIO Hub for Creative Media streamlines production workflows with project management, creative collaboration tools, and deadline tracking. Deliver creative excellence on schedule while maintaining team coordination and quality standards.',
        'hub-research': 'RIO Hub for Research advances academic excellence through milestone tracking, collaboration management, and publication progress monitoring. Systematically advance knowledge while maintaining clear visibility into research outcomes and team contributions.'
      }
      return solutions[productId] || 'RIO Hub provides comprehensive productivity solutions tailored to your specific needs.'
    },
    getProductVideoUrl(productId) {
      // YouTube video IDs for each product - replace with actual video IDs
      const videoIds = {
        'hub-education': 'dQw4w9WgXcQ',
        'hub-corporate': 'dQw4w9WgXcQ',
        'hub-creators': 'dQw4w9WgXcQ',
        'hub-developers': 'dQw4w9WgXcQ',
        'hub-startups': 'dQw4w9WgXcQ',
        'hub-government': 'dQw4w9WgXcQ',
        'hub-nonprofit': 'dQw4w9WgXcQ',
        'hub-sports': 'dQw4w9WgXcQ',
        'hub-creative': 'dQw4w9WgXcQ',
        'hub-research': 'dQw4w9WgXcQ'
      }
      const videoId = videoIds[productId] || 'dQw4w9WgXcQ'
      // Add autoplay=1 and mute=1 for autoplay to work in most browsers
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`
    }
  }
}
</script>

<style scoped>
/* ... */
.product-card {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

/* Hero Section - Vite Inspired */
.hero-vite {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at top, #f8fafc 0%, #ffffff 100%);
}

.hero-visuals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  pointer-events: none;
}

.hero-lines {
  width: 100%;
  height: 100%;
}

.animated-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s ease-in-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

.animated-dot {
  filter: drop-shadow(0 0 8px #5ce1e6);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(92, 225, 230, 0.1);
  border: 1px solid rgba(92, 225, 230, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #5ce1e6;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

.badge-icon {
  font-size: 1.2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #111827;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.gradient-text {
  background: linear-gradient(135deg, #5ce1e6 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vite-style floating chip */
.vite-chip {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  width: 120px;
  height: 120px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.vite-chip.active {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.chip-background {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid rgba(92, 225, 230, 0.4);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.chip-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, #5ce1e6, transparent, #3b82f6);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  to {
    transform: rotate(360deg);
  }
}

.chip-edge {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 30%, rgba(92, 225, 230, 0.3), transparent 70%);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.chip-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.chip-text {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn:hover::before {
  opacity: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: #000;
  box-shadow: 0 8px 32px rgba(92, 225, 230, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(92, 225, 230, 0.5);
}

.btn-secondary {
  background: transparent;
  color: #5ce1e6;
  border: 2px solid #5ce1e6;
}

.btn-secondary:hover {
  background: rgba(92, 225, 230, 0.1);
  transform: translateY(-2px);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Products Section - Venue Style */
.products-section {
  padding: 6rem 2rem;
  background: #ffffff;
  position: relative;
  min-height: 100vh;
}

.products-container {
  max-width: 1400px;
  margin: 0 auto;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.products-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.search-filter {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  border: 2px solid #333;
  background: #ffffff;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #5ce1e6;
  box-shadow: 0 0 0 3px rgba(92, 225, 230, 0.1);
}

.products-intro {
  max-width: 900px;
  margin: 3rem auto;
  text-align: center;
}

.products-intro p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 1.5rem;
}

.products-intro strong {
  color: #5ce1e6;
  font-weight: 700;
}

/* Products Grid - Large Venue Cards */
.products-grid-large {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-venue-card {
  background: #f5f5f5;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateY(30px);
  min-height: 350px;
  display: flex;
  flex-direction: column;
}

.product-venue-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.product-venue-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.venue-visual {
  position: relative;
  height: 280px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.venue-title-outline {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.1);
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  line-height: 1.1;
  max-width: 80%;
  z-index: 1;
}

.venue-icon-large {
  font-size: 8rem;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.venue-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 60%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 24px 0 0 0;
}

/* Color Variants */
.card-blue .venue-visual {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.card-cyan .venue-visual {
  background: linear-gradient(135deg, #5ce1e6, #06b6d4);
}

.card-purple .venue-visual {
  background: linear-gradient(135deg, #a855f7, #9333ea);
}

.card-green .venue-visual {
  background: linear-gradient(135deg, #10b981, #059669);
}

.card-orange .venue-visual {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.card-red .venue-visual {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.card-pink .venue-visual {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.card-teal .venue-visual {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
}

.card-indigo .venue-visual {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.card-violet .venue-visual {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.venue-footer {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  flex-grow: 1;
}

.venue-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.venue-category {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.venue-category i {
  color: #5ce1e6;
}

.venue-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.venue-btn:hover {
  background: #5ce1e6;
  color: #000;
  transform: translateX(4px);
}

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
}

.nav-arrow {
  background: #f3f4f6;
  color: #111827;
  border: 2px solid #e5e7eb;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.2rem;
}

.nav-arrow:hover:not(:disabled) {
  background: #5ce1e6;
  color: #000;
  transform: scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-dots {
  display: flex;
  gap: 0.75rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: #5ce1e6;
  transform: scale(1.2);
}

.dot.active {
  background: #5ce1e6;
  width: 32px;
  border-radius: 6px;
}

/* Action Buttons */
.products-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.action-btn.primary {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.3);
}

.action-btn.primary:hover {
  background: linear-gradient(135deg, #4ac5ca, #2563eb);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(92, 225, 230, 0.5);
}

.action-btn.secondary {
  background: transparent;
  color: #111827;
  border: 2px solid #e5e7eb;
}

.action-btn.secondary:hover {
  background: #f3f4f6;
  border-color: #5ce1e6;
  color: #5ce1e6;
  transform: translateY(-4px);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: #ffffff;
  border-radius: 24px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideUp 0.3s ease-out;
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  color: #111827;
  font-size: 1.2rem;
}

.modal-close:hover {
  background: #5ce1e6;
  color: #ffffff;
  transform: rotate(90deg);
}

.modal-content {
  padding: 3rem 2.5rem;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f3f4f6;
}

.modal-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.modal-category {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #5ce1e6;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.modal-body {
  margin-bottom: 2rem;
}

.modal-video {
  margin-bottom: 2rem;
}

.modal-video h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
}

.modal-body h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.modal-body h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 1.5rem 0 0.75rem 0;
}

.modal-description {
  color: #6b7280;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.modal-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #374151;
  font-size: 0.95rem;
  border-bottom: 1px solid #f3f4f6;
}

.modal-features li:last-child {
  border-bottom: none;
}

.modal-features li i {
  color: #5ce1e6;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.modal-solution {
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(59, 130, 246, 0.1));
  padding: 1.5rem;
  border-radius: 16px;
  border-left: 4px solid #5ce1e6;
  margin-top: 1.5rem;
}

.modal-solution p {
  color: #374151;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid #f3f4f6;
}

.modal-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(92, 225, 230, 0.3);
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 225, 230, 0.4);
}

.modal-btn.secondary {
  background: transparent;
  color: #111827;
  border: 2px solid #e5e7eb;
}

.modal-btn.secondary:hover {
  background: #f3f4f6;
  border-color: #5ce1e6;
  color: #5ce1e6;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #111827;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #5ce1e6, #3b82f6);
  margin: 1.5rem auto;
  border-radius: 2px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(92, 225, 230, 0.15), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover::before {
  transform: scaleX(1);
}

.product-card:hover {
  border-color: #5ce1e6;
  box-shadow: 0 12px 32px rgba(92, 225, 230, 0.2);
  transform: translateY(-8px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.product-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(92, 225, 230, 0.3));
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.product-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.features-list li {
  padding: 0.6rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #6b7280;
  transition: color 0.3s;
  font-size: 0.9rem;
  text-align: left;
}

.features-list li:hover {
  color: #5ce1e6;
}

.features-list li:before {
  content: "✓";
  color: #5ce1e6;
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #5ce1e6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
}

.learn-more:hover {
  gap: 0.75rem;
  text-shadow: 0 0 10px rgba(92, 225, 230, 0.5);
}

/* How It Works */
.how-it-works {
  padding: 8rem 2rem;
  background: #ffffff;
  position: relative;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.step {
  text-align: center;
  padding: 2.5rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #5ce1e6, #3b82f6);
  transform: scaleX(0);
  transition: transform 0.4s;
}

.step:hover::before {
  transform: scaleX(1);
}

.step:hover {
  border-color: #5ce1e6;
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(92, 225, 230, 0.2);
}

.step-number {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.3);
  transition: transform 0.3s;
}

.step:hover .step-number {
  transform: scale(1.1) rotate(5deg);
}

.step h4 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #111827;
}

.step p {
  color: #6b7280;
  line-height: 1.7;
}

/* RIO Hub Section */
.rio-hub {
  padding: 8rem 2rem;
  background: #f8fafc;
  position: relative;
}

.rio-hub h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: #111827;
}

.rio-copy {
  max-width: 900px;
  margin: 0 auto;
}

.rio-description {
  margin-bottom: 3rem;
  text-align: center;
}

.rio-description p {
  font-size: 1.125rem;
  line-height: 1.9;
  color: #374151;
  margin-bottom: 1.5rem;
}

.rio-description strong {
  color: #5ce1e6;
  font-weight: 700;
}

.rio-copy p {
  font-size: 1.125rem;
  line-height: 1.9;
  color: #374151;
  margin-bottom: 1.5rem;
}

.rio-highlight {
  background: rgba(92, 225, 230, 0.1);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(92, 225, 230, 0.3);
  border-left: 4px solid #5ce1e6;
  font-weight: 600;
  color: #111827;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(92, 225, 230, 0.1);
}

.rio-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn.hub-explore {
  background: #5ce1e6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn.hub-explore:hover {
  background: #4ac5ca;
  transform: translateY(-2px);
}

.btn.hub-waitlist {
  background: transparent;
  color: #5ce1e6;
  border: 2px solid #5ce1e6;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn.hub-waitlist:hover {
  background: #5ce1e6;
  color: white;
  transform: translateY(-2px);
}

/* Testimonials */
.testimonials {
  padding: 8rem 2rem;
  background: #ffffff;
  position: relative;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  border-left: 4px solid #5ce1e6;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.testimonial::before {
  content: '"';
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 4rem;
  color: rgba(92, 225, 230, 0.2);
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial:hover {
  transform: translateY(-5px);
  border-color: #5ce1e6;
  box-shadow: 0 20px 60px rgba(92, 225, 230, 0.2);
}

.testimonial p {
  font-style: italic;
  margin-bottom: 1rem;
  color: #374151;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.testimonial cite {
  font-weight: 600;
  color: #5ce1e6;
  font-style: normal;
}

/* Final CTA */
.final-cta {
  padding: 8rem 2rem;
  background: radial-gradient(ellipse at center, #f0f9ff 0%, #e0f2fe 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.final-cta::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(92, 225, 230, 0.15) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

.final-cta h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: #111827;
  position: relative;
  z-index: 1;
}

.final-cta p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: #6b7280;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.btn.primary {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: #000;
  box-shadow: 0 8px 32px rgba(92, 225, 230, 0.3);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(92, 225, 230, 0.5);
}

.btn.secondary {
  background: transparent;
  color: #5ce1e6;
  border: 2px solid #5ce1e6;
}

.btn.secondary:hover {
  background: rgba(92, 225, 230, 0.1);
  transform: translateY(-2px);
}

/* Core Features Showcase */
.features-showcase {
  padding: 8rem 2rem;
  background: #ffffff;
  position: relative;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: #6b7280;
  margin-top: 1rem;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-box {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateY(30px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.feature-box.feature-visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-box:hover {
  border-color: #5ce1e6;
  box-shadow: 0 12px 32px rgba(92, 225, 230, 0.2);
  transform: translateY(-8px);
}

.feature-visual {
  margin-bottom: 1.5rem;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.05), rgba(59, 130, 246, 0.05));
  position: relative;
  overflow: hidden;
}

/* Unified Visual */
.unified-visual {
  position: relative;
}

.unified-icon {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

.connection-dots {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
}

.connection-dots .dot {
  width: 12px;
  height: 12px;
  background: #5ce1e6;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.connection-dots .dot:nth-child(2) {
  animation-delay: 0.3s;
}

.connection-dots .dot:nth-child(3) {
  animation-delay: 0.6s;
}

/* Dashboard Visual */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 2rem;
  width: 100%;
}

.grid-item {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  border-radius: 8px;
  height: 60px;
  animation: fadeInScale 1s ease-in-out infinite alternate;
}

.grid-item:nth-child(1) {
  animation-delay: 0s;
}

.grid-item:nth-child(2) {
  animation-delay: 0.2s;
}

.grid-item:nth-child(3) {
  animation-delay: 0.4s;
}

.grid-item:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes fadeInScale {
  from {
    opacity: 0.5;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Leaderboard Visual */
.leaderboard-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding: 2rem;
  gap: 0.5rem;
}

.bar {
  width: 40px;
  background: linear-gradient(to top, #5ce1e6, #3b82f6);
  border-radius: 8px 8px 0 0;
  animation: growBar 2s ease-in-out infinite;
}

.bar-1 {
  height: 60%;
  animation-delay: 0s;
}

.bar-2 {
  height: 100%;
  animation-delay: 0.2s;
}

.bar-3 {
  height: 75%;
  animation-delay: 0.4s;
}

.bar-4 {
  height: 50%;
  animation-delay: 0.6s;
}

@keyframes growBar {
  0%, 100% {
    transform: scaleY(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* Social Feed Visual */
.feed-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem;
  width: 100%;
}

.feed-item {
  background: linear-gradient(90deg, rgba(92, 225, 230, 0.3), rgba(59, 130, 246, 0.3));
  border-radius: 8px;
  height: 40px;
  animation: slideIn 1.5s ease-in-out infinite;
}

.feed-item:nth-child(1) {
  animation-delay: 0s;
}

.feed-item:nth-child(2) {
  animation-delay: 0.3s;
}

.feed-item:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes slideIn {
  0%, 100% {
    transform: translateX(-10px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

.feature-box h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.feature-box p {
  font-size: 1rem;
  line-height: 1.7;
  color: #6b7280;
  margin: 0;
}

/* Product Card Animations */
.product-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.product-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(92, 225, 230, 0.15), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.product-card.card-hovered .card-glow {
  opacity: 1;
}

/* How It Works Animations */
.connection-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  height: 200px;
  opacity: 0.3;
  pointer-events: none;
}

.flow-line {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawFlow 2s ease-in-out forwards;
}

.flow-dot {
  opacity: 0;
  animation: fadeInDot 0.5s ease-in-out 2s forwards, pulseDot 2s ease-in-out 2.5s infinite;
}

@keyframes drawFlow {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeInDot {
  to {
    opacity: 1;
  }
}

@keyframes pulseDot {
  0%, 100% {
    r: 4;
    opacity: 1;
  }
  50% {
    r: 6;
    opacity: 0.7;
  }
}

.step {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.step.step-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* RIO Hub Animations */
.rio-hub {
  position: relative;
  overflow: hidden;
}

.hub-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-element {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(92, 225, 230, 0.1), transparent);
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(1) {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.floating-element:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 0.5s;
}

.floating-element:nth-child(3) {
  top: 30%;
  left: 50%;
  animation-delay: 1s;
}

.floating-element:nth-child(4) {
  top: 80%;
  left: 20%;
  animation-delay: 1.5s;
}

.floating-element:nth-child(5) {
  top: 40%;
  left: 90%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.rio-hub h2 {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rio-hub h2.fade-in-up {
  opacity: 1;
  transform: translateY(0);
}

.rio-copy {
  opacity: 0;
  transition: opacity 0.8s ease-in-out 0.3s;
}

.rio-copy.content-visible {
  opacity: 1;
}

.rio-feature-card {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.content-visible .rio-feature-card {
  opacity: 1;
  transform: translateX(0);
}

.rio-feature-card:hover {
  transform: translateX(10px);
  border-color: #5ce1e6;
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.2);
}

.feature-icon {
  font-size: 3rem;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 16px;
  border: 2px solid rgba(92, 225, 230, 0.3);
}

.feature-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
}

.feature-content p {
  font-size: 1rem;
  line-height: 1.7;
  color: #6b7280;
  margin: 0;
}

.rio-highlight {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
}

.rio-highlight.highlight-visible {
  opacity: 1;
  transform: scale(1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .connection-lines {
    display: none;
  }
  
  .rio-feature-card {
    flex-direction: column;
    text-align: center;
  }
  
  .feature-icon {
    margin: 0 auto;
  }
}

/* Responsive Design - Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .products-section {
    padding: 6rem 1.5rem;
  }
}

/* Responsive Design - Mobile */
@media (max-width: 768px) {
  .hero-box {
    padding: 4rem 1.5rem !important;
    min-height: 480px !important;
  }

  .hero-box h1 {
    font-size: 2.3rem !important;
  }

  .hero-box p {
    font-size: 1.05rem !important;
  }

  .section-title {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .products-section {
    padding: 4rem 1rem;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .final-cta h2 {
    font-size: 2rem;
  }
}
</style>

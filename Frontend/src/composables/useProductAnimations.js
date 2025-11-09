import { ref, onMounted, onUnmounted } from 'vue'

export function useProductAnimations() {
  const visibleCards = ref([])
  const visibleSteps = ref([])
  const visibleFeatures = ref([])
  const hubVisible = ref(false)
  const mouseX = ref(0)
  const mouseY = ref(0)
  
  let observer = null
  let animationFrameId = null

  // Mouse tracking for glow effects
  const handleMouseMove = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }

  // Animate dots along SVG paths
  const animateDotAlongPath = (dotId, pathId) => {
    const dot = document.getElementById(dotId)
    const path = document.getElementById(pathId)
    
    if (!dot || !path) return

    let progress = 0
    const speed = 0.001

    const animate = () => {
      progress += speed
      if (progress > 1) progress = 0

      const pathLength = path.getTotalLength()
      const point = path.getPointAtLength(progress * pathLength)
      
      dot.setAttribute('cx', point.x)
      dot.setAttribute('cy', point.y)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
  }

  // Setup scroll-triggered animations
  const setupScrollObserver = (refs) => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === refs.featuresSection) {
            visibleFeatures.value = [0, 1, 2, 3]
          }
          if (entry.target === refs.productsSection) {
            visibleCards.value = [0]
          }
          if (entry.target === refs.howItWorksSection) {
            visibleSteps.value = [0, 1, 2]
          }
          if (entry.target === refs.rioHubSection) {
            hubVisible.value = true
          }
        }
      })
    }, { threshold: 0.2 })

    // Observe all sections
    Object.values(refs).forEach(ref => {
      if (ref) observer.observe(ref)
    })
  }

  // Cleanup
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener('mousemove', handleMouseMove)
  }

  // Initialize
  const initialize = (refs) => {
    window.addEventListener('mousemove', handleMouseMove)
    setupScrollObserver(refs)
    
    // Start dot animations
    setTimeout(() => {
      animateDotAlongPath('dot1', 'animPath1')
      animateDotAlongPath('dot2', 'animPath2')
      animateDotAlongPath('dot3', 'animPath3')
    }, 100)
  }

  return {
    visibleCards,
    visibleSteps,
    visibleFeatures,
    hubVisible,
    mouseX,
    mouseY,
    initialize,
    cleanup
  }
}

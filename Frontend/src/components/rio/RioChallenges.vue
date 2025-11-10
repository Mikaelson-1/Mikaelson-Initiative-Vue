<template>
  <div class="rio-challenges">
    <!-- Active Challenges -->
    <div class="challenges-section">
      <h2 class="section-title">Active Challenges</h2>
      <div class="challenges-grid">
        <div 
          v-for="challenge in activeChallenges" 
          :key="challenge.id" 
          class="challenge-card"
        >
          <div class="challenge-badge" :class="`badge-${challenge.type}`">
            <i :class="challenge.icon"></i>
          </div>
          <div class="challenge-content">
            <h3>{{ challenge.title }}</h3>
            <p>{{ challenge.description }}</p>
            <div class="challenge-meta">
              <span class="challenge-participants">
                <i class="fas fa-users"></i> {{ challenge.participants }} participants
              </span>
              <span class="challenge-deadline">
                <i class="fas fa-calendar"></i> {{ challenge.deadline }}
              </span>
            </div>
            <div class="challenge-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: challenge.progress + '%' }"></div>
              </div>
              <span class="progress-label">{{ challenge.progress }}% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Discover Challenges -->
    <div class="challenges-section">
      <h2 class="section-title">Discover New Challenges</h2>
      <div class="challenges-grid">
        <div 
          v-for="challenge in discoverChallenges" 
          :key="challenge.id" 
          class="challenge-card discover"
        >
          <div class="challenge-badge" :class="`badge-${challenge.type}`">
            <i :class="challenge.icon"></i>
          </div>
          <div class="challenge-content">
            <h3>{{ challenge.title }}</h3>
            <p>{{ challenge.description }}</p>
            <div class="challenge-meta">
              <span class="challenge-participants">
                <i class="fas fa-users"></i> {{ challenge.participants }} participants
              </span>
              <span class="challenge-duration">
                <i class="fas fa-clock"></i> {{ challenge.duration }}
              </span>
            </div>
            <button class="btn-join" @click="joinChallenge(challenge.id)">
              <i class="fas fa-plus"></i> Join Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RioChallenges',

  data() {
    return {
      activeChallenges: [
        {
          id: 1,
          title: '30-Day Fitness Challenge',
          description: 'Complete 30 days of consistent workouts',
          type: 'fitness',
          icon: 'fas fa-dumbbell',
          participants: 234,
          deadline: 'Ends in 12 days',
          progress: 60
        },
        {
          id: 2,
          title: 'Reading Marathon',
          description: 'Read 5 books this month',
          type: 'learning',
          icon: 'fas fa-book',
          participants: 156,
          deadline: 'Ends in 18 days',
          progress: 40
        }
      ],
      discoverChallenges: [
        {
          id: 3,
          title: 'Mindfulness Week',
          description: 'Practice meditation daily for 7 days',
          type: 'wellness',
          icon: 'fas fa-spa',
          participants: 89,
          duration: '7 days'
        },
        {
          id: 4,
          title: 'Code Every Day',
          description: 'Commit code to GitHub daily for 30 days',
          type: 'productivity',
          icon: 'fas fa-code',
          participants: 312,
          duration: '30 days'
        },
        {
          id: 5,
          title: 'Hydration Challenge',
          description: 'Drink 8 glasses of water daily',
          type: 'health',
          icon: 'fas fa-tint',
          participants: 445,
          duration: '14 days'
        }
      ]
    }
  },

  methods: {
    joinChallenge(challengeId) {
      // TODO: Implement join challenge logic
      console.log('Joining challenge:', challengeId)
    }
  }
}
</script>

<style scoped>
.rio-challenges {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.challenges-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.challenge-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.challenge-card:hover {
  border-color: #5ce1e6;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.challenge-badge {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.badge-fitness { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.badge-learning { background: linear-gradient(135deg, #a855f7, #9333ea); }
.badge-wellness { background: linear-gradient(135deg, #10b981, #059669); }
.badge-productivity { background: linear-gradient(135deg, #f59e0b, #d97706); }
.badge-health { background: linear-gradient(135deg, #06b6d4, #0891b2); }

.challenge-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.challenge-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.challenge-content p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.challenge-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.challenge-meta span {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.challenge-meta i {
  color: #9ca3af;
}

.challenge-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #5ce1e6, #3b82f6);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-align: right;
}

.btn-join {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-join:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 225, 230, 0.3);
}

@media (max-width: 768px) {
  .rio-challenges {
    padding: 1.5rem 1rem;
  }

  .challenges-grid {
    grid-template-columns: 1fr;
  }
}
</style>

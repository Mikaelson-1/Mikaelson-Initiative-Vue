<template>
  <div class="rio-dashboard">
    <!-- Stats Cards -->
    <div class="stats-row">
      <div 
        v-for="stat in stats" 
        :key="stat.id" 
        class="stat-card"
      >
        <div class="stat-icon" :class="stat.color">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div class="dashboard-content">
      <!-- Today's Tasks -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Today's Tasks</h2>
          <button class="btn-add" @click="addTask">
            <i class="fas fa-plus"></i> Add Task
          </button>
        </div>
        <div class="tasks-list">
          <div 
            v-for="task in todayTasks" 
            :key="task.id" 
            class="task-item" 
            :class="{ completed: task.completed }"
          >
            <div class="task-checkbox" @click="toggleTask(task.id)">
              <i v-if="task.completed" class="fas fa-check"></i>
            </div>
            <div class="task-info">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-meta">
                <span class="task-time">
                  <i class="fas fa-clock"></i> {{ task.time }}
                </span>
                <span class="task-category" :class="`category-${task.category}`">
                  {{ task.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Habits -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Active Habits</h2>
          <a href="#" class="view-all" @click.prevent="viewAllHabits">View All</a>
        </div>
        <div class="habits-grid">
          <div 
            v-for="habit in activeHabits" 
            :key="habit.id" 
            class="habit-card"
          >
            <div class="habit-icon">{{ habit.icon }}</div>
            <div class="habit-name">{{ habit.name }}</div>
            <div class="habit-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: habit.progress + '%' }"></div>
              </div>
              <div class="progress-text">{{ habit.progress }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RioDashboard',

  data() {
    return {
      stats: [
        { id: 1, icon: 'fas fa-fire', color: 'blue', value: 12, label: 'Day Streak' },
        { id: 2, icon: 'fas fa-check-circle', color: 'green', value: 48, label: 'Tasks Completed' },
        { id: 3, icon: 'fas fa-trophy', color: 'purple', value: 1250, label: 'Total Points' },
        { id: 4, icon: 'fas fa-chart-line', color: 'orange', value: '75%', label: 'Weekly Progress' }
      ],
      todayTasks: [
        { id: 1, title: 'Morning workout', time: '7:00 AM', category: 'fitness', completed: true },
        { id: 2, title: 'Review project documentation', time: '9:00 AM', category: 'work', completed: true },
        { id: 3, title: 'Team standup meeting', time: '10:00 AM', category: 'work', completed: false },
        { id: 4, title: 'Lunch break meditation', time: '12:30 PM', category: 'wellness', completed: false },
        { id: 5, title: 'Code review session', time: '2:00 PM', category: 'work', completed: false }
      ],
      activeHabits: [
        { id: 1, name: 'Daily Exercise', icon: '💪', progress: 85 },
        { id: 2, name: 'Read 30 mins', icon: '📚', progress: 60 },
        { id: 3, name: 'Meditation', icon: '🧘', progress: 90 },
        { id: 4, name: 'Drink Water', icon: '💧', progress: 70 }
      ]
    }
  },

  methods: {
    toggleTask(taskId) {
      const task = this.todayTasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        // TODO: Persist to backend
      }
    },

    addTask() {
      // TODO: Open add task modal
      console.log('Add task clicked')
    },

    viewAllHabits() {
      // TODO: Navigate to habits page
      console.log('View all habits clicked')
    }
  }
}
</script>

<style scoped>
.rio-dashboard {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Stats Cards */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
.stat-icon.green { background: linear-gradient(135deg, #10b981, #059669); }
.stat-icon.purple { background: linear-gradient(135deg, #a855f7, #9333ea); }
.stat-icon.orange { background: linear-gradient(135deg, #f59e0b, #d97706); }

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Dashboard Content */
.dashboard-content {
  display: grid;
  gap: 2rem;
}

.dashboard-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.btn-add {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.875rem;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 225, 230, 0.3);
}

.view-all {
  color: #5ce1e6;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.view-all:hover {
  color: #3b82f6;
}

/* Tasks */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.task-item:hover {
  border-color: #5ce1e6;
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.task-item.completed .task-checkbox {
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  border-color: #5ce1e6;
  color: white;
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.task-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  flex-wrap: wrap;
}

.task-time {
  color: #6b7280;
}

.task-category {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.category-fitness { background: #dbeafe; color: #1e40af; }
.category-work { background: #fef3c7; color: #92400e; }
.category-wellness { background: #d1fae5; color: #065f46; }

/* Habits */
.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.habit-card {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.habit-card:hover {
  border-color: #5ce1e6;
  transform: translateY(-2px);
}

.habit-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.habit-name {
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.habit-progress {
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

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-align: right;
}

@media (max-width: 768px) {
  .rio-dashboard {
    padding: 1.5rem 1rem;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .habits-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="rio-social">
    <!-- Create Post Card -->
    <div class="create-post-card">
      <div class="create-post-header">
        <div class="user-avatar small">
          <i class="fas fa-user"></i>
        </div>
        <input 
          type="text" 
          placeholder="Share your progress..." 
          class="create-post-input" 
          @click="showCreatePost = true" 
          readonly
        />
      </div>
    </div>

    <!-- Social Feed -->
    <div class="social-feed">
      <div 
        v-for="post in socialPosts" 
        :key="post.id" 
        class="social-post"
      >
        <!-- Post Header -->
        <div class="post-header">
          <div class="post-user">
            <div class="user-avatar small">
              <img v-if="post.user.avatar" :src="post.user.avatar" :alt="post.user.name" />
              <i v-else class="fas fa-user"></i>
            </div>
            <div class="user-details">
              <div class="user-name">{{ post.user.name }}</div>
              <div class="post-time">{{ post.time }}</div>
            </div>
          </div>
          <button class="post-options-btn" @click="togglePostOptions(post.id)">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <!-- Post Content -->
        <div class="post-content">
          <p>{{ post.content }}</p>
          
          <!-- Achievement Badge -->
          <div v-if="post.achievement" class="post-achievement">
            <div class="achievement-badge">
              <i :class="post.achievement.icon"></i>
            </div>
            <div class="achievement-info">
              <div class="achievement-title">{{ post.achievement.title }}</div>
              <div class="achievement-desc">{{ post.achievement.description }}</div>
            </div>
          </div>
        </div>

        <!-- Post Footer -->
        <div class="post-footer">
          <button 
            class="post-action" 
            :class="{ active: post.liked }"
            @click="toggleLike(post.id)"
          >
            <i class="fas fa-heart"></i>
            <span>{{ post.likes }}</span>
          </button>
          <button class="post-action" @click="openComments(post.id)">
            <i class="fas fa-comment"></i>
            <span>{{ post.comments }}</span>
          </button>
          <button class="post-action" @click="sharePost(post.id)">
            <i class="fas fa-share"></i>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RioSocial',

  data() {
    return {
      showCreatePost: false,
      socialPosts: [
        {
          id: 1,
          user: { name: 'Sarah Johnson', avatar: null },
          time: '2 hours ago',
          content: 'Just completed my 30-day fitness challenge! Feeling stronger than ever 💪',
          achievement: {
            icon: 'fas fa-trophy',
            title: 'Challenge Champion',
            description: 'Completed 30-Day Fitness Challenge'
          },
          likes: 45,
          comments: 12,
          liked: false
        },
        {
          id: 2,
          user: { name: 'Mike Chen', avatar: null },
          time: '5 hours ago',
          content: 'Day 12 of my reading challenge. Currently enjoying "Atomic Habits" - highly recommend! 📚',
          achievement: null,
          likes: 28,
          comments: 8,
          liked: true
        },
        {
          id: 3,
          user: { name: 'Emily Rodriguez', avatar: null },
          time: '1 day ago',
          content: 'Maintained my meditation streak for 90 days! The mental clarity is incredible 🧘‍♀️',
          achievement: {
            icon: 'fas fa-fire',
            title: '90-Day Streak',
            description: 'Maintained a 90-day meditation streak'
          },
          likes: 67,
          comments: 15,
          liked: false
        }
      ]
    }
  },

  methods: {
    toggleLike(postId) {
      const post = this.socialPosts.find(p => p.id === postId)
      if (post) {
        post.liked = !post.liked
        post.likes += post.liked ? 1 : -1
        // TODO: Persist to backend
      }
    },

    togglePostOptions(postId) {
      // TODO: Show post options menu
      console.log('Toggle options for post:', postId)
    },

    openComments(postId) {
      // TODO: Open comments section
      console.log('Open comments for post:', postId)
    },

    sharePost(postId) {
      // TODO: Implement share functionality
      console.log('Share post:', postId)
    }
  }
}
</script>

<style scoped>
.rio-social {
  padding: 2rem 3rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Create Post */
.create-post-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.create-post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  flex-shrink: 0;
}

.user-avatar.small {
  width: 40px;
  height: 40px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.create-post-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background: #f8fafc;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.create-post-input:hover {
  background: #f3f4f6;
}

.create-post-input:focus {
  outline: none;
  border-color: #5ce1e6;
  background: #ffffff;
}

/* Social Feed */
.social-feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.social-post {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
}

.social-post:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Post Header */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-name {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.post-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.post-options-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-options-btn:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* Post Content */
.post-content {
  margin-bottom: 1rem;
}

.post-content p {
  color: #374151;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.post-achievement {
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(59, 130, 246, 0.1));
  border: 2px solid rgba(92, 225, 230, 0.3);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.achievement-badge {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #5ce1e6, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.achievement-info {
  flex: 1;
}

.achievement-title {
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.achievement-desc {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Post Footer */
.post-footer {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.post-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.post-action:hover {
  background: #f3f4f6;
  color: #111827;
}

.post-action.active {
  color: #ef4444;
}

.post-action.active:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .rio-social {
    padding: 1.5rem 1rem;
  }

  .post-footer {
    flex-direction: column;
    gap: 0.5rem;
  }

  .post-action {
    justify-content: flex-start;
  }
}
</style>

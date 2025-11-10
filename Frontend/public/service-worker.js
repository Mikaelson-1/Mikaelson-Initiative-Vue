const CACHE_NAME = 'rio-hub-v1';
const urlsToCache = [
  '/rio',
  '/assets/images/mikaelsonlogo.png',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Strategy: Network First, falling back to Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the fetched response
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // If network fails, try to get from cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // If not in cache, return offline page
            if (event.request.destination === 'document') {
              return caches.match('/rio');
            }
          });
      })
  );
});

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncTasks());
  }
  
  if (event.tag === 'sync-challenges') {
    event.waitUntil(syncChallenges());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/images/icons/icon-192x192.png',
    badge: '/assets/images/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/assets/images/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/icons/close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('RIO Hub', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/rio')
    );
  }
});

// Helper function to sync tasks
async function syncTasks() {
  try {
    // Get pending tasks from IndexedDB
    const pendingTasks = await getPendingTasks();
    
    // Sync with server
    for (const task of pendingTasks) {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
    }
    
    console.log('[Service Worker] Tasks synced successfully');
  } catch (error) {
    console.error('[Service Worker] Task sync failed:', error);
    throw error;
  }
}

// Helper function to sync challenges
async function syncChallenges() {
  try {
    // Get pending challenge updates from IndexedDB
    const pendingChallenges = await getPendingChallenges();
    
    // Sync with server
    for (const challenge of pendingChallenges) {
      await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(challenge)
      });
    }
    
    console.log('[Service Worker] Challenges synced successfully');
  } catch (error) {
    console.error('[Service Worker] Challenge sync failed:', error);
    throw error;
  }
}

// Placeholder functions for IndexedDB operations
async function getPendingTasks() {
  // TODO: Implement IndexedDB retrieval
  return [];
}

async function getPendingChallenges() {
  // TODO: Implement IndexedDB retrieval
  return [];
}

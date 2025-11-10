/**
 * PWA Utilities for RIO Hub
 * Handles service worker registration, installation prompts, and offline detection
 */

let deferredPrompt = null;

/**
 * Register the service worker
 */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      console.log('[PWA] Service Worker registered successfully:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[PWA] New service worker found, installing...');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[PWA] New content available, please refresh');
            // Notify user about update
            notifyUpdate();
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
      throw error;
    }
  } else {
    console.warn('[PWA] Service Workers not supported');
    return null;
  }
}

/**
 * Unregister the service worker
 */
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const success = await registration.unregister();
    console.log('[PWA] Service Worker unregistered:', success);
    return success;
  }
  return false;
}

/**
 * Setup install prompt handler
 */
export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] Install prompt available');
    // Prevent the default prompt
    e.preventDefault();
    // Store the event for later use
    deferredPrompt = e;
    // Show custom install button
    showInstallButton();
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    deferredPrompt = null;
    hideInstallButton();
  });
}

/**
 * Trigger the install prompt
 */
export async function promptInstall() {
  if (!deferredPrompt) {
    console.warn('[PWA] Install prompt not available');
    return false;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for user response
  const { outcome } = await deferredPrompt.userChoice;
  console.log('[PWA] User choice:', outcome);
  
  // Clear the deferred prompt
  deferredPrompt = null;
  
  return outcome === 'accepted';
}

/**
 * Check if app is installed
 */
export function isAppInstalled() {
  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check if running as PWA on iOS
  if (window.navigator.standalone === true) {
    return true;
  }
  
  return false;
}

/**
 * Check if device is online
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Setup online/offline event listeners
 */
export function setupNetworkListeners(onOnline, onOffline) {
  window.addEventListener('online', () => {
    console.log('[PWA] Network: Online');
    if (onOnline) onOnline();
  });
  
  window.addEventListener('offline', () => {
    console.log('[PWA] Network: Offline');
    if (onOffline) onOffline();
  });
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('[PWA] Notifications not supported');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Subscribe to push notifications
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey())
      });
      
      console.log('[PWA] Push subscription created:', subscription);
      
      // Send subscription to server
      await sendSubscriptionToServer(subscription);
    }
    
    return subscription;
  } catch (error) {
    console.error('[PWA] Push subscription failed:', error);
    throw error;
  }
}

/**
 * Background sync for offline actions
 */
export async function registerBackgroundSync(tag) {
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register(tag);
    console.log('[PWA] Background sync registered:', tag);
    return true;
  } catch (error) {
    console.error('[PWA] Background sync failed:', error);
    return false;
  }
}

/**
 * Cache important resources
 */
export async function cacheResources(urls) {
  if ('caches' in window) {
    const cache = await caches.open('rio-hub-v1');
    await cache.addAll(urls);
    console.log('[PWA] Resources cached:', urls.length);
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('[PWA] All caches cleared');
  }
}

// Helper functions
function showInstallButton() {
  // Emit event to show install button in UI
  window.dispatchEvent(new CustomEvent('pwa-install-available'));
}

function hideInstallButton() {
  // Emit event to hide install button in UI
  window.dispatchEvent(new CustomEvent('pwa-install-completed'));
}

function notifyUpdate() {
  // Emit event to notify user about update
  window.dispatchEvent(new CustomEvent('pwa-update-available'));
}

function getVapidPublicKey() {
  // TODO: Replace with your actual VAPID public key
  return 'YOUR_VAPID_PUBLIC_KEY';
}

async function sendSubscriptionToServer(subscription) {
  // TODO: Send subscription to your backend
  console.log('[PWA] Sending subscription to server:', subscription);
  // await fetch('/api/push-subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription)
  // });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

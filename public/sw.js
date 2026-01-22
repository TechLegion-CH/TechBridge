const CACHE_NAME = 'delibix-v1.0.0';
const STATIC_CACHE = 'delibix-static-v1.0.0';
const DYNAMIC_CACHE = 'delibix-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Core pages
  '/about',
  '/services',
  '/pricing',
  '/contact',
  // AI Tools
  '/ai-playground',
  '/ai-roi-calculator',
  '/ai-readiness-checklist',
  // Account pages
  '/login',
  '/signup',
  // Essential assets would be added here
  // '/css/main.css',
  // '/js/main.js',
];

// Assets to cache on demand
const CACHE_ON_DEMAND = [
  // Industry pages
  '/healthcare-digital',
  '/finance-digital',
  '/manufacturing-digital',
  '/retail-digital',
  // Regional pages
  '/southeast-asia',
  '/indonesia-digital',
  '/singapore-hub',
  // Business pages
  '/enterprise-solutions',
  '/demo-request',
  '/success-stories',
];

// Network-first strategies for these routes
const NETWORK_FIRST = [
  '/api/',
  '/admin-dashboard',
  '/account-dashboard',
  '/notifications',
  '/shopping-cart',
  '/system-status',
];

// Cache-first strategies for these assets
const CACHE_FIRST = [
  '/images/',
  '/icons/',
  '/screenshots/',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('SW: Install event');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activate event');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (different origin)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Main fetch handler
async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Network-first strategy for dynamic content
    if (shouldUseNetworkFirst(pathname)) {
      return await networkFirstStrategy(request);
    }
    
    // Cache-first strategy for static assets
    if (shouldUseCacheFirst(pathname)) {
      return await cacheFirstStrategy(request);
    }
    
    // Stale-while-revalidate for most pages
    return await staleWhileRevalidateStrategy(request);
    
  } catch (error) {
    console.log('SW: Fetch error:', error);
    return await handleFetchError(request);
  }
}

// Network-first strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(STATIC_CACHE);
        cache.then((c) => c.put(request, networkResponse));
      }
    }).catch(() => {
      // Ignore network errors for cache-first assets
    });
    
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Return cached response on network error
    return cachedResponse;
  });
  
  return cachedResponse || await networkPromise;
}

// Error handling for failed requests
async function handleFetchError(request) {
  const url = new URL(request.url);
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
  }
  
  // Return cached version if available
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return minimal response for other requests
  return new Response(JSON.stringify({
    error: 'Offline',
    message: 'You are currently offline. Please check your internet connection.'
  }), {
    status: 503,
    statusText: 'Service Unavailable',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Helper functions
function shouldUseNetworkFirst(pathname) {
  return NETWORK_FIRST.some(pattern => pathname.startsWith(pattern));
}

function shouldUseCacheFirst(pathname) {
  return CACHE_FIRST.some(pattern => 
    pathname.includes(pattern) || pathname.endsWith(pattern)
  );
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync:', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
  
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignup());
  }
});

async function syncContactForm() {
  try {
    const cache = await caches.open('form-submissions');
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('contact-form')) {
        const formData = await cache.match(request);
        const response = await fetch(request, {
          method: 'POST',
          body: await formData.text()
        });
        
        if (response.ok) {
          await cache.delete(request);
          console.log('SW: Contact form synced successfully');
        }
      }
    }
  } catch (error) {
    console.log('SW: Contact form sync failed:', error);
  }
}

async function syncNewsletterSignup() {
  try {
    const cache = await caches.open('form-submissions');
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('newsletter')) {
        const formData = await cache.match(request);
        const response = await fetch(request, {
          method: 'POST',
          body: await formData.text()
        });
        
        if (response.ok) {
          await cache.delete(request);
          console.log('SW: Newsletter signup synced successfully');
        }
      }
    }
  } catch (error) {
    console.log('SW: Newsletter sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('SW: Push notification received');
  
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New update from Delibix',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    data: data.data,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ],
    tag: data.tag || 'delibix-notification',
    renotify: true,
    vibrate: [200, 100, 200],
    requireInteraction: data.requireInteraction || false
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Delibix', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus existing window
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Update notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: CACHE_NAME
    });
  }
});

// Periodic background sync for cache cleanup
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupCaches());
  }
});

async function cleanupCaches() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response.headers.get('date');
      
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (now - responseDate > maxAge) {
          await cache.delete(request);
          console.log('SW: Cleaned up old cache entry:', request.url);
        }
      }
    }
  } catch (error) {
    console.log('SW: Cache cleanup failed:', error);
  }
}
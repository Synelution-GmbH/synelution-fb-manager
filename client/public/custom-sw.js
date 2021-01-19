console.log('Loaded service worker!');

self.addEventListener('push', (ev) => {
  if (!ev.data) return console.log('no payload');
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    // body: 'Hello, World!',
    icon: '/assets/synelution-icon.png',
    tag: 'fb-tool',
    ...data,
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    console.log('skipping');
    self.skipWaiting();
  }
});

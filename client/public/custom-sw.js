console.log('Loaded service worker!');

self.addEventListener('push', (ev) => {
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

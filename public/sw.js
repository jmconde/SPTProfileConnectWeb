self.addEventListener('push', function(event) {
  const options = {
      body: event.data ? event.data.text() : 'No payload',
      // icon: 'path/to/icon.png', // Optional
      vibrate: [100, 50, 100],
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };

  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );
});
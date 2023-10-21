const cacheName = "hello-world-pwa";
const cacheFiles = [
  "index.html",
  "service-worker.js",
  // Add other files you want to cache here
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});

// Function to send log messages to the main page
function logToMainPage(message) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        action: "log",
        message: message,
      });
    });
  });
}

// Function to send a push notification
function sendPushNotification() {
  self.registration.showNotification("Background Notification", {
    body: "This is a background push notification!",
    icon: "icon.png", // Replace with the path to your icon image
  });
}

// Schedule the interval for sending push notifications
self.addEventListener("message", (event) => {
  sendPushNotification(); // Send an initial notification
  // You can now use this function to send log messages
  logToMainPage("This is a log message from the service worker");
  console.log("message received", event.data);
  if (event.data === "startBackgroundNotifications") {
    sendPushNotification(); // Send an initial notification
    setInterval(sendPushNotification, 5000); // Send notifications every 30 seconds
  } else if (event.data === "stopBackgroundNotifications") {
    clearInterval(sendPushNotification);
  }
});

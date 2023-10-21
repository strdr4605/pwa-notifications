// Check if the browser supports the Notifications API
if ("Notification" in window) {
  // Request permission to display notifications
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      // Permission granted, enable the button
      document.getElementById("startNotificationsButton").disabled = false;
    }
  });
}

// Add a click event listener to the button
document
  .getElementById("startNotificationsButton")
  .addEventListener("click", function () {
    // Check if the browser supports the PushManager
    if ("PushManager" in window) {
      // Create a notification
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification("Hello from Your PWA", {
          body: "This is a push notification from your PWA!",
          icon: "mstile-150x150.png", // Replace with the path to your icon image
        });
      });
    }
  });

// Start the background job
document
  .getElementById("startNotificationsButton")
  .addEventListener("click", function () {
    console.log("startNotificationsButton clicked");
    navigator.serviceWorker.controller.postMessage(
      "startBackgroundNotifications",
    );
  });

// Stop the background job
document
  .getElementById("stopNotificationsButton")
  .addEventListener("click", function () {
    navigator.serviceWorker.controller.postMessage(
      "stopBackgroundNotifications",
    );
  });

// Add an event listener to receive log messages from the service worker
navigator.serviceWorker.addEventListener("message", (event) => {
  if (event.data.action === "log") {
    console.log(event.data.message);
  }
});

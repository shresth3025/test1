let vantaEffect;

function initVanta() {
  vantaEffect = VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    color: 0x4455CC,
    backgroundColor: 0x111111,
    maxDistance: 20.,
    netSpeed: 8.,
    points: 20.,
    scale: 1.,
    scaleMobile: 1.,
    spacing: 15.,
  });

  // Start the plant watering reminders
  startPlantWateringReminders();
}

function changeEffect(effect) {
  switch(effect) {
    case 'net':
      vantaEffect.setOptions({
        color: Math.random() * 0xffffff,
        backgroundColor: Math.random() * 0x000040,
        maxDistance: Math.random() * 30 + 1.0,
      });
      break;
  }
}

// Function to show a notification
function showNotification() {
  new Notification("🌱 Water Your Plants!", {
    body: "It's time to water your plants.",
  });
  playWateringSound(); // Play sound when notification shows
}

// Function to show an alert
function showAlert() {
  alert("🌱 Water Your Plants!");
  playWateringSound(); // Play sound when alert shows
}

// Function to play the watering sound
function playWateringSound() {
  const sound = new Audio('/azz.mp3'); // Use relative path after setting up a server
  sound.play();
}

// Request permission for notifications and start reminders
function startPlantWateringReminders() {
  if (Notification.permission === "granted") {
    setInterval(showNotification, 30000); // Notify every 30 seconds
    setInterval(showAlert, 30000); // Alert every 30 seconds
    showNotification(); // Immediate notification
    showAlert(); // Immediate alert
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        setInterval(showNotification, 30000); // Notify every 30 seconds
        setInterval(showAlert, 30000); // Alert every 30 seconds
        showNotification(); // Immediate notification
        showAlert(); // Immediate alert
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initVanta);

// Fullscreen toggle functionality
const fullscreenToggle = document.getElementById('fullscreen-toggle');

fullscreenToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    fullscreenToggle.textContent = 'Exit Fullscreen';
  } else {
    fullscreenToggle.textContent = 'Toggle Fullscreen';
  }
});

// Optional: Test notification button
document.getElementById('test-notification').addEventListener('click', showNotification);

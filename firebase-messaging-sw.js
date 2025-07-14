// firebase-messaging-sw.js
// Import and configure the Firebase SDK
// Give the service worker access to Firebase Messaging.
// Note: `messaging` is only available in the service worker for background messages.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getMessaging } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js';

// Replace with your Firebase config
// This configuration should match the one in your main HTML file
const firebaseConfig = {
    apiKey: "AIzaSyCdtBbWxJKiyR1igH45KKjy5UsXuPdCmi0",
    authDomain: "coupleflow-3c5d2.firebaseapp.com",
    projectId: "coupleflow-3c5d2",
    storageBucket: "coupleflow-3c5d2.firebaseapp.com",
    messagingSenderId: "1087616981568",
    appId: "1:1087616981568:web:3e21efc82aeb627d67dda5",
    measurementId: "G-Q49D43SNHH"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background messages
// When the app is not in focus (background/closed), this event listener fires.
self.addEventListener('firebase-messaging-msg', (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/path/to/your/icon.png' // Ganti dengan jalur ikon yang valid untuk PWA Anda
        // Anda dapat menambahkan lebih banyak opsi seperti data, actions, dll.
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: Handle notification click event (when user clicks the notification)
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Tutup notifikasi

    // Ini mencari klien (tab) yang sudah terbuka dan memfokuskannya.
    // Jika tidak ada klien yang ditemukan, ia akan membuka yang baru.
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            const appUrl = 'https://coupleflow.notify.app/'; // Ganti dengan URL aplikasi Anda yang sebenarnya
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes(appUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(appUrl);
            }
        })
    );
});

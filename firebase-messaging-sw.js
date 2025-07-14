// firebase-messaging-sw.js

// Import script Firebase SDK yang diperlukan untuk Service Worker
// Menggunakan versi 9.17.1 yang sesuai dengan konfigurasi awal dan index.html Anda
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

// Variabel global yang disediakan oleh lingkungan Canvas
// Jika Anda tidak menggunakan lingkungan Canvas, Anda bisa langsung menggunakan konfigurasi Firebase Anda di sini.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Fallback jika tidak di Canvas
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
    apiKey: "AIzaSyA5GRzA83x8DbaxUb5pRH_Yx0ZWMsCVN0w",
    authDomain: "jalan-cerita-5c989.firebaseapp.com",
    projectId: "jalan-cerita-5c989",
    storageBucket: "jalan-cerita-5c989.appspot.com",
    messagingSenderId: "606590919634",
    appId: "1:606590919634:web:039ddf6e2b7e13d0675e0b",
    measurementId: "G-9L0MLVQCNL"
};

// Inisialisasi Firebase di Service Worker
try {
    // Menggunakan firebase dari global scope yang dimuat oleh importScripts
    const app = firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging(app); // Dapatkan instance Firebase Messaging

    // Menangani pesan latar belakang (saat aplikasi tidak aktif)
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Pesan latar belakang diterima:', payload);

        const notificationTitle = payload.notification?.title || 'Pesan Baru';
        const notificationOptions = {
            body: payload.notification?.body || 'Anda memiliki pesan baru.',
            icon: '/icon/icon-192.png', // Diperbarui: Menggunakan /icon/icon-192.png
            data: payload.data // Data kustom yang dapat Anda gunakan saat notifikasi diklik
        };

        // Tampilkan notifikasi
        self.registration.showNotification(notificationTitle, notificationOptions);
    });

} catch (error) {
    console.error('[firebase-messaging-sw.js] Kesalahan inisialisasi Firebase di Service Worker:', error);
}


// Menangani klik notifikasi
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notifikasi diklik:', event);
    event.notification.close(); // Tutup notifikasi setelah diklik

    // Dapatkan URL yang ingin Anda buka
    const click_action = event.notification.data?.click_action || '/'; // Default ke root

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(click_action) && 'focus' in client) { // Menggunakan includes untuk fleksibilitas
                    return client.focus(); // Fokus pada tab yang sudah ada
                }
            }
            // Jika tidak ada tab yang cocok, buka tab baru
            if (clients.openWindow) {
                return clients.openWindow(click_action);
            }
        })
    );
});

// Anda bisa menambahkan logika caching atau strategi offline lainnya di sini
self.addEventListener('install', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker terinstal.');
    self.skipWaiting(); // Memaksa Service Worker baru untuk segera aktif
});

self.addEventListener('activate', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker aktif.');
    event.waitUntil(clients.claim()); // Mengklaim semua klien yang ada
});

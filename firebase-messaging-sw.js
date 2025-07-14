// firebase-messaging-sw.js
// Ini adalah Service Worker untuk Firebase Cloud Messaging (FCM)
// yang menangani pesan latar belakang (saat aplikasi tidak aktif).

// Mengimpor dan menginisialisasi Firebase SDK menggunakan versi global (non-modul)
// Ini adalah solusi sementara untuk lingkungan Canvas yang mungkin tidak mendukung modul ES
// untuk Service Worker. Untuk produksi, versi modul (import { initializeApp } from 'firebase/app';)
// lebih disukai jika lingkungan hosting Anda mendukungnya.
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

// Konfigurasi Firebase Anda
// Konfigurasi ini harus cocok dengan yang ada di file HTML utama Anda (index.html)
const firebaseConfig = {
    apiKey: "AIzaSyCdtBbWxJKiyR1igH45KKjy5UsXuPdCmi0",
    authDomain: "coupleflow-3c5d2.firebaseapp.com",
    projectId: "coupleflow-3c5d2",
    storageBucket: "coupleflow-3c5d2.firebaseapp.com",
    messagingSenderId: "1087616981568",
    appId: "1:1087616981568:web:3e21efc82aeb627d67dda5",
    measurementId: "G-Q49D43SNHH"
};

// Inisialisasi Firebase App
const app = firebase.initializeApp(firebaseConfig);
// Dapatkan instance Messaging
const messaging = firebase.messaging(app);

// Menangani pesan latar belakang
// Ketika aplikasi tidak dalam fokus (di latar belakang atau tertutup), listener ini akan diaktifkan.
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Menerima pesan latar belakang ', payload);

    // Sesuaikan notifikasi di sini
    const notificationTitle = payload.notification.title || 'Pesan Baru';
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/path/to/your/icon.png', // Ganti dengan jalur ikon yang valid untuk PWA Anda
        data: payload.data // Sertakan data kustom jika ada
        // Anda dapat menambahkan lebih banyak opsi seperti actions, image, dll.
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opsional: Menangani event klik notifikasi (saat pengguna mengklik notifikasi)
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Tutup notifikasi setelah diklik

    // Ini mencari klien (tab) yang sudah terbuka dan memfokuskannya.
    // Jika tidak ada klien yang ditemukan, ia akan membuka yang baru.
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            const appUrl = 'https://coupleflow.notify.app/'; // Ganti dengan URL aplikasi Anda yang sebenarnya
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                // Cek apakah klien sudah ada dan fokuskan
                if (client.url.includes(appUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Jika tidak ada klien yang cocok, buka jendela baru
            if (clients.openWindow) {
                return clients.openWindow(appUrl);
            }
        })
    );
});

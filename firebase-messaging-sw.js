// firebase-messaging-sw.js
// Ini adalah Service Worker Firebase Cloud Messaging.
// Pastikan file ini berada di root domain Anda.

importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Inisialisasi Firebase di Service Worker
// Gunakan konfigurasi Firebase yang sama dengan aplikasi web Anda.
// Anda harus mengganti nilai-nilai ini dengan konfigurasi proyek Firebase Anda sendiri.
const firebaseConfig = {
    apiKey: "AIzaSyCdtBbWxJKiyR1igH45KKjy5UsXuPdCmi0",
    authDomain: "coupleflow-3c5d2.firebaseapp.com",
    projectId: "coupleflow-3c5d2",
    storageBucket: "coupleflow-3c5d2.firebasestorage.app",
    messagingSenderId: "1087616981568",
    appId: "1:1087616981568:web:3e21efc82aeb627d67dda5",
    measurementId: "G-Q49D43SNHH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Tangani pesan latar belakang
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Kustomisasi notifikasi Anda di sini
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/path/to/your/icon.png' // Ganti dengan path ikon Anda
        // Anda juga bisa menambahkan data kustom di sini
        // data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opsional: Tangani klik notifikasi
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification clicked', event);
    event.notification.close();

    // Buka jendela baru atau fokus pada jendela yang sudah ada
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            } else {
                return clients.openWindow('/'); // Ganti dengan URL aplikasi Anda
            }
        })
    );
});

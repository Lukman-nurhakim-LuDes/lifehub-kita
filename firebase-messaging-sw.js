// Mengimpor skrip yang diperlukan dari Firebase CDN.
// Skrip ini akan tersedia di lingkup service worker.
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");

// Inisialisasi aplikasi Firebase di dalam service worker.
// Pastikan nilai konfigurasi ini sama dengan yang ada di index.html Anda.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Mengambil instance Firebase Messaging agar bisa menangani pesan di latar belakang.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Menerima pesan di latar belakang: ",
    payload
  );
  
  // Kustomisasi notifikasi yang akan muncul di HP di sini.
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "icon-192x192.png", // Path ke ikon aplikasi Anda
  };

  // Menampilkan notifikasi ke pengguna.
  self.registration.showNotification(notificationTitle, notificationOptions);
});

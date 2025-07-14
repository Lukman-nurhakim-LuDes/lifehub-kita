// Mengimpor skrip yang diperlukan dari Firebase CDN.
// Skrip ini akan tersedia di lingkup service worker.
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");

// Inisialisasi aplikasi Firebase di dalam service worker.
// Pastikan nilai konfigurasi ini sama dengan yang ada di index.html Anda.
const firebaseConfig = {
    apiKey: "AIzaSyA5GRzA83x8DbaxUb5pRH_Yx0ZWMsCVN0w",
    authDomain: "jalan-cerita-5c989.firebaseapp.com",
    projectId: "jalan-cerita-5c989",
    storageBucket: "jalan-cerita-5c989.appspot.com",
    messagingSenderId: "606590919634",
    appId: "1:606590919634:web:039ddf6e2b7e13d0675e0b",
    measurementId: "G-9L0MLVQCNL"
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
    icon: "/icons/icon-192x192.png", // Path ke ikon aplikasi Anda
  };

  // Menampilkan notifikasi ke pengguna.
  self.registration.showNotification(notificationTitle, notificationOptions);
});
// ============================================================
//  FIREBASE (opsional) — untuk menyimpan ucapan tamu secara online
//
//  Cara mengaktifkan:
//  1. Buka https://console.firebase.google.com  -> buat project
//  2. Tambah Web App, salin objek firebaseConfig ke bawah ini
//  3. Aktifkan "Firestore Database" (mode test/aturan sesuai kebutuhan)
//  4. Ganti enabled menjadi true
//
//  Jika enabled = false, ucapan hanya tersimpan di browser tamu
//  (localStorage) sebagai mode percobaan.
// ============================================================
window.FIREBASE_SETTINGS = {
  enabled: false,
  collection: "ucapan",
  config: {
    apiKey: "ISI_API_KEY",
    authDomain: "ISI_PROJECT.firebaseapp.com",
    projectId: "ISI_PROJECT_ID",
    storageBucket: "ISI_PROJECT.appspot.com",
    messagingSenderId: "ISI_SENDER_ID",
    appId: "ISI_APP_ID"
  }
};

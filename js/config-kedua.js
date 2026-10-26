// Konfigurasi halaman undangan kedua (musik berbeda).
// Memakai semua data dari config.js, hanya mengganti musik.
(function () {
  "use strict";
  if (!window.UNDANGAN) return;
  window.UNDANGAN.musik = "assets/music/lagu-kedua.mp3";
  window.UNDANGAN.halamanMusikLain = "index.html?buka=1";
})();

// ============================================================
//  KONFIGURASI UNDANGAN  —  edit bagian ini saja
// ============================================================
window.UNDANGAN = {
  // Waktu target hitung mundur (format ISO, zona WIB = +07:00)
  tanggalAcara: "2026-12-12T08:00:00+07:00",
  tanggalTeks: "Sabtu, 12 Desember 2026",

  mempelai: {
    wanita: {
      nama: "Siti Mariam",
      ayah: "Bapak [Nama Ayah]",
      ibu: "Ibu [Nama Ibu]"
    },
    pria: {
      nama: "Amar Ma'ruf N.M",
      ayah: "Bapak [Nama Ayah]",
      ibu: "Ibu [Nama Ibu]"
    }
  },

  akad: {
    tanggal: "Sabtu, 12 Desember 2026",
    jam: "08.00 WIB - Selesai",
    tempat: "Nama Tempat Akad",
    alamat: "Alamat lengkap tempat akad",
    maps: "https://maps.google.com/?q=Jakarta"
  },

  resepsi: {
    tanggal: "Sabtu, 12 Desember 2026",
    jam: "11.00 WIB - Selesai",
    tempat: "Nama Tempat Resepsi",
    alamat: "Alamat lengkap tempat resepsi",
    maps: "https://maps.google.com/?q=Jakarta"
  },

  // Tombol "Lihat Lokasi" di bagian Save The Date
  mapsUtama: "https://maps.google.com/?q=Jakarta",

  // Digital gift
  gift: [
    { jenis: "DANA", nomor: "081221324050", nama: "AMAR MA'RUF", logo: "D" },
    { jenis: "BANK BCA", nomor: "8801117597", nama: "AMAR MA'RUF", logo: "BCA" }
  ],

  musik: "assets/music/lagu.mp3",
  halamanMusikLain: "undangan-kedua.html?buka=1"
};

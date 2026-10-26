# Undangan Online — Amar & Mariam (tema Biru Malam & Emas)

## Struktur
```
index.html            halaman utama (musik: assets/music/lagu.mp3)
undangan-kedua.html   halaman dengan musik kedua (lagu-kedua.mp3)
css/style.css         seluruh tampilan
js/config.js          DATA UNDANGAN (tanggal, nama, tempat, rekening)  <- edit di sini
js/config-kedua.js    konfigurasi musik halaman kedua
js/script.js          cover, hitung mundur, musik, animasi, salin rekening
js/guestbook.js       form & daftar ucapan
js/firebase-config.js pengaturan Firebase (opsional)
assets/images/        foto & motif (ganti pria.jpg, wanita.jpg, cover.jpg)
assets/music/         lagu.mp3, lagu-kedua.mp3
```

## Yang perlu diganti
1. `js/config.js`: tanggal acara, nama orang tua, tempat, alamat, link Google Maps.
2. `assets/images/pria.jpg` & `wanita.jpg`: foto asli (rasio 3:4).
3. `assets/music/*.mp3`: file bawaan hanya nada contoh, ganti dengan lagu Anda.
4. Ucapan tamu: isi `js/firebase-config.js` lalu `enabled: true` agar ucapan tersimpan online.

## Nama tamu
Tambahkan `?to=Nama+Tamu` di akhir link, contoh:
`https://amarbhae.github.io/undangan-online/?to=Budi+Santoso`

## Upload ke GitHub Pages
Salin seluruh isi folder ke repository, commit, lalu Settings → Pages → branch `main`.

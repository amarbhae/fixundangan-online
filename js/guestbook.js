// Buku tamu: Firebase Firestore bila aktif, jika tidak memakai localStorage.
(function () {
  "use strict";

  var form = document.getElementById("formUcapan");
  var list = document.getElementById("daftarUcapan");
  if (!form || !list) return;

  var S = window.FIREBASE_SETTINGS || { enabled: false };
  var LS_KEY = "ucapan-undangan-amar-mariam";
  var db = null;

  var LABEL = { hadir: "Hadir", tidak: "Tidak hadir", ragu: "Belum pasti" };

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = String(s == null ? "" : s);
    return d.innerHTML;
  }

  function waktu(ts) {
    try {
      return new Date(ts).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric"
      });
    } catch (e) { return ""; }
  }

  function render(items) {
    if (!items.length) {
      list.innerHTML = '<p class="kosong">Belum ada ucapan.</p>';
      return;
    }
    list.innerHTML = items.map(function (u) {
      return '<article class="ucapan">' +
        '<header><strong>' + esc(u.nama) + '</strong>' +
        '<span class="badge badge-' + esc(u.hadir) + '">' + esc(LABEL[u.hadir] || "") + '</span></header>' +
        '<p>' + esc(u.pesan) + '</p>' +
        '<time>' + esc(waktu(u.waktu)) + '</time></article>';
    }).join("");
  }

  function bacaLocal() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
    catch (e) { return []; }
  }

  function simpanLocal(item) {
    var arr = bacaLocal();
    arr.unshift(item);
    try { localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(0, 100))); } catch (e) {}
    render(arr);
  }

  function initFirebase() {
    if (!S.enabled || typeof firebase === "undefined") return false;
    try {
      if (!firebase.apps.length) firebase.initializeApp(S.config);
      db = firebase.firestore();
      db.collection(S.collection).orderBy("waktu", "desc").limit(100)
        .onSnapshot(function (snap) {
          var arr = [];
          snap.forEach(function (doc) { arr.push(doc.data()); });
          render(arr);
        }, function () { render(bacaLocal()); });
      return true;
    } catch (e) {
      db = null;
      return false;
    }
  }

  if (!initFirebase()) render(bacaLocal());

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var nama = form.nama.value.trim();
    var hadir = form.hadir.value;
    var pesan = form.pesan.value.trim();
    var status = document.getElementById("statusUcapan");

    if (!nama || !hadir || !pesan) {
      status.textContent = "Mohon lengkapi nama, kehadiran, dan ucapan.";
      return;
    }

    var item = {
      nama: nama.slice(0, 60),
      hadir: hadir,
      pesan: pesan.slice(0, 500),
      waktu: Date.now()
    };

    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;

    function selesai() {
      btn.disabled = false;
      form.reset();
      status.textContent = "Terima kasih, ucapan Anda terkirim.";
      setTimeout(function () { status.textContent = ""; }, 4000);
    }

    if (db) {
      db.collection(S.collection).add(item).then(selesai).catch(function () {
        btn.disabled = false;
        status.textContent = "Gagal mengirim. Coba lagi.";
      });
    } else {
      simpanLocal(item);
      selesai();
    }
  });
})();

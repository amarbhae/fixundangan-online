(function () {
  "use strict";

  var C = window.UNDANGAN;
  if (!C) { console.error("config.js belum dimuat"); return; }

  function $(id) { return document.getElementById(id); }
  function setText(id, v) { var e = $(id); if (e) e.textContent = v; }
  function setHref(id, v) { var e = $(id); if (e) e.href = v; }

  // ---------- Isi konten dari config ----------
  setText("tglCover", C.tanggalTeks);
  setText("tglHero", C.tanggalTeks);

  setText("namaWanita", C.mempelai.wanita.nama);
  setText("ortuWanita", C.mempelai.wanita.ayah + " & " + C.mempelai.wanita.ibu);
  setText("namaPria", C.mempelai.pria.nama);
  setText("ortuPria", C.mempelai.pria.ayah + " & " + C.mempelai.pria.ibu);

  ["akad", "resepsi"].forEach(function (k) {
    setText(k + "Tgl", C[k].tanggal);
    setText(k + "Jam", C[k].jam);
    setText(k + "Tempat", C[k].tempat);
    setText(k + "Alamat", C[k].alamat);
    setHref(k + "Maps", C[k].maps);
  });
  setHref("mapsUtama", C.mapsUtama);
  setHref("gantiMusik", C.halamanMusikLain);

  // Nama tamu dari ?to=Nama+Tamu
  var params = new URLSearchParams(location.search);
  var tamu = params.get("to") || params.get("kepada");
  if (tamu) setText("namaTamu", tamu);

  // ---------- Digital gift ----------
  var giftBox = $("giftList");
  if (giftBox) {
    C.gift.forEach(function (g) {
      var el = document.createElement("div");
      el.className = "gift-card";
      var logo = document.createElement("span");
      logo.className = "gift-logo";
      logo.textContent = g.logo;
      var jenis = document.createElement("p");
      jenis.className = "gift-jenis";
      jenis.textContent = g.jenis;
      var no = document.createElement("p");
      no.className = "gift-no";
      no.textContent = g.nomor;
      var an = document.createElement("p");
      an.className = "gift-an";
      an.textContent = "a/n " + g.nama;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-ghost";
      btn.textContent = "Salin Nomor";
      btn.addEventListener("click", function () { salin(g.nomor, btn); });
      el.appendChild(logo); el.appendChild(jenis); el.appendChild(no);
      el.appendChild(an); el.appendChild(btn);
      giftBox.appendChild(el);
    });
  }

  function salin(teks, btn) {
    var asal = btn.textContent;
    function ok() {
      btn.textContent = "Tersalin ✓";
      setTimeout(function () { btn.textContent = asal; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teks).then(ok, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var t = document.createElement("textarea");
      t.value = teks; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      document.body.removeChild(t);
    }
  }

  // ---------- Hitung mundur ----------
  var target = new Date(C.tanggalAcara).getTime();
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var sisa = target - Date.now();
    if (isNaN(target)) return;
    if (sisa <= 0) {
      setText("cdHari", "00"); setText("cdJam", "00");
      setText("cdMenit", "00"); setText("cdDetik", "00");
      setText("cdInfo", "Hari bahagia telah tiba");
      return;
    }
    var s = Math.floor(sisa / 1000);
    setText("cdHari", pad(Math.floor(s / 86400)));
    setText("cdJam", pad(Math.floor((s % 86400) / 3600)));
    setText("cdMenit", pad(Math.floor((s % 3600) / 60)));
    setText("cdDetik", pad(s % 60));
  }
  tick();
  setInterval(tick, 1000);

  // ---------- Musik & buka undangan ----------
  var audio = $("musik");
  var tombolMusik = $("tombolMusik");
  if (audio) audio.src = C.musik;

  function updateIkon() {
    if (!tombolMusik) return;
    tombolMusik.classList.toggle("main", audio && !audio.paused);
    tombolMusik.setAttribute("aria-label", audio && !audio.paused ? "Jeda musik" : "Putar musik");
  }

  function putar() {
    if (!audio) return;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
    updateIkon();
  }

  if (tombolMusik) {
    tombolMusik.addEventListener("click", function () {
      if (audio.paused) putar(); else { audio.pause(); updateIkon(); }
    });
  }
  if (audio) {
    audio.addEventListener("play", updateIkon);
    audio.addEventListener("pause", updateIkon);
  }

  var cover = $("cover");
  function bukaUndangan() {
    document.body.classList.remove("terkunci");
    if (cover) cover.classList.add("tertutup");
    if (tombolMusik) tombolMusik.hidden = false;
    putar();
    window.scrollTo(0, 0);
  }
  var btnBuka = $("btnBuka");
  if (btnBuka) btnBuka.addEventListener("click", bukaUndangan);

  // ?buka=1 : lewati cover (dipakai tombol ganti musik)
  if (params.get("buka") === "1") bukaUndangan();
  else document.body.classList.add("terkunci");

  // ---------- Animasi muncul saat scroll ----------
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("tampil"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("tampil"); });
  }

  // ---------- Toggle form ucapan & kartu gift ----------
  function toggle(btnId, boxId) {
    var b = $(btnId), x = $(boxId);
    if (!b || !x) return;
    b.addEventListener("click", function () {
      var buka = x.hasAttribute("hidden");
      if (buka) x.removeAttribute("hidden"); else x.setAttribute("hidden", "");
      b.setAttribute("aria-expanded", buka ? "true" : "false");
    });
  }
  toggle("btnUcapan", "kotakUcapan");
  toggle("btnGift", "kotakGift");
})();

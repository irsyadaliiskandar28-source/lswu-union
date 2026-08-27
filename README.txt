LSWU — LOS SANTOS WORKERS UNION — WEBSITE FILES
================================================

Struktur folder:

  index.html          -> Beranda
  about.html           -> About Us
  activities.html      -> Our Activities
  organization.html    -> Struktur Organisasi
  partnership.html     -> Partnership
  news.html            -> News & Updates
  contact.html         -> Contact / Join Community
  css/style.css        -> Semua styling (dipakai bersama oleh semua halaman)
  js/main.js           -> Semua interaksi (menu mobile, animasi, dsb — dipakai bersama)
  assets/              -> Taruh gambar logo partner di sini

CARA MEMAKAI
------------
1. Ekstrak seluruh folder ini (jangan pisahkan file-filenya — index.html,
   css/, js/, dan assets/ harus tetap dalam satu folder yang sama).
2. Buka index.html langsung di browser untuk melihat website, atau upload
   seluruh folder ini ke hosting (Netlify, Vercel, GitHub Pages, cPanel, dll).

MENAMBAHKAN LOGO PARTNER
-------------------------
1. Simpan file logo partner di folder assets/, misalnya:
     assets/logo-partner-1.png
     assets/logo-partner-2.png
2. Buka partnership.html, cari baris <img src="assets/logo-partner-1.png" ...>
   dan sesuaikan nama file jika berbeda.
3. Ganti juga teks "Partner Name One" / "Partner Name Two" dengan nama
   partner resmi.

LINK DISCORD
------------
Semua tombol "Join Discord" di seluruh halaman sudah diarahkan ke:
  https://discord.gg/83dWM9myWm
Jika link berubah, cari & ganti string tersebut di semua file .html.

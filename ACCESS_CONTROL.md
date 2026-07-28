# Implementasi Otorisasi Akses Dashboard

Dashboard ini berjalan sebagai static site. Agar akses tetap melalui link tetapi wajib login, gunakan lapisan otorisasi di depan GitHub Pages, bukan login yang ditulis di HTML/JavaScript.

## Rekomendasi

Gunakan pola berikut:

```text
User membuka custom domain
  -> Cloudflare Access meminta login
  -> User tervalidasi berdasarkan email/domain/SSO
  -> Dashboard GitHub Pages ditampilkan
```

Contoh alamat:

```text
https://dashboard-strategi.nama-domain-anda.com
```

## Kenapa Tidak Login di HTML

Form login yang dibuat langsung di `index.html` atau `script.js` tidak aman untuk data internal. Password, aturan akses, atau logika validasi dapat dibaca dari browser. Karena itu otorisasi harus dilakukan di layer reverse proxy/identity provider seperti Cloudflare Access, Microsoft Entra ID, SSO internal, atau GitHub Enterprise private Pages.

## Data yang Perlu Disiapkan

- Custom domain atau subdomain, misalnya `dashboard-strategi.nama-domain-anda.com`.
- Daftar email pegawai yang boleh akses, atau domain email yang diizinkan.
- Opsi login yang digunakan:
  - Email OTP
  - Microsoft Entra ID / Azure AD
  - Google Workspace
  - SSO perusahaan

## Setup di GitHub Pages

1. Buka repository `joshfrans/dashboard-strategi-anggaran`.
2. Masuk ke `Settings` > `Pages`.
3. Pada bagian `Custom domain`, isi domain dashboard.
4. Klik `Save`.
5. Aktifkan `Enforce HTTPS` setelah sertifikat tersedia.

Jika memakai custom domain, GitHub Pages akan membuat atau membaca file `CNAME` di root repository.

## Setup DNS

Pada DNS provider domain, buat record:

```text
Type    : CNAME
Name    : dashboard-strategi
Target  : joshfrans.github.io
Proxy   : Enabled, jika memakai Cloudflare
```

Jika nama domain yang digunakan adalah `dashboard-strategi.nama-domain-anda.com`, maka `Name` cukup `dashboard-strategi`.

## Setup Cloudflare Access

1. Masuk ke Cloudflare Dashboard.
2. Pilih domain yang digunakan.
3. Pastikan DNS record dashboard sudah aktif dan proxied.
4. Masuk ke `Zero Trust`.
5. Buka `Access` > `Applications`.
6. Klik `Add an application`.
7. Pilih `Self-hosted`.
8. Isi:

```text
Application name : Dashboard Strategi & Evaluasi
Subdomain        : dashboard-strategi
Domain           : nama-domain-anda.com
Path             : kosongkan
```

9. Buat policy:

```text
Policy name : Pegawai PLN
Action      : Allow
Include     : Emails ending in @pln.co.id
```

Atau gunakan daftar email spesifik:

```text
Include : Emails
Value   : user1@pln.co.id, user2@pln.co.id
```

10. Simpan application.

## Pengujian

Setelah konfigurasi aktif:

1. Buka dashboard dari browser biasa.
2. Pastikan muncul halaman login Cloudflare Access.
3. Login memakai email yang diizinkan.
4. Pastikan dashboard terbuka.
5. Coba akses memakai email yang tidak diizinkan.
6. Pastikan akses ditolak.

## Catatan Penting

- Jangan membagikan URL GitHub Pages lama jika sudah memakai domain otorisasi.
- Jika masih ada akses langsung melalui `joshfrans.github.io`, pastikan GitHub Pages diarahkan ke custom domain.
- Gunakan HTTPS wajib.
- Hindari wildcard DNS seperti `*.nama-domain-anda.com` untuk mengurangi risiko domain takeover.
- Untuk data sensitif, gunakan data source yang tidak dipublikasikan di repository public.

## Alternatif Jika PLN Memakai GitHub Enterprise

Jika PLN menggunakan GitHub Enterprise Cloud, GitHub Pages dapat dibuat private sehingga hanya user yang memiliki akses repository yang dapat membuka dashboard. Opsi ini bisa digunakan tanpa Cloudflare Access, tetapi membutuhkan lisensi dan pengaturan Enterprise.

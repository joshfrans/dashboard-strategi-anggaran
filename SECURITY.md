# Security & Data Protection

Dashboard ini adalah static web dashboard. Semua file yang berada di repository public atau GitHub Pages harus dianggap dapat diakses oleh pihak yang memiliki URL langsung.

## Aturan Data

Jangan commit atau upload file berikut ke repository public:

- Data source mentah berisi informasi internal, personal, rahasia, atau belum disanitasi.
- File Excel monitoring kerja asli.
- File PowerPoint/PDF rapat internal.
- Link SharePoint internal.
- Email pegawai, NIK/NIP, nomor rekening, credential, token, password, API key, atau private key.

File yang boleh dipublish:

- File dashboard statis: `index.html`, `styles.css`, `script.js`.
- Aset visual yang sudah disetujui.
- Template kosong/sanitized untuk kebutuhan import data.
- Data agregat yang sudah disetujui untuk ditampilkan di dashboard.

## Proteksi yang Aktif di Repository

- `.gitignore` mencegah file kerja mentah seperti Excel, PowerPoint, PDF, CSV, dan dokumen internal ikut masuk commit.
- `tools/data-leak-scan.mjs` memindai file publik untuk pola token, credential, email PLN, SharePoint internal, private key, dan URL IP internal.
- GitHub Actions menjalankan scan saat push, pull request, manual run, dan setiap Minggu pukul 09:00 WIB.
- `robots.txt` dan meta `noindex` mencegah indexing mesin pencari.
- Content Security Policy membatasi sumber script, style, image, frame, dan koneksi.

Catatan: header seperti `X-Frame-Options` atau CSP `frame-ancestors` harus dipasang di layer hosting/reverse proxy seperti Cloudflare Access, karena GitHub Pages static tidak menyediakan konfigurasi header tersebut dari repository.

## Batasan

Proteksi repository tidak sama dengan otorisasi akses. Jika dashboard tetap berada di GitHub Pages public, data yang ditampilkan di HTML/JavaScript/JSON tetap dapat dilihat oleh siapa pun yang berhasil membuka file tersebut.

Untuk akses dengan login, gunakan salah satu:

- Cloudflare Access di depan custom domain.
- Microsoft Entra ID / SSO perusahaan.
- GitHub Enterprise private Pages.
- Hosting internal dengan reverse proxy authentication.

## Proses Aman Update Data

1. Simpan data source asli di lokasi internal, bukan di repository public.
2. Buat versi agregat/sanitized untuk dashboard.
3. Pastikan tidak ada email, credential, link internal, atau data personal.
4. Jalankan data leak scan sebelum push:

```bash
node tools/data-leak-scan.mjs
```

5. Upload perubahan setelah scan lulus.

## Jika Terjadi Kebocoran

1. Segera hapus file dari repository.
2. Rotate token/password jika ada credential yang terlanjur terunggah.
3. Bersihkan riwayat Git jika file sensitif sudah pernah masuk commit.
4. Nonaktifkan GitHub Pages sementara jika data sensitif terlanjur dipublish.
5. Laporkan ke tim keamanan internal.

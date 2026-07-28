# Dashboard Strategi & Evaluasi

Dashboard web statis untuk monitoring Strategi & Evaluasi, Investasi, AO Korporat, AO Kantor Pusat, serta Laporan & Analitik manajemen.

## Isi folder

- `index.html` - halaman utama dashboard
- `styles.css` - desain tampilan dashboard
- `script.js` - render dashboard, import/export data source, dan generator analitik
- `assets/` - aset dashboard, template data source, dan data statis pendukung
- `.github/workflows/security-weekly.yml` - pemeriksaan keamanan otomatis mingguan

## Cara pakai di GitHub Pages

1. Buat repository GitHub baru.
2. Upload semua file dalam folder ini ke repository.
3. Buka `Settings` > `Pages`.
4. Pada `Build and deployment`, pilih `Deploy from a branch`.
5. Pilih branch `main` dan folder `/root`.
6. Simpan, lalu tunggu GitHub membuat URL dashboard.

## Update data

Gunakan tombol `Import Data` pada dashboard atau export template Excel/JSON dari menu `Export Laporan`.

Data source Strategi & Evaluasi mendukung sheet:

- `01_Ratifikasi`
- `02_Change_Request`
- `03_Kinerja`
- `04_Penyusunan_Kebijakan`
- `05_Business_Excellence`
- `06_Investasi`
- `07_AO_Korporat`
- `08_AO_Kantor_Pusat`

## Pemeriksaan keamanan otomatis

Repository ini memiliki GitHub Actions `Weekly Security Scan` yang berjalan otomatis setiap Senin pukul 09:00 WIB dan bisa dijalankan manual dari tab `Actions`.

Pemeriksaan yang dilakukan:

- Secret scan untuk mencegah token/password ikut terpublikasi.
- CodeQL untuk mendeteksi pola JavaScript yang berisiko.
- OWASP ZAP baseline scan ke URL GitHub Pages untuk mengecek risiko umum pada halaman publik.

Catatan: scan otomatis membantu monitoring rutin, tetapi tidak menggantikan penetration test manual yang dilakukan oleh tim keamanan tersertifikasi, terutama jika dashboard nantinya memakai login, API internal, atau data sensitif.

# Dashboard Change Request Aplikasi

Dashboard web statis untuk monitoring Timeline Pekerjaan dan Change Request Aplikasi.

## Isi folder

- `index.html` - halaman utama dashboard
- `styles.css` - desain tampilan dashboard
- `script.js` - data contoh, render tabel, filter sederhana, dan export CSV

## Cara pakai di GitHub Pages

1. Buat repository GitHub baru.
2. Upload semua file dalam folder ini ke repository.
3. Buka `Settings` > `Pages`.
4. Pada `Build and deployment`, pilih `Deploy from a branch`.
5. Pilih branch `main` dan folder `/root`.
6. Simpan, lalu tunggu GitHub membuat URL dashboard.

## Update data

Untuk update data Change Request, ubah array `crData` pada file `script.js`.

Kolom utama:

- `app`
- `request`
- `progress`
- `status`
- `target`

Status yang didukung:

- `Selesai`
- `On Progress`
- `Belum Mulai`

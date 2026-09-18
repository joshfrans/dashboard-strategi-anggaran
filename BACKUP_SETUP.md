# Setup Backup Otomatis Dashboard

Backup harian dijalankan oleh GitHub Actions, sehingga laptop tidak perlu menyala.

## Jadwal

- Waktu: setiap hari pukul 01:00 WIB
- Workflow: `.github/workflows/daily-backup.yml`
- Output utama: ZIP full backup dashboard

## Tempat Backup Disimpan

Backup disimpan berlapis agar tidak ada satu titik yang bisa menghapus semuanya.

| Lapis | Tempat | Retensi | Keterangan |
| --- | --- | --- | --- |
| Harian | GitHub Artifact | 90 hari | Granularitas per hari, hangus otomatis |
| Terbaru | Release `backup-latest` | Selamanya | Ditimpa tiap kali backup berjalan |
| Bulanan | Release `backup-YYYYMM` | Selamanya | Dibuat sekali per bulan, tidak pernah ditimpa |

Release ada di tab `Releases` repository. Karena Release tidak punya masa
kedaluwarsa, arsip bulanan tetap ada meski Artifact harian sudah lewat 90 hari.

Workflow ini memerlukan permission `contents: write` khusus untuk membuat
Release. Ia tidak pernah melakukan push ke branch mana pun.

## Backup ke Google Drive

Folder tujuan:

```text
https://drive.google.com/drive/folders/1qTohLBmsuVdBO0UNKwgm4tq2uzMamQ5k
```

### Penting: service account tidak bisa dipakai untuk folder Drive pribadi

Cara yang sebelumnya tertulis di dokumen ini — membuat service account lalu
membagikan folder Drive kepadanya sebagai Editor — **tidak berhasil** bila
folder tujuan berada di My Drive akun Google pribadi (non-Workspace).

Alasannya aturan Google: service account tidak memiliki kuota penyimpanan
sendiri dan tidak dapat menjadi pemilik file di My Drive perorangan. Upload
akan gagal dengan pesan `Service Accounts do not have storage quota`,
seberapa pun luas izin yang diberikan pada foldernya. Solusi resmi Google
untuk service account adalah Shared Drive, dan Shared Drive hanya tersedia
pada Google Workspace.

Referensi: <https://developers.google.com/workspace/drive/api/guides/about-sdk>

### Pilihan yang berhasil

**A. Akun Google Workspace (paling rapi)**

1. Buat Shared Drive di akun Workspace.
2. Buat folder backup di dalam Shared Drive tersebut.
3. Tambahkan email service account sebagai anggota Shared Drive (Content manager).
4. Simpan JSON service account sebagai secret `GDRIVE_SERVICE_ACCOUNT_JSON`.
5. Ganti `GDRIVE_FOLDER_ID` di workflow dengan ID folder yang baru.

**B. OAuth token akun sendiri (untuk Gmail biasa)**

Memakai token akun Anda, bukan service account. File menjadi milik Anda dan
memakai kuota Anda, sehingga batasan di atas tidak berlaku.

1. Di Google Cloud Console, aktifkan Google Drive API dan buat OAuth client
   bertipe Desktop app.
2. Set publishing status OAuth consent screen ke **In production**. Bila
   dibiarkan `Testing`, refresh token kedaluwarsa setiap 7 hari dan backup
   akan berhenti diam-diam.
3. Di komputer lokal jalankan:

   ```bash
   rclone authorize "drive" "CLIENT_ID" "CLIENT_SECRET"
   ```

4. Salin token JSON yang dikeluarkan perintah tersebut.
5. Simpan sebagai secret repository `GDRIVE_OAUTH_TOKEN`, lalu sesuaikan step
   `Upload backup to Google Drive` agar memakai `token` dan bukan
   `service_account_file`.

Referensi: <https://rclone.org/drive/>

## Catatan Keamanan

- Jangan commit file credential ke repository; simpan hanya di GitHub Secrets.
- Repository ini publik, sehingga Release dan Artifact backup juga dapat
  diakses publik. Isi ZIP sama dengan isi repository, jadi tidak menambah
  paparan data baru — tetapi jangan memasukkan file sensitif ke repository
  dengan asumsi backup-nya privat.
- Folder Drive backup saat ini berbagi dengan `anyone with the link` sebagai
  reader. Batasi bila backup tidak dimaksudkan untuk dibaca publik.
- Bila belum ada kredensial Drive yang dipasang, backup tetap berjalan ke
  GitHub Artifact dan Release; hanya langkah Drive yang dilewati.

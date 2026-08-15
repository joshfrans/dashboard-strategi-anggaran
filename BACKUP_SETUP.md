# Setup Backup Otomatis Dashboard

Backup harian dijalankan oleh GitHub Actions, sehingga laptop tidak perlu menyala.

## Jadwal

- Waktu: setiap hari pukul 01:00 WIB
- Workflow: `.github/workflows/daily-backup.yml`
- Output utama: ZIP full backup dashboard
- Retensi GitHub Artifact: 90 hari

## Folder Google Drive Tujuan

Folder ID:

```text
1qTohLBmsuVdBO0UNKwgm4tq2uzMamQ5k
```

Folder:

```text
https://drive.google.com/drive/folders/1qTohLBmsuVdBO0UNKwgm4tq2uzMamQ5k
```

## Agar Upload ke Google Drive Berjalan Tanpa Laptop

1. Buat Google Cloud Service Account.
2. Download credential JSON service account.
3. Share folder Google Drive backup ke email service account sebagai Editor.
4. Di GitHub repository, buka:

```text
Settings > Secrets and variables > Actions > New repository secret
```

5. Tambahkan secret:

```text
Name  : GDRIVE_SERVICE_ACCOUNT_JSON
Value : isi lengkap file JSON service account
```

Setelah secret tersedia, workflow akan:

1. Checkout repository terbaru.
2. Mengambil data source online Strategi & Evaluasi dari Google Sheets bila dapat diakses.
3. Membuat ZIP full backup.
4. Menyimpan ZIP sebagai GitHub Artifact.
5. Mengunggah ZIP ke folder Google Drive backup.

## Catatan Keamanan

- Jangan commit file credential JSON ke repository.
- Credential Google hanya boleh disimpan di GitHub Secrets.
- Jika secret belum dipasang, backup tetap berjalan sebagai GitHub Artifact, tetapi belum masuk Google Drive.

# WIB — Waktu Indonesia Bergibah

Platform komunitas hiburan WIB berbasis Next.js + Prisma + PostgreSQL.

## Fitur backend
- Registrasi, login, logout dengan session cookie HTTP-only.
- PostgreSQL melalui Prisma.
- Pembuatan dan pembacaan gibah melalui API.
- Komentar tersimpan di database.
- Notifikasi otomatis saat gibah mendapat komentar.
- Homepage tidak lagi berisi contoh gibah.

## Setup lokal
1. `npm install`
2. Salin `.env.example` menjadi `.env`.
3. Isi `DATABASE_URL` dengan PostgreSQL kamu.
4. Jalankan `npx prisma migrate dev --name init`.
5. Jalankan `npm run dev`.

## Vercel
Tambahkan environment variable `DATABASE_URL` pada Project Vercel yang terhubung dengan repository ini, lalu deploy ulang. Jangan pernah commit password database atau secret ke GitHub.

## Catatan
Schema database berada di `prisma/schema.prisma`. Database remote memerlukan PostgreSQL yang tersedia dan `DATABASE_URL` di environment Vercel.
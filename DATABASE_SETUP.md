# Database Setup Guide

## Current Configuration

Your application is configured to use **Neon PostgreSQL** (cloud database).

## Database Connection Issues?

If you see the error: `Can't reach database server at localhost:5432`, it means your `.env.local` file is overriding the Neon database URL with a local PostgreSQL connection.

## Solutions

### Option 1: Use Neon Database (Recommended)

1. Make sure `.env.local` has the DATABASE_URL commented out:

   ```env
   # DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blacksilk"
   ```

2. The app will automatically use the Neon database from `.env`:

   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_9NgBCAq1SUhD@ep-broad-voice-a815b2vk.eastus2.azure.neon.tech/neondb?sslmode=require"
   ```

3. If Neon database is hibernated, visit [Neon Console](https://console.neon.tech) to wake it up

### Option 2: Use Local PostgreSQL

1. Install PostgreSQL 15 or higher
2. Create a database named `blacksilk`
3. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/blacksilk"
   ```
4. Run migrations:
   ```bash
   npx prisma db push
   ```

### Option 3: Use Docker PostgreSQL

1. Install Docker Desktop
2. Run PostgreSQL container:
   ```bash
   docker run --name blacksilk-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=blacksilk -p 5432:5432 -d postgres:15
   ```
3. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blacksilk"
   ```
4. Run migrations:
   ```bash
   npx prisma db push
   ```

## Useful Commands

- **Check database connection**: `npx prisma db push`
- **Regenerate Prisma Client**: `npx prisma generate`
- **View database in Studio**: `npx prisma studio`
- **Reset database**: `npx prisma migrate reset` (⚠️ Deletes all data!)

## Troubleshooting

### "Can't reach database server"

- Check if `.env.local` DATABASE_URL is commented out
- Verify Neon database is not hibernated
- If using local PostgreSQL, ensure it's running

### "Invalid `prisma.user.findUnique()` invocation"

- Run `npx prisma generate` to regenerate the client
- Restart your dev server

### Source Map Warnings

These are development warnings and don't affect functionality. They've been suppressed in `next.config.mjs`.

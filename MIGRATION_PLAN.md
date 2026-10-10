# Migration Plan: SQLite to PostgreSQL for JFS Goods Transport

This document outlines the step-by-step process to migrate from SQLite to PostgreSQL using Prisma ORM in a Next.js (App Router) environment.

## 1. Environment Configuration
Update your `.env` file to replace the SQLite file path with the PostgreSQL connection string.

### Local Setup (Docker/Native)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/jfs_db?schema=public"
```

### Cloud Setup (Neon / Supabase)
- **Neon:** Use the pooled connection string for production.
- **Supabase:** Use the Transaction mode (port 6543) for serverless environments.
```env
# Example Neon Connection String
DATABASE_URL="postgresql://user:pass@ep-cool-name.us-east-2.aws.neon.tech/neondb?sslmode=require"
# If using pooling
DIRECT_URL="postgresql://user:pass@ep-cool-name.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

---

## 2. Prisma Schema Update
Modify `prisma/schema.prisma` to change the datasource provider and adjust models for PostgreSQL compatibility.

### Changes Required:
- **Provider:** Change `provider = "sqlite"` to `provider = "postgresql"`.
- **Primary Keys:** SQLite supports `String` ids, but PostgreSQL works best with `Int` autoincrement or `Uuid`/`Cuid`.
- **Enums:** PostgreSQL supports native Enums.
- **JSON:** Use the native `Json` type for complex objects (like shipment history).

---

## 3. Implementation Steps

### Step 3.1: Install Dependencies
```bash
npm install prisma @prisma/client
```

### Step 3.2: Initialize/Update Prisma
```bash
npx prisma generate
```

### Step 3.3: Database Migration
1. **Reset/Clear SQLite:** Ensure your local data is backed up.
2. **Create PostgreSQL Migration:**
   ```bash
   npx prisma migrate dev --name init_postgresql
   ```

---

## 4. Data Migration Strategy

### Option A: Manual Script (Recommended for small-medium data)
Create a script that reads from the old database (SQLite/JSON) and writes to PostgreSQL using Prisma.

### Option B: Tooling (pgloader)
If the SQLite database is large, use `pgloader`:
```bash
pgloader sqlite:///path/to/sqlite.db postgresql://user:pass@localhost/dbname
```

---

## 5. Production Optimization (Vercel)

### Connection Pooling
Since Next.js API routes are serverless, many small connections can exhaust the PostgreSQL connection limit. 
- Use **Prisma Accelerate** or **PgBouncer** (native in Supabase/Neon).
- Ensure `DATABASE_URL` in Vercel points to the pooled connection.

### Build Step
Add Prisma generation to your build script in `package.json`:
```json
"postinstall": "prisma generate"
```

---

## 6. Testing Checklist
- [ ] Verify CRUD operations for Bookings.
- [ ] Verify Shipment tracking (handling JSON history).
- [ ] Verify Admin authentication and Driver management.
- [ ] Check Pricing updates.
- [ ] Test Review submission and status updates.

---

## 7. Migration Pitfalls
- **Case Sensitivity:** PostgreSQL is case-sensitive for table/column names if quoted. Prisma handles this, but be careful with raw queries.
- **Timestamp Precision:** PostgreSQL has higher precision than SQLite; ensure your frontend doesn't break on slight date format changes.
- **Enums:** If you use Enums, adding a new value requires a migration in PostgreSQL, unlike SQLite where it's usually just a string check.

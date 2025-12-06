# FUV Planner

Full-stack starter for FUV Planner with a React + TypeScript (Vite) frontend and an Express + Prisma backend. TailwindCSS handles UI styling. Authentication uses JWT with role-based authorization (student/admin). The database schema is defined with Prisma (SQLite by default for local dev, portable to PostgreSQL).

## Stack decisions
- **Frontend:** React + TypeScript + Vite, styled with TailwindCSS. React Router powers the page shell (landing, auth, student area, admin area).
- **Backend:** Express + TypeScript + Prisma ORM. JWT-based auth keeps us self-contained; switching to Supabase is possible but this approach runs anywhere.
- **Database:** Prisma schema targets SQLite for quick local setup. Swap `provider` to `postgresql` in `schema.prisma` for production. Models cover users, courses, requirement groups/items, student plans, and chat messages.
- **Shared logic:** `packages/shared` contains requirement and GPA utilities (double-counting rules, cross-listed handling, capstone eligibility checks) to keep backend and frontend consistent.

## Project layout
```
FUV_Pathways/
├── apps/
│   ├── api/        # Express API + Prisma schema and routes
│   └── web/        # Vite React frontend with Tailwind
├── packages/shared # Shared TypeScript utilities for academic logic
└── tsconfig.base.json
```

## Getting started
1. Install Node.js (18+) and npm. (The execution environment here blocked `apt-get`; install Node via your preferred method on your machine.)
2. Install dependencies from the repo root: `npm install`.
3. Copy environment variables: `cp apps/api/.env.example apps/api/.env` and adjust secrets/ports as needed.
4. Run database migrations and generate the Prisma client:
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   ```
5. Start both frontend and backend from the repo root:
   ```bash
   npm run dev
   ```
   - API: http://localhost:4000
   - Frontend: http://localhost:5173

Build commands:
- Frontend only: `npm run build:web`
- Backend only: `npm run build:api`
- Shared utils: `npm run build:shared`

## API overview
- `POST /auth/register` – Create student account (defaults to student role)
- `POST /auth/login` – Login and receive JWT
- `GET /courses` – Public course search; admin-only CRUD via POST/PUT/DELETE
- `GET /requirements` – Requirement groups/items; admin CRUD endpoints provided
- `GET /planner` – Authenticated planner progress summary with requirement + capstone calculations
- `POST /planner` – Add course to planner; PUT/DELETE to update
- `GET /chat/:courseId` & `POST /chat/:courseId` – Course-level chat feed

## Frontend pages
- **Landing:** intro + CTA
- **Auth:** combined login/register
- **Dashboard:** progress cards and planner guidance
- **Degree Requirements:** overview tiles (hooks up to API later)
- **Course Explorer:** search results with requirement chips
- **Planner:** semester-by-semester plan list
- **Admin dashboard:** metrics + PDF upload placeholder

## Notes
- Tailwind is configured via `apps/web/tailwind.config.js`; update `content` paths if you add packages.
- Prisma schema uses `Json` for cross-listed courses to keep SQLite compatibility; move to a join table for PostgreSQL.
- Requirement logic lives in `packages/shared/src/academic.ts` and enforces two-group double-counting plus cross-list equivalence.

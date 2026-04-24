# Job Application Tracker

A personal job application tracker built with Next.js and MongoDB, and Better Auth. This app lets authenticated users manage job applications with kanban-style boards, add new application cards, and keep application status in sync.

## Features

- Email/password authentication with `better-auth`
- MongoDB storage for user data and job application boards
- Kanban-style board for tracking application status
- Create, update, and delete job applications
- Protected dashboard and auth pages using server-side session handling
- Responsive UI built with Tailwind CSS, `shadcn` components, and `@dnd-kit`

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- MongoDB + Mongoose
- Better Auth
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `lucide-react`, `clsx`, `class-variance-authority`

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root with at least the following values:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
BETTER_AUTH_SECRET=some-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_BASE_URL=http://localhost:3000
```

For Vercel deployment, add matching production values in your Vercel dashboard:

```env
MONGODB_URI=<your-production-mongodb-uri>
BETTER_AUTH_SECRET=<your-production-secret>
BETTER_AUTH_URL=https://<your-vercel-app>.vercel.app
NEXT_PUBLIC_AUTH_BASE_URL=https://<your-vercel-app>.vercel.app
```

- `MONGODB_URI` is required for both the application and auth adapter.
- `BETTER_AUTH_SECRET` is used to sign auth sessions.
- `BETTER_AUTH_URL` is the base URL for the auth backend on the server.
- `NEXT_PUBLIC_AUTH_BASE_URL` is used by the client auth helper.
- If `NEXT_PUBLIC_AUTH_BASE_URL` is not set, the client falls back to the local `/api/auth` route.

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Seed sample data (optional)

If you want to populate initial job applications, run:

```bash
npm run seed:jobs
```

## Scripts

- `npm run dev` - start Next.js in development mode
- `npm run build` - build the production app
- `npm run start` - run the production build
- `npm run lint` - run ESLint
- `npm run seed:jobs` - seed the database with sample job application data

## Project structure

- `app/` - page routes and auth flow
- `components/` - shared UI components and board cards
- `lib/` - database setup, auth utilities, actions, models, and helpers
- `public/` - static assets
- `scripts/seed.ts` - sample data seeding script

## Notes

- Auth pages are protected through `proxy.ts`, which handles redirecting authenticated users away from sign-in/sign-up routes.
- New users receive an initialized board via `lib/auth/auth.ts` database hooks.

## License

This project is currently private and not licensed for public distribution.

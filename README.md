# Resolve — Customer Support Desk

A polished MERN support-ticket demo with three role-based workspaces. React + Vite frontend, Node.js + Express API, and optional MongoDB persistence through Mongoose.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:5173. Choose Customer, Agent, or Admin to explore the demo. To serve a production build locally: `npm run build` then `npm start` and open http://localhost:3001.

## Try the full workflow

1. Customer: create a ticket with priority, category and optional attachments.
2. Switch to Admin: open that ticket and assign Jamie Chen.
3. Switch to Agent: add a reply, change status to In progress, then Resolved.
4. Switch back to Customer: see the reply, attachments and activity history.

Includes search, priority/status filters, pagination, dashboard counts, registration, password login, attachments (PNG/JPG/PDF/TXT, three files up to 500KB each), and responsive layouts.

## Storage and security

Without configuration, this is a **public demonstration** with shared sample identities and temporary in-memory data. Data can reset on restart/cold start and is not consistent across multiple serverless instances. Do not enter private or real customer information. Demo login is intentionally public and its signing key is not secret.

For persistent storage, copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. With `DEMO_MODE=true`, MongoDB gets sample users and tickets once. Keep a demo database separate from real data.

For private operation, use a fresh database, set `DEMO_MODE=false`, and set `JWT_SECRET` to at least 32 random characters. Registration always creates a customer. Provision agent/admin accounts by registering normal accounts and updating their `role` in MongoDB under operator control. There is no public role-promotion endpoint.

The backend enforces ownership on ticket listing, details, replies and attachments. Customers only access their own tickets. Agents only access assigned tickets. Only admins assign agents; only staff change status/priority. Passwords use salted scrypt; sessions use expiring JWTs. API input validation and rate limiting are included.

This first demo is not production-hardened: add password reset/email verification, object storage with malware scanning, stronger distributed rate limiting, audit retention and monitoring before real customer use. Embedded attachments are intentionally small. MongoDB queries currently load tickets before filtering; move pagination/filtering to indexed database queries when scaling.

## Vercel

Import this repository into Vercel using the Vite framework preset. `vercel.json` builds the React frontend and routes `/api/*` to the Express function in `api/index.js`. Set `MONGODB_URI`, `JWT_SECRET`, and `DEMO_MODE` in Vercel project environment variables for persistent operation. No credentials belong in Git.

## Verification

```sh
npm test
npm run build
```

API tests cover the customer → admin → agent → customer workflow, cross-customer access denial, unassigned agent access denial, role escalation prevention, login, filtering, pagination and attachment validation.

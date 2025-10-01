# JobSeeker Frontend (JobSeeker 2.0)

Quick start:

1. Copy .env as needed (already present for local dev).
2. Install deps:
   npm install
3. Start dev server:
   npm run dev
4. The app expects backend at VITE_API_BASE_URL (default http://localhost:4000/api/v1).

Notes:
- Uses React + Vite + Axios.
- Auth uses JWT stored in localStorage (simple) and AuthContext for global state.
- Keep .env values updated when deploying.

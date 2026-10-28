# Saint Charles de Jesus TSS — School Website

Website for **Saint Charles de Jesus TSS**, a private Catholic technical secondary school in Kagarama, Kicukiro District, Kigali City.
Every word, photo and figure on the site is editable from a built-in admin dashboard.

| Part | Stack |
| --- | --- |
| `frontend/` | React 19, Vite, Tailwind CSS 3, React Router 7, Axios, lucide-react |
| `backend/` | Node.js, Express 5, JWT auth; content in Upstash Redis (production) or a JSON file (local); media in Vercel Blob (production) or on disk (local) |
| `api/` | Vercel entry point that exposes the Express app as one serverless function |

## Quick start (local)

```bash
npm run install:all      # installs root, backend and frontend dependencies
npm run dev              # starts the API on :5000 and the React app on :5173
```

Open <http://localhost:5173>. The admin dashboard is at <http://localhost:5173/admin>.

**Default admin login:** `admin` / `admin1234` — change it in *Admin → My account* after first login,
or set `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `backend/.env` (copy `backend/.env.example`) before the first run.

Locally no cloud account is needed: content is stored in `backend/data/db.json` and uploads land in `frontend/public/uploads/`.

## What is on the site

- **Home** – campus hero (video on desktop, photo on phones), intro, quick links, "Why join" with programme cards, head teacher's quote, news band, partner row.
- **Our School** – about, head teacher's message, facilities, policies & procedures, work with us.
- **Admissions** – entry points and documents, per-term fee tables (day / boarding) with bank accounts, online application form.
- **Academic Life** – academic staff, TSS programmes (SOD, CSA, AUT, MAT, Levels 3–5) and Level 1 trades (welding, tailoring, carpentry, domestic electricity, automobile), each with its own page.
- **Student Life** – discover the school, calendar and events, clubs, sports, photo gallery.
- **News, Alumni, Contacts** (map with GPS pin and directions), FAQs, privacy policy.
- **Report a concern** form in the footer of every page.

The site is responsive and has been checked on phone widths down to 320 px.

## Admin dashboard

- **Pages** – site settings (contacts, socials, logo, announcement bar, exact GPS location with a *Use my current location* button), home page, about, head teacher's message, admissions & fees, student life & calendar, alumni, work with us, policies intro.
- **Content** – programmes, news, testimonials, staff, facilities, clubs, sports, calendar events, FAQs, gallery, policies, vacancies (add / edit / reorder / delete).
- **Inbox** – contact messages, online applications and reported concerns, with status tracking and CSV export.
- **Media library** – upload photos, PDFs (fees letter, handbook) and MP4 (hero video). Every image field also accepts a pasted URL.

Content is one JSON document created from `backend/src/seed.js` the first time the store is empty.

## Photos and media

`frontend/public/uploads/` holds the school's own media, served at `/uploads/...`: the campus photo and the hero video rendered from it
(`campus-hero.mp4`, a slow pan from the roof), the head teacher's portrait and 29 workshop photos (`st-01.jpg` … `st-29.jpg`:
tailoring 1–3, automobile 4–18, welding 19, manufacturing 20–25, electricity 26, carpentry 27–29).
Computer labs, classrooms, boarding, chapel and sports still use stock placeholders until real photos are uploaded.

Files uploaded through the admin go to Vercel Blob in production (public URLs such as `https://….public.blob.vercel-storage.com/uploads/…`)
and to `frontend/public/uploads/` locally. Camera photos of 10 MB or more are fine: the browser sends them straight to Blob.

## Deploying on Vercel

The repository is set up as **one Vercel project**: the built frontend is served from the CDN and `/api/*` runs the Express app as a single
serverless function (`api/index.js`, routed by `vercel.json`). Same origin, so no CORS and no `VITE_API_URL`.

1. **Import** the GitHub repo in Vercel (Add New → Project). Root Directory `./`, Framework *Other*; build, output and install commands come from `vercel.json`.
2. **Storage** tab → create **Upstash for Redis** (free plan) and **Blob** (public). Connect both to Production, Preview and Development. This adds
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and `BLOB_READ_WRITE_TOKEN` to the project.
3. **Settings → Environment Variables**: `JWT_SECRET` (long random string, e.g. `openssl rand -hex 48`), `ADMIN_USERNAME`, `ADMIN_PASSWORD`
   (only used if the store has no users yet), `NODEJS_HELPERS=0`. For the *Preview* environment also set `DB_KEY=scj:preview` so preview
   deployments never touch the live content.
4. **Deploy** (Deployments → Redeploy, or push a commit). Check `/api/health` (should report `"storage":"redis"`), then `/` and `/admin/login`.
5. **Copy your real content up** (the local `backend/data/db.json` is not in git). From this folder:
   ```bash
   npx vercel link                              # choose the project
   npx vercel env pull backend/.env.vercel      # downloads the Upstash credentials
   DOTENV_CONFIG_PATH=backend/.env.vercel node backend/scripts/push-db.js --force
   ```
   (`--force` replaces the seed document the first deploy created; a backup of it is written to `backend/data/db.remote.backup.json`.
   `--pull` downloads the live document for a backup.) Your admin password travels with the document.
6. Log in, open **Media**, upload a photo and confirm it renders on the public site.

### Custom domain

What you need: a registered domain, access to its DNS settings, and the Vercel project. HTTPS certificates are issued and renewed by Vercel automatically.

- Buy the domain: a **`.rw`** name (for example `stcharlesdejesus.rw`) from a RICTA-accredited registrar in Rwanda, or a **`.com` / `.org`**
  from Vercel itself (Domains tab, pays by card and needs no DNS work) or a registrar such as Namecheap.
- Vercel → Project → **Settings → Domains** → add `yourdomain.rw` and `www.yourdomain.rw`.
- At the registrar, either add the records Vercel shows (**A** `@ → 76.76.21.21`, **CNAME** `www → cname.vercel-dns.com`) or point the
  domain's nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- Wait for "Valid Configuration" (minutes to 48 hours). Pick `www` or the bare domain as primary; the other redirects.

## Self-hosting instead of Vercel

```bash
npm run build            # builds frontend/dist
npm start                # Express serves the API, /uploads and the built site on PORT (default 5000)
```

Without the Upstash/Blob variables the backend keeps using `backend/data/db.json` and `frontend/public/uploads/`; back both up.
Set a strong `JWT_SECRET` in `backend/.env`.

## Project layout

```
api/index.js            Vercel function entry (exports the Express app)
vercel.json             Build settings and routing (SPA fallback, /api → function)
frontend/src
  components/           Navbar, Footer, Hero, cards, Report-a-concern form
  pages/                Public pages (home, about, admissions, academics, student life, news, contacts…)
  admin/                Dashboard, schema-driven editors, submissions inbox, media library
  context/              Content and auth providers
  lib/                  API client, upload helper (Blob or disk), formatting
frontend/public/uploads Committed media (photos, hero video)
backend/src
  app.js                Express app (no listen); used by api/index.js and index.js
  index.js              Local / self-hosted server: static files + app
  db.js                 Content store: Upstash Redis or JSON file
  seed.js               Default content
  routes/               auth, content, collections, submissions, upload
backend/scripts/push-db.js   Copies the local content to Upstash (or pulls it back)
```

## Design

School palette: deep blue `#064187` sections and footer, yellow `#FFC53A` buttons and dividers,
blue headings `#3E6FA8` / links `#4981C2`, red hero button `#FF0606`, yellow news band `#FFBD33`. Fonts: Inter (body), Work Sans (headings),
Cormorant Garamond (thin serif hero and logo text), Poppins (footer). Colours live in `frontend/tailwind.config.js`; shared button and
form styles in `frontend/src/index.css`.

## Known limitations

- The content store is a single document: two saves at the same instant (an admin edit and a public form submission) are last-writer-wins.
- Login and form rate limits are per serverless instance; a strong `JWT_SECRET` and admin password are the real protection.
- Media URLs in Vercel Blob are public to anyone who has the link.

## Still to fill in

- Head teacher's name (Admin → Home page and Head teacher's message), staff names and portraits.
- Social media links, partner logos (RTB, NESA, MINEDUC, Archdiocese currently shown as text), exact term dates, school history.

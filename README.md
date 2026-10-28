# Saint Charles de Jesus TSS — School Website

Website for **Saint Charles de Jesus TSS**, a private Catholic technical secondary school in Kagarama, Kicukiro District, Kigali City.
Every word, photo and figure on the site is editable from a built-in admin dashboard.

| Part | Stack |
| --- | --- |
| `frontend/` | React 19, Vite, Tailwind CSS 3, React Router 7, Axios, lucide-react |
| `backend/` | Node.js, Express 5, JSON-file database, JWT auth, Multer uploads |

## Quick start

```bash
npm run install:all      # installs root, backend and frontend dependencies
npm run dev              # starts the API on :5000 and the React app on :5173
```

Open <http://localhost:5173>. The admin dashboard is at <http://localhost:5173/admin>.

**Default admin login:** `admin` / `admin1234` — change it in *Admin → My account* after first login,
or set `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `backend/.env` (copy `backend/.env.example`) before the first run.

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

Everything on the public site comes from `backend/data/db.json`, which is created from `backend/src/seed.js` on first run
(delete the file to re-seed).

- **Pages** – site settings (contacts, socials, logo, announcement bar, exact GPS location with a *Use my current location* button), home page, about, head teacher's message, admissions & fees, student life & calendar, alumni, work with us, policies intro.
- **Content** – programmes, news, testimonials, staff, facilities, clubs, sports, calendar events, FAQs, gallery, policies, vacancies (add / edit / reorder / delete).
- **Inbox** – contact messages, online applications and reported concerns, with status tracking and CSV export.
- **Media library** – upload photos, PDFs (fees letter, handbook) and MP4 (hero video). Every image field also accepts a pasted URL.

## Photos and media

`backend/uploads/` holds the school's own media: the logo, the campus photo and the hero video rendered from it
(`campus-hero.mp4`, a slow pan from the roof), the head teacher's portrait and 29 workshop photos (`st-01.jpg` … `st-29.jpg`:
tailoring 1–3, automobile 4–18, welding 19, manufacturing 20–25, electricity 26, carpentry 27–29).
Computer labs, classrooms, boarding, chapel and sports still use stock placeholders until real photos are uploaded.

## Production

```bash
npm run build            # builds frontend/dist
npm start                # Express serves the API and the built site on PORT (default 5000)
```

Set a strong `JWT_SECRET` in `backend/.env`. Back up `backend/data/db.json` and `backend/uploads/` — they hold all content and files.

## Project layout

```
frontend/src
  components/   Navbar, Footer, Hero, cards, Report-a-concern form
  pages/        Public pages (home, about, admissions, academics, student life, news, contacts…)
  admin/        Dashboard, schema-driven editors, submissions inbox, media library
  context/      Content and auth providers
backend/src
  index.js      Express app
  db.js         JSON-file store
  seed.js       Default content
  routes/       auth, content, collections, submissions, upload
backend/uploads Media files (committed: logo, photos, hero video)
```

## Design

School palette: deep blue `#064187` sections and footer, yellow `#FFC53A` buttons and dividers,
blue headings `#3E6FA8` / links `#4981C2`, red hero button `#FF0606`, yellow news band `#FFBD33`. Fonts: Inter (body), Work Sans (headings),
Cormorant Garamond (thin serif hero and logo text), Poppins (footer). Colours live in `frontend/tailwind.config.js`; shared button and
form styles in `frontend/src/index.css`.

## Still to fill in

- Head teacher's name (Admin → Home page and Head teacher's message), staff names and portraits.
- Social media links, partner logos (RTB, NESA, MINEDUC, Archdiocese currently shown as text), exact term dates, school history.

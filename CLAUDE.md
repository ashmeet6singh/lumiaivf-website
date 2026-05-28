# Lumia Website — Marketing & Coming-Soon Site

This folder will eventually hold the **public marketing website** for the Lumia IVF Companion App. The site's purpose is to establish a public presence, explain what Lumia is, and **collect email sign-ups from interested users** so they can be notified at launch.

---

## ⚠️ Hard rule: do NOT build the website yet

This folder is currently a **context shelf**, not a project. The user has explicitly said they will give the instructions, commands, and rules for building the website later.

Until the user explicitly says *"now build the website"* (or scaffolds a Vite project, asks for a landing page, asks for components, etc.):

- ❌ Do not run `npm create vite@latest` or any scaffolding command
- ❌ Do not create `package.json`, `src/`, `index.html`, `vite.config.ts`, `tailwind.config.js`, or any source files
- ❌ Do not install dependencies
- ❌ Do not write React components, pages, or styles
- ✅ Only update this `CLAUDE.md`, the `brand/`, or `copy/` folders when explicitly asked

When the user gives the build command, use everything in this file plus the files in `brand/` and `copy/` as the source of truth.

---

## The app this website markets

**Lumia** is a warm, empathetic mobile web app for women going through IVF (in-vitro fertilisation) treatment.

- **Source code:** `/Users/ashmeetsingh/Projects/Bloom APP/`
- **Live app:** [bloom-ivf.netlify.app](https://bloom-ivf.netlify.app)
- **Status:** Prototype. Currently being tested with one real user (the developer's wife). No backend, no auth, no multi-user — all data lives in localStorage.
- **App's CLAUDE.md** (full technical context): `/Users/ashmeetsingh/Projects/Bloom APP/CLAUDE.md`

### What it does
- Tracks daily IVF medications with time-based reminders
- Logs scans (follicle counts per ovary, lining thickness, E2 levels)
- Records mood and symptoms alongside clinical data
- Visualises the cycle journey through phases: Setup → Suppression → Stimulation → Trigger → Retrieval → Transfer
- Charts E2 and follicle growth over time (Reports view)
- Tracks periods and predicts the next one
- Supports both English (EN) and Polish (PL)

---

## User persona

**Who Lumia is for:**

- Women undergoing IVF treatment — from initial consultation through embryo transfer
- Emotionally invested, often anxious, navigating a complex multi-week protocol
- Needs to track medications, appointments, scans, and symptoms — but also wants to feel seen, not processed
- European audiences are a primary focus (hence EN + PL i18n from day one)
- May want to share data with a partner or doctor

**What they're frustrated with:**

- Existing IVF/fertility apps feel **clinical and cold** — built for data entry, not the human experience
- Generic period trackers don't understand the IVF protocol phases or medication complexity
- Important information is scattered across paper printouts, clinic portals, and text messages from nurses

**What they want from Lumia:**

- A single warm place to track their journey
- Gentle reminders, not alarming alerts
- Visual progress through the cycle (not just numbers)
- Privacy and a sense of being in control of their own data

---

## The problem Lumia solves

IVF is emotionally taxing and physically complex. The treatment cycle spans weeks and involves multiple daily medications, frequent scans, blood tests, and emotional ups and downs. Existing tools are either clinical (built for clinicians) or generic (built for casual cycle tracking).

**Lumia is a warm companion that:**

1. Tracks the clinical reality (meds, scans, blood tests, follicle counts)
2. Acknowledges the emotional reality (mood logs, gentle copy, celebration of small wins)
3. Speaks like a friend, not a chart — *"Good morning, [Name]"*, *"Great job keeping track of your journey"*
4. Visualises the journey by phase so users always know where they are
5. Works on the phone (mobile-first, PWA-capable on iOS)

---

## Brand voice

- **Warm, compassionate, non-clinical** — speaks to the whole person, not just clinical metrics
- **Encouraging, celebratory** — celebrates the act of logging and self-care, not just outcomes
- **Direct, second-person** — *"Where are you in your journey?"*, *"This helps us label your appointments"*
- **Plain language** — no medical jargon overload; technical terms are introduced gently
- **Subtle growth/bloom emoji** — 🌱 🌿 🌸 — used sparingly to reinforce the growth metaphor; never gratuitous

### Sample phrases (from the actual app)

- *"Welcome to Lumia. Your warm, compassionate companion for the IVF journey."*
- *"Good morning, [Name]"* / *"Good afternoon"* / *"Good evening"*
- *"Where are you in your journey?"* → *"Starting Fresh 🌱"* vs. *"Already Started 🌿"*
- *"Is this your first IVF cycle?"*
- *"What happened today?"*
- *"Logged successfully! Great job keeping track of your journey."*

The full library of in-app copy is in `copy/en.ts` and `copy/pl.ts`. Re-use this voice on the website.

---

## Visual identity

### Colors (full palette in `brand/tokens.css`)

| Role | Hex | Description |
|---|---|---|
| Primary | `#7B5EA7` | Mauve / soft purple — the signature Lumia colour |
| Surface (background) | `#FAF6F1` | Ivory linen — calm, warm base |
| Surface (cards) | `#FFFFFF` | Pure white |
| Secondary | `#E8D5C4` | Dusty peach |
| Tertiary | `#7A9E7E` | Sage green |
| On-Surface (text) | `#1C1C19` | Dark charcoal |
| Error | `#BA1A1A` | Clinical red (minimal use) |

**Hero gradient:** `linear-gradient(135deg, #7B5EA7 → #994529)` — mauve to warm terracotta.

### Typography

- **Headlines:** `Literata` (serif), 28–40px, weights 600–700 — editorial, premium, soft
- **Body:** `DM Sans` (sans-serif), 14–18px, weights 400–500 — clean, legible

Both are loaded from Google Fonts (see app's `index.html` for the link tags).

### Shape & feel

- **Border radii:** 4px / 12px / 16px / 20px / 9999px (full pill)
- **Spacing:** 8px base unit; card padding ~24px; section gaps 16–24px
- **Shadows:** soft purple-tinted — e.g., `rgba(123, 94, 167, 0.05–0.1)` — never harsh
- **Motion:** micro-animations via Framer Motion — gentle ease, never bouncy or aggressive

### Logo / mark

- `brand/favicon.svg` — the abstract bloom motif used in the app
- iOS PWA meta: title is just *"Lumia"*

---

## Tech stack (locked in advance for when the website build begins)

When the user gives the go-ahead to scaffold the website, use:

- **Vite + React 19 + TypeScript** — mirrors the app exactly
- **Tailwind CSS** — utility classes mapped to tokens from `brand/tokens.css`
- **Framer Motion** — for the same gentle micro-animations the app uses
- **Lucide React** — same icon set as the app
- **i18n: EN + PL from day one** — re-use the same dictionary + `useLanguage()` hook pattern from the app (`src/i18n/en.ts`, `src/i18n/pl.ts`, `src/contexts/LanguageContext.tsx`)
- **Routing:** React Router DOM if multi-page, otherwise single-file
- **Deployment target:** Netlify (same as the app)

### Open decisions (to confirm when build starts)

- **Email-capture provider:** undecided. Options to discuss when build begins:
  - Netlify Forms (zero backend, free tier, simplest)
  - Mailchimp / ConvertKit / Resend / Buttondown (lets you send the launch email directly)
- **Domain:** TBD (currently the app is at `bloom-ivf.netlify.app`)
- **Number of pages:** unknown — could start as a single coming-soon page and grow

---

## Files in this folder

```
Lumia Website/
├── CLAUDE.md              ← this file
├── .gitignore             ← ready for when a Vite project is scaffolded
├── brand/
│   ├── tokens.css         ← copy of the app's design tokens
│   ├── global.css         ← copy of the app's global styles
│   ├── favicon.svg        ← the Lumia logo mark
│   └── DESIGN.md          ← Stitch design system reference from the app
└── copy/
    ├── en.ts              ← English i18n dictionary (full app copy library)
    └── pl.ts              ← Polish i18n dictionary
```

**Note:** the files in `brand/` and `copy/` are **snapshots**, not live links. If the app's tokens or copy change, they need to be re-copied from `/Users/ashmeetsingh/Projects/Bloom APP/`.

---

## When the user is ready to build

Likely first instructions will be something like *"now scaffold a Vite + React + TS + Tailwind project here with a single coming-soon page"*. At that point:

1. Read `brand/tokens.css` and `brand/global.css` to know the design tokens
2. Read `copy/en.ts` to absorb the voice
3. Read `brand/DESIGN.md` for the Stitch design system reference
4. Ask the user any clarifying questions (provider for email capture, domain, etc.)
5. Then scaffold and build

Until then: hold the context, do nothing.

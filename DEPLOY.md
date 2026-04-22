# Deploy Checklist — The Archive

Status as of the current commit: **ready to deploy to Vercel staging,
blocked on domain purchase for production.**

---

## 0. Outstanding decisions

Before running `vercel deploy`, decide on these and tick the box:

- [ ] **Next.js version.** We are currently on `next@14.2.35` and
  `npm audit` reports 5 high-severity CVEs in that line:
    1. DoS via Image Optimizer remotePatterns (we don't use `next/image`, so not applicable).
    2. HTTP request deserialization DoS in RSC.
    3. HTTP request smuggling in rewrites (we have no rewrites).
    4. Unbounded `next/image` disk cache growth (not applicable).
    5. DoS with Server Components.

  **Options:**
    - **A — Stay on Next 14.** Vercel's platform patches most of the
      attack surface upstream, and our build is fully static. This is
      the lowest-risk path *if you trust Vercel's infrastructure
      patching cadence*.
    - **B — Upgrade to Next 15 (recommended).** Next 15 is current
      stable. The App Router is unchanged; changes are mostly internal.
      Run `npm install next@15 eslint-config-next@15` and re-run
      `npm run build` to verify.
    - **C — Upgrade to Next 16** (via `npm audit fix --force`). Larger
      breaking changes than 15; only worth it if we have specific 16
      features in mind.

- [ ] **Domain.** `gravenspire.com` is not yet registered. See §3.

- [ ] **Fonts: stay on `next/font/google` (current) or switch to
  `next/font/local` with committed woff2 files?** The current setup
  fetches fonts from Google at build time and bundles them locally; at
  runtime they are served from our origin. Fully self-hosted would
  commit the woff2 files to the repo and remove the Google build-time
  dependency. Fine to defer.

---

## 1. Vercel — project setup

### First-time

1. Visit https://vercel.com/new and import the `gravenspire-website`
   repo (or run `vercel` in the project dir if the CLI is installed).
2. **Framework preset:** Next.js (auto-detected; `vercel.json` pins
   this explicitly).
3. **Root directory:** the repo root.
4. **Build command:** `next build` (default).
5. **Install command:** `npm install` (default).
6. **Output directory:** `.next` (default; do not override).
7. **Node version:** 18.17 or higher (`engines` field in
   `package.json` enforces this).

### Environment variables

Set these in Vercel → Project → Settings → Environment Variables.
None are required for the current deploy; these are for when the
ledger form ships:

| Variable | Scope | Notes |
|---|---|---|
| `RESEND_API_KEY` | Production + Preview | Transactional confirmation emails |
| `LOOPS_API_KEY` | Production + Preview | Newsletter subscription management |
| `LOOPS_NEWSLETTER_LIST_ID` | Production + Preview | The list/audience the ledger signs people into |

**Do not commit any of these.** `.gitignore` excludes `.env.local`.
`.env.example` has placeholder names only.

### Deploy a preview

First deploy should go to a Vercel preview URL (not production), to
verify builds and social cards work without a domain attached:

```bash
cd /Users/brian/Desktop/gravenspire-website
vercel
# Answer "yes" to linking, accept defaults, and let it deploy to
# a preview URL like gravenspire-website-xyz.vercel.app
```

Spot-check on that preview URL:

- [ ] `/` — homepage typography, four doorways
- [ ] `/world/vampire-court` — Court dispatch on vellum paper
- [ ] `/world/ghoul-syndicate` — Syndicate note on ochre parchment
- [ ] `/world/living-resistance` — Resistance notice on linen
- [ ] `/design/art` — master palette with swatches
- [ ] `/devlog` — index and seed post link
- [ ] `/devlog/a-notice-posted-in-the-trade-district` — full post
- [ ] `/ledger` — placeholder
- [ ] A deliberate 404 URL, e.g. `/nope` — renders custom not-found
- [ ] Favicon in the tab (small pinned-document icon)
- [ ] `/sitemap.xml` — returns all 11 URLs
- [ ] `/robots.txt` — returns allow-all + sitemap reference
- [ ] OG card preview via https://www.opengraph.xyz/ pasted with
      the preview URL — shows the dark serif social card

---

## 2. Production deploy

**Only after Vercel preview is verified.** Run:

```bash
vercel --prod
```

Or merge/push to `main` once the Vercel GitHub integration is
connected; production deploys will auto-trigger on push.

---

## 3. Domain — gravenspire.com

The user brief says to register via Cloudflare Registrar. This is a
real-money action and must be performed by the owner; I will not
execute it. The steps are:

### Purchase

1. Log in to Cloudflare (https://dash.cloudflare.com/).
2. Navigate to **Registrar → Register Domain**.
3. Search `gravenspire.com`. If available, purchase (~$9/yr .com
   at-cost pricing; Cloudflare Registrar does not mark up).
4. Complete WHOIS privacy setup (Cloudflare does this by default).

### Point at Vercel

Once the domain is registered and in your Cloudflare account:

1. In Vercel → Project → Settings → Domains, add `gravenspire.com`
   and `www.gravenspire.com`.
2. Vercel will display the DNS records required. There are two options:

   **Option A (recommended): Use Cloudflare DNS, proxy OFF.**
      - In Cloudflare DNS for gravenspire.com, add:
        - `A @ 76.76.21.21` (Vercel's IP) — **proxy: OFF (DNS only)**
        - `CNAME www cname.vercel-dns.com` — **proxy: OFF (DNS only)**
      - Vercel handles the TLS cert via Let's Encrypt.

   **Option B: Use Vercel's nameservers.**
      - In Cloudflare Registrar, change nameservers to those Vercel
        displays. You lose Cloudflare's DNS features but gain
        simplicity. Only do this if you are certain you want Vercel
        to handle all DNS for this domain.

   **Do not proxy through Cloudflare (orange cloud ON).** Vercel
   and Cloudflare proxying interact badly — Vercel's Edge caching
   assumes direct traffic, and Cloudflare's caching can strip
   Vercel's headers. Proxy OFF is the boring, correct choice.

3. Wait for Vercel to verify DNS. Usually <5 minutes.
4. Vercel will provision a TLS certificate automatically.
5. In Vercel, set the primary domain to `gravenspire.com` and enable
   the automatic `www.gravenspire.com → gravenspire.com` redirect.

### Update site metadata

Edit `app/layout.tsx` and ensure:
- `metadataBase` is `https://gravenspire.com` (already set)
- Canonical URLs resolve correctly (Next does this automatically
  when `metadataBase` is set)

---

## 4. Post-launch housekeeping (not blocking deploy)

- [ ] Author remaining 3 faction pages (Academy, Cult, Collective).
- [ ] Wire the `/ledger` form (Resend + Loops).
- [ ] Add Plausible or similar privacy-respecting analytics.
- [ ] Set up uptime monitoring (Vercel has this built-in; enable).
- [ ] Mobile viewport audit (deferred from earlier checkpoint).
- [ ] Replace the system-serif OG card fallback with proper Cardo.
- [ ] Convert `next/font/google` to `next/font/local` if you want
      no build-time dependency on Google's font CDN.
- [ ] Add a proper press page at `/press` when there is something
      to press-kit.

---

## 5. Rollback plan

If a deploy breaks production:

1. In Vercel → Deployments, find the last-known-good deployment.
2. Click `...` → **Promote to Production**. Rollback is instant.
3. File a commit-level revert in git, push, let Vercel deploy the
   revert.

Because the site is fully static, rollback is safe and has no state
consequences.

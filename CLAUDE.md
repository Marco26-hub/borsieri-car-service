# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Il contenuto del sito, la documentazione e i commit sono in italiano: mantieni questa lingua nel copy e nei file `.md`.

## Comandi

```bash
npm install                # Node >= 22.13.0
npm run dev                 # next dev, funziona anche su Windows/PowerShell
npm run build                # next build -> export statico in out/
npm test                      # build + node --test tests/rendered-html.test.mjs
npm run lint                   # eslint (ignora dist e .next)
npm run preview                 # server statico su out/ (python3 -m http.server 8080)
```

Singolo test dopo una build gia fatta:

```bash
node --test --test-name-pattern "renders the dedicated tire booking page" tests/rendered-html.test.mjs
```

`preview` richiede `python3` nel PATH (su Windows spesso `python`).

## Architettura

Next.js puro con `output: "export"` e `trailingSlash: true` in [next.config.ts](next.config.ts): `npm run build` genera HTML statico in `out/`, da caricare nella document root del dominio Tophost. Nessun runtime server: niente route handler, niente server action, niente accesso a DB in pagina. Ogni funzione dinamica del sito e client-side (`"use client"`) o delegata a servizi esterni (Google Calendar, endpoint PHP).

### Pagine

- [app/page.tsx](app/page.tsx) — landing unica con sezioni ancorate (`#servizi`, `#meccanica`, `#lavorazioni`, `#contatti`) e JSON-LD `AutoBodyShop` iniettato via `dangerouslySetInnerHTML`.
- [app/prenotazione-cambio-gomme/page.tsx](app/prenotazione-cambio-gomme/page.tsx) — pagina prenotazione (`id="prenota"`, che **non** deve esistere nella landing). Supporta `?servizio=gomme-nuove#scegli-gomme` per preselezionare "Gomme nuove" dal CTA della landing.
- [app/prenotazione-cambio-gomme/BookingConfigurator.tsx](app/prenotazione-cambio-gomme/BookingConfigurator.tsx) — componente client: flag intervento/gestione pneumatici, form preventivo gomme nuove (dati cliente/veicolo obbligatori, numero preventivo opzionale) e gestione appuntamento (nuova prenotazione, modifica, annullamento).
- [app/CookieConsent.tsx](app/CookieConsent.tsx) — banner consenso client-side (`localStorage`, chiave `borsieri-external-consent`); l'iframe Google Calendar nella pagina prenotazione si carica solo dopo consenso esplicito.
- Stile: un solo foglio globale [app/globals.css](app/globals.css), nessun CSS module, `<img>` nativo (`images.unoptimized`). Immagini WebP locali con varianti mobile/desktop in `public/` — niente hotlink a CDN esterne.
- SEO: `metadataBase` su `https://www.borsiericarservice.it` in [app/layout.tsx](app/layout.tsx); [app/sitemap.ts](app/sitemap.ts) e [app/robots.ts](app/robots.ts) sono `force-static` e vanno aggiornati a mano quando si aggiunge una pagina.

### Prenotazione: Google Calendar

`NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL` viene **inlinata a build time** — va impostata in `.env.local` prima di `npm run build`, non basta sull'host. `buildGoogleAppointmentUrl` accetta solo host che terminano con `calendar.google.com` e forza `gv=true`; se la variabile manca o e invalida la pagina mostra la card placeholder "Calendario Google pronto al collegamento" (comportamento coperto dai test).

### Preventivo pneumatici: endpoint PHP

`public/api/preventivo.php` viene copiato dall'export in `out/api/preventivo.php` e chiamato dal configuratore via `fetch("/api/preventivo.php")` con `URLSearchParams`. Invia a `borsiericar@gmail.com` con `mail()`; include honeypot `website`, rate limit 45s per IP su file in temp dir, whitelist di campi con troncamento e sanificazione CRLF. Non e testabile in locale: `npm run preview` serve file statici senza PHP. Modificando i campi del form vanno allineati `$fields`/`$required` nel PHP.

`public/.htaccess` finisce nella root di `out/` ed e specifico per Apache/Tophost: redirect a `www` + HTTPS, security header, cache/`Expires` lunga per asset statici (`css`/`js`/`webp`/font) e corta per l'HTML, `mod_deflate`, `ErrorDocument 404 /404.html`. Le direttive sono protette da `IfModule`: se Tophost non espone un modulo (`mod_deflate`, `mod_expires`) la direttiva viene semplicemente ignorata invece di rompere il vhost.

### Test come contratto di contenuto

[tests/rendered-html.test.mjs](tests/rendered-html.test.mjs) legge gli HTML in `out/` (per questo `npm test` esegue prima la build) e asserisce su stringhe di copy, id di sezione, nomi immagini, email di contatto e schema JSON-LD. Un terzo test verifica la coerenza tra `next.config.ts`, `package.json`, `HANDOFF.md`, `GO_LIVE_CHECKLIST.md`, `.env.example`, `.htaccess` e il PHP. Cambiare copy, rinominare un id o spostare l'email di contatto rompe i test: aggiorna le assertion nello stesso commit.

## Deploy

Il dominio `borsiericarservice.it` punta gia allo spazio web Tophost (DNS A record). Il workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builda ed esegue upload FTPS di `out/` su ogni push a `main` (secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`, `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`); dettagli in [HANDOFF.md](HANDOFF.md).

## Stato go-live

Passaggi aperti (booking page Google definitiva, foto reali cliente, conferma promo -10%, dati orari/ferie) in [HANDOFF.md](HANDOFF.md) e [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md); tienili aggiornati quando cambia il flusso di prenotazione o di deploy, visto che i test li controllano.

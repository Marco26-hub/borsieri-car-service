# Borsieri Car Service

Sito production-ready per Borsieri Car Service S.r.l., carrozzeria specializzata a San Fermo della Battaglia, vicino a Como.

## Stack

- Next.js/Vinext
- TypeScript
- Supabase REST API per richieste prenotazione
- Hosting previsto: Vercel sul dominio ufficiale `borsiericarservice.it`

## Setup locale

```bash
npm install
npm run dev
```

## Build Netlify

```bash
npm run build
```

## Build Sites preview

```bash
npm run build:sites
```

## Variabili ambiente

Copia `.env.example` in `.env.local` e imposta:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Non committare file `.env*` reali.

## Supabase

Eseguire lo script:

```text
supabase/001_appointments.sql
```

Il form prenotazione invia le richieste a:

```text
/api/appointments
```

Se Supabase non e configurato, l'endpoint risponde con errore esplicito e non simula prenotazioni riuscite.

## Go-live

Vedi `GO_LIVE_CHECKLIST.md`.

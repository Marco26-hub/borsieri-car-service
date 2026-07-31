# Borsieri Car Service

Sito production-ready per Borsieri Car Service S.r.l., carrozzeria specializzata a San Fermo della Battaglia, vicino a Como.

## Stack

- Next.js/Vinext
- TypeScript
- Google Calendar Appointment Schedule inline per prenotazione cambio gomme
- Hosting previsto: Netlify sul dominio ufficiale `borsiericarservice.it`

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

- `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`

Non committare file `.env*` reali.

## Google Calendar

Il cliente deve creare in Google Calendar una booking page per il cambio gomme e copiare il link da:

```text
Booking pages > Sharing options > Website embed > Inline booking page
```

Usare il link `https://calendar.google.com/calendar/appointments/schedules/...` come valore di `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`.

Nel Booking form Google vanno aggiunti questi campi obbligatori:

- `Tipo intervento`: Cambio gomme, Riparazione gomma, Sola convergenza.
- `Gestione pneumatici`: Gomme sue, Gomme nuove, Gomme in magazzino, Gomme da portare.
- `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
- `Rubrica cliente`: telefono, auto, targa opzionale e note.

## Go-live

Vedi `GO_LIVE_CHECKLIST.md`.

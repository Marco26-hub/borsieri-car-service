# Borsieri Car Service - Handoff locale

## Stato progetto

Il progetto production-ready si trova in questa cartella:

```text
/Users/md/Documents/Borsieri/site
```

Repository GitHub:

```text
https://github.com/Marco26-hub/borsieri-car-service.git
```

Branch principale:

```text
main
```

Ultima preview produzione privata:

```text
https://borsieri-car-service.beige-fawn-1352.chatgpt.site
```

Questa preview non e il dominio ufficiale del cliente. Il sito andra pubblicato sul dominio ufficiale quando saranno disponibili credenziali Vercel/DNS.

## Cosa e gia pronto

- Landing moderna mobile-first.
- Logo ufficiale integrato.
- Palette coerente con il brand Borsieri: nero, arancio, silver.
- Posizionamento professionale su carrozzeria specializzata.
- Sezioni per carrozzeria, meccanica, pneumatici e lavorazioni.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Calendario integrato direttamente nel sito.
- CTA collegate: valutazione in sede, prenotazione cambio gomme, lavorazioni, telefono, email e indicazioni Google Maps.
- SEO/GEO tecnico: metadata, canonical, Open Graph, sitemap, robots e schema LocalBusiness/AutoBodyShop.
- Endpoint `POST /api/appointments` pronto per Supabase.
- Script Supabase in `supabase/001_appointments.sql`.
- `.env.example` con variabili richieste.

## Comportamento del form prenotazioni

Il form e collegato a:

```text
/api/appointments
```

Se Supabase non e configurato, il form non simula una prenotazione riuscita. Mostra invece un messaggio chiaro che invita a contattare l'officina telefonicamente.

Quando Supabase sara configurato con le variabili ambiente, le richieste verranno salvate nella tabella:

```text
appointments
```

## Cosa resta da fare quando arrivano le credenziali

1. Collegare il repository GitHub a Netlify.
2. Creare o selezionare il progetto Supabase.
3. Eseguire in Supabase lo script `supabase/001_appointments.sql`.
4. Inserire in Netlify `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
5. Fare deploy Netlify.
6. Testare una richiesta prenotazione e verificare che compaia in Supabase.
7. Collegare `borsiericarservice.it` e `www.borsiericarservice.it`.
8. Aggiornare DNS secondo le istruzioni Netlify.
9. Verificare redirect e canonical su `https://www.borsiericarservice.it`.
10. Fare test finale da mobile e desktop.

## Dati ancora da confermare con cliente

- Orari definitivi.
- Durata reale slot cambio gomme.
- Numero massimo di auto gestibili per fascia.
- Giorni di chiusura, ferie e festivita.
- Email o flusso di notifica per le prenotazioni.
- Privacy/cookie policy definitiva.
- Foto reali di carrozzeria e officina per sostituire immagini stock.

## Comandi utili

Installazione:

```bash
npm install
```

Sviluppo locale:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Build preview Sites:

```bash
npm run build:sites
```

Stato Git:

```bash
git status --short
```

Push GitHub:

```bash
git push origin main
```

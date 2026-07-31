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

Questa preview non e il dominio ufficiale del cliente. Il sito andra pubblicato sul dominio ufficiale quando saranno disponibili credenziali Netlify/DNS.

## Cosa e gia pronto

- Landing moderna mobile-first.
- Logo ufficiale integrato.
- Palette coerente con il brand Borsieri: nero, arancio, silver.
- Posizionamento professionale su carrozzeria specializzata.
- Sezioni per carrozzeria, meccanica, pneumatici e lavorazioni.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Calendario Google Appointment Schedule integrato direttamente nel sito.
- CTA collegate: valutazione in sede, prenotazione cambio gomme, lavorazioni, telefono, email e indicazioni Google Maps.
- SEO/GEO tecnico: metadata, canonical, Open Graph, sitemap, robots e schema LocalBusiness/AutoBodyShop.
- Embed inline della booking page Google Calendar per il cambio gomme.
- `.env.example` con variabili richieste.

## Comportamento del form prenotazioni

La prenotazione cambio gomme usa Google Calendar Appointment Schedule. Il cliente completa la booking page Google direttamente dentro al sito, senza uscire dalla landing.

```text
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL
```

Se la variabile non e configurata, il sito mostra una card professionale di collegamento calendario e una CTA telefonica.

Nel modulo Google vanno aggiunti flag chiari:

- `Tipo intervento`: Cambio gomme, Riparazione gomma, Sola convergenza.
- `Gestione pneumatici`: Gomme sue, Gomme nuove, Gomme in magazzino, Gomme da portare.
- `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
- `Rubrica cliente`: telefono, auto, targa opzionale e note.

## Cosa resta da fare quando arrivano le credenziali

1. Collegare il repository GitHub a Netlify.
2. Creare in Google Calendar una booking page dedicata al cambio gomme.
3. Configurare disponibilita, durata slot, buffer, limiti giornalieri e promemoria.
4. Aggiungere alla booking page i flag `Tipo intervento`, `Gestione pneumatici` e i campi rubrica cliente.
5. Copiare il link da `Sharing options > Website embed > Inline booking page`.
6. Inserire in Netlify `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`.
7. Fare deploy Netlify.
8. Testare una prenotazione reale e verificare che compaia nel calendario Google del cliente.
9. Collegare `borsiericarservice.it` e `www.borsiericarservice.it`.
10. Aggiornare DNS secondo le istruzioni Netlify.
11. Verificare redirect e canonical su `https://www.borsiericarservice.it`.
12. Fare test finale da mobile e desktop.

## Dati ancora da confermare con cliente

- Orari definitivi.
- Durata reale slot cambio gomme.
- Numero massimo di auto gestibili per fascia.
- Giorni di chiusura, ferie e festivita.
- Link Google Calendar Appointment Schedule definitivo.
- Campi rubrica e flag definitivi nella booking page Google.
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

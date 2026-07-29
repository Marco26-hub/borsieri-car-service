# Borsieri Car Service - Go-live checklist

## Stato pronto

- Landing production-ready in Next/Vinext.
- Logo ufficiale integrato.
- Palette coerente con brand: nero, arancio, silver.
- Copy SEO/GEO professionale con focus su carrozzeria specializzata.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Calendario onsite con fasce coerenti con orari officina.
- Endpoint `/api/appointments` pronto per salvare richieste in Supabase.
- Schema Supabase in `supabase/001_appointments.sql`.
- Metadata SEO, canonical, Open Graph, sitemap e robots pronti per `borsiericarservice.it`.
- Repository GitHub creato e pushato: `https://github.com/Marco26-hub/borsieri-car-service.git`.

## Da fare prima del dominio ufficiale

1. Creare progetto Vercel collegato al repository GitHub.
2. Impostare su Vercel le variabili:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Eseguire lo script SQL `supabase/001_appointments.sql` in Supabase.
4. Verificare che il form prenotazione salvi una riga nella tabella `appointments`.
5. Collegare il dominio `borsiericarservice.it` e `www.borsiericarservice.it` su Vercel.
6. Aggiornare DNS del dominio come indicato da Vercel.
7. Verificare redirect canonico verso `https://www.borsiericarservice.it`.
8. Fare test finale da mobile:
    - navigazione;
    - chiamata telefonica;
    - email;
    - mappa;
    - invio prenotazione.

## Dati da confermare con il cliente

- Orari esatti.
- Durata reale slot cambio gomme.
- Numero massimo auto gestibili per fascia.
- Giorni di chiusura o ferie.
- Email o flusso interno per notificare le nuove richieste.
- Policy privacy definitiva e link Iubenda aggiornato.
- Foto reali di carrozzeria/officina da sostituire alle immagini stock.

## Attenzione

Finche Supabase non e configurato, il form non deve essere considerato attivo.
L'endpoint restituisce un messaggio di servizio non attivo invece di simulare una prenotazione riuscita.

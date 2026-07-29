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

## Da fare prima del dominio ufficiale

1. Creare o ricevere accesso al progetto GitHub ufficiale.
2. Pushare la cartella `site/` nel repository GitHub.
3. Creare progetto Vercel collegato al repository.
4. Impostare su Vercel le variabili:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Eseguire lo script SQL `supabase/001_appointments.sql` in Supabase.
6. Verificare che il form prenotazione salvi una riga nella tabella `appointments`.
7. Collegare il dominio `borsiericarservice.it` e `www.borsiericarservice.it` su Vercel.
8. Aggiornare DNS del dominio come indicato da Vercel.
9. Verificare redirect canonico verso `https://www.borsiericarservice.it`.
10. Fare test finale da mobile:
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

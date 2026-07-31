# Borsieri Car Service - Go-live checklist

## Stato pronto

- Landing production-ready in Next/Vinext.
- Logo ufficiale integrato.
- Palette coerente con brand: nero, arancio, silver.
- Copy SEO/GEO professionale con focus su carrozzeria specializzata.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Google Calendar Appointment Schedule integrato onsite.
- Booking page Google pronta per mostrare slot liberi, form cliente e conferme.
- Metadata SEO, canonical, Open Graph, sitemap e robots pronti per `borsiericarservice.it`.
- Repository GitHub creato e pushato: `https://github.com/Marco26-hub/borsieri-car-service.git`.

## Da fare prima del dominio ufficiale

1. Creare progetto Netlify collegato al repository GitHub.
2. Creare in Google Calendar una booking page dedicata al cambio gomme.
3. Configurare orari, durata slot, buffer, limiti giornalieri e promemoria.
4. Aggiungere nel Booking form Google i flag:
   - `Tipo intervento`: Cambio gomme, Riparazione gomma, Sola convergenza.
   - `Gestione pneumatici`: Gomme sue, Gomme nuove, Gomme in magazzino, Gomme da portare.
   - `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
   - `Rubrica cliente`: telefono, auto, targa opzionale e note.
5. Copiare il link da `Sharing options > Website embed > Inline booking page`.
6. Impostare su Netlify la variabile `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`.
7. Verificare che la prenotazione compaia nel calendario Google del cliente.
8. Collegare il dominio `borsiericarservice.it` e `www.borsiericarservice.it` su Netlify.
9. Aggiornare DNS del dominio come indicato da Netlify.
10. Verificare redirect canonico verso `https://www.borsiericarservice.it`.
11. Fare test finale da mobile:
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
- Link Google Calendar Appointment Schedule.
- Campi rubrica e flag Google definitivi.
- Email o flusso interno per notificare le nuove richieste.
- Policy privacy definitiva e link Iubenda aggiornato.
- Foto reali di carrozzeria/officina da sostituire alle immagini stock.

## Attenzione

Finche `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL` non e configurato, la card mostra il calendario Google come pronto al collegamento e invita alla prenotazione telefonica.
Il servizio va considerato attivo solo dopo un test reale dalla booking page Google integrata.

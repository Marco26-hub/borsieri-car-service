# Borsieri Car Service - Go-live checklist

## Stato pronto

- Landing production-ready in Next.js con export statico per Tophost.
- Logo ufficiale integrato.
- Palette coerente con brand: nero, arancio, silver.
- Copy SEO/GEO professionale con focus su carrozzeria specializzata.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Embed ufficiale Cal.com integrato onsite e predisposto per Google Calendar.
- Pagina prenotazione dedicata con flag interattivi e richiesta preventivo gomme nuove.
- CTA gomme nuove collegata alla scelta gia preselezionata nel configuratore.
- Dati cliente e veicolo obbligatori per tutte le lavorazioni pneumatici.
- Flussi per nuova prenotazione, modifica e annullamento.
- Cal.com bloccato fino all'invio dei dati e al consenso per contenuti esterni.
- Profili ufficiali Facebook e Instagram collegati nel footer.
- Immagini WebP locali responsive, senza hotlink Unsplash.
- Promozione web del 10% sulle gomme nuove evidenziata nella CTA e registrata nelle richieste.
- Build statica e invio email PHP predisposti per Tophost.
- Booking page Cal.com pronta per mostrare slot liberi e conferme sincronizzate con Google Calendar.
- Metadata SEO, canonical, Open Graph, sitemap e robots pronti per `borsiericarservice.it`.
- Repository GitHub creato e pushato: `https://github.com/Marco26-hub/borsieri-car-service.git`.

## Da fare prima del dominio ufficiale

1. Ottenere accesso Tophost, FTP/file manager e gestione DNS.
   - Configurare i secrets GitHub Actions (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`, `NEXT_PUBLIC_CALCOM_BOOKING_URL`) per il deploy automatico, vedi [HANDOFF.md](HANDOFF.md).
   - Fare backup del vecchio sito attualmente online prima del primo deploy automatico.
2. Creare in Cal.com l&apos;evento dedicato al cambio gomme.
3. Collegare Cal.com al Google Calendar del cliente e configurare orari, durata slot, buffer, limiti giornalieri e promemoria.
4. Verificare nel configuratore del sito i flag:
   - `Tipo intervento`: Cambio gomme, Riparazione gomma.
   - `Gestione pneumatici`: Gomme nuove, Gomme in magazzino.
   - `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
   - `Dati cliente e auto`: nome, telefono, email, marca/modello e targa obbligatori.
   - `Numero preventivo`: facoltativo, senza vincolo tra preventivo e prenotazione.
5. Copiare il link pubblico dell&apos;evento Cal.com.
6. Impostare `NEXT_PUBLIC_CALCOM_BOOKING_URL` su Netlify e GitHub Actions prima della build.
7. Verificare che la prenotazione compaia nel calendario Google del cliente.
8. Caricare il contenuto della cartella `out/` nella document root Tophost.
9. Aggiornare DNS del dominio come indicato da Tophost.
10. Verificare redirect canonico verso `https://www.borsiericarservice.it`.
11. Fare test finale da mobile:
    - navigazione;
    - chiamata telefonica;
    - email;
    - mappa;
    - invio prenotazione.
    - invio richiesta preventivo pneumatici.
12. Verificare che `api/preventivo.php` invii a `borsiericar@gmail.com` e che le email non finiscano nello spam.

## Dati da confermare con il cliente

- Orari esatti.
- Durata reale slot cambio gomme.
- Numero massimo auto gestibili per fascia.
- Giorni di chiusura o ferie.
- Link evento Cal.com.
- Collegamento Cal.com al Google Calendar del cliente.
- Campi rubrica Cal.com definitivi.
- Email o flusso interno per notificare le nuove richieste.
- Policy privacy/cookie definitiva e link Iubenda confermato.
- Eventuali foto reali del cliente da sostituire in futuro alle immagini premium generate.
- Validita temporale e condizioni commerciali definitive della promozione gomme nuove -10%.

## Attenzione

Finche `NEXT_PUBLIC_CALCOM_BOOKING_URL` non e configurato prima della build, la card mostra Cal.com come pronto al collegamento e invita alla prenotazione telefonica.
Il servizio va considerato attivo solo dopo un test reale dell&apos;evento Cal.com sincronizzato con Google Calendar.

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

Release GitHub verificata:

```text
commit 4fa122e - Polish premium booking flow and production setup
```

Anteprima locale aggiornata:

```text
http://127.0.0.1:8080/
```

Ultima preview produzione privata:

```text
https://borsieri-car-service.beige-fawn-1352.chatgpt.site
```

Questa preview non e il dominio ufficiale del cliente. Il sito andra trasferito su Tophost e pubblicato sul dominio ufficiale quando saranno disponibili le credenziali hosting/DNS.

## Verifiche ultima release

Eseguite il 31 luglio 2026 sulla release `4fa122e`:

- `npm run build`: completato con export statico in `out/`.
- `npm run lint`: completato senza errori o avvisi.
- `node --test tests/rendered-html.test.mjs`: 3 test superati su 3.
- Controllo browser desktop e mobile: nessun overflow orizzontale rilevato.
- CTA `Richiedi preventivo gomme nuove`: apre `/prenotazione-cambio-gomme/?servizio=gomme-nuove#scegli-gomme` e preseleziona `Gomme nuove`.
- Anchor di navigazione: contenuti posizionati correttamente sotto l'header fisso.
- Canonical e sitemap: URL coerenti con slash finale e dominio `www`.
- Dipendenze starter Cloudflare, Vinext, Vite, Drizzle e Tailwind rimosse.

Il test reale di `public/api/preventivo.php` non e eseguibile nel server statico locale e deve essere effettuato su Tophost. `npm audit --omit=dev` segnala tre advisory transitive nei pacchetti di build inclusi da Next.js; il runtime Node e `node_modules` non vengono caricati su Tophost, dove viene pubblicato soltanto l'export statico `out/`.

## Cosa e gia pronto

- Landing moderna mobile-first.
- Logo ufficiale integrato.
- Palette coerente con il brand Borsieri: nero, arancio, silver.
- Posizionamento professionale su carrozzeria specializzata.
- Sezioni per carrozzeria, meccanica, pneumatici e lavorazioni.
- Nuovo servizio di prenotazione cambio gomme evidenziato.
- Pagina dedicata `/prenotazione-cambio-gomme` con menu selezionabile dal cliente.
- CTA preventivo gomme nuove collegata direttamente a `?servizio=gomme-nuove#scegli-gomme`, con opzione gia selezionata.
- Configuratore gomme nuove e richiesta preventivo inviata dal sito tramite PHP Tophost.
- CTA promozionale con sconto web del 10% sulle gomme nuove e dettaglio offerta nella richiesta email.
- Sezione clienti dalla Svizzera con auto sostitutiva su richiesta.
- Calendario Google Appointment Schedule integrato direttamente nel sito.
- CTA collegate: valutazione in sede, prenotazione cambio gomme, lavorazioni, telefono, email e indicazioni Google Maps.
- SEO/GEO tecnico: metadata, canonical, Open Graph, sitemap, robots e schema LocalBusiness/AutoBodyShop.
- Embed inline della booking page Google Calendar per il cambio gomme.
- Banner preferenze e caricamento di Google Calendar solo dopo consenso esplicito.
- Immagini WebP locali con varianti mobile/desktop; nessun hotlink a CDN fotografiche esterne.
- `.env.example` con variabili richieste.

## Comportamento del form prenotazioni

La prenotazione cambio gomme usa Google Calendar Appointment Schedule. Il cliente completa la booking page Google direttamente nella pagina dedicata, senza uscire dal sito.

```text
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL
```

Se la variabile non e configurata, il sito mostra una card professionale di collegamento calendario e una CTA telefonica.

Prima del calendario il sito propone flag chiari:

- `Tipo intervento`: Cambio gomme, Riparazione gomma, Sola convergenza.
- `Gestione pneumatici`: Gomme sue, Gomme nuove, Gomme in magazzino, Gomme da portare.
- `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
- `Dati obbligatori`: nome e cognome, telefono, email, marca/modello auto, targa e consenso privacy.
- `Numero preventivo`: facoltativo e utilizzabile anche per prenotare uno slot senza vincolo di accettazione.
- `Gestione appuntamento`: nuova prenotazione, modifica o annullamento con riferimento dell'appuntamento esistente.

La richiesta per gomme nuove produce soltanto un preventivo. Lo slot puo essere prenotato in un secondo momento, anche senza numero preventivo e senza accettazione automatica dell'offerta.

Le richieste per gomme nuove vengono inviate a `borsiericar@gmail.com` tramite `public/api/preventivo.php`. Su Tophost va verificato che PHP `mail()` invii correttamente e che il mittente `noreply@borsiericarservice.it` sia accettato.

## Cosa resta da fare quando arrivano le credenziali

1. Accedere al pannello Tophost e alla gestione file/FTP del dominio.
2. Creare in Google Calendar una booking page dedicata al cambio gomme.
3. Configurare disponibilita, durata slot, buffer, limiti giornalieri e promemoria.
4. Aggiungere alla booking page Google i soli campi necessari alla conferma dello slot, evitando di duplicare i dati gia raccolti dal sito.
5. Copiare il link da `Sharing options > Website embed > Inline booking page`.
6. Impostare `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL` in locale prima della build.
7. Eseguire `npm run build` e caricare il contenuto di `out/` su Tophost.
8. Testare una prenotazione reale e verificare che compaia nel calendario Google del cliente.
9. Collegare `borsiericarservice.it` e `www.borsiericarservice.it`.
10. Aggiornare DNS secondo le istruzioni Tophost.
11. Verificare redirect e canonical su `https://www.borsiericarservice.it`.
12. Fare test finale da mobile e desktop.
13. Inviare un preventivo di prova e verificare la ricezione su `borsiericar@gmail.com`.
14. Verificare su Tophost che `mod_rewrite`, `mod_headers`, `mod_deflate` e `mod_expires` siano disponibili; le direttive sono protette da `IfModule`.
15. Controllare che il mittente `noreply@borsiericarservice.it` sia autorizzato e non venga classificato come spam.

## Dati ancora da confermare con cliente

- Orari definitivi.
- Durata reale slot cambio gomme.
- Numero massimo di auto gestibili per fascia.
- Giorni di chiusura, ferie e festivita.
- Link Google Calendar Appointment Schedule definitivo.
- Campi rubrica e flag definitivi nella booking page Google.
- Conferma del link Iubenda e dei testi privacy/cookie definitivi.
- Eventuali foto reali del cliente da usare in futuro al posto delle immagini premium generate.
- Validita e condizioni definitive della promozione web gomme nuove -10%.

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

Stato Git:

```bash
git status --short
```

Push GitHub:

```bash
git push origin main
```

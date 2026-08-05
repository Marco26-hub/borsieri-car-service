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
https://borsiericarservice.netlify.app/
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
- Embed ufficiale Cal.com integrato direttamente nel sito e predisposto per Google Calendar.
- CTA collegate: valutazione in sede, prenotazione cambio gomme, lavorazioni, telefono, email e indicazioni Google Maps.
- SEO/GEO tecnico: metadata, canonical, Open Graph, sitemap, robots e schema LocalBusiness/AutoBodyShop.
- Embed inline Cal.com per il cambio gomme, senza uscire dal sito.
- Banner preferenze e caricamento di Cal.com solo dopo consenso esplicito.
- Collegamenti ufficiali Facebook e Instagram nella sezione `Seguici sui social`.
- Immagini WebP locali con varianti mobile/desktop; nessun hotlink a CDN fotografiche esterne.
- `.env.example` con variabili richieste.

## Comportamento del form prenotazioni

La prenotazione cambio gomme usa l&apos;embed ufficiale Cal.com. Cal.com deve essere collegato al Google Calendar del cliente per leggere gli impegni, evitare sovrapposizioni e creare gli appuntamenti confermati.

```text
NEXT_PUBLIC_CALCOM_BOOKING_URL
```

La variabile accetta il link pubblico dell&apos;evento, per esempio `https://cal.com/borsieri/cambio-gomme`. Se non e configurata, il sito mostra una card professionale e la CTA telefonica.

Prima del calendario il sito propone flag chiari:

- `Tipo intervento`: Cambio gomme, Riparazione gomma.
- `Gestione pneumatici`: Gomme nuove, Gomme in magazzino.
- `Gomme nuove`: tipo gomma estiva/invernale/4 stagioni, larghezza, spalla, diametro, indice carico/velocita e fascia preferita.
- `Dati obbligatori`: nome e cognome, telefono, email, marca/modello auto, targa e consenso privacy.
- `Numero preventivo`: facoltativo e utilizzabile anche per prenotare uno slot senza vincolo di accettazione.
- `Gestione appuntamento`: nuova prenotazione, modifica o annullamento con riferimento dell'appuntamento esistente.

La richiesta per gomme nuove produce soltanto un preventivo. Lo slot puo essere prenotato in un secondo momento, anche senza numero preventivo e senza accettazione automatica dell'offerta.

Le richieste per gomme nuove vengono inviate a `borsiericar@gmail.com` tramite `public/api/preventivo.php`. Su Tophost va verificato che PHP `mail()` invii correttamente e che il mittente `noreply@borsiericarservice.it` sia accettato.

## Cosa resta da fare quando arrivano le credenziali

1. Accedere al pannello Tophost e alla gestione file/FTP del dominio.
2. Accedere all&apos;account Cal.com del cliente e creare l&apos;evento `Cambio gomme`.
3. In Cal.com aprire `Apps > Calendars`, collegare il Google Calendar del cliente e scegliere calendari da controllare e calendario di destinazione.
4. Configurare disponibilita, durata slot, buffer, limiti giornalieri, chiusure e promemoria in Cal.com.
5. Copiare il link pubblico dell&apos;evento Cal.com.
6. Impostare `NEXT_PUBLIC_CALCOM_BOOKING_URL` in locale, su Netlify e nei GitHub Actions secrets prima della build.
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
- Link evento Cal.com definitivo.
- Collegamento OAuth tra Cal.com e il Google Calendar del cliente.
- Campi aggiuntivi definitivi nella booking page Cal.com.
- Conferma del link Iubenda e dei testi privacy/cookie definitivi.
- Eventuali foto reali del cliente da usare in futuro al posto delle immagini premium generate.
- Validita e condizioni definitive della promozione web gomme nuove -10%.

## Deploy automatico su Tophost

Il dominio `borsiericarservice.it` punta gia allo spazio web Tophost (DNS A record su `217.64.195.209`, HTTPS e redirect automatico gia attivi lato pannello). Ogni push su `main` builda il sito e carica `out/` via FTPS nella document root tramite [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Secrets da configurare su GitHub (Settings > Secrets and variables > Actions):

- `FTP_SERVER` — host FTP Tophost (es. `ftp.borsiericarservice.it`)
- `FTP_USERNAME` — utente FTP/cPanel
- `FTP_PASSWORD` — password FTP/cPanel
- `FTP_SERVER_DIR` — path della document root sullo spazio web (verificare da File Manager, es. `/` o `/web/`)
- `NEXT_PUBLIC_CALCOM_BOOKING_URL` — link pubblico dell&apos;evento Cal.com; se assente il sito va live con la card placeholder calendario

Il workflow non cancella file gia presenti sullo spazio web che non fanno parte della build (`dangerous-clean-slate-enabled` disattivato): fare un backup/pulizia del vecchio sito da Utility > Backup e Ripristino prima del primo deploy, poi valutare se abilitarlo per i deploy successivi. Trigger manuale disponibile da GitHub Actions > Deploy su Tophost > Run workflow.

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

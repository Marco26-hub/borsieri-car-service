/* eslint-disable @next/next/no-img-element -- Static Tophost export uses hand-authored WebP sources. */
import { CookieSettingsLink } from "./CookieConsent";
import SocialLinks from "./SocialLinks";

const bodyworkItems = [
  "Ripristino urti, graffi e ammaccature",
  "Preparazione, verniciatura e finitura colore",
  "Danni da grandine e sostituzione cristalli",
  "Gestione tecnica delle pratiche di sinistro",
];

const workCards = [
  {
    label: "Valutazione",
    title: "Analisi tecnica e priorita chiare",
    text:
      "Il veicolo viene esaminato per definire lavorazioni, tempi e coordinamento tra carrozzeria, meccanica e pneumatici.",
  },
  {
    label: "Intervento",
    title: "Lavorazioni coordinate da un referente",
    text:
      "Ogni fase viene pianificata e seguita con criteri tecnici coerenti, mantenendo il cliente aggiornato sul lavoro.",
  },
  {
    label: "Consegna",
    title: "Controllo finale e riconsegna ordinata",
    text:
      "Prima della riconsegna vengono verificati intervento, finiture e funzionalita interessate dalla lavorazione.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "Borsieri Car Service S.r.l.",
  url: "https://www.borsiericarservice.it/",
  telephone: "+39031210622",
  email: "borsiericar@gmail.com",
  vatID: "IT03996560136",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via San Fermo 64",
    addressLocality: "San Fermo della Battaglia",
    addressRegion: "CO",
    postalCode: "22042",
    addressCountry: "IT",
  },
  areaServed: [
    "San Fermo della Battaglia",
    "Como",
    "Cavallasca",
    "Provincia di Como",
    "Canton Ticino",
    "Svizzera",
  ],
  openingHours: ["Mo-Fr 08:00-12:00", "Mo-Fr 14:00-18:30"],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Riparazione carrozzeria" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Verniciatura auto" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Riparazione danni da grandine" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Officina meccanica" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cambio gomme" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auto sostitutiva su richiesta" } },
  ],
};

export default function Home() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Borsieri Car Service - torna all'inizio">
          <img className="brand-logo" src="/borsieri-logo.png" alt="Borsieri Car Service" />
        </a>
        <nav className="nav" aria-label="Navigazione principale">
          <a href="#servizi">Carrozzeria</a>
          <a href="#meccanica">Meccanica</a>
          <a href="#lavorazioni">Lavorazioni</a>
          <a href="/prenotazione-cambio-gomme">Cambio gomme</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <a className="button primary topbar-booking-cta" href="/prenotazione-cambio-gomme">
          <span>Prenota cambio gomme</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Carrozzeria storica vicino a Como</div>
            <h1>Carrozzeria specializzata Borsieri Car Service</h1>
            <p className="lead">
              Dal 1975, Borsieri mette al centro la riparazione di carrozzeria: danni da urto,
              graffi, grandine, cristalli e verniciatura. A San Fermo della Battaglia, vicino
              a Como, completa il servizio con officina meccanica e pneumatici.
            </p>
            <div className="hero-actions">
              <a
                className="button primary"
                href="mailto:borsiericar@gmail.com?subject=Richiesta%20valutazione%20carrozzeria%20in%20sede"
              >
                Richiedi valutazione in sede
              </a>
              <a className="button secondary" href="#meccanica">
                Assistenza meccanica
              </a>
              <a className="button secondary" href="/prenotazione-cambio-gomme">
                Prenota cambio gomme
              </a>
              <a className="button secondary" href="#lavorazioni">
                Vedi lavorazioni
              </a>
            </div>
            <div className="metrics" aria-label="Punti di forza">
              <div className="metric">
                <strong>1975</strong>
                <span>Carrozzeria storica con esperienza consolidata</span>
              </div>
              <div className="metric">
                <strong>CO</strong>
                <span>Servizio locale per San Fermo, Como e comuni vicini</span>
              </div>
              <div className="metric">
                <strong>5/7</strong>
                <span>Aperti dal lunedi al venerdi</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bodywork-focus" id="servizi">
        <div className="section-inner bodywork-focus-content">
          <div className="bodywork-focus-copy">
            <div className="eyebrow">Processo carrozzeria</div>
            <h2>Dalla preparazione alla finitura</h2>
            <p>
              Ogni ripristino segue una sequenza precisa: analisi del danno, lavorazione dei
              lamierati, preparazione delle superfici, verniciatura e controllo della finitura.
            </p>
          </div>
          <ol className="bodywork-list" aria-label="Competenze di carrozzeria">
            {bodyworkItems.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mechanic-focus" id="meccanica">
        <div className="mechanic-cinematic-scene">
          <img
            className="mechanic-cinematic-image"
            src="/servizio-meccanica.webp"
            srcSet="/servizio-meccanica-mobile.webp 900w, /servizio-meccanica.webp 1568w"
            sizes="100vw"
            alt="Tecnico Borsieri durante un intervento nel vano motore"
            decoding="async"
            loading="lazy"
          />
          <div className="section-inner mechanic-focus-content">
            <div className="mechanic-focus-copy">
              <div className="eyebrow">Officina meccanica</div>
              <h2>Diagnosi e manutenzione con competenza tecnica</h2>
              <p>
                L&apos;area meccanica completa il servizio Borsieri con controlli accurati,
                manutenzione programmata e interventi sui principali sistemi del veicolo. Un unico
                referente coordina diagnosi, lavorazione e verifica finale.
              </p>
              <div className="mechanic-capabilities" aria-label="Servizi di officina meccanica">
                <div>
                  <strong>Diagnosi e controlli</strong>
                  <span>Elettronica, livelli, componenti e verifica delle anomalie.</span>
                </div>
                <div>
                  <strong>Manutenzione programmata</strong>
                  <span>Tagliandi e interventi periodici secondo le esigenze del veicolo.</span>
                </div>
                <div>
                  <strong>Sicurezza e comfort</strong>
                  <span>Freni, sospensioni, climatizzazione e controlli funzionali.</span>
                </div>
              </div>
              <div className="mechanic-focus-actions">
                <a
                  className="button primary"
                  href="mailto:borsiericar@gmail.com?subject=Richiesta%20intervento%20meccanico"
                >
                  Richiedi un controllo
                </a>
                <a className="button secondary" href="tel:+39031210622">
                  Chiama l&apos;officina
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="booking-spotlight" aria-label="Prenotazione cambio gomme online">
        <div className="booking-spotlight-link">
          <div className="booking-spotlight-content">
            <span className="new-service-label">Servizio pneumatici · Offerta web</span>
            <h2>Gomme nuove, preventivo su misura.</h2>
            <div className="booking-offer-lockup" aria-label="Sconto del 10% sulle gomme nuove">
              <strong>-10%</strong>
              <span>Sugli pneumatici nuovi per le richieste inviate dal sito</span>
            </div>
            <p>
              Indica misura, tipologia e fascia preferita. Borsieri preparera una proposta
              dedicata; la prenotazione dell&apos;appuntamento resta libera e separata.
            </p>
            <a
              className="button primary booking-offer-cta"
              href="/prenotazione-cambio-gomme/?servizio=gomme-nuove#scegli-gomme"
            >
              Richiedi preventivo gomme nuove
            </a>
            <small className="booking-offer-note">
              Sconto applicato agli pneumatici nuovi, esclusi montaggio e servizi. Offerta non
              cumulabile, soggetta a disponibilita e conferma nel preventivo.
            </small>
          </div>
        </div>
      </section>

      <section className="swiss-service" aria-labelledby="swiss-service-title">
        <div className="section-inner swiss-service-grid">
          <div className="swiss-service-copy">
            <div className="eyebrow">Servizio dedicato ai clienti dalla Svizzera</div>
            <h2 id="swiss-service-title">Assistenza organizzata anche oltre confine</h2>
            <p>
              Borsieri Car Service accoglie clienti residenti in Svizzera che scelgono la
              carrozzeria e l&apos;officina di San Fermo della Battaglia. L&apos;intervento puo essere
              pianificato in anticipo con un referente dedicato.
            </p>
            <div className="swiss-service-actions">
              <a
                className="button primary"
                href="mailto:borsiericar@gmail.com?subject=Richiesta%20assistenza%20cliente%20dalla%20Svizzera"
              >
                Organizza l&apos;intervento
              </a>
              <a className="button secondary" href="tel:+39031210622">
                Parla con Borsieri
              </a>
            </div>
          </div>
          <div className="replacement-car-highlight">
            <div
              aria-label="Fiat Panda sostitutiva Borsieri Car Service"
              className="replacement-car-image"
              role="img"
            />
            <div className="replacement-car-content">
              <span>Mobilita durante la lavorazione</span>
              <strong>Auto sostitutiva anche per residenti in Svizzera</strong>
              <p>
                Disponibile su richiesta e previa conferma, in base alla durata dell&apos;intervento e
                alla disponibilita dei veicoli.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="workshop" id="lavorazioni">
        <div className="section-inner">
          <div className="section-head">
            <h2>Lavorazioni curate, dalla diagnosi alla consegna</h2>
            <p>
              Un metodo unico accompagna ogni servizio: valutazione, coordinamento tecnico e
              controllo finale prima della riconsegna.
            </p>
          </div>
          <div className="work-grid">
            {workCards.map((card) => (
              <article className="work-card" key={card.label}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band" id="contatti">
        <div className="section-inner contact-grid">
          <div>
            <div className="eyebrow">Via San Fermo 64 · San Fermo della Battaglia (Como)</div>
            <h2>Carrozzeria e assistenza auto vicino a Como</h2>
          </div>
          <div className="contact-list">
            <div className="contact-item">
              <span>Telefono</span>
              <a href="tel:+39031210622">+39 031 210622</a>
            </div>
            <div className="contact-item">
              <span>Cellulare</span>
              <a href="tel:+393755488915">+39 375 54 88 915</a>
            </div>
            <div className="contact-item">
              <span>Email</span>
              <a href="mailto:borsiericar@gmail.com">borsiericar@gmail.com</a>
            </div>
            <div className="contact-item">
              <span>Orari</span>
              Lunedi-venerdi 8.00-12.00 / 14.00-18.30
            </div>
            <div className="contact-actions">
              <a
                className="button primary"
                href="https://www.google.com/maps/search/?api=1&query=Via%20San%20Fermo%2064%20San%20Fermo%20della%20Battaglia%20CO"
                rel="noreferrer"
                target="_blank"
              >
                Apri le indicazioni
              </a>
              <a className="button secondary" href="mailto:borsiericar@gmail.com">
                Richiedi informazioni
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>Borsieri Car Service S.r.l. · P.IVA 03996560136</span>
        <span>Carrozzeria · Officina meccanica · Gommista · San Fermo della Battaglia</span>
        <SocialLinks />
        <div className="footer-legal-links">
          <a href="https://www.iubenda.com/privacy-policy/16946203" rel="noreferrer" target="_blank">Privacy policy</a>
          <a href="https://www.iubenda.com/privacy-policy/16946203/cookie-policy" rel="noreferrer" target="_blank">Cookie policy</a>
          <CookieSettingsLink />
        </div>
      </footer>
    </main>
  );
}

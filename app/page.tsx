const services = [
  {
    title: "Carrozzeria specializzata",
    image: "/servizio-carrozzeria.webp",
    description:
      "Un processo tecnico strutturato per valutazione del danno, ripristino dei lamierati, verniciatura e controllo qualita finale.",
    items: ["Ripristino urti, graffi e ammaccature", "Verniciatura e finitura colore", "Grandine, cristalli e gestione sinistri"],
    primary: true,
  },
  {
    title: "Officina meccanica",
    image: "/servizio-meccanica.webp",
    description:
      "Controlli meccanici, diagnosi e manutenzione per completare l'intervento sull'auto con un unico referente.",
    items: ["Tagliandi e manutenzione programmata", "Diagnosi elettronica e controlli", "Freni, sospensioni e climatizzazione"],
  },
  {
    title: "Gommista e pneumatici",
    image: "/servizio-pneumatici.webp",
    description:
      "Servizio pneumatici per cambio stagione, sicurezza su strada e corretta usura delle gomme.",
    items: ["Cambio gomme estive e invernali", "Equilibratura, convergenza e assetto", "Riparazione e deposito pneumatici"],
  },
];

const workCards = [
  {
    label: "Carrozzeria",
    title: "Ripristini di carrozzeria con controllo qualita",
    text:
      "Dalla valutazione iniziale alla riconsegna, ogni fase e gestita con criteri tecnici chiari: ripristino, verniciatura, allineamenti e verifica della finitura.",
  },
  {
    label: "Meccanica",
    title: "Manutenzione e diagnosi con un unico referente",
    text:
      "Tagliandi, controlli meccanici, impianto frenante, sospensioni, elettronica e ricarica clima completano il servizio quando l'auto richiede piu di una riparazione estetica.",
  },
  {
    label: "Cambio gomme",
    title: "Pneumatici e cambio gomme con prenotazione online",
    text:
      "Il calendario integrato consente di richiedere uno slot per sostituzione stagionale, montaggio pneumatici nuovi, equilibratura, convergenza e deposito gomme.",
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
              <a className="button primary" href="#servizi">
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

      <section className="booking-spotlight" aria-label="Prenotazione cambio gomme online">
        <a className="booking-spotlight-link" href="/prenotazione-cambio-gomme">
          <div className="booking-spotlight-content">
            <span className="new-service-label">Nuovo servizio online</span>
            <h2>Prenota cambio gomme</h2>
            <p>
              Consulta gli slot disponibili, indica il tipo di intervento e completa la
              richiesta direttamente sul sito.
            </p>
            <span className="booking-spotlight-action">Apri il calendario</span>
          </div>
        </a>
      </section>

      <section id="servizi">
        <div className="section-inner">
          <div className="section-head">
            <h2>Ripristino carrozzeria con processo professionale</h2>
            <p>
              La carrozzeria e la specializzazione storica di Borsieri Car Service: analisi
              del danno, riparazione, verniciatura e controllo finale. Meccanica e pneumatici
              completano l&apos;assistenza con un unico referente.
            </p>
          </div>
          <div className="services">
            {services.map((service) => (
              <article className={`service${service.primary ? " primary-service" : ""}`} key={service.title}>
                <img src={service.image} alt={`${service.title} Borsieri Car Service`} />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-list">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mechanic-focus" id="meccanica">
        <div className="section-inner mechanic-focus-grid">
          <div className="mechanic-focus-media">
            <img
              src="/servizio-meccanica.webp"
              alt="Tecnico Borsieri durante un intervento nel vano motore"
            />
          </div>
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
              <a className="button mechanic-secondary" href="tel:+39031210622">
                Chiama l&apos;officina
              </a>
            </div>
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
              Il lavoro viene presentato con chiarezza, eseguito con attenzione tecnica e
              controllato nei dettagli finali: un approccio pensato per chi cerca una
              carrozzeria affidabile nell&apos;area di Como.
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
            <div className="eyebrow">Via San Fermo 64 · San Fermo della Battaglia</div>
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
      </footer>
    </main>
  );
}

const services = [
  {
    title: "Carrozzeria specializzata",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=86",
    description:
      "Un processo tecnico strutturato per valutazione del danno, ripristino dei lamierati, verniciatura e controllo qualita finale.",
    items: ["Ripristino urti, graffi e ammaccature", "Verniciatura e finitura colore", "Grandine, cristalli e gestione sinistri"],
    primary: true,
  },
  {
    title: "Officina meccanica",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=86",
    description:
      "Controlli meccanici, diagnosi e manutenzione per completare l'intervento sull'auto con un unico referente.",
    items: ["Tagliandi e manutenzione programmata", "Diagnosi elettronica e controlli", "Freni, sospensioni e climatizzazione"],
  },
  {
    title: "Gommista e pneumatici",
    image:
      "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1200&q=86",
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
  areaServed: ["San Fermo della Battaglia", "Como", "Cavallasca", "Provincia di Como"],
  openingHours: ["Mo-Fr 08:00-12:00", "Mo-Fr 14:00-18:30"],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Riparazione carrozzeria" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Verniciatura auto" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Riparazione danni da grandine" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Officina meccanica" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cambio gomme" } },
  ],
};

const bookingDirectoryGroups = [
  {
    title: "Tipo intervento",
    items: ["Cambio gomme", "Riparazione gomma", "Sola convergenza"],
  },
  {
    title: "Gestione pneumatici",
    items: ["Gomme sue", "Gomme nuove", "Gomme in magazzino", "Gomme da portare"],
  },
  {
    title: "Gomme nuove",
    items: [
      "Tipo gomma: estiva, invernale, 4 stagioni",
      "Misura: larghezza / spalla / diametro",
      "Indice carico e velocita",
      "Preferenza fascia: premium, quality, economy",
    ],
  },
  {
    title: "Rubrica cliente",
    items: ["Telefono", "Auto", "Targa opzionale", "Note"],
  },
];

const appointmentFlowItems = [
  { label: "Slot", text: "Il cliente seleziona data e orario dal calendario Google." },
  { label: "Flag", text: "Borsieri riceve lavorazione, provenienza gomme e dati veicolo." },
  { label: "Conferma", text: "L'appuntamento entra nel calendario del cliente con notifica." },
];

function buildGoogleAppointmentUrl(value?: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (!url.hostname.endsWith("calendar.google.com")) return "";
    if (!url.searchParams.has("gv")) {
      url.searchParams.set("gv", "true");
    }
    return url.toString();
  } catch {
    return "";
  }
}

export default function Home() {
  const googleAppointmentUrl = buildGoogleAppointmentUrl(process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL);

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
          <a href="#lavorazioni">Lavorazioni</a>
          <a href="#prenota">Cambio gomme</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <a className="button primary" href="#prenota">
          Nuovo: prenota gomme
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
              <a className="button secondary" href="#prenota">
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

          <aside className="booking-panel" id="prenota" aria-label="Prenotazione cambio gomme">
            <div className="booking-panel-header">
              <img
                src="https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Tecnico in officina durante un controllo gomme"
              />
              <div className="booking-intro">
                <div className="booking-kicker">Nuovo servizio online</div>
                <h2>Prenota pneumatici e cambio gomme</h2>
                <p>
                  Scegli una fascia libera dal calendario Google dell&apos;officina e completa i dati
                  richiesti per la conferma.
                </p>
              </div>
            </div>

            <div className="booking-card">
              <div className="booking-card-head">
                <div>
                  <span className="booking-card-label">Google Calendar</span>
                  <strong>Pagina prenotazioni cambio gomme</strong>
                </div>
                <span className="booking-card-badge">Online</span>
              </div>

              <div className="google-booking-layout">
                <div className="google-booking-frame-shell">
                  {googleAppointmentUrl ? (
                    <iframe
                      className="google-booking-frame"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={googleAppointmentUrl}
                      title="Prenotazione cambio gomme Borsieri Car Service"
                    />
                  ) : (
                    <div className="google-booking-placeholder">
                      <strong>Calendario Google pronto al collegamento</strong>
                      <p>
                        Quando viene inserito il link della booking page Google, qui compariranno
                        slot liberi, modulo cliente e conferma appuntamento.
                      </p>
                      <a className="button secondary" href="tel:+39031210622">
                        Prenota telefonicamente
                      </a>
                    </div>
                  )}
                </div>

                <div className="booking-directory">
                  <span className="booking-field-title">Gestione appuntamento</span>
                  <h3>Menu chiaro per gomme e lavorazioni</h3>
                  <div className="appointment-flow" aria-label="Flusso appuntamento">
                    {appointmentFlowItems.map((item) => (
                      <div className="appointment-flow-item" key={item.label}>
                        <strong>{item.label}</strong>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="booking-directory-groups">
                    {bookingDirectoryGroups.map((group) => (
                      <div className="booking-directory-group" key={group.title}>
                        <strong>{group.title}</strong>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
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

      <section className="new-service" aria-label="Nuovo servizio di prenotazione cambio gomme">
        <div className="section-inner new-service-grid">
          <div className="new-service-copy">
            <div className="new-service-label">Nuovo servizio</div>
            <h2>Prenotazione cambio gomme direttamente dal sito</h2>
            <p>
              Borsieri Car Service affianca alla propria competenza di carrozzeria un nuovo
              servizio digitale per pneumatici e cambio gomme. Il cliente sceglie una fascia
              disponibile online, indica i dati dell&apos;auto e riceve conferma dall&apos;officina.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#prenota">
                Prenota uno slot
              </a>
              <a className="button secondary" href="tel:+39031210622">
                Parla con l&apos;officina
              </a>
            </div>
          </div>
          <div className="new-service-points">
            <div className="new-service-point">
              <strong>Slot negli orari di apertura</strong>
              <span>Fasce disponibili dal lunedi al venerdi, mattina e pomeriggio.</span>
            </div>
            <div className="new-service-point">
              <strong>Richiesta completa</strong>
              <span>Servizio, telefono, veicolo e note arrivano gia ordinati all&apos;officina.</span>
            </div>
            <div className="new-service-point">
              <strong>Conferma professionale</strong>
              <span>Borsieri verifica la richiesta e conferma appuntamento e dettagli.</span>
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

      <section className="process">
        <div className="section-inner">
          <div className="section-head">
            <h2>Prenotazione online, conferma dall&apos;officina</h2>
            <p>Il cliente sceglie lo slot dal sito; Borsieri verifica la richiesta e conferma l&apos;appuntamento.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Scegli la lavorazione</h3>
              <p>Seleziona cambio stagionale, montaggio, equilibratura, convergenza o deposito gomme.</p>
            </div>
            <div className="step">
              <span>02</span>
              <h3>Indica i dati auto</h3>
              <p>Marca, modello, misura pneumatici e note aiutano a preparare correttamente il lavoro.</p>
            </div>
            <div className="step">
              <span>03</span>
              <h3>Seleziona lo slot</h3>
              <p>Il calendario propone fasce coerenti con gli orari di apertura dell&apos;officina.</p>
            </div>
            <div className="step">
              <span>04</span>
              <h3>Attendi conferma</h3>
              <p>La richiesta viene presa in carico e puo essere confermata o riprogrammata.</p>
            </div>
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

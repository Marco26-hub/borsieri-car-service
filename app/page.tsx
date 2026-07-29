"use client";

import { FormEvent, useMemo, useState } from "react";

const services = [
  {
    title: "Carrozzeria specializzata",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=86",
    description:
      "Riparazioni di carrozzeria eseguite con metodo: valutazione del danno, ripristino dei lamierati, verniciatura e controllo della finitura.",
    items: ["Ripristino urti, graffi e ammaccature", "Verniciatura e finitura colore", "Grandine, cristalli e pratiche sinistri"],
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
    label: "Specializzazione storica",
    title: "Riparazioni di carrozzeria con finitura professionale",
    text:
      "Ogni danno viene valutato con attenzione prima dell'intervento: ripristino, verniciatura e finitura sono gestiti con cura per restituire un'auto ordinata, sicura e coerente nel colore.",
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

const bookingServices = [
  "Cambio gomme stagionale",
  "Montaggio pneumatici nuovi",
  "Equilibratura",
  "Convergenza",
  "Deposito gomme",
  "Riparazione foratura",
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "Borsieri Car Service S.r.l.",
  url: "https://www.borsiericarservice.it/",
  telephone: "+39031210622",
  email: "info@borsiericarservice.it",
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

const closedSlotKeys = new Set([
  "2026-07-30T08:45",
  "2026-07-30T10:15",
  "2026-07-30T14:45",
  "2026-07-31T09:30",
  "2026-07-31T15:30",
  "2026-08-03T08:00",
  "2026-08-03T11:00",
  "2026-08-04T16:15",
]);

const weekdayFormatter = new Intl.DateTimeFormat("it-IT", { weekday: "short" });
const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "short",
});
const longDateFormatter = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildBusinessDays(count: number) {
  const days: Date[] = [];
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  while (days.length < count) {
    const day = current.getDay();
    if (day >= 1 && day <= 5) {
      days.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function buildSlotsForDate(date: Date) {
  const ranges = [
    { start: 8 * 60, end: 12 * 60 },
    { start: 14 * 60, end: 18 * 60 + 30 },
  ];
  const duration = 45;
  const dateKey = toDateKey(date);

  return ranges.flatMap((range) => {
    const slots = [];
    for (let minutes = range.start; minutes + duration <= range.end; minutes += duration) {
      const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
      const mins = String(minutes % 60).padStart(2, "0");
      const time = `${hours}:${mins}`;
      slots.push({
        time,
        available: !closedSlotKeys.has(`${dateKey}T${time}`),
      });
    }
    return slots;
  });
}

export default function Home() {
  const days = useMemo(() => buildBusinessDays(9), []);
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(days[0]));
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const selectedDay = days.find((day) => toDateKey(day) === selectedDate) ?? days[0];
  const slots = buildSlotsForDate(selectedDay);
  const readableDate = longDateFormatter.format(selectedDay);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTime) {
      setConfirmation("Seleziona prima uno slot libero.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const service = String(formData.get("service") ?? "");
    setConfirmation(
      `${name}, richiesta ricevuta per ${service}: ${readableDate} alle ${selectedTime}. L'officina confermera disponibilita e dettagli dell'appuntamento.`,
    );
    event.currentTarget.reset();
  }

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
            <h1>Carrozzeria Borsieri Car Service</h1>
            <p className="lead">
              Dal 1975, Borsieri mette al centro la riparazione di carrozzeria: danni da urto,
              graffi, grandine, cristalli e verniciatura. A San Fermo della Battaglia, vicino
              a Como, completa il servizio con officina meccanica e pneumatici.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#servizi">
                Valuta un intervento
              </a>
              <a className="button secondary" href="#prenota">
                Nuovo: prenota cambio gomme
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
            <img
              src="https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Tecnico in officina durante un controllo gomme"
            />
            <div className="booking-body">
              <div className="booking-kicker">Nuovo servizio online</div>
              <h2>Prenota pneumatici e cambio gomme</h2>
              <p>
                Seleziona una fascia disponibile e invia la richiesta. L'officina confermera
                l'appuntamento in base al tipo di lavorazione e alle note sul veicolo.
              </p>
              <div className="booking-calendar">
                <div className="booking-days" aria-label="Giorni disponibili">
                  {days.map((day) => {
                    const dateKey = toDateKey(day);
                    return (
                      <button
                        className={`day-button${dateKey === selectedDate ? " active" : ""}`}
                        key={dateKey}
                        onClick={() => {
                          setSelectedDate(dateKey);
                          setSelectedTime("");
                          setConfirmation("");
                        }}
                        type="button"
                      >
                        <strong>{weekdayFormatter.format(day)}</strong>
                        <span>{dateFormatter.format(day)}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="booking-slots" aria-label="Orari disponibili">
                  {slots.map((slot) => (
                    <button
                      aria-label={slot.available ? `Slot libero ${slot.time}` : `Slot occupato ${slot.time}`}
                      className={`time-button${slot.time === selectedTime ? " active" : ""}`}
                      disabled={!slot.available}
                      key={slot.time}
                      onClick={() => {
                        setSelectedTime(slot.time);
                        setConfirmation("");
                      }}
                      type="button"
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                <div className="booking-summary">
                  {selectedTime
                    ? `Hai scelto ${readableDate} alle ${selectedTime}. Completa i dati per inviare la richiesta.`
                    : `Giorno selezionato: ${readableDate}. Ora scegli uno slot libero.`}
                </div>
                <form className="booking-form" onSubmit={handleSubmit}>
                  <label>
                    Lavorazione
                    <select name="service" required>
                      {bookingServices.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Nome e cognome
                    <input name="name" autoComplete="name" required />
                  </label>
                  <label>
                    Telefono
                    <input name="phone" autoComplete="tel" inputMode="tel" required />
                  </label>
                  <label>
                    Auto
                    <input name="car" placeholder="Marca, modello, targa opzionale" required />
                  </label>
                  <label>
                    Note
                    <textarea name="notes" placeholder="Misura gomme, deposito, urgenze" />
                  </label>
                  <button className="button primary" type="submit">
                    Invia richiesta
                  </button>
                </form>
                {confirmation ? (
                  <div className="booking-confirmation visible" role="status">
                    {confirmation}
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="servizi">
        <div className="section-inner">
          <div className="section-head">
            <h2>Carrozzeria come competenza principale</h2>
            <p>
              La carrozzeria e il centro dell'esperienza Borsieri. Meccanica e pneumatici
              completano il percorso per offrire al cliente un servizio ordinato, coordinato
              e seguito da un unico referente.
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
              disponibile online, indica i dati dell'auto e riceve conferma dall'officina.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#prenota">
                Prenota uno slot
              </a>
              <a className="button secondary" href="tel:+39031210622">
                Parla con l'officina
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
              <span>Servizio, telefono, veicolo e note arrivano gia ordinati all'officina.</span>
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
              carrozzeria affidabile nell'area di Como.
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
            <h2>Prenotazione online, conferma dall'officina</h2>
            <p>Il cliente sceglie lo slot dal sito; Borsieri verifica la richiesta e conferma l'appuntamento.</p>
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
              <p>Il calendario propone fasce coerenti con gli orari di apertura dell'officina.</p>
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
              <a href="mailto:info@borsiericarservice.it">info@borsiericarservice.it</a>
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
              <a className="button secondary" href="mailto:info@borsiericarservice.it">
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

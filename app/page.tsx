"use client";

import { FormEvent, useMemo, useState } from "react";

const services = [
  {
    title: "Carrozzeria specializzata",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=86",
    description:
      "Il know-how principale di Borsieri: riparazioni di carrozzeria, ripristino danni, verniciatura e finiture professionali.",
    items: ["Riparazione urti e graffi", "Grandine, cristalli e verniciatura", "Gestione sinistri e auto sostitutiva"],
    primary: true,
  },
  {
    title: "Officina meccanica",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=86",
    description:
      "Manutenzione auto, diagnosi elettronica e controlli meccanici a supporto di un servizio auto completo.",
    items: ["Tagliandi e manutenzione", "Diagnosi elettronica", "Freni, sospensioni e climatizzazione"],
  },
  {
    title: "Gommista e pneumatici",
    image:
      "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1200&q=86",
    description:
      "Cambio gomme estive e invernali, montaggio pneumatici, equilibratura, convergenza e deposito gomme vicino a Como.",
    items: ["Cambio gomme stagionale", "Equilibratura e convergenza", "Riparazione e deposito pneumatici"],
  },
];

const workCards = [
  {
    label: "Know-how principale",
    title: "Carrozzeria a San Fermo della Battaglia",
    text:
      "Riparazione di danni da urto, graffi, ammaccature, grandine e cristalli con lavorazioni curate, verniciatura professionale e attenzione alla finitura finale.",
  },
  {
    label: "Meccanica",
    title: "Officina meccanica per manutenzione e diagnosi",
    text:
      "Tagliandi, controlli meccanici, impianto frenante, sospensioni, elettronica, ricarica clima e verifiche utili prima della revisione.",
  },
  {
    label: "Cambio gomme",
    title: "Cambio gomme e pneumatici vicino a Como",
    text:
      "Sostituzione gomme estive e invernali, montaggio pneumatici nuovi, equilibratura, convergenza, riparazione forature e deposito stagionale.",
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
          Prenota
        </a>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Carrozzeria specializzata dal 1975</div>
            <h1>Carrozzeria Borsieri a San Fermo della Battaglia</h1>
            <p className="lead">
              Borsieri Car Service nasce dalla carrozzeria e mantiene nella riparazione auto
              il suo know-how principale. A San Fermo della Battaglia, vicino a Como, affianca
              alle lavorazioni di carrozzeria anche officina meccanica, pneumatici e cambio gomme.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#servizi">
                Scopri la carrozzeria
              </a>
              <a className="button primary" href="#prenota">
                Prenota cambio gomme
              </a>
              <a className="button secondary" href="#lavorazioni">
                Scopri lavorazioni
              </a>
              <a className="button secondary" href="tel:+39031210622">
                Chiama l'officina
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
              <h2>Prenota il cambio gomme a San Fermo</h2>
              <p>
                Scegli uno slot negli orari di apertura dell'officina e invia la richiesta
                per cambio gomme stagionale, equilibratura, convergenza o deposito pneumatici.
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
                    Conferma richiesta
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
            <h2>Carrozzeria prima di tutto, servizi auto completi</h2>
            <p>
              Il cuore dell'attivita e la carrozzeria: riparazioni, verniciatura e ripristino
              danni. Meccanica e pneumatici completano il servizio per seguire l'auto in modo
              pratico e coordinato.
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

      <section className="workshop" id="lavorazioni">
        <div className="section-inner">
          <div className="section-head">
            <h2>Lavorazioni di carrozzeria e assistenza auto</h2>
            <p>
              Dalla riparazione dei danni alla verniciatura, fino a meccanica e pneumatici:
              Borsieri Car Service valorizza la competenza di carrozzeria con un'assistenza
              auto completa e professionale.
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
            <h2>Prenotazione online semplice e professionale</h2>
            <p>Il cliente sceglie lo slot dal sito e l'officina gestisce la richiesta con conferma dedicata.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Scegli la lavorazione</h3>
              <p>Cambio stagionale, montaggio, equilibratura, convergenza o deposito gomme.</p>
            </div>
            <div className="step">
              <span>02</span>
              <h3>Indica i dati auto</h3>
              <p>Modello, misura pneumatici e note aiutano a preparare l'intervento.</p>
            </div>
            <div className="step">
              <span>03</span>
              <h3>Seleziona lo slot</h3>
              <p>Il calendario mostra solo finestre coerenti con gli orari dell'officina.</p>
            </div>
            <div className="step">
              <span>04</span>
              <h3>Attendi conferma</h3>
              <p>La richiesta entra in dashboard e puo essere confermata o riprogrammata.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-band" id="contatti">
        <div className="section-inner contact-grid">
          <div>
            <div className="eyebrow">Via San Fermo 64 · San Fermo della Battaglia</div>
            <h2>Assistenza auto vicino a Como, comoda da raggiungere</h2>
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
                Apri indicazioni
              </a>
              <a className="button secondary" href="mailto:info@borsiericarservice.it">
                Scrivi una email
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

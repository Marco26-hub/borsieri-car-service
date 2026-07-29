"use client";

import { FormEvent, useMemo, useState } from "react";

const services = [
  {
    title: "Meccanica",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=86",
    description:
      "Manutenzione ordinaria e interventi tecnici per mantenere l'auto efficiente e sicura.",
    items: ["Diagnosi elettronica", "Tagliandi e controlli", "Freni, sospensioni e impianti"],
  },
  {
    title: "Carrozzeria",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=86",
    description:
      "Ripristino estetico e strutturale con attenzione a finitura, precisione e tempi.",
    items: ["Riparazione danni e urti", "Grandine e cristalli", "Carrozzeria convenzionata"],
  },
  {
    title: "Pneumatici",
    image:
      "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1200&q=86",
    description:
      "Servizio gomme completo per cambio stagione, sicurezza e corretta usura degli pneumatici.",
    items: ["Cambio gomme stagionale", "Equilibratura e convergenza", "Riparazione e deposito gomme"],
  },
];

const workCards = [
  {
    label: "Carrozzeria",
    title: "Ripristino danni, verniciatura e finitura",
    text:
      "Interventi su paraurti, fiancate, graffi, ammaccature, grandine, cristalli e gestione auto sostitutiva quando disponibile.",
  },
  {
    label: "Meccanica",
    title: "Manutenzione, diagnosi e sicurezza",
    text:
      "Tagliandi, controlli meccanici, freni, sospensioni, impianti elettrici, ricarica clima e verifiche prima della revisione.",
  },
  {
    label: "Cambio gomme",
    title: "Pneumatici, assetto e deposito stagionale",
    text:
      "Sostituzione estive/invernali, montaggio pneumatici nuovi, equilibratura, convergenza, riparazione forature e deposito gomme.",
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
      `${name}, richiesta ricevuta per ${service}: ${readableDate} alle ${selectedTime}. In produzione questa richiesta verra salvata in Supabase e notificata all'officina.`,
    );
    event.currentTarget.reset();
  }

  return (
    <main id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Borsieri Car Service - torna all'inizio">
          <img className="brand-logo" src="/borsieri-logo.png" alt="Borsieri Car Service" />
        </a>
        <nav className="nav" aria-label="Navigazione principale">
          <a href="#servizi">Servizi</a>
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
            <div className="eyebrow">Carrozzeria · Meccanica · Pneumatici</div>
            <h1>Officina completa per la tua auto</h1>
            <p className="lead">
              Carrozzeria, meccanica e pneumatici in un unico centro a San Fermo della
              Battaglia. Lavorazioni curate, diagnosi precise e prenotazione rapida per il
              cambio gomme.
            </p>
            <div className="hero-actions">
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
                <span>Esperienza nata come carrozzeria specializzata</span>
              </div>
              <div className="metric">
                <strong>9</strong>
                <span>Lavorazioni tra carrozzeria, meccanica e gomme</span>
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
              <h2>Prenota il cambio gomme</h2>
              <p>
                Scegli uno slot libero in base agli orari di apertura e completa la richiesta
                senza uscire dal sito.
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
            <h2>Tre reparti, un solo riferimento</h2>
            <p>
              La landing mette subito in evidenza cosa fa Borsieri Car Service:
              riparazioni di carrozzeria, manutenzione meccanica e servizi pneumatici.
            </p>
          </div>
          <div className="services">
            {services.map((service) => (
              <article className="service" key={service.title}>
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
            <h2>Lavorazioni effettuate in officina</h2>
            <p>
              Una panoramica chiara per chi arriva sul sito e deve capire subito se Borsieri
              puo occuparsi del problema della propria auto.
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
            <h2>Booking semplice, gestione professionale</h2>
            <p>Il cliente prenota dal sito. Supabase conserva tutto cio che serve all'officina.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Scegli il servizio</h3>
              <p>Cambio stagionale, montaggio, equilibratura, convergenza o deposito gomme.</p>
            </div>
            <div className="step">
              <span>02</span>
              <h3>Inserisci il veicolo</h3>
              <p>Modello, misura pneumatici e note aiutano a preparare l'intervento.</p>
            </div>
            <div className="step">
              <span>03</span>
              <h3>Blocca la fascia</h3>
              <p>Il calendario mostra solo finestre coerenti con gli orari dell'officina.</p>
            </div>
            <div className="step">
              <span>04</span>
              <h3>Ricevi conferma</h3>
              <p>La richiesta entra in dashboard e puo essere confermata o riprogrammata.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-band" id="contatti">
        <div className="section-inner contact-grid">
          <div>
            <div className="eyebrow">Via San Fermo 64</div>
            <h2>A due minuti da Como, pronta per la stagione gomme</h2>
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
        <span>Landing produzione · Supabase-ready · Vercel-ready</span>
      </footer>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import BookingConfigurator from "./BookingConfigurator";

export const metadata: Metadata = {
  title: "Prenotazione cambio gomme | Borsieri Car Service",
  description:
    "Prenota online cambio gomme, riparazione pneumatici e convergenza da Borsieri Car Service a San Fermo della Battaglia, vicino a Como.",
  alternates: {
    canonical: "/prenotazione-cambio-gomme",
  },
  openGraph: {
    title: "Prenota il cambio gomme | Borsieri Car Service",
    description:
      "Consulta gli slot disponibili e prenota il servizio pneumatici a San Fermo della Battaglia.",
    url: "/prenotazione-cambio-gomme",
  },
};

const appointmentFlowItems = [
  { label: "01", title: "Servizio", text: "Indica la lavorazione e come verranno gestiti gli pneumatici." },
  { label: "02", title: "Slot", text: "Scegli una data e un orario tra quelli disponibili." },
  { label: "03", title: "Dati", text: "Completa i riferimenti del cliente e del veicolo." },
  { label: "04", title: "Conferma", text: "Ricevi la conferma dell'appuntamento dal calendario Google." },
];

function buildGoogleAppointmentUrl(value?: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (!url.hostname.endsWith("calendar.google.com")) return "";
    if (!url.searchParams.has("gv")) url.searchParams.set("gv", "true");
    return url.toString();
  } catch {
    return "";
  }
}

export default function TireBookingPage() {
  const googleAppointmentUrl = buildGoogleAppointmentUrl(
    process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL,
  );

  return (
    <main className="booking-page" id="top">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Borsieri Car Service - torna alla homepage">
          <img className="brand-logo" src="/borsieri-logo.png" alt="Borsieri Car Service" />
        </Link>
        <nav className="nav" aria-label="Navigazione principale">
          <Link href="/#servizi">Carrozzeria</Link>
          <Link href="/#lavorazioni">Lavorazioni</Link>
          <a aria-current="page" href="#prenota">Cambio gomme</a>
          <Link href="/#contatti">Contatti</Link>
        </nav>
        <Link className="button secondary" href="/">
          Torna al sito
        </Link>
      </header>

      <section className="booking-page-hero">
        <div className="booking-page-hero-inner">
          <div className="eyebrow">Servizio pneumatici online</div>
          <h1>Prenota il cambio gomme</h1>
          <p>
            Consulta la disponibilita dell&apos;officina Borsieri Car Service a San Fermo della
            Battaglia. Seleziona lo slot e completa tutte le informazioni senza uscire dal sito.
          </p>
          <div className="booking-page-facts" aria-label="Informazioni sul servizio">
            <span>Calendario aggiornato</span>
            <span>Lunedi-venerdi</span>
            <span>Conferma Google Calendar</span>
          </div>
          <a className="button primary" href="#prenota">
            Consulta gli slot liberi
          </a>
        </div>
      </section>

      <section className="booking-workspace" id="prenota">
        <div className="section-inner">
          <BookingConfigurator />

          <div className="booking-workspace-head">
            <div>
              <span className="booking-card-label">Passaggio 2 · Agenda online Borsieri</span>
              <h2>Scegli data e orario</h2>
            </div>
            <p>
              Gli slot mostrati rispettano gli orari impostati dall&apos;officina. Tutta la
              prenotazione viene completata nel calendario incorporato qui sotto.
            </p>
          </div>

          <div className="booking-card booking-calendar-card" id="calendario">
            <div className="booking-card-head">
              <div>
                <span className="booking-card-label">Google Calendar</span>
                <strong>Prenotazioni cambio gomme</strong>
              </div>
              <span className="booking-card-badge">Online</span>
            </div>

            <div className="booking-workspace-grid booking-workspace-calendar-only">
              <div className="google-booking-frame-shell">
                {googleAppointmentUrl ? (
                  <iframe
                    className="google-booking-frame"
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={googleAppointmentUrl}
                    title="Prenotazione cambio gomme Borsieri Car Service"
                  />
                ) : (
                  <div className="google-booking-placeholder">
                    <span className="booking-card-label">Configurazione finale</span>
                    <strong>Calendario Google pronto al collegamento</strong>
                    <p>
                      Collegando il link della pagina appuntamenti Google compariranno
                      qui gli slot liberi, i campi cliente e la conferma.
                    </p>
                    <a className="button primary" href="tel:+39031210622">
                      Prenota telefonicamente
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="booking-process">
        <div className="section-inner">
          <div className="booking-workspace-head">
            <div>
              <span className="booking-card-label">Procedura semplice</span>
              <h2>Dalla scelta alla conferma</h2>
            </div>
            <p>Un percorso ordinato per preparare l&apos;intervento e ridurre i tempi in accettazione.</p>
          </div>
          <div className="booking-flow-grid">
            {appointmentFlowItems.map((item) => (
              <article className="booking-flow-card" key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-contact-band">
        <div className="section-inner booking-contact-inner">
          <div>
            <span className="booking-card-label">Borsieri Car Service</span>
            <h2>Via San Fermo 64, San Fermo della Battaglia</h2>
          </div>
          <div className="booking-contact-actions">
            <a className="button primary" href="tel:+39031210622">Chiama l&apos;officina</a>
            <a className="button secondary" href="mailto:borsiericar@gmail.com">Scrivi una email</a>
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

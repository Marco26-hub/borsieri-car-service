/* eslint-disable @next/next/no-img-element -- Static Tophost export serves the lightweight local logo directly. */
import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsLink } from "../CookieConsent";
import SocialLinks from "../SocialLinks";
import BookingConfigurator from "./BookingConfigurator";

export const metadata: Metadata = {
  title: "Prenotazione cambio gomme | Borsieri Car Service",
  description:
    "Prenota il cambio gomme o richiedi online un preventivo con il 10% di sconto sulle gomme nuove da Borsieri Car Service, vicino a Como.",
  alternates: {
    canonical: "/prenotazione-cambio-gomme",
  },
  openGraph: {
    title: "Prenota il cambio gomme | Borsieri Car Service",
    description:
      "Consulta gli slot e richiedi un preventivo online con il 10% di sconto sulle gomme nuove.",
    url: "/prenotazione-cambio-gomme",
    images: [
      {
        url: "/og-borsieri.webp",
        width: 1200,
        height: 630,
        alt: "Borsieri Car Service - prenotazione servizio pneumatici",
      },
    ],
  },
};

const appointmentFlowItems = [
  { label: "01", title: "Operazione", text: "Scegli nuova prenotazione, modifica o annullamento e indica il servizio." },
  { label: "02", title: "Dati obbligatori", text: "Inserisci riferimenti del cliente, auto e targa." },
  { label: "03", title: "Invio", text: "Trasmetti i dati o la richiesta di preventivo all'officina." },
  { label: "04", title: "Agenda", text: "Per prenotazioni e modifiche, scegli uno slot Cal.com sincronizzato con Google Calendar." },
];

function buildCalBookingPath(value?: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    if (url.hostname !== "cal.com" && !url.hostname.endsWith(".cal.com")) return "";
    return url.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return /^[a-z0-9_-]+\/[a-z0-9_-]+$/i.test(value) ? value : "";
  }
}

export default function TireBookingPage() {
  const calBookingPath = buildCalBookingPath(
    process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL,
  );

  return (
    <main className="booking-page" id="top">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Borsieri Car Service - torna alla homepage">
          <img className="brand-logo" src="/borsieri-logo.png" alt="Borsieri Car Service" />
        </Link>
        <nav className="nav" aria-label="Navigazione principale">
          <Link href="/#servizi">Carrozzeria</Link>
          <Link href="/#meccanica">Meccanica</Link>
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
          <div className="eyebrow">Servizio pneumatici online · Offerta web</div>
          <h1>Prenota il cambio gomme</h1>
          <p>
            Consulta la disponibilita dell&apos;officina Borsieri Car Service a San Fermo della
            Battaglia. Seleziona lo slot e completa tutte le informazioni senza uscire dal sito.
          </p>
          <div className="booking-page-facts" aria-label="Informazioni sul servizio">
            <span>Calendario aggiornato</span>
            <span>Lunedi-venerdi</span>
            <span>Cal.com + Google Calendar</span>
          </div>
          <div className="booking-page-hero-actions">
            <a className="button primary" href="#configuratore">
              Preventivo gomme nuove -10%
            </a>
            <a className="button secondary" href="#calendario">
              Consulta gli slot liberi
            </a>
          </div>
          <p className="booking-hero-offer-note">
            Promozione riservata alle richieste inviate dal sito: sconto del 10% sugli
            pneumatici nuovi, esclusi montaggio e servizi. Non cumulabile e soggetta a
            disponibilita; condizioni confermate nel preventivo.
          </p>
        </div>
      </section>

      <section className="booking-workspace" id="prenota">
        <div className="section-inner">
          <BookingConfigurator calBookingPath={calBookingPath} />
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
            <span className="booking-card-label">Sede Borsieri Car Service</span>
            <h2 className="booking-location-title">
              <span>Via San Fermo 64</span>
              <strong>San Fermo della Battaglia</strong>
              <small>(Como)</small>
            </h2>
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

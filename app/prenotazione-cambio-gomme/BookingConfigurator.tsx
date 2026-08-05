"use client";

import { type FormEvent, useEffect, useState } from "react";
import Cal from "@calcom/embed-react";

const bookingActionOptions = ["Nuova prenotazione", "Cambia prenotazione", "Annulla prenotazione"];
const interventionOptions = ["Cambio gomme", "Riparazione gomma"];
const tireManagementOptions = [
  "Gomme nuove",
  "Gomme in magazzino",
];
const seasonOptions = ["Estive", "Invernali", "4 stagioni"];
const tierOptions = ["Premium", "Quality", "Economy"];

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="tire-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Seleziona</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function BookingConfigurator({
  calBookingPath,
}: {
  calBookingPath: string;
}) {
  const [bookingAction, setBookingAction] = useState("Nuova prenotazione");
  const [bookingReference, setBookingReference] = useState("");
  const [intervention, setIntervention] = useState("Cambio gomme");
  const [tireManagement, setTireManagement] = useState("");
  const [season, setSeason] = useState("");
  const [width, setWidth] = useState("");
  const [ratio, setRatio] = useState("");
  const [rim, setRim] = useState("");
  const [loadIndex, setLoadIndex] = useState("");
  const [speedIndex, setSpeedIndex] = useState("");
  const [tier, setTier] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plate, setPlate] = useState("");
  const [quoteNumber, setQuoteNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [externalConsent, setExternalConsent] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    const syncConsent = () => {
      setExternalConsent(window.localStorage.getItem("borsieri-external-consent") === "accepted");
    };
    const initialSync = window.setTimeout(() => {
      syncConsent();
      if (new URLSearchParams(window.location.search).get("servizio") === "gomme-nuove") {
        setTireManagement("Gomme nuove");
      }
    }, 0);
    window.addEventListener("borsieri-consent-change", syncConsent);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("borsieri-consent-change", syncConsent);
    };
  }, []);

  const isNewTireQuote = tireManagement === "Gomme nuove";
  const isExistingBooking = bookingAction !== "Nuova prenotazione";
  const isCancellation = bookingAction === "Annulla prenotazione";
  const customerDataReady = Boolean(customerName && phone && email && vehicle && plate && consent);
  const tireDetailsReady = !isNewTireQuote || Boolean(season && width && ratio && rim && tier);
  const bookingReferenceReady = !isExistingBooking || Boolean(bookingReference);
  const requestReady = Boolean(
    tireManagement && customerDataReady && tireDetailsReady && bookingReferenceReady,
  );

  async function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requestReady || submissionStatus === "sending") return;

    setSubmissionStatus("sending");
    setSubmissionError("");
    const submittedForm = new FormData(event.currentTarget);

    const formData = new URLSearchParams({
      website: String(submittedForm.get("website") ?? ""),
      azione_prenotazione: bookingAction,
      riferimento_prenotazione: bookingReference || "Non applicabile",
      intervento: intervention,
      gestione_pneumatici: tireManagement,
      tipologia: isNewTireQuote ? season : "Non applicabile",
      misura: isNewTireQuote ? `${width}/${ratio} R${rim}` : "Non applicabile",
      indice_carico: isNewTireQuote ? loadIndex || "Da verificare" : "Non applicabile",
      codice_velocita: isNewTireQuote ? speedIndex || "Da verificare" : "Non applicabile",
      fascia: isNewTireQuote ? tier : "Non applicabile",
      promozione: isNewTireQuote ? "Sconto 10% gomme nuove - richiesta online" : "Nessuna",
      nome: customerName,
      telefono: phone,
      email,
      veicolo: vehicle,
      targa: plate,
      numero_preventivo: quoteNumber || "Non indicato",
      consenso: consent ? "si" : "no",
    });

    try {
      const response = await fetch("/api/preventivo.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(payload?.message || "Invio non riuscito.");
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Invio non riuscito.");
      setSubmissionStatus("error");
    }
  }

  function allowExternalCalendar() {
    window.localStorage.setItem("borsieri-external-consent", "accepted");
    window.dispatchEvent(new CustomEvent("borsieri-consent-change", { detail: "accepted" }));
  }

  return (
    <>
      <form
        className="tire-configurator"
        aria-labelledby="configurator-title"
        id="configuratore"
        name="richiesta-servizio-pneumatici"
        onChange={() => {
          if (submissionStatus === "success" || submissionStatus === "error") {
            setSubmissionStatus("idle");
            setSubmissionError("");
          }
        }}
        onSubmit={handleRequestSubmit}
      >
      <label className="form-honeypot" aria-hidden="true">
        Non compilare
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <div className="tire-configurator-head">
        <div>
          <span className="booking-card-label">Passaggio 1 · Preventivo online</span>
          <h2 id="configurator-title">Configura il servizio</h2>
        </div>
        <div className="online-offer-summary">
          <strong>-10% sulle gomme nuove</strong>
          <span>Seleziona Gomme nuove e invia la richiesta dal sito.</span>
        </div>
      </div>

      <fieldset className="choice-group booking-action-group">
        <legend>Gestione appuntamento</legend>
        <div className="choice-grid choice-grid-two">
          {bookingActionOptions.map((option) => (
            <label className={`choice-card${bookingAction === option ? " is-selected" : ""}`} key={option}>
              <input
                checked={bookingAction === option}
                name="booking-action"
                onChange={() => {
                  setBookingAction(option);
                  setSubmissionStatus("idle");
                }}
                type="radio"
                value={option}
              />
              <span className="choice-indicator" aria-hidden="true" />
              <strong>{option}</strong>
            </label>
          ))}
        </div>
        {isExistingBooking && (
          <label className="tire-field booking-reference-field" htmlFor="booking-reference">
            <span>Riferimento prenotazione esistente</span>
            <input
              id="booking-reference"
              name="riferimento_prenotazione"
              placeholder="Codice o data e ora dell'appuntamento"
              required
              value={bookingReference}
              onChange={(event) => setBookingReference(event.target.value)}
            />
          </label>
        )}
      </fieldset>

      <fieldset className="choice-group">
        <legend>Tipo di intervento</legend>
        <div className="choice-grid choice-grid-three">
          {interventionOptions.map((option) => (
            <label className={`choice-card${intervention === option ? " is-selected" : ""}`} key={option}>
              <input
                checked={intervention === option}
                name="intervention"
                onChange={() => {
                  setIntervention(option);
                  setSubmissionStatus("idle");
                }}
                type="radio"
                value={option}
              />
              <span className="choice-indicator" aria-hidden="true" />
              <strong>{option}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice-group" id="scegli-gomme">
        <legend>Gestione pneumatici</legend>
        <div className="choice-grid choice-grid-two">
          {tireManagementOptions.map((option) => (
            <label className={`choice-card${tireManagement === option ? " is-selected" : ""}`} key={option}>
              <input
                checked={tireManagement === option}
                name="tire-management"
                onChange={() => {
                  setTireManagement(option);
                  setSubmissionStatus("idle");
                }}
                type="radio"
                value={option}
              />
              <span className="choice-indicator" aria-hidden="true" />
              <strong>{option}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      {isNewTireQuote && (
        <div className="new-tire-config" aria-live="polite">
          <div className="new-tire-config-head">
            <div>
              <span className="booking-card-label">Gomme nuove · Sconto web 10%</span>
              <h3>Definisci gli pneumatici</h3>
            </div>
            <p>La misura e riportata sul fianco della gomma, ad esempio 205/55 R16.</p>
          </div>

          <div className="tire-form-grid">
            <SelectField id="season" label="Tipologia" value={season} options={seasonOptions} onChange={setSeason} />
            <label className="tire-field" htmlFor="width">
              <span>Larghezza</span>
              <input id="width" inputMode="numeric" maxLength={3} placeholder="205" value={width} onChange={(event) => setWidth(event.target.value.replace(/\D/g, ""))} />
            </label>
            <label className="tire-field" htmlFor="ratio">
              <span>Spalla</span>
              <input id="ratio" inputMode="numeric" maxLength={2} placeholder="55" value={ratio} onChange={(event) => setRatio(event.target.value.replace(/\D/g, ""))} />
            </label>
            <label className="tire-field" htmlFor="rim">
              <span>Diametro</span>
              <input id="rim" inputMode="numeric" maxLength={2} placeholder="16" value={rim} onChange={(event) => setRim(event.target.value.replace(/\D/g, ""))} />
            </label>
            <label className="tire-field" htmlFor="load-index">
              <span>Indice di carico</span>
              <input id="load-index" inputMode="numeric" maxLength={3} placeholder="91" value={loadIndex} onChange={(event) => setLoadIndex(event.target.value.replace(/\D/g, ""))} />
            </label>
            <label className="tire-field" htmlFor="speed-index">
              <span>Codice velocita</span>
              <input id="speed-index" maxLength={2} placeholder="V" value={speedIndex} onChange={(event) => setSpeedIndex(event.target.value.toUpperCase().replace(/[^A-Z]/g, ""))} />
            </label>
            <SelectField id="tier" label="Fascia prodotto" value={tier} options={tierOptions} onChange={setTier} />
          </div>
          <p className="quote-offer-terms">
            Lo sconto si applica agli pneumatici nuovi indicati nel preventivo, esclusi
            montaggio e servizi. Promozione non cumulabile, soggetta a disponibilita e
            conferma dell&apos;officina.
          </p>
        </div>
      )}

      {tireManagement && (
        <div className="quote-customer-section customer-data-panel" aria-live="polite">
          <div>
            <span className="booking-card-label">Passaggio 2 · Obbligatorio per ogni intervento</span>
            <h3>Dati cliente e veicolo</h3>
            <p>Completa i riferimenti prima di accedere agli slot disponibili.</p>
          </div>
          <div className="tire-form-grid quote-customer-grid">
            <label className="tire-field" htmlFor="customer-name">
              <span>Nome e cognome</span>
              <input id="customer-name" name="nome" required value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
            </label>
            <label className="tire-field" htmlFor="phone">
              <span>Telefono</span>
              <input id="phone" inputMode="tel" name="telefono" required value={phone} onChange={(event) => setPhone(event.target.value)} />
            </label>
            <label className="tire-field" htmlFor="email">
              <span>Email</span>
              <input id="email" name="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="tire-field" htmlFor="vehicle">
              <span>Marca e modello auto</span>
              <input id="vehicle" name="veicolo" required value={vehicle} onChange={(event) => setVehicle(event.target.value)} />
            </label>
            <label className="tire-field" htmlFor="plate">
              <span>Targa</span>
              <input id="plate" maxLength={10} name="targa" required value={plate} onChange={(event) => setPlate(event.target.value.toUpperCase())} />
            </label>
            <label className="tire-field" htmlFor="quote-number">
              <span>Numero preventivo facoltativo</span>
              <input
                id="quote-number"
                maxLength={40}
                name="numero_preventivo"
                placeholder="Se gia ricevuto"
                value={quoteNumber}
                onChange={(event) => setQuoteNumber(event.target.value.toUpperCase())}
              />
            </label>
          </div>
          <div className="privacy-consent-row">
            <label className="privacy-consent">
              <input checked={consent} onChange={(event) => setConsent(event.target.checked)} required type="checkbox" />
              <span>Acconsento al trattamento dei dati e a essere ricontattato per questa richiesta.</span>
            </label>
            <a href="https://www.iubenda.com/privacy-policy/16946203" rel="noreferrer" target="_blank">Leggi l&apos;informativa privacy</a>
          </div>

          <div className="quote-action-panel">
            <div>
              <span>Richiesta selezionata</span>
              <strong>
                {requestReady
                  ? `${bookingAction} · ${intervention} · ${tireManagement}`
                  : "Completa configurazione, dati cliente e veicolo"}
              </strong>
            </div>
            <button className="button primary" disabled={!requestReady || submissionStatus === "sending"} type="submit">
              {submissionStatus === "sending"
                ? "Invio in corso"
                : isCancellation
                  ? "Invia richiesta di annullamento"
                  : bookingAction === "Cambia prenotazione"
                    ? "Invia dati e mostra nuovi slot"
                    : isNewTireQuote
                  ? "Richiedi preventivo -10%"
                  : "Invia dati e mostra gli slot"}
            </button>
          </div>

          {submissionStatus === "success" && (
            <div className="form-feedback is-success" role="status">
              <strong>
                {isCancellation
                  ? "Richiesta di annullamento inviata."
                  : bookingAction === "Cambia prenotazione"
                    ? "Richiesta di modifica inviata."
                    : isNewTireQuote
                      ? "Richiesta preventivo inviata."
                      : "Dati inviati correttamente."}
              </strong>
              <span>
                {isCancellation
                  ? "Borsieri Car Service verifichera la prenotazione indicata e confermera l'annullamento."
                  : bookingAction === "Cambia prenotazione"
                    ? "Borsieri verifichera l'appuntamento esistente. Puoi intanto scegliere un nuovo slot disponibile."
                    : isNewTireQuote
                      ? "Riceverai la proposta con lo sconto web del 10%. La prenotazione dello slot resta separata e non comporta accettazione del preventivo."
                      : "I dati del cliente e dell'auto sono stati registrati. Ora puoi scegliere lo slot."}
              </span>
              {!isCancellation && (
                <a className="button secondary" href="#calendario">
                  {isNewTireQuote ? "Hai gia il preventivo? Scegli uno slot" : "Scegli data e orario"}
                </a>
              )}
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="form-feedback is-error" role="alert">
              <strong>Non siamo riusciti a inviare i dati.</strong>
              <span>{submissionError || "Puoi contattare subito l'officina al numero +39 031 210622."}</span>
              <a className="button secondary" href="tel:+39031210622">Chiama l&apos;officina</a>
            </div>
          )}
        </div>
      )}
      </form>

      <div className="booking-workspace-head">
        <div>
          <span className="booking-card-label">Passaggio 3 · Agenda Cal.com Borsieri</span>
          <h2>Scegli data e orario</h2>
        </div>
        <p>
          Gli slot si attivano dopo l&apos;invio dei dati obbligatori del cliente e del veicolo.
          Per annullare un appuntamento non occorre scegliere un nuovo orario.
        </p>
      </div>

      <div className="booking-card booking-calendar-card" id="calendario">
        <div className="booking-card-head">
          <div>
            <span className="booking-card-label">Cal.com · Sincronizzato con Google Calendar</span>
            <strong>Prenotazioni cambio gomme</strong>
          </div>
          <span className={`booking-card-badge${submissionStatus === "success" && !isCancellation ? "" : " is-locked"}`}>
            {submissionStatus === "success" && !isCancellation ? "Disponibile" : "Dati richiesti"}
          </span>
        </div>

        <div className="booking-workspace-grid booking-workspace-calendar-only">
          <div className="google-booking-frame-shell">
            {submissionStatus !== "success" || isCancellation ? (
              <div className="google-booking-placeholder booking-calendar-locked">
                <span className="booking-card-label">Accesso agli slot</span>
                <strong>
                  {isCancellation
                    ? "Richiesta di annullamento in gestione"
                    : "Prima completa i dati cliente e veicolo"}
                </strong>
                <p>
                  {isCancellation
                    ? "L'officina confermera l'annullamento utilizzando i riferimenti inviati."
                    : "Seleziona il servizio, inserisci i dati obbligatori e invia la richiesta per visualizzare il calendario."}
                </p>
                {!isCancellation && <a className="button primary" href="#configuratore">Completa i dati</a>}
              </div>
            ) : !externalConsent ? (
              <div className="google-booking-placeholder booking-calendar-consent">
                <span className="booking-card-label">Consenso richiesto</span>
                <strong>Abilita Cal.com per vedere gli slot</strong>
                <p>
                  L&apos;agenda esterna resta disattivata finche non autorizzi il collegamento a
                  Cal.com.
                </p>
                <button className="button primary" onClick={allowExternalCalendar} type="button">
                  Abilita agenda online
                </button>
              </div>
            ) : calBookingPath ? (
              <Cal
                calLink={calBookingPath}
                className="cal-booking-embed"
                config={{ layout: "month_view", theme: "dark" }}
                style={{ minHeight: "700px", width: "100%" }}
              />
            ) : (
              <div className="google-booking-placeholder">
                <span className="booking-card-label">Configurazione finale</span>
                <strong>Agenda Cal.com pronta al collegamento</strong>
                <p>
                  Inserendo il link evento Cal.com compariranno qui gli slot liberi sincronizzati
                  con il Google Calendar del cliente.
                </p>
                <a className="button primary" href="tel:+39031210622">Prenota telefonicamente</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

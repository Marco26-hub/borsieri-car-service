"use client";

import { type FormEvent, useState } from "react";

const interventionOptions = ["Cambio gomme", "Riparazione gomma", "Sola convergenza"];
const tireManagementOptions = [
  "Gomme sue",
  "Gomme nuove",
  "Gomme in magazzino",
  "Gomme da portare",
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

export default function BookingConfigurator() {
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
  const [consent, setConsent] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const isNewTireQuote = tireManagement === "Gomme nuove";
  const quoteReady = Boolean(
    season && width && ratio && rim && tier && customerName && phone && email && vehicle && consent,
  );

  async function handleQuoteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isNewTireQuote || !quoteReady || submissionStatus === "sending") return;

    setSubmissionStatus("sending");
    const submittedForm = new FormData(event.currentTarget);

    const formData = new URLSearchParams({
      website: String(submittedForm.get("website") ?? ""),
      intervento: intervention,
      gestione_pneumatici: tireManagement,
      tipologia: season,
      misura: `${width}/${ratio} R${rim}`,
      indice_carico: loadIndex || "Da verificare",
      codice_velocita: speedIndex || "Da verificare",
      fascia: tier,
      nome: customerName,
      telefono: phone,
      email,
      veicolo: vehicle,
      targa: plate || "Non indicata",
      consenso: consent ? "si" : "no",
    });

    try {
      const response = await fetch("/api/preventivo.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error("Quote request failed");
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  }

  return (
    <form
      className="tire-configurator"
      aria-labelledby="configurator-title"
      name="richiesta-preventivo-pneumatici"
      onSubmit={handleQuoteSubmit}
    >
      <label className="form-honeypot" aria-hidden="true">
        Non compilare
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <div className="tire-configurator-head">
        <div>
          <span className="booking-card-label">Passaggio 1</span>
          <h2 id="configurator-title">Configura il servizio</h2>
        </div>
        <p>Seleziona le opzioni necessarie. Per le gomme nuove puoi preparare subito una richiesta di preventivo completa.</p>
      </div>

      <fieldset className="choice-group">
        <legend>Tipo di intervento</legend>
        <div className="choice-grid choice-grid-three">
          {interventionOptions.map((option) => (
            <label className={`choice-card${intervention === option ? " is-selected" : ""}`} key={option}>
              <input
                checked={intervention === option}
                name="intervention"
                onChange={() => setIntervention(option)}
                type="radio"
                value={option}
              />
              <span className="choice-indicator" aria-hidden="true" />
              <strong>{option}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice-group">
        <legend>Gestione pneumatici</legend>
        <div className="choice-grid">
          {tireManagementOptions.map((option) => (
            <label className={`choice-card${tireManagement === option ? " is-selected" : ""}`} key={option}>
              <input
                checked={tireManagement === option}
                name="tire-management"
                onChange={() => setTireManagement(option)}
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
              <span className="booking-card-label">Gomme nuove</span>
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

          <div className="quote-customer-section">
            <div>
              <span className="booking-card-label">Riferimenti per il preventivo</span>
              <h3>Dati cliente e veicolo</h3>
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
                <span>Targa opzionale</span>
                <input id="plate" maxLength={10} name="targa" value={plate} onChange={(event) => setPlate(event.target.value.toUpperCase())} />
              </label>
            </div>
            <div className="privacy-consent-row">
              <label className="privacy-consent">
                <input checked={consent} onChange={(event) => setConsent(event.target.checked)} required type="checkbox" />
                <span>Acconsento a essere ricontattato da Borsieri Car Service per questa richiesta di preventivo.</span>
              </label>
              <a href="https://www.iubenda.com/privacy-policy/16946203" rel="noreferrer" target="_blank">Leggi l&apos;informativa privacy</a>
            </div>
          </div>

          <div className="quote-action-panel">
            <div>
              <span>Configurazione</span>
              <strong>{quoteReady ? `${season} · ${width}/${ratio} R${rim} · ${tier}` : "Completa configurazione e dati cliente"}</strong>
            </div>
            <button className="button primary" disabled={!quoteReady || submissionStatus === "sending"} type="submit">
              {submissionStatus === "sending" ? "Invio in corso" : "Richiedi preventivo"}
            </button>
          </div>

          {submissionStatus === "success" && (
            <div className="form-feedback is-success" role="status">
              <strong>Richiesta inviata correttamente.</strong>
              <span>Borsieri Car Service ti contattera per disponibilita e proposta pneumatici.</span>
              <a className="button secondary" href="#calendario">Consulta anche gli slot</a>
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="form-feedback is-error" role="alert">
              <strong>Non siamo riusciti a inviare la richiesta.</strong>
              <span>Puoi contattare subito l&apos;officina al numero +39 031 210622.</span>
              <a className="button secondary" href="tel:+39031210622">Chiama l&apos;officina</a>
            </div>
          )}
        </div>
      )}

      {!isNewTireQuote && tireManagement && (
        <div className="configurator-next" aria-live="polite">
          <div>
            <span>Selezione completata</span>
            <strong>{intervention} · {tireManagement}</strong>
          </div>
          <a className="button primary" href="#calendario">Scegli data e orario</a>
        </div>
      )}
    </form>
  );
}

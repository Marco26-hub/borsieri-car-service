"use client";

import { useEffect, useState } from "react";

const consentKey = "borsieri-external-consent";

function saveConsent(choice: "accepted" | "necessary") {
  window.localStorage.setItem(consentKey, choice);
  window.dispatchEvent(new CustomEvent("borsieri-consent-change", { detail: choice }));
}

export function CookieSettingsLink() {
  return (
    <button
      className="footer-legal-button"
      onClick={() => window.dispatchEvent(new Event("borsieri-open-consent"))}
      type="button"
    >
      Preferenze cookie
    </button>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      setVisible(window.localStorage.getItem(consentKey) === null);
    }, 0);
    const openPreferences = () => setVisible(true);
    window.addEventListener("borsieri-open-consent", openPreferences);
    return () => {
      window.clearTimeout(initialCheck);
      window.removeEventListener("borsieri-open-consent", openPreferences);
    };
  }, []);

  function choose(choice: "accepted" | "necessary") {
    saveConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="consent-banner" aria-labelledby="consent-title" role="dialog">
      <div>
        <strong id="consent-title">Privacy e strumenti esterni</strong>
        <p>
          Il sito usa solo funzioni tecniche necessarie. Google Calendar viene caricato soltanto
          con il tuo consenso; puoi modificare la scelta in qualsiasi momento.
        </p>
        <div className="consent-links">
          <a href="https://www.iubenda.com/privacy-policy/16946203" rel="noreferrer" target="_blank">
            Privacy policy
          </a>
          <a href="https://www.iubenda.com/privacy-policy/16946203/cookie-policy" rel="noreferrer" target="_blank">
            Cookie policy
          </a>
        </div>
      </div>
      <div className="consent-actions">
        <button className="button secondary" onClick={() => choose("necessary")} type="button">
          Solo necessari
        </button>
        <button className="button primary" onClick={() => choose("accepted")} type="button">
          Accetta Google Calendar
        </button>
      </div>
    </aside>
  );
}

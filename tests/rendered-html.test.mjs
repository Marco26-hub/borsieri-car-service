import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const htmlPath = pathname === "/" ? "../out/index.html" : `../out${pathname}/index.html`;
  const html = await readFile(new URL(htmlPath, import.meta.url), "utf8");
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}

test("server-renders the Borsieri landing with SEO-critical content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();

  assert.match(
    html,
    /<title>Carrozzeria Borsieri Car Service \| San Fermo della Battaglia, Como<\/title>/i,
  );
  assert.match(html, /Carrozzeria specializzata Borsieri Car Service/);
  assert.match(html, /San Fermo della Battaglia/);
  assert.match(html, /Dalla preparazione alla finitura/);
  assert.match(html, /Prenota cambio gomme/);
  assert.match(html, /Sconto del 10%/);
  assert.match(html, /servizio=gomme-nuove#scegli-gomme/);
  assert.match(html, /Richiedi preventivo gomme nuove/);
  assert.match(html, /servizio-meccanica\.webp/);
  assert.match(html, /topbar-booking-cta/);
  assert.match(html, /Servizio dedicato ai clienti dalla Svizzera/);
  assert.match(html, /Auto sostitutiva anche per residenti in Svizzera/);
  assert.match(html, /Diagnosi e manutenzione con competenza tecnica/);
  assert.match(html, /Assistenza meccanica/);
  assert.match(html, /id="meccanica"/);
  assert.match(html, /replacement-car-image/);
  assert.match(html, /Analisi tecnica e priorita chiare/);
  assert.match(html, /Richiedi valutazione in sede/);
  assert.match(html, /borsiericar@gmail\.com/);
  assert.match(html, /facebook\.com\/carrozzeriaborsieri/);
  assert.match(html, /instagram\.com\/borsiericar/);
  assert.doesNotMatch(html, /info@borsiericarservice\.it/);
  assert.match(html, /"@type":"AutoBodyShop"/);
  assert.match(html, /"addressLocality":"San Fermo della Battaglia"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|Codex/i);
});

test("renders the dedicated tire booking page and selectable service structure", async () => {
  const response = await render("/prenotazione-cambio-gomme");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Prenotazione cambio gomme \| Borsieri Car Service<\/title>/i);
  assert.match(html, /Configura il servizio/);
  assert.match(html, /Tipo di intervento/);
  assert.match(html, /Cambio gomme/);
  assert.match(html, /Riparazione gomma/);
  assert.doesNotMatch(html, /Sola convergenza/);
  assert.match(html, /Gestione pneumatici/);
  assert.match(html, /Gomme nuove/);
  assert.match(html, /-10% sulle gomme nuove/);
  assert.match(html, /Gomme in magazzino/);
  assert.doesNotMatch(html, /Gomme sue/);
  assert.doesNotMatch(html, /Gomme da portare/);
  assert.match(html, /Scegli data e orario/);
  assert.match(html, /Cal.com/);
  assert.match(html, /Accesso agli slot/);
});

test("keeps Tophost and production handoff configuration in sync", async () => {
  const [nextConfig, packageJson, handoff, checklist, page, globalsCss, bookingPage, configurator, quoteEndpoint, htaccess, envExample] =
    await Promise.all([
      readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../HANDOFF.md", import.meta.url), "utf8"),
      readFile(new URL("../GO_LIVE_CHECKLIST.md", import.meta.url), "utf8"),
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../app/prenotazione-cambio-gomme/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/prenotazione-cambio-gomme/BookingConfigurator.tsx", import.meta.url), "utf8"),
      readFile(new URL("../public/api/preventivo.php", import.meta.url), "utf8"),
      readFile(new URL("../public/.htaccess", import.meta.url), "utf8"),
      readFile(new URL("../.env.example", import.meta.url), "utf8"),
    ]);

  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /trailingSlash: true/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(handoff, /Tophost/);
  assert.match(checklist, /Tophost/);
  assert.match(checklist, /Cal\.com/);
  assert.match(checklist, /Tipo intervento/);
  assert.match(checklist, /Gestione pneumatici/);
  assert.match(checklist, /Gomme nuove/);

  assert.match(page, /\/prenotazione-cambio-gomme/);
  assert.match(page, /servizio=gomme-nuove#scegli-gomme/);
  assert.match(globalsCss, /servizio-pneumatici\.webp/);
  assert.match(globalsCss, /hero-carrozzeria-cinematica\.webp/);
  assert.doesNotMatch(page, /id="prenota"/);
  assert.match(bookingPage, /id="prenota"/);
  assert.match(bookingPage, /NEXT_PUBLIC_CALCOM_BOOKING_URL/);
  assert.match(bookingPage, /buildCalBookingPath/);
  assert.match(configurator, /name="intervention"/);
  assert.match(configurator, /name="tire-management"/);
  assert.match(configurator, /id="scegli-gomme"/);
  assert.match(configurator, /URLSearchParams/);
  assert.match(configurator, /setTireManagement\("Gomme nuove"\)/);
  assert.match(configurator, /name="targa"/);
  assert.match(configurator, /name="numero_preventivo"/);
  assert.match(configurator, /Richiedi preventivo/);
  assert.match(configurator, /Sconto 10% gomme nuove/);
  assert.match(configurator, /@calcom\/embed-react/);
  assert.match(configurator, /fetch\("\/api\/preventivo\.php"/);
  assert.match(quoteEndpoint, /borsiericar@gmail\.com/);
  assert.match(quoteEndpoint, /Promozione:/);
  assert.match(quoteEndpoint, /mail\(\$recipient/);
  assert.match(htaccess, /RewriteCond %\{HTTPS\} !=on/);
  assert.doesNotMatch(page, /fetch\("\/api\/appointments"/);
  assert.match(envExample, /NEXT_PUBLIC_CALCOM_BOOKING_URL/);
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
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
  assert.match(html, /Ripristino carrozzeria con processo professionale/);
  assert.match(html, /Prenota pneumatici e cambio gomme/);
  assert.match(html, /Nuovo servizio online/);
  assert.match(html, /Google Calendar/);
  assert.match(html, /Rubrica chiara/);
  assert.match(html, /Riparazione gomma/);
  assert.match(html, /Sola convergenza/);
  assert.match(html, /Gomme in magazzino/);
  assert.match(html, /Gomme da portare/);
  assert.match(html, /Richiedi valutazione in sede/);
  assert.match(html, /borsiericar@gmail\.com/);
  assert.doesNotMatch(html, /info@borsiericarservice\.it/);
  assert.match(html, /"@type":"AutoBodyShop"/);
  assert.match(html, /"addressLocality":"San Fermo della Battaglia"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|Codex/i);
});

test("keeps Netlify and production handoff configuration in sync", async () => {
  const [netlifyConfig, packageJson, handoff, checklist, page, envExample] =
    await Promise.all([
      readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../HANDOFF.md", import.meta.url), "utf8"),
      readFile(new URL("../GO_LIVE_CHECKLIST.md", import.meta.url), "utf8"),
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../.env.example", import.meta.url), "utf8"),
    ]);

  assert.match(netlifyConfig, /command = "npm run build"/);
  assert.match(netlifyConfig, /publish = "\.next"/);
  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"build:sites": "WRANGLER_LOG_PATH=\.wrangler\/wrangler\.log vinext build"/);
  assert.match(handoff, /Collegare il repository GitHub a Netlify/);
  assert.match(checklist, /Creare progetto Netlify collegato al repository GitHub/);
  assert.match(checklist, /Google Calendar Appointment Schedule/);
  assert.match(checklist, /Tipo intervento/);
  assert.match(checklist, /Gestione pneumatici/);

  assert.match(page, /id="prenota"/);
  assert.match(page, /NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL/);
  assert.match(page, /buildGoogleAppointmentUrl/);
  assert.doesNotMatch(page, /fetch\("\/api\/appointments"/);
  assert.match(envExample, /NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL/);
});

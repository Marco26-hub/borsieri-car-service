type AppointmentPayload = {
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  car?: string;
  notes?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const payload = (await request.json()) as AppointmentPayload;
  const appointment = {
    service_type: clean(payload.service),
    preferred_date: clean(payload.date),
    preferred_time: clean(payload.time),
    customer_name: clean(payload.name),
    customer_phone: clean(payload.phone),
    vehicle_summary: clean(payload.car),
    notes: clean(payload.notes),
    status: "pending",
    source: "website",
  };

  if (
    !appointment.service_type ||
    !appointment.preferred_date ||
    !appointment.preferred_time ||
    !appointment.customer_name ||
    !appointment.customer_phone ||
    !appointment.vehicle_summary
  ) {
    return Response.json(
      { error: "Compila servizio, giorno, ora, nome, telefono e auto." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      {
        error:
          "La prenotazione online non e ancora attiva. Contatta Borsieri Car Service telefonicamente per confermare l'appuntamento.",
      },
      { status: 503 },
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/appointments`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(appointment),
  });

  if (!response.ok) {
    return Response.json(
      {
        error:
          "Non siamo riusciti a registrare la richiesta. Contatta l'officina telefonicamente.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}

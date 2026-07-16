export async function POST(req: Request) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ error: "Chat service is not configured." }, { status: 503 });
  }

  const body = await req.text();

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch {
    return Response.json({ error: "Chat service is unreachable." }, { status: 502 });
  }

  if (!backendResponse.ok) {
    const data = await backendResponse.json().catch(() => ({ error: "Chat request failed." }));
    return Response.json(data, { status: backendResponse.status });
  }

  return new Response(backendResponse.body, {
    status: backendResponse.status,
    headers: { "Content-Type": "text/plain" },
  });
}

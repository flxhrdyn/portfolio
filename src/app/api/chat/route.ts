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

  const data = await backendResponse.json();
  return Response.json(data, { status: backendResponse.status });
}

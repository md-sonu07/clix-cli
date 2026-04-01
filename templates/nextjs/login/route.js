export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      { message: "Missing fields" },
      { status: 400 }
    );
  }

  return Response.json({
    message: "__MODULE__ login successful",
    token: "dummy-token"
  });
}
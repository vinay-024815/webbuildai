/**
 * API Key authentication middleware for MCP server
 */

export function validateAuth(request,env) {
  const expectedKey = env.MCP_API_KEY; // Set via wrangler vars or secrets
  const authHeader = request.headers.get("Authorization");

  if (!expectedKey) {
    // If no key configured, allow all (dev mode)
    return { valid: true };
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { valid: false, error: "Missing or invalid Authorization header" };
  }

  const providedKey = authHeader.slice(7);
  if (providedKey !== expectedKey) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: true };
}

export function withAuth(handler) {
  return async (request, env, ctx) => {
    const auth = validateAuth(request);
    if (!auth.valid) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return handler(request, env, ctx);
  };
}
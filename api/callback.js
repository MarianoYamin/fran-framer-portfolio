/**
 * @archivo    api/callback.js
 * @modulo     OAuth GitHub — paso 2 (intercambio de código por token)
 * @descripcion Función serverless de Vercel. GitHub redirige acá tras
 *              autorizar. Intercambia el `code` por un access token y
 *              devuelve un HTML que le pasa el token a la ventana de
 *              Decap CMS via postMessage (el flujo estándar de Decap).
 *
 *              Necesita las env vars en Vercel:
 *                - OAUTH_GITHUB_CLIENT_ID
 *                - OAUTH_GITHUB_CLIENT_SECRET
 * @actualizado 2026-05-14
 */
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res
      .status(500)
      .send(
        "Faltan OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET en Vercel.",
      );
    return;
  }

  const code = req.query.code;
  if (!code) {
    res.status(400).send("Falta el parámetro 'code' de GitHub.");
    return;
  }

  try {
    // Intercambia el code por un access token
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      },
    );

    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      throw new Error(data.error_description || "GitHub no devolvió token");
    }

    const result = {
      token: data.access_token,
      provider: "github",
    };

    // Decap espera este handshake exacto via postMessage:
    // 1. la ventana popup avisa "authorizing:github"
    // 2. cuando el opener responde, le manda "authorization:github:success:<json>"
    const page = `<!doctype html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(result)}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script><p>Autenticando… ya podés cerrar esta ventana.</p></body></html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(page);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error al autenticar con GitHub: ${err && err.message ? err.message : err}`,
      );
  }
}

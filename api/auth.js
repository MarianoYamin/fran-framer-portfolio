/**
 * @archivo    api/auth.js
 * @modulo     OAuth GitHub — paso 1 (autorización)
 * @descripcion Función serverless de Vercel. Decap CMS la llama cuando Fran
 *              hace click en "Login with GitHub". Redirige a GitHub para que
 *              autorice la app. GitHub después vuelve a /api/callback.
 *
 *              Necesita la env var OAUTH_GITHUB_CLIENT_ID configurada en
 *              Vercel (del GitHub OAuth App que crea el dueño del repo).
 * @actualizado 2026-05-14
 */
import crypto from "node:crypto";

export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send("Falta configurar OAUTH_GITHUB_CLIENT_ID en Vercel.");
    return;
  }

  // El host real del deploy (sirve para preview deploys y dominio propio)
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const redirectUri = `${proto}://${host}/api/callback`;

  // State aleatorio anti-CSRF
  const state = crypto.randomBytes(16).toString("hex");

  const authUrl =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent("repo,user")}` +
    `&state=${state}`;

  res.writeHead(302, { Location: authUrl });
  res.end();
}

/**
 * Local CRA proxy for /api/* (production uses api/*.js on Vercel).
 * Reads VERCEL_* from .env — never expose those as REACT_APP_*.
 */
const fs = require('fs');
const path = require('path');
const { heartbeat, count } = require('../server/presenceStore');

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function readJson(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 2048) raw = raw.slice(0, 2048);
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

loadEnvFile();

module.exports = function setupProxy(app) {
  app.get('/api/visitors', async (req, res) => {
    const token = process.env.VERCEL_ACCESS_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const teamSlug = process.env.VERCEL_TEAM_SLUG;

    if (!token || !projectId) {
      res.status(500).json({ error: 'Analytics not configured' });
      return;
    }

    try {
      const url = new URL(
        'https://api.vercel.com/v1/query/web-analytics/visits/count'
      );
      url.searchParams.set('projectId', projectId);
      if (teamSlug) url.searchParams.set('slug', teamSlug);

      const upstream = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await upstream.json().catch(() => ({}));

      if (!upstream.ok) {
        res.status(upstream.status).json({
          error: 'Failed to fetch analytics',
          detail: body?.error || body?.message || null,
        });
        return;
      }

      res.status(200).json({
        visitors: Number(body?.data?.visitors ?? 0),
        pageviews: Number(body?.data?.pageviews ?? 0),
      });
    } catch (err) {
      res.status(502).json({
        error: 'Analytics upstream error',
        detail: err?.message || 'unknown',
      });
    }
  });

  app.get('/api/presence', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const id = typeof req.query?.id === 'string' ? req.query.id : '';
    const online = id ? heartbeat(id) : count();
    res.status(200).json({ online });
  });

  // Keep POST for production parity / older clients
  app.post('/api/presence', async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const body = await readJson(req);
    res.status(200).json({ online: heartbeat(body?.id) });
  });
};

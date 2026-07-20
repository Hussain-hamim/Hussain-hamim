const { heartbeat, count } = require('../server/presenceStore');

function readJson(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      resolve(req.body);
      return;
    }
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

/**
 * Live presence: GET ?id=… heartbeat → { online }
 * POST { id } also supported.
 * In-memory across warm serverless instances (good enough for a portfolio).
 */
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const id = typeof req.query?.id === 'string' ? req.query.id : '';
    return res.status(200).json({ online: id ? heartbeat(id) : count() });
  }

  if (req.method === 'POST') {
    const body = await readJson(req);
    return res.status(200).json({ online: heartbeat(body?.id) });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

/**
 * Vercel serverless: returns Web Analytics visitors + pageviews.
 * Env (set in Vercel project settings + local .env):
 *   VERCEL_ACCESS_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_SLUG
 */
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamSlug = process.env.VERCEL_TEAM_SLUG;

  if (!token || !projectId) {
    return res.status(500).json({ error: 'Analytics not configured' });
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
      return res.status(upstream.status).json({
        error: 'Failed to fetch analytics',
        detail: body?.error || body?.message || null,
      });
    }

    const visitors = Number(body?.data?.visitors ?? 0);
    const pageviews = Number(body?.data?.pageviews ?? 0);

    return res.status(200).json({ visitors, pageviews });
  } catch (err) {
    return res.status(502).json({
      error: 'Analytics upstream error',
      detail: err?.message || 'unknown',
    });
  }
};

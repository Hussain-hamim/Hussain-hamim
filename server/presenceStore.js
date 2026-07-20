const TTL_MS = 45_000;

function getStore() {
  if (!globalThis.__sitePresence) {
    globalThis.__sitePresence = new Map();
  }
  return globalThis.__sitePresence;
}

function prune(now = Date.now()) {
  const store = getStore();
  for (const [id, ts] of store) {
    if (now - ts > TTL_MS) store.delete(id);
  }
}

function heartbeat(id) {
  if (typeof id !== 'string') return count();
  const clean = id.trim().slice(0, 64);
  if (!clean) return count();
  prune();
  getStore().set(clean, Date.now());
  return getStore().size;
}

function count() {
  prune();
  return getStore().size;
}

module.exports = { heartbeat, count, TTL_MS };

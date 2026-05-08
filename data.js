import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const headers = { 'Content-Type': 'application/json' };

  // Health check — visit /.netlify/functions/data?health=1 to test
  if (url.searchParams.get('health')) {
    try {
      const store = getStore('momentvm');
      // Do a real round-trip: write + read + delete to confirm Blobs work
      const testKey = '__health__';
      await store.set(testKey, 'ok');
      const v = await store.get(testKey);
      await store.delete(testKey);
      return new Response(
        JSON.stringify({ ok: true, blobsWorking: v === 'ok', time: new Date().toISOString() }),
        { headers }
      );
    } catch (e) {
      return new Response(
        JSON.stringify({ ok: false, error: e.message, stack: e.stack }),
        { status: 500, headers }
      );
    }
  }

  try {
    const store = getStore('momentvm');
    const key = url.searchParams.get('key');
    const all = url.searchParams.get('all') === 'true';

    if (req.method === 'GET') {
      if (all) {
        const { blobs } = await store.list({ prefix: 'mvm-release-' });
        const releases = await Promise.all(
          blobs.map(async (b) => {
            const v = await store.get(b.key);
            return v ? JSON.parse(v) : null;
          })
        );
        const idx = await store.get('mvm-index');
        return new Response(
          JSON.stringify({
            index: idx ? JSON.parse(idx) : [],
            releases: releases.filter(Boolean)
          }),
          { headers }
        );
      }
      if (!key) {
        return new Response(JSON.stringify({ error: 'key required' }), { status: 400, headers });
      }
      const value = await store.get(key);
      return new Response(JSON.stringify({ value }), { headers });
    }

    if (req.method === 'POST') {
      const { key: k, value } = await req.json();
      if (!k) {
        return new Response(JSON.stringify({ error: 'key required' }), { status: 400, headers });
      }
      await store.set(k, value);
      return new Response(JSON.stringify({ ok: true }), { headers });
    }

    if (req.method === 'DELETE') {
      if (!key) {
        return new Response(JSON.stringify({ error: 'key required' }), { status: 400, headers });
      }
      await store.delete(key);
      return new Response(JSON.stringify({ ok: true }), { headers });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
};

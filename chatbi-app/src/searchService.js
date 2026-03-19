const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;

export async function searchWeb(query) {
  if (!SERPAPI_KEY) {
    console.warn('SerpAPI key not configured. Set VITE_SERPAPI_KEY in .env');
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    api_key: SERPAPI_KEY,
    engine: 'google',
    hl: 'zh-cn',
    gl: 'cn',
    num: '5',
  });

  const url = import.meta.env.DEV
    ? `/api/serpapi/search.json?${params}`
    : `https://serpapi.com/search.json?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`SerpAPI request failed: ${res.status}`);
    const data = await res.json();

    const results = (data.organic_results || []).slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || '',
    }));

    return results;
  } catch (err) {
    console.error('Web search failed:', err);
    return [];
  }
}

const PodcastService = {
  async getFeatured() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
    const url = `${base}/api/podcast/featured`;
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error('Podcast fetch failed');
    return await res.json();
  },
  async getHomepage() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
    const url = `${base}/api/podcast/homepage`;
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error('Podcast fetch failed');
    return await res.json();
  },
  async getFeaturedForDashboard() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
    const url = `${base}/api/podcast/featured-one`;
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error('Podcast fetch failed');
    return await res.json();
  }
};

window.PodcastService = PodcastService;

window.MentorService = {
  async getAll() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
    const url = `${base}/api/mentors`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Mentors fetch failed');
    const data = await res.json().catch(() => ([]));
    // Support various shapes: array or { mentors: [...] }
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.mentors)) return data.mentors;
    if (Array.isArray(data.items)) return data.items;
    return [];
  }
};
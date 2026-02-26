const MasterService = {
  async getAll() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const url = `${base}/api/masters`;
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error('Masters fetch failed');
    return await res.json();
  }
};

window.MasterService = MasterService;

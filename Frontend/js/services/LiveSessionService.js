window.LiveSessionService = {
  async getDashboardSessions() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
    const url = `${base}/api/livesessions/dashboard`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('LiveSessions fetch failed');
    return await res.json();
  }
};

/**
 * AUTENTICACIÓN REAL (MINIMAL)
 * - Confía solo en JWT + /auth/me
 * - No crea usuarios ni decide roles en frontend
 */
const AuthManager = {
  _bootstrapPromise: null,
  _userCached: null,
  async bootstrap() {
    try {
      const token = localStorage.getItem('mwi:token');
      if (!token) {
        localStorage.removeItem('mwi:user');
        this._userCached = null;
        return null;
      }
      // Always refresh user from backend to ensure signals status is up to date
      // (cached user may be stale after subscription changes)
      try {
        const existing = localStorage.getItem('mwi:user');
        if (existing) {
          const parsed = JSON.parse(existing);
          this._userCached = parsed;
        }
      } catch {}

      // Debounce concurrent bootstrap calls
      if (this._bootstrapPromise) {
        return this._bootstrapPromise;
      }
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      this._bootstrapPromise = fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(async (res) => {
          if (!res.ok) {
            localStorage.removeItem('mwi:token');
            localStorage.removeItem('mwi:user');
            this._userCached = null;
            return null;
          }
          const data = await res.json().catch(() => ({}));
          if (data && data.user) {
            try {
              if (data.user && typeof data.user.role !== 'undefined' && data.user.role !== null) {
                data.user.role = String(data.user.role).toLowerCase();
              }
            } catch {}
            localStorage.setItem('mwi:user', JSON.stringify(data.user));
            this._userCached = data.user;
            return data.user;
          }
          return null;
        })
        .finally(() => {
          // Clear promise so future explicit calls can refetch if needed
          this._bootstrapPromise = null;
        });

      return await this._bootstrapPromise;
    } catch {
      return null;
    }
  },
  getUser() {
    try {
      if (this._userCached) return this._userCached;
      const raw = localStorage.getItem('mwi:user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },
  getCurrentUser() { return this.getUser(); },
  isAuthenticated() {
    try { return !!localStorage.getItem('mwi:token'); } catch { return false; }
  },
  isAdmin() {
    try {
      const role = this.getUser()?.role;
      return !!role && String(role).toLowerCase() === 'admin';
    } catch { return false; }
  },
  getDefaultRoute() {
    const user = this.getUser();
    if (!user) return '/';
    try {
      const role = user.role ? String(user.role).toLowerCase() : '';
      if (role === 'admin') return '/admin';
    } catch {}
    if (user.isPaid === true) return '/dashboard';
    return '/dashboard';
  },
  logout() {
    try { localStorage.removeItem('mwi:user'); } catch {}
    try { localStorage.removeItem('mwi:token'); } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthManager;
}
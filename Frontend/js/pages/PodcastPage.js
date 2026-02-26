/**
 * PÁGINA: MW PODCAST
 * Diseño: Header con botón para desplegar sidebar, hero con título/descripcion/botón,
 * fondo del hero usando la portada del episodio seleccionado y grid de capítulos debajo.
 */

const PodcastPage = {
  render() {
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    return `
      <div class="podcast-page">
        ${Header.render(false, true, true, true)}
        <style>
          .podcast-page .mwi-header { padding: 8px 0; height: 58px; }
          .podcast-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .podcast-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .podcast-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .podcast-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }

          /* Perfil en header: mover al borde derecho y aumentar tamaño */
          .podcast-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
          .podcast-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
          .podcast-page .mwi-header .mwi-header-actions .profile-menu { right:0; }

          .podcast-page main { color:#efe6d6; }
          .podcast-hero { position:relative; min-height: 360px; padding: 24px; border-radius: 10px; border:1px solid rgba(212,169,85,.12);
            background-size: cover; background-position: center; background-repeat: no-repeat;
            display:none; flex-direction:column; justify-content:flex-end; align-items:flex-start; }
          .podcast-hero .title { font-size: 42px; line-height:1.1; margin: 6px 0; color:#f6e9c9; font-weight: 800; }
          .podcast-hero .desc { max-width: 860px; color:#cdbb9a; font-size: 18px; }
          .podcast-hero .guest { margin-top:6px; color:#cdbb9a; font-size: 15px; font-weight:700; }
          .podcast-hero .actions { margin-top: 18px; display:flex; gap:10px; align-items:center; }
          .podcast-hero .btn-continue { appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }

          .episodes-section { margin-top: 18px; }
          .episodes-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
          .episodes-header .label { font-size: 22px; font-weight:800; color:#f6e9c9; }
          .episode-grid { display:grid; grid-template-columns: repeat(5, 1fr); gap:14px; }
          @media (max-width: 1280px) { .episode-grid { grid-template-columns: repeat(4, 1fr); } }
          @media (max-width: 1024px) { .episode-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 768px) { .episode-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 520px) { .episode-grid { grid-template-columns: 1fr; } }
          .episode-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .episode-thumb { height:120px; border-radius:8px; background:#1d1a19; background-size:cover; background-position:center; border:1px solid rgba(212,169,85,.18); }
          .episode-title { color:#efe6d6; font-weight:800; margin-top:10px; line-height:1.3; }
          .episode-progress { position:relative; height:8px; border-radius:10px; background:linear-gradient(90deg, rgba(80,74,70,.8), rgba(209,161,86,.35), rgba(209,161,86,.85)); margin-top:6px; }
          .episode-progress .fill { position:absolute; left:0; top:0; bottom:0; width:0%; border-radius:10px; background:linear-gradient(90deg,#D1A156,#b8862f); box-shadow:0 0 6px rgba(209,161,86,.35); }
          .episode-meta { display:flex; justify-content:space-between; align-items:center; color:#cdbb9a; font-size:12px; margin-top:6px; }
          .episode-desc { color:#cdbb9a; font-size:13px; margin-top:6px; line-height:1.35; }
          .episode-view-btn { appearance:none; border:1px solid rgba(212,169,85,.25); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:6px; padding:6px 10px; font-size:12px; cursor:pointer; display:block; margin:10px auto 0; }
          .episode-view-btn:hover { background:rgba(26,24,22,.8); }

          /* Off-canvas sidebar inspirado en dashboard */
          .podcast-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .podcast-sidebar.open { display:block; }
          .podcast-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .podcast-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); display:flex; flex-direction:column; }
          .podcast-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .podcast-sidebar .nav-item:hover { color:#f6e9c9; }
          .podcast-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
          .podcast-sidebar .nav-bottom { margin-top:auto; border-top:1px solid rgba(212,169,85,.12); padding-top:8px; }

          /* Mobile: center logo in header */
          @media (max-width: 640px) {
            .podcast-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .podcast-page .mwi-header .mwi-logo { justify-self: center; }
          }
        </style>

        

        <main style="padding: 48px 20px 20px;">
          <section class="podcast-hero" aria-live="polite"></section>

          <div class="episodes-section">
            <div class="episodes-header">
              <div class="label">Todos los capítulos</div>
              <div style="color:#cdbb9a;"><span id="podcast-count">0</span> capítulos — <span id="podcast-progress-text">0%</span></div>
            </div>
            <div class="episode-grid" id="podcast-episode-grid"></div>
          </div>
        </main>

        <!-- Sidebar overlay -->
        <div id="podcast-sidebar" class="podcast-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-items">
              <div class="nav-item" id="nav-go-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
              <div class="nav-item" id="nav-go-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
              <div class="nav-item" id="nav-go-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0  0 1 2-2h6a2 2 0  0 1 2 2v2"/></svg></span><span>Servicios</span></div>
              <div class="nav-item" id="nav-go-podcast"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 0 1 7 7v5"/><path d="M5 17v-5a7 7 0 0 1 7-7"/><circle cx="12" cy="12" r="3"/></svg></span><span>Podcast</span></div>
              ${isPaidUser ? `<div class="nav-item" id="nav-go-partner"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span>MWI Partner Center</span></div>` : ''}
              ${isPaidUser ? `<div class="nav-item" id="nav-go-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
            </div>
            <div class="nav-bottom">
              <div class="nav-item" id="nav-go-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
              <div class="nav-item" id="nav-go-logout"><span class="icon"><svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg></span><span>Cerrar sesión</span></div>
            </div>
          </aside>
        </div>
      </div>
    `;
  },

  init() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
    const sidebar = document.getElementById('podcast-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle');
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('nav-go-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('nav-go-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('nav-go-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('nav-go-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
    document.getElementById('nav-go-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });
    document.getElementById('nav-go-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('nav-go-logout')?.addEventListener('click', () => {
      try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
      try { localStorage.removeItem('mwi:token'); } catch {}
      unlock();
      try { Router.navigate('/'); } catch { try { window.location.hash = '#/'; } catch {} }
    });
    document.getElementById('nav-go-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });

    // Cargar episodios reales desde MongoDB y pintar HERO + cards
    (async function loadPodcastFromMongo() {
      try {
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const [episodesRes, featuredRes] = await Promise.all([
          fetch(`${base}/api/podcast`),
          fetch(`${base}/api/podcast/featured-one`)
        ]);

        const episodes = await episodesRes.json();
        const hero = await featuredRes.json();

        // Render hero
        (function renderHero(ep) {
          if (!ep) return;
          const heroEl = document.querySelector('.podcast-hero');
          if (!heroEl) return;
          const bg = ep.thumbnail || (window.Utils && Utils.getPlaceholderImage ? Utils.getPlaceholderImage(1000, 420, 'MW Podcast') : '');
          try { heroEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('${bg}')`; } catch {}
          heroEl.innerHTML = `
            <div class="title">${(window.Utils && Utils.escapeHtml) ? Utils.escapeHtml(ep.title || 'MW Podcast') : (ep.title || 'MW Podcast')}</div>
            <p class="desc">${(window.Utils && Utils.truncateText) ? Utils.truncateText(ep.description || '', 240) : (ep.description || '')}</p>
            ${ep.guest ? `<div class="guest">${(window.Utils && Utils.escapeHtml) ? Utils.escapeHtml(ep.guest) : ep.guest}</div>` : ''}
            <div class="actions">
              <button class="btn-continue">Continuar viendo</button>
            </div>
          `;
          heroEl.style.display = 'flex';
          try {
            heroEl.querySelector('.btn-continue')?.addEventListener('click', () => {
              try { Router.navigate(`/podcast-player/${ep.slug}`); } catch (e) {}
            });
          } catch {}
        })(hero);

        // Render episodes
        (function renderEpisodes(list) {
          const grid = document.getElementById('podcast-episode-grid');
          const countEl = document.getElementById('podcast-count');
          if (countEl) countEl.textContent = String(Array.isArray(list) ? list.length : 0);
          if (!grid) return;
          const out = (list || []).map(ep => {
            const thumb = ep.thumbnail || (window.Utils && Utils.getPlaceholderImage ? Utils.getPlaceholderImage(300, 180, 'MW') : '');
            const safe = (v) => (window.Utils && Utils.escapeHtml) ? Utils.escapeHtml(v || '') : (v || '');
            const desc = (window.Utils && Utils.truncateText) ? Utils.truncateText(ep.description || '', 160) : (ep.description || '');
            return `
              <div class="episode-card" data-slug="${safe(ep.slug || '')}">
                <div class="episode-thumb" style="background-image:url('${thumb}')"></div>
                <div class="episode-title">${safe(ep.title)}</div>
                ${ep.guest ? `<div style=\"color:#cdbb9a; font-size:13px; margin-top:4px;\">${safe(ep.guest)}</div>` : ''}
                <div class="episode-desc">${safe(desc)}</div>
                <div class="episode-meta"><span>${safe(ep.duration || '')}</span></div>
                <button class="episode-view-btn">Ver capítulo</button>
              </div>`;
          }).join('');
          grid.innerHTML = out;
          try {
            grid.querySelectorAll('.episode-card').forEach(card => {
              card.addEventListener('click', (ev) => {
                // Prevent duplicate navigation if clicking the button inside
                ev.stopPropagation();
                const slug = card.getAttribute('data-slug');
                if (slug) Router.navigate(`/podcast-player/${slug}`);
              });
              card.querySelector('.episode-view-btn')?.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const slug = card.getAttribute('data-slug');
                if (slug) Router.navigate(`/podcast-player/${slug}`);
              });
            });
          } catch {}
        })(episodes);
      } catch (e) {
        console.error('[PodcastPage] Load from Mongo failed', e);
      }
    })();

    // Live sync: refresh when admin updates podcast episodes
    try {
      const reloadIfActive = () => {
        try {
          const h = window.location.hash || '';
          if (h.startsWith('#/podcast')) { try { Router.reload(); } catch (e) { try { window.location.reload(); } catch {} } }
        } catch {}
      };
      window.addEventListener('mwi:podcast:updated', reloadIfActive);
      window.addEventListener('storage', (ev) => {
        try {
          if (ev && ev.key === 'mwi:evt' && ev.newValue) {
            const data = JSON.parse(ev.newValue);
            if (data && data.t === 'podcast-updated') reloadIfActive();
          }
        } catch {}
      });
    } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PodcastPage;
}

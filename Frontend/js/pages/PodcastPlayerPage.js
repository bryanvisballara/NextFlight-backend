/**
 * PÁGINA: REPRODUCTOR DE PODCAST
 * Layout: Izquierda 65% con título pequeño del episodio, título grande y reproductor;
 * Derecha 35% con lista de episodios (playlist) clicables.
 */

const PodcastPlayerPage = {
  render(slug) {
    if (!window.__PODCAST_CACHE__ || window.__PODCAST_CACHE__.slug !== slug) {
      setTimeout(async () => {
        try {
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
          const res = await fetch(`${base}/api/podcast`);
          const list = await res.json();
          const current = Array.isArray(list) ? (list.find(e => (e.slug || '') === slug) || list[0]) : null;
          window.__PODCAST_CACHE__ = { list: Array.isArray(list) ? list : [], current: current || null, slug };
          Router.reload();
        } catch (e) {
          console.error('[PodcastPlayerPage] fetch list failed', e);
        }
      }, 0);

      return `<div class="podcast-player-page">${Header.render(false, true, true, true)}</div>`;
    }

    const { list: episodes, current } = window.__PODCAST_CACHE__;
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    const safeCurrent = current || {
      slug: 'podcast-000',
      title: 'MW Podcast',
      description: 'Conversaciones sobre finanzas, inversiones y mentalidad.',
      duration: '0:00',
      thumbnail: null,
      audioUrl: null,
      youtubeId: null,
      category: 'Podcast',
      vimeoId: null,
      guest: null
    };
    const cover = safeCurrent.thumbnail || Utils.getPlaceholderImage(1000, 420, 'MW Podcast');
    const hasAudio = !!safeCurrent.audioUrl;
    const hasYoutube = !!safeCurrent.youtubeId;
    const hasVimeo = !!safeCurrent.vimeoId;

    return `
      <div class="podcast-player-page" data-current-slug="${safeCurrent.slug}">
        ${Header.render(false, true, true, true)}
        <style>
          .podcast-player-page .mwi-header { padding: 10px 0; height: 88px; }
          .podcast-player-page .mwi-header .mwi-header-inner { height: 88px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .podcast-player-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .podcast-player-page .menu-toggle { position:absolute; left:10px; top:50%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .podcast-player-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }
          /* Mobile: center logo in header */
          @media (max-width: 640px) {
            .podcast-player-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .podcast-player-page .mwi-header .mwi-logo { justify-self: center; }
            /* Keep profile icon top-right on mobile */
            .podcast-player-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:10px; transform:none; z-index:3; }
            .podcast-player-page .mwi-header .mwi-header-actions .profile-menu { right:0; }
          }

          .podcast-player-page main { color:#efe6d6; padding: 20px; }
          .pp-layout { display:grid; grid-template-columns: 65% 35%; gap:16px; }
          @media (max-width: 900px) { .pp-layout { grid-template-columns: 1fr; } }

          .pp-left { background: rgba(20,18,18,0.6); border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .pp-label { color:#cdbb9a; font-size:14px; font-weight:700; }
          .pp-title { color:#f6e9c9; font-size:24px; font-weight:800; margin:6px 0 10px; line-height:1.2; }
          .pp-player { position:relative; aspect-ratio: 16/9; background-color:#1d1a19; border:1px solid rgba(212,169,85,.18); border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
          .pp-player iframe { width:100%; height:100%; display:block; }
          .pp-cover { position:absolute; inset:0; background-image: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('${cover}'); background-size:cover; background-position:center; background-repeat:no-repeat; }
          .pp-audio { position:relative; z-index:2; width:96%; }
          .pp-meta { color:#cdbb9a; margin-top:8px; font-size:13px; }
            .pp-guest { color:#cdbb9a; margin-top:4px; font-size:13px; font-weight:700; }
            .pp-desc { color:#cdbb9a; margin-top:10px; font-size:14px; }

          .pp-right { background: rgba(20,18,18,0.6); border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .pp-list { display:flex; flex-direction:column; gap:8px; max-height:70vh; overflow:auto; }
          .pp-item { background:#0f0d0c; border:1px solid rgba(212,169,85,.18); border-radius:8px; padding:10px; cursor:pointer; display:grid; grid-template-columns: auto 1fr auto; gap:10px; align-items:center; }
          .pp-item .thumb { width:60px; height:40px; border-radius:6px; background:#1d1a19; background-size:cover; background-position:center; border:1px solid rgba(212,169,85,.18); }
          .pp-item .title { color:#efe6d6; font-weight:700; font-size:14px; }
          .pp-item .dur { color:#cdbb9a; font-size:12px; }
          .pp-item.active { border-color:#d4a955; }

          .pp-actions { display:flex; gap:8px; align-items:center; margin-top:12px; }
          .btn-back { appearance:none; border:none; padding:8px 12px; border-radius:6px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
        </style>

        <main style="background-color:#0f0f0f; background-image:linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url('assets/images/fondodashboard.png'); background-size:cover; background-position:center; background-repeat:no-repeat;">
          <div class="pp-layout">
            <section class="pp-left">
              <div class="pp-label">Episodio</div>
              <div id="pp-title" class="pp-title">${safeCurrent.title}</div>
              <div class="pp-player">
                ${hasVimeo ? `<iframe src="https://player.vimeo.com/video/${safeCurrent.vimeoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="no-referrer" allowfullscreen></iframe>` : ''}
                ${(!hasVimeo && hasYoutube) ? `<iframe src="https://www.youtube.com/embed/${safeCurrent.youtubeId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` : ''}
                ${(!hasVimeo && !hasYoutube && hasAudio) ? `<audio class="pp-audio" id="pp-audio" controls src="${safeCurrent.audioUrl}"></audio>` : ''}
                ${(!hasVimeo && !hasYoutube && !hasAudio) ? `<div class="pp-cover"></div>` : ''}
              </div>
              <div class="pp-meta">${safeCurrent.duration || ''} · ${safeCurrent.category || 'Podcast'}</div>
                ${safeCurrent.guest ? `<div id="pp-guest" class="pp-guest">${Utils.escapeHtml(safeCurrent.guest)}</div>` : `<div id="pp-guest" class="pp-guest" style="display:none"></div>`}
                <div id="pp-desc" class="pp-desc">${safeCurrent.description || ''}</div>
              <div class="pp-actions"><button id="pp-back" class="btn-back">Volver al Podcast</button></div>
            </section>
            <aside class="pp-right">
              <div class="pp-list">
                ${episodes.map(ep => {
                  const thumb = ep.thumbnail || Utils.getPlaceholderImage(300, 180, 'MW');
                  const active = (ep.slug || '') === (safeCurrent.slug || '') ? 'active' : '';
                  return `<div class="pp-item ${active}" data-slug="${ep.slug || ''}" data-audio="${ep.audioUrl || ''}" data-youtube="${ep.youtubeId || ''}" data-vimeo="${ep.vimeoId || ''}" data-title="${Utils.escapeHtml(ep.title)}" data-thumb="${thumb}">
                    <div class="thumb" style="background-image:url('${thumb}')"></div>
                    <div class="title">${ep.title}</div>
                    <div class="dur">${ep.duration || ''}</div>
                  </div>`;
                }).join('')}
              </div>
            </aside>
          </div>
        </main>
        <!-- Sidebar overlay for podcast player -->
        <style>
          .podcast-player-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .podcast-player-sidebar.open { display:block; }
          .podcast-player-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .podcast-player-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); }
          .podcast-player-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .podcast-player-sidebar .nav-item:hover { color:#f6e9c9; }
          .podcast-player-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
        </style>
        <div id="podcast-player-sidebar" class="podcast-player-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-item" id="pp-nav-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
            <div class="nav-item" id="pp-nav-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
            <div class="nav-item" id="pp-nav-podcast"><span class="icon"><svg viewBox="0 0 24 24"><rect x="9" y="4" width="6" height="10" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 20v-4"/></svg></span><span>Podcast</span></div>
            <div class="nav-item" id="pp-nav-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
            ${isPaidUser ? `<div class="nav-item" id="pp-nav-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
            <div class="nav-item" id="pp-nav-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
          </aside>
        </div>
      </div>
    `;
  },

  init() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
    // Sidebar toggle
    const sidebar = document.getElementById('podcast-player-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle');
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('pp-nav-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('pp-nav-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('pp-nav-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('pp-nav-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('pp-nav-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
    document.getElementById('pp-nav-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });
    const backBtn = document.getElementById('pp-back');
    backBtn && backBtn.addEventListener('click', () => Router.navigate('/podcast'));

    const titleEl = document.getElementById('pp-title');
    const audioEl = document.getElementById('pp-audio');
    const guestEl = document.getElementById('pp-guest');
    const descEl = document.getElementById('pp-desc');
    const page = document.querySelector('.podcast-player-page');
    const defaultSlug = page?.getAttribute('data-current-slug') || null;

    try {
      document.querySelectorAll('.pp-item').forEach(item => {
        item.addEventListener('click', () => {
          const slug = item.getAttribute('data-slug');
          const audio = item.getAttribute('data-audio');
          const yt = item.getAttribute('data-youtube');
          const vimeo = item.getAttribute('data-vimeo');
          const title = item.getAttribute('data-title');
          const thumb = item.getAttribute('data-thumb');
          // Update active state
          document.querySelectorAll('.pp-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          // Update title
          if (titleEl) titleEl.textContent = title || '';
          // Update guest and description by looking up episode in cache
          try {
            const cache = window.__PODCAST_CACHE__ || {};
            const eps = Array.isArray(cache.list) ? cache.list : [];
            const ep = eps.find(e => (e.slug || '') === (slug || '')) || null;
            if (ep) {
              if (guestEl) {
                if (ep.guest) { guestEl.style.display = ''; guestEl.textContent = ep.guest; }
                else { guestEl.style.display = 'none'; guestEl.textContent = ''; }
              }
              if (descEl) { descEl.textContent = ep.description || ''; }
              try { page?.setAttribute('data-current-slug', ep.slug || ''); } catch {}
            }
          } catch (e) {}
          // Update player
          const player = document.querySelector('.pp-player');
          if (!player) return;
          player.innerHTML = '';
          const hasVim = !!vimeo;
          const hasYt = !!yt;
          const hasAu = !!audio;
          if (hasVim) {
            player.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeo}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="no-referrer" allowfullscreen></iframe>`;
          } else if (hasYt) {
            player.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          } else if (hasAu) {
            player.innerHTML = `<audio class="pp-audio" controls src="${audio}"></audio>`;
          } else {
            player.innerHTML = `<div class="pp-cover" style="background-image: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('${thumb}')"></div>`;
          }
        });
      });
    } catch (e) { /* ignore */ }

    // Live sync: if admin updates episodes, reload to refresh playlist/player
    try {
      const reloadIfActive = () => {
        try {
          const h = window.location.hash || '';
          if (h.startsWith('#/podcast-player')) { try { Router.reload(); } catch (e) { try { window.location.reload(); } catch {} } }
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
  module.exports = PodcastPlayerPage;
}

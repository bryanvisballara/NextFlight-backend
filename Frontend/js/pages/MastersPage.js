/**
 * PÁGINA: MASTERS (similar a Podcast)
 * Diseño: Header con botón para desplegar sidebar, hero con título/descripcion/botón,
 * fondo del hero usando la portada del master destacado y grid de masters debajo.
 */

const MastersPage = {
  render() {
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    // Datos reales se hidratan desde Mongo en init(); no renderizamos placeholder para evitar FOUC

    return `
      <div class="masters-page">
        ${Header.render(false, true, true, true)}
        <style>
          .masters-page .mwi-header { padding: 8px 0; height: 58px; }
          .masters-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .masters-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .masters-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .masters-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }

          /* Perfil en header: mover al borde derecho y aumentar tamaño */
          .masters-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
          .masters-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
          .masters-page .mwi-header .mwi-header-actions .profile-menu { right:0; }

          .masters-page main { color:#efe6d6; }
          .masters-hero { position:relative; min-height: 360px; padding: 24px; border-radius: 10px; border:1px solid rgba(212,169,85,.12);
            background: transparent; display:flex; flex-direction:column; justify-content:flex-end; align-items:flex-start; }
          .masters-hero .title { font-size: 42px; line-height:1.1; margin: 6px 0; color:#f6e9c9; font-weight: 800; }
          .masters-hero .desc { max-width: 860px; color:#cdbb9a; font-size: 18px; }
          .masters-hero .actions { margin-top: 18px; display:flex; gap:10px; align-items:center; }
          .masters-hero .btn-continue { appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }

          .masters-section { margin-top: 18px; }
          .masters-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
          .masters-header .label { font-size: 22px; font-weight:800; color:#f6e9c9; }
          .masters-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; }
          @media (max-width: 1280px) { .masters-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 1024px) { .masters-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .masters-grid { grid-template-columns: 1fr; } }
          .master-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); cursor:pointer; }
          .master-thumb { height:120px; border-radius:8px; background:#1d1a19; background-size:cover; background-position:center; border:1px solid rgba(212,169,85,.18); }
          .master-title { color:#efe6d6; font-weight:800; margin-top:10px; line-height:1.3; }
          .master-meta { display:flex; justify-content:space-between; align-items:center; color:#cdbb9a; font-size:12px; margin-top:6px; }

          /* Off-canvas sidebar inspirado en dashboard */
          .masters-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .masters-sidebar.open { display:block; }
          .masters-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .masters-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); display:flex; flex-direction:column; }
          .masters-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .masters-sidebar .nav-item:hover { color:#f6e9c9; }
          .masters-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
          .masters-sidebar .nav-bottom { margin-top:auto; border-top:1px solid rgba(212,169,85,.12); padding-top:8px; }

          /* Mobile: place hero video above text and enforce 16:9 */
          @media (max-width: 640px) {
            /* Center logo in header */
            .masters-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .masters-page .mwi-header .mwi-logo { justify-self: center; }
            .masters-hero { min-height: 0; padding: 16px; }
            .masters-hero .title { font-size: 34px; }
            .masters-hero .desc { font-size: 16px; }
            /* The inner grid injected at runtime: switch to column and reorder children */
            .masters-hero > div { display: flex !important; flex-direction: column !important; gap: 12px; }
            .masters-hero > div > :nth-child(2) { order: 0; } /* video container first */
            .masters-hero > div > :nth-child(1) { order: 1; } /* text second */
            /* Video container: auto height with aspect ratio on player node */
            .masters-hero > div > :nth-child(2) { height: auto !important; }
            #hero-vimeo-player { position: relative !important; width: 100% !important; height: 0 !important; padding-bottom: 56.25% !important; }
            #hero-vimeo-player iframe { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; transform: none !important; pointer-events: none !important; }
          }
        </style>

        <main style="padding: 48px 20px 20px; background-color:#0f0f0f; background-image:linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url('assets/images/fondodashboard.png'); background-size:cover; background-position:center; background-repeat:no-repeat;">
          <section class="masters-hero" style="display:none;"></section>

          <div class="masters-section">
            <div class="masters-header">
              <div class="label">Todos los masters</div>
              <div style="color:#cdbb9a;">— masters</div>
            </div>
            <div class="masters-grid"></div>
          </div>
        </main>

        <!-- Sidebar overlay -->
        <div id="masters-sidebar" class="masters-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-items">
              <div class="nav-item" id="nav-go-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
              <div class="nav-item" id="nav-go-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
              <div class="nav-item" id="nav-go-podcast"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 0 1 7 7v5"/><path d="M5 17v-5a7 7 0 0 1 7-7"/><circle cx="12" cy="12" r="3"/></svg></span><span>Podcast</span></div>
              <div class="nav-item" id="nav-go-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0  0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
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
    const sidebar = document.getElementById('masters-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle'); // header toggle id (reutilizado)
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('nav-go-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('nav-go-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('nav-go-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('nav-go-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('nav-go-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
    document.getElementById('nav-go-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
    document.getElementById('nav-go-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });
    document.getElementById('nav-go-logout')?.addEventListener('click', () => {
      try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
      try { localStorage.removeItem('mwi:token'); } catch {}
      unlock();
      try { Router.navigate('/'); } catch { try { window.location.hash = '#/'; } catch {} }
    });

    // Botón hero: se configurará cuando se cargue el master desde Mongo; fallback a lista
    try {
      const btn = document.getElementById('btn-continue-masters');
      btn && btn.addEventListener('click', () => { Router.navigate('/masters'); });
    } catch {}
    // Cargar hero desde Mongo: destacado si existe, si no último actualizado/creado
    async function loadHeroMasterFromMongo() {
      try {
        const heroEl  = document.querySelector('.masters-hero');
        const titleEl = document.getElementById('masters-hero-title');
        const descEl  = document.getElementById('masters-hero-desc');
        const btn     = document.getElementById('btn-continue-masters');
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';

        // 1) Intentar obtener destacado
        let featured = null;
        try {
          const fr = await fetch(`${base}/api/masters/featured`);
          if (fr.ok) featured = await fr.json();
        } catch {}
        if (featured && featured.slug) {
            // Construir layout: texto a la izquierda, video a la derecha
            if (heroEl) {
              const vimeoRaw = String(featured.featuredVideoUrl || '');
              const match = vimeoRaw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
              const vimeoId = match && match[1] ? match[1] : null;

              heroEl.style.backgroundImage = 'none';
              heroEl.innerHTML = `
                <div style="
                  display:grid;
                  grid-template-columns: 1fr 1fr;
                  width:100%;
                  height:100%;
                  min-height:360px;
                  align-items:stretch;
                  flex:1;
                ">
                  <!-- IZQUIERDA: TEXTO -->
                  <div style="
                    z-index:2;
                    display:flex;
                    flex-direction:column;
                    justify-content:flex-end;
                  ">
                    <div class="title" id="masters-hero-title"></div>
                    <p class="desc" id="masters-hero-desc"></p>
                    <div class="actions">
                      <button id="btn-continue-masters" class="btn-continue">Explorar master</button>
                    </div>
                  </div>

                  <!-- DERECHA: VIDEO -->
                  <div style="
                    position:relative;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                    border-radius:12px;
                    background:#000;
                  ">
                    <!-- Vimeo player area fills container; scaling applied to iframe via JS -->
                    <div id="hero-vimeo-player" style="position:absolute;inset:0;width:100%;height:100%;"></div>
                    <!-- Overlay oscuro -->
                    <div style="position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:2;"></div>
                  </div>
                </div>
              `;

              // Show hero and set title/desc (re-query after innerHTML replacement)
              heroEl.style.display = 'block';
              const titleNode = document.getElementById('masters-hero-title');
              const descNode  = document.getElementById('masters-hero-desc');
              if (titleNode) titleNode.textContent = featured.title || '';
              if (descNode)  descNode.textContent  = (featured.featuredDescription || featured.description || '');

              // Button navigation
              const btnLocal = document.getElementById('btn-continue-masters');
              if (btnLocal && featured.slug) {
                btnLocal.onclick = () => { Router.navigate(`/master-player/${featured.slug}`); };
              }

              // Ensure Vimeo API is loaded
              async function ensureVimeoApi() {
                if (window.Vimeo && window.Vimeo.Player) return true;
                return await new Promise((resolve) => {
                  const s = document.createElement('script');
                  s.src = 'https://player.vimeo.com/api/player.js';
                  s.onload = () => resolve(true);
                  s.onerror = () => resolve(false);
                  document.head.appendChild(s);
                });
              }

              if (vimeoId) {
                try {
                  const ok = await ensureVimeoApi();
                  if (ok && window.Vimeo) {
                    const player = new window.Vimeo.Player('hero-vimeo-player', {
                      id: vimeoId,
                      autoplay: true,
                      muted: false,
                      controls: false,
                      playsinline: true
                    });

                    // Force iframe to behave like background-cover within right column
                    const fitIframe = () => {
                      try {
                        const iframe = document.querySelector('#hero-vimeo-player iframe');
                        if (iframe) {
                          iframe.style.position = 'absolute';
                          iframe.style.top = '50%';
                          iframe.style.left = '50%';
                          iframe.style.width = '140%';
                          iframe.style.height = '110%';
                          iframe.style.transform = 'translate(-50%, -50%)';
                          iframe.style.pointerEvents = 'none';
                          iframe.style.zIndex = '1';
                        }
                      } catch {}
                    };
                    player.on('loaded', fitIframe);
                    setTimeout(fitIframe, 400);

                    // Stop at 30s, no loop
                    player.on('timeupdate', (data) => {
                      try { if (data && data.seconds >= 30) player.pause(); } catch {}
                    });

                    // Handle autoplay with audio restrictions
                    try {
                      await player.play();
                    } catch (e) {
                      try { await player.setMuted(true); await player.play(); } catch {}
                    }
                  }
                } catch {}
              }
            }
            return; // No fallback necesario si hay destacado
          }

        // 2) Fallback: último actualizado/creado
        if (!window.MasterService || typeof window.MasterService.getAll !== 'function') return;
        const masters = await window.MasterService.getAll();
        try {
          const arr = Array.isArray(masters) ? masters : [];
          window.__MASTERS_CACHE__ = arr;
        } catch {}
        if (!Array.isArray(masters) || masters.length === 0) return;
        const activeMasters = masters.filter(m => m && m.isActive !== false && m.active !== false);
        if (!activeMasters.length) return;
        const hero = activeMasters.sort((a, b) => {
          const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return db - da;
        })[0];
        if (heroEl) {
          heroEl.innerHTML = `
            <div class="title" id="masters-hero-title"></div>
            <p class="desc" id="masters-hero-desc"></p>
            <div class="actions"><button id="btn-continue-masters" class="btn-continue">Explorar módulos</button></div>
          `;
          const t = heroEl.querySelector('#masters-hero-title');
          const d = heroEl.querySelector('#masters-hero-desc');
          if (t) t.textContent = hero.title || '';
          if (d) d.textContent = hero.description || '';
        }
        if (heroEl && (hero.thumbnail || hero.cover)) {
          const url = hero.thumbnail || hero.cover;
          try {
            heroEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('${url}')`;
            heroEl.style.backgroundSize = 'cover';
            heroEl.style.backgroundPosition = 'center';
            heroEl.style.display = 'block';
          } catch {}
        }
        try { const btn2 = document.getElementById('btn-continue-masters'); if (btn2 && hero.slug) btn2.onclick = () => { Router.navigate(`/master-player/${hero.slug}`); }; } catch {}
      } catch (e) {
        console.error('❌ Error cargando hero master', e);
      }
    }

    // Cargar masters reales desde Mongo y poblar el grid (sin cambiar diseño)
    async function loadMastersFromMongo() {
      try {
        if (!window.MasterService || typeof window.MasterService.getAll !== 'function') return;
        const masters = await window.MasterService.getAll();
        try {
          const arr = Array.isArray(masters) ? masters : [];
          window.__MASTERS_CACHE__ = arr;
        } catch {}
        if (!Array.isArray(masters)) return;
        const activeMasters = masters
          .filter(m => m && m.isActive !== false && m.active !== false)
          .sort((a, b) => (a?.order || 0) - (b?.order || 0));
        const grid = document.querySelector('.masters-grid');
        if (!grid) return;
        grid.innerHTML = activeMasters.map(m => {
          const thumb = m.thumbnail || (typeof Utils !== 'undefined' && Utils.getPlaceholderImage ? Utils.getPlaceholderImage(300, 180, m.shortTitle || 'MWI') : '');
          let modulesCount = (typeof m.modulesCount === 'number') ? m.modulesCount : 0;
          if (modulesCount === 0) {
            if (Array.isArray(m.items)) modulesCount = m.items.length;
            else if (Array.isArray(m.modules)) modulesCount = m.modules.length;
            else if (Array.isArray(m.sections)) modulesCount = m.sections.length;
          }
          const slug = m.slug || m.id || '';
          const title = m.title || m.shortTitle || slug || '';
          return `
            <div class="master-card" data-id="${slug}">
              <div class="master-thumb" style="background-image:url('${thumb}')"></div>
              <div class="master-title">${title}</div>
              <div class="master-meta">
                <span>Programa oficial</span>
                <span>${modulesCount} módulos</span>
              </div>
            </div>
          `;
        }).join('');
        // Actualizar contador en el header (manteniendo diseño)
        try {
          const header = document.querySelector('.masters-header');
          const countEl = header ? header.querySelector(':scope > div:last-child') : null;
          if (countEl) countEl.textContent = `${activeMasters.length} masters`;
        } catch {}
        // Re-atachar navegación de cards
        document.querySelectorAll('.master-card').forEach(card => {
          const slug = card.getAttribute('data-id');
          card.addEventListener('click', () => {
            if (!slug) return;
            Router.navigate(`/master-player/${slug}`);
          });
        });
      } catch (e) {
        console.error('❌ Error cargando masters desde Mongo', e);
      }
    }

    // Card navigation: abrir reproductor del master (layout con video + playlist)
    try {
      document.querySelectorAll('.master-card').forEach(card => {
        const id = card.getAttribute('data-id');
        card.addEventListener('click', () => {
          if (!id) return;
          Router.navigate(`/master-player/${id}`);
        });
      });
    } catch (e) {}

    // Ejecutar carga: primero hero, luego grid (orden importa)
    try { setTimeout(() => { try { loadHeroMasterFromMongo(); loadMastersFromMongo(); } catch {} }, 0); } catch {}

    // Live sync with admin edits: listen to custom or storage events
    try {
      const rerender = () => { try { Router.reload(); } catch (e) { try { window.location.reload(); } catch {} } };
      window.addEventListener('mwi:masters:updated', rerender);
      window.addEventListener('storage', (ev) => {
        try {
          if (ev && ev.key === 'mwi:evt' && ev.newValue) {
            const data = JSON.parse(ev.newValue);
            if (data && data.t === 'masters-updated') rerender();
          }
        } catch {}
      });
    } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MastersPage;
}

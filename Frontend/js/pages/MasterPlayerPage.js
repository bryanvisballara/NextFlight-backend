/**
 * PÁGINA: REPRODUCTOR DE MASTER
 * Layout: Izquierda 65% con título pequeño de módulo, título grande del video y reproductor;
 * Derecha 35% con lista de videos (siguiente contenido en orden).
 */

const MasterPlayerPage = {
  render(slug) {
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    // Carga asíncrona: cache por slug, aislado del listado de masters
    window.__MASTER_CACHE_MAP__ = window.__MASTER_CACHE_MAP__ || {};
    if (!window.__MASTER_CACHE_MAP__[slug]) {
      setTimeout(async () => {
        try {
          const resp = await fetch(`${base}/api/masters/${slug}`);
          const data = await resp.json();
          window.__MASTER_CACHE_MAP__[slug] = data || null;
          try { Router.reload(); } catch (e) { try { window.location.reload(); } catch (_) {} }
        } catch (e) {
          console.error('Error cargando master:', e);
        }
      }, 0);

      return `
        <div class="master-player-page">
          ${Header.render(false, true, true, true)}
          <main></main>
        </div>
      `;
    }

    const master = (window.__MASTER_CACHE_MAP__ && window.__MASTER_CACHE_MAP__[slug]) || {};
    const items = Array.isArray(master.items) ? master.items : [];
    const groupedModules = items
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(mod => ({
        title: mod.title || '',
        children: (Array.isArray(mod.lessons) ? mod.lessons : [])
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(lesson => {
            let vid = '';
            const v = lesson.videoUrl || lesson.vimeoId || '';
            if (typeof v === 'string') {
              const m = v.match(/(\d{6,})/);
              vid = m ? m[1] : v.replace(/\D/g, '');
            }
            return { title: lesson.title || '', vimeoId: vid };
          })
      }));

    const firstModule = groupedModules[0] || {};
    const firstLesson = (firstModule.children || [])[0] || {};
    const moduleLabel = firstModule.title || '';
    const videoTitle = firstLesson.title || '';
    const vimeoId = firstLesson.vimeoId || '76979871';

    return `
      <div class="master-player-page" data-default-vimeo="${vimeoId}">
        ${Header.render(false, true, true, true)}
        <style>
          .master-player-page .mwi-header { padding: 8px 0; height: 58px; }
          .master-player-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .master-player-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .master-player-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .master-player-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }
          /* Mobile: center logo in header */
          @media (max-width: 640px) {
            .master-player-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .master-player-page .mwi-header .mwi-logo { justify-self: center; }
            /* Keep profile icon top-right on mobile */
            .master-player-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:10px; transform:none; z-index:3; }
            .master-player-page .mwi-header .mwi-header-actions .profile-menu { right:0; }
          }
          .master-player-page main { padding: 48px 20px 20px; color:#efe6d6; }
          .mp-layout { display:grid; grid-template-columns: 65% 35%; gap:20px; }
          .mp-left { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-right { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-back { appearance:none; border:1px solid rgba(212,169,85,.35); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:8px; padding:8px 12px; cursor:pointer; margin-bottom:10px; }
          .mp-back:hover { background:rgba(26,24,22,.8); }
          .mp-module { color:#cdbb9a; font-size:14px; font-weight:600; letter-spacing:.2px; }
          .mp-title { color:#f6e9c9; font-size:28px; font-weight:800; margin:8px 0 12px; }
          .mp-player { position:relative; width:100%; padding-bottom:56.25%; border-radius:10px; overflow:hidden; border:1px solid rgba(212,169,85,.18); background:#0f0d0f; }
          .mp-player iframe { position:absolute; inset:0; width:100%; height:100%; }
          .mp-playlist-title { color:#f6e9c9; font-size:18px; font-weight:800; margin-bottom:10px; }
          .mp-module-item { margin:8px 0; }
          .mp-module-toggle { width:100%; display:flex; align-items:center; gap:10px; padding:10px; border-radius:8px; cursor:pointer; border:1px solid rgba(212,169,85,.14); background:transparent; color:#efe6d6; font-weight:800; text-align:left; }
          .mp-module-toggle:hover { background:#1a1816; }
          .mp-module-toggle .chev { color:#d4a955; font-weight:800; width:18px; display:inline-block; }
          .mp-sublist { margin:6px 0 0 28px; padding-left:0; }
          .mp-subitem { display:flex; align-items:center; gap:10px; padding:8px; border-radius:6px; border:1px solid rgba(212,169,85,.10); cursor:pointer; }
          .mp-subitem + .mp-subitem { margin-top:6px; }
          .mp-subitem .num { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(212,169,85,.10); color:#d4a955; font-weight:800; font-size:12px; }
          .mp-subitem .txt { color:#efe6d6; font-weight:600; font-size:14px; }
          .mp-subitem.active { background:#1a1816; border-color: rgba(212,169,85,.22); }

          /* Mobile: video above text, single column, horizontal format */
          @media (max-width: 640px) {
            .mp-layout { grid-template-columns: 1fr; }
            .mp-left { display: grid; grid-template-areas: "player" "module" "title"; gap: 12px; }
            .mp-player { grid-area: player; padding-bottom: 56.25%; }
            .mp-module { grid-area: module; }
            .mp-title { grid-area: title; }
          }
        </style>

        <main>
          <div class="mp-layout">
            <section class="mp-left">
              <button class="mp-back" type="button" aria-label="Volver a Masters">← Volver a Masters</button>
              <div class="mp-module">${moduleLabel}</div>
              <div class="mp-title">${videoTitle}</div>
              <div class="mp-player">
                <iframe referrerpolicy="no-referrer" src="https://player.vimeo.com/video/${vimeoId || '76979871'}?title=0&byline=0&portrait=0&controls=1&pip=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            </section>
            <aside class="mp-right">
              <div class="mp-playlist-title">Lista de contenidos</div>
              ${groupedModules.map((mod, mIdx) => `
                <div class="mp-module-item" data-mod="${mIdx}">
                  <button class="mp-module-toggle" type="button" aria-expanded="false">
                    <span class="chev">▸</span>
                    <span class="t">${mod.title}</span>
                  </button>
                  ${mod.children && mod.children.length ? `
                    <div class="mp-sublist" hidden>
                      ${mod.children.map((sub, sIdx) => `
                        <div class="mp-subitem" data-title="${typeof sub === 'string' ? sub : (sub && sub.title) || ''}" data-vimeo="${typeof sub === 'object' && sub && sub.vimeoId ? sub.vimeoId : ''}">
                          <div class="num">${sIdx + 1}</div>
                          <div class="txt">${typeof sub === 'string' ? sub : (sub && sub.title) || ''}</div>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </aside>
          </div>
        </main>
        <!-- Sidebar overlay for master player -->
        <style>
          .master-player-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .master-player-sidebar.open { display:block; }
          .master-player-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .master-player-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); }
          .master-player-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .master-player-sidebar .nav-item:hover { color:#f6e9c9; }
          .master-player-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
        </style>
        <div id="master-player-sidebar" class="master-player-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-item" id="mp-nav-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
            <div class="nav-item" id="mp-nav-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
            <div class="nav-item" id="mp-nav-podcast"><span class="icon"><svg viewBox="0 0 24 24"><rect x="9" y="4" width="6" height="10" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 20v-4"/></svg></span><span>Podcast</span></div>
            <div class="nav-item" id="mp-nav-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
            <div class="nav-item" id="mp-nav-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
            ${isPaidUser ? `<div class="nav-item" id="mp-nav-partner"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span>MWI Partner Center</span></div>` : ''}
            ${isPaidUser ? `<div class="nav-item" id="mp-nav-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
          </aside>
        </div>
      </div>
    `;
  },

  init() {
    // Si un admin entra al player público, redirigir al editor admin.
    // Permitir bypass con `?noredirect=1` (o `true`) en el hash o query para ver el player como referencia.
    try {
      const isAdmin = (typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin());
      if (isAdmin) {
        const hash = (window.location && window.location.hash) || '';
        const search = (window.location && window.location.search) || '';
        const getParamFrom = (str) => {
          try {
            const q = str.split('?')[1] || '';
            const params = new URLSearchParams(q);
            return (params.get('noredirect') || '').toLowerCase();
          } catch (e) { return ''; }
        };
        const flagHash = getParamFrom(hash);
        const flagQuery = getParamFrom(search);
        const noRedirect = (flagHash === '1' || flagHash === 'true' || flagQuery === '1' || flagQuery === 'true' || /noredirect=1|noredirect=true/i.test(hash));

        if (!noRedirect) {
          const path = hash.replace('#','');
          const m = path.match(/^\/master-player\/([^/?#]+)/);
          if (m && m[1]) {
            try { Router.navigate(`/admin/masters/${m[1]}`); return; } catch (e) {}
          }
        }
      }
    } catch (e) {}
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
    // Preview gate helpers for non-paid users
    const ensureVimeoApi = (ready) => {
      if (window.Vimeo && window.Vimeo.Player) return ready();
      const s = document.createElement('script');
      s.src = 'https://player.vimeo.com/api/player.js';
      s.onload = ready;
      document.head.appendChild(s);
    };
    const readParam = (key) => {
      try {
        const hash = (window.location && window.location.hash) || '';
        const search = (window.location && window.location.search) || '';
        const qh = hash.split('?')[1] || '';
        const qs = search.split('?')[1] || '';
        const p1 = new URLSearchParams(qh);
        const p2 = new URLSearchParams(qs);
        return (p1.get(key) || p2.get(key) || '').toLowerCase();
      } catch (e) { return ''; }
    };
    const showPreviewGateOverlay = () => {
      try {
        const playerBox = document.querySelector('.mp-player');
        if (!playerBox) return;
        let ov = document.getElementById('mp-preview-gate');
        if (!ov) {
          ov = document.createElement('div');
          ov.id = 'mp-preview-gate';
          ov.style.position = 'absolute';
          ov.style.inset = '0';
          ov.style.display = 'flex';
          ov.style.alignItems = 'center';
          ov.style.justifyContent = 'center';
          ov.style.background = 'rgba(0,0,0,.75)';
          ov.style.color = '#efe6d6';
          ov.style.zIndex = '5';
          ov.style.textAlign = 'center';
          ov.innerHTML = `
            <div style="max-width:520px; padding:16px;">
              <h3 style="margin:0 0 8px; color:#f6e9c9;">Contenido bloqueado</h3>
              <p style="margin:0 0 12px; color:#cdbb9a;">Has visto el preview de 30 segundos. Afíliate al Modern Wealth Institute para acceder al video completo y a todos los beneficios.</p>
              <div style="display:flex; gap:8px; justify-content:center;">
                <button class="btn btn-primary" onclick="window.openAffiliationModal && window.openAffiliationModal()">Afiliarse ahora</button>
              </div>
            </div>`;
        }
        if (!playerBox.querySelector('#mp-preview-gate')) playerBox.appendChild(ov);
      } catch (e) {}
    };
    const hidePreviewGateOverlay = () => { try { const ov = document.getElementById('mp-preview-gate'); if (ov) ov.remove(); } catch (e) {} };
    const applyPreviewGateToIframe = (iframe) => {
      try {
        const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser && AuthManager.getCurrentUser()) || null;
        const isPaid = !!( (user && (user.role === 'admin' || user.isPaid === true)) || (typeof window !== 'undefined' && window.MWI_IS_PAID) );
        let gateEnabled = !isPaid;
        // Preview gate override for testing: `?previewgate=on|off`
        const override = readParam('previewgate');
        if (override === 'on') gateEnabled = true;
        if (override === 'off') gateEnabled = false;
        if (!gateEnabled || !iframe) { hidePreviewGateOverlay(); return; }
        ensureVimeoApi(() => {
          try {
            const player = new window.Vimeo.Player(iframe);
            const PREVIEW_SECONDS = 30;
            // Clear any previous poll attached to this iframe
            try { if (iframe.__previewPoll) { clearInterval(iframe.__previewPoll); iframe.__previewPoll = null; } } catch (e) {}
            try { if (iframe.__previewTimer) { clearTimeout(iframe.__previewTimer); iframe.__previewTimer = null; } } catch (e) {}
            iframe.__previewBlocked = false;
            hidePreviewGateOverlay();
            const gateCheck = () => {
              player.getCurrentTime().then((sec) => {
                if (!iframe.__previewBlocked && typeof sec === 'number' && sec >= PREVIEW_SECONDS) {
                  iframe.__previewBlocked = true;
                  player.pause().catch(() => {});
                  showPreviewGateOverlay();
                }
              }).catch(() => {});
            };
            // Polling fallback in case timeupdate events are throttled
            iframe.__previewPoll = setInterval(gateCheck, 300);
            player.on('loaded', () => { iframe.__previewBlocked = false; hidePreviewGateOverlay(); try { iframe.style.pointerEvents = ''; } catch (e) {} });
            player.on('timeupdate', (data) => {
              if (!iframe.__previewBlocked && data && typeof data.seconds === 'number' && data.seconds >= PREVIEW_SECONDS) {
                iframe.__previewBlocked = true;
                player.pause().catch(() => {});
                showPreviewGateOverlay();
              }
            });
            player.on('play', () => {
              if (iframe.__previewBlocked) {
                player.pause().catch(() => {});
                showPreviewGateOverlay();
                return;
              }
              // Strict timer block independent of timeupdate
              try { if (iframe.__previewTimer) { clearTimeout(iframe.__previewTimer); } } catch (e) {}
              iframe.__previewTimer = setTimeout(() => {
                if (!iframe.__previewBlocked) {
                  iframe.__previewBlocked = true;
                  player.pause().catch(()=>{});
                  showPreviewGateOverlay();
                }
              }, PREVIEW_SECONDS * 1000);
            });
            player.on('pause', () => { if (iframe.__previewBlocked) { showPreviewGateOverlay(); } try { if (iframe.__previewTimer) { clearTimeout(iframe.__previewTimer); iframe.__previewTimer = null; } } catch (e) {} });
            player.on('ended', () => { try { if (iframe.__previewPoll) { clearInterval(iframe.__previewPoll); iframe.__previewPoll = null; } } catch (e) {} try { if (iframe.__previewTimer) { clearTimeout(iframe.__previewTimer); iframe.__previewTimer = null; } } catch (e) {} });
          } catch (e) { console.error('Preview gate error:', e); }
        });
      } catch (e) {}
    };
    // Sidebar toggle
    const sidebar = document.getElementById('master-player-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle');
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions dentro del sidebar
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('mp-nav-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('mp-nav-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('mp-nav-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('mp-nav-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('mp-nav-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
    document.getElementById('mp-nav-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
    document.getElementById('mp-nav-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });
    // Playlist click: mantener el layout, sin cambiar video (placeholder). Podríamos actualizar el iframe si tuviéramos IDs.
    try {
      const backBtn = document.querySelector('.mp-back');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
            Router.navigate('/masters');
          } else {
            window.location.hash = '#/masters';
          }
        });
      }
    } catch (e) {}

    // Toggling de submódulos por módulo
    try {
      const toggles = Array.from(document.querySelectorAll('.mp-module-toggle'));
      toggles.forEach(btn => {
        btn.addEventListener('click', () => {
          const sub = btn.parentElement.querySelector('.mp-sublist');
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          const chev = btn.querySelector('.chev');
          if (sub) {
            sub.hidden = expanded; // si estaba expandido, ocultar
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            if (chev) chev.textContent = expanded ? '▸' : '▾';
          }
        });
      });
    } catch (e) {}

    // Reproducir submódulo al hacer clic: actualiza título y video
    try {
      const page = document.querySelector('.master-player-page');
      const defaultVid = (page && page.getAttribute('data-default-vimeo')) || '';
      const iframe = document.querySelector('.mp-player iframe');
      const titleEl = document.querySelector('.mp-title');
      const subitems = Array.from(document.querySelectorAll('.mp-subitem'));
      subitems.forEach(si => {
        si.addEventListener('click', () => {
          // marcar activo
          subitems.forEach(x => x.classList.remove('active'));
          si.classList.add('active');

          const t = si.getAttribute('data-title') || '';
          const vid = si.getAttribute('data-vimeo') || defaultVid;
          // actualizar etiqueta de módulo encima del título
          try {
            const modItem = si.closest('.mp-module-item');
            const modTitleNode = modItem && modItem.querySelector('.mp-module-toggle .t');
            const modLabelEl = document.querySelector('.mp-module');
            if (modLabelEl && modTitleNode && modTitleNode.textContent) {
              modLabelEl.textContent = modTitleNode.textContent;
            }
          } catch (e) {}
          if (titleEl && t) titleEl.textContent = t;
          if (iframe && vid) {
            const base = 'https://player.vimeo.com/video/';
            iframe.src = `${base}${vid}?title=0&byline=0&portrait=0&controls=1&pip=0`;
            // aplicar límite de preview para usuarios no pagos
            applyPreviewGateToIframe(iframe);
          }
        });
      });
      // Aplicar el gate al video inicial al montar
      applyPreviewGateToIframe(iframe);
    } catch (e) {}

    // Live sync: si el admin actualiza masters/módulos, recargar cuando estemos en /master-player
    try {
      const reloadIfActive = () => {
        try {
          const h = window.location.hash || '';
          if (h.startsWith('#/master-player')) { try { Router.reload(); } catch (e) { try { window.location.reload(); } catch {} } }
        } catch {}
      };
      window.addEventListener('mwi:masters:updated', reloadIfActive);
      window.addEventListener('storage', (ev) => {
        try {
          if (ev && ev.key === 'mwi:evt' && ev.newValue) {
            const data = JSON.parse(ev.newValue);
            if (data && data.t === 'masters-updated') reloadIfActive();
          }
        } catch {}
      });
    } catch {}
    // Limpiar cache cuando se sale del master player
    try {
      window.addEventListener('hashchange', () => {
        const h = window.location.hash || '';
        if (!h.startsWith('#/master-player')) { try { delete window.__MASTER_CACHE_MAP__; } catch (e) {} }
      });
    } catch (e) {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MasterPlayerPage;
}

/**
 * PÁGINA: CREAR NUEVO MASTER (ADMIN)
 *
 * Vista tipo reproductor (igual a MasterPlayer) con un panel derecho
 * donde se puede:
 *  - Definir título del master y mentor
 *  - Añadir módulos (aparecen en la lista)
 *  - Al abrir un módulo, añadir submódulos con link de video
 */

const AdminMasterCreatePage = {
  /**
   * Renderiza la página de creación de master
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') {
      Router.navigate('/');
      return '';
    }

    // Opcional: se cargará desde /admin/mentors en init(); aquí un placeholder
    const mentorsOptions = '<option value="">— Selecciona mentor —</option>';

    const defaultVimeo = '76979871';

    return `
      ${Sidebar.render()}
      <div class="main-content">
        <style>
          .master-player-page { padding: 20px; color:#efe6d6; }
          .mp-layout { display:grid; grid-template-columns: 65% 35%; gap:20px; }
          .mp-left { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-right { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-right * { box-sizing: border-box; }
          .mp-back { appearance:none; border:1px solid rgba(212,169,85,.35); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:6px; padding:6px 10px; font-size:12px; cursor:pointer; margin-bottom:10px; }
          .mp-back:hover { background:rgba(26,24,22,.8); }
          .mp-module { color:#cdbb9a; font-size:14px; font-weight:600; letter-spacing:.2px; }
          .mp-title { color:#f6e9c9; font-size:28px; font-weight:800; margin:8px 0 12px; }
          .mp-player { position:relative; width:100%; padding-bottom:56.25%; border-radius:10px; overflow:hidden; border:1px solid rgba(212,169,85,.18); background:#0f0d0f; }
          .mp-player iframe { position:absolute; inset:0; width:100%; height:100%; }
          .mp-playlist-title { color:#f6e9c9; font-size:18px; font-weight:800; margin-bottom:10px; }
          .mp-module-item { margin:8px 0; }
          .mp-module-head { display:flex; align-items:center; gap:8px; }
          .mp-module-toggle { width:100%; display:flex; align-items:center; gap:8px; padding:6px; border-radius:6px; cursor:pointer; border:1px solid rgba(212,169,85,.14); background:transparent; color:#efe6d6; font-weight:800; text-align:left; font-size:12px; }
          .mp-module-toggle:hover { background:#1a1816; }
          .mp-module-toggle .chev { color:#d4a955; font-weight:800; width:18px; display:inline-block; }
          .mp-sublist { margin:6px 0 0 28px; padding-left:0; max-width: calc(100% - 28px); }
          .mp-subitem { display:flex; align-items:center; gap:10px; padding:8px; border-radius:6px; border:1px solid rgba(212,169,85,.10); cursor:pointer; }
          .mp-subitem + .mp-subitem { margin-top:6px; }
          .mp-subitem .num { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(212,169,85,.10); color:#d4a955; font-weight:800; font-size:12px; }
          .mp-subitem .txt { color:#efe6d6; font-weight:600; font-size:14px; }
          .mp-subitem .actions { display:flex; gap:6px; }
          .mp-subitem.active { background:#1a1816; border-color: rgba(212,169,85,.22); }
          .mp-addbox { display:grid; grid-template-columns: 1fr auto; gap:8px; padding:10px; border:1px dashed rgba(212,169,85,.35); border-radius:8px; background:rgba(0,0,0,.20); }
          .mp-addbox input, .mp-addbox select { padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; }
          .mp-add-sm { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) 150px; gap:8px; margin:8px 0; align-items:center; max-width:100%; }
          .mp-add-sm button { width:100%; }
          .mp-edit-row { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) 120px; gap:8px; margin:6px 0 0 28px; padding:8px; border:1px dashed rgba(212,169,85,.25); border-radius:8px; background:rgba(0,0,0,.15); }
          .mp-add-sm input { padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; }
          /* Smaller buttons for this page */
          .master-player-page .btn { padding:6px 10px; font-size:12px; border-radius:6px; }
          .master-player-page .btn-small { padding:5px 8px; font-size:11px; border-radius:6px; }
          .master-player-page .btn-primary { font-weight:700; }
        </style>

        <main class="master-player-page">
          <div class="admin-topbar" style="display:flex; justify-content:flex-start; align-items:center; gap:8px; margin-bottom:12px; width:65%; margin-right:auto;">
            <input id="create-master-title" type="text" placeholder="Título del master" />
          </div>
          <div class="mp-layout">
            <section class="mp-left">
              <button class="mp-back" type="button" aria-label="Volver a Masters">← Volver a Masters</button>
              <div class="mp-module" id="mp-left-module">Sin módulo</div>
              <div class="mp-title" id="mp-left-title">Sin video</div>
              <div class="mp-player">
                <iframe id="mp-left-iframe" src="https://player.vimeo.com/video/${defaultVimeo}?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            </section>
            <aside class="mp-right">
              <div class="mp-playlist-title">Lista de contenidos</div>

              <div class="mp-addbox" style="grid-template-columns: 1fr auto;">
                <input id="create-module-title" type="text" placeholder="Añadir nuevo módulo (título)" />
                <button class="btn btn-small btn-primary" onclick="AdminMasterCreate_addModule()">Añadir módulo</button>
              </div>

              <div id="mp-modules-list"></div>
            </aside>
          </div>
          <div class="admin-create-actions" style="margin-top:14px; display:flex; gap:8px; align-items:center;">
            <select id="create-master-mentor" style="padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6;">
              <option value="">Selecciona mentor</option>
              ${mentorsOptions}
            </select>
            <button class="btn btn-primary" onclick="AdminMasterCreate_createMaster()">Guardar master</button>
            <button class="btn" onclick="AdminMasterCreate_uploadCover()">Subir portada</button>
            <button class="btn btn-small" onclick="AdminMasterCreate_deleteMasterPrompt()">Eliminar master</button>
          </div>
        </main>
      </div>
    `;
  },

  /**
   * Inicializa eventos de la página
   */
  init() {
    try {
      const backBtn = document.querySelector('.mp-back');
      if (backBtn) backBtn.addEventListener('click', () => Router.navigate('/admin/masters'));
    } catch (e) {}

    // Reset any lingering edit state to ensure a true "new master" creation flow
    try { window.AdminMasterCreate_currentMasterId = null; window.AdminMasterCreate_pendingSubmodules = []; } catch {}

    // Cargar mentores opcionalmente
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token') || '';
      fetch(`${base}/admin/mentors`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => {
          const sel = document.getElementById('create-master-mentor');
          if (!sel) return;
          const opts = (d && d.mentors ? d.mentors : []).map(m => `<option value="${Utils.escapeHtml(m.slug)}">${Utils.escapeHtml(m.name || m.slug)}</option>`).join('');
          sel.innerHTML = `<option value="">Selecciona mentor</option>${opts}`;
        }).catch(()=>{});
    } catch {}
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminMasterCreatePage;
}

// Global handlers (work even if Router doesn't call init for nested routes)
try {
  if (typeof window !== 'undefined') {
    window.AdminMasterCreate_currentMasterId = null;
    window.AdminMasterCreate_pendingSubmodules = [];
    window.AdminMasterCreate_extractVimeoId = function(link) {
      const s = String(link || '').trim();
      if (!s) return null;
      const direct = s.match(/^(\d{5,})$/);
      if (direct) return direct[1];
      const m1 = s.match(/vimeo\.com\/(\d{5,})/i);
      if (m1) return m1[1];
      const m2 = s.match(/player\.vimeo\.com\/video\/(\d{5,})/i);
      if (m2) return m2[1];
      return null;
    };
    window.AdminMasterCreate_slugify = function(s) {
      return String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
        .replace(/[^a-z0-9]+/g,'-')
        .replace(/^-+|-+$/g,'');
    };
    window.AdminMasterCreate_createMaster = async function() {
      const titleEl = document.getElementById('create-master-title');
      const mentorEl = document.getElementById('create-master-mentor');
      const title = (titleEl?.value || '').trim();
      const mentor = (mentorEl?.value || '').trim();
      if (!title) { Utils.showPopupError('Título del master requerido'); return; }
      // Mantener ID estable: si ya existe currentMasterId, usarlo.
      let slug = window.AdminMasterCreate_currentMasterId || window.AdminMasterCreate_slugify(title) || `master-${Date.now()}`;
      // Construir payload completo desde el estado local
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const masterModules = modules.filter(m => m.masterId === slug).sort((a,b)=>a.order-b.order);
      const items = masterModules.map((m, i) => ({
        id: m.id,
        title: m.title,
        order: i + 1,
        lessons: videos.filter(v => v.moduleId === m.id).sort((a,b)=>a.order-b.order).map((v, j) => ({
          id: v.id,
          title: v.title,
          order: j + 1,
          videoUrl: v.vimeoId ? `https://player.vimeo.com/video/${v.vimeoId}` : (v.fileUrl || '')
        }))
      }));

      const payload = {
        slug,
        title,
        shortTitle: title,
        mentorSlugs: mentor ? [mentor] : [],
        thumbnail: (StorageManager.get(StorageManager.KEYS.MASTERS_DB) || []).find(m => m.id === slug)?.thumbnail || '',
        items
      };

      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token') || '';
      try {
        const resp = await fetch(`${base}/admin/masters`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error guardando master');
        window.AdminMasterCreate_currentMasterId = slug;
        Utils.showSuccess('Master guardado en MongoDB');
        // Opcional: navegar de regreso o refrescar lista
        // Router.navigate('/admin/masters');
        window.AdminMasterCreate_refreshModuleList();
      } catch (err) {
        console.error('Guardar master error:', err);
        Utils.showPopupError('No se pudo guardar el master');
      }
    };
    // El título no guarda nada hasta presionar "Guardar master"
    // UI helpers
    window.AdminMasterCreate_renderModuleItem = function(mod) {
      const safeTitle = Utils.escapeHtml(mod.title || '');
      const modId = mod.id;
      return `
        <div class="mp-module-item" data-mod-id="${modId}">
          <div class="mp-module-head">
            <button class="mp-module-toggle" type="button" aria-expanded="false" onclick="AdminMasterCreate_toggleModule('${modId}', this)">
              <span class="chev">▸</span>
              <span class="t">${safeTitle}</span>
            </button>
            <button class="btn btn-small" onclick="event.stopPropagation(); AdminMasterCreate_toggleModuleEditInline('${modId}', this)" data-state="view">Editar</button>
            <button class="btn btn-small" onclick="event.stopPropagation(); AdminMasterCreate_deleteModule('${modId}')">Eliminar</button>
          </div>
          <div class="mp-edit-row" id="edit-mod-${modId}" hidden>
            <input id="edit-mod-title-${modId}" placeholder="Nuevo título del módulo" value="${safeTitle}" />
            <div></div>
          </div>
          <div class="mp-sublist" hidden>
            <div class="mp-add-sm">
              <input id="sm-title-${modId}" placeholder="Nombre del submódulo" />
              <input id="sm-video-${modId}" placeholder="Link del video (URL o ID de Vimeo)" />
              <button class="btn btn-small" onclick="AdminMasterCreate_addSubmodule('${modId}')">Añadir submódulo</button>
            </div>
            <div class="mp-subitems" id="subitems-${modId}"></div>
          </div>
        </div>
      `;
    };
    window.AdminMasterCreate_refreshModuleList = function() {
      const masterId = window.AdminMasterCreate_currentMasterId;
      const list = document.getElementById('mp-modules-list');
      if (!list) return;
      if (!masterId) { list.innerHTML = ''; return; }
      const modules = StorageManager.getModulesByMaster(masterId);
      list.innerHTML = modules.map(m => window.AdminMasterCreate_renderModuleItem(m)).join('');
      // Rellenar subitems existentes
      modules.forEach(m => {
        const subitemsWrap = document.getElementById(`subitems-${m.id}`);
        const videos = StorageManager.getVideosByModule(m.id);
        const html = videos.map((v, idx) => {
          const subId = v.submoduleId || '';
          const subName = (Array.isArray(m.submodules) ? (m.submodules.find(sm => sm.id === subId)?.title) : '') || '';
          const safeVidTitle = Utils.escapeHtml(v.title || '');
          const safeLink = Utils.escapeHtml(v.vimeoId || v.fileUrl || '');
          return `
            <div class="mp-subitem" data-title="${safeVidTitle}" data-vimeo="${Utils.escapeHtml(v.vimeoId || '')}" onclick="AdminMasterCreate_playSubitem(this)">
              <div class="num">${idx + 1}</div>
              <div class="txt">${safeVidTitle}${subName ? ` <small style='color:#cdbb9a'>(SM: ${Utils.escapeHtml(subName)})</small>` : ''}</div>
              <div class="actions">
                <button class="btn btn-small" onclick="event.stopPropagation(); AdminMasterCreate_editVideo('${m.id}','${v.id}')">Editar</button>
                ${subId ? `<button class=\"btn btn-small\" onclick=\"event.stopPropagation(); AdminMasterCreate_deleteSubmodule('${m.id}','${subId}')\">Eliminar submódulo</button>` : ''}
              </div>
            </div>
            <div class="mp-edit-row" id="edit-video-${v.id}" hidden>
              <input id="edit-video-title-${v.id}" placeholder="Título del video" value="${safeVidTitle}" />
              <input id="edit-video-link-${v.id}" placeholder="Vimeo ID o URL" value="${safeLink}" />
              <button class="btn btn-small" onclick="AdminMasterCreate_saveVideo('${m.id}','${v.id}')">Guardar</button>
            </div>
          `;
        }).join('');
        if (subitemsWrap) subitemsWrap.innerHTML = html;
      });
    };

    // Eliminar módulo (con confirmación) y purgar videos asociados
    window.AdminMasterCreate_deleteModule = function(moduleId) {
      if (!moduleId) return;
      const ok = confirm('¿Seguro que quieres eliminar este módulo y sus videos?');
      if (!ok) return;
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const nextModules = modules.filter(m => m.id !== moduleId);
      StorageManager.set(StorageManager.KEYS.MODULES_DB, nextModules);
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const nextVideos = videos.filter(v => v.moduleId !== moduleId);
      StorageManager.set(StorageManager.KEYS.VIDEOS_DB, nextVideos);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}
      Utils.showSuccess('Módulo eliminado');
      window.AdminMasterCreate_refreshModuleList();
    };

    // Eliminar submódulo y videos vinculados a ese submódulo
    window.AdminMasterCreate_deleteSubmodule = function(moduleId, submoduleId) {
      if (!moduleId || !submoduleId) return;
      const ok = confirm('¿Eliminar este submódulo y sus videos asociados?');
      if (!ok) return;
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const mIdx = modules.findIndex(m => m.id === moduleId);
      if (mIdx === -1) return Utils.showPopupError('Módulo no encontrado');
      const mod = modules[mIdx];
      const subs = Array.isArray(mod.submodules) ? mod.submodules : [];
      const nextSubs = subs.filter(s => s.id !== submoduleId);
      modules[mIdx] = { ...mod, submodules: nextSubs };
      StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const nextVideos = videos.filter(v => !(v.moduleId === moduleId && v.submoduleId === submoduleId));
      StorageManager.set(StorageManager.KEYS.VIDEOS_DB, nextVideos);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}
      Utils.showSuccess('Submódulo eliminado');
      window.AdminMasterCreate_refreshModuleList();
    };

    window.AdminMasterCreate_toggleModule = function(moduleId, btn) {
      try {
        const container = btn.closest('.mp-module-item');
        const sub = container ? container.querySelector('.mp-sublist') : null;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const chev = btn.querySelector('.chev');
        if (sub) { sub.hidden = expanded; btn.setAttribute('aria-expanded', expanded ? 'false' : 'true'); if (chev) chev.textContent = expanded ? '▸' : '▾'; }
      } catch {}
    };

    window.AdminMasterCreate_toggleModuleEdit = function(moduleId) {
      try {
        const row = document.getElementById(`edit-mod-${moduleId}`);
        if (row) { row.hidden = !row.hidden; }
      } catch {}
    };

    window.AdminMasterCreate_toggleModuleEditInline = function(moduleId, btn) {
      try {
        const row = document.getElementById(`edit-mod-${moduleId}`);
        const state = btn.getAttribute('data-state') || 'view';
        if (state === 'view') {
          if (row) row.hidden = false;
          btn.textContent = 'Guardar';
          btn.setAttribute('data-state', 'editing');
        } else {
          AdminMasterCreate_saveModuleTitle(moduleId);
          if (row) row.hidden = true;
          btn.textContent = 'Editar';
          btn.setAttribute('data-state', 'view');
        }
      } catch {}
    };

    window.AdminMasterCreate_saveModuleTitle = function(moduleId) {
      const input = document.getElementById(`edit-mod-title-${moduleId}`);
      const title = (input?.value || '').trim();
      if (!title) return Utils.showPopupError('Nuevo título requerido');
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const idx = modules.findIndex(m => m.id === moduleId);
      if (idx === -1) return Utils.showPopupError('Módulo no encontrado');
      modules[idx] = { ...modules[idx], title };
      StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}
      Utils.showSuccess('Módulo actualizado');
      window.AdminMasterCreate_refreshModuleList();
    };

    window.AdminMasterCreate_playSubitem = function(el) {
      try {
        const leftTitle = document.getElementById('mp-left-title');
        const leftModule = document.getElementById('mp-left-module');
        const iframe = document.getElementById('mp-left-iframe');
        Array.from(document.querySelectorAll('.mp-subitem')).forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        const title = el.getAttribute('data-title') || '';
        const vimeo = el.getAttribute('data-vimeo') || '';
        const moduleTitleNode = el.closest('.mp-module-item')?.querySelector('.mp-module-toggle .t');
        if (leftTitle && title) leftTitle.textContent = title;
        if (leftModule && moduleTitleNode && moduleTitleNode.textContent) leftModule.textContent = moduleTitleNode.textContent;
        if (iframe) { const base = 'https://player.vimeo.com/video/'; iframe.src = `${base}${vimeo || '76979871'}?title=0&byline=0&portrait=0`; }
      } catch {}
    };

    window.AdminMasterCreate_editVideo = function(moduleId, videoId) {
      try {
        const row = document.getElementById(`edit-video-${videoId}`);
        if (row) { row.hidden = !row.hidden; }
      } catch {}
    };

    window.AdminMasterCreate_saveVideo = function(moduleId, videoId) {
      const titleEl = document.getElementById(`edit-video-title-${videoId}`);
      const linkEl = document.getElementById(`edit-video-link-${videoId}`);
      const title = (titleEl?.value || '').trim();
      const link = (linkEl?.value || '').trim();
      if (!title) return Utils.showPopupError('Título de video requerido');
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const idx = videos.findIndex(v => v.id === videoId && v.moduleId === moduleId);
      if (idx === -1) return Utils.showPopupError('Video no encontrado');
      const extracted = window.AdminMasterCreate_extractVimeoId ? window.AdminMasterCreate_extractVimeoId(link) : (link.match(/^\d+$/) ? link : null);
      const updated = { ...videos[idx], title, vimeoId: extracted, fileUrl: extracted ? null : link };
      videos[idx] = updated;
      StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}
      Utils.showSuccess('Video actualizado');
      window.AdminMasterCreate_refreshModuleList();
    };

    window.AdminMasterCreate_editSubmodule = function(moduleId, submoduleId) {
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const mIdx = modules.findIndex(m => m.id === moduleId);
      if (mIdx === -1) return Utils.showPopupError('Módulo no encontrado');
      const mod = modules[mIdx];
      const subs = Array.isArray(mod.submodules) ? mod.submodules : [];
      const sIdx = subs.findIndex(s => s.id === submoduleId);
      if (sIdx === -1) return Utils.showPopupError('Submódulo no encontrado');
      const current = subs[sIdx]?.title || '';
      const next = prompt('Nuevo nombre del submódulo', current);
      if (next === null) return; // cancel
      const newTitle = String(next).trim();
      if (!newTitle) return Utils.showPopupError('Nombre de submódulo requerido');
      subs[sIdx] = { ...subs[sIdx], title: newTitle };
      modules[mIdx] = { ...mod, submodules: subs };
      StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
      try { const mid = mod.masterId; window.dispatchEvent(new CustomEvent('mwi:masters:updated', { detail: { masterId: mid } })); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', masterId: mid, at: Date.now() })); } catch {}
      Utils.showSuccess('Submódulo actualizado');
      window.AdminMasterCreate_refreshModuleList();
    };

    window.AdminMasterCreate_addModule = function() {
      const masterId = window.AdminMasterCreate_currentMasterId;
      if (!masterId) { Utils.showPopupError('Primero guarda el master'); return; }
      const input = document.getElementById('create-module-title');
      let title = (input?.value || '').trim();
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const id = `module-${Date.now()}`;
      const order = modules.filter(m => m.masterId === masterId).length + 1;
      if (!title) { title = `Módulo ${order}`; }
      modules.push({ id, masterId, title, description: '', order, videos: [], submodules: [], duration: '', active: true });
      StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}
      input && (input.value = '');
      Utils.showSuccess('Módulo agregado');
      window.AdminMasterCreate_refreshModuleList();
    };

    window.AdminMasterCreate_addSubmodule = function(moduleId) {
      const masterId = window.AdminMasterCreate_currentMasterId;
      if (!masterId) { Utils.showPopupError('Primero guarda el master'); return; }
          window.AdminMasterCreate_deleteMasterPrompt = function() {
            const id = window.AdminMasterCreate_currentMasterId;
            if (!id) { Utils.showPopup('Aún no has guardado el master.', 'Eliminar master'); return; }
            const html = `
              <div style="padding:22px; color:#efe6d6;">
                <h3 style="margin:0 0 8px; color:#f6e9c9;">Confirmar eliminación</h3>
                <p style="margin:0 0 14px; color:#cdbb9a;">¿Seguro que quieres eliminar este master?</p>
                <div style="display:flex; gap:8px; justify-content:flex-end;">
                  <button class="btn" onclick="closeAuthModal()">No</button>
                  <button class="btn btn-primary" onclick="AdminMasterCreate_deleteMaster()">Sí</button>
                </div>
              </div>`;
            try { window.openAuthModal(html); } catch { Utils.showPopup('¿Seguro que quieres eliminar este master?', 'Eliminar master'); }
          };
          window.AdminMasterCreate_deleteMaster = async function() {
            const id = window.AdminMasterCreate_currentMasterId;
            if (!id) { try { closeAuthModal(); } catch {} return; }
            // Eliminar en MongoDB
            const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
            const token = localStorage.getItem('mwi:token') || '';
            try {
              const resp = await fetch(`${base}/admin/masters/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
              });
              const data = await resp.json().catch(()=>({}));
              if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error eliminando master');
              // Fallback: limpiar local caches
              const masters = StorageManager.get(StorageManager.KEYS.MASTERS_DB) || [];
              StorageManager.set(StorageManager.KEYS.MASTERS_DB, masters.filter(m => m.id !== id));
              const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
              const toDelete = modules.filter(m => m.masterId === id).map(m => m.id);
              StorageManager.set(StorageManager.KEYS.MODULES_DB, modules.filter(m => m.masterId !== id));
              const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
              StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos.filter(v => !toDelete.includes(v.moduleId)));
              window.AdminMasterCreate_currentMasterId = null;
              window.AdminMasterCreate_pendingSubmodules = [];
              try { closeAuthModal(); } catch {}
              Utils.showSuccess('Master eliminado de MongoDB');
              Router.navigate('/admin/masters');
            } catch (err) {
              console.error('Eliminar master error:', err);
              Utils.showPopupError('No se pudo eliminar el master');
            }
          };
      const tEl = document.getElementById(`sm-title-${moduleId}`);
      const vEl = document.getElementById(`sm-video-${moduleId}`);
      const title = (tEl?.value || '').trim();
      const videoLink = (vEl?.value || '').trim();
      if (!title) { Utils.showPopupError('Nombre del submódulo requerido'); return; }
      if (!videoLink) { Utils.showPopupError('Link del video requerido'); return; }

      // Persistir submódulo dentro del módulo
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const mIdx = modules.findIndex(m => m.id === moduleId);
      if (mIdx === -1) { Utils.showPopupError('Módulo no encontrado'); return; }
      const subId = `sub-${Date.now()}-${Math.floor(Math.random()*1000)}`;
      const mod = modules[mIdx];
      const submodules = Array.isArray(mod.submodules) ? mod.submodules : [];
      submodules.push({ id: subId, title });
      modules[mIdx] = { ...mod, submodules };
      StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);

      // Crear video vinculado
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const vidId = `video-${Date.now()}-${Math.floor(Math.random()*1000)}`;
      const vimeoId = window.AdminMasterCreate_extractVimeoId ? window.AdminMasterCreate_extractVimeoId(videoLink) : (videoLink.match(/^\d+$/) ? videoLink : null);
      const fileUrl = vimeoId ? null : videoLink;
      const vOrder = videos.filter(v => v.moduleId === moduleId).length + 1;
      videos.push({ id: vidId, moduleId, submoduleId: subId, title, description: '', vimeoId, fileUrl, duration: '00:00', order: vOrder, type: 'lesson', resources: [] });
      StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos);
      try { window.dispatchEvent(new CustomEvent('mwi:masters:updated')); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', at: Date.now() })); } catch {}

      // Añadir al DOM
      const wrap = document.getElementById(`subitems-${moduleId}`);
      if (wrap) {
        const el = document.createElement('div');
        el.className = 'mp-subitem';
        el.setAttribute('data-title', title);
        el.setAttribute('data-vimeo', vimeoId || '');
        el.innerHTML = `<div class="num">${vOrder}</div><div class="txt">${Utils.escapeHtml(title)}</div>`;
        el.onclick = function() { AdminMasterCreate_playSubitem(el); };
        wrap.appendChild(el);
      }
      // Reproducir al agregar
      try {
        const leftTitle = document.getElementById('mp-left-title');
        const leftModule = document.getElementById('mp-left-module');
        const iframe = document.getElementById('mp-left-iframe');
        const modTitleNode = document.querySelector(`[data-mod-id="${moduleId}"] .mp-module-toggle .t`);
        if (leftTitle) leftTitle.textContent = title;
        if (leftModule && modTitleNode && modTitleNode.textContent) leftModule.textContent = modTitleNode.textContent;
        if (iframe) { const base = 'https://player.vimeo.com/video/'; iframe.src = `${base}${vimeoId || '76979871'}?title=0&byline=0&portrait=0`; }
      } catch {}

      tEl && (tEl.value = ''); vEl && (vEl.value = '');
      Utils.showSuccess('Submódulo agregado');
    };

    // Set cover image via pasted URL (no local upload)
    window.AdminMasterCreate_uploadCover = async function() {
      const masterId = window.AdminMasterCreate_currentMasterId;
      if (!masterId) { return Utils.showPopupError('Primero guarda el master'); }
      try {
        const raw = prompt('Pega la URL de la imagen (http/https)');
        if (raw === null) return; // cancel
        const fileUrl = String(raw || '').trim();
        if (!/^https?:\/\//i.test(fileUrl)) {
          return Utils.showPopupError('URL inválida. Debe empezar por http(s)');
        }
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const token = localStorage.getItem('mwi:token') || '';
        const res2 = await fetch(`${base}/admin/masters/${masterId}/cover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ fileUrl })
        });
        const d2 = await res2.json().catch(()=>({}));
        if (!res2.ok) throw new Error(d2 && d2.message ? d2.message : 'Error actualizando portada');
        Utils.showSuccess('Portada guardada en MongoDB');
      } catch (err) {
        console.error('Actualizar portada (URL) error:', err);
        Utils.showPopupError('No se pudo actualizar la portada');
      }
    };
  }
} catch (e) {}

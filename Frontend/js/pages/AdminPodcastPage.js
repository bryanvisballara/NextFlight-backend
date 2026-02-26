/**
 * PÁGINA: GESTIÓN DE PODCAST (ADMIN)
 * Estilo: Cards al estilo AdminMasterCreate, con un único botón "Editar" por card.
 * Al editar, se despliegan campos (incluye enlaces de Vimeo y YouTube) y acciones Guardar/Cancelar/Eliminar.
 */

const AdminPodcastPage = {
  render() {
    const user = AuthManager.getCurrentUser();
      if (!user || user.role !== 'admin') { Router.navigate('/'); return ''; }
    return `
      ${Sidebar.render()}
      <div class="main-content">
        <style>
          .admin-podcast-page { padding: 20px; color:#efe6d6; }
          .ap-actions { display:flex; gap:8px; align-items:center; margin-bottom:12px; }
          .ap-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:14px; }
          @media (max-width: 980px) { .ap-grid { grid-template-columns: 1fr; } }
          .ap-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .ap-card-header { display:flex; justify-content:space-between; align-items:center; gap:8px; }
          .ap-title { color:#f6e9c9; font-size:16px; font-weight:800; line-height:1.2; }
          .ap-meta { color:#cdbb9a; font-size:12px; margin-top:4px; }
          .ap-badge { display:inline-block; padding:3px 8px; border-radius:999px; font-size:11px; font-weight:800; }
          .ap-badge.active { background:rgba(212,169,85,.18); color:#d4a955; border:1px solid rgba(212,169,85,.35); }
          .ap-badge.inactive { background:rgba(120,98,60,.12); color:#8f7f61; border:1px solid rgba(212,169,85,.18); }
          .ap-edit { margin-top:10px; padding:10px; border-radius:8px; background:rgba(0,0,0,.15); border:1px dashed rgba(212,169,85,.25); }
          .ap-row { display:grid; grid-template-columns: 1fr 1fr; gap:8px; }
          .ap-row-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; }
          .ap-row + .ap-row, .ap-row-3 + .ap-row-3 { margin-top:8px; }
          .ap-input, .ap-textarea { padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; width:100%; box-sizing:border-box; }
          .ap-textarea { min-height:80px; }
          .ap-edit-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:10px; }
          .btn { appearance:none; border:1px solid rgba(212,169,85,.35); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:6px; padding:6px 10px; font-size:12px; cursor:pointer; }
          .btn:hover { background:rgba(26,24,22,.8); }
          .btn-primary { background:linear-gradient(180deg,#D1A156,#7A5A22); color:#2a1f0b; border:1px solid rgba(209,161,86,.95); }
          .btn-small { padding:5px 8px; font-size:11px; border-radius:6px; }
          .btn-danger { color:#f6e9c9; border-color: rgba(197,72,72,.5); background: rgba(87,26,26,.35); }
        </style>

        <div class="content-header">
          <h1>🎧 Gestión de Podcast</h1>
          <p>Lista de capítulos en formato de cards — clic en "Editar" para modificar.</p>
        </div>

        <main class="admin-podcast-page">
          <div class="ap-actions">
            <button class="btn btn-primary" id="ap-add">Añadir capítulo</button>
          </div>
          <div class="ap-grid" id="ap-grid">
            <div style="grid-column:1 / -1; padding:10px; color:#cdbb9a;">Cargando capítulos…</div>
          </div>
        </main>
      </div>
    `;
  },

  _renderCard(ep) {
    const thumb = ep.thumbnail || Utils.getPlaceholderImage(600, 240, 'Podcast');
    const featuredClass = ep.featured ? 'active' : 'inactive';
    const featuredText = ep.featured ? 'Destacado' : 'No destacado';
    const safe = (v) => Utils.escapeHtml(v || '');
    const vimeoUrl = ep.vimeoUrl || (ep.vimeoId ? `https://vimeo.com/${ep.vimeoId}` : '');
    const youtubeUrl = ep.youtubeUrl || (ep.youtubeId ? `https://youtu.be/${ep.youtubeId}` : '');
    return `
      <div class="ap-card" data-ep-id="${ep._id}">
        <div class="ap-card-header">
          <div style="flex:1 1 auto; min-width:0;">
            <div class="ap-title">${safe(ep.title)}</div>
            <div class="ap-meta">${ep.category ? safe(ep.category)+' · ' : ''}${ep.publishedAt ? safe(ep.publishedAt) : ''}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="ap-badge ${featuredClass}">${featuredText}</span>
            <button class="btn btn-small" onclick="AdminPodcast_editToggle('${ep._id}')">Editar</button>
          </div>
        </div>
        <div class="ap-edit" id="ap-edit-${ep._id}" hidden>
          <div class="ap-row">
            <input class="ap-input" id="ap-title-${ep._id}" placeholder="Título" value="${safe(ep.title)}" />
          </div>
          <div class="ap-row">
            <input class="ap-input" id="ap-guest-${ep._id}" placeholder="Invitado" value="${safe(ep.guest)}" />
            <input class="ap-input" id="ap-duration-${ep._id}" placeholder="Duración (mm:ss)" value="${safe(ep.duration)}" />
          </div>
          <div class="ap-row">
          </div>
          <div class="ap-row">
            <button class="btn btn-small" onclick="AdminPodcast_uploadCover('${ep._id}')">Imagen de portada</button>
          </div>
          <div class="ap-row">
            <div id="ap-preview-${ep._id}" class="ap-cover-preview" style="height:120px; border-radius:8px; background:#1d1a19; background-size:cover; background-position:center; border:1px solid rgba(212,169,85,.18); ${ep.thumbnail ? `background-image:url('${safe(ep.thumbnail)}')` : ''}"></div>
          </div>
          <div class="ap-row">
            <input class="ap-input" id="ap-vimeo-${ep._id}" placeholder="Link de Vimeo o ID" value="${safe(vimeoUrl)}" />
            <input class="ap-input" id="ap-youtube-${ep._id}" placeholder="Link de YouTube o ID" value="${safe(youtubeUrl)}" />
          </div>
          <div style="margin-top:8px; display:flex; align-items:center; gap:10px;">
            <label><input type="checkbox" id="ap-featured-${ep._id}" ${ep.featured ? 'checked' : ''}/> Destacado</label>
          </div>
          <textarea class="ap-textarea" id="ap-desc-${ep._id}" placeholder="Descripción">${safe(ep.description)}</textarea>
          <div class="ap-edit-actions">
            <button class="btn btn-danger" onclick="AdminPodcast_delete('${ep._id}')">Eliminar</button>
            <button class="btn" onclick="AdminPodcast_editToggle('${ep._id}')">Cancelar</button>
            <button class="btn btn-primary" onclick="AdminPodcast_save('${ep._id}')">Guardar</button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    try {
      document.getElementById('ap-add')?.addEventListener('click', () => {
        try { Router.navigate('/admin/podcast/create'); } catch (e) { try { window.location.hash = '#/admin/podcast/create'; } catch {} }
      });
      // Load episodes from Mongo (admin endpoint)
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      fetch(`${base}/admin/podcast`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
      })
        .then(async resp => {
          const data = await resp.json().catch(() => ({}));
          if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error');
          const episodes = Array.isArray(data.episodes) ? data.episodes : [];
          const grid = document.getElementById('ap-grid');
          if (grid) {
            grid.innerHTML = episodes.length ? episodes.map(ep => AdminPodcastPage._renderCard(ep)).join('') : '<div style="grid-column:1 / -1; padding:10px; color:#cdbb9a;">No hay capítulos</div>';
          }
        })
        .catch(err => {
          console.error('[AdminPodcastPage] load error', err);
          const grid = document.getElementById('ap-grid');
          if (grid) grid.innerHTML = '<div style="grid-column:1 / -1; padding:10px; color:#cdbb9a;">No se pudieron cargar los capítulos</div>';
        });
    } catch {}
  }
};

// Helpers y handlers globales (como en AdminMasterCreate)
window.AdminPodcast_editToggle = function(id) {
  try {
    const row = document.getElementById(`ap-edit-${id}`);
    if (row) row.hidden = !row.hidden;
  } catch {}
};

window.AdminPodcast_delete = function(id) {
  (async () => {
    try {
      const ok = confirm('¿Eliminar este capítulo?');
      if (!ok) return;
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const resp = await fetch(`${base}/admin/podcast/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
      });
      if (!resp.ok) throw new Error('Delete failed');
      if (window.Utils && Utils.showSuccess) Utils.showSuccess('Capítulo eliminado');
      try { Router.reload(); } catch { window.location.reload(); }
    } catch (e) {
      if (window.Utils && Utils.showPopupError) Utils.showPopupError('No se pudo eliminar');
      console.error('[AdminPodcast_delete]', e);
    }
  })();
};

window.AdminPodcast_extractVimeoId = function(linkOrId) {
  const s = String(linkOrId || '').trim();
  if (!s) return null;
  const direct = s.match(/^(\d{5,})$/);
  if (direct) return direct[1];
  const m1 = s.match(/vimeo\.com\/(\d{5,})/i);
  if (m1) return m1[1];
  const m2 = s.match(/player\.vimeo\.com\/video\/(\d{5,})/i);
  if (m2) return m2[1];
  return null;
};

window.AdminPodcast_extractYouTubeId = function(linkOrId) {
  const s = String(linkOrId || '').trim();
  if (!s) return null;
  // Direct ID (11 chars typical, but allow broader)
  if (/^[a-zA-Z0-9_-]{8,}$/.test(s) && !/^http/i.test(s)) return s;
  const u = s;
  const m1 = u.match(/[?&]v=([a-zA-Z0-9_-]{8,})/); // https://www.youtube.com/watch?v=ID
  if (m1) return m1[1];
  const m2 = u.match(/youtu\.be\/([a-zA-Z0-9_-]{8,})/); // youtu.be/ID
  if (m2) return m2[1];
  const m3 = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{8,})/); // /embed/ID
  if (m3) return m3[1];
  return null;
};

// Upload cover image for podcast episode
window.AdminPodcast_uploadCover = async function(epId) {
  try {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const inputUrl = prompt('URL de la imagen de portada (https://...)');
    if (!inputUrl) return;
    const url = String(inputUrl).trim();
    const isHttp = /^https?:\/\//i.test(url);
    if (!isHttp) {
      if (window.Utils && Utils.showPopupError) Utils.showPopupError('Ingresa una URL válida que comience con http(s)');
      return;
    }
    const prev = document.getElementById(`ap-preview-${epId}`);
    if (prev) {
      // Use backend image proxy for preview to avoid referer/CORS issues
      const proxied = `${base}/proxy/image?url=${encodeURIComponent(url)}`;
      prev.style.backgroundImage = `url('${proxied}')`;
      // Store raw URL for saving to Mongo
      prev.dataset.fileUrl = url;
    }
    if (window.Utils && Utils.showSuccess) Utils.showSuccess('Portada asignada desde URL');
  } catch (err) {
    if (window.Utils && Utils.showPopupError) Utils.showPopupError('No se pudo asignar la portada');
    console.error('[AdminPodcast_uploadCover]', err);
  }
};

window.AdminPodcast_save = function(id) {
  (async () => {
    try {
      const payload = {
        title: document.getElementById(`ap-title-${id}`)?.value?.trim() || '',
        guest: document.getElementById(`ap-guest-${id}`)?.value?.trim() || '',
        duration: document.getElementById(`ap-duration-${id}`)?.value?.trim() || '',
        description: document.getElementById(`ap-desc-${id}`)?.value?.trim() || '',
        featured: !!document.getElementById(`ap-featured-${id}`)?.checked,
      };
      const vimeoRaw = document.getElementById(`ap-vimeo-${id}`)?.value || '';
      const ytRaw = document.getElementById(`ap-youtube-${id}`)?.value || '';
      const vimeoId = window.AdminPodcast_extractVimeoId(vimeoRaw);
      const youtubeId = window.AdminPodcast_extractYouTubeId(ytRaw);
      if (vimeoRaw) { payload.vimeoUrl = vimeoRaw; payload.vimeoId = vimeoId; }
      if (ytRaw) { payload.youtubeUrl = ytRaw; payload.youtubeId = youtubeId; }
      const prev = document.getElementById(`ap-preview-${id}`);
      if (prev && prev.dataset && prev.dataset.fileUrl) payload.thumbnail = prev.dataset.fileUrl;

      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const resp = await fetch(`${base}/admin/podcast/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '')
        },
        body: JSON.stringify(payload)
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data && data.message ? data.message : 'Update failed');
      if (window.Utils && Utils.showSuccess) Utils.showSuccess('Capítulo actualizado');
      try { Router.reload(); } catch { window.location.reload(); }
    } catch (e) {
      if (window.Utils && Utils.showPopupError) Utils.showPopupError('No se pudo guardar');
      console.error('[AdminPodcast_save]', e);
    }
  })();
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminPodcastPage;
}

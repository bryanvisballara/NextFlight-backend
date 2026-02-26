const AdminPodcastCreatePage = {
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') { Router.navigate('/'); return ''; }
    return `
      ${Sidebar.render()}
      <div class="main-content">
        <style>
          .admin-podcast-create { padding:20px; color:#efe6d6; }
          .apc-form { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .ap-row { display:grid; grid-template-columns: 1fr 1fr; gap:8px; }
          .ap-row-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; }
          .ap-row + .ap-row, .ap-row-3 + .ap-row-3 { margin-top:8px; }
          .ap-input, .ap-textarea { padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; width:100%; box-sizing:border-box; }
          .ap-textarea { min-height:120px; }
          .ap-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:12px; }
          .btn { appearance:none; border:1px solid rgba(212,169,85,.35); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:6px; padding:6px 10px; font-size:12px; cursor:pointer; }
          .btn:hover { background:rgba(26,24,22,.8); }
          .btn-primary { background:linear-gradient(180deg,#D1A156,#7A5A22); color:#2a1f0b; border:1px solid rgba(209,161,86,.95); }
          .btn-danger { color:#f6e9c9; border-color: rgba(197,72,72,.5); background: rgba(87,26,26,.35); }
          .ap-cover-preview { height:140px; border-radius:8px; background:#1d1a19; background-size:cover; background-position:center; border:1px solid rgba(212,169,85,.18); }
        </style>
        <div class="content-header">
          <h1>🎧 Crear nuevo capítulo</h1>
          <p>Completa los campos y guarda para añadir el capítulo.</p>
        </div>
        <main class="admin-podcast-create">
          <div class="apc-form">
            <div class="ap-row">
              <input class="ap-input" id="apc-title" placeholder="Título" />
            </div>
            <div class="ap-row">
              <input class="ap-input" id="apc-guest" placeholder="Invitado" />
              <input class="ap-input" id="apc-duration" placeholder="Duración (mm:ss)" />
            </div>
            <div class="ap-row">
              <button class="btn" id="apc-upload">Imagen de portada</button>
            </div>
            <div class="ap-row">
              <div id="apc-preview" class="ap-cover-preview"></div>
            </div>
            <div class="ap-row">
              <input class="ap-input" id="apc-vimeo" placeholder="Link de Vimeo o ID" />
              <input class="ap-input" id="apc-youtube" placeholder="Link de YouTube o ID" />
            </div>
            <div style="margin-top:8px; display:flex; align-items:center; gap:10px;">
              <label><input type="checkbox" id="apc-featured" /> Destacado</label>
            </div>
            <textarea class="ap-textarea" id="apc-desc" placeholder="Descripción"></textarea>
            <div class="ap-actions">
              <button class="btn" id="apc-cancel">Cancelar</button>
              <button class="btn btn-primary" id="apc-save">Guardar</button>
            </div>
          </div>
        </main>
      </div>
    `;
  },
  init() {
    // Ensure buttons don't submit anything
    try {
      document.getElementById('apc-upload')?.setAttribute('type','button');
      document.getElementById('apc-save')?.setAttribute('type','button');
      document.getElementById('apc-cancel')?.setAttribute('type','button');
    } catch {}

    // Draft persistence to avoid losing typed data on any refresh
    const draftKey = 'mwi:apc:draft';
    const readDraft = () => {
      try { return JSON.parse(localStorage.getItem(draftKey) || '{}'); } catch { return {}; }
    };
    const writeDraft = () => {
      try {
        const data = {
          title: (document.getElementById('apc-title')?.value || ''),
          guest: (document.getElementById('apc-guest')?.value || ''),
          duration: (document.getElementById('apc-duration')?.value || ''),
          vimeo: (document.getElementById('apc-vimeo')?.value || ''),
          youtube: (document.getElementById('apc-youtube')?.value || ''),
          desc: (document.getElementById('apc-desc')?.value || ''),
          featured: !!document.getElementById('apc-featured')?.checked,
          thumbnail: (document.getElementById('apc-preview')?.dataset?.fileUrl || '')
        };
        localStorage.setItem(draftKey, JSON.stringify(data));
      } catch {}
    };
    const applyDraft = () => {
      const d = readDraft();
      try {
        if (d.title) document.getElementById('apc-title').value = d.title;
        if (d.guest) document.getElementById('apc-guest').value = d.guest;
        if (d.duration) document.getElementById('apc-duration').value = d.duration;
        if (d.vimeo) document.getElementById('apc-vimeo').value = d.vimeo;
        if (d.youtube) document.getElementById('apc-youtube').value = d.youtube;
        if (typeof d.featured === 'boolean') document.getElementById('apc-featured').checked = d.featured;
        if (d.desc) document.getElementById('apc-desc').value = d.desc;
        if (d.thumbnail) {
          const prev = document.getElementById('apc-preview');
          prev.style.backgroundImage = `url('${d.thumbnail}')`;
          prev.dataset.fileUrl = d.thumbnail;
        }
      } catch {}
    };
    // Apply any existing draft on init
    applyDraft();
    // Listen to changes to keep draft up to date
    try {
      ['apc-title','apc-guest','apc-duration','apc-vimeo','apc-youtube','apc-desc','apc-featured'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const evt = id === 'apc-featured' ? 'change' : 'input';
        el.addEventListener(evt, writeDraft);
      });
    } catch {}

    // Cancel: volver al listado y limpiar borrador
    document.getElementById('apc-cancel')?.addEventListener('click', () => { try { localStorage.removeItem(draftKey); } catch {} Router.navigate('/admin/podcast'); });
    // Portada por URL (sin subir archivo local)
    document.getElementById('apc-upload')?.addEventListener('click', async (e) => {
      try { e && e.preventDefault && e.preventDefault(); e && e.stopPropagation && e.stopPropagation(); } catch {}
      try {
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const inputUrl = prompt('URL de la imagen de portada (https://...)');
        if (!inputUrl) return;
        const url = String(inputUrl).trim();
        const isHttp = /^https?:\/\//i.test(url);
        if (!isHttp) { Utils.showPopupError('Ingresa una URL válida que comience con http(s)'); return; }
        const prev = document.getElementById('apc-preview');
        if (prev) {
          const proxied = `${base}/proxy/image?url=${encodeURIComponent(url)}`;
          prev.style.backgroundImage = `url('${proxied}')`;
          prev.dataset.fileUrl = url; // guardamos la URL real para Mongo
        }
        writeDraft();
        Utils.showSuccess('Portada asignada desde URL');
      } catch (err) {
        console.error('Asignar portada por URL error', err);
        Utils.showPopupError('No se pudo asignar la portada');
      }
    });
    // Guardar capítulo (MongoDB)
    document.getElementById('apc-save')?.addEventListener('click', async () => {
      try {
        // Debug safeguards and robust extractors
        const title = (document.getElementById('apc-title')?.value || '').trim();
        if (!title) { Utils.showPopupError('Título requerido'); return; }
        const vimeoInput = (document.getElementById('apc-vimeo')?.value || '').trim();
        const youtubeInput = (document.getElementById('apc-youtube')?.value || '').trim();
        const extractVimeo = (v) => {
          const s = String(v || '').trim();
          const m = s.match(/(\d{5,})/);
          return m ? m[1] : null;
        };
        const extractYouTube = (v) => {
          const s = String(v || '').trim();
          // Try common patterns: ?v=ID, youtu.be/ID, /embed/ID, or bare ID
          const m = s.match(/(?:[?&]v=|youtu\.be\/|embed\/)([0-9A-Za-z_-]{8,})/) || s.match(/^([0-9A-Za-z_-]{8,})$/);
          return m ? m[1] : null;
        };
        const previewEl = document.getElementById('apc-preview');
        const payload = {
          title,
          guest: (document.getElementById('apc-guest')?.value || '').trim(),
          duration: (document.getElementById('apc-duration')?.value || '').trim(),
          description: (document.getElementById('apc-desc')?.value || '').trim(),
          featured: !!document.getElementById('apc-featured')?.checked,
          thumbnail: (previewEl && previewEl.dataset && previewEl.dataset.fileUrl) ? previewEl.dataset.fileUrl : '',
          vimeoId: extractVimeo(vimeoInput),
          vimeoUrl: vimeoInput,
          youtubeId: extractYouTube(youtubeInput),
          youtubeUrl: youtubeInput,
          category: ''
        };

        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        console.log('[APC] Sending payload to', `${base}/admin/podcast`, payload);
        const resp = await fetch(`${base}/admin/podcast`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '')
          },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error');
        Utils.showSuccess('Capítulo creado');
        try { localStorage.removeItem(draftKey); } catch {}
        Router.navigate('/admin/podcast');
      } catch (e) {
        console.error(e);
        Utils.showPopupError('No se pudo guardar el capítulo');
      }
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminPodcastCreatePage;
}

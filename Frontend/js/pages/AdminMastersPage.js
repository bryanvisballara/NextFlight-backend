/**
 * PÁGINA: GESTIÓN DE MASTERS (ADMIN)
 * 
 * Vista de contenido de masters para administradores.
 */

const AdminMastersPage = {
  /**
   * Renderiza la página de gestión de masters
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') {
      Router.navigate('/');
      return '';
    }

    // La lista se llenará vía API en `init()`

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>🎓 Gestión de Masters</h1>
          <p>Vista general del contenido educativo</p>
        </div>

        <div class="admin-masters-content">
          <style>
            .masters-admin-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; }
            @media (max-width: 1280px) { .masters-admin-grid { grid-template-columns: repeat(3, 1fr); } }
            @media (max-width: 1024px) { .masters-admin-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 640px) { .masters-admin-grid { grid-template-columns: 1fr; } }
            .master-admin-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
            .master-admin-image { height:160px; border-radius:8px; overflow:hidden; border:1px solid rgba(212,169,85,.18); }
            .master-admin-image img { width:100%; height:100%; object-fit:cover; display:block; }
            .master-admin-content h3 { color:#efe6d6; font-weight:800; margin-top:10px; line-height:1.3; }
            .master-admin-meta { display:flex; justify-content:space-between; align-items:center; color:#cdbb9a; font-size:12px; margin-top:6px; }
            .master-admin-actions { display:flex; justify-content:flex-end; margin-top:8px; }
            .btn-modificar { appearance:none; border:none; padding:10px 14px; border-radius:8px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
            .modules-details > summary { display:none; }
            .master-add-card { background:#141212; border:1px dashed rgba(212,169,85,.35); border-radius:10px; padding:18px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; }
            .master-add-icon { width:84px; height:84px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); color:#d4a955; font-size:52px; line-height:1; }
            .master-add-label { margin-top:10px; color:#d4a955; font-weight:800; }
          </style>
          
          <div class="masters-admin-grid" id="masters-admin-grid">
            <!-- Se cargará desde MongoDB -->
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una card de master
   */
  renderMasterCard(master) {
    const thumbnail = master.thumbnail || Utils.getPlaceholderImage(400, 250, master.shortTitle || master.title);
    const count = typeof master.modulesCount === 'number' ? master.modulesCount : (Array.isArray(master.modules) ? master.modules.length : 0);

    return `
      <div class="master-admin-card" data-master-id="${master.id}">
        <div class="master-admin-image">
          <img src="${thumbnail}" alt="${master.title}">
        </div>
        <div class="master-admin-content">
          <h3>${master.title}</h3>
          <div style="margin-top:8px;">
            <label style="display:flex;align-items:center;gap:6px;color:#cdbb9a;font-size:13px;">
              <input type="checkbox"
                class="master-featured-checkbox"
                data-master-id="${master.id}"
                ${master.featured ? 'checked' : ''} />
              Destacado
            </label>

            <div class="featured-video-box"
                 id="featured-video-${master.id}"
                 style="margin-top:6px;display:${master.featured ? 'block' : 'none'};">
              <input
                type="text"
                placeholder="URL del video (MP4 / Vimeo / Cloudflare)"
                value="${master.featuredVideoUrl || ''}"
                style="width:100%;padding:6px;border-radius:6px;" />
              <textarea
                class="featured-desc-input"
                placeholder="Descripción del hero (máx 2 líneas)"
                data-master-id="${master.id}"
                style="width:100%;margin-top:8px;background:#0f0f0f;border:1px solid rgba(212,169,85,.25);border-radius:8px;color:#efe6d6;padding:10px;resize:none;"
              >${master.featuredDescription || ''}</textarea>
              <button
                class="btn btn-small"
                style="margin-top:6px;"
                data-action="save-featured"
                data-master-id="${master.id}">
                Guardar
              </button>
            </div>
          </div>
          <div class="master-admin-meta"><span>Programa oficial</span><span>${count} módulos</span></div>
          <div class="master-admin-actions"><button class="btn-modificar" data-action="modify" data-master-id="${master.id}">Modificar</button></div>

          <details class="modules-details">
            <summary></summary>
            <div class="modules-admin-list">
              <!-- Lista detallada de módulos se integrará más adelante -->
            </div>
            <div id="module-create-${master.id}" class="module-create" style="margin-top:8px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <input id="mod-title-${master.id}" placeholder="Título del módulo" />
                <input id="mod-duration-${master.id}" placeholder="Duración" />
              </div>
              <textarea id="mod-desc-${master.id}" rows="3" placeholder="Descripción" style="width:100%;margin-top:6px;"></textarea>
              <button class="btn btn-small btn-primary" onclick="createModule('${master.id}')">Agregar módulo</button>
            </div>
          </details>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza un item de módulo
   */
  renderModuleItem(module) {
    const videos = StorageManager.getVideosByModule(module.id);
    const submodules = module.submodules || [];
    return `
      <div class="module-admin-item">
        <h4>${module.title}</h4>
        <p>${module.description}</p>
        <small>${videos.length} videos - ${module.duration}</small>
        <div style="margin-top:6px;display:flex;gap:8px;align-items:center;">
          <input id="vid-title-${module.id}" placeholder="Título video" />
          <input id="vid-vimeo-${module.id}" placeholder="Vimeo ID" />
          ${submodules.length ? `<select id="vid-sub-${module.id}">${submodules.map(sm => `<option value="${sm.id}">${sm.title}</option>`).join('')}</select>` : ''}
          <button class="btn btn-small" onclick="addVideoToModule('${module.id}')">Agregar video</button>
        </div>
        <div style="margin-top:6px;display:flex;gap:8px;align-items:center;">
          <input id="sub-title-${module.id}" placeholder="Título submódulo" />
          <button class="btn btn-small" onclick="addSubmodule('${module.id}')">Crear submódulo</button>
        </div>
        ${submodules.length ? `<ul style="margin-top:6px;">${submodules.map(sm => `<li style="display:flex;justify-content:space-between;align-items:center;gap:8px;">${sm.title}<button class="btn btn-xsmall" onclick="uploadVideoToSubmodule('${module.id}','${sm.id}')">Subir video</button></li>`).join('')}</ul>` : ''}
      </div>
    `;
  },

  /**
   * Renderiza la card para agregar nuevo master
   */
  renderAddCard() {
    return `
      <a href="#/admin/masters/create" data-link class="master-add-card" id="add-new-master-card" role="button" aria-label="Agregar nuevo master" style="text-decoration:none;">
        <div class="master-add-icon">+</div>
        <div class="master-add-label">Agregar nuevo master</div>
      </a>
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    // No creation form here; minimalist UI

    // Card click toggles modules details
    try {
      document.querySelectorAll('.master-admin-card').forEach(card => {
        card.addEventListener('click', (ev) => {
          const details = card.querySelector('.modules-details');
          if (details) {
            details.open = !details.open;
          }
        });
      });
    } catch (e) {}

    // "Modificar" button navigates to the edit page
    try {
      document.querySelectorAll('button[data-action="modify"]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const id = btn.getAttribute('data-master-id');
          Router.navigate(`/admin/masters/${id}`);
        });
      });
    } catch (e) {}

    // Add new master card
    try {
      document.getElementById('add-new-master-card')?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        try { window.AdminMasterCreate_currentMasterId = null; window.AdminMasterCreate_pendingSubmodules = []; } catch {}
        Router.navigate('/admin/masters/create');
      });
    } catch (e) {}

    // Cargar masters desde el backend (MongoDB)
    try { this.loadMasters(); } catch (e) { console.error(e); }
  }
  ,

  async loadMasters() {
    const grid = document.getElementById('masters-admin-grid');
    if (!grid) return;
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    grid.innerHTML = '<div style="color:#cdbb9a;">Cargando masters…</div>';
    try {
      const resp = await fetch(`${base}/api/masters`);
      const data = await resp.json();
      if (!Array.isArray(data)) throw new Error('Respuesta inválida');
      const masters = data.map(m => ({
        id: m.slug,
        title: m.title || m.slug,
        shortTitle: m.shortTitle || m.title || m.slug,
        thumbnail: m.thumbnail || '',
        modulesCount: typeof m.modulesCount === 'number' ? m.modulesCount : 0,
        featured: !!m.featured,
        featuredVideoUrl: m.featuredVideoUrl || '',
        featuredDescription: m.featuredDescription || ''
      }));
      grid.innerHTML = masters.map(master => this.renderMasterCard(master)).join('') + this.renderAddCard();
      // Bind events for newly inserted cards only once
      this.bindCardEvents();
    } catch (err) {
      console.error('Error cargando masters desde API:', err);
      // Fallback a datos locales si existen
      const localMasters = StorageManager.getAllMasters();
      grid.innerHTML = localMasters.map(master => this.renderMasterCard(master)).join('') + this.renderAddCard();
      this.bindCardEvents();
    }
  },

  bindCardEvents() {
    // Card click toggles modules details
    try {
      document.querySelectorAll('.master-admin-card').forEach(card => {
        card.addEventListener('click', (ev) => {
          const details = card.querySelector('.modules-details');
          if (details) {
            details.open = !details.open;
          }
        });
      });
    } catch (e) {}

    // "Modificar" button navigates to the edit page
    try {
      document.querySelectorAll('button[data-action="modify"]').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const id = btn.getAttribute('data-master-id');
          Router.navigate(`/admin/masters/${id}`);
        });
      });
    } catch (e) {}

    // Add new master card
    try {
      document.getElementById('add-new-master-card')?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        try { window.AdminMasterCreate_currentMasterId = null; window.AdminMasterCreate_pendingSubmodules = []; } catch {}
        Router.navigate('/admin/masters/create');
      });
    } catch (e) {}

    // Featured checkbox toggle
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      document.querySelectorAll('.master-featured-checkbox').forEach(cb => {
        cb.addEventListener('change', async (ev) => {
          ev.stopPropagation();
          const slug = cb.getAttribute('data-master-id');
          const box = document.getElementById(`featured-video-${slug}`);
          if (!slug) return;
          if (cb.checked) {
            if (box) box.style.display = 'block';
          } else {
            if (box) box.style.display = 'none';
            try {
              await fetch(`${base}/api/masters/${slug}/featured`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: false })
              });
              Utils.showToast('Master desmarcado como destacado');
            } catch (err) {
              console.error('Error desmarcando destacado', err);
              Utils.showPopupError('No se pudo actualizar el destacado');
            }
          }
        });
      });
    } catch (e) {}

    // Save featured video URL
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      document.querySelectorAll('button[data-action="save-featured"]').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
          ev.stopPropagation();
          const slug = btn.getAttribute('data-master-id');
          const box  = document.getElementById(`featured-video-${slug}`);
          const urlInput = box ? box.querySelector('input[type="text"]') : null;
          const descInput = box ? box.querySelector('textarea.featured-desc-input') : null;
          const url = (urlInput && urlInput.value ? urlInput.value.trim() : '');
          const desc = (descInput && descInput.value ? descInput.value.trim() : '');
          if (!slug) return;
          if (!url) return Utils.showPopupError('Ingresa la URL del video');
          try {
            await fetch(`${base}/api/masters/${slug}/featured`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ featured: true, featuredVideoUrl: url, featuredDescription: desc })
            });
            Utils.showToast('Master destacado actualizado');
            Router.reload();
          } catch (err) {
            console.error('Error guardando destacado', err);
            Utils.showPopupError('No se pudo guardar el destacado');
          }
        });
      });
    } catch (e) {}
  }
};

// Toggle master active
// Removed toggle/mentor UI for a minimalist card layout

// Create module
window.createModule = (masterId) => {
  const title = document.getElementById(`mod-title-${masterId}`).value.trim();
  const duration = document.getElementById(`mod-duration-${masterId}`).value.trim();
  const desc = document.getElementById(`mod-desc-${masterId}`).value.trim();
  if (!title) return Utils.showPopupError('Título de módulo requerido');
  const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
  const id = `module-${Date.now()}`;
  modules.push({ id, masterId, title, description: desc, order: (modules.filter(m=>m.masterId===masterId).length+1), videos: [], submodules: [], duration, active: true });
  StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
  Utils.showToast('Módulo creado');
  Router.reload();
};

// Assign mentor/instructor
window.setMasterMentor = (masterId) => {
  const input = document.getElementById(`mentor-${masterId}`);
  const mentor = input?.value.trim() || '';
  const masters = StorageManager.getAllMasters();
  const m = masters.find(x => x.id === masterId);
  if (!m) return;
  m.instructor = mentor;
  StorageManager.set(StorageManager.KEYS.MASTERS_DB, masters);
  Utils.showToast('Mentor actualizado');
};

// Add submodule to a module
window.addSubmodule = (moduleId) => {
  const titleEl = document.getElementById(`sub-title-${moduleId}`);
  const title = titleEl?.value.trim();
  if (!title) return Utils.showPopupError('Título de submódulo requerido');
  const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
  const module = modules.find(m => m.id === moduleId);
  if (!module) return;
  const id = `sub-${Date.now()}`;
  module.submodules = Array.isArray(module.submodules) ? module.submodules : [];
  module.submodules.push({ id, title });
  StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
  Utils.showToast('Submódulo creado');
  Router.reload();
};

// Add video to module
window.addVideoToModule = (moduleId) => {
  const titleEl = document.getElementById(`vid-title-${moduleId}`);
  const vimeoEl = document.getElementById(`vid-vimeo-${moduleId}`);
  const subSel = document.getElementById(`vid-sub-${moduleId}`);
  const title = titleEl?.value.trim();
  const raw = vimeoEl?.value.trim();
  const vimeoId = (window.AdminMasterCreate_extractVimeoId ? window.AdminMasterCreate_extractVimeoId(raw) : (raw && raw.match(/^\d+$/) ? raw : null)) || raw;
  const submoduleId = subSel ? subSel.value : undefined;
  if (!title) return Utils.showPopupError('Título de video requerido');
  const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
  const id = `video-${Date.now()}`;
  const order = videos.filter(v => v.moduleId === moduleId).length + 1;
  videos.push({ id, moduleId, submoduleId, title, description: '', vimeoId: vimeoId || '76979871', duration: '00:00', order, type: 'lesson', resources: [] });
  StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos);
  // Update totalVideos in master
  const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
  const module = modules.find(m => m.id === moduleId);
  const masters = StorageManager.getAllMasters();
  const master = module ? masters.find(ma => ma.id === module.masterId) : null;
  if (master) {
    const masterModuleIds = modules.filter(m => m.masterId === master.id).map(m => m.id);
    const total = (StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [])
      .filter(v => masterModuleIds.includes(v.moduleId)).length;
    master.totalVideos = total;
    StorageManager.set(StorageManager.KEYS.MASTERS_DB, masters);
  }
  Utils.showToast('Video agregado');
  Router.reload();
};

// Upload video to a specific submodule
window.uploadVideoToSubmodule = async (moduleId, submoduleId) => {
  try {
    // Create hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    input.onchange = async () => {
      const file = input.files && input.files[0];
      document.body.removeChild(input);
      if (!file) return;
      const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
      const module = modules.find(m => m.id === moduleId);
      if (!module) return Utils.showPopupError('Módulo no encontrado');
      const masterId = module.masterId;
      const form = new FormData();
      form.append('video', file);
      const qs = new URLSearchParams({ masterId, moduleId, submoduleId }).toString();
      let fileUrl = null;
      try {
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const resp = await fetch(`${base}/upload/video?${qs}`, { method: 'POST', body: form });
        const data = await resp.json();
        fileUrl = data && data.fileUrl ? `${base}${data.fileUrl}` : null;
      } catch (err) {
        console.error('Upload error:', err);
      }
      const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
      const id = `video-${Date.now()}`;
      const order = videos.filter(v => v.moduleId === moduleId).length + 1;
      const title = file.name.replace(/\.[^.]+$/, '');
      videos.push({ id, moduleId, submoduleId, title, description: '', vimeoId: null, fileUrl, duration: '00:00', order, type: 'lesson', resources: [] });
      StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos);
      // Update master total videos
      const masters = StorageManager.getAllMasters();
      const master = masters.find(ma => ma.id === masterId);
      if (master) {
        const masterModuleIds = modules.filter(m => m.masterId === master.id).map(m => m.id);
        const total = (StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [])
          .filter(v => masterModuleIds.includes(v.moduleId)).length;
        master.totalVideos = total;
        StorageManager.set(StorageManager.KEYS.MASTERS_DB, masters);
      }
      Utils.showSuccess('Video subido y agregado al módulo');
      Router.reload();
    };
  } catch (e) {
    console.error(e);
    Utils.showPopupError('Error al subir el video');
  }
};

// (Crear master por modal eliminado a favor de página dedicada)

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminMastersPage;
}
const AdminLiveSessionsPage = {
  title: 'Sesiones en Vivo',
  route: '/admin/live-sessions',
  requiresAuth: true,
  requiresAdmin: true,

  render() {
    const sessions = this.sessions || [];
    const mentors = (typeof StorageManager !== 'undefined' && StorageManager.getAllMentors) ? StorageManager.getAllMentors() : [];

    const cards = (sessions || []).map(s => {
      const mentor = mentors.find(m => (m.slug || '') === (s.instructor || '')) || {};
      const title = (s.title || '').trim();
      const name = (mentor.name || s.instructor || '').trim();
      const time = (s.time || '').trim();
      return `
        <div class="live-card-admin" data-id="${s.id}">
          <div class="lc-title">${Utils.escapeHtml(title)}</div>
          <div class="lc-sub">${Utils.escapeHtml(name)}${time ? ' • ' + Utils.escapeHtml(time) : ''}</div>
          <div class="lc-actions"><button class="btn-edit" data-id="${s.id}">Editar</button></div>
        </div>
      `;
    }).join('');

    const mentorOptions = (mentors || []).map(m => `<option value="${Utils.escapeHtml(m.slug || '')}">${Utils.escapeHtml(m.name || m.slug || '')}</option>`).join('');

    return `
      ${Sidebar.render()}
      <div class="main-content">
      <div class="live-admin-wrap">
        <style>
          .live-admin-wrap { padding:16px; }
          .live-admin-wrap .top-actions { display:flex; justify-content:flex-start; margin-bottom:12px; }
          .live-admin-wrap .btn-new { appearance:none; border:none; padding:10px 14px; border-radius:6px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
          .live-admin-wrap .cards { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:12px; }
          .live-card-admin { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.06); }
          .live-card-admin .lc-title { color:#efe6d6; font-weight:800; margin-bottom:6px; }
          .live-card-admin .lc-sub { color:#cdbb9a; font-size:14px; margin-bottom:10px; }
          .live-card-admin .btn-edit { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:8px 12px; border-radius:6px; font-weight:700; }
          .live-card-admin .btn-edit:hover { background:rgba(209,161,86,.14); }
          /* Modal */
          .ls-modal { display:none; position:fixed; inset:0; z-index:1000; }
          .ls-modal.open { display:block; }
          .ls-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
          .ls-modal .content { position:relative; max-width:560px; margin:60px auto; background:#141212; border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); }
          .ls-modal .box { padding:16px; }
          .ls-modal h3 { color:#d4a955; margin:0 0 10px; }
          .ls-modal .form-row { display:flex; flex-direction:column; gap:6px; margin-bottom:10px; }
          .ls-modal label { color:#cdbb9a; font-weight:700; }
          .ls-modal input, .ls-modal select { padding:10px; border-radius:6px; border:1px solid rgba(212,169,85,.28); background:#0f0f0f; color:#efe6d6; }
          .ls-modal .actions { display:flex; justify-content:flex-end; gap:10px; margin-top:12px; }
          .ls-btn { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:8px 12px; border-radius:6px; font-weight:700; }
          .ls-btn.primary { border:1px solid rgba(209,161,86,.95); background:linear-gradient(180deg,#D1A156,#7A5A22); color:#2a1f0b; }
        </style>
        <div class="top-actions">
          <button id="btn-new-session" class="btn-new">Sesión nueva</button>
        </div>
        <div class="cards">
          ${cards || ''}
        </div>
        <!-- Edit/Create Modal -->
        <div id="live-edit-modal" class="ls-modal" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <div class="content" role="document">
            <div class="box">
              <h3 id="ls-modal-title">Editar sesión</h3>
              <div class="form-row"><label>Título</label><input id="ls-title" type="text" /></div>
              <div class="form-row"><label>Mentor</label><select id="ls-instructor"><option value="">Seleccione...</option>${mentorOptions}</select></div>
              <div class="form-row"><label>Fecha y hora</label><input id="ls-time" type="text" placeholder="Ej: Hoy, 8:00 PM" /></div>
              <div class="form-row"><label>Link de Google Meet</label><input id="ls-meet" type="url" placeholder="https://meet.google.com/..." /></div>
              <div class="actions">
                <button id="ls-cancel" class="ls-btn">Cancelar</button>
                <button id="ls-delete" class="ls-btn" style="display:none">Eliminar</button>
                <button id="ls-save" class="ls-btn primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  },

  init() {
    // Load real mentors from backend into the selector (no design changes)
    (async function loadMentorsForLiveSessions() {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token');
      if (!token) return;
      const select = document.getElementById('ls-instructor');
      if (!select) return;
      try {
        const res = await fetch(`${base}/admin/mentors`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to load mentors');
        const data = await res.json().catch(() => ({ mentors: [] }));
        const mentors = Array.isArray(data.mentors) ? data.mentors : [];
        // Clear previous options without changing styles
        select.innerHTML = '';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Seleccione...';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        mentors.forEach(m => {
          const option = document.createElement('option');
          option.value = m.slug;
          option.textContent = m.name || m.slug;
          select.appendChild(option);
        });
      } catch (error) {
        console.error('[Live Sessions] Mentors load error:', error);
      }
    })();

    const btnNew = document.getElementById('btn-new-session');
    btnNew && btnNew.addEventListener('click', () => {
      const modal = document.getElementById('live-edit-modal');
      if (!modal) return;
      modal.dataset.mode = 'create';
      modal.dataset.id = `live-${Date.now()}`;
      document.getElementById('ls-modal-title').textContent = 'Nueva sesión';
      document.getElementById('ls-title').value = '';
      document.getElementById('ls-instructor').value = '';
      document.getElementById('ls-time').value = '';
      document.getElementById('ls-meet').value = '';
      try { const delBtn = document.getElementById('ls-delete'); if (delBtn) delBtn.style.display = 'none'; } catch {}
      modal.classList.add('open');
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!id) return;
        const sessions = (this.sessions || []);
        const s = sessions.find(x => (x.id || x._id) === id);
        if (!s) return;
        const modal = document.getElementById('live-edit-modal');
        if (!modal) return;
        modal.dataset.mode = 'edit';
        modal.dataset.id = s.id || s._id || id;
        document.getElementById('ls-modal-title').textContent = 'Editar sesión';
        document.getElementById('ls-title').value = s.title || '';
        document.getElementById('ls-instructor').value = s.instructor || s.mentorSlug || '';
        document.getElementById('ls-time').value = s.time || s.scheduledAtText || '';
        document.getElementById('ls-meet').value = s.ctaRoute || s.meetLink || '';
        const delBtn = document.getElementById('ls-delete');
        if (delBtn) delBtn.style.display = '';
        modal.classList.add('open');
      });
    });

    // Modal actions
    const modal = document.getElementById('live-edit-modal');
    const closeModal = () => { modal && modal.classList.remove('open'); };
    document.getElementById('ls-cancel')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (ev) => {
      const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') closeModal();
    });
    document.getElementById('ls-save')?.addEventListener('click', async () => {
      if (!modal) return;
      const mode = modal.dataset.mode || 'edit';
      const id = modal.dataset.id || `live-${Date.now()}`;
      const title = document.getElementById('ls-title').value.trim();
      const instructor = document.getElementById('ls-instructor').value.trim();
      const time = document.getElementById('ls-time').value.trim();
      const meetLink = document.getElementById('ls-meet').value.trim();
      try {
        const token = localStorage.getItem('mwi:token');
        const base = (window.API_URL) || 'https://mwi-backend.onrender.com';
        if (mode === 'create') {
          await fetch(`${base}/admin/live-sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              title,
              mentorSlug: instructor,
              scheduledAtText: time,
              meetLink
            })
          });
          try { Utils.flash('Sesión creada'); } catch {}
        } else {
          await fetch(`${base}/admin/live-sessions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              title,
              mentorSlug: instructor,
              scheduledAtText: time,
              meetLink
            })
          });
          try { Utils.flash('Sesión actualizada'); } catch {}
        }
      } catch (e) {
        try { Utils.showError('No se pudo guardar la sesión'); } catch {}
      }
      closeModal();
      Router.navigate('/admin/live-sessions');
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminLiveSessionsPage;
}

// Load sessions from backend on init (prefix without UI changes)
try {
  AdminLiveSessionsPage.init = async function() {
    // Ensure mentor selector is filled ONLY from MongoDB (no StorageManager)
    async function loadMentorsForLiveSessions() {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token');
      if (!token) return;
      const select = document.getElementById('ls-instructor');
      if (!select) return;
      try {
        // Full cleanup to remove any hardcoded/local options
        while (select.firstChild) { select.removeChild(select.firstChild); }
        // Placeholder (keeps visual consistent)
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Seleccione...';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        // Fetch mentors from Admin API
        const res = await fetch(`${base}/admin/mentors`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to fetch mentors');
        const data = await res.json().catch(() => ({ mentors: [] }));
        const mentors = Array.isArray(data.mentors) ? data.mentors : [];
        mentors.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.slug;
          opt.textContent = m.name || m.slug || '';
          select.appendChild(opt);
        });
        try { console.log('[Live Sessions] Mentors loaded from Mongo:', mentors); } catch {}
      } catch (err) {
        console.error('[Live Sessions] Error loading mentors:', err);
      }
    }

    // Load mentors first so the modal has the real list
    await loadMentorsForLiveSessions();
    const btnNew = document.getElementById('btn-new-session');
    btnNew && btnNew.addEventListener('click', () => {
      const modal = document.getElementById('live-edit-modal');
      if (!modal) return;
      modal.dataset.mode = 'create';
      modal.dataset.id = `live-${Date.now()}`;
      document.getElementById('ls-modal-title').textContent = 'Nueva sesión';
      document.getElementById('ls-title').value = '';
      document.getElementById('ls-instructor').value = '';
      document.getElementById('ls-time').value = '';
      document.getElementById('ls-meet').value = '';
      modal.classList.add('open');
    });

    // Fetch sessions from backend
    try {
      const token = localStorage.getItem('mwi:token');
      const base = (window.API_URL) || 'https://mwi-backend.onrender.com';
      const res = await fetch(`${base}/admin/live-sessions`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json().catch(() => ([]));
      const raw = Array.isArray(json.sessions) ? json.sessions : (Array.isArray(json) ? json : []);
      // Map to UI shape used by render
      this.sessions = raw.map(s => ({
        id: s._id || s.id,
        title: s.title,
        instructor: s.mentorSlug,
        time: s.scheduledAtText,
        ctaRoute: s.meetLink
      }));
      // Update cards without reloading the route
      try {
        const cardsEl = document.querySelector('.cards');
        const mentors = (typeof StorageManager !== 'undefined' && StorageManager.getAllMentors) ? StorageManager.getAllMentors() : [];
        const cardsHTML = (this.sessions || []).map(s => {
          const mentor = mentors.find(m => (m.slug || '') === (s.instructor || '')) || {};
          const title = (s.title || '').trim();
          const name = (mentor.name || s.instructor || '').trim();
          const time = (s.time || '').trim();
          return `
            <div class="live-card-admin" data-id="${s.id}">
              <div class="lc-title">${Utils.escapeHtml(title)}</div>
              <div class="lc-sub">${Utils.escapeHtml(name)}${time ? ' • ' + Utils.escapeHtml(time) : ''}</div>
              <div class="lc-actions"><button class="btn-edit" data-id="${s.id}">Editar</button></div>
            </div>
          `;
        }).join('');
        if (cardsEl) cardsEl.innerHTML = cardsHTML;
      } catch {}
    } catch {}

    // Wire edit buttons again after reload
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!id) return;
        const sessions = (this.sessions || []);
        const s = sessions.find(x => (x.id || x._id) === id);
        if (!s) return;
        const modal = document.getElementById('live-edit-modal');
        if (!modal) return;
        modal.dataset.mode = 'edit';
        modal.dataset.id = s.id || s._id || id;
        document.getElementById('ls-modal-title').textContent = 'Editar sesión';
        document.getElementById('ls-title').value = s.title || '';
        document.getElementById('ls-instructor').value = s.instructor || s.mentorSlug || '';
        document.getElementById('ls-time').value = s.time || s.scheduledAtText || '';
        document.getElementById('ls-meet').value = s.ctaRoute || s.meetLink || '';
        try { const delBtn = document.getElementById('ls-delete'); if (delBtn) delBtn.style.display = ''; } catch {}
        modal.classList.add('open');
      });
    });

    // Modal actions (cancel and overlay close)
    const modal = document.getElementById('live-edit-modal');
    const closeModal = () => { modal && modal.classList.remove('open'); };
    document.getElementById('ls-cancel')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (ev) => {
      const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') closeModal();
    });
    // Delete button (only visible in edit mode)
    document.getElementById('ls-delete')?.addEventListener('click', async () => {
      if (!modal) return;
      const mode = modal.dataset.mode || 'edit';
      if (mode !== 'edit') return; // guard
      const id = modal.dataset.id;
      if (!id) return;
      try {
        const token = localStorage.getItem('mwi:token');
        const base = (window.API_URL) || 'https://mwi-backend.onrender.com';
        const res = await fetch(`${base}/admin/live-sessions/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res && res.ok) { try { Utils.flash('Sesión eliminada'); } catch {} }
        else { try { Utils.showError('No se pudo eliminar la sesión'); } catch {} }
      } catch (e) { try { Utils.showError('Error al eliminar la sesión'); } catch {} }
      closeModal();
      Router.navigate('/admin/live-sessions');
    });
    // Save button (backend-only)
    document.getElementById('ls-save')?.addEventListener('click', async () => {
      if (!modal) return;
      const mode = modal.dataset.mode || 'edit';
      const id = modal.dataset.id || `live-${Date.now()}`;
      const title = document.getElementById('ls-title').value.trim();
      const instructor = document.getElementById('ls-instructor').value.trim();
      const time = document.getElementById('ls-time').value.trim();
      const meetLink = document.getElementById('ls-meet').value.trim();
      try {
        const token = localStorage.getItem('mwi:token');
        const base = (window.API_URL) || 'https://mwi-backend.onrender.com';
        if (mode === 'create') {
          await fetch(`${base}/admin/live-sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ title, mentorSlug: instructor, scheduledAtText: time, meetLink })
          });
          try { Utils.flash('Sesión creada'); } catch {}
        } else {
          await fetch(`${base}/admin/live-sessions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ title, mentorSlug: instructor, scheduledAtText: time, meetLink })
          });
          try { Utils.flash('Sesión actualizada'); } catch {}
        }
      } catch (e) {
        try { Utils.showError('No se pudo guardar la sesión'); } catch {}
      }
      closeModal();
      Router.navigate('/admin/live-sessions');
    });
  };
} catch {}

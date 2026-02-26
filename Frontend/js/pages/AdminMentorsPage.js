/**
 * PÁGINA: ADMIN MENTORES
 * Gestiona la lista de mentores visibles en el Dashboard del alumno.
 */

const AdminMentorsPage = {
  render() {
    if (!AuthManager.isAdmin()) { Router.navigate('/'); return ''; }
    const rows = '';

    return `
      ${Sidebar.render()}
      <div class="main-content adm-mentors" style="padding:16px;">
        <div class="content-header">
          <h1>Mentores</h1>
          <p>Gestiona los mentores que aparecen en el Dashboard del alumno.</p>
        </div>
        <style>
          /* Scoped styles for Admin Mentors page */
          .adm-mentors .am-field label { display:block; color:#cdbb9a; margin-bottom:6px; font-weight:700; }
          .adm-mentors .am-input { width:100%; padding:10px 12px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#0f0f0f; color:#f6e9c9; }
          .adm-mentors .am-input::placeholder { color:#9f8e6a; opacity:.85; }
          .adm-mentors .am-input:focus { outline:none; border-color: rgba(212,169,85,.55); box-shadow: 0 0 0 3px rgba(212,169,85,.12); }
          .adm-mentors .btn-gold { appearance:none; border:none; padding:10px 14px; border-radius:8px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
          .adm-mentors .btn-outline { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 14px; border-radius:8px; font-weight:700; }
          .adm-mentors .btn-sm { appearance:none; border:1px solid rgba(209,161,86,.45); background:rgba(209,161,86,.08); color:#e8dcc0; padding:6px 10px; border-radius:8px; font-weight:700; cursor:pointer; }
          .adm-mentors table thead th { background: rgba(212,169,85,.06); }
        </style>

        <section style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
          <h3 style="color:#f6e9c9;margin:6px 0 12px;">Listado</h3>
          <div style="overflow:auto;">
            <table style="width:100%;border-collapse:collapse;color:#e8dcc0;">
              <thead>
                <tr style="text-align:left;color:#d4a955;">
                  <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.25);">Nombre</th>
                  <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.25);">Slug</th>
                  <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.25);">Acciones</th>
                </tr>
              </thead>
              <tbody id="mentors-tbody">${rows || ''}</tbody>
            </table>
          </div>
        </section>

        <section style="margin-top:14px;background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
          <h3 id="mentor-form-title" style="color:#f6e9c9;margin:6px 0 12px;">Añadir mentor</h3>
          <form id="mentor-form" autocomplete="off">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div>
                <label>Nombre</label>
                <input id="mentor-name" class="am-input" type="text" placeholder="Nombre del mentor" required />
              </div>
              <div>
                <label>Slug (opcional)</label>
                <input id="mentor-slug" class="am-input" type="text" placeholder="bryan-visbal" />
              </div>
            </div>
            <div style="margin-top:10px;display:grid;grid-template-columns:1fr;gap:10px;">
              <div>
                <label>Email</label>
                <input id="mentor-email" class="am-input" type="email" placeholder="email" />
              </div>
            </div>
            <div style="margin-top:10px;display:grid;grid-template-columns:220px 1fr;gap:10px;align-items:center;">
              <div>
                <label>Foto de perfil</label>
                <div style="display:flex;gap:8px;align-items:center;">
                  <button type="button" id="mentor-photo-btn" class="btn-outline">Subir imagen</button>
                  <input id="mentor-photo-file" type="file" accept="image/*" style="display:none" />
                </div>
                <small style="color:#cdbb9a;display:block;margin-top:6px;">Recomendado: 300x300px, JPG/PNG</small>
              </div>
              <div>
                <div id="mentor-photo-preview" style="width:120px;height:120px;border-radius:50%;background:#1d1a19;border:1px solid rgba(212,169,85,.22);display:flex;align-items:center;justify-content:center;color:#cdbb9a;overflow:hidden;">
                  <span>Sin imagen</span>
                  <img id="mentor-photo-img" alt="Foto mentor" style="display:none;width:100%;height:100%;object-fit:cover;" />
                </div>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button id="mentor-submit-btn" type="submit" class="btn-gold">Guardar</button>
              <button type="button" id="mentor-cancel" class="btn-outline">Cancelar</button>
            </div>
          </form>
          <p style="color:#cdbb9a;margin-top:8px;">El listado del Dashboard usará esta misma fuente de datos.</p>
        </section>
      </div>
    `;
  },

  init() {
    if (!AuthManager.isAdmin()) return;
    const tbody = document.getElementById('mentors-tbody');
    const form = document.getElementById('mentor-form');
    const nameEl = document.getElementById('mentor-name');
    const slugEl = document.getElementById('mentor-slug');
    const emailEl = document.getElementById('mentor-email');
    const photoBtn = document.getElementById('mentor-photo-btn');
    const photoFile = document.getElementById('mentor-photo-file');
    const photoPreview = document.getElementById('mentor-photo-preview');
    const photoImg = document.getElementById('mentor-photo-img');
    const formTitle = document.getElementById('mentor-form-title');
    const submitBtn = document.getElementById('mentor-submit-btn');
    let mentorPhotoUrl = '';
    let editingMentorId = null;
    let editingMentorSlugOriginal = null;

    // Draft persistence to avoid losing data on accidental refresh
    const DRAFT_KEY = 'mwi:adm:mentor:draft';
    const saveDraft = () => {
      try {
        const draft = {
          name: (nameEl?.value || '').trim(),
          slug: (slugEl?.value || '').trim(),
          email: (emailEl?.value || '').trim(),
          photo: mentorPhotoUrl || ''
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (e) {}
    };
    const applyDraft = () => {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const draft = JSON.parse(raw || '{}');
        if (nameEl && typeof draft.name === 'string') nameEl.value = draft.name;
        if (slugEl && typeof draft.slug === 'string') slugEl.value = draft.slug;
        if (emailEl && typeof draft.email === 'string') emailEl.value = draft.email;
        if (typeof draft.photo === 'string' && draft.photo) {
          mentorPhotoUrl = draft.photo;
          if (photoImg && photoPreview) {
            photoImg.src = mentorPhotoUrl;
            photoImg.style.display = 'block';
            const span = photoPreview.querySelector('span');
            if (span) span.style.display = 'none';
          }
        }
      } catch (e) {}
    };
    const clearDraft = () => { try { localStorage.removeItem(DRAFT_KEY); } catch (e) {} };
    applyDraft();

    // Cargar mentores desde Mongo y renderizar listado
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    fetch(`${base}/admin/mentors`, {
      headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
    })
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data.mentors) ? data.mentors : [];
        tbody.innerHTML = list.map(m => `
          <tr data-id="${m._id}">
            <td>${Utils.escapeHtml(m.name || '')}</td>
            <td><code>${Utils.escapeHtml(m.slug || '')}</code></td>
            <td>
              <button class="btn-sm" data-action="view" data-slug="${Utils.escapeHtml(m.slug || '')}">Ver perfil</button>
              <button class="btn-sm" data-action="edit-dashboard" data-id="${Utils.escapeHtml(m._id || '')}">Editar en dashboard</button>
              <button class="btn-sm" data-action="edit-presentation" data-slug="${Utils.escapeHtml(m.slug || '')}">Editar presentación</button>
              <button class="btn-sm warn" data-action="delete" data-id="${Utils.escapeHtml(m._id || '')}">Eliminar</button>
            </td>
          </tr>
        `).join('');
      })
      .catch(err => {
        console.error('[Mentors] load error', err);
        tbody.innerHTML = `
          <tr>
            <td colspan="3" style="padding:8px;color:#cdbb9a;">
              No se pudieron cargar los mentores
            </td>
          </tr>
        `;
      });

    // Navegar a perfil y acciones
    tbody?.addEventListener('click', async (ev) => {
      const btn = ev.target.closest('button');
      if (!btn) return;
      const tr = btn.closest('tr');
      const id = tr?.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      if (action === 'view') {
        const slug = btn.getAttribute('data-slug');
        if (slug) Router.navigate(`/maestro/${slug}`);
      } else if (action === 'edit-dashboard') {
        editingMentorId = id || null;
        if (formTitle) formTitle.textContent = 'Editar mentor (dashboard)';
        if (submitBtn) submitBtn.textContent = 'Actualizar';
        // Fetch current mentor details from Mongo by slug
        try {
          const codeEl = tr?.querySelector('code');
          const slug = codeEl ? String(codeEl.textContent || '').trim() : '';
          editingMentorSlugOriginal = slug || null;
          const token = localStorage.getItem('mwi:token') || '';
          if (slug) {
            const res = await fetch(`${base}/admin/mentors/${slug}`, { headers: { Authorization: 'Bearer ' + token } });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data && data.mentor) {
              const m = data.mentor;
              // Fill form fields
              if (nameEl) nameEl.value = String(m.name || '');
              if (slugEl) slugEl.value = String(m.slug || '');
              if (emailEl) emailEl.value = String(m.email || '');
              mentorPhotoUrl = String(m.photoUrl || '');
              if (mentorPhotoUrl) {
                if (photoImg && photoPreview) {
                  photoImg.src = mentorPhotoUrl;
                  photoImg.style.display = 'block';
                  const span = photoPreview.querySelector('span');
                  if (span) span.style.display = 'none';
                }
              } else {
                // Reset preview
                if (photoImg) { photoImg.src = ''; photoImg.style.display = 'none'; }
                const span = photoPreview?.querySelector('span');
                if (span) span.style.display = 'inline';
              }
            }
          }
        } catch (e) { console.error('[Mentor edit fetch]', e); }
      } else if (action === 'edit-presentation') {
        const slug = btn.getAttribute('data-slug');
        if (slug) Router.navigate(`/admin/mentor/${slug}`);
      } else if (action === 'delete') {
        if (!id) return;
        Utils.showConfirm(
          '¿Deseas eliminar este mentor? Esta acción no se puede deshacer.',
          'Confirmar eliminación',
          async () => {
            try {
              const res = await fetch(`${base}/admin/mentors/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
              });
              if (!res.ok) throw new Error();
              Utils.showSuccess('Mentor eliminado');
              Router.reload();
            } catch (e) {
              Utils.showError('No se pudo eliminar');
            }
          },
          () => { /* cancel */ }
        );
      }
    });

    // Foto por URL: mantener diseño, cambiar lógica
    photoBtn?.addEventListener('click', () => {
      const inputUrl = prompt('Pega la URL de la imagen del mentor');
      if (!inputUrl) return;
      const url = String(inputUrl).trim();
      if (!/^https?:\/\//i.test(url)) { Utils.showError('Ingresa una URL válida http(s)'); return; }
      mentorPhotoUrl = url;
      if (photoImg && photoPreview) {
        photoImg.src = mentorPhotoUrl;
        photoImg.style.display = 'block';
        const span = photoPreview.querySelector('span');
        if (span) span.style.display = 'none';
      }
      saveDraft();
    });

    // Guardar nuevo mentor en Mongo
    form?.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const name = (nameEl?.value || '').trim();
      let slug = (slugEl?.value || '').trim();
      const email = (emailEl?.value || '').trim();
      if (!name) { Utils.showError('Ingresa el nombre del mentor'); return; }
      if (!slug) {
        slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      const payload = {
        name,
        slug,
        email,
        photoUrl: mentorPhotoUrl || '',
        specialty: '',
        quote: '',
        bio: '',
        learningPoints: [],
        achievements: [],
        videoUrl: '',
        assignedMasterIds: [],
        isActive: true
      };
      try {
        const token = localStorage.getItem('mwi:token') || '';
        let res;
        if (editingMentorId && editingMentorSlugOriginal) {
          // Update existing
          res = await fetch(`${base}/admin/mentors/${editingMentorSlugOriginal}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(payload)
          });
        } else {
          // Create new
          res = await fetch(`${base}/admin/mentors`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(payload)
          });
        }
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data && data.message ? data.message : 'Error');
        Utils.showSuccess(editingMentorId ? 'Mentor actualizado' : 'Mentor creado');
        clearDraft();
        // Reset editing state
        editingMentorId = null; editingMentorSlugOriginal = null;
        if (formTitle) formTitle.textContent = 'Añadir mentor';
        if (submitBtn) submitBtn.textContent = 'Guardar';
        Router.reload();
      } catch (err) {
        console.error('[Create mentor]', err);
        Utils.showError('No se pudo guardar el mentor');
      }
    });

    document.getElementById('mentor-cancel')?.addEventListener('click', () => {
      nameEl && (nameEl.value = '');
      slugEl && (slugEl.value = '');
      try {
        mentorPhotoUrl = '';
        if (photoImg) { photoImg.src = ''; photoImg.style.display = 'none'; }
        const span = photoPreview?.querySelector('span');
        if (span) span.style.display = 'inline';
      } catch (e) {}
      editingMentorId = null;
      if (formTitle) formTitle.textContent = 'Añadir mentor';
      if (submitBtn) submitBtn.textContent = 'Guardar';
      clearDraft();
    });

    // Persist changes while typing
    nameEl?.addEventListener('input', saveDraft);
    slugEl?.addEventListener('input', saveDraft);
    emailEl?.addEventListener('input', saveDraft);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminMentorsPage;
}

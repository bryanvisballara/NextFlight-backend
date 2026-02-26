/**
 * PÁGINA: EDITAR PERFIL DE MENTOR
 * Ruta admin: /admin/mentor/:slug
 * Permite editar textos del perfil y subir el video de presentación.
 */

const AdminMentorEditPage = {
  render(slug) {
    if (!AuthManager.isAdmin()) { Router.navigate('/'); return ''; }
    const mastersOptions = `<div style="color:#cdbb9a;">Cargando masters…</div>`;

    return `
      ${Sidebar.render()}
      <div class="main-content" style="padding:16px;">
        <div class="content-header">
          <h1>Editar página de mentor</h1>
          <p>Plantilla pública: <a href="#/maestro/${slug}" target="_blank" rel="noopener noreferrer">#/maestro/${slug}</a></p>
        </div>

        <form id="mentor-edit-form" autocomplete="off" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
          <style>
            .am-field label { display:block; color:#cdbb9a; margin-bottom:6px; font-weight:700; }
            .am-input, .am-textarea { width:100%; padding:10px 12px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#0f0f0f; color:#f6e9c9; }
            .am-input::placeholder, .am-textarea::placeholder { color:#9f8e6a; opacity:.8; }
            .am-input:focus, .am-textarea:focus { outline:none; border-color: rgba(212,169,85,.55); box-shadow: 0 0 0 3px rgba(212,169,85,.12); }
            .btn-gold { appearance:none; border:none; padding:10px 14px; border-radius:8px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
            .btn-outline { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 14px; border-radius:8px; font-weight:700; }
            /* Masters impartidos list: align checkbox and text */
            #m-assigned-list { position:relative; }
            #m-assigned-list .am-item { display:grid; grid-template-columns: 22px 1fr; align-items:center; column-gap:10px; padding:6px 8px; }
            #m-assigned-list .am-item input[type="checkbox"] { width:18px; height:18px; }
            #m-assigned-list .am-item .title { color:#e8dcc0; text-align:left; line-height:1.4; }
          </style>
          <h3 style="color:#f6e9c9;margin:6px 0 12px;">Hero</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="am-field">
              <label>Nombre</label>
              <input id="m-name" class="am-input" type="text" placeholder="Nombre visible del mentor" value="" />
            </div>
            <div class="am-field">
              <label>Rol</label>
              <input id="m-role" class="am-input" type="text" placeholder="Rol (ej: Mentor — MWI)" value="Mentor — MWI" />
            </div>
            <div class="am-field">
              <label>Especialidad</label>
              <input id="m-specialty" class="am-input" type="text" placeholder="Especialidad principal" value="" />
            </div>
            <div class="am-field">
              <label>Frase</label>
              <input id="m-quote" class="am-input" type="text" placeholder="Frase o cita corta" value="" />
            </div>
            <div class="am-field" style="grid-column:1 / -1;">
              <label>Instagram</label>
              <input id="m-instagram" class="am-input" type="url" placeholder="https://www.instagram.com/usuario" value="" />
            </div>
          </div>

          <h3 style="color:#f6e9c9;margin:12px 0 8px;">Presentación</h3>
          <textarea id="m-bio" rows="6" class="am-textarea" placeholder="Biografía / presentación"></textarea>

          <h3 style="color:#f6e9c9;margin:12px 0 8px;">Qué aprenderás (bullets)</h3>
          <textarea id="m-bullets" rows="6" class="am-textarea" placeholder="Una línea por punto"></textarea>

          <h3 style="color:#f6e9c9;margin:12px 0 8px;">Video de presentación</h3>
          <div style="display:grid;grid-template-columns:1fr;gap:10px;align-items:center;">
            <input id="m-video-url" class="am-input" type="text" placeholder="URL de YouTube o Vimeo (opcional)" value="" />
            <div style="color:#cdbb9a;font-size:12px;">Pega un enlace público de YouTube o Vimeo y se mostrará una vista previa embebida.</div>
          </div>
          <div id="m-video-preview-container" style="margin-top:8px;"></div>

          <h3 style="color:#f6e9c9;margin:12px 0 8px;">Logros & Autoridad (cards)</h3>
          <p style="color:#cdbb9a;margin:0 0 8px;">Escribe un logro por línea en el formato: <strong>valor / etiqueta</strong>. Ejemplo: <em>+USD $1.000.000 / Ventas gestionadas</em></p>
          <textarea id="m-achievements" rows="5" class="am-textarea" placeholder="valor / etiqueta"></textarea>

          <h3 style="color:#f6e9c9;margin:12px 0 8px;">Masters impartidos por este Maestro</h3>
          <div id="m-assigned-list" style="background:#141212;border:1px solid rgba(212,169,85,.12);border-radius:8px;padding:8px;">
            ${mastersOptions}
          </div>

          <div style="margin-top:12px;display:flex;gap:10px;">
            <button type="submit" class="btn-gold">Guardar cambios</button>
            <button type="button" id="m-cancel" class="btn-outline">Volver</button>
          </div>
        </form>
      </div>
    `;
  },

  init(slug) {
    if (!AuthManager.isAdmin()) return;
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    let assignedSet = new Set();
    const markAssigned = () => {
      document.querySelectorAll('#m-assigned-list input[type="checkbox"]').forEach(cb => {
        if (assignedSet.has(cb.dataset.id)) cb.checked = true;
      });
    };
    fetch(`${base}/admin/mentors/${slug}`, {
      headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
    })
      .then(async resp => {
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error');
        return data.mentor || {};
      })
      .then(m => {
        // Fill inputs
        document.getElementById('m-name').value = m.name || '';
        document.getElementById('m-role').value = m.role || 'Mentor — MWI';
        document.getElementById('m-specialty').value = m.specialty || '';
        document.getElementById('m-quote').value = m.quote || '';
        document.getElementById('m-bio').value = m.bio || '';
        document.getElementById('m-video-url').value = m.videoUrl || '';
        document.getElementById('m-instagram').value = m.instagramUrl || '';
        // learningPoints → textarea
        document.getElementById('m-bullets').value = Array.isArray(m.learningPoints) ? m.learningPoints.join('\n') : '';
        // achievements → textarea
        document.getElementById('m-achievements').value = Array.isArray(m.achievements)
          ? m.achievements.map(a => `${(a.title||'').trim()} / ${(a.subtitle||'').trim()}`).join('\n')
          : '';
        // assigned masters
        assignedSet = new Set(m.assignedMasterIds || []);
        markAssigned();

        // Setup video preview listener
        const vUrlEl = document.getElementById('m-video-url');
        const pvCont = document.getElementById('m-video-preview-container');
        const toEmbedUrl = (raw) => {
          const u = String(raw || '').trim();
          if (!u) return '';
          try {
            const parsed = new URL(u);
            const host = parsed.hostname.replace(/^www\./, '');
            if (host.includes('youtu.be')) {
              const id = parsed.pathname.split('/').filter(Boolean)[0];
              return id ? `https://www.youtube.com/embed/${id}` : '';
            }
            if (host.includes('youtube.com')) {
              const id = parsed.searchParams.get('v');
              if (id) return `https://www.youtube.com/embed/${id}`;
              const m = parsed.pathname.match(/\/embed\/([^\/\?]+)/);
              if (m) return `https://www.youtube.com/embed/${m[1]}`;
            }
            if (host.includes('vimeo.com')) {
              const pathParts = parsed.pathname.split('/').filter(Boolean);
              let id = pathParts.find(p => /^(\d+)$/.test(p));
              if (!id) {
                const m = parsed.pathname.match(/\/video\/(\d+)/);
                id = m ? m[1] : null;
              }
              return id ? `https://player.vimeo.com/video/${id}` : '';
            }
            return '';
          } catch { return ''; }
        };
        const updatePreview = (url) => {
          if (!pvCont) return;
          const embed = toEmbedUrl(url);
          if (embed) {
            pvCont.innerHTML = `<div style="position:relative;padding-top:56.25%;background:#0f0f0f;border:1px solid rgba(212,169,85,.18);border-radius:8px;"><iframe src="${Utils.escapeHtml(embed)}" title="Video" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
          } else {
            pvCont.innerHTML = url ? `<div style="color:#cdbb9a;">No se pudo generar la vista previa embebida. Se guardará el enlace.</div>` : '';
          }
        };
        updatePreview(m.videoUrl || '');
        vUrlEl && vUrlEl.addEventListener('input', () => updatePreview(vUrlEl.value));
      })
      .catch(err => {
        console.error('[AdminMentorEdit] load error', err);
        Utils.showError('No se pudo cargar el mentor');
        Router.navigate('/admin/mentors');
      });

    // Fetch masters from Mongo and populate options
    const mastersContainer = document.getElementById('m-assigned-list');
    fetch(`${base}/admin/masters`, {
      headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
    })
      .then(async r => {
        const data = await r.json().catch(() => ({}));
        const masters = Array.isArray(data.masters) ? data.masters : [];
        mastersContainer.innerHTML = masters.map(ms => `
          <label class="am-item">
            <input type="checkbox" data-id="${Utils.escapeHtml(ms._id)}" />
            <span class="title">${Utils.escapeHtml(ms.title || ms.slug || ms._id)}</span>
          </label>
        `).join('');
        markAssigned();
      })
      .catch(() => { mastersContainer.innerHTML = '<div style="color:#cdbb9a;">No se pudieron cargar los masters</div>'; });

    const vUrlEl = document.getElementById('m-video-url');
    const pvCont = document.getElementById('m-video-preview-container');

    // Vista previa embebida para YouTube/Vimeo
    const toEmbedUrl = (raw) => {
      const u = String(raw || '').trim();
      if (!u) return '';
      try {
        const parsed = new URL(u);
        const host = parsed.hostname.replace(/^www\./, '');
        if (host.includes('youtu.be')) {
          const id = parsed.pathname.split('/').filter(Boolean)[0];
          return id ? `https://www.youtube.com/embed/${id}` : '';
        }
        if (host.includes('youtube.com')) {
          const id = parsed.searchParams.get('v');
          if (id) return `https://www.youtube.com/embed/${id}`;
          const m = parsed.pathname.match(/\/embed\/([^\/\?]+)/);
          if (m) return `https://www.youtube.com/embed/${m[1]}`;
        }
        if (host.includes('vimeo.com')) {
          const pathParts = parsed.pathname.split('/').filter(Boolean);
          let id = pathParts.find(p => /^(\d+)$/.test(p));
          if (!id) {
            const m = parsed.pathname.match(/\/video\/(\d+)/);
            id = m ? m[1] : null;
          }
          return id ? `https://player.vimeo.com/video/${id}` : '';
        }
        return '';
      } catch { return ''; }
    };
    const updatePreview = (url) => {
      if (!pvCont) return;
      const embed = toEmbedUrl(url);
      if (embed) {
        pvCont.innerHTML = `<div style="position:relative;padding-top:56.25%;background:#0f0f0f;border:1px solid rgba(212,169,85,.18);border-radius:8px;"><iframe src="${Utils.escapeHtml(embed)}" title="Video" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      } else {
        pvCont.innerHTML = url ? `<div style="color:#cdbb9a;">No se pudo generar la vista previa embebida. Se guardará el enlace.</div>` : '';
      }
    };
    if (vUrlEl) {
      updatePreview(vUrlEl.value);
      vUrlEl.addEventListener('input', () => updatePreview(vUrlEl.value));
    }

    const form = document.getElementById('mentor-edit-form');
    form && form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: (document.getElementById('m-name')?.value || '').trim(),
        role: (document.getElementById('m-role')?.value || '').trim(),
        specialty: (document.getElementById('m-specialty')?.value || '').trim(),
        quote: (document.getElementById('m-quote')?.value || '').trim(),
        bio: (document.getElementById('m-bio')?.value || '').trim(),
        videoUrl: (document.getElementById('m-video-url')?.value || '').trim(),
        instagramUrl: (document.getElementById('m-instagram')?.value || '').trim(),
        learningPoints: (document.getElementById('m-bullets')?.value || '').split(/\n/).map(s => s.trim()).filter(Boolean),
        achievements: (document.getElementById('m-achievements')?.value || '').split(/\n/)
          .map(line => {
            const [title, ...rest] = line.split('/');
            return { title: (title||'').trim(), subtitle: rest.join('/').trim() };
          })
          .filter(a => a.title || a.subtitle),
        assignedMasterIds: Array.from(document.querySelectorAll('#m-assigned-list input[type="checkbox"]:checked'))
          .map(cb => cb.dataset.id)
      };
      try {
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const resp = await fetch(`${base}/admin/mentors/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '')
          },
          body: JSON.stringify(payload)
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error');
        Utils.showSuccess('Perfil de mentor actualizado');
        Router.navigate('/admin/mentors');
      } catch (err) {
        console.error('[Mentor save]', err);
        Utils.showError('No se pudo guardar el mentor');
      }
    });

    document.getElementById('m-cancel')?.addEventListener('click', () => Router.navigate('/admin/mentors'));
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminMentorEditPage;
}

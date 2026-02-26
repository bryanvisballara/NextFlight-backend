/**
 * PÁGINA: GEento TIÓN DE USUARIOS (ADMIN)
 * 
 * Gestión de usuarios para administradores.
 */

const AdminUsersPage = {
  /**
   * Renderiza la página de gestión de usuarios
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') {
      Router.navigate('/');
      return '';
    }
    // Ya no mostramos usuarios mock locales; los cargamos desde MongoDB vía backend
    // Lista de masters de interés basada exactamente en MastersPage.js
    const mastersList = [
      { title: 'Amazon Seller Master' },
      { title: 'eBay Seller Hub Master' },
      { title: 'Top Seller Mercado Libre Master' },
      { title: 'SHEIN Seller Master' },
      { title: 'Gestión de Capital en Mercados Financieros Master' },
      { title: 'Cripto Arbitrage Master' },
      { title: 'Operación, Dirección y Gestión Empresarial Master' },
      { title: 'Vida con Propósito Master' },
      { title: 'Social Media Top Seller Master' }
    ].map(m => ({ title: m.title, key: m.title.toLowerCase() }));
    const half = Math.ceil(mastersList.length / 2);
    const mastersCol1 = mastersList.slice(0, half);
    const mastersCol2 = mastersList.slice(half);
    const masterCol1HTML = mastersCol1.map(({ title, key }) =>
      `<button class="filter-item" onclick="AdminUsersSelectFilter('master:${key}')" style="padding:6px 10px; font-size:12px; display:block; width:100%; text-align:left; background:transparent; border:1px solid rgba(255,255,255,0.08); color:#efe6d6; border-radius:6px;">${title}</button>`
    ).join('');
    const masterCol2HTML = mastersCol2.map(({ title, key }) =>
      `<button class="filter-item" onclick="AdminUsersSelectFilter('master:${key}')" style="padding:6px 10px; font-size:12px; display:block; width:100%; text-align:left; background:transparent; border:1px solid rgba(255,255,255,0.08); color:#efe6d6; border-radius:6px;">${title}</button>`
    ).join('');

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>👥 Gestión de Usuarios</h1>
          <p>Administra usuarios y sus accesos a masters</p>
        </div>

        <div class="admin-users-content">
          <div class="users-toolbar" style="display:flex; flex-direction:column; gap:8px; align-items:stretch; margin-bottom:10px; position:relative;">
            <input id="admin-user-search" type="text" placeholder="Buscar por email" oninput="AdminUsersApplyFilters()" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:#151515; color:#efe6d6;" />
            <div class="users-filters" style="display:flex; gap:6px;">
              <button id="filters-toggle" class="btn btn-small" onclick="AdminUsersFiltersToggle()" style="padding:6px 10px; font-size:12px; display:flex; align-items:center; gap:6px;">🔎 Filtros</button>
              <button id="export-xlsx" class="btn btn-small" onclick="AdminUsersExportXLSX()" style="padding:6px 10px; font-size:12px; display:flex; align-items:center; gap:6px;">⬇️ Descargar XLSX</button>
            </div>
            <div id="filters-menu" class="filters-menu" style="display:none; width:100%; margin-top:4px; background:#0e0e0d; border:1px solid rgba(212,169,85,.22); border-radius:8px; padding:10px;">
              <div style="display:grid; grid-template-columns: minmax(220px, 1fr) 1fr 1fr; gap:8px; align-items:start;">
                <div>
                  <button class="filter-item" onclick="AdminUsersSelectFilter('all')" style="padding:6px 10px; font-size:12px; display:block; width:100%; text-align:left; background:transparent; border:1px solid rgba(255,255,255,0.08); color:#efe6d6; border-radius:6px;">Todos</button>
                  <div style="height:1px; background:rgba(255,255,255,0.08); margin:6px 0;"></div>
                  <div style="font-size:11px; color:#cdbb9a; padding:2px 4px;">ESTADO DE MEMBRESÍA</div>
                  <button class="filter-item" onclick="AdminUsersSelectFilter('active')" style="padding:6px 10px; font-size:12px; display:block; width:100%; text-align:left; background:transparent; border:1px solid rgba(255,255,255,0.08); color:#efe6d6; border-radius:6px;">Activo</button>
                  <button class="filter-item" onclick="AdminUsersSelectFilter('inactive')" style="padding:6px 10px; font-size:12px; display:block; width:100%; text-align:left; background:transparent; border:1px solid rgba(255,255,255,0.08); color:#efe6d6; border-radius:6px;">NO activo</button>
                </div>
                <div>
                  <div style="font-size:11px; color:#cdbb9a; padding:2px 4px;">MASTERS DE INTERÉS</div>
                  ${masterCol1HTML}
                </div>
                <div>
                  ${masterCol2HTML}
                </div>
              </div>
            </div>
          </div>
          <div class="users-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Resetear contraseña</th>
                  <th>Estado membresía</th>
                  <th>Master de interés</th>
                  <th>Fecha registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="admin-users-tbody">
                <tr>
                  <td colspan="8" style="text-align:center; color:#cdbb9a;">Cargando usuarios...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una fila de usuario
   */
  renderUserRow(userItem) {
    const registeredDate = Utils.formatDate(userItem.registeredAt || new Date().toISOString(), 'short');
    const membershipText = userItem.isPaid ? 'Activo' : 'NO activo';
    const membershipClass = userItem.isPaid ? 'status-active' : 'status-inactive';
    const masterInterest = userItem.masterInterest || '—';

    return `
      <tr data-email="${(userItem.email||'').toLowerCase()}" data-active="${userItem.isPaid ? '1' : '0'}" data-master="${String(masterInterest).toLowerCase()}">
        <td>${userItem.firstName} ${userItem.lastName}</td>
        <td>${userItem.email}</td>
        <td>${userItem.phone || '—'}</td>
        <td><button class="btn btn-small" style="font-size:10px; padding:5px 8px; line-height:1.1;" onclick="openResetPasswordModal('${userItem.id}')">Resetear contraseña</button></td>
        <td><span class="status-badge ${membershipClass}">${membershipText}</span></td>
        <td>${masterInterest}</td>
        <td>${registeredDate}</td>
        <td>
          <button class="btn btn-small btn-primary" onclick="openUserModal('${userItem.id}')">Modificar</button>
        </td>
      </tr>
    `;
  },

  // Renderiza una fila desde el backend (no-admin)
  renderRemoteRow(remoteUser) {
    const name = remoteUser.name || '';
    const parts = name.split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    const registeredDate = Utils.formatDate(remoteUser.createdAt || new Date().toISOString(), 'short');
    const membershipText = remoteUser.isPaid ? 'Activo' : 'NO activo';
    const membershipClass = remoteUser.isPaid ? 'status-active' : 'status-inactive';
    const masterInterest = remoteUser.interestMaster || '—';
    const emailLc = (remoteUser.email || '').toLowerCase();
    return `
      <tr data-email="${emailLc}" data-active="${remoteUser.isPaid ? '1' : '0'}" data-master="${String(masterInterest).toLowerCase()}">
        <td>${firstName} ${lastName}</td>
        <td>${remoteUser.email}</td>
        <td>${remoteUser.phone || '—'}</td>
        <td><button class="btn btn-small" style="font-size:10px; padding:5px 8px; line-height:1.1;" onclick="openResetPasswordModal('${remoteUser._id}')">Resetear contraseña</button></td>
        <td><span class="status-badge ${membershipClass}">${membershipText}</span></td>
        <td>${masterInterest}</td>
        <td>${registeredDate}</td>
        <td>
          <button class="btn btn-small btn-primary" onclick="openUserModalByEmail('${emailLc}')">Modificar</button>
        </td>
      </tr>
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    try {
      const search = document.getElementById('admin-user-search');
      const tbody = document.getElementById('admin-users-tbody');
      const applyFilters = () => {
        const q = (search?.value || '').toLowerCase();
        const state = (window.AdminUsersFilterState || 'all');
        Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
          const email = tr.getAttribute('data-email') || '';
          const active = tr.getAttribute('data-active') === '1';
          const master = (tr.getAttribute('data-master') || '').toLowerCase();
          let show = true;
          if (state === 'inactive') show = !active;
          else if (state === 'active') show = active;
          else if (state && String(state).startsWith('master:')) {
            const target = String(state).slice(7);
            show = !!target ? (master === target || master.includes(target)) : true;
          }
          if (q && !email.includes(q)) show = false;
          tr.style.display = show ? '' : 'none';
        });
      };
      window.AdminUsersFilterState = window.AdminUsersFilterState || 'all';
      search?.addEventListener('input', applyFilters);

      // Intentar cargar usuarios desde el backend si hay JWT válido
      (async () => {
        try {
          const token = localStorage.getItem('mwi:token');
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'http://127.0.0.1:5050';
          if (!token) return;
          const meRes = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
          if (!meRes.ok) return;
          const res = await fetch(`${base}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json().catch(() => ({}));
          if (res.ok && Array.isArray(data.users)) {
            const rows = data.users.map(u => AdminUsersPage.renderRemoteRow(u)).join('');
            tbody.innerHTML = rows;
            window.AdminUsersFilterState = 'all';
            applyFilters();
          } else {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#cdbb9a;">No se pudieron cargar los usuarios</td></tr>`;
          }
        } catch {
          try {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#cdbb9a;">No se pudieron cargar los usuarios</td></tr>`;
          } catch {}
        }
      })();
    } catch (e) {}
  }
};

// Modal para resetear contraseña por userId
function openResetPasswordModal(userId) {
  try { const existing = document.getElementById('resetPasswordModal'); if (existing) existing.remove(); } catch {}
  const modalHTML = `
    <div id="resetPasswordModal" class="mwi-modal" aria-hidden="false">
      <style>
        .mwi-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .mwi-modal .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); }
        .mwi-modal .box { position: relative; width: 94%; max-width: 540px; background: #0e0e0d; border: 1px solid rgba(212,169,85,.22); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.7); padding: 16px; color: #efe6d6; z-index: 10000; }
        .mwi-modal .box header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .mwi-modal .box header h2 { margin: 0; font-weight: 800; color: #f6e9c9; font-size: 18px; }
        .mwi-modal .box header button { appearance: none; border: none; background: transparent; color: #d4a955; font-size: 22px; cursor: pointer; }
        .mwi-modal .group { margin-bottom: 12px; }
        .mwi-modal label { display:block; margin-bottom: 6px; color: #cdbb9a; font-size: 13px; }
        .mwi-modal input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(212,169,85,.22); background: #141212; color: #efe6d6; }
        .mwi-modal .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
        .mwi-modal .btn { appearance: none; border: none; padding: 10px 14px; border-radius: 8px; font-weight: 800; letter-spacing: .3px; color: #2a1f0b; background: linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border: 1px solid rgba(209,161,86,.95); }
        .mwi-modal .btn.secondary { background: transparent; color: #d4a955; border: 1px solid rgba(209,161,86,.55); box-shadow: none; }
      </style>
      <div class="overlay" data-close="true"></div>
      <div class="box" role="dialog" aria-modal="true">
        <header>
          <h2>Resetear contraseña</h2>
          <button aria-label="Cerrar" data-close="true">×</button>
        </header>
        <div class="group">
          <label>Contraseña temporal</label>
          <input id="tempPasswordInput" type="text" placeholder="Escribe una contraseña temporal" />
        </div>
        <div class="actions">
          <button class="btn secondary" data-close="true">Cancelar</button>
          <button id="resetConfirmBtn" data-user-id="${userId}" type="button" class="btn">Confirmar</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  try { document.body.style.overflow = 'hidden'; } catch {}
  const modal = document.getElementById('resetPasswordModal');
  modal?.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { closeResetPasswordModal(); return; }
  });
  try {
    const btn = modal?.querySelector('#resetConfirmBtn');
    if (btn) btn.addEventListener('click', () => confirmResetPassword(userId));
  } catch {}
}

async function confirmResetPassword(userId) {
  try {
    const input = document.getElementById('tempPasswordInput');
    const tempPassword = (input && input.value ? input.value.trim() : '');
    if (!tempPassword) { Utils.showError('Debes ingresar una contraseña temporal'); return; }
    const token = (typeof AuthManager !== 'undefined' && AuthManager.getToken) ? AuthManager.getToken() : localStorage.getItem('mwi:token');
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'http://127.0.0.1:5050';
    if (!token) { Utils.showError('Sesión inválida. Inicia sesión como administrador.'); return; }
    const updRes = await fetch(`${base}/admin/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId, tempPassword })
    }).catch(() => null);
    const data = updRes ? await updRes.json().catch(() => ({})) : {};
    if (updRes && updRes.ok) {
      try { Utils.showSuccess('Contraseña reseteada. El usuario deberá cambiarla al iniciar sesión.'); } catch {}
      closeResetPasswordModal();
    } else {
      Utils.showError(data?.message || 'No se pudo resetear la contraseña');
    }
  } catch (e) {
    Utils.showError('Error de red al contactar el backend');
  }
}

function closeResetPasswordModal() {
  const modal = document.getElementById('resetPasswordModal');
  if (modal) { modal.remove(); }
  try { document.body.style.overflow = ''; } catch {}
}

/**
 * Función global para abrir modal de gestión de usuario
 */
function openUserModal(userId) {
  // Clean any previous modal
  try { const existing = document.getElementById('userModal'); if (existing) existing.remove(); } catch {}

  const user = StorageManager.getAllUsers().find(u => u.id === userId);
  if (!user) { Utils.showError('Usuario no encontrado'); return; }

  const modalHTML = `
    <div id="userModal" class="mwi-modal" aria-hidden="false">
      <style>
        .mwi-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .mwi-modal .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); }
        .mwi-modal .box { position: relative; width: 94%; max-width: 720px; background: #0e0e0d; border: 1px solid rgba(212,169,85,.22); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.7); padding: 16px; color: #efe6d6; z-index: 10000; }
        .mwi-modal .box header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .mwi-modal .box header h2 { margin: 0; font-weight: 800; color: #f6e9c9; font-size: 18px; }
        .mwi-modal .box header button { appearance: none; border: none; background: transparent; color: #d4a955; font-size: 22px; cursor: pointer; }
        .mwi-modal .group { margin-bottom: 12px; }
        .mwi-modal label { display:block; margin-bottom: 6px; color: #cdbb9a; font-size: 13px; }
        .mwi-modal input, .mwi-modal select { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(212,169,85,.22); background: #141212; color: #efe6d6; }
        .mwi-modal .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
        .mwi-modal .btn { appearance: none; border: none; padding: 10px 14px; border-radius: 8px; font-weight: 800; letter-spacing: .3px; color: #2a1f0b; background: linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border: 1px solid rgba(209,161,86,.95); }
        .mwi-modal .btn.secondary { background: transparent; color: #d4a955; border: 1px solid rgba(209,161,86,.55); box-shadow: none; }
      </style>
      <div class="overlay" data-close="true"></div>
      <div class="box" role="dialog" aria-modal="true">
        <header>
          <h2>Gestionar Usuario: ${user.firstName} ${user.lastName}</h2>
          <button aria-label="Cerrar" data-close="true">×</button>
        </header>
        <div class="group">
          <label>Estado de membresía</label>
          <select id="edit-membership">
                    <option value="active" ${user.isPaid ? 'selected' : ''}>Activo</option>
                    <option value="inactive" ${!user.isPaid ? 'selected' : ''}>NO activo</option>
          </select>
        </div>
        <div class="actions">
          <button class="btn secondary" data-close="true">Cancelar</button>
          <button id="userModalSave" data-user-id="${user.id}" type="button" class="btn" onclick="saveUserEdits('${user.id}')">Guardar</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  try { document.body.style.overflow = 'hidden'; } catch {}
  const modal = document.getElementById('userModal');
  modal?.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { closeUserModal(); return; }
    try {
      const el = t && t.id ? t : null;
      if (el && el.id === 'userModalSave') { saveUserEdits(user.id); }
    } catch {}
  });
  try {
    const saveBtn = modal?.querySelector('#userModalSave');
    if (saveBtn) saveBtn.addEventListener('click', () => saveUserEdits(user.id));
  } catch {}
}

// Abrir modal por email (para filas del backend)
function openUserModalByEmail(email) {
  try { const existing = document.getElementById('userModal'); if (existing) existing.remove(); } catch {}
  const emailLc = (email || '').toLowerCase();
  const users = StorageManager.getAllUsers();
  let user = users.find(u => (u.email || '').toLowerCase() === emailLc);
  if (!user) {
    // Crear usuario temporal solo para visualizar datos en el modal
    const local = emailLc.split('@')[0] || 'Usuario';
    user = {
      id: `temp-${Date.now()}`,
      email: emailLc,
      firstName: local,
      lastName: '',
      isPaid: false,
      password: ''
    };
  }

  const modalHTML = `
    <div id="userModal" class="mwi-modal" aria-hidden="false">
      <style>
        .mwi-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .mwi-modal .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); }
        .mwi-modal .box { position: relative; width: 94%; max-width: 720px; background: #0e0e0d; border: 1px solid rgba(212,169,85,.22); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.7); padding: 16px; color: #efe6d6; z-index: 10000; }
        .mwi-modal .box header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .mwi-modal .box header h2 { margin: 0; font-weight: 800; color: #f6e9c9; font-size: 18px; }
        .mwi-modal .box header button { appearance: none; border: none; background: transparent; color: #d4a955; font-size: 22px; cursor: pointer; }
        .mwi-modal .group { margin-bottom: 12px; }
        .mwi-modal label { display:block; margin-bottom: 6px; color: #cdbb9a; font-size: 13px; }
        .mwi-modal input, .mwi-modal select { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid rgba(212,169,85,.22); background: #141212; color: #efe6d6; }
        .mwi-modal .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
        .mwi-modal .btn { appearance: none; border: none; padding: 10px 14px; border-radius: 8px; font-weight: 800; letter-spacing: .3px; color: #2a1f0b; background: linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border: 1px solid rgba(209,161,86,.95); }
        .mwi-modal .btn.secondary { background: transparent; color: #d4a955; border: 1px solid rgba(209,161,86,.55); box-shadow: none; }
      </style>
      <div class="overlay" data-close="true"></div>
      <div class="box" role="dialog" aria-modal="true">
        <header>
          <h2>Gestionar Usuario: ${user.firstName} ${user.lastName}</h2>
          <button aria-label="Cerrar" data-close="true">×</button>
        </header>
        <div class="group">
          <label>Estado de membresía</label>
          <select id="edit-membership">
                    <option value="active" ${user.isPaid ? 'selected' : ''}>Activo</option>
                    <option value="inactive" ${!user.isPaid ? 'selected' : ''}>NO activo</option>
          </select>
        </div>
        <div class="actions">
          <button class="btn secondary" data-close="true">Cancelar</button>
          <button id="userModalSaveByEmail" data-email="${emailLc}" type="button" class="btn" onclick="saveUserEditsByEmail('${emailLc}')">Guardar</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  try { document.body.style.overflow = 'hidden'; } catch {}
  const modal = document.getElementById('userModal');
  modal?.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { closeUserModal(); return; }
    try {
      const el = t && t.id ? t : null;
      if (el && el.id === 'userModalSaveByEmail') { saveUserEditsByEmail(emailLc); }
    } catch {}
  });
  try {
    const saveBtn = modal?.querySelector('#userModalSaveByEmail');
    if (saveBtn) saveBtn.addEventListener('click', () => saveUserEditsByEmail(emailLc));
  } catch {}
}

// Guardar cambios por email (backend-first)
async function saveUserEditsByEmail(email) {
  const users = StorageManager.getAllUsers();
  const lc = (email || '').toLowerCase();
  let user = users.find(u => (u.email || '').toLowerCase() === lc);
  const membEl = document.getElementById('edit-membership');
  const membVal = (membEl && membEl.value) || 'inactive';

  try { Utils.showSuccess('Guardando cambios...'); } catch {}

  let backendMembershipUpdated = false;
  try {
    const token = localStorage.getItem('mwi:token');
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'http://127.0.0.1:5050';
    // Update membership (isPaid) on backend
    const desiredPaid = membVal === 'active';
    if (!token) {
      Utils.showError('Sesión inválida. Inicia sesión como administrador en el servidor.');
    } else {
      const meRes2 = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
      if (!meRes2 || !meRes2.ok) {
        Utils.showError('Token inválido. Vuelve a iniciar sesión como administrador.');
      } else {
        const membRes = await fetch(`${base}/admin/users/by-email/membership`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email: lc, isPaid: desiredPaid })
        }).catch(() => null);
        if (membRes && membRes.ok) {
          backendMembershipUpdated = true;
          try { Utils.showSuccess('Membresía actualizada en backend'); } catch {}
        } else {
          Utils.showError('No se pudo actualizar la membresía en el backend.');
        }
      }
    }
  } catch {
    // noop
  }

  // Actualizar local únicamente tras éxito en backend
  if (user) {
    if (backendMembershipUpdated) {
      user.isPaid = membVal === 'active';
    }
    StorageManager.set(StorageManager.KEYS.USERS_DB, users);
    try {
      const row = document.querySelector(`#admin-users-tbody tr[data-email="${lc}"]`);
      const badge = row ? row.querySelector('.status-badge') : null;
      if (badge) {
        const isPaidNow = user.isPaid;
        badge.textContent = isPaidNow ? 'Activo' : 'NO activo';
        badge.classList.remove('status-active','status-inactive');
        badge.classList.add(isPaidNow ? 'status-active' : 'status-inactive');
        if (row) row.setAttribute('data-active', isPaidNow ? '1' : '0');
      }
    } catch {}
  } else {
    const newUser = {
      id: `local-${Date.now()}`,
      email: lc,
      isPaid: backendMembershipUpdated ? (membVal === 'active') : false,
      password: ''
    };
    users.push(newUser);
    StorageManager.set(StorageManager.KEYS.USERS_DB, users);
    try {
      const row = document.querySelector(`#admin-users-tbody tr[data-email="${lc}"]`);
      const badge = row ? row.querySelector('.status-badge') : null;
      if (badge) {
        const isPaidNow = newUser.isPaid;
        badge.textContent = isPaidNow ? 'Activo' : 'NO activo';
        badge.classList.remove('status-active','status-inactive');
        badge.classList.add(isPaidNow ? 'status-active' : 'status-inactive');
        if (row) row.setAttribute('data-active', isPaidNow ? '1' : '0');
      }
    } catch {}
  }

  Utils.showSuccess('Usuario actualizado');
  closeUserModal();
  // No reload needed; row updated in place
}

/**
 * Función para cerrar modal
 */
function closeUserModal() {
  const modal = document.getElementById('userModal');
  if (modal) { modal.remove(); }
  try { document.body.style.overflow = ''; } catch {}
}

// Guardar cambios de contraseña y membresía
async function saveUserEdits(userId) {
  const users = StorageManager.getAllUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return Utils.showError('Usuario no encontrado');
  const membEl = document.getElementById('edit-membership');
  const membVal = (membEl && membEl.value) || 'inactive';

  try { Utils.showSuccess('Guardando cambios...'); } catch {}

  // Try backend update first (admin-only endpoint)
  let backendMembershipUpdated = false;
  try {
    const token = localStorage.getItem('mwi:token');
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'http://127.0.0.1:5050';
    // Update membership (isPaid) on backend
    const desiredPaid = membVal === 'active';
    if (!token) {
      Utils.showError('Sesión inválida. Inicia sesión como administrador en el servidor.');
    } else {
      const meRes2 = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
      if (!meRes2 || !meRes2.ok) {
        Utils.showError('Token inválido. Vuelve a iniciar sesión como administrador.');
      } else {
        const membRes = await fetch(`${base}/admin/users/by-email/membership`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email: user.email, isPaid: desiredPaid })
        }).catch(() => null);
        if (membRes && membRes.ok) {
          backendMembershipUpdated = true;
          try { Utils.showSuccess('Membresía actualizada en backend'); } catch {}
        } else {
          Utils.showError('No se pudo actualizar la membresía en el backend.');
        }
      }
    }
  } catch (e) {
    // noop
  }

  // Update local only after backend success
  const lc = (user.email || '').toLowerCase();
  if (backendMembershipUpdated) {
    user.isPaid = membVal === 'active';
  }
  StorageManager.set(StorageManager.KEYS.USERS_DB, users);
  try {
    const row = document.querySelector(`#admin-users-tbody tr[data-email="${lc}"]`);
    const badge = row ? row.querySelector('.status-badge') : null;
    if (badge) {
      const isPaidNow = user.isPaid;
      badge.textContent = isPaidNow ? 'Activo' : 'NO activo';
      badge.classList.remove('status-active','status-inactive');
      badge.classList.add(isPaidNow ? 'status-active' : 'status-inactive');
      if (row) row.setAttribute('data-active', isPaidNow ? '1' : '0');
    }
  } catch {}

  Utils.showSuccess('Usuario actualizado');
  closeUserModal();
  // No reload needed; row updated in place
}

/**
 * Función para activar/desactivar usuario
 */
function toggleUserStatus(userId) {
  const allUsers = StorageManager.getAllUsers();
  const user = allUsers.find(u => u.id === userId);
  
  if (user) {
    user.active = !user.active;
    StorageManager.updateUser(user);
    Utils.showSuccess(`Usuario ${user.active ? 'activado' : 'desactivado'} correctamente`);
    closeUserModal();
  }
}

/**
 * Función para asignar/quitar acceso a master
 */
function toggleMasterAccess(userId, masterId, shouldAdd) {
  const allUsers = StorageManager.getAllUsers();
  const user = allUsers.find(u => u.id === userId);
  
  if (user) {
    if (shouldAdd && !user.enrolledMasters.includes(masterId)) {
      user.enrolledMasters.push(masterId);
    } else if (!shouldAdd) {
      user.enrolledMasters = user.enrolledMasters.filter(id => id !== masterId);
    }
    
    StorageManager.updateUser(user);
    Utils.showSuccess('Acceso actualizado correctamente');
  }
}

// Activar / desactivar membresía (isPaid)
function toggleMembership(userId) {
  const allUsers = StorageManager.getAllUsers();
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;
  user.isPaid = !user.isPaid;
  StorageManager.updateUser(user);
  Utils.showSuccess(`Membresía ${user.isPaid ? 'activada' : 'desactivada'}`);
  Router.reload();
}

// Resetear acceso: limpia progress y masters
function resetAccess(userId) {
  try {
    const allUsers = StorageManager.getAllUsers();
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    user.enrolledMasters = [];
    StorageManager.updateUser(user);
    const progress = StorageManager.get(StorageManager.KEYS.USER_PROGRESS) || [];
    const filtered = progress.filter(p => p.userId !== userId);
    StorageManager.set(StorageManager.KEYS.USER_PROGRESS, filtered);
    Utils.showSuccess('Acceso reseteado');
    Router.reload();
  } catch (e) { Utils.showError('No se pudo resetear el acceso'); }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminUsersPage;
}

// Exponer funciones del modal al ámbito global (para onclick en HTML)
try {
  if (typeof window !== 'undefined') {
    window.openUserModal = openUserModal;
    window.openUserModalByEmail = openUserModalByEmail;
    window.saveUserEdits = saveUserEdits;
    window.saveUserEditsByEmail = saveUserEditsByEmail;
    window.closeUserModal = closeUserModal;
    window.openResetPasswordModal = openResetPasswordModal;
    window.confirmResetPassword = confirmResetPassword;
    // Filters helpers (global so they work without router init)
    window.AdminUsersFiltersToggle = function() {
      try {
        const menu = document.getElementById('filters-menu');
        if (!menu) return;
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
      } catch {}
    };
    window.AdminUsersApplyFilters = function() {
      try {
        const search = document.getElementById('admin-user-search');
        const tbody = document.getElementById('admin-users-tbody');
        const q = (search && search.value ? search.value : '').toLowerCase();
        const state = (window.AdminUsersFilterState || 'all');
        Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
          const email = tr.getAttribute('data-email') || '';
          const active = tr.getAttribute('data-active') === '1';
          const master = (tr.getAttribute('data-master') || '').toLowerCase();
          let show = true;
          if (state === 'inactive') show = !active;
          else if (state === 'active') show = active;
          else if (state && String(state).startsWith('master:')) {
            const target = String(state).slice(7);
            show = !!target ? (master === target || master.includes(target)) : true;
          }
          if (q && !email.includes(q)) show = false;
          tr.style.display = show ? '' : 'none';
        });
      } catch {}
    };
    window.AdminUsersSelectFilter = function(val) {
      try {
        window.AdminUsersFilterState = val || 'all';
        const menu = document.getElementById('filters-menu');
        if (menu) menu.style.display = 'none';
        window.AdminUsersApplyFilters();
      } catch {}
    };
    // Exportar tabla visible a XLSX
    window.AdminUsersExportXLSX = function() {
      try {
        if (typeof XLSX === 'undefined' || !XLSX || !XLSX.utils) {
          Utils.showError('Librería XLSX no disponible');
          return;
        }
        const table = document.querySelector('.admin-table');
        const thead = table ? table.querySelector('thead') : null;
        const tbody = table ? table.querySelector('tbody') : null;
        if (!thead || !tbody) { Utils.showError('Tabla no encontrada'); return; }
        const headers = Array.from(thead.querySelectorAll('th')).map(th => th.textContent.trim());
        const rows = [];
        Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
          const style = (tr && tr.style && tr.style.display) || '';
          if (style === 'none') return; // respetar filtros activos
          const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
          rows.push(cells);
        });
        const aoa = [headers, ...rows];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
        const name = 'usuarios_' + new Date().toISOString().slice(0,10) + '.xlsx';
        XLSX.writeFile(wb, name);
        try { Utils.showSuccess('Archivo XLSX generado'); } catch {}
      } catch (e) {
        try { Utils.showError('No se pudo generar el XLSX'); } catch {}
      }
    };
    // Global delegated click handler as final fallback
    window.addEventListener('click', (ev) => {
      const t = ev.target;
      if (!t || !t.id) return;
      try {
        if (t.id === 'userModalSave') {
          const uid = t.getAttribute('data-user-id');
          if (uid) saveUserEdits(uid); else if (typeof saveUserEdits === 'function') saveUserEdits();
        } else if (t.id === 'userModalSaveByEmail') {
          const em = t.getAttribute('data-email');
          if (em) saveUserEditsByEmail(em); else if (typeof saveUserEditsByEmail === 'function') saveUserEditsByEmail('');
        } else if (t.id === 'resetConfirmBtn') {
            const uid = t.getAttribute('data-user-id');
            if (uid) confirmResetPassword(uid);
        }
      } catch {}
    }, true);
  }
} catch {}

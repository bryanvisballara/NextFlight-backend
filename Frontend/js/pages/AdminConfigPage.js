/**
 * PÁGINA: CONFIGURACIÓN (ADMIN)
 */

const AdminConfigPage = {
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') { Router.navigate('/'); return ''; }
    const price = '';
    const msgAff = StorageManager.get('mwi_broadcast_msg_aff') || '';
    const msgFree = StorageManager.get('mwi_broadcast_msg_free') || '';
    return `
      ${Sidebar.render()}
      <div class="main-content">
        <div class="content-header">
          <h1>⚙️ Configuración</h1>
          <p>Precio y mensajes</p>
        </div>
        <div class="admin-config-content" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="config-card" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
            <h3>Precio de membresía</h3>
            <input id="cfg-price" type="number" min="0" value="${price}" style="padding:8px;border-radius:6px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);" />
            <button id="cfg-save-price" class="btn btn-primary" style="margin-top:8px;">Guardar</button>
          </div>
          <div class="config-card" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
            <h3>Tasa USD → COP</h3>
            <input id="cfg-rate" type="number" min="1000" step="1" value="" placeholder="p.ej. 4000" style="padding:8px;border-radius:6px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);" />
            <button id="cfg-save-rate" class="btn btn-primary" style="margin-top:8px;">Guardar tasa</button>
          </div>
          <div class="config-card" style="grid-column:1 / -1;background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;">
            <h3>Email marketing</h3>
            <div style="display:grid;grid-template-columns:minmax(260px,1fr) 2fr;gap:12px;align-items:start;">
              <div>
                <h4>Selecciona el grupo de usuarios a enviar</h4>
                <div id="cfg-email-filters" style="background:#0e0e0d;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:10px;">
                  <div style="font-size:11px;color:#cdbb9a;margin-bottom:6px;">ESTADO DE MEMBRESÍA</div>
                  <div style="display:flex;gap:6px;margin-bottom:8px;">
                    <button class="cfg-filter-item" data-membership="all" style="padding:6px 10px;font-size:12px;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#efe6d6;border-radius:6px;">Todos</button>
                    <button class="cfg-filter-item" data-membership="active" style="padding:6px 10px;font-size:12px;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#efe6d6;border-radius:6px;">Activo</button>
                    <button class="cfg-filter-item" data-membership="inactive" style="padding:6px 10px;font-size:12px;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#efe6d6;border-radius:6px;">NO activo</button>
                  </div>
                  <div style="height:1px;background:rgba(255,255,255,0.08);margin:6px 0;"></div>
                  <div style="font-size:11px;color:#cdbb9a;margin-bottom:6px;">MASTERS DE INTERÉS</div>
                  <div id="cfg-masters-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"></div>
                </div>
              </div>
              <div>
                <div style="display:grid;grid-template-columns:1fr;gap:8px;">
                  <div>
                    <label style="display:block;color:#cdbb9a;margin-bottom:6px;">Asunto</label>
                    <input id="msg-subject" type="text" placeholder="Asunto del correo" style="width:100%;padding:8px;border-radius:6px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);" />
                  </div>
                  <div>
                    <label style="display:block;color:#cdbb9a;margin-bottom:6px;">Mensaje a enviar</label>
                    <textarea id="msg-aff" rows="6" style="width:100%;padding:8px;border-radius:6px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);">${msgAff}</textarea>
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="color:#cdbb9a;font-size:12px;">Destinatarios filtrados: <span id="cfg-email-count">0</span></div>
                    <div style="display:flex;gap:8px;">
                      <button id="cfg-copy-emails" class="btn btn-small" style="padding:6px 10px;">Copiar emails</button>
                      <button id="cfg-export-emails" class="btn btn-small" style="padding:6px 10px;">⬇️ Exportar CSV</button>
                    </div>
                  </div>
                  <textarea id="cfg-email-list" rows="6" readonly style="width:100%;padding:8px;border-radius:6px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);" placeholder="Los correos filtrados aparecerán aquí, uno por línea"></textarea>
                  <div>
                    <button id="send-aff" class="btn btn-primary" style="margin-top:6px;">Enviar</button>
                    <div id="cfg-send-log" style="margin-top:10px;background:#0e0e0d;border:1px solid rgba(212,169,85,.18);border-radius:8px;padding:10px;color:#cdbb9a;font-size:12px;display:none;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },
  init() {
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      // Cargar configuración desde Mongo
      fetch(`${base}/admin/settings`, {
        headers: { Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '') }
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.settings && data.settings.membership && data.settings.membership.price != null) {
            const priceInput = document.getElementById('cfg-price');
            if (priceInput) priceInput.value = Number(data.settings.membership.price);
          }
        })
        .catch(err => { console.error('[Settings load error]', err); });

      document.getElementById('cfg-save-price')?.addEventListener('click', async () => {
        const val = Number(document.getElementById('cfg-price')?.value || 0);
        if (val < 0) { Utils.showError('El precio no puede ser negativo'); return; }
        try {
          const res = await fetch(`${base}/admin/settings/membership`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + (localStorage.getItem('mwi:token') || '')
            },
            body: JSON.stringify({ price: val, currency: 'USD', active: true })
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data && data.message ? data.message : 'Error');
          Utils.showSuccess('Precio actualizado');
          try { window.dispatchEvent(new CustomEvent('mwi:membershipPriceChanged', { detail: { price: val } })); } catch (e) {}
        } catch (err) {
          console.error('[Settings save error]', err);
          Utils.showError('No se pudo guardar el precio');
        }
      });

      // Cargar y guardar tasa USD→COP
      (async () => {
        try {
          const token = localStorage.getItem('mwi:token') || '';
          const r = await fetch(`${base}/admin/config/pricing`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(() => ({}));
          const rateInput = document.getElementById('cfg-rate');
          if (rateInput) rateInput.value = Number((j && j.usdToCopRate) || 4000);
        } catch {}
      })();
      document.getElementById('cfg-save-rate')?.addEventListener('click', async () => {
        try {
          const rateVal = Number(document.getElementById('cfg-rate')?.value || 0);
          if (!rateVal || rateVal < 1000) { Utils.showError('Tasa inválida'); return; }
          const token = localStorage.getItem('mwi:token') || '';
          const r = await fetch(`${base}/admin/config/pricing`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ usdToCopRate: rateVal })
          });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(j && j.error ? j.error : 'Error');
          Utils.showSuccess('Tasa actualizada');
        } catch (e) {
          console.error('[Rate save error]', e);
          Utils.showError('No se pudo actualizar la tasa');
        }
      });
      // Email marketing: filtros y resultados
      // Fuente sincronizada con "Master de mayor interés" del formulario de registro
      const mastersList = [
        { title: 'Amazon Seller Master' },
        { title: 'eBay Seller Hub Master' },
        { title: 'SHEIN Seller Master' },
        { title: 'Top Seller Mercado Libre Master' },
        { title: 'Gestión de capital en mercados financieros (TRADING) Master' },
        { title: 'Cripto Arbitrage Master' },
        { title: 'Social Media Management & Content Creator Master' },
        { title: 'Vida con propósito Master' },
        { title: 'Operación, gestión y dirección empresarial Master' },
        { title: 'Podcast' }
      ].map(m => ({ title: m.title, key: m.title.toLowerCase() }));
      try {
        const grid = document.getElementById('cfg-masters-grid');
        if (grid) {
          const half = Math.ceil(mastersList.length / 2);
          const col1 = mastersList.slice(0, half);
          const col2 = mastersList.slice(half);
          const btnHTML = (arr) => arr.map(({ title, key }) => `<button class="cfg-filter-item" data-master="${key}" style="padding:6px 10px;font-size:12px;display:block;width:100%;text-align:left;background:transparent;border:1px solid rgba(255,255,255,0.08);color:#efe6d6;border-radius:6px;">${title}</button>`).join('');
          grid.innerHTML = `<div>${btnHTML(col1)}</div><div>${btnHTML(col2)}</div>`;
        }
      } catch {}

      const state = { membership: 'all', master: null };
      let usersCache = [];
      const token = localStorage.getItem('mwi:token') || '';
      // Carga de usuarios desde backend
      (async () => {
        try {
          if (!token) return;
          const res = await fetch(`${base}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json().catch(() => ({}));
          usersCache = Array.isArray(data.users) ? data.users : (Array.isArray(data) ? data : []);
          applyEmailFilters();
        } catch {}
      })();

      const applyEmailFilters = () => {
        try {
          const countEl = document.getElementById('cfg-email-count');
          const listEl = document.getElementById('cfg-email-list');
          let filtered = usersCache.slice();
          // Filtrar por membresía
          if (state.membership === 'active') filtered = filtered.filter(u => !!u.isPaid);
          else if (state.membership === 'inactive') filtered = filtered.filter(u => !u.isPaid);
          // Filtrar por master de interés
          if (state.master) {
            filtered = filtered.filter(u => String(u.interestMaster || '').toLowerCase() === state.master);
          }
          const emails = filtered.map(u => String(u.email || '').toLowerCase()).filter(Boolean);
          if (countEl) countEl.textContent = String(emails.length);
          if (listEl) listEl.value = emails.join('\n');
        } catch {}
      };

      // Handlers
      document.getElementById('cfg-email-filters')?.addEventListener('click', (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest('.cfg-filter-item') : null;
        if (!btn) return;
        const memb = btn.getAttribute('data-membership');
        const master = btn.getAttribute('data-master');
        if (memb) state.membership = memb;
        if (master) state.master = master;
        applyEmailFilters();
      });
      document.getElementById('cfg-copy-emails')?.addEventListener('click', async () => {
        try {
          const el = document.getElementById('cfg-email-list');
          await navigator.clipboard.writeText(el?.value || '');
          Utils.showSuccess('Correos copiados al portapapeles');
        } catch {}
      });
      document.getElementById('cfg-export-emails')?.addEventListener('click', () => {
        try {
          const el = document.getElementById('cfg-email-list');
          const rows = ['email'].concat((el?.value || '').split(/\n+/).filter(Boolean));
          const csv = rows.map(v => `"${v.replace(/"/g,'""')}"`).join('\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = `emails_${new Date().toISOString().slice(0,10)}.csv`; a.click();
          URL.revokeObjectURL(url);
        } catch {}
      });
      // Mantener botón enviar (placeholder)
      document.getElementById('send-aff')?.addEventListener('click', async (ev) => {
        try {
          const baseUrl = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
          const token = localStorage.getItem('mwi:token') || '';

          const emailsText = document.getElementById('cfg-email-list')?.value || '';
          const emails = emailsText.split(/\n+/).map(s => s.trim()).filter(Boolean);
          const message = document.getElementById('msg-aff')?.value || '';
          const subjectInput = document.getElementById('msg-subject');
          const subject = (subjectInput && subjectInput.value ? subjectInput.value : 'Mensaje de Modern Wealth Institute').trim();

          if (!emails.length) { Utils.showError('No hay destinatarios'); return; }
          if (!message.trim()) { Utils.showError('El mensaje está vacío'); return; }
          if (!subject || subject.length < 3) { Utils.showError('El asunto es requerido'); return; }

          const btn = ev && ev.currentTarget;
          if (btn) btn.disabled = true;
          const logBox = document.getElementById('cfg-send-log');
          if (logBox) { logBox.style.display = 'none'; logBox.innerHTML = ''; }
          RegisterPage?.showLoadingOverlay?.('Enviando correos...');
          const res = await fetch(`${baseUrl}/admin/email/broadcast`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ subject, message, emails })
          });
          const data = await res.json().catch(() => ({}));
          RegisterPage?.hideLoadingOverlay?.();
          if (btn) btn.disabled = false;
          if (res.ok) {
            Utils.showSuccess(data.message || 'Correos enviados');
            if (logBox) {
              const failures = Array.isArray(data.failures) ? data.failures : [];
              const sent = typeof data.sent === 'number' ? data.sent : emails.length - failures.length;
              const total = typeof data.total === 'number' ? data.total : emails.length;
              let html = `<div><strong>Resultado:</strong> ${sent} / ${total} enviados.</div>`;
              if (failures.length) {
                html += `<div style="margin-top:6px;color:#ef9999;"><strong>Fallidos (${failures.length}):</strong><ul style="margin:6px 0 0 18px;">` +
                  failures.slice(0, 50).map(f => `<li>${(f && f.to) ? f.to : 'desconocido'}</li>`).join('') +
                  `</ul>${failures.length > 50 ? '<div>… (ver consola para más)</div>' : ''}</div>`;
                console.warn('[Broadcast failures]', failures);
              }
              logBox.innerHTML = html;
              logBox.style.display = 'block';
            }
          } else {
            Utils.showError(data.message || 'Error al enviar');
            if (logBox) {
              logBox.textContent = String(data.message || 'Error al enviar');
              logBox.style.display = 'block';
            }
          }
        } catch (err) {
          console.error('[Broadcast] error', err);
          RegisterPage?.hideLoadingOverlay?.();
          const logBox = document.getElementById('cfg-send-log');
          if (logBox) { logBox.textContent = 'Error de conexión'; logBox.style.display = 'block'; }
          Utils.showError('Error de conexión');
        }
      });
    } catch (e) {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminConfigPage;
}

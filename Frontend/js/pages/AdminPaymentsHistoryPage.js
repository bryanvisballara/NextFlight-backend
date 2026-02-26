const AdminPaymentsHistoryPage = {
  render() {
    return `
      ${Sidebar.render()}
      <div class="main-content">
        <div class="content-header">
          <h1>Histórico de pagos</h1>
          <p>Semanal: Socios y Mentores</p>
        </div>
        <div class="users-table-container">
          <div class="collapsible-header" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <h3 style="margin:0; color:#f6e9c9; font-weight:800;">Histórico semanal - Socios</h3>
            <button class="btn btn-small" data-target="collapse-partners" aria-expanded="false" aria-controls="collapse-partners" style="background:transparent; color:#f6e9c9; border:1px solid #cdbb9a;">Mostrar</button>
          </div>
          <div id="collapse-partners" class="collapsible-content" style="display:none;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="hist-partner-body"><tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Cargando...</td></tr></tbody>
            </table>
          </div>
        </div>
        <div class="users-table-container" style="margin-top:16px;">
          <div class="collapsible-header" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <h3 style="margin:0; color:#f6e9c9; font-weight:800;">Histórico semanal - Mentores</h3>
            <button class="btn btn-small" data-target="collapse-mentors" aria-expanded="false" aria-controls="collapse-mentors" style="background:transparent; color:#f6e9c9; border:1px solid #cdbb9a;">Mostrar</button>
          </div>
          <div id="collapse-mentors" class="collapsible-content" style="display:none;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="hist-mentor-body"><tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Cargando...</td></tr></tbody>
            </table>
          </div>
        </div>
        <div class="users-table-container" style="margin-top:16px;">
          <div class="collapsible-header" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <h3 style="margin:0; color:#f6e9c9; font-weight:800;">Histórico de métricas (semanal)</h3>
            <button class="btn btn-small" data-target="collapse-metrics" aria-expanded="false" aria-controls="collapse-metrics" style="background:transparent; color:#f6e9c9; border:1px solid #cdbb9a;">Mostrar</button>
          </div>
          <div id="collapse-metrics" class="collapsible-content" style="display:none;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Total (MWI neto)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="hist-metrics-body"><tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Cargando...</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },
  init() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const token = localStorage.getItem('mwi:token') || '';
    const fmtDate = (d) => new Date(d).toISOString().slice(0,10);
    const fmt = (n) => new Intl.NumberFormat('en-US').format(Number(n||0));
    const payoutByEmail = new Map();
    const formatMethodDetails = (m) => {
      if (!m) return 'Método: —';
      const code = m.code || '—';
      const det = m.details || {};
      const pairs = Object.entries(det).filter(([k,v]) => v != null && String(v).trim() !== '');
      const detStr = pairs.length ? pairs.map(([k,v]) => `${k}: ${v}`).join(', ') : 'sin detalles';
      return `Método: ${code} (${detStr})`;
    };
    const setupCollapsible = () => {
      document.querySelectorAll('button[data-target]').forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const content = document.getElementById(targetId);
        if (!content) return;
        // Ensure collapsed by default
        content.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        const updateLabel = () => {
          const hidden = content.style.display === 'none';
          btn.textContent = hidden ? 'Mostrar' : 'Ocultar';
        };
        updateLabel();
        btn.addEventListener('click', () => {
          const hidden = content.style.display === 'none';
          content.style.display = hidden ? '' : 'none';
          btn.setAttribute('aria-expanded', hidden ? 'true' : 'false');
          updateLabel();
        });
      });
    };
    // Initialize collapsible sections
    setupCollapsible();
    const rowHtml = (h) => `
      <tr>
        <td>${h.title || '—'}</td>
        <td>${fmtDate(h.startDate)}</td>
        <td>${fmtDate(h.endDate)}</td>
        <td>$${fmt(h.totalAmount || 0)}</td>
        <td>
          <button class="btn btn-small" data-view="${h._id}">Ver detalles</button>
          <button class="btn btn-small" data-dl="${h._id}">Descargar CSV</button>
        </td>
      </tr>`;
    const fillTable = (id, list) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = list.length ? list.map(rowHtml).join('') : `<tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Sin registros</td></tr>`;
    };
    const attachHandlers = (id) => {
      const table = document.getElementById(id);
      if (!table) return;
      table.querySelectorAll('button[data-view]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const hid = btn.getAttribute('data-view');
          const res = await fetch(`${base}/admin/payments-history/${hid}`, { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          if (res.ok && data.history) {
            const rows = Array.isArray(data.history.rows) ? data.history.rows : [];
            const details = rows.map(r => `${r.name} <${r.email}> · ventas ${r.weeklySales} · $${fmt(r.total)} (${fmt(r.direct)} + ${fmt(r.override1)} + ${fmt(r.override2)})`).join('<br/>');
            window.openAuthModal(`<div style='color:#e8dcc0;'><h3>${data.history.title}</h3><div>${details || 'Sin filas'}</div></div>`);
          } else {
            Utils.showError('No se pudo cargar el detalle');
          }
        });
      });
      table.querySelectorAll('button[data-dl]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const hid = btn.getAttribute('data-dl');
          const res = await fetch(`${base}/admin/payments-history/${hid}`, { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          if (res.ok && data.history) {
            const rows = Array.isArray(data.history.rows) ? data.history.rows : [];
            const header = ['Usuario','Email','Ventas semana','Directo 40%','Override1 5%','Override2 3%','Monto a pagar','Método','Tarifa %'];
            const csvRows = [header].concat(rows.map(r => [r.name, r.email, r.weeklySales, r.direct, r.override1, r.override2, r.total, r.methodCode || '', r.feePercent || 0]));
            const csvContent = csvRows.map(arr => arr.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${(data.history.title || 'historial').replace(/\s+/g,'_')}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            Utils.showError('No se pudo descargar el CSV');
          }
        });
      });
    };
    (async () => {
      // Cargar precio de membresía para calcular métricas
      let membershipPrice = 499;
      try {
        const r = await fetch(`${base}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } });
        const j = await r.json().catch(()=>({}));
        if (r.ok && j && j.membership && j.membership.price != null) {
          membershipPrice = Number(j.membership.price) || 499;
        }
      } catch {}
      try {
        // Preload payout methods to show bank details in "Ver detalles"
        try {
          const resPM = await fetch(`${base}/admin/partners/payout-methods`, { headers: { Authorization: `Bearer ${token}` } });
          const jPM = await resPM.json();
          const methods = Array.isArray(jPM.methods) ? jPM.methods : [];
          for (const m of methods) {
            payoutByEmail.set(String(m.email || '').toLowerCase(), m);
          }
        } catch {}

        const resP = await fetch(`${base}/admin/partners/commissions-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
        const dataP = await resP.json();
        const listP = Array.isArray(dataP.histories) ? dataP.histories : [];
        const keyFor = (h) => `${new Date(h.startDate).toISOString()}|${new Date(h.endDate).toISOString()}`;
        const rowHtmlPartners = (h) => `
          <tr>
            <td>${h.title || '—'}</td>
            <td>${fmtDate(h.startDate)}</td>
            <td>${fmtDate(h.endDate)}</td>
            <td>$${fmt(h.totalAmount || 0)}</td>
            <td>
              <button class="btn btn-small" data-view-period="${keyFor(h)}">Ver detalles</button>
              <button class="btn btn-small" data-dl-period="${keyFor(h)}">Descargar CSV</button>
            </td>
          </tr>`;
        const elP = document.getElementById('hist-partner-body');
        if (elP) elP.innerHTML = listP.length ? listP.map(rowHtmlPartners).join('') : `<tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Sin registros</td></tr>`;
        const findByKey = (k) => listP.find(h => keyFor(h) === k);
        // Details
        document.querySelectorAll('button[data-view-period]').forEach(btn => btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-view-period');
          const h = findByKey(k);
          if (!h) return;
          const rows = Array.isArray(h.rows) ? h.rows : [];
          const details = rows.map(r => {
            const pm = payoutByEmail.get(String(r.email || '').toLowerCase());
            const methodTxt = formatMethodDetails(pm);
            const feeTxt = (r.feePercent != null) ? ` · tarifa ${r.feePercent}%` : '';
            return `${r.name} <${r.email}> · ventas ${r.weeklySales} · $${fmt(r.total)} (${fmt(r.direct)} + ${fmt(r.override1)} + ${fmt(r.override2)}) · ${methodTxt}${feeTxt}`;
          }).join('<br/>');
          window.openAuthModal(`<div style='color:#e8dcc0;'><h3>${h.title}</h3><div>${details || 'Sin filas'}</div></div>`);
        }));
        // CSV (already includes method code + fee percent)
        document.querySelectorAll('button[data-dl-period]').forEach(btn => btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-dl-period');
          const h = findByKey(k);
          if (!h) return;
          const rows = Array.isArray(h.rows) ? h.rows : [];
          const header = ['Usuario','Email','Ventas semana','Directo 40%','Override1 5%','Override2 3%','Monto a pagar','Método','Tarifa %'];
          const csvRows = [header].concat(rows.map(r => [r.name, r.email, r.weeklySales, r.direct, r.override1, r.override2, r.total, r.methodCode || '', r.feePercent || 0]));
          const csvContent = csvRows.map(arr => arr.join(',')).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${(h.title || 'historial').replace(/\s+/g,'_')}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }));
      } catch {}
      try {
        const resM = await fetch(`${base}/admin/mentors/royalties-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
        const dataM = await resM.json();
        const listM = Array.isArray(dataM.histories) ? dataM.histories : [];
        const keyForM = (h) => `${new Date(h.startDate).toISOString()}|${new Date(h.endDate).toISOString()}`;
        const rowHtmlMentors = (h) => `
          <tr>
            <td>${h.title || '—'}</td>
            <td>${fmtDate(h.startDate)}</td>
            <td>${fmtDate(h.endDate)}</td>
            <td>$${fmt(h.totalAmount || 0)}</td>
            <td>
              <button class="btn btn-small" data-view-mentors="${keyForM(h)}">Ver detalles</button>
              <button class="btn btn-small" data-dl-mentors="${keyForM(h)}">Descargar CSV</button>
            </td>
          </tr>`;
        const elM = document.getElementById('hist-mentor-body');
        if (elM) elM.innerHTML = listM.length ? listM.map(rowHtmlMentors).join('') : `<tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Sin registros</td></tr>`;
        const findByKeyM = (k) => listM.find(h => keyForM(h) === k);
        // Details
        document.querySelectorAll('button[data-view-mentors]').forEach(btn => btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-view-mentors');
          const h = findByKeyM(k);
          if (!h) return;
          const rows = Array.isArray(h.rows) ? h.rows : [];
          const details = rows.map(r => `${r.name} <${r.email}> · ventas ${r.weeklySales} · pago/venta $${fmt(r.paymentPerSale)} · % ${r.percentTotal} · masters ${r.mastersDictados} · total $${fmt(r.total)}`).join('<br/>');
          window.openAuthModal(`<div style='color:#e8dcc0;'><h3>${h.title}</h3><div>${details || 'Sin filas'}</div></div>`);
        }));
        // CSV
        document.querySelectorAll('button[data-dl-mentors]').forEach(btn => btn.addEventListener('click', () => {
          const k = btn.getAttribute('data-dl-mentors');
          const h = findByKeyM(k);
          if (!h) return;
          const rows = Array.isArray(h.rows) ? h.rows : [];
          const header = ['Mentor','Email','Ventas semana','Monto por venta','Masters asignados','Porcentaje total (%)','Monto a pagar'];
          const csvRows = [header].concat(rows.map(r => [r.name, r.email, r.weeklySales, r.paymentPerSale, r.mastersDictados, r.percentTotal, r.total]));
          const csvContent = csvRows.map(arr => arr.join(',')).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${(h.title || 'mentores').replace(/\s+/g,'_')}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }));
        // Construir histórico de métricas combinando partner + mentor por rango
        try {
          const fmtDate = (d) => new Date(d).toISOString().slice(0,10);
          const partnerMap = new Map();
          const mentorMap = new Map();
          // Recargar partners (commissions-based) para tenerlos en memoria también
          let partners = [];
          try {
            const resP2 = await fetch(`${base}/admin/partners/commissions-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
            const dataP2 = await resP2.json();
            partners = Array.isArray(dataP2.histories) ? dataP2.histories : [];
          } catch {}
          for (const h of (partners || [])) {
            const key = `${new Date(h.startDate).toISOString()}|${new Date(h.endDate).toISOString()}`;
            partnerMap.set(key, h);
          }
          for (const h of (listM || [])) {
            const key = `${new Date(h.startDate).toISOString()}|${new Date(h.endDate).toISOString()}`;
            mentorMap.set(key, h);
          }
          const keys = new Set([...Array.from(partnerMap.keys()), ...Array.from(mentorMap.keys())]);
          const combined = Array.from(keys).map(key => {
            const p = partnerMap.get(key) || {};
            const m = mentorMap.get(key) || {};
            const startDate = p.startDate || m.startDate;
            const endDate = p.endDate || m.endDate;
            const partnersTotal = Number(p.totalAmount || 0);
            const mentorsTotal = Number(m.totalAmount || 0);
            // weeklySales está repetido en filas de mentores; tomar de la primera fila
            const weeklySales = Array.isArray(m.rows) && m.rows.length ? Number(m.rows[0].weeklySales || 0) : 0;
            const gross = Number(weeklySales) * Number(membershipPrice);
            const coupon50 = gross * 0.50;
            const mwiNet = Math.max(0, gross - coupon50 - partnersTotal - mentorsTotal);
            return {
              key,
              title: `Métricas semana (${fmtDate(startDate)} a ${fmtDate(endDate)})`,
              startDate,
              endDate,
              partnersTotal,
              mentorsTotal,
              weeklySales,
              gross,
              coupon50,
              mwiNet
            };
          }).sort((a,b) => new Date(b.startDate) - new Date(a.startDate));

          const rowHtmlMetrics = (h) => `
            <tr>
              <td>${h.title}</td>
              <td>${fmtDate(h.startDate)}</td>
              <td>${fmtDate(h.endDate)}</td>
              <td>$${fmt(h.mwiNet)}</td>
              <td>
                <button class="btn btn-small" data-view-mx="${h.key}">Ver detalles</button>
                <button class="btn btn-small" data-dl-mx="${h.key}">Descargar CSV</button>
              </td>
            </tr>`;
          const el = document.getElementById('hist-metrics-body');
          if (el) el.innerHTML = combined.length ? combined.map(rowHtmlMetrics).join('') : `<tr><td colspan="5" style="text-align:center; color:#cdbb9a;">Sin registros</td></tr>`;

          // Handlers métricas
          const openDetails = (h) => {
            const fmtMoney = (n) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n||0));
            const html = `
              <div style='color:#e8dcc0;'>
                <h3>${h.title}</h3>
                <div>Ingresos semana (ventas x precio): <strong>$${fmtMoney(h.gross)}</strong></div>
                <div>Menos 50% cupón: <strong>$${fmtMoney(h.coupon50)}</strong></div>
                <div>Ingresos para mentores: <strong>$${fmtMoney(h.mentorsTotal)}</strong></div>
                <div>Ingresos para socios: <strong>$${fmtMoney(h.partnersTotal)}</strong></div>
                <div style="margin-top:6px;">Ingresos libres MWI: <strong>$${fmtMoney(h.mwiNet)}</strong></div>
              </div>`;
            window.openAuthModal(html);
          };
          const findByKey = (k) => combined.find(x => x.key === k);
          document.querySelectorAll('button[data-view-mx]').forEach(btn => btn.addEventListener('click', () => {
            const k = btn.getAttribute('data-view-mx');
            const h = findByKey(k);
            if (h) openDetails(h);
          }));
          document.querySelectorAll('button[data-dl-mx]').forEach(btn => btn.addEventListener('click', () => {
            try {
              const k = btn.getAttribute('data-dl-mx');
              const h = findByKey(k);
              if (!h) return;
              const header = ['Titulo','Desde','Hasta','Ventas semana','Precio membresia','Ingresos semana','Cupón 50%','Mentores','Socios','MWI neto'];
              const row = [h.title, new Date(h.startDate).toISOString(), new Date(h.endDate).toISOString(), h.weeklySales, membershipPrice, h.gross, h.coupon50, h.mentorsTotal, h.partnersTotal, h.mwiNet];
              const csv = [header, row].map(arr => arr.join(',')).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = `${h.title.replace(/\s+/g,'_')}.csv`; a.click();
              URL.revokeObjectURL(url);
            } catch {}
          }));
        } catch {}
      } catch {}
    })();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminPaymentsHistoryPage;
}

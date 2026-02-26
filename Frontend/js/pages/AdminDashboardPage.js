/**
 * PÁGINA: PANEL DE ADMINISTRADOR
 * 
 * Dashboard principal para administradores.
 */

const AdminDashboardPage = {
  /**
   * Renderiza el dashboard de admin
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') {
      Router.navigate('/admin');
      return '';
    }

    // Placeholder values; se actualizarán en init() con backend
    const fmt = (n) => new Intl.NumberFormat('en-US').format(Number(n||0));
    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>Dashboard</h1>
          <p>Resumen de métricas clave</p>
        </div>

        <div class="admin-dashboard-content">
          <style>
            .stats-section { margin: 10px 0 16px; }
            .stats-section .title { color:#f6e9c9; font-weight:800; font-size:16px; margin:0 0 8px; }
            .stats-grid { display:grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap:12px; }
            .stat-card { background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:12px; padding:14px; }
            .stat-card .stat-icon { font-size:18px; margin-bottom:6px; }
            .stat-card h3 { margin:0; color:#f6e9c9; font-weight:800; }
            .stat-card p { margin:4px 0 0; color:#cdbb9a; }
          </style>

          <div class="stats-section">
            <div class="title">Histórico MWI</div>
            <div class="stats-grid">
              <div class="stat-card"><div class="stat-icon">👥</div><h3 id="kpi-total-users">${fmt(0)}</h3><p>Usuarios totales</p></div>
              <div class="stat-card"><div class="stat-icon">🚫</div><h3 id="kpi-free-users">${fmt(0)}</h3><p>Usuarios NO activos</p></div>
              <div class="stat-card"><div class="stat-icon">🔒</div><h3 id="kpi-paid-users">${fmt(0)}</h3><p>Usuarios activos (pago)</p></div>

              <div class="stat-card"><div class="stat-icon">💰</div><h3 id="kpi-total-income">$${fmt(0)}</h3><p>Ingresos totales</p></div>
              <div class="stat-card"><div class="stat-icon">🏫</div><h3 id="kpi-total-income-mentors">$${fmt(0)}</h3><p>Ingresos totales para mentores (15%)</p></div>
              <div class="stat-card"><div class="stat-icon">🤝</div><h3 id="kpi-total-income-affiliates">$${fmt(0)}</h3><p>Ingresos totales para socios</p></div>
              <div class="stat-card"><div class="stat-icon">🏢</div><h3 id="kpi-total-income-mwi-net">$${fmt(0)}</h3><p>Ingresos totales libres para MWI</p></div>
            </div>
          </div>

          <div class="stats-section">
            <div class="title">Métricas de la semana</div>
            <div class="stats-grid">
              <div class="stat-card"><div class="stat-icon">🆕</div><h3 id="kpi-new-users-month">${fmt(0)}</h3><p>Usuarios nuevos esta semana</p></div>
              <div class="stat-card"><div class="stat-icon">🆕🚫</div><h3 id="kpi-new-free-month">${fmt(0)}</h3><p>Usuarios NO activos nuevos esta semana</p></div>
              <div class="stat-card"><div class="stat-icon">🆕🔒</div><h3 id="kpi-new-paid-month">${fmt(0)}</h3><p>Usuarios activos nuevos esta semana</p></div>

              <div class="stat-card"><div class="stat-icon">📆💰</div><h3 id="kpi-month-income">$${fmt(0)}</h3><p>Ingresos de esta semana</p></div>
              <div class="stat-card"><div class="stat-icon">📆🏫</div><h3 id="kpi-month-income-mentors">$${fmt(0)}</h3><p>Ingresos de esta semana para mentores (15%)</p></div>
              <div class="stat-card"><div class="stat-icon">📆🤝</div><h3 id="kpi-month-income-affiliates">$${fmt(0)}</h3><p>Ingresos de esta semana para socios</p></div>
              <div class="stat-card"><div class="stat-icon">📆🏢</div><h3 id="kpi-month-income-mwi-net">$${fmt(0)}</h3><p>Ingresos de esta semana libres para MWI</p></div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:8px; margin:12px 0;">
            <button id="partner-refresh" class="btn btn-small" style="padding:6px 10px;">↻ Actualizar</button>
            <button id="partner-export" class="btn btn-small" style="padding:6px 10px;">⬇️ Exportar CSV</button>
          </div>

          <div class="users-table-container">
            <div style="display:flex; align-items:center; justify-content:space-between; margin:8px 0 6px;">
              <h3 style="margin:0; color:#f6e9c9; font-weight:800;">Pago programado semanal para Socios: MWI Partner Center</h3>
            </div>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Cupón</th>
                  <th>Ventas semana</th>
                  <th>Método de deposito</th>
                  <th>Tarifa</th>
                  <th>Monto a pagar</th>
                  <th>Próximo pago</th>
                </tr>
              </thead>
              <tbody id="partner-table-body">
                <tr><td colspan="9" style="text-align:center; color:#cdbb9a;">Cargando...</td></tr>
              </tbody>
            </table>
          </div>
          <!-- Modal de pago a socio -->
          <style>
            .adm-pay-modal { display:none; position:fixed; inset:0; z-index:1003; }
            .adm-pay-modal.open { display:block; }
            .adm-pay-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
            .adm-pay-modal .content { position:relative; max-width:520px; margin:60px auto; background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45); padding:14px; }
            .adm-pay-modal .title { color:#f6e9c9; font-size:18px; font-weight:800; margin:0 0 6px; }
            .adm-pay-modal .row { margin:8px 0; }
            .adm-pay-modal label { display:block; color:#cdbb9a; font-weight:600; margin-bottom:4px; }
            .adm-pay-modal input { width:100%; padding:10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#0f0f0f; color:#f6e9c9; }
            .adm-pay-modal .actions { display:flex; gap:10px; margin-top:12px; justify-content:flex-end; }
            .adm-pay-modal .btn { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 14px; border-radius:8px; font-weight:700; cursor:pointer; }
            .adm-pay-modal .btn.primary { border-color: rgba(209,161,86,.95); background:linear-gradient(180deg,#D1A156,#7A5A22); color:#2a1f0b; }
          </style>
          <div id="adm-pay-modal" class="adm-pay-modal" role="dialog" aria-hidden="true">
            <div class="overlay" data-close="true"></div>
            <div class="content" role="document">
              <div class="title">Confirmar pago a socio</div>
              <div class="row"><label>Email del socio</label><div id="adm-pay-email" style="color:#f6e9c9;font-weight:700;">—</div></div>
              <div class="row"><label>Monto a pagar (USD)</label><input type="number" min="0" step="0.01" id="adm-pay-amount" /></div>
              <div class="row"><label>Periodo</label><input type="text" id="adm-pay-period" placeholder="YYYY-MM" /></div>
              <div class="actions">
                <button id="adm-pay-cancel" class="btn">Cancelar</button>
                <button id="adm-pay-confirm" class="btn primary">Pagar</button>
              </div>
            </div>
          </div>
          <!-- Modal de detalles de método de depósito -->
          <style>
            .adm-modal { display:none; position:fixed; inset:0; z-index:1002; }
            .adm-modal.open { display:block; }
            .adm-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
            .adm-modal .content { position:relative; max-width:520px; margin:60px auto; background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45); padding:14px; max-height:80vh; overflow:auto; }
            .adm-modal .title { color:#f6e9c9; font-size:18px; font-weight:800; margin:0 0 6px; }
            .adm-modal .msg { color:#e8dcc0; line-height:1.4; }
            .adm-modal .grid { display:block; }
            .adm-modal .row { display:block; margin:6px 0; }
            .adm-modal .label { display:block; color:#cdbb9a; font-weight:600; margin:0; }
            .adm-modal .value { display:block; color:#f6e9c9; font-weight:700; margin-top:2px; word-break:break-word; overflow-wrap:anywhere; white-space:normal; }
            .adm-modal .actions { display:flex; gap:10px; margin-top:12px; justify-content:flex-end; }
            .adm-modal .btn { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 14px; border-radius:8px; font-weight:700; cursor:pointer; }
          </style>
          <div id="adm-payout-modal" class="adm-modal" role="dialog" aria-hidden="true">
            <div class="overlay" data-close="true"></div>
            <div class="content" role="document">
              <div class="title">Detalles de método de depósito</div>
              <div id="adm-payout-detail" class="msg"></div>
              <div class="actions">
                <button id="adm-payout-close" class="btn">Cerrar</button>
              </div>
            </div>
          </div>
          <!-- Modal: Detalle de pago a socio -->
          <div id="adm-payout-breakdown-modal" class="adm-modal" role="dialog" aria-hidden="true">
            <div class="overlay" data-close="true"></div>
            <div class="content" role="document">
              <div class="title">Detalle de pago a socio</div>
              <div id="adm-payout-breakdown" class="msg"></div>
              <div class="actions">
                <button id="adm-payout-breakdown-close" class="btn">Cerrar</button>
              </div>
            </div>
          </div>
          <!-- Mentores -->
          <div class="users-table-container" style="margin-top:16px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin:8px 0 6px;">
              <h3 style="margin:0; color:#f6e9c9; font-weight:800;">Pago programado semanal para Mentores</h3>
              <div id="mentors-meta-desc" style="color:#cdbb9a; font-size:12px;">Pool: 15% del valor del curso · Actualmente — masters → —% por master</div>
            </div>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Correo</th>
                  <th>Masters dictados</th>
                  <th>% por master</th>
                  <th>% total</th>
                  <th>Pago por venta</th>
                  <th>Ventas semana</th>
                  <th>Pago semana</th>
                </tr>
              </thead>
              <tbody id="mentors-table-body">
                <tr><td colspan="8" style="text-align:center; color:#cdbb9a;">Cargando...</td></tr>
              </tbody>
            </table>
          </div>
            <!-- Quick actions removidas según solicitud -->
        </div>
      </div>
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    // Obtener estadísticas reales desde backend (con polling)
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    // Precio de membresía desde backend settings, con fallback local
    let membershipPrice = 499;
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const fmt = (n) => new Intl.NumberFormat('en-US').format(Number(n||0));

    const monthBoundaries = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth()+1, 0, 23, 59, 59, 999);
      return { start, end };
    };
    const weeklyBoundaries = () => {
      const now = new Date();
      // Weekly cutoff: Friday 18:00 America/Bogota (UTC-5) => 23:00 UTC
      const bogotaOffsetMs = 5 * 60 * 60 * 1000; // fixed UTC-5
      const bogotaRef = new Date(now.getTime() - bogotaOffsetMs);
      const day = bogotaRef.getUTCDay(); // 0=Sun..6=Sat in Bogota local frame
      const diffToFri = (5 - day + 7) % 7; // days ahead to Friday
      const endUtcMs = Date.UTC(
        bogotaRef.getUTCFullYear(),
        bogotaRef.getUTCMonth(),
        bogotaRef.getUTCDate() + diffToFri,
        23, 0, 0, 0
      );
      const startUtcMs = endUtcMs - (7 * 24 * 60 * 60 * 1000);
      return { start: new Date(startUtcMs), end: new Date(endUtcMs - 1) };
    };

    const fetchStats = async () => {
      const token = localStorage.getItem('mwi:token') || '';
      try {
        // Preferir lista de usuarios para métricas detalladas
        const res = await fetch(`${base}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json().catch(() => ({}));
        const users = Array.isArray(data.users) ? data.users : (Array.isArray(data) ? data : []);
        if (res.ok) {
          const students = users.filter(u => (u.role || '').toLowerCase() !== 'admin');
          const paid = students.filter(u => !!u.isPaid);
          const free = students.filter(u => !u.isPaid);

          const { start, end } = weeklyBoundaries();
          const inWeek = (d) => { const dt = new Date(d || Date.now()); return dt >= start && dt <= end; };
          const newMonth = students.filter(u => inWeek(u.createdAt));
          const newPaidMonth = newMonth.filter(u => !!u.isPaid);
          const newFreeMonth = newMonth.filter(u => !u.isPaid);

          // Ingresos totales y semanales: usar ventas reales en USD desde backend (inmutables)
          let totalIncome = 0;
          let monthIncome = 0;
          try {
            const rTotal = await fetch(`${base}/admin/sales/total`, { headers: { Authorization: `Bearer ${token}` } });
            const jTotal = await rTotal.json().catch(()=>({}));
            if (rTotal.ok && typeof jTotal.totalUSD === 'number') totalIncome = Number(jTotal.totalUSD);
          } catch {}
          try {
            const qs = new URLSearchParams({ start: start.toISOString(), end: end.toISOString() });
            const rWeek = await fetch(`${base}/admin/sales/weekly?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
            const jWeek = await rWeek.json().catch(()=>({}));
            if (rWeek.ok && typeof jWeek.totalUSD === 'number') monthIncome = Number(jWeek.totalUSD);
          } catch {}

          // Pinta KPIs usuarios
          setText('kpi-total-users', fmt(students.length));
          setText('kpi-paid-users', fmt(paid.length));
          setText('kpi-free-users', fmt(free.length));
          setText('kpi-new-users-month', fmt(newMonth.length));
          setText('kpi-new-paid-month', fmt(newPaidMonth.length));
          setText('kpi-new-free-month', fmt(newFreeMonth.length));

          // Pinta KPIs ingresos totales (gross)
          setText('kpi-total-income', `$${fmt(totalIncome)}`);
          // Totales de mentores/socios/MWI se recalculan desde histórico semanal para persistencia real

          // Pinta KPIs ingresos de la semana (gross)
          setText('kpi-month-income', `$${fmt(monthIncome)}`);
          // Mentores y Socios se calculan desde las tablas; MWI neto se deriva de esos dos
          try { updateWeeklyNetKpi && updateWeeklyNetKpi(); } catch {}

          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    };

    const fetchLocalFallback = () => {
      try {
        const allUsers = StorageManager.getAllUsers();
        const students = allUsers.filter(u => u.role !== 'admin');
        const paidStudents = students.filter(u => u.isPaid);
        const freeStudents = students.filter(u => !u.isPaid);
        const income = Number(paidStudents.length) * membershipPrice;
        setText('kpi-total-users', fmt(allUsers.length)); // fallback: total local
        setText('kpi-paid-users', `${fmt(paidStudents.length)} `);
        setText('kpi-free-users', `${fmt(freeStudents.length)} `);
        setText('kpi-total-income', `$${fmt(income)}`);
      } catch {}
    };

    // Cargar settings de backend para obtener membershipPrice (público y admin)
    const loadSettings = async () => {
      const token = localStorage.getItem('mwi:token') || '';
      // 1) Intentar endpoint público de pricing (fuente más directa para precio USD)
      try {
        const rPub = await fetch(`${base}/api/config/pricing/membership`);
        const jPub = await rPub.json().catch(()=>({}));
        if (rPub.ok && jPub && typeof jPub.priceUSD === 'number') {
          membershipPrice = Number(jPub.priceUSD);
          return true;
        }
      } catch {}
      // 2) Intentar endpoint admin de settings
      try {
        const r = await fetch(`${base}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } });
        const j = await r.json().catch(()=>({}));
        if (r.ok && j && j.membership && j.membership.price != null) {
          membershipPrice = Number(j.membership.price);
          return true;
        }
      } catch {}
      // 3) Fallback a local storage si no hay backend
      try {
        const priceRaw = StorageManager.get && StorageManager.get('mwi_membership_price');
        if (priceRaw != null) membershipPrice = Number(priceRaw);
      } catch {}
      return false;
    };

    // Carga de totales históricos (mentores/socios/MWI) desde snapshots semanales
    const loadTotalsFromHistories = async () => {
      const token = localStorage.getItem('mwi:token') || '';
      try {
        // Socios (partners) total: Mongo source of truth from commissions
        let totalAff = 0;
        try {
          // Primario: ruta admin
          let rAff = await fetch(`${base}/admin/partners/commissions-total`, { headers: { Authorization: `Bearer ${token}` } });
          let jAff = await rAff.json().catch(()=>({}));
          if (rAff.ok && typeof jAff.total === 'number') {
            totalAff = Number(jAff.total || 0);
          } else {
            // Fallback: sumar desde historial semanal (comisiones agrupadas por periodo)
            const rHistP = await fetch(`${base}/admin/partners/commissions-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
            const jHistP = await rHistP.json().catch(()=>({ histories: [] }));
            if (rHistP.ok && Array.isArray(jHistP.histories)) {
              totalAff = jHistP.histories.reduce((acc, h) => acc + (Number(h.totalAmount || 0)), 0);
            }
          }
        } catch {}
        // Mongo source of truth: sumar mentorsroyalties (sin fallback a snapshots)
        // Fallback: si el endpoint total no existe aún en el backend, sumar desde el historial semanal
        let totalMent = 0;
        try {
          // Primario: ruta admin
          let rRoy = await fetch(`${base}/admin/mentors/royalties-total`, { headers: { Authorization: `Bearer ${token}` } });
          let jRoy = await rRoy.json().catch(()=>({}));
          if (!(rRoy.ok && typeof jRoy.total === 'number')) {
            // Secundario: ruta API pública montada en mentors router
            try {
              rRoy = await fetch(`${base}/api/mentors/royalties-total`, { headers: { Authorization: `Bearer ${token}` } });
              jRoy = await rRoy.json().catch(()=>({}));
            } catch {}
          }
          if (rRoy.ok && typeof jRoy.total === 'number') {
            totalMent = Number(jRoy.total || 0);
          } else {
            // Historial semanal (admin), luego API pública
            try {
              let rHist = await fetch(`${base}/admin/mentors/royalties-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
              let jHist = await rHist.json().catch(()=>({ histories: [] }));
              if (!(rHist.ok && Array.isArray(jHist.histories))) {
                try {
                  rHist = await fetch(`${base}/api/mentors/royalties-weekly-history`, { headers: { Authorization: `Bearer ${token}` } });
                  jHist = await rHist.json().catch(()=>({ histories: [] }));
                } catch {}
              }
              if (rHist.ok && Array.isArray(jHist.histories)) {
                totalMent = jHist.histories.reduce((acc, h) => acc + (Number(h.totalAmount || 0)), 0);
              } else {
                // Último fallback: snapshots antiguos (mentor)
                try {
                  const rOld = await fetch(`${base}/admin/payments-history?type=mentor`, { headers: { Authorization: `Bearer ${token}` } });
                  const jOld = await rOld.json().catch(()=>({ histories: [] }));
                  if (rOld.ok && Array.isArray(jOld.histories)) {
                    totalMent = jOld.histories.reduce((acc, h) => acc + (Number(h.totalAmount || 0)), 0);
                  }
                } catch {}
              }
            } catch {}
          }
        } catch {}

        // Ajuste semanal ya no es necesario con fuente Mongo; mantener totalAff tal cual
        let adjTotalAff = totalAff;
        let adjTotalMent = totalMent;

        // Gross total (USD) desde backend para calcular neto total estable
        let totalGrossUSD = 0;
        try {
          const rTotal = await fetch(`${base}/admin/sales/total`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await rTotal.json().catch(()=>({}));
          if (rTotal.ok && typeof j.totalUSD === 'number') totalGrossUSD = Number(j.totalUSD);
        } catch {}

        setText('kpi-total-income-mentors', `$${fmt(adjTotalMent)}`);
        setText('kpi-total-income-affiliates', `$${fmt(adjTotalAff)}`);
        const totalNet = Math.max(0, Number(totalGrossUSD) - Number(adjTotalMent) - Number(adjTotalAff));
        setText('kpi-total-income-mwi-net', `$${fmt(totalNet)}`);
      } catch {}
    };

    // Primera carga: settings -> stats + tablas + totales históricos
    loadSettings().then(() => {
      fetchStats().then(ok => { if (!ok) fetchLocalFallback(); });
      loadTotalsFromHistories();
    });
    // Polling cada 20s para reflejar nuevos registros en MongoDB
    try { this.__poll && clearInterval(this.__poll); } catch {}
    this.__poll = setInterval(async () => { await loadSettings(); fetchStats(); }, 20000);
    // Refrescar al volver a la pestaña
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') { loadSettings().then(() => fetchStats()); }
    });

    // --- Compensaciones de Afiliados ---
    // Eliminado rango/porcentaje: pagos basados en 40% directos + overrides
    const couponForUser = (u) => {
      const name = String(u.name || u.fullName || u.username || '').replace(/\s+/g, '');
      const phoneDigits = String(u.phone || u.telefono || '').replace(/\D+/g, '');
      const last4 = phoneDigits.slice(-4) || '0000';
      return `MWI-${name}-${last4}`;
    };
    const nextFriday = () => {
      const d = new Date();
      const day = d.getDay(); // 0..6
      const diff = (5 - day + 7) % 7 || 7; // next Friday
      const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
      return next.toLocaleDateString();
    };

    let __pmResolved = new Map();
    const loadPartnerData = async () => {
      const token = localStorage.getItem('mwi:token') || '';
      const tbody = document.getElementById('partner-table-body');

      // Usuarios (backend preferido)
      let users = [];
      try {
        if (token) {
          const r = await fetch(`${base}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({}));
          if (r.ok && Array.isArray(j.users)) users = j.users;
        }
      } catch {}
      if (!users.length) {
        try { users = StorageManager.getAllUsers() || []; } catch {}
      }
      const affiliates = users.filter(u => !!u.isPaid);
      const emailToUser = new Map(users.map(u => [String(u.email || '').toLowerCase(), u]));

      // Resumen de comisiones por socio de la semana actual (directo 40% + overrides)
      const { start, end } = weeklyBoundaries();
      const qsWeek = new URLSearchParams({ start: start.toISOString(), end: end.toISOString() });
      const summaryByEmail = new Map();
      try {
        if (token) {
          const r = await fetch(`${base}/admin/partners/commissions-weekly?${qsWeek.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({}));
          if (r.ok && Array.isArray(j.partners)) {
            for (const p of j.partners) {
              const k = String(p.email || '').toLowerCase();
              if (!k) continue;
              summaryByEmail.set(k, p);
            }
          }
        }
      } catch {}

      // Métodos de pago (backend preferido) desde payoutMethods
      const payoutByEmail = new Map();
      try {
        if (token) {
          const r = await fetch(`${base}/admin/partners/payout-methods`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({}));
          if (r.ok && Array.isArray(j.methods)) {
            for (const m of j.methods) {
              const k = String(m.email || '').toLowerCase();
              payoutByEmail.set(k, m);
            }
          }
        }
      } catch {}

      // Fallback local: leer mapa por email y por cupón guardado desde Partner Center
      let localPayouts = {};
      let localPayoutsByCoupon = {};
      try { localPayouts = JSON.parse(localStorage.getItem('mwi_partner_payouts') || '{}'); } catch {}
      try { localPayoutsByCoupon = JSON.parse(localStorage.getItem('mwi_partner_payouts_by_coupon') || '{}'); } catch {}

      // Unir emails de afiliados (pagos) y de métodos de pago para asegurar filas
      const payoutEmails = new Set([
        ...Array.from(payoutByEmail.keys()),
        ...Object.keys(localPayouts || {})
      ]);
      const affiliateEmails = new Set(affiliates.map(u => String(u.email || '').toLowerCase()));
      const tableEmails = new Set([...affiliateEmails, ...payoutEmails]);

      // Calcular filas y KPIs
      let totalSales = 0;
      let totalPayout = 0;
      const rows = Array.from(tableEmails).map(emailLc => {
        const u = emailToUser.get(emailLc) || { name: '—', email: emailLc };
        const summary = summaryByEmail.get(emailLc) || { weeklySales: 0, total: 0 };
        const monthSales = Number(summary.weeklySales || 0);
        const payout = Number(summary.total || 0);
        const outstanding = Math.max(0, Math.round(payout * 100) / 100);

        // Método y tarifa con múltiples fallbacks: backend -> local por email -> local por cupón
        let pm = payoutByEmail.get(emailLc) || localPayouts[emailLc] || {};
        if (!pm.method && !pm.code) {
          try {
            const targetCoupon = String(pm.coupon || couponForUser(u) || '').toLowerCase();
            const found = localPayoutsByCoupon[targetCoupon];
            if (found) pm = found;
          } catch {}
        }
        const code = pm.code || pm.method || '';
        let methodText = '—';
        let feeText = '—';
        switch (code) {
          case 'USDT_BEP20': methodText = 'USDT BEP20'; feeText = '3%'; break;
          case 'USA_BANK_INDIVIDUAL': methodText = 'USA BANK (Individual)'; feeText = '6% + $3'; break;
          case 'USA_BANK_BUSINESS': methodText = 'USA BANK (Business)'; feeText = '6% + $3'; break;
          case 'CO_BANK_NAT': methodText = 'COLOMBIA BANK (Natural)'; feeText = '5%'; break;
          case 'CO_BANK_JUR': methodText = 'COLOMBIA BANK (Jurídica)'; feeText = '5%'; break;
          default: methodText = pm.label || pm.method || '—'; feeText = '—';
        }

        // Guardar pm resuelto para usar en el modal
        __pmResolved.set(emailLc, { email: emailLc, label: methodText, fee: feeText, code, coupon: pm.coupon || couponForUser(u), details: pm.details || {} });

        totalSales += monthSales;
        totalPayout += payout;

        const couponText = pm.coupon || couponForUser(u) || '—';
        return `
          <tr>
            <td>${u.name || u.fullName || '—'}</td>
            <td>${u.email || emailLc || '—'}</td>
            <td>${couponText}</td>
            <td>${monthSales}</td>
            <td><button class="payout-detail-btn" data-email="${u.email || emailLc}" style="appearance:none;border:1px solid rgba(209,161,86,.55);background:rgba(209,161,86,.08);color:#e8dcc0;padding:6px 10px;border-radius:8px;font-weight:700;cursor:pointer;">${methodText}</button></td>
            <td>${feeText}</td>
            <td class="adm-outstanding" data-email="${u.email || emailLc}"><span class="adm-outstanding-amount">$${outstanding.toFixed(2)}</span> <button class="adm-outstanding-details-btn" data-email="${u.email || emailLc}" data-user-id="${u._id || ''}" style="appearance:none;border:1px solid rgba(209,161,86,.35);background:rgba(209,161,86,.05);color:#e8dcc0;padding:4px 6px;border-radius:6px;font-weight:700;font-size:11px;cursor:pointer;">ver detalles</button></td>
            <td>${nextFriday()}</td>
          </tr>
        `;
      }).join('');

      setText('partner-kpi-active', fmt(affiliates.length));
      if (tbody) {
        tbody.innerHTML = rows || `<tr><td colspan="11" style="text-align:center; color:#cdbb9a;">Sin afiliados activos</td></tr>`;
      }

      // Actualizar KPI "Ingresos de esta semana para socios" sumando la columna "Monto a pagar" (semana actual)
      try {
        const amounts = Array.from(document.querySelectorAll('#partner-table-body .adm-outstanding-amount'))
          .map(el => (el.textContent || '').replace(/[^0-9.\-]/g, ''))
          .map(v => Number(v || 0));
        const sum = amounts.reduce((a,b) => a + (Number(b)||0), 0);
        setText('kpi-month-income-affiliates', `$${fmt(sum)}`);
        try { updateWeeklyNetKpi && updateWeeklyNetKpi(); } catch {}
      } catch {}

      // --- Tabla de Mentores --- (usar lista administrativa de mentores)
      try {
        const mentorsTbody = document.getElementById('mentors-table-body');
        const mastersTotal = 9; // según requerimiento actual
        const poolPct = 0.15;   // 15%
        const perMasterPct = poolPct / mastersTotal; // ~0.0166 (1.66%)
        const fmtPct = (p) => `${(Math.round(p*10000)/100).toFixed(2)}%`;

        // Fuente oficial de mentores visibles: backend admin
        let mentorsAdmin = [];
        try {
          const token = localStorage.getItem('mwi:token') || '';
          const r = await fetch(`${base}/admin/mentors`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({}));
          mentorsAdmin = Array.isArray(j.mentors) ? j.mentors : (Array.isArray(j) ? j : []);
        } catch (e) { mentorsAdmin = []; }

        // Masters actuales para conteo (preferir StorageManager para reflejar edición admin)
        const masters = (typeof StorageManager !== 'undefined' && StorageManager.getAllMasters)
          ? (StorageManager.getAllMasters() || [])
          : ((window.MWI && window.MWI.MOCK_DATA && window.MWI.MOCK_DATA.masters) || []);

        // Normalizar y comparar instructor del master con mentor (slug o nombre)
        const canon = (s) => String(s || '')
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // quitar acentos
          .replace(/[^a-z0-9]/g, '');        // quitar espacios, guiones y símbolos
        const matchesInstructor = (masterInstr, mentor) => {
          const mi = canon(masterInstr);
          return mi && (mi === canon(mentor.slug) || mi === canon(mentor.name));
        };

        // Construir filas desde lista admin, agregando slug/email para vincular con backend payments
        let mentors = [];
        if (Array.isArray(mentorsAdmin) && mentorsAdmin.length) {
          mentors = mentorsAdmin.map(m => {
            const count = Array.isArray(m.assignedMasterIds) ? m.assignedMasterIds.length : 0;
            return { name: m.name || m.slug || '—', slug: m.slug || '', email: m.email || '', count };
          });
        } else {
          // Sin mentores admin -> sin datos
          mentors = [];
        }

        if (!mentors.length) {
          if (mentorsTbody) mentorsTbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#cdbb9a;">Sin mentores configurados</td></tr>`;
          return;
        }

        const mentorRows = mentors.map((m) => {
          const totalPct = perMasterPct * Number(m.count || 0);
          const payPerSale = Math.round((membershipPrice / 2) * (totalPct / 100) * 100) / 100; // USD por venta (base mitad)
          const monthlyPay = Math.round(payPerSale * totalSales * 100) / 100;    // estimado
          return `
            <tr data-mentor-email="${(m.email || '').toLowerCase()}" data-mentor-slug="${(m.slug || '').toLowerCase()}">
              <td>${m.name}</td>
              <td>${m.email || '—'}</td>
              <td class="masters-count">${m.count}</td>
              <td class="per-master-pct">${fmtPct(perMasterPct)}</td>
              <td class="total-pct">${fmtPct(totalPct)}</td>
              <td class="pay-per-sale">$${payPerSale.toFixed(2)}</td>
              <td class="monthly-sales">${fmt(totalSales)}</td>
              <td class="monthly-payment">$${fmt(monthlyPay)}</td>
            </tr>
          `;
        }).join('');

        if (mentorsTbody) mentorsTbody.innerHTML = mentorRows || `<tr><td colspan="8" style="text-align:center; color:#cdbb9a;">Sin mentores disponibles</td></tr>`;
        try { updateMentorsKpi && updateMentorsKpi(); } catch {}
        
        // Tras renderizar, actualizar métricas financieras desde backend
        try {
          await loadMentorPayments();
          await loadMentorMonthlyPayments();
          await loadMentorWeeklyPayments && (await loadMentorWeeklyPayments());
          try { updateMentorsKpi && updateMentorsKpi(); } catch {}
        } catch {}
      } catch {}
    };

    // Cargar conteo de masters por mentor desde backend financiero
    const loadMentorPayments = async () => {
      try {
        const token = localStorage.getItem('mwi:token');
        if (!token) return;
        const res = await fetch(`${base}/api/mentors/payments`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const { mentors } = await res.json().catch(()=>({ mentors: [] }));
        if (!Array.isArray(mentors)) return;
        mentors.forEach(ment => {
          const emailKey = String(ment.email || '').toLowerCase();
          const slugKey = String(ment.slug || '').toLowerCase();
          let row = null;
          if (emailKey) row = document.querySelector(`tr[data-mentor-email="${CSS.escape(emailKey)}"]`);
          if (!row && slugKey) row = document.querySelector(`tr[data-mentor-slug="${CSS.escape(slugKey)}"]`);
          if (!row) return;
          const cell = row.querySelector('.masters-count');
          if (cell) cell.textContent = Number(ment.mastersCount || 0);
        });
      } catch {}
    };

    // Endpoint único: /api/mentors/monthly-payments
    const loadMentorMonthlyPayments = async () => {
      try {
        const token = localStorage.getItem('mwi:token');
        if (!token) return;
        const res = await fetch(`${base}/api/mentors/monthly-payments`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const { meta, mentors } = await res.json().catch(()=>({ meta: {}, mentors: [] }));
        // Actualizar descripción superior
        try {
          const el = document.getElementById('mentors-meta-desc');
          if (el && meta) {
            const totalMasters = Number(meta.totalMasters || 0);
            const ppm = Number(meta.percentPerMaster || 0);
            el.textContent = `Pool: 15% del valor del curso · Actualmente ${totalMasters} masters → ${ppm.toFixed(2)}% por master`;
          }
        } catch {}
        if (!Array.isArray(mentors)) return;
        mentors.forEach(m => {
          const emailKey = String(m.email || '').toLowerCase();
          const slugKey = String(m.slug || '').toLowerCase();
          let row = null;
          if (emailKey) row = document.querySelector(`tr[data-mentor-email="${CSS.escape(emailKey)}"]`);
          if (!row && slugKey) row = document.querySelector(`tr[data-mentor-slug="${CSS.escape(slugKey)}"]`);
          if (!row) return;
          const setText = (sel, val) => { const cell = row.querySelector(sel); if (cell) cell.textContent = val; };
          setText('.masters-count', Number(m.mastersDictados || 0));
          setText('.per-master-pct', `${(Number(m.percentPerMaster || 0)).toFixed(2)}%`);
          setText('.total-pct', `${(Number(m.percentTotal || 0)).toFixed(2)}%`);
          setText('.pay-per-sale', `$${(Number(m.paymentPerSale || 0)).toFixed(2)}`);
          setText('.monthly-sales', String(Number(m.monthlySales || 0)));
          setText('.monthly-payment', `$${(Number(m.monthlyPayment || 0)).toFixed(2)}`);
        });
      } catch {}
    };

    // Pagos semanales de mentores basados en ventas reales (USD)
    const loadMentorWeeklyPayments = async () => {
      try {
        const token = localStorage.getItem('mwi:token');
        if (!token) return;
        const { start, end } = weeklyBoundaries();
        const qs = new URLSearchParams({ start: start.toISOString(), end: end.toISOString() });
        const res = await fetch(`${base}/api/mentors/weekly-payments?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const { meta, mentors } = await res.json().catch(()=>({ meta: {}, mentors: [] }));
        // Actualizar descripción superior con ventas de la semana
        try {
          const el = document.getElementById('mentors-meta-desc');
          if (el && meta) {
            const totalMasters = Number(meta.totalMasters || 0);
            const ppm = Number(meta.percentPerMaster || 0);
            const ws = Number(meta.weeklySales || 0);
            el.textContent = `Pool: 15% del valor del curso · Actualmente ${totalMasters} masters → ${ppm.toFixed(2)}% por master · Ventas semana: ${ws}`;
          }
        } catch {}
        if (!Array.isArray(mentors)) return;
        mentors.forEach(m => {
          const emailKey = String(m.email || '').toLowerCase();
          const slugKey = String(m.slug || '').toLowerCase();
          let row = null;
          if (emailKey) row = document.querySelector(`tr[data-mentor-email="${CSS.escape(emailKey)}"]`);
          if (!row && slugKey) row = document.querySelector(`tr[data-mentor-slug="${CSS.escape(slugKey)}"]`);
          if (!row) return;
          const setText = (sel, val) => { const cell = row.querySelector(sel); if (cell) cell.textContent = val; };
          setText('.masters-count', Number(m.mastersDictados || 0));
          setText('.per-master-pct', `${(Number(m.percentPerMaster || 0)).toFixed(2)}%`);
          setText('.total-pct', `${(Number(m.percentTotal || 0)).toFixed(2)}%`);
          setText('.pay-per-sale', `$${(Number(m.paymentPerSale || 0)).toFixed(2)}`);
          setText('.monthly-sales', String(Number(m.weeklySales || 0))); // reutilizamos clase
          setText('.monthly-payment', `$${(Number(m.weeklyPayment || 0)).toFixed(2)}`); // reutilizamos clase
        });
      } catch {}
    };

    // KPI Mentores: sumar columna "Pago semana"
    const updateMentorsKpi = () => {
      try {
        const cells = document.querySelectorAll('#mentors-table-body .monthly-payment');
        let sum = 0;
        cells.forEach(el => {
          const raw = (el.textContent || '').trim();
          const num = Number(raw.replace(/[^0-9.\-]/g, '')) || 0;
          sum += num;
        });
        setText('kpi-month-income-mentors', `$${fmt(sum)}`);
        try { updateWeeklyNetKpi && updateWeeklyNetKpi(); } catch {}
      } catch {}
    };

    // Recalcula "Ingresos de esta semana libres para MWI" = ingreso semana - mentores - socios
    const updateWeeklyNetKpi = () => {
      try {
        const parseMoney = (id) => {
          const el = document.getElementById(id);
          if (!el) return 0;
          const raw = (el.textContent || '').trim();
          return Number(raw.replace(/[^0-9.\-]/g, '')) || 0;
        };
        const gross = parseMoney('kpi-month-income');
        const mentors = parseMoney('kpi-month-income-mentors');
        const affiliates = parseMoney('kpi-month-income-affiliates');
        const net = Math.max(0, gross - mentors - affiliates);
        const el = document.getElementById('kpi-month-income-mwi-net');
        if (el) el.textContent = `$${fmt(net)}`;
      } catch {}
    };

    // Carga inicial y handlers
    loadSettings().then(() => { loadPartnerData(); });
    try { this.__pollPartner && clearInterval(this.__pollPartner); } catch {}
    this.__pollPartner = setInterval(() => { loadPartnerData(); loadTotalsFromHistories(); }, 30000);
    document.getElementById('partner-refresh')?.addEventListener('click', () => loadPartnerData());
    document.getElementById('partner-export')?.addEventListener('click', () => {
      try {
        const rows = [['Usuario','Email','Cupón','Ventas semana','Método de deposito','Tarifa','Monto a pagar','Próximo pago']];
        document.querySelectorAll('#partner-table-body tr').forEach(tr => {
          const tds = Array.from(tr.children);
          if (!tds.length) return;
          const cols = tds.map((td, idx) => {
            if (idx === 6) {
              const amtEl = td.querySelector('.adm-outstanding-amount');
              return (amtEl?.textContent || '').trim();
            }
            return (td.textContent || '').trim();
          });
          rows.push(cols);
        });
        const csv = rows.map(r => r.map(v => `"${v.replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `compensaciones_${new Date().toISOString().slice(0,7)}.csv`; a.click();
        URL.revokeObjectURL(url);
      } catch {}
    });

    // Modal handlers y detalle
    const modal = () => document.getElementById('adm-payout-modal');
    const detailEl = () => document.getElementById('adm-payout-detail');
    const openModal = (html) => { const m = modal(); const d = detailEl(); if (d) d.innerHTML = html || ''; if (m) m.classList.add('open'); };
    const closeModal = () => { const m = modal(); if (m) m.classList.remove('open'); };
    document.getElementById('adm-payout-close')?.addEventListener('click', closeModal);
    modal()?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') closeModal(); });

    const buildDetailsHTML = (pm) => {
      const code = pm.code || '';
      const d = pm.details || {};
      const wrap = (rows) => `<div class="grid">${rows.join('')}</div>`;
      const row = (label, value) => `<div class="row"><div class="label">${label}</div><div class="value">${value || '—'}</div></div>`;
      if (code === 'USDT_BEP20') {
        const wallet = (d.usdt && d.usdt.wallet) || d.wallet || '';
        return wrap([row('Método', 'USDT BEP20'), row('Wallet', wallet), row('Fee', '3%')]);
      }
      if (code === 'USA_BANK_INDIVIDUAL') {
        const ind = (d.usa && d.usa.individual) || d.individual || {};
        return wrap([
          row('Método', 'USA BANK (Individual)'),
          row('Nombre', ind.firstName || ''),
          row('Apellido', ind.lastName || ''),
          row('ACH Routing', ind.routing || ''),
          row('ACH Account', ind.account || ''),
          row('Fee', '6% + $3')
        ]);
      }
      if (code === 'USA_BANK_BUSINESS') {
        const biz = (d.usa && d.usa.business) || d.business || {};
        return wrap([
          row('Método', 'USA BANK (Business)'),
          row('Empresa', biz.businessName || ''),
          row('ACH Routing', biz.routing || ''),
          row('ACH Account', biz.account || ''),
          row('Fee', '6% + $3')
        ]);
      }
      if (code === 'CO_BANK_NAT') {
        const nat = (d.co && d.co.natural) || d.natural || d || {};
        return wrap([
          row('Método', 'COLOMBIA BANK (Natural)'),
          row('Nombre', nat.firstName || ''),
          row('Apellido', nat.lastName || ''),
          row('Documento', nat.document || ''),
          row('Banco', nat.bank || ''),
          row('Tipo de cuenta', nat.accountType || ''),
          row('Número de cuenta', nat.account || ''),
          row('Fee', '5%')
        ]);
      }
      if (code === 'CO_BANK_JUR') {
        const jur = (d.co && d.co.juridica) || d.juridica || d || {};
        return wrap([
          row('Método', 'COLOMBIA BANK (Jurídica)'),
          row('Empresa', jur.businessName || ''),
          row('NIT', jur.nit || ''),
          row('Banco', jur.bank || ''),
          row('Tipo de cuenta', jur.accountType || ''),
          row('Número de cuenta', jur.account || ''),
          row('Fee', '5%')
        ]);
      }
      return wrap([row('Método', pm.label || '—')]);
    };

    // Delegación de eventos para botones de detalle
    document.getElementById('partner-table-body')?.addEventListener('click', (ev) => {
      const btn = ev.target && ev.target.closest ? ev.target.closest('.payout-detail-btn') : null;
      if (!btn) return;
      const email = String(btn.getAttribute('data-email') || '').toLowerCase();
      const pm = __pmResolved.get(email);
      if (!pm) { openModal('<div>No hay detalles disponibles</div>'); return; }
      const html = buildDetailsHTML(pm);
      openModal(html);
    });

    // Modal breakdown helpers
    const breakdownModal = () => document.getElementById('adm-payout-breakdown-modal');
    const breakdownEl = () => document.getElementById('adm-payout-breakdown');
    const openBreakdown = (html) => { const m = breakdownModal(); const d = breakdownEl(); if (d) d.innerHTML = html || ''; if (m) m.classList.add('open'); };
    const closeBreakdown = () => { const m = breakdownModal(); if (m) m.classList.remove('open'); };
    document.getElementById('adm-payout-breakdown-close')?.addEventListener('click', closeBreakdown);
    breakdownModal()?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') closeBreakdown(); });

    const buildBreakdownHTML = (data) => {
      try {
        const fmtMoney = (n) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n||0));
        const fmtDate = (d) => {
          try { const dt = new Date(d); return dt.toLocaleDateString(); } catch { return '—'; }
        };
        const items = Array.isArray(data.items) ? data.items : [];
        const sum = data.summary || { direct: 0, override1: 0, override2: 0, total: 0 };
        const header = `
          <div class="grid">
            <div class="row"><div class="label">Socio</div><div class="value">${(data.partner?.name || '')} ${data.partner?.email ? '· ' + data.partner.email : ''}</div></div>
            <div class="row"><div class="label">Periodo</div><div class="value">${data.month || ''}</div></div>
            <div class="row"><div class="label">Total directo (40%)</div><div class="value">$${fmtMoney(sum.direct)}</div></div>
            <div class="row"><div class="label">Override 1 (5%)</div><div class="value">$${fmtMoney(sum.override1)}</div></div>
            <div class="row"><div class="label">Override 2 (3%)</div><div class="value">$${fmtMoney(sum.override2)}</div></div>
            <div class="row"><div class="label">Total a pagar</div><div class="value">$${fmtMoney(sum.total)}</div></div>
          </div>
        `;
        if (!items.length) return header + '<div style="margin-top:10px;">No hay detalles disponibles</div>';
        const rows = items.map(it => {
          const tipo = it.level === 0 ? '40%' : (it.level === 1 ? '5%' : '3%');
          // Mostrar siempre al comprador (persona que adquirió la membresía)
          const afiliado = it.buyerName || it.buyerEmail || '—';
          return `
            <tr>
              <td>${fmtDate(it.date)}</td>
              <td>${afiliado}</td>
              <td>${tipo}</td>
              <td>$${fmtMoney(it.reward)}</td>
            </tr>
          `;
        }).join('');
        const table = `
          <div style="margin-top:10px;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario afiliado</th>
                  <th>Tipo de compensación</th>
                  <th>Compensación generada</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        `;
        return header + table;
      } catch { return '<div>Error generando detalle</div>'; }
    };

    // Click handler: ver detalles en monto a pagar
    document.getElementById('partner-table-body')?.addEventListener('click', async (ev) => {
      const btn = ev.target && ev.target.closest ? ev.target.closest('.adm-outstanding-details-btn') : null;
      if (!btn) return;
      const email = String(btn.getAttribute('data-email') || '').trim();
      const userId = String(btn.getAttribute('data-user-id') || '').trim();
      if (!email && !userId) return;
      try {
        const token = localStorage.getItem('mwi:token') || '';
        const now = new Date();
        const monthParam = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
        async function fetchDetail(preferUserId) {
          const qs = new URLSearchParams();
          if (preferUserId && userId) qs.set('userId', userId); else qs.set('email', email);
          qs.set('month', monthParam);
          const r = await fetch(`${base}/admin/partners/commissions-detail?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({ message: 'Sin JSON' }));
          return { r, j };
        }
        let { r, j } = await fetchDetail(true);
        if (!r.ok) { ({ r, j } = await fetchDetail(false)); }
        if (r.ok) {
          openBreakdown(buildBreakdownHTML(j));
        } else {
          const status = r.status;
          const msg = (j && j.message) ? j.message : 'No hay detalles disponibles';
          openBreakdown(`<div>${msg} (HTTP ${status})</div>`);
        }
      } catch {
        openBreakdown('<div>Error cargando el detalle</div>');
      }
    });

    // Pago: abrir modal y confirmar
    const payModal = document.getElementById('adm-pay-modal');
    const payEmailEl = document.getElementById('adm-pay-email');
    const payAmountEl = document.getElementById('adm-pay-amount');
    const payPeriodEl = document.getElementById('adm-pay-period');
    const openPayModal = (email, amount) => {
      if (payEmailEl) payEmailEl.textContent = email || '—';
      if (payAmountEl) payAmountEl.value = String(amount || '0');
      const now = new Date();
      const per = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
      if (payPeriodEl) payPeriodEl.value = per;
      if (payModal) payModal.classList.add('open');
    };
    const closePayModal = () => { if (payModal) payModal.classList.remove('open'); };
    document.getElementById('adm-pay-cancel')?.addEventListener('click', closePayModal);
    payModal?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') closePayModal(); });

    document.getElementById('partner-table-body')?.addEventListener('click', (ev) => {
      const btn = ev.target && ev.target.closest ? ev.target.closest('.adm-pay-btn') : null;
      if (!btn) return;
      const email = btn.getAttribute('data-email') || '';
      const amount = Number(btn.getAttribute('data-default-amount') || '0');
      openPayModal(email, amount);
    });

    document.getElementById('adm-pay-confirm')?.addEventListener('click', async () => {
      const email = (payEmailEl?.textContent || '').trim();
      const amount = Number(payAmountEl?.value || '0');
      const period = (payPeriodEl?.value || '').trim();
      if (!email || !amount || amount <= 0) return;
      try {
        const token = localStorage.getItem('mwi:token') || '';
        const r = await fetch(`${base}/admin/partners/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ email, amount, period })
        });
        if (r.ok) {
          // Resetear UI: monto a pagar a 0 para ese usuario
          const cell = document.querySelector(`.adm-outstanding[data-email="${CSS.escape(email)}"]`);
          const amt = cell?.querySelector('.adm-outstanding-amount');
          if (amt) amt.textContent = '$0.00';
          closePayModal();
        }
      } catch {}
    });
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminDashboardPage;
}

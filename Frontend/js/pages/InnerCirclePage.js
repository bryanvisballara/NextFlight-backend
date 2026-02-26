(function(){
  const formatDate = (d) => {
    try {
      const date = new Date(d);
      return date.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
    } catch { return '—'; }
  };

  const renderStatusBlock = (user) => {
    const isPaid = !!(user && user.isPaid);
    const signals = (user && user.signals) || {};
    const status = String(signals.status || 'inactive').toLowerCase();
    const next = signals.currentPeriodEnd ? formatDate(signals.currentPeriodEnd) : null;
    const active = isPaid && status === 'active';

    let content = '';
    if (!isPaid) {
      content = `
        <div class="card" style="background:#13110f;border:1px solid rgba(212,169,85,.2);border-radius:12px;padding:16px;color:#e8dcc0;">
          <h2 style="margin:0 0 10px;">Debes ser miembro del instituto</h2>
          <p style="margin:0 0 12px;color:#cdbb9a;">Primero activa tu membresía para acceder al Inner Circle.</p>
          <div style="display:flex;gap:10px;">
            <a href="/services" class="btn" style="background:#d4a955;color:#2a1f0b;padding:8px 12px;border-radius:10px;border:1px solid #c59d4a;font-weight:800;">Ver servicios</a>
          </div>
        </div>`;
    } else if (!active) {
      content = `
        <div class="card" style="background:#13110f;border:1px solid rgba(212,169,85,.2);border-radius:12px;padding:16px;color:#e8dcc0;">
          <h2 style="margin:0 0 10px;">Activa tu suscripción</h2>
          <p style="margin:0 0 12px;color:#cdbb9a;">Accede al canal privado de señales por $80.000 COP mensual por MercadoPago o $20 USD por Stripe.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button id="ic-pay-mp" class="btn" style="background:#009EE3;color:#fff;padding:8px 12px;border-radius:10px;border:1px solid #0088c0;font-weight:800;">suscríbete con Mercado Pago</button>
            <button id="ic-pay-stripe" class="btn" style="background:#635BFF;color:#fff;padding:8px 12px;border-radius:10px;border:1px solid #5248f7;font-weight:800;">suscríbete con Stripe</button>
          </div>
          <p style="margin-top:8px;color:#a9916b;font-size:13px;">Estado actual: ${status}</p>
        </div>`;
    } else {
      content = `
        <div class="card" style="background:#13110f;border:1px solid rgba(212,169,85,.2);border-radius:12px;padding:16px;color:#e8dcc0;">
          <h2 style="margin:0 0 6px;">Tu suscripción está activa</h2>
          <p style="margin:0 0 12px;color:#cdbb9a;">Próximo cobro: ${next || '—'}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button id="ic-telegram" class="btn" style="background:#3ec67a;color:#0f0f0f;padding:8px 12px;border-radius:10px;border:1px solid #2da764;font-weight:800;">Entrar al canal de Telegram</button>
            <button id="ic-cancel" class="btn" style="background:#221e1a;color:#e8dcc0;padding:8px 12px;border-radius:10px;border:1px solid rgba(229,57,53,.55);font-weight:800;">Cancelar suscripción</button>
          </div>
          <p style="margin-top:8px;color:#a9916b;font-size:13px;">Estado actual: ${status}</p>
        </div>`;
    }
    return content;
  };

  const InnerCirclePage = {
    render() {
      const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? (AuthManager.getCurrentUser() || {}) : {};
      const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
      return `
        <div class="inner-circle-page">
          ${Header.render(false, true, true, true)}
          <style>
            .inner-circle-page .mwi-header { padding: 8px 0; height: 58px; }
            .inner-circle-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
            .inner-circle-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
            .inner-circle-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
            .inner-circle-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }
            .inner-circle-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
            .inner-circle-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
            .inner-circle-page .mwi-header .mwi-header-actions .profile-menu { right:0; }

            /* Off-canvas sidebar */
            .ic-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
            .ic-sidebar.open { display:block; }
            .ic-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
            .ic-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); display:flex; flex-direction:column; }
            .ic-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
            .ic-sidebar .nav-item:hover { color:#f6e9c9; }
            .ic-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }

            @media (max-width: 640px) {
              .inner-circle-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
              .inner-circle-page .mwi-header .mwi-logo { justify-self: center; }
            }
          </style>

          <main style="padding: 48px 20px 20px;">
            <div id="ic-banner" style="display:none;max-width:1100px;margin:0 auto 12px;
              background:#102215;border:1px solid rgba(62,198,122,.35);color:#d5f3e3;padding:12px 14px;border-radius:10px;">
            </div>
            <!-- Marketing hero section for Inner Circle -->
            <section aria-labelledby="sic-title" style="max-width:1100px;margin:0 auto 18px;">
              <style>
                .sic-container{ display:flex; gap:36px; align-items:flex-start; }
                .sic-image{ flex:0 0 46%; }
                .sic-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
                .sic-content{ flex:1 1 auto; padding:12px 6px; }
                .sic-title{ font-size:28px; margin:0 0 12px; color:#fff; }
                .sic-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:18px; }
                .sic-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
                .sic-list{ margin:12px 0 18px 18px; color:#efe6d6; }
                @media (max-width:880px){ .sic-container{ flex-direction:column; } .sic-image{ flex:0 0 auto; } }
              </style>
              <div class="sic-container">
                <div class="sic-image">
                  <img src="assets/images/services-inner-circle.png" alt="Inner Circle">
                </div>
                <div class="sic-content">
                  <h2 id="sic-title" class="sic-title">El mundo del <span style="color:#d4a955;">TRADING</span></h2>
                  <div class="sic-subtitle">Inner Circle — Señales & Acompañamiento en vivo</div>
                  <p class="sic-lead">¿Quieres operar en los mercados con más seguridad y acompañamiento real? Forma parte de un grupo exclusivo donde recibirás señales, análisis en vivo y seguimiento personalizado.</p>
                  <h4 style="color:#f6e7c9; margin-top:6px;">¿Qué incluye el servicio?</h4>
                  <ul class="sic-list">
                    <li>Señales de entrada y salida claras, con stop loss y take profit.</li>
                    <li>Operaciones de alta probabilidad y metodología probada.</li>
                    <li>Trading en vivo: análisis, comentarios y seguimiento de operaciones.</li>
                    <li>Explicación simple del porqué de cada señal (ideal para aprender).</li>
                    <li>Señales frecuentes, casi todos los días hábiles.</li>
                    <li>Acceso privado al grupo de Telegram.</li>
                  </ul>
                </div>
              </div>
            </section>
            <section id="ic-content" class="dashboard-page" style="max-width:920px;margin:0 auto;">
              <h1 style="margin:0 0 16px;color:#efe6d6;">MWI Inner Circle</h1>
              ${renderStatusBlock(user)}
            </section>
          </main>

          <!-- Sidebar overlay -->
          <div id="podcast-sidebar" class="ic-sidebar" aria-hidden="true" role="dialog">
            <div class="overlay" data-close="true"></div>
            <aside>
              <div class="nav-item" id="nav-go-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
              <div class="nav-item" id="nav-go-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
              <div class="nav-item" id="nav-go-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
              <div class="nav-item" id="nav-go-podcast"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 0 1 7 7v5"/><path d="M5 17v-5a7 7 0 0 1 7-7"/><circle cx="12" cy="12" r="3"/></svg></span><span>Podcast</span></div>
              ${isPaidUser ? `<div class="nav-item" id="nav-go-partner"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span>MWI Partner Center</span></div>` : ''}
              ${isPaidUser ? `<div class="nav-item" id="nav-go-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
            </aside>
          </div>
        </div>
      `;
    },
    async after_render() {
      try {
        const user = await AuthManager.bootstrap();
        try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
        // Sidebar toggle
        const sidebar = document.getElementById('podcast-sidebar');
        const toggleBtn = document.getElementById('podcast-menu-toggle');
        toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
        sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });
        const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
        document.getElementById('nav-go-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
        document.getElementById('nav-go-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
        document.getElementById('nav-go-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
        document.getElementById('nav-go-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
        document.getElementById('nav-go-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
        document.getElementById('nav-go-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });

        const container = document.getElementById('ic-content');
        if (!container) return;
        container.innerHTML = `
          <h1 style="margin:0 0 16px;color:#efe6d6;">MWI Inner Circle</h1>
          ${renderStatusBlock(user || {})}
        `;
        // If user is paid but signals not active, try server-side verification then refresh UI
        try {
          const isPaid = !!(user && user.isPaid);
          const status = String((user && user.signals && user.signals.status) || 'inactive').toLowerCase();
          if (isPaid && status !== 'active' && window.PaymentService && typeof window.PaymentService.verifySignalsSubscription === 'function') {
            const res = await window.PaymentService.verifySignalsSubscription();
            if (res && res.ok) {
              const refreshed = await AuthManager.bootstrap();
              container.innerHTML = `
                <h1 style="margin:0 0 16px;color:#efe6d6;">MWI Inner Circle</h1>
                ${renderStatusBlock(refreshed || {})}
              `;
              const banner = document.getElementById('ic-banner');
              if (banner) {
                banner.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                  <div style="font-weight:700;">✅ Suscripción activada</div>
                  <div style="display:flex;gap:8px;">
                    <button id="ic-banner-telegram" class="btn" style="background:#3ec67a;color:#0f0f0f;padding:6px 10px;border-radius:9px;border:1px solid #2da764;font-weight:800;">Entrar a Telegram</button>
                    <button id="ic-banner-close" class="btn" style="background:transparent;color:#d5f3e3;padding:6px 10px;border-radius:9px;border:1px solid rgba(62,198,122,.35);">Cerrar</button>
                  </div>
                </div>`;
                banner.style.display = 'block';
                document.getElementById('ic-banner-close')?.addEventListener('click', () => { banner.style.display = 'none'; });
                document.getElementById('ic-banner-telegram')?.addEventListener('click', async () => {
                  try { const link = await window.PaymentService.getSignalsTelegramLink(); if (link) window.location.href = link; } catch {}
                });
              }
            }
          }
        } catch {}
        // Success/pending/error banner based on query param
        try {
          const hash = String(window.location.hash || '');
          const qs = hash.includes('?') ? hash.split('?')[1] : '';
          const params = new URLSearchParams(qs);
          const sig = params.get('signals');
          const banner = document.getElementById('ic-banner');
          if (sig && banner) {
            let html = '';
            if (sig === 'success') {
              html = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                        <div style="font-weight:700;">✅ Suscripción activada</div>
                        <div style="display:flex;gap:8px;">
                          <button id="ic-banner-telegram" class="btn" style="background:#3ec67a;color:#0f0f0f;padding:6px 10px;border-radius:9px;border:1px solid #2da764;font-weight:800;">Entrar a Telegram</button>
                          <button id="ic-banner-close" class="btn" style="background:transparent;color:#d5f3e3;padding:6px 10px;border-radius:9px;border:1px solid rgba(62,198,122,.35);">Cerrar</button>
                        </div>
                      </div>`;
            } else if (sig === 'pending') {
              html = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                        <div>⏳ Suscripción pendiente de confirmación. Si no se actualiza, intenta de nuevo.</div>
                        <button id="ic-banner-close" class="btn" style="background:transparent;color:#d5f3e3;padding:6px 10px;border-radius:9px;border:1px solid rgba(62,198,122,.35);">Cerrar</button>
                      </div>`;
            } else if (sig === 'error') {
              html = `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
                        <div>🚫 Error al procesar la suscripción. Intenta nuevamente.</div>
                        <button id="ic-banner-close" class="btn" style="background:transparent;color:#d5f3e3;padding:6px 10px;border-radius:9px;border:1px solid rgba(62,198,122,.35);">Cerrar</button>
                      </div>`;
            }
            if (html) {
              banner.innerHTML = html;
              banner.style.display = 'block';
              document.getElementById('ic-banner-close')?.addEventListener('click', () => { banner.style.display = 'none'; });
              document.getElementById('ic-banner-telegram')?.addEventListener('click', async () => {
                try {
                  const link = await window.PaymentService.getSignalsTelegramLink();
                  if (link) window.location.href = link;
                } catch (e) { try { Utils.showError(String(e.message || e)); } catch {} }
              });
            }
          }
        } catch {}
        // Bind actions
        // Mercado Pago subscription
        document.getElementById('ic-pay-mp')?.addEventListener('click', async () => {
          try {
            const url = await window.PaymentService.createSignalsSubscription();
            window.location.href = url;
          } catch (e) {
            try { Utils.showError(String(e.message || e)); } catch {}
          }
        });
        // Stripe subscription
        document.getElementById('ic-pay-stripe')?.addEventListener('click', async () => {
          try {
            if (window.PaymentService && typeof window.PaymentService.createStripeSignalsSubscription === 'function') {
              const url = await window.PaymentService.createStripeSignalsSubscription();
              window.location.href = url;
            } else {
              throw new Error('Stripe no disponible');
            }
          } catch (e) {
            try { Utils.showError(String(e.message || e)); } catch {}
          }
        });
        document.getElementById('ic-telegram')?.addEventListener('click', async () => {
          try {
            const url = await window.PaymentService.getSignalsTelegramLink();
            window.location.href = url;
          } catch (e) {
            try { Utils.showError(String(e.message || e)); } catch {}
          }
        });
        // Cancel modal flow
        const showCancelModal = () => {
          const modal = document.createElement('div');
          modal.id = 'ic-cancel-modal';
          modal.innerHTML = `
            <div style="position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;inset:0;background:rgba(0,0,0,.6);"></div>
              <div role="dialog" aria-modal="true" style="position:relative;max-width:640px;width:90%;background:#0e0e0d;border:1px solid rgba(212,169,85,.25);border-radius:12px;padding:20px;color:#e8dcc0;box-shadow:0 18px 60px rgba(0,0,0,.6);">
                <h3 style="margin:0 0 10px;color:#f6e9c9;">¿Deseas cancelar tu suscripción?</h3>
                <p style="margin:0 0 12px;color:#cdbb9a;">Al cancelar, dejarás de recibir:</p>
                <ul style="margin:0 0 16px 18px;color:#efe6d6;">
                  <li>Señales con stop loss y take profit.</li>
                  <li>Trading en vivo y seguimiento de operaciones.</li>
                  <li>Explicación simple del porqué de cada señal.</li>
                  <li>Acceso privado al grupo de Telegram.</li>
                </ul>
                <div style="display:flex;gap:10px;justify-content:flex-end;">
                  <button id="ic-cancel-confirm" class="btn" style="background:#221e1a;color:#e8dcc0;padding:8px 12px;border-radius:10px;border:1px solid rgba(229,57,53,.55);font-weight:800;">Cancelar suscripción</button>
                  <button id="ic-cancel-back" class="btn" style="background:#2a1f0b;color:#e8dcc0;padding:8px 12px;border-radius:10px;border:1px solid rgba(212,169,85,.35);font-weight:800;">Volver</button>
                </div>
              </div>
            </div>`;
          document.body.appendChild(modal);
          const close = () => { try { document.body.removeChild(modal); } catch {} };
          modal.querySelector('#ic-cancel-back')?.addEventListener('click', close);
          modal.querySelector('#ic-cancel-confirm')?.addEventListener('click', async () => {
            try {
              await window.PaymentService.cancelSignalsSubscription();
              try { Utils.showSuccess('Suscripción cancelada'); } catch {}
              close();
              const refreshed = await AuthManager.bootstrap();
              container.innerHTML = `
                <h1 style="margin:0 0 16px;color:#efe6d6;">MWI Inner Circle</h1>
                ${renderStatusBlock(refreshed || {})}
              `;
            } catch (e) {
              try { Utils.showError(String(e.message || e)); } catch {}
            }
          });
        };

        document.getElementById('ic-cancel')?.addEventListener('click', () => {
          showCancelModal();
        });
      } catch {}
    }
  };

  window.InnerCirclePage = InnerCirclePage;
})();

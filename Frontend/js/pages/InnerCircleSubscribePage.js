const InnerCircleSubscribePage = {
  render() {
    const PRICE_USD = 19.99;
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    return `
      <div class="services-page">
        ${typeof Header !== 'undefined' && Header && typeof Header.render === 'function' ? Header.render(false, true, true, true) : ''}
        <style>
          .services-page .mwi-header { padding: 8px 0; height: 58px; }
          .services-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .services-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .services-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .services-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }

          /* Perfil en header: mover al borde derecho y aumentar tamaño */
          .services-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
          .services-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
          .services-page .mwi-header .mwi-header-actions .profile-menu { right:0; }
          /* Mobile: center logo in header */
          @media (max-width: 640px) {
            .services-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .services-page .mwi-header .mwi-logo { justify-self: center; }
          }
        </style>
        <main class="service-page" style="min-height:80vh; padding:48px 20px; color:#efe6d6; background-color:#0f0f0f; background-image:linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url('assets/images/fondodashboard.png'); background-size:cover; background-position:center; background-repeat:no-repeat;">
        <style>
          .ic-wrap{ max-width:1100px; margin:0 auto; }
          .ic-container{ display:flex; gap:36px; align-items:flex-start; }
          .ic-image{ flex:0 0 46%; }
          .ic-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
          .ic-content{ flex:1 1 auto; padding:12px 6px; }
          .ic-title{ font-size:34px; margin:0 0 12px; color:#fff; }
          .ic-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:20px; }
          .ic-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
          .ic-list{ margin:12px 0 18px 18px; color:#efe6d6; }
          .ic-card{ background:#0f0d0c; border:1px solid rgba(212,169,85,.22); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .ic-price{ color:#f6e9c9; text-align:center; font-weight:800; font-size:22px; margin:10px 0 2px; }
          .ic-price .amt{ font-size:32px; letter-spacing:.4px; }
          .ic-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
          .ic-btn-mp{ background:#009EE3; color:#fff; padding:12px 18px; border-radius:8px; font-weight:800; border:0; cursor:pointer; }
          .ic-btn-mp:hover{ background:#0088c0; }
          .ic-btn-stripe{ background:#635BFF; color:#fff; padding:12px 18px; border-radius:8px; font-weight:800; border:0; cursor:pointer; }
          .ic-btn-stripe:hover{ background:#5248f7; }
          @media (max-width:880px){ .ic-container{ flex-direction:column; } .ic-image{ flex:0 0 auto; } .ic-title{ font-size:26px; } }
        </style>

        <div class="ic-wrap">
          <div class="ic-container" aria-labelledby="ic-title">
            <div class="ic-image">
              <img src="assets/images/services-inner-circle.png" alt="Inner Circle">
            </div>
            <div class="ic-content">
              <h1 id="ic-title" class="ic-title">Inner Circle — <span style="color:#d4a955;">Señales & Acompañamiento en vivo</span></h1>
              <div class="ic-subtitle">Activación de suscripción mensual</div>
              <p class="ic-lead">¿Quieres operar en los mercados con más seguridad y acompañamiento real? Forma parte de un grupo exclusivo donde recibirás señales, análisis en vivo y seguimiento personalizado.</p>
              <h4 style="color:#f6e7c9; margin-top:6px;">¿Qué incluye el servicio?</h4>
              <ul class="ic-list">
                <li>Señales de entrada y salida claras, con stop loss y take profit.</li>
                <li>Operaciones de alta probabilidad y metodología probada.</li>
                <li>Trading en vivo: análisis, comentarios y seguimiento de operaciones.</li>
                <li>Explicación simple del porqué de cada señal (ideal para aprender).</li>
                <li>Señales frecuentes, casi todos los días hábiles.</li>
                <li>Acceso privado al grupo de Telegram.</li>
              </ul>
              <div class="ic-card">
                <div class="ic-price">USD <span class="amt" id="ic-price-amt">${PRICE_USD}</span><div style="font-size:14px; font-weight:600; color:#cdbb9a;">Pago mensual</div></div>
                <div class="ic-cta">
                  <button id="ic-go-pay" class="ic-btn-mp" type="button" aria-label="suscribete con mercadopago">suscribete con mercadopago</button>
                  <button id="ic-go-pay-stripe" class="ic-btn-stripe" type="button" aria-label="suscribete con stripe">suscribete con stripe</button>
                  <button id="ic-back" class="ic-back" type="button">Volver</button>
                </div>
              </div>
            </div>
          </div>
        </div>

          ${typeof Footer !== 'undefined' && Footer && typeof Footer.render === 'function' ? Footer.render() : ''}
        
        <!-- Sidebar overlay (igual a Services) -->
        <style>
          .services-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .services-sidebar.open { display:block; }
          .services-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .services-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); }
          .services-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .services-sidebar .nav-item:hover { color:#f6e9c9; }
          .services-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
          .services-sidebar aside { display:flex; flex-direction:column; }
          .services-sidebar .nav-bottom { margin-top:auto; border-top:1px solid rgba(212,169,85,.12); padding-top:8px; }
        </style>
        <div id="services-sidebar" class="services-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-items">
              <div class="nav-item" id="nav-go-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
              <div class="nav-item" id="nav-go-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
              <div class="nav-item" id="nav-go-podcast"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 0 1 7 7v5"/><path d="M5 17v-5a7 7 0 0 1 7-7"/><circle cx="12" cy="12" r="3"/></svg></span><span>Podcast</span></div>
              <div class="nav-item" id="nav-go-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
              ${isPaidUser ? `<div class="nav-item" id="nav-go-partner"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span>MWI Partner Center</span></div>` : ''}
              ${isPaidUser ? `<div class="nav-item" id="nav-go-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
            </div>
            <div class="nav-bottom">
              <div class="nav-item" id="nav-go-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
              <div class="nav-item" id="nav-go-logout"><span class="icon"><svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg></span><span>Cerrar sesión</span></div>
            </div>
          </aside>
        </div>
        
        </main>
      </div>
    `;
  },

  after_render() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch (e) {}
    // Sidebar toggle and actions (match Services)
    const sidebar = document.getElementById('services-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle');
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); try { document.body.style.overflow = 'hidden'; } catch {} });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); try { document.body.style.overflow = ''; } catch {} } });
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('nav-go-dashboard')?.addEventListener('click', () => { unlock(); try { Router.navigate('/dashboard'); } catch { window.location.hash = '#/dashboard'; } });
    document.getElementById('nav-go-masters')?.addEventListener('click', () => { unlock(); try { Router.navigate('/masters'); } catch { window.location.hash = '#/masters'; } });
    document.getElementById('nav-go-podcast')?.addEventListener('click', () => { unlock(); try { Router.navigate('/podcast'); } catch { window.location.hash = '#/podcast'; } });
    document.getElementById('nav-go-services')?.addEventListener('click', () => { unlock(); try { Router.navigate('/services'); } catch { window.location.hash = '#/services'; } });
    document.getElementById('nav-go-partner')?.addEventListener('click', () => { unlock(); try { Router.navigate('/partner-center'); } catch { window.location.hash = '#/partner-center'; } });
    document.getElementById('nav-go-inner-circle')?.addEventListener('click', () => { unlock(); try { Router.navigate('/inner-circle'); } catch { window.location.hash = '#/inner-circle'; } });
    document.getElementById('nav-go-support')?.addEventListener('click', () => { const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI'; try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {} });
    document.getElementById('nav-go-logout')?.addEventListener('click', () => {
      try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
      try { localStorage.removeItem('mwi:token'); } catch {}
      unlock();
      try { Router.navigate('/'); } catch { try { window.location.hash = '#/'; } catch {} }
    });
    // Go to pay: attempt to create checkout, fallback to support
    // Stripe subscription button
    const stripeBtn = document.getElementById('ic-go-pay-stripe');
    if (stripeBtn && !stripeBtn.__hasHandler) {
      stripeBtn.addEventListener('click', async () => {
        try {
          // UX: disable button and show redirecting state
          try { stripeBtn.disabled = true; stripeBtn.textContent = 'Redirigiendo…'; } catch (_) {}
          if (window.PaymentService && typeof window.PaymentService.createStripeSignalsSubscription === 'function') {
            const url = await window.PaymentService.createStripeSignalsSubscription();
            // Navigate directly to avoid popup blockers
            try { window.location.href = url; } catch (e) { /* ignore */ }
            return;
          }
          throw new Error('Checkout no disponible');
        } catch (e) {
          try { if (typeof Utils !== 'undefined' && typeof Utils.showError === 'function') Utils.showError('No se pudo iniciar la suscripción. Intenta nuevamente.'); } catch (_) {}
        } finally {
          // Restore button state if still on page
          try { stripeBtn.disabled = false; stripeBtn.textContent = 'suscribete con stripe'; } catch (_) {}
        }
      });
      stripeBtn.__hasHandler = true;
    }

    // Mercado Pago subscription button (existing flow)
    const payBtn = document.getElementById('ic-go-pay');
    if (payBtn && !payBtn.__hasHandler) {
      payBtn.addEventListener('click', async () => {
        try {
          try { payBtn.disabled = true; payBtn.textContent = 'Redirigiendo…'; } catch (_) {}
          if (window.PaymentService && typeof window.PaymentService.createSignalsSubscription === 'function') {
            const url = await window.PaymentService.createSignalsSubscription();
            try { window.location.href = url; } catch (e) {}
            return;
          }
          throw new Error('Checkout no disponible');
        } catch (e) {
          try { if (typeof Utils !== 'undefined' && typeof Utils.showError === 'function') Utils.showError('No se pudo iniciar la suscripción. Intenta nuevamente.'); } catch (_) {}
        } finally {
          try { payBtn.disabled = false; payBtn.textContent = 'suscribete con mercadopago'; } catch (_) {}
        }
      });
      payBtn.__hasHandler = true;
    }

    const backBtn = document.getElementById('ic-back');
    if (backBtn && !backBtn.__hasHandler) {
      backBtn.addEventListener('click', () => { try { Router.navigate('/services'); } catch (e) { window.location.hash = '#/services'; } });
      backBtn.__hasHandler = true;
    }
  }
};

if (typeof window !== 'undefined') window.InnerCircleSubscribePage = InnerCircleSubscribePage;
if (typeof module !== 'undefined' && module.exports) module.exports = InnerCircleSubscribePage;

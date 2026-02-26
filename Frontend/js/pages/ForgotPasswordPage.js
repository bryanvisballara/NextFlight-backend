/**
 * PÁGINA: RECUPERACIÓN DE CONTRASEÑA
 * 
 * Página para solicitar recuperación de contraseña (simulado).
 */

const ForgotPasswordPage = {
  /**
   * Renderiza la página de recuperación
   */
  render() {
    return `
      ${Header.render(false)}
      
      <style>
        .auth-page{ min-height:70vh; display:flex; align-items:center; justify-content:center; padding:40px 16px; background:linear-gradient(180deg,#080808,#0f0f0f); color:#efe6d6; }
        .auth-container{ width:100%; max-width:980px; display:flex; align-items:center; justify-content:center; }
        .auth-box{ width:100%; background:linear-gradient(180deg,#141212,#0f0d0c); padding:32px; border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,0.6); border:1px solid rgba(212,169,85,0.10); display:flex; flex-direction:column; align-items:center; }
        .hero-logo{ width:90px; height:90px; object-fit:contain; filter:drop-shadow(0 0 6px rgba(212,169,85,.25)); margin-bottom:12px; }
        .auth-title{ color:#f6e9c9; font-size:28px; font-weight:800; margin:6px 0 8px; text-align:center; }
        .auth-subtitle{ color:#cdbb9a; text-align:center; margin-bottom:18px; }
        .auth-form{ width:100%; max-width:560px; }
        .form-group{ margin-bottom:12px; }
        label{ display:block; color:#d0bfa0; font-size:13px; margin-bottom:6px; }
        input[type="email"]{
          width:100%; padding:12px 14px; background:#151515; color:#efe6d6; border-radius:8px; border:1px solid rgba(255,255,255,0.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        }
        input::placeholder{ color:rgba(235,220,190,0.45); }
        .btn{ appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.4px; cursor:pointer; }
        .btn-primary{ color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); border:1px solid rgba(209,161,86,.95); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); }
        .btn-full{ width:100%; }
        .auth-footer{ margin-top:12px; color:#cdbb9a; font-size:13px; }
        .link-primary{ color:#d4a955; text-decoration:underline; }
        .note{ margin-top:10px; color:#8e7b5a; font-size:12px; text-align:center; max-width:560px; }
        @media (max-width:720px){ .auth-box{ padding:22px; } }

        /* Success Modal */
        .auth-modal{ display:none; position:fixed; inset:0; z-index:1000; }
        .auth-modal.open{ display:block; }
        .auth-modal .overlay{ position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
        .auth-modal .content{ position:relative; max-width:720px; margin:24px auto; background:linear-gradient(180deg,#151313,#0f0f0f); border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); }
        .auth-modal .inner{ padding:18px; }
        .auth-modal .title{ color:#a47c3b; font-size:22px; font-weight:800; text-align:center; margin:6px 0 8px; }
        .auth-modal .msg{ color:#cdbb9a; text-align:center; font-size:14px; line-height:1.6; }
        .auth-modal .actions{ display:flex; justify-content:center; gap:10px; margin:14px 0 8px; }
        .auth-modal{ z-index:2000; }
        .auth-modal .btn{ appearance:none; border:none; padding:11px 16px; border-radius:8px; font-weight:800; letter-spacing:.4px; cursor:pointer; }
        .auth-modal .btn-primary{ color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); border:1px solid rgba(209,161,86,.95); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); }
        .auth-modal .btn-outline{ border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; }
        .auth-modal .close{ position:absolute; right:10px; top:10px; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; }
        .auth-modal .close svg{ width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:2; }
      </style>

      <main class="auth-page">
        <div class="auth-container">
          <div class="auth-box">
            <h1 class="auth-title">Recuperar Contraseña</h1>
            <p class="auth-subtitle">Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.</p>

            <form id="forgotPasswordForm" class="auth-form">
              <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="tu@email.com"
                  autocomplete="email"
                />
              </div>

              <button type="submit" class="btn btn-primary btn-full">Enviar instrucciones</button>
            </form>

            <div class="auth-footer">
              <p><a href="/" data-link class="link-primary">← Volver al homepage</a></p>
            </div>

            <div class="note">Si el correo existe, te enviaremos un enlace para restablecer tu contraseña.</div>
          </div>
        </div>
      </main>

      <!-- Success modal: instrucciones enviadas -->
      <div id="forgot-success-modal" class="auth-modal" role="dialog" aria-hidden="true">
        <div class="overlay" data-close="true"></div>
        <div class="content">
          <div class="close" data-close="true" title="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6L18 18M6 18L18 6"/></svg></div>
          <div class="inner">
            <div class="title">Correo enviado con éxito</div>
            <div id="forgot-success-msg" class="msg">Hemos enviado las instrucciones para recuperar tu contraseña. Revisa tu correo y sigue el enlace para crear una nueva contraseña.</div>
            <div class="actions">
              <button id="forgot-go-home" class="btn btn-primary">Ir al homepage</button>
            </div>
          </div>
        </div>
      </div>

      ${Footer.render()}
    `;
  },

  /**
   * Inicializa la página y sus eventos
   */
  init() {
    console.log('🔥 ForgotPasswordPage.init CALLED');
    const form = document.getElementById('forgotPasswordForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleForgotPassword(e.target);
    });
  },

  /**
   * Maneja el envío del formulario
   */
  async handleForgotPassword(form) {
    const email = form.email.value.trim();
    if (!email) { Utils.showError('Ingresa tu correo'); return; }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    // Mostrar overlay si existe en RegisterPage
    try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.showLoadingOverlay === 'function') RegisterPage.showLoadingOverlay('Enviando enlace...'); } catch {}

    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const res = await fetch(`${base}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.hideLoadingOverlay === 'function') RegisterPage.hideLoadingOverlay(); } catch {}
      if (submitBtn) submitBtn.disabled = false;
      if (res.ok) {
        // Show success modal instead of immediate redirect
        const m = document.getElementById('forgot-success-modal');
        const msgEl = document.getElementById('forgot-success-msg');
        if (msgEl) msgEl.textContent = `Hemos enviado las instrucciones a ${email}. Revisa tu bandeja de entrada y sigue el enlace para crear una nueva contraseña.`;
        m?.classList.add('open');
        // Wire actions
        document.getElementById('forgot-go-home')?.addEventListener('click', () => { m?.classList.remove('open'); Router.navigate('/'); });
        m?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') m.classList.remove('open'); });
      } else {
        Utils.showError(data?.message || 'No se pudo enviar el enlace');
      }
    } catch (err) {
      console.error('[ForgotPassword] error', err);
      try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.hideLoadingOverlay === 'function') RegisterPage.hideLoadingOverlay(); } catch {}
      if (submitBtn) submitBtn.disabled = false;
      Utils.showError('Error de conexión');
    }
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ForgotPasswordPage;
}
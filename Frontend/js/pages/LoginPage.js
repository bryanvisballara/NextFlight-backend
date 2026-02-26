/**
 * PÁGINA: LOGIN
 * 
 * Página de inicio de sesión para usuarios registrados.
 */

const LoginPage = {
  /**
   * Renderiza la página de login
   */
  render() {
    return `
      ${Header.render(false)}
      
      <main class="auth-page">
        <div class="auth-container">
          <div class="auth-box">
            <h1 class="auth-title">Iniciar Sesión</h1>
            <p class="auth-subtitle">Accede a tu cuenta de Modern Wealth Institute</p>

            <!-- control superior: REGISTRARME / INICIAR SESIÓN (INICIAR SESIÓN resaltado) -->
            <style>
              .mwi-top-toggle{ display:flex; justify-content:flex-end; gap:18px; align-items:center; margin:12px 0; }
              .mwi-top-toggle .mwi-top-btn{ color:#bfa971; font-weight:800; letter-spacing:1px; background:none; border:0; cursor:pointer; padding:6px 8px; }
              .mwi-top-toggle .mwi-top-highlight{
                background:none; border:0; color:#d4a955; font-weight:900; padding:6px 8px; cursor:default;
                border-bottom:4px solid rgba(212,169,85,0.95); border-radius:3px 3px 0 0;
                font-size:14px;
              }
            </style>
            <div class="mwi-top-toggle" aria-hidden="false">
              <button id="btn-top-register" class="mwi-top-btn" type="button">REGISTRARME</button>
              <button id="btn-top-login" class="mwi-top-highlight" type="button">INICIAR SESIÓN</button>
            </div>

            <form id="loginForm" class="auth-form">
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="tu@email.com"
                  autocomplete="email"
                />
              </div>

              <div class="form-group">
                <label for="password">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  placeholder="Tu contraseña"
                  autocomplete="current-password"
                />
              </div>

              <div class="form-group-inline">
                <label class="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span>Recordarme</span>
                </label>
                <a href="https://wa.me/573003517982?text=Hola%2C%20he%20olvidado%20mi%20contrase%C3%B1a%2C%20podr%C3%ADas%20ayudarme%20a%20recuperarla%3F" class="link-secondary" target="_blank" rel="noopener">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" class="btn btn-primary btn-full">Iniciar Sesión</button>
            </form>

            <div class="auth-footer">
              <p>¿No tienes cuenta? <a href="/register" data-link class="link-primary">Regístrate aquí</a></p>
            </div>

            
          </div>
        </div>
      </main>

      ${Footer.render()}
    `;
  },

  /**
   * Inicializa la página y sus eventos
   */
  init() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin(e.target);
    });

    // top buttons: navegar a registro o enfocar email
    const btnReg = document.getElementById('btn-top-register');
    const btnLogin = document.getElementById('btn-top-login');
    if (btnReg) {
      btnReg.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
          Router.navigate('/register');
        } else {
          window.location.href = '/#/register';
        }
      });
    }
    if (btnLogin) {
      btnLogin.addEventListener('click', (ev) => {
        ev.preventDefault();
        const email = document.getElementById('email');
        if (email) email.focus();
      });
    }
  },

  /**
   * Overlay de carga (local a LoginPage)
   */
  showLoadingOverlay(message = 'Procesando...') {
    try {
      if (this._loadingEl && this._loadingEl.parentNode) return;
      const overlay = document.createElement('div');
      overlay.id = 'mwi-loading-overlay-login';
      overlay.setAttribute('role', 'alert');
      overlay.setAttribute('aria-live', 'assertive');
      Object.assign(overlay.style, {
        position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.66)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: '9999'
      });
      const styleTag = document.createElement('style');
      styleTag.textContent = `@keyframes mwi-spin-login { from { transform: rotate(0); } to { transform: rotate(360deg); } }`;
      overlay.appendChild(styleTag);
      const box = document.createElement('div');
      Object.assign(box.style, {
        background: 'linear-gradient(180deg,#171515,#0f0d0c)', border: '1px solid rgba(212,169,85,0.22)',
        borderRadius: '12px', padding: '18px 22px', minWidth: '280px', boxShadow: '0 10px 28px rgba(0,0,0,0.55)',
        color: '#e8dcc0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
      });
      const spinner = document.createElement('div');
      Object.assign(spinner.style, {
        width: '42px', height: '42px', border: '4px solid rgba(212,169,85,0.18)', borderTopColor: '#d4a955',
        borderRadius: '50%', animation: 'mwi-spin-login 0.9s linear infinite'
      });
      const msgEl = document.createElement('div');
      msgEl.textContent = message;
      Object.assign(msgEl.style, { fontWeight: '800', color: '#f6e9c9', textAlign: 'center', fontSize: '14px' });
      box.appendChild(spinner);
      box.appendChild(msgEl);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      this._loadingEl = overlay;
    } catch {}
  },
  hideLoadingOverlay() {
    try { if (this._loadingEl && this._loadingEl.parentNode) this._loadingEl.parentNode.removeChild(this._loadingEl); } catch {}
    this._loadingEl = null;
  },

  /**
   * Maneja el envío del formulario de login
   */
  async handleLogin(form) {
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      Utils.showError('Email y contraseña son requeridos');
      return;
    }

    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const startTs = Date.now();
    this.showLoadingOverlay('Iniciando sesión...');

    const finalizeSuccess = async () => {
      const minDelayMs = 5000;
      const elapsed = Date.now() - startTs;
      const waitMs = Math.max(0, minDelayMs - elapsed);
      setTimeout(async () => {
        this.hideLoadingOverlay();
        if (submitBtn) submitBtn.disabled = false;
        Utils.showSuccess('Ingreso exitoso');
        try { await AuthManager.bootstrap(); } catch {}
        Router.navigate(AuthManager.getDefaultRoute());
      }, waitMs);
    };

    try {
      // Si existe servicio global, úsalo
      if (window.MWI?.AuthService?.login) {
        const res = await window.MWI.AuthService.login(email, password);
        if (res?.success) {
          if (res.token) localStorage.setItem('mwi:token', res.token);
          // Guardar usuario completo básico
          try {
            const roleRaw = res.role;
            const userObj = {
              id: res.id ?? res.userId ?? `user-${Date.now()}`,
              name: res.name ?? '',
              email: res.email ?? email,
              role: (roleRaw == null ? roleRaw : String(roleRaw).toLowerCase()),
              isPaid: res.isPaid ?? false
            };
            localStorage.setItem('mwi:user', JSON.stringify(userObj));
          } catch {}
          await finalizeSuccess();
          return;
        }
        throw new Error(res?.message || 'Credenciales inválidas');
      }

      // Intento remoto
      const r = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        if (data.token) localStorage.setItem('mwi:token', data.token);
        // Guardar usuario completo básico
        try {
          const roleRaw = (data.role ?? (data.user && data.user.role));
          const userObj = {
            id: data.id ?? data.userId ?? `user-${Date.now()}`,
            name: data.name ?? '',
            email: data.email ?? email,
            role: (roleRaw == null ? roleRaw : String(roleRaw).toLowerCase()),
            isPaid: data.isPaid ?? false
          };
          localStorage.setItem('mwi:user', JSON.stringify(userObj));
        } catch {}
        await finalizeSuccess();
        return;
      }

      this.hideLoadingOverlay();
      if (submitBtn) submitBtn.disabled = false;
      Utils.showPopupError('Usuario o contraseña incorrectas, intente denuevo');
      return;
    } catch (err) {
      console.error('[Login] error', err);
      this.hideLoadingOverlay();
      if (submitBtn) submitBtn.disabled = false;
      Utils.showPopupError('Usuario o contraseña incorrectas, intente denuevo');
    }
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LoginPage;
}
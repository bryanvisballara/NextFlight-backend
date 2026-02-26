/**
 * COMPONENTE HEADER
 * 
 * Header público – Modern Wealth Institute (PDF exacto)
 */

const Header = {
  /**
   * Renderiza el header público
   * @param {boolean} showLoginButton
   * @returns {string}
   */
  render(showLoginButton = true, logoOnly = false, showMenuToggle = false, showProfile = false) {
    if (logoOnly) {
      return `
        <header class="mwi-header">
          <div class="mwi-header-inner">
            ${showMenuToggle ? `
              <button id="podcast-menu-toggle" class="menu-toggle" aria-label="Abrir menú">
                <svg viewBox="0 0 24 24"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
              </button>
            ` : ''}
            <div class="mwi-logo">
              <img src="assets/images/logo-mwi-gold.png" alt="Modern Wealth Institute">
            </div>
            ${showProfile ? `
            <div class="mwi-header-actions" style="justify-self:end; position:relative; display:flex; align-items:center; gap:10px;">
              <button id="mwi-profile-toggle" class="profile-btn" aria-haspopup="true" aria-expanded="false" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);border:1px solid rgba(212,169,85,.25);cursor:pointer;">
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#d4a955;fill:none;stroke-width:1.8;"><circle cx="12" cy="8" r="3"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>
              </button>
              <div id="mwi-profile-menu" class="profile-menu" style="display:none;position:absolute;right:0;top:calc(100% + 8px);background:#141212;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:6px;min-width:180px;box-shadow:0 10px 26px rgba(0,0,0,.45);z-index:1001;">
                <button id="mwi-logout" style="width:100%;appearance:none;border:1px solid rgba(209,161,86,.55);background:rgba(209,161,86,.08);color:#e8dcc0;padding:10px 12px;border-radius:6px;font-weight:700;">Cerrar sesión</button>
              </div>
            </div>
            ` : ''}
          </div>
        </header>
      `;
    }

    return `
      <header class="mwi-header">
        <div class="mwi-header-inner">

          <!-- Logo -->
          <div class="mwi-logo">
            <a href="#/" data-link>
              <img src="assets/images/logo-mwi-gold.png" alt="Modern Wealth Institute">
            </a>
          </div>

          <!-- Navegación -->
          <nav class="mwi-nav">
            <a href= data-link onclick="scrollToTop(); return false;" id="link-inicio">Inicio</a>
            <a href= data-link id="link-about">Acerca de nosotros</a>
            <a href= data-link onclick="scrollToServicesSection(); return false;" id="link-services">Servicios</a>
            <a href= data-link id="link-contact" onclick="openContact(); return false;">Contacto</a>
          </nav>

          <!-- CTA -->
          ${showLoginButton ? `
            <div class="mwi-header-cta">
              <button id="openAuthModal" class="mwi-cta-btn" onclick="openRegister(); return false;">
                Regístrate / Inicia sesión
              </button>
            </div>
          ` : ''}

          ${typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin() ? `
            
          ` : ''}

        </div>
      </header>
    `;
  },

  /**
   * Inicializa handlers del header (llamar después de insertarlo en el DOM)
   */
  init() {
    if (typeof document === 'undefined') return;

    // nuevo: attach handler al botón CTA del header para abrir el modal de registro
    const openAuthBtn = document.getElementById('openAuthModal');
    if (openAuthBtn && !openAuthBtn.__hasHandler) {
      openAuthBtn.addEventListener('click', (ev) => {
        try { ev && ev.preventDefault(); } catch (e) {}
        try { if (typeof openRegister === 'function') openRegister(); } catch (e) {}
      });
      openAuthBtn.__hasHandler = true;
    }

    // Ya no necesitamos el handler para inicioLink porque usa onclick

    const aboutLink = document.getElementById('link-about') || document.querySelector('a[href="#/about"]');
    if (aboutLink && !aboutLink.__hasHandler) {
      aboutLink.addEventListener('click', (ev) => {
        ev.preventDefault();

        const scrollToAbout = () => {
          const target = document.querySelector('.mwi-about') || document.getElementById('mwi-about');
          if (target && typeof target.scrollIntoView === 'function') {
            // desplazamiento suave
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            // fallback: navegar a home (o mantener ruta)
            try { window.location.hash = '#/about'; } catch (e) {}
          }
        };

        const isHome = (typeof location !== 'undefined') && (location.hash === '#/' || location.hash === '' || location.pathname === '/');

        if (isHome) {
          scrollToAbout();
        } else if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
          Router.navigate('/');
          setTimeout(scrollToAbout, 250);
        } else {
          // fallback: navegación completa a home y luego scroll
          try { window.location.href = '/'; } catch (e) {}
          setTimeout(scrollToAbout, 600);
        }
      });

      aboutLink.__hasHandler = true;
    }

    // Perfil: toggle dropdown y logout
    const profileToggle = document.getElementById('mwi-profile-toggle');
    const profileMenu = document.getElementById('mwi-profile-menu');
    if (profileToggle && !profileToggle.__hasHandler) {
      profileToggle.addEventListener('click', (ev) => {
        try { ev.preventDefault(); } catch {}
        if (!profileMenu) return;
        const isOpen = profileMenu.style.display === 'block';
        profileMenu.style.display = isOpen ? 'none' : 'block';
        profileToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
      profileToggle.__hasHandler = true;
    }

    // Cerrar menú al hacer click afuera
    if (profileMenu && !profileMenu.__outsideHandler) {
      document.addEventListener('click', (ev) => {
        const target = ev.target;
        if (!profileMenu) return;
        const withinMenu = profileMenu.contains(target);
        const withinToggle = profileToggle && profileToggle.contains && profileToggle.contains(target);
        if (!withinMenu && !withinToggle) {
          profileMenu.style.display = 'none';
          if (profileToggle) profileToggle.setAttribute('aria-expanded', 'false');
        }
      });
      profileMenu.__outsideHandler = true;
    }

    // Logout action
    const logoutBtn = document.getElementById('mwi-logout');
    if (logoutBtn && !logoutBtn.__hasHandler) {
      logoutBtn.addEventListener('click', (ev) => {
        try { ev.preventDefault(); } catch {}
        try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
        try { localStorage.removeItem('mwi:token'); } catch {}
        if (profileMenu) profileMenu.style.display = 'none';
        // Navegar a inicio
        try {
          if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
            Router.navigate('/');
          } else {
            window.location.hash = '#/';
          }
        } catch {}
      });
      logoutBtn.__hasHandler = true;
    }
  }
};

// función de scroll para "Inicio" (añadida)
function scrollToTop() {
  if (typeof window === 'undefined') return;
  
  // Navegar a home
  window.location.hash = '#/';
  
  // Hacer scroll al top
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 100);
}

// función de scroll para "Servicios" (actualizada)
function scrollToServicesSection() {
  if (typeof window === 'undefined') return;
  
  // Verificar si estamos en la homepage
  const currentHash = location.hash.replace('#', '') || '/';
  const isHome = (currentHash === '/' || currentHash === '');
  
  if (isHome) {
    // Si ya estamos en home, solo hacer scroll a la sección
    const servicesSection = document.querySelector('.mwi-services') || document.getElementById('mwi-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Si no estamos en home, navegar primero
    if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
      Router.navigate('/');
    } else {
      window.location.hash = '#/';
    }
    
    // Hacer scroll a servicios después de navegar
    setTimeout(() => {
      const servicesSection = document.querySelector('.mwi-services') || document.getElementById('mwi-services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }
}

// función para "Contacto" (redirige a WhatsApp) - actualizado para abrir en nueva pestaña
function openContact() {
  if (typeof window === 'undefined') return;
  const url = 'https://wa.me/message/DMWKUCUEYO2TH1';
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (e) {
    // fallback: crear enlace y simular click
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

// función para abrir la página/modal de registro (añadida) — ahora SOLO abre modal sin cambiar URL
function openRegister() {
  if (typeof document === 'undefined') return;
  const modal = document.getElementById('register-modal');
  if (modal) {
    try {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      const first = modal.querySelector('input, button, select, textarea, a');
      if (first) first.focus();
      document.documentElement.style.overflow = 'hidden';
    } catch (e) { /* ignore */ }
  }
}

// función para abrir modal de login (establece hash)
function openLogin() {
  if (typeof document === 'undefined') return;
  try { window.location.hash = '#/login'; } catch (e) {}
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    const first = modal.querySelector('input, button, select, textarea, a');
    if (first) first.focus();
    document.documentElement.style.overflow = 'hidden';
    return;
  }
  // fallback navigation
  if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
    try { Router.navigate('/login'); return; } catch (e) {}
  }
  try {
    window.location.href = '/#/login';
  } catch (e) {
    window.open('/#/login', '_self');
  }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Header;
}
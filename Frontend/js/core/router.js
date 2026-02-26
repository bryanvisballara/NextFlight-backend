/**
 * SISTEMA DE ENRUTAMIENTO SPA (Single Page Application)
 * 
 * Maneja la navegación sin recargar la página.
 * Implementa un sistema de rutas dinámico con soporte para parámetros.
 * 
 * FUNCIONES:
 * - Definir rutas de la aplicación
 * - Navegar entre vistas sin recargar
 * - Protección de rutas privadas
 * - Manejo de parámetros en URLs
 */

const Router = {
  // Contenedor donde se renderiza el contenido
  appContainer: null,
  
  // Ruta actual
  currentRoute: '/',
  
  // Definición de rutas
  routes: {},

  /**
   * Inicializa el router
   * @param {string} containerId - ID del contenedor principal
   */
  init(containerId = 'app') {
    this.appContainer = document.getElementById(containerId);
    if (!this.appContainer) {
      console.error(`Contenedor #${containerId} no encontrado`);
      return;
    }

    const proceed = () => {
      // Definir rutas de la aplicación
      this.defineRoutes();

      // Escuchar cambios en el historial del navegador
      window.addEventListener('popstate', (e) => {
        const path = window.location.hash.replace('#', '') || '/';
        this.handleRoute(path);
      });

      // Interceptar clicks en enlaces internos (captura clicks en hijos dentro del anchor)
      document.addEventListener('click', (e) => {
        const link = e.target && e.target.closest ? e.target.closest('[data-link]') : null;
        if (link) {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href) {
            this.navigate(href);
          }
        }
      });

      // Cargar la ruta inicial
      const initialPath = window.location.hash.replace('#', '') || '/';
      this.handleRoute(initialPath);
    };

    try {
      if (typeof AuthManager !== 'undefined' && typeof AuthManager.bootstrap === 'function') {
        AuthManager.bootstrap().then(() => {
          proceed();
        }).catch(() => proceed());
        return;
      }
    } catch {}
    proceed();
  },

  /**
   * Define todas las rutas de la aplicación
   */
  defineRoutes() {
    this.routes = {
      // Rutas públicas
      '/': {
        title: 'Modern Wealth Institute',
        render: () => HomePage.render(),
        public: true
      },
      // Servicios públicos (detalle)
      '/services-inner-circle': {
        title: 'Inner Circle - MWI',
        render: () => '<main class="service-page" style="min-height:60vh; padding:32px; color:#efe6d6;">Cargando servicio...</main>',
        init: () => {
          const mount = Router.appContainer.querySelector('main.service-page') || Router.appContainer;
          const renderInner = () => {
            try {
              if (window.ServicesInnerCircle && typeof window.ServicesInnerCircle.render === 'function') {
                mount.innerHTML = window.ServicesInnerCircle.render();
                try { if (typeof window.ServicesInnerCircle.after_render === 'function') window.ServicesInnerCircle.after_render(); } catch (e) {}
              }
            } catch (e) { /* noop */ }
          };
          if (window.ServicesInnerCircle) { renderInner(); return; }
          const existing = document.querySelector('script[data-services-inner="1"]');
          if (existing) {
            existing.addEventListener('load', renderInner, { once: true });
            return;
          }
          const s = document.createElement('script');
          s.src = 'js/pages/ServicesInnerCircle.js';
          s.async = true;
          s.setAttribute('data-services-inner', '1');
          s.addEventListener('load', renderInner, { once: true });
          s.addEventListener('error', () => { mount.innerHTML = '<main style="padding:48px;color:#ef4444;">No se pudo cargar el servicio.</main>'; });
          document.head.appendChild(s);
        },
        public: true
      },
      '/services-viral-push': {
        title: 'Viral Push - MWI',
        render: () => '<main class="service-page" style="min-height:60vh; padding:32px; color:#efe6d6;">Cargando servicio...</main>',
        init: () => {
          const mount = Router.appContainer.querySelector('main.service-page') || Router.appContainer;
          const renderViral = () => {
            try {
              if (window.ServicesViralPush && typeof window.ServicesViralPush.render === 'function') {
                mount.innerHTML = window.ServicesViralPush.render();
                try { if (typeof window.ServicesViralPush.after_render === 'function') window.ServicesViralPush.after_render(); } catch (e) {}
              }
            } catch (e) { /* noop */ }
          };
          if (window.ServicesViralPush) { renderViral(); return; }
          const existing = document.querySelector('script[data-viral="1"]');
          if (existing) {
            existing.addEventListener('load', renderViral, { once: true });
            return;
          }
          const s = document.createElement('script');
          s.src = 'js/pages/otro.js';
          s.async = true;
          s.setAttribute('data-viral', '1');
          s.addEventListener('load', renderViral, { once: true });
          s.addEventListener('error', () => { mount.innerHTML = '<main style="padding:48px;color:#ef4444;">No se pudo cargar el servicio.</main>'; });
          document.head.appendChild(s);
        },
        public: true
      },
      '/services-ecommerce-mentoring': {
        title: 'E-commerce Mentoring - MWI',
        render: () => '<main class="service-page" style="min-height:60vh; padding:32px; color:#efe6d6;">Cargando servicio...</main>',
        init: () => {
          const mount = Router.appContainer.querySelector('main.service-page') || Router.appContainer;
          const renderEcom = () => {
            try {
              if (window.ServicesEcommerceMentoring && typeof window.ServicesEcommerceMentoring.render === 'function') {
                mount.innerHTML = window.ServicesEcommerceMentoring.render();
                try { if (typeof window.ServicesEcommerceMentoring.after_render === 'function') window.ServicesEcommerceMentoring.after_render(); } catch (e) {}
              }
            } catch (e) { /* noop */ }
          };
          if (window.ServicesEcommerceMentoring) { renderEcom(); return; }
          const existing = document.querySelector('script[data-ecom="1"]');
          if (existing) {
            existing.addEventListener('load', renderEcom, { once: true });
            return;
          }
          const s = document.createElement('script');
          s.src = 'js/pages/servicesEcommerce.js';
          s.async = true;
          s.setAttribute('data-ecom', '1');
          s.addEventListener('load', renderEcom, { once: true });
          s.addEventListener('error', () => { mount.innerHTML = '<main style="padding:48px;color:#ef4444;">No se pudo cargar el servicio.</main>'; });
          document.head.appendChild(s);
        },
        public: true
      },
      // Inner Circle dashboard page
      '/inner-circle': {
        title: 'MWI Inner Circle',
        render: () => '<main class="service-page" style="min-height:60vh; padding:32px; color:#efe6d6;">Cargando...</main>',
        init: () => {
          const mount = Router.appContainer.querySelector('main.service-page') || Router.appContainer;
          const renderPage = () => {
            try {
              if (window.InnerCirclePage && typeof window.InnerCirclePage.render === 'function') {
                mount.innerHTML = window.InnerCirclePage.render();
                try { if (typeof window.InnerCirclePage.after_render === 'function') window.InnerCirclePage.after_render(); } catch (e) {}
              }
            } catch (e) { /* noop */ }
          };
          if (window.InnerCirclePage) { renderPage(); return; }
          const existing = document.querySelector('script[data-ic-dash="1"]');
          if (existing) { existing.addEventListener('load', renderPage, { once: true }); return; }
          const s = document.createElement('script');
          s.src = 'js/pages/InnerCirclePage.js';
          s.async = true;
          s.setAttribute('data-ic-dash', '1');
          s.addEventListener('load', renderPage, { once: true });
          s.addEventListener('error', () => { mount.innerHTML = '<main style="padding:48px;color:#ef4444;">No se pudo cargar la página.</main>'; });
          document.head.appendChild(s);
        },
        requireAuth: true
      },
      '/verification-success': {
        title: 'Correo verificado - MWI',
        render: () => VerificationSucessPage.render(),
        init: () => { try { VerificationSucessPage.init(); } catch (e) {} },
        public: true
      },
      // Alias por si el archivo o enlaces usan 'sucess' (typo)
      '/verification-sucess': {
        title: 'Correo verificado - MWI',
        render: () => VerificationSucessPage.render(),
        init: () => { try { VerificationSucessPage.init(); } catch (e) {} },
        public: true
      },
      '/login': {
        title: 'Iniciar Sesión - MWI',
        render: () => LoginPage.render(),
        public: true
      },
      '/register': {
        title: 'Registro - MWI',
        render: () => RegisterPage.render(),
        public: true
      },
      '/forgot-password': {
        title: 'Recuperar Contraseña - MWI',
        render: () => ForgotPasswordPage.render(),
        init: () => { try { ForgotPasswordPage.init(); } catch (e) { console.error('ForgotPasswordPage init error', e); } },
        public: true
      },
      '/pago-exitoso': {
        title: 'Pago Exitoso - MWI',
        render: () => PaymentSuccessPage.render(),
        init: () => { try { PaymentSuccessPage.init(); } catch (e) {} },
        public: true
      },
      '/reset-password': {
        title: 'Restablecer Contraseña - MWI',
        render: () => ResetPasswordPage.render(),
        init: () => { try { ResetPasswordPage.init(); } catch (e) {} },
        public: true
      },

      // Rutas privadas - Alumno
      '/dashboard': {
        title: 'Dashboard - MWI',
        render: () => DashboardPage.render(),
        requireAuth: true
      },
      '/masters': {
        title: 'Masters - MWI',
        render: () => MastersPage.render(),
        requireAuth: true
      },
      '/master/:id': {
        title: 'Master - MWI',
        render: (params) => MasterDetailPage.render(params.id),
        requireAuth: true
      },
      '/master-player/:slug': {
        title: 'Master Player - MWI',
        render: (params) => MasterPlayerPage.render(params.slug),
        requireAuth: true
      },
      '/master/:masterId/module/:moduleId': {
        title: 'Módulo - MWI',
        render: (params) => ModuleViewPage.render(params.masterId, params.moduleId),
        requireAuth: true
      },
      '/podcast': {
        title: 'MW Podcast - MWI',
        render: () => PodcastPage.render(),
        requireAuth: true
      },
      '/podcast-player/:slug': {
        title: 'Podcast Player - MWI',
        render: (params) => PodcastPlayerPage.render(params.slug),
        requireAuth: true
      },
      '/maestro/:slug': {
        title: 'Perfil de Maestro - MWI',
        render: (params) => MasterProfilePage.render(params.slug),
        requireAuth: true
      },
      '/services': {
        title: 'Servicios - MWI',
        render: () => ServicesPage.render(),
        requireAuth: true
      },
      '/messages': {
        title: 'Mensajes - MWI',
        render: () => MessagesPage.render(),
        requireAuth: true
      },
      '/notifications': {
        title: 'Notificaciones - MWI',
        render: () => NotificationsPage.render(),
        requireAuth: true
      },
      '/support': {
        title: 'Soporte - MWI',
        render: () => SupportPage.render(),
        requireAuth: true
      },
      '/partner-center': {
        title: 'MWI Partner Center',
        render: () => PartnerCenterPage.render(),
        init: () => { try { PartnerCenterPage.init(); } catch (e) {} },
        requireAuth: true
      },

      // Página legal
      '/terms': {
        title: 'Términos y Condiciones - MWI',
        render: () => TermsPage.render(),
        public: true
      },
      '/privacy': {
        title: 'Política de Privacidad - MWI',
        render: () => PrivacyPage.render(),
        public: true
      },
      '/payments': {
        title: 'Política de Pagos - MWI',
        render: () => PaymentsPage.render(),
        public: true
      },
      '/legal': {
        title: 'Aviso Legal - MWI',
        render: () => LegalPage.render(),
        public: true
      },

      // Rutas privadas - Administrador
      '/admin': {
        title: 'Panel Admin - MWI',
        render: () => AdminDashboardPage.render(),
        requireAdmin: true
      },
      '/admin/users': {
        title: 'Gestión de Usuarios - MWI',
        render: () => AdminUsersPage.render(),
        init: () => { try { AdminUsersPage.init(); } catch (e) {} },
        requireAdmin: true
      },
      '/admin/masters': {
        title: 'Gestión de Masters - MWI',
        render: () => AdminMastersPage.render(),
        init: () => AdminMastersPage.init(),
        requireAdmin: true
      },
      '/admin/masters/create': {
        title: 'Crear Master - MWI',
        render: () => AdminMasterCreatePage.render(),
        init: () => AdminMasterCreatePage.init(),
        requireAdmin: true
      },
      '/admin/masters/:id': {
        title: 'Editar Master - MWI',
        render: (params) => AdminMasterEditPage.render(params.id),
        init: (params) => AdminMasterEditPage.init(params.id),
        requireAdmin: true
      },
      '/admin/podcast': {
        title: 'Gestión de Podcast - MWI',
        render: () => AdminPodcastPage.render(),
        init: () => AdminPodcastPage.init(),
        requireAdmin: true
      },
      '/admin/podcast/create': {
        title: 'Crear Capítulo - MWI',
        render: () => AdminPodcastCreatePage.render(),
        init: () => AdminPodcastCreatePage.init(),
        requireAdmin: true
      },
      '/admin/mentors': {
        title: 'Gestión de Mentores - MWI',
        render: () => (typeof AdminMentorsPage !== 'undefined' ? AdminMentorsPage.render() : AdminDashboardPage.render()),
        init: () => { try { if (typeof AdminMentorsPage !== 'undefined') AdminMentorsPage.init(); } catch (e) {} },
        requireAdmin: true
      },
      '/admin/mentor/:slug': {
        title: 'Editar Mentor - MWI',
        render: (params) => (typeof AdminMentorEditPage !== 'undefined' ? AdminMentorEditPage.render(params.slug) : AdminMentorsPage.render()),
        init: (params) => { try { if (typeof AdminMentorEditPage !== 'undefined') AdminMentorEditPage.init(params.slug); } catch (e) {} },
        requireAdmin: true
      },
      '/admin/live-sessions': {
        title: 'Sesiones en Vivo - MWI',
        render: () => (typeof AdminLiveSessionsPage !== 'undefined' ? AdminLiveSessionsPage.render() : AdminDashboardPage.render()),
        init: () => { try { if (typeof AdminLiveSessionsPage !== 'undefined') AdminLiveSessionsPage.init(); } catch (e) {} },
        requireAdmin: true
      },
      '/admin/config': {
        title: 'Pricing & Email marketing - MWI',
        render: () => AdminConfigPage.render(),
        init: () => { try { AdminConfigPage.init(); } catch (e) {} },
        requireAdmin: true
      },
      '/admin/history-payments': {
        title: 'Histórico de pagos - MWI',
        render: () => (typeof AdminPaymentsHistoryPage !== 'undefined' ? AdminPaymentsHistoryPage.render() : AdminDashboardPage.render()),
        init: () => { try { if (typeof AdminPaymentsHistoryPage !== 'undefined') AdminPaymentsHistoryPage.init(); } catch (e) {} },
        requireAdmin: true
      },

      // Ruta 404
      '/404': {
        title: 'Página no encontrada - MWI',
        render: () => NotFoundPage.render(),
        public: true
      }
    };
  },

  /**
   * Navega a una ruta específica
   * @param {string} path - Ruta a navegar
   */
  navigate(path) {
    // Limpiar el path
    const cleanPath = path.replace('#', '').replace(/^\//, '/');
    
    // Actualizar hash del navegador
    window.location.hash = '#' + cleanPath;
    
    // Manejar la nueva ruta
    this.handleRoute(cleanPath);
  },

  /**
   * Maneja el renderizado de una ruta
   * @param {string} path - Ruta a manejar
   */
  handleRoute(path) {
    this.currentRoute = path;

    // Reset any scroll locks from modals/sidebars
    try {
      document.body && (document.body.style.overflow = '');
      document.documentElement && (document.documentElement.style.overflow = '');
    } catch {}

    // Normalizar: ignorar query string al resolver la ruta
    const pathOnly = (typeof path === 'string') ? path.split('?')[0] : '/';
    // Buscar ruta coincidente (incluyendo rutas con parámetros)
    const { route, params } = this.matchRoute(pathOnly);

    if (!route) {
      // Ruta no encontrada - mostrar 404
      this.showNotFound();
      return;
    }

    // Nota: no redireccionar automáticamente desde Home.
    // Las redirecciones post-login ocurren explícitamente tras el login.

    // 🔐 Guard simple (emergencia): token para auth
    if (route.requireAuth && !localStorage.getItem('mwi:token')) {
      this.navigate('/');
      return;
    }

    // Guard simple para admin
    if (route.requireAdmin) {
      const isAdmin = (typeof AuthManager !== 'undefined' && typeof AuthManager.isAdmin === 'function') ? AuthManager.isAdmin() : false;
      if (!isAdmin) {
        this.navigate('/');
        return;
      }
    }

    // Sin redirecciones automáticas desde /login o /register (modo emergencia)

    // Actualizar título de la página
    document.title = route.title;

    // Renderizar la vista
    try {
      const content = route.render(params);
      this.appContainer.innerHTML = content;

      // Garantizar carga dinámica del carrusel de podcast en Home
      try {
        const isHome = (pathOnly === '/' || pathOnly === '' || pathOnly === '#/' || pathOnly === 'home');
        if (isHome && typeof window.__loadHomePodcasts === 'function') {
          setTimeout(() => { try { window.__loadHomePodcasts(); } catch (e) { console.warn('Home podcasts loader error', e); } }, 0);
        }
      } catch (e) { /* noop */ }

      // Garantizar carga dinámica de sesiones en vivo en Dashboard
      try {
        const isDashboard = (pathOnly === '/dashboard' || pathOnly === 'dashboard');
        if (isDashboard && typeof window.__loadDashboardLiveSessions === 'function') {
          setTimeout(() => { try { window.__loadDashboardLiveSessions(); } catch (e) { console.warn('Dashboard lives loader error', e); } }, 0);
        }
      } catch (e) { /* noop */ }

      // Garantizar carga dinámica de podcast destacado en Dashboard
      try {
        const isDashboard = (pathOnly === '/dashboard' || pathOnly === 'dashboard');
        if (isDashboard && typeof window.__loadDashboardPodcast === 'function') {
          setTimeout(() => { try { window.__loadDashboardPodcast(); } catch (e) { console.warn('Dashboard podcast loader error', e); } }, 0);
        }
      } catch (e) { /* noop */ }

      // Inicializar eventos de la ruta si define init; fallback a init por nombre de página
      if (typeof route.init === 'function') {
        try { route.init(params || {}); } catch (e) { console.warn('Error en init de ruta:', e); }
      } else {
        const pageName = this.getPageNameFromPath(path);
        const pageObject = this.getPageObject(pageName);
        if (pageObject && typeof pageObject.init === 'function') {
          pageObject.init();
        }
      }

      // Scroll al inicio
      try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch { window.scrollTo(0, 0); }
    } catch (error) {
      console.error('Error renderizando ruta:', error);
      this.showError();
    }
  },

  /**
   * Busca una ruta que coincida con el path (incluyendo parámetros)
   * @param {string} path - Path a buscar
   * @returns {Object} { route, params }
   */
  matchRoute(path) {
    // Intentar coincidencia exacta primero
    if (this.routes[path]) {
      return { route: this.routes[path], params: {} };
    }

    // Buscar rutas con parámetros
    for (const [routePath, route] of Object.entries(this.routes)) {
      const params = this.extractParams(routePath, path);
      if (params !== null) {
        return { route, params };
      }
    }

    return { route: null, params: {} };
  },

  /**
   * Extrae parámetros de una ruta
   * @param {string} routePath - Ruta con parámetros (ej: '/master/:id')
   * @param {string} actualPath - Path real (ej: '/master/123')
   * @returns {Object|null} Parámetros extraídos o null si no coincide
   */
  extractParams(routePath, actualPath) {
    const routeParts = routePath.split('/');
    const pathParts = actualPath.split('/');

    if (routeParts.length !== pathParts.length) {
      return null;
    }

    const params = {};
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        // Es un parámetro
        const paramName = routeParts[i].substring(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        // No coincide
        return null;
      }
    }

    return params;
  },

  /**
   * Obtiene el nombre de la página desde el path
   */
  getPageNameFromPath(path) {
    const cleanPath = path.split('/').filter(p => p)[0] || 'home';
    return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
  },

  /**
   * Obtiene el objeto de página correspondiente
   */
  getPageObject(pageName) {
    const pageMap = {
      'Home': HomePage,
      'Login': LoginPage,
      'Register': RegisterPage,
      'Dashboard': DashboardPage,
      'Masters': MastersPage,
      'Master': MasterDetailPage,
      'Master-player': MasterPlayerPage,
      'Podcast': PodcastPage,
      'Podcast-player': PodcastPlayerPage,
      'Maestro': MasterProfilePage,
      'Messages': MessagesPage,
      'Notifications': NotificationsPage,
      'Support': SupportPage,
      'Services': ServicesPage,
      'Admin': AdminDashboardPage,
      'Terms': TermsPage,
      'Privacy': PrivacyPage,
      'Payments': PaymentsPage,
      'Legal': LegalPage
      , 'Pago-exitoso': PaymentSuccessPage
    };
    return pageMap[pageName];
  },

  /**
   * Muestra página 404
   */
  showNotFound() {
    document.title = 'Página no encontrada - MWI';
    this.appContainer.innerHTML = NotFoundPage.render();
  },

  /**
   * Muestra página de error
   */
  showError() {
    this.appContainer.innerHTML = `
      <div class="error-page">
        <h1>Error</h1>
        <p>Ha ocurrido un error al cargar la página.</p>
        <button onclick="Router.navigate('/')">Volver al inicio</button>
      </div>
    `;
  },

  /**
   * Obtiene parámetros de la URL (query string)
   * @returns {Object} Parámetros de la URL
   */
  getUrlParams() {
    const params = {};
    // Prefer query params from hash (SPA routing), fallback to location.search
    try {
      const hash = window.location.hash || '';
      const qHash = hash.includes('?') ? hash.split('?')[1] : '';
      if (qHash) {
        const hp = new URLSearchParams(qHash);
        for (const [key, value] of hp) params[key] = value;
      }
    } catch (e) {}
    try {
      const sp = new URLSearchParams(window.location.search || '');
      for (const [key, value] of sp) params[key] = value;
    } catch (e) {}
    return params;
  },

  /**
   * Recarga la ruta actual
   */
  reload() {
    this.handleRoute(this.currentRoute);
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
// ===============================
// AUTH MODAL (GLOBAL)
// ===============================

window.openAuthModal = (html) => {
  const modal = document.getElementById('auth-modal');
  const content = document.getElementById('auth-modal-content');

  if (!modal || !content) return;

  content.innerHTML = html;
  modal.classList.remove('hidden');

  modal.querySelector('.auth-modal-close').onclick = closeAuthModal;
  modal.querySelector('.auth-modal-overlay').onclick = closeAuthModal;
};

window.closeAuthModal = () => {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.add('hidden');
};

// ===============================
// AFFILIATION MODAL (GLOBAL)
// ===============================
window.openAffiliationModal = () => {
  try {
    const priceRaw = (typeof StorageManager !== 'undefined' && StorageManager.get) ? StorageManager.get('mwi_membership_price') : null;
    const membershipPrice = Number(priceRaw || 499);
    let modal = document.getElementById('affiliacion-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'affiliacion-modal';
      modal.className = 'mwi-modal';
      modal.setAttribute('aria-hidden', 'false');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');
      modal.innerHTML = `
        <style>
          .mwi-modal { display:block; position:fixed; inset:0; z-index:1000; }
          .mwi-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
          .mwi-modal .content { position:relative; max-width:900px; margin:40px auto; background:linear-gradient(180deg,#151313,#0f0f0f); border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); }
          .mwi-modal .content .inner { padding:20px; display:grid; grid-template-columns: 1fr 330px; gap:18px; }
          @media (max-width: 900px) { .mwi-modal .content .inner { grid-template-columns: 1fr; } }
          .mwi-modal .title { color:#a47c3b; font-size:28px; font-weight:800; text-align:center; margin:6px 0 4px; }
          .mwi-modal .subtitle { color:#cdbb9a; text-align:center; margin-bottom:12px; }
          .mwi-modal .features { background-color:#141212; background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png'); background-size: cover; background-position: center; background-repeat: no-repeat; border:1px solid rgba(212,169,85,.15); border-radius:10px; padding:16px; }
          .mwi-modal .features .label { color:#efe6d6; font-size:22px; font-weight:700; margin-bottom:10px; }
          .mwi-modal .features .item { display:flex; align-items:center; gap:10px; color:#e8dcc0; padding:6px 0; }
          .mwi-modal .features .item .check svg { width:18px; height:18px; fill:none; stroke:#d4a955; stroke-width:2; }
          .mwi-modal .plan { background-color:#141212; background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png'); background-size: cover; background-position: center; background-repeat: no-repeat; border:1px solid rgba(212,169,85,.22); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mwi-modal .plan .badge { display:flex; align-items:center; justify-content:center; margin-bottom:8px; }
          .mwi-modal .plan .badge img { width:88px; height:88px; object-fit:contain; filter:drop-shadow(0 0 6px rgba(212,169,85,.25)); }
          .mwi-modal .plan .name { color:#f6e9c9; font-size:24px; font-weight:800; text-align:center; margin-bottom:8px; }
          .mwi-modal .plan .bullets { color:#e8dcc0; display:grid; row-gap:8px; text-align:center; }
          .mwi-modal .plan .bullets .row { display:flex; align-items:center; justify-content:center; gap:10px; }
          .mwi-modal .plan .bullets .row .dot { width:8px; height:8px; border-radius:50%; background:#d4a955; box-shadow:0 0 6px rgba(212,169,85,.3); }
          .mwi-modal .plan .sep-line { height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.85), rgba(212,169,85,0.0)); margin:10px 0; }
          .mwi-modal .plan .price { color:#f6e9c9; text-align:center; font-weight:800; font-size:22px; margin:10px 0 2px; }
          .mwi-modal .plan .price .amt { font-size:32px; letter-spacing:.4px; }
          .mwi-modal .plan .price .sub { font-size:15px; font-weight:600; }
          .mwi-modal .actions { display:flex; flex-direction:column; gap:10px; margin-top:12px; align-items:center; }
          .mwi-modal .btn-pay { appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.4px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); width:70%; }
          .mwi-modal .btn-cancel { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 16px; border-radius:8px; font-weight:700; width:70%; }
          .mwi-modal .foot { display:flex; align-items:center; justify-content:center; gap:10px; color:#cdbb9a; padding:12px 20px; border-top:1px solid rgba(212,169,85,.18); text-align:center; }
          .mwi-modal .close { position:absolute; right:10px; top:10px; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; }
          .mwi-modal .close svg { width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:2; }
          /* Phone: make modal smaller and tighter */
          @media (max-width: 640px) {
            .mwi-modal { overflow:auto; }
            .mwi-modal .content { width:92vw; max-width:340px; max-height:80vh; margin:16px auto; overflow:auto; -webkit-overflow-scrolling:touch; }
            .mwi-modal .content .inner { padding:10px; gap:10px; }
            .mwi-modal .title { font-size:20px; margin:6px 0; }
            .mwi-modal .subtitle { font-size:12.5px; margin-bottom:8px; }
            .mwi-modal .features { padding:10px; }
            .mwi-modal .features .label { font-size:15px; margin-bottom:6px; }
            .mwi-modal .features .item { padding:3px 0; font-size:12px; }
            .mwi-modal .plan { padding:10px; }
            .mwi-modal .plan .badge img { width:60px; height:60px; }
            .mwi-modal .plan .name { font-size:16px; margin-bottom:6px; }
            .mwi-modal .plan .bullets { row-gap:6px; font-size:12.5px; }
            .mwi-modal .plan .price { font-size:16px; margin:6px 0 2px; }
            .mwi-modal .plan .price .amt { font-size:22px; }
            .mwi-modal .plan .price .sub { font-size:12px; }
            .mwi-modal .actions { gap:8px; }
            .mwi-modal .btn-pay, .mwi-modal .btn-cancel { width:100%; padding:9px 12px; font-size:13px; }
            .mwi-modal .foot { padding:8px 10px; font-size:11px; }
            .mwi-modal .close { width:32px; height:32px; }
          }
        </style>
        <div class="overlay" data-close="true"></div>
        <div class="content" role="document">
          <button class="close" id="modal-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>
          </button>
          <div class="title">Activa tu afiliación en Modern Wealth Institute</div>
          <div class="subtitle">Desbloquea el acceso completo a todos los masters del instituto.</div>
          <div class="inner">
            <div class="features">
              <div class="label">Incluye acceso a:</div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Todos los masters <strong>actuales</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Nuevos masters <strong>futuros</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Actualizaciones <strong>permanentes</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Plataforma privada 24/7</span></div>
              <div class="actions">
                <button id="btn-modal-pay" class="btn-pay">CONTINUAR AL PAGO</button>
                <button id="btn-modal-cancel" class="btn-cancel">Cancelar</button>
              </div>
            </div>
            <div class="plan">
              <div class="badge"><img src="assets/images/logopop.png" alt="Logo" /></div>
              <div class="name">Afiliación Total</div>
              <div class="sep-line"></div>
              <div class="bullets">
                <div class="row"><span class="dot"></span><span>Acceso total a la plataforma</span></div>
                <div class="row"><span class="dot"></span><span>Sin límites de contenido</span></div>
              </div>
              <div class="sep-line"></div>
              <div class="price"><span>USD</span> <span id="aff-modal-price-amt" class="amt">${membershipPrice}</span><div class="sub">Pago único</div></div>
            </div>
          </div>
          <div class="foot"><span class="lock"><svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span><span>Tu cuenta está activa, pero el contenido está bloqueado hasta completar tu afiliación.</span></div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    // Wire events
    const close = () => { try { modal.remove(); } catch (e) { modal.style.display = 'none'; } };
    modal.querySelector('#modal-close')?.addEventListener('click', close);
    modal.querySelector('[data-close="true"]')?.addEventListener('click', close);
    modal.querySelector('#btn-modal-cancel')?.addEventListener('click', close);
    modal.querySelector('#btn-modal-pay')?.addEventListener('click', () => { try { close(); Router.navigate('/payments'); } catch (e) { Router.navigate('/payments'); } });
    // Prevent background scroll
    try { document.body.style.overflow = 'hidden'; } catch (e) {}
    // Focus first action
    try { modal.querySelector('#btn-modal-pay')?.focus(); } catch (e) {}
  } catch (e) { console.error('openAffiliationModal error', e); }
};
window.closeAffiliationModal = () => {
  try { document.getElementById('affiliacion-modal')?.remove(); document.body.style.overflow = ''; } catch (e) {}
};

// Listen for membership price changes to update the global affiliation modal if open
try {
  window.addEventListener('mwi:membershipPriceChanged', (ev) => {
    const p = (ev && ev.detail && typeof ev.detail.price !== 'undefined') ? ev.detail.price : null;
    if (p === null) return;
    const el = document.querySelector('#affiliacion-modal .price .amt');
    if (el) { try { el.textContent = String(p); } catch (e) {} }
  });
} catch (e) {}

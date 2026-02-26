/**
 * PÁGINA: SERVICIOS
 *
 * Landing de servicios con el mismo estilo de
 * ServicesInnerCircle, servicesEcommerce y otro.js (Viral Push),
 * pero con botón Volver que regresa al Dashboard.
 */

const ServicesPage = {
  render() {
    if (!AuthManager.isAuthenticated()) {
      Router.navigate('/login');
      return '';
    }
    const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);

    return `
      <div class="services-page">
        ${Header.render(false, true, true, true)}
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
          .srv-wrap{ max-width:1100px; margin:0 auto; }
          .srv-title-block{
            width:100%;
            display:flex; flex-direction:column; align-items:center; gap:8px;
          }
          .srv-title-badge{ display:inline-block; background:#2b2118; color:#d4a955; padding:10px 10px; border-radius:6px; font-weight:700; }
          .srv-title-main{ margin:8px 0 18px; color:#fff; font-size:24px; text-align:center; }
          .srv-previews{ display:flex; gap:18px; flex-wrap:wrap; justify-content:center; }
          .srv-card{ width:320px; border-radius:12px; overflow:hidden; background:#0f0d0c; box-shadow:0 10px 30px rgba(0,0,0,0.6); }
          .srv-card img{ width:100%; display:block; }
          .srv-card .label{ padding:14px; background:#bfa971; color:#22160f; font-weight:800; text-align:center; }
          .srv-actions{ display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:18px; }
          .srv-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
          .srv-back{ background:transparent; border:1px solid rgba(255,255,255,0.1); color:#efe6d6; padding:8px 10px; border-radius:6px; cursor:pointer; }
          @media (max-width:880px){ .srv-card{ width:100%; max-width:360px; } }
        </style>

        <div class="srv-wrap">
          <!-- Se elimina el botón 'Volver' y se usa el header del Podcast -->

          <div class="srv-title-block" aria-hidden="false">
            <div class="srv-title-badge">Servicios</div>
            <h3 class="srv-title-main">Descubre nuestros servicios</h3>
          </div>
          
          <!-- Inner Circle section -->
          <section style="margin-top:24px;">
            <style>
              .sic-container{ display:flex; gap:36px; align-items:flex-start; }
              .sic-image{ flex:0 0 46%; }
              .sic-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
              .sic-content{ flex:1 1 auto; padding:12px 6px; }
              .sic-title{ font-size:28px; margin:0 0 12px; color:#fff; }
              .sic-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:18px; }
              .sic-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
              .sic-list{ margin:12px 0 18px 18px; color:#efe6d6; }
              .sic-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
              .sic-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
              @media (max-width:880px){ .sic-container{ flex-direction:column; } .sic-image{ flex:0 0 auto; } }
            </style>
            <div class="sic-container" aria-labelledby="sic-title">
              <div class="sic-image" aria-hidden="false">
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
                <div class="sic-cta">
                  <button id="sic-subscribe-main" class="sic-btn" type="button">Suscríbete</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Viral Push section -->
          <section style="margin-top:28px;">
            <style>
              .svp-container{ display:flex; gap:36px; align-items:flex-start; }
              .svp-image{ flex:0 0 46%; }
              .svp-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
              .svp-content{ flex:1 1 auto; padding:12px 6px; }
              .svp-title{ font-size:28px; margin:0 0 12px; color:#fff; }
              .svp-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:18px; }
              .svp-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
              .svp-list{ margin:12px 0 18px 18px; color:#efe6d6; }
              .svp-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
              .svp-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
              @media (max-width:880px){ .svp-container{ flex-direction:column; } .svp-image{ flex:0 0 auto; } }
            </style>
            <div class="svp-container" aria-labelledby="svp-title">
              <div class="svp-image">
                <img src="assets/images/services-viral-push.png" alt="Viral Push">
              </div>
              <div class="svp-content">
                <h2 id="svp-title" class="svp-title">likes & <span style="color:#d4a955;">followers</span> market</h2>
                <div class="svp-subtitle">Viral Push — Crecimiento acelerado</div>
                <p class="svp-lead">Acelera el crecimiento de tus perfiles.</p>
                <h4 style="color:#f6e7c9; margin-top:6px;">¿Qué ofrecemos?</h4>
                <ul class="svp-list">
                  <li>Seguidores genéricos en tus perfiles para fortalecer tu marca.</li>
                  <li>Likes genéricos en tus publicaciones.</li>
                  <li>Vistas en tus videos para acelerar el crecimiento orgánico.</li>
                  <li>Vistas en tus transmisiones en vivo para generar impacto inmediato.</li>
                  <li>Impulso general de presencia digital para mejorar tu reputación online.</li>
                  <li>Suscriptores genéricos en tus canales.</li>
                  <li>Te ayuda a aumentar la credibilidad de tu marca.</li>
                  <li>Te permite mejorar tu posicionamiento en redes.</li>
                  <li>Hace que más personas confíen y quieran interactuar contigo.</li>
                  <li>Ideal para negocios que están comenzando o que quieren escalar más rápido.</li>
                  <li>Potencia tus campañas, ventas y alcance orgánico.</li>
                </ul>
                <div class="svp-cta">
                  <a class="svp-btn" href="https://wa.me/573016214806?text=Hola%2C%20estoy%20interesad%40%20en%20comprar%20servicios%20para%20mis%20redes%20sociales%2C%20podrias%20mostrarme%20que%20paquetes%20manejan%3F" target="_blank" rel="noopener noreferrer">Contactar</a>
                </div>
              </div>
            </div>
          </section>

          <!-- E-commerce Mentoring section -->
          <section style="margin-top:28px;">
            <style>
              .sem-container{ display:flex; gap:36px; align-items:flex-start; }
              .sem-image{ flex:0 0 46%; }
              .sem-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
              .sem-content{ flex:1 1 auto; padding:12px 6px; }
              .sem-title{ font-size:28px; margin:0 0 12px; color:#fff; }
              .sem-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:18px; }
              .sem-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
              .sem-list{ margin:12px 0 18px 18px; color:#efe6d6; }
              .sem-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
              .sem-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
              @media (max-width:880px){ .sem-container{ flex-direction:column; } .sem-image{ flex:0 0 auto; } }
            </style>
            <div class="sem-container" aria-labelledby="sem-title">
              <div class="sem-image">
                <img src="assets/images/services-ecommerce-mentoring.png" alt="E-commerce Mentoring">
              </div>
              <div class="sem-content">
                <h2 id="sem-title" class="sem-title">E-commerce <span style="color:#d4a955;">Mentoring</span></h2>
                <div class="sem-subtitle">E-commerce Mentoring — Acelera tus ventas online</div>
                <p class="sem-lead">Mentoring y acompañamiento para optimizar tiendas, listings y escalar ventas en marketplaces.</p>
                <h4 style="color:#f6e7c9; margin-top:6px;">¿Qué incluye?</h4>
                <ul class="sem-list">
                  <li>Optimización de listings y fichas de producto.</li>
                  <li>Estrategias de pricing y logística.</li>
                  <li>Campañas de adquisición y retención.</li>
                  <li>Monitoreo de métricas y mejoras continuas.</li>
                </ul>
                <div class="sem-cta">
                  <a class="sem-btn" href="https://wa.me/573003517982?text=Hola%2C%20estoy%20interesad%40%20en%20obtener%20una%20mentoria%20de%20E-commerce" target="_blank" rel="noopener noreferrer">Contactar</a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar overlay (igual a Masters/Podcast) -->
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

        <!-- Membership required modal -->
        <style>
          .mwi-modal { display:none; position:fixed; inset:0; z-index:1100; }
          .mwi-modal.open { display:block; }
          .mwi-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .mwi-modal .card { position:relative; max-width:560px; margin:12vh auto; background:#0f0f0f; border:1px solid #e7e0d0; border-radius:14px; padding:22px 20px; color:#efe6d6; box-shadow:0 30px 80px rgba(0,0,0,0.6); }
          .mwi-modal h3 { margin:0 0 12px; color:#d4a955; font-size:20px; }
          .mwi-modal p { margin:0 0 14px; color:#cdbb9a; line-height:1.6; }
          .mwi-modal .actions { display:flex; gap:10px; justify-content:flex-end; margin-top:16px; }
          .mwi-modal .btn { background:#2b2118; color:#efe6d6; border:1px solid rgba(212,169,85,.35); padding:10px 14px; border-radius:10px; font-weight:800; cursor:pointer; }
          .mwi-modal .btn.primary { background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; border-color:#c59d4a; }
        </style>
        <div id="membership-modal" class="mwi-modal" role="dialog" aria-hidden="true" aria-label="Membership required">
          <div class="overlay" data-close="true"></div>
          <div class="card" role="document">
            <h3>Activa tu membresía</h3>
            <p>Debes ser miembro del Modern Wealth Institute. En el Dashboard, presiona en el botón <strong>ACTIVAR MEMBRESIA</strong> para acceder a este servicio.</p>
            <div class="actions">
              <button id="mm-go-dashboard" class="btn primary" type="button">Ir al Dashboard</button>
              <button id="mm-close" class="btn" type="button">Cerrar</button>
            </div>
          </div>
        </div>

        <!-- Footer reducido consistente con páginas de servicios -->
        <style>
          .mwi-footer { margin-top:28px; padding:12px 10px !important; background:#000; color:#efe6d6; }
          .mwi-footer * { box-sizing:border-box; }
          .mwi-footer-newsletter { display:flex; gap:8px; align-items:center; margin-bottom:12px; justify-content:center; }
          .mwi-footer-newsletter input { padding:6px 8px; font-size:12px; height:32px; min-width:200px; }
          .mwi-footer-newsletter button { padding:6px 10px; font-size:12px; }
          .mwi-footer-content { display:flex; align-items:flex-start; justify-content:space-between; gap:24px; width:100%; max-width:1100px; margin:0 auto; }
          .mwi-footer-brand { flex:0 0 260px; display:flex; gap:8px; flex-direction:column; align-items:center; text-align:center; }
          .mwi-footer-brand img { width:140px; height:auto; display:block; margin-bottom:6px; }
          .mwi-footer-brand p { font-size:13px; margin:0; line-height:1.2; color:#efe6d6; }
          .mwi-footer-column.center { flex:1 1 auto; text-align:center; }
          .mwi-footer-column.center h4 { margin-bottom:8px; }
          .mwi-footer-column.center ul { padding:0; margin:0; list-style:none; display:inline-block; text-align:left; }
          .mwi-footer-column.right { flex:0 0 260px; text-align:right; }
          .mwi-footer-column.right ul { padding:0; margin:0; list-style:none; }
          .mwi-footer-column h4 { font-size:13px; margin:0 0 6px; color:#d4a955; }
          .mwi-footer-column ul li { font-size:12px; margin-bottom:6px; }
          .mwi-footer-bottom { font-size:12px; padding:0; text-align:center; margin-top:8px; color:#bfa971; }
          @media (max-width:880px) {
            .mwi-footer-content { flex-direction:column; align-items:center; gap:12px; padding:0 10px; }
            .mwi-footer-brand img { width:110px; }
            .mwi-footer-column.center ul { display:block; text-align:center; }
            .mwi-footer-column.right { text-align:center; }
          }
          /* Solo móviles: ocultar footer en página de servicios */
          @media (max-width:640px) {
            .services-page .mwi-footer { display:none !important; }
          }
        </style>

        <footer class="mwi-footer">
          <div class="mwi-footer-newsletter" style="max-width:1100px; margin:0 auto 12px;">
            <input type="email" placeholder="Correo electrónico">
            <button>Suscríbete</button>
          </div>
          <div class="mwi-footer-content">
            <div class="mwi-footer-brand">
              <img src="assets/images/logo-mwi-gold.png" alt="Modern Wealth Institute">
              <p>Educación que transforma<br>conocimiento en oportunidades.</p>
            </div>
            <div class="mwi-footer-column center">
              <h4>Trabaja con nosotros</h4>
              <ul>
                <li><a href="https://wa.me/573003517982?text=estoy%20interesad%40%20en%20participar%20en%20el%20affiliate%20program%2C%20podrias%20darme%20mas%20informacion%3F" target="_blank" rel="noopener noreferrer">Affiliate Program</a></li>
                <li><a href="https://wa.me/573003517982?text=Hola%2C%20estoy%20interesad%40%20en%20a%C3%B1adir%20un%20master%20a%20su%20portafolio%20de%20masters" target="_blank" rel="noopener noreferrer">Mentorship Alliance</a></li>
                <li><a href="https://wa.me/573003517982?text=Hola%2C%20quisiera%20saber%20si%20hay%20vacantes%20para%20trabajar%20con%20el%20Modern%20Wealth%20Institute" target="_blank" rel="noopener noreferrer">Job Qualify</a></li>
              </ul>
            </div>
            <div class="mwi-footer-column right">
              <h4>Legal</h4>
              <ul>
                <li><a href="#/terms" data-link>Términos & Condiciones</a></li>
                <li><a href="#/privacy" data-link>Política de Privacidad</a></li>
                <li><a href="#/payments" data-link>Política de Pagos</a></li>
                <li><a href="#/legal" data-link>Aviso Legal</a></li>
              </ul>
            </div>
          </div>
          <div class="mwi-footer-bottom">
            <span>© 2025 Modern Wealth Institute. Todos los derechos reservados.</span>
          </div>
        </footer>
      </main>
      </div>
    `;
  },

  init() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}

    // Manejo del botón del header (menu toggle) y sidebar
    const sidebar = document.getElementById('services-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle'); // header toggle id reutilizado
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions dentro del sidebar
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('nav-go-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('nav-go-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('nav-go-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('nav-go-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('nav-go-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
    document.getElementById('nav-go-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
    document.getElementById('nav-go-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });
    document.getElementById('nav-go-logout')?.addEventListener('click', () => {
      try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
      try { localStorage.removeItem('mwi:token'); } catch {}
      unlock();
      try { Router.navigate('/'); } catch { try { window.location.hash = '#/'; } catch {} }
    });

    // Acción del botón Suscribirse (Inner Circle) dependiente de isPaid
    try {
      const btn = document.getElementById('sic-subscribe-main');
      if (btn && !btn.__hasHandler) {
        btn.addEventListener('click', (e) => {
          try { e.preventDefault(); } catch (err) {}
          const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
          const isPaid = !!(user && (user.role === 'admin' || user.isPaid === true)) || !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
          if (!isPaid) {
            // Abrir modal estilizado indicando cómo activar la membresía desde el Dashboard
            try {
              const modal = document.getElementById('membership-modal');
              if (modal) {
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
              }
            } catch (err) {}
            return;
          }
          // Usuario con membresía activa: ir a la página Inner Circle
          try { Router.navigate('/inner-circle'); } catch (err) { window.location.hash = '#/inner-circle'; }
        });
        btn.__hasHandler = true;
      }
    } catch (err) { /* noop */ }

    // Membership modal handlers
    try {
      const modal = document.getElementById('membership-modal');
      if (modal && !modal.__wired) {
        const unlock = () => { try { document.body.style.overflow = ''; } catch (e) {} modal.classList.remove('open'); };
        modal.addEventListener('click', (ev) => {
          const t = ev.target;
          if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { unlock(); }
        });
        const closeBtn = document.getElementById('mm-close');
        closeBtn && closeBtn.addEventListener('click', () => unlock());
        const goDash = document.getElementById('mm-go-dashboard');
        goDash && goDash.addEventListener('click', () => { unlock(); try { Router.navigate('/dashboard'); } catch { window.location.hash = '#/dashboard'; } });
        modal.__wired = true;
      }
    } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ServicesPage;
}
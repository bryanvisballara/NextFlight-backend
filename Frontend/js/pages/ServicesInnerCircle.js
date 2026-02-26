const ServicesInnerCircle = {
  render() {
    return `
      <main class="service-page" style="min-height:80vh; padding:48px 20px; background:#080808; color:#efe6d6;">
        <style>
          .sic-container{ max-width:1100px; margin:0 auto; display:flex; gap:36px; align-items:flex-start; }
          .sic-image{ flex:0 0 46%; }
          .sic-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
          .sic-content{ flex:1 1 auto; padding:12px 6px; }
          .sic-title{ font-size:36px; margin:0 0 12px; color:#fff; }
          .sic-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:20px; }
          .sic-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
          .sic-list{ margin:12px 0 18px 18px; color:#efe6d6; }
          /* ocupar todo el viewport y centrar las cards en la página (no en el contenedor) */
          .sic-previews{
            display:flex;
            gap:18px;
            flex-wrap:wrap;
            justify-content:center;
            margin-top:12px;
            width:100vw;                     /* ocupar ancho del viewport */
            max-width:none;
            margin-left: calc(1% - 50vw);   /* desplazar para quedar centrado respecto al viewport */
            box-sizing:border-box;
          }
          /* título full-width centrado en la página */
          .sic-title-block{
            width:100vw;
            margin-left: calc(1% - 50vw);
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:8px;
            box-sizing:border-box;
          }
          .sic-title-badge{
            display:inline-block;
            background:#2b2118;
            color:#d4a955;
            padding:10px 10px;
            border-radius:6px;
            font-weight:700;
          }
          .sic-title-main{
            margin:8px 0 18px;
            color:#fff;
            font-size:24px;
            text-align:center;
          }
          .sic-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
          .sic-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
          .sic-back{ background:transparent; border:1px solid rgba(255,255,255,0.06); color:#efe6d6; padding:8px 10px; border-radius:6px; cursor:pointer; }
          @media (max-width:880px){ .sic-container{ flex-direction:column; } .sic-image{ flex:0 0 auto; } .sic-title{ font-size:26px; } }
        </style>

        <div class="sic-container" aria-labelledby="sic-title">
          <div class="sic-image" aria-hidden="false">
            <img src="assets/images/services-inner-circle.png" alt="Inner Circle">
          </div>

          <div class="sic-content">
            <h1 id="sic-title" class="sic-title">El mundo del <span style="color:#d4a955;">TRADING</span></h1>
            <div class="sic-subtitle">Inner Circle — Señales & Acompañamiento en vivo</div>

            <p class="sic-lead">
              ¿Quieres operar en los mercados con más seguridad y acompañamiento real?
              Forma parte de un grupo exclusivo donde recibirás señales, análisis en vivo y seguimiento personalizado.
            </p>

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
              <button class="sic-btn" id="sic-subscribe" type="button">Suscríbete</button>
              <button class="sic-back" id="sic-back">Volver</button>
            </div>

            <div style="margin-top:28px;">
              <div class="sic-title-block" aria-hidden="false">
                <div class="sic-title-badge">Servicios</div>
                <h3 class="sic-title-main">Descubre otros de nuestros servicios</h3>
              </div>

              <div class="sic-previews">
                <a href="#/services-viral-push" class="service-preview" style="text-decoration:none; color:inherit;">
                  <div style="width:320px; border-radius:12px; overflow:hidden; background:#0f0d0c; box-shadow:0 10px 30px rgba(0,0,0,0.6);">
                    <img src="assets/images/services-viral-push.png" alt="Viral Push" style="width:100%; display:block;">
                    <div style="padding:14px; background:#bfa971; color:#22160f; font-weight:800; text-align:center;">likes & followers market</div>
                  </div>
                </a>

                <a href="#/services-ecommerce-mentoring" class="service-preview" style="text-decoration:none; color:inherit;">
                  <div style="width:320px; border-radius:12px; overflow:hidden; background:#0f0d0c; box-shadow:0 10px 30px rgba(0,0,0,0.6);">
                    <img src="assets/images/services-ecommerce-mentoring.png" alt="E-commerce mentoring" style="width:100%; display:block;">
                    <div style="padding:14px; background:#bfa971; color:#22160f; font-weight:800; text-align:center;">E-commerce mentoring</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- footer (copiado de HomePage) -->
      <style>
        /* Footer reducido y layout en tres columnas: brand | center | right */
        .mwi-footer { padding:12px 10px !important; background:transparent; color:#efe6d6; }
        .mwi-footer * { box-sizing:border-box; }
        .mwi-footer-newsletter { display:flex; gap:8px; align-items:center; margin-bottom:12px; justify-content:center; }
        .mwi-footer-newsletter input { padding:6px 8px; font-size:12px; height:32px; min-width:200px; }
        .mwi-footer-newsletter button { padding:6px 10px; font-size:12px; }

        .mwi-footer-content {
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:24px;
          width:100%;
          max-width:1100px;
          margin:0 auto;
        }

        /* Marca (izquierda) */
        .mwi-footer-brand { flex:0 0 260px; display:flex; gap:8px; flex-direction:column; align-items:center; text-align:center; }
        .mwi-footer-brand img { width:140px; height:auto; display:block; margin-bottom:6px; }
        .mwi-footer-brand p { font-size:13px; margin:0; line-height:1.2; color:#efe6d6; }

        /* Centro: 'Trabaja con nosotros' centrado */
        .mwi-footer-column.center { flex:1 1 auto; text-align:center; }
        .mwi-footer-column.center h4 { margin-bottom:8px; }
        .mwi-footer-column.center ul { padding:0; margin:0; list-style:none; display:inline-block; text-align:left; }

        /* Derecha: legal alineado a la derecha */
        .mwi-footer-column.right { flex:0 0 260px; text-align:right; }
        .mwi-footer-column.right ul { padding:0; margin:0; list-style:none; }

        .mwi-footer-column h4 { font-size:13px; margin:0 0 6px; color:#d4a955; }
        .mwi-footer-column ul li { font-size:12px; margin-bottom:6px; }
        .mwi-footer-bottom { font-size:12px; padding:8px 0; text-align:center; margin-top:8px; color:#bfa971; }

        @media (max-width:880px) {
          .mwi-footer-content { flex-direction:column; align-items:center; gap:12px; padding:0 10px; }
          .mwi-footer-brand { justify-content:center; align-items:center; }
          .mwi-footer-brand img { width:110px; }
          .mwi-footer-column.center ul { display:block; text-align:center; }
          .mwi-footer-column.right { text-align:center; }
        }
      </style>

      <footer class="mwi-footer">
        <!-- Newsletter (colocado arriba, centrado) -->
        <div class="mwi-footer-newsletter" style="max-width:1100px; margin:0 auto 12px;">
           <input type="email" placeholder="Correo electrónico">
           <button>Suscríbete</button>
         </div>

         <!-- Contenido distribuido -->
         <div class="mwi-footer-content">
          <!-- Marca (izquierda, logo encima del texto) -->
          <div class="mwi-footer-brand">
            <img src="assets/images/logo-mwi-gold.png" alt="Modern Wealth Institute">
            <p>Educación que transforma<br>conocimiento en oportunidades.</p>
          </div>

           <!-- Trabaja con nosotros (centro) -->
           <div class="mwi-footer-column center">
             <h4>Trabaja con nosotros</h4>
             <ul>
               <li><a href="https://wa.me/573003517982?text=estoy%20interesad%40%20en%20participar%20en%20el%20affiliate%20program%2C%20podrias%20darme%20mas%20informacion%3F" target="_blank" rel="noopener noreferrer">Affiliate Program</a></li>
               <li><a href="https://wa.me/573003517982?text=Hola%2C%20estoy%20interesad%40%20en%20a%C3%B1adir%20un%20master%20a%20su%20portafolio%20de%20masters" target="_blank" rel="noopener noreferrer">Mentorship Alliance</a></li>
               <li><a href="https://wa.me/573003517982?text=Hola%2C%20quisiera%20saber%20si%20hay%20vacantes%20para%20trabajar%20con%20el%20Modern%20Wealth%20Institute" target="_blank" rel="noopener noreferrer">Job Qualify</a></li>
             </ul>
           </div>

           <!-- Legal (derecha) -->
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

         <!-- Línea inferior -->
         <div class="mwi-footer-bottom">
           <span>© 2025 Modern Wealth Institute. Todos los derechos reservados.</span>
         </div>
       </footer>

      ${typeof Footer !== 'undefined' && Footer && typeof Footer.render === 'function' ? Footer.render() : ''}
    `;
  },
  
  after_render() {
    // Modal de suscripción: requisitos para Inner Circle
    function openSubscribeModal() {
      try {
        let modal = document.getElementById('sic-subscribe-modal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'sic-subscribe-modal';
          modal.className = 'mwi-modal';
          modal.innerHTML = `
            <style>
              #sic-subscribe-modal { display:block; position:fixed; inset:0; z-index:10000; }
              #sic-subscribe-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
              #sic-subscribe-modal .content { position:relative; max-width:720px; margin:40px auto; background:linear-gradient(180deg,#151313,#0f0f0f); border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); color:#efe6d6; }
              #sic-subscribe-modal .box { padding:20px; }
              #sic-subscribe-modal .title { color:#a47c3b; font-size:22px; font-weight:800; text-align:center; margin:10px 0 6px; }
              #sic-subscribe-modal .lead { color:#cdbb9a; text-align:center; margin-bottom:12px; }
              #sic-subscribe-modal ul { color:#efe6d6; margin:8px 0 14px 24px; }
              #sic-subscribe-modal .actions { display:flex; justify-content:center; gap:10px; margin-top:12px; }
              #sic-subscribe-modal .btn-home { appearance:none; border:none; padding:10px 16px; border-radius:8px; font-weight:800; letter-spacing:.4px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
              #sic-subscribe-modal .close { position:absolute; right:10px; top:10px; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; color:#d4a955; font-weight:800; }
              @media (max-width: 640px) { #sic-subscribe-modal .content { width:92vw; max-width:360px; margin:16px auto; } #sic-subscribe-modal .box { padding:14px; } }
            </style>
            <div class="overlay" data-close="1"></div>
            <div class="content" role="dialog" aria-modal="true" aria-labelledby="sic-modal-title">
              <button class="close" id="sic-modal-close" aria-label="Cerrar">×</button>
              <div class="box">
                <div id="sic-modal-title" class="title">Inner Circle — Suscripción</div>
                <p class="lead">Para recibir señales de trading con Inner Circle, debes:</p>
                <ul>
                  <li>Ser miembro de MWI.</li>
                  <li>Tener activa la suscripción mensual del servicio.</li>
                </ul>
                <p style="color:#cdbb9a; text-align:center;">Crea tu cuenta o inicia sesión para tener acceso al Inner Circle.</p>
                <div class="actions">
                  <button id="sic-go-home" class="btn-home" type="button">Ir a homepage</button>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        }
        const close = () => { try { modal.remove(); document.documentElement.style.overflow=''; } catch (e) { modal.style.display = 'none'; } };
        modal.querySelector('#sic-modal-close')?.addEventListener('click', close);
        modal.querySelector('.overlay')?.addEventListener('click', close);
        const goHome = modal.querySelector('#sic-go-home');
        if (goHome && !goHome.__hasHandler) {
          goHome.addEventListener('click', () => { try { if (typeof Router !== 'undefined') Router.navigate('/'); else window.location.hash = '#/'; } catch (e) { window.location.hash = '#/'; } close(); });
          goHome.__hasHandler = true;
        }
        try { document.documentElement.style.overflow='hidden'; } catch (e) {}
      } catch (err) { /* ignore */ }
    }

    const btn = document.getElementById('sic-subscribe');
    if (btn && !btn.__hasHandler) {
      btn.addEventListener('click', (e) => { try { e.preventDefault(); } catch (err) {} openSubscribeModal(); });
      btn.__hasHandler = true;
    }

    const back = document.getElementById('sic-back');
    if (back && !back.__hasHandler) {
      back.addEventListener('click', (e) => {
        e.preventDefault();
        // volver al home (hash)
        try { history.pushState(null, '', '#/'); } catch (err) { /* ignore */ }
        try { if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') Router.navigate('/'); } catch (err) {}
        // trigger HomePage rendering if needed
        const ev = new Event('hashchange'); window.dispatchEvent(ev);
      });
      back.__hasHandler = true;
    }

    // --- asegurar footer.js cargado e insertar footer en el placeholder / global ---
    function ensureFooterScriptLoaded() {
      if (typeof window === 'undefined') return Promise.reject();
      if (window.Footer) return Promise.resolve(window.Footer);
      const existing = document.querySelector('script[data-footer="1"]') || document.querySelector('script[data-footer-global="1"]');
      if (existing) {
        return new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve(window.Footer));
          existing.addEventListener('error', reject);
        });
      }
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'js/components/Footer.js';
        s.async = true;
        s.setAttribute('data-footer', '1');
        s.onload = () => resolve(window.Footer);
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
      });
    }

    function insertFooterNow() {
      const ph = document.getElementById('sic-footer-placeholder');
      const global = document.getElementById('global-footer');
      const canRender = (typeof Footer !== 'undefined' && typeof Footer.render === 'function');
      if (!canRender) return false;
      const html = Footer.render();
      if (ph) ph.innerHTML = html;
      if (global) global.innerHTML = html;
      if (!ph && !global) {
        const div = document.createElement('div');
        div.id = 'global-footer';
        div.innerHTML = html;
        document.body.appendChild(div);
      }
      if (typeof Footer.init === 'function') {
        try { Footer.init(); } catch (e) { /* ignore init errors */ }
      }
      return true;
    }

    // intentar insertar de inmediato, si falla cargar el script y reintentar
    try {
      if (!insertFooterNow()) {
        ensureFooterScriptLoaded().then(() => { insertFooterNow(); }).catch(() => { /* ignore */ });
      }
    } catch (err) { /* ignore */ }
  }
};

// Exponer globalmente para que HomePage pueda invocarlo al detectar hash
if (typeof window !== 'undefined') window.ServicesInnerCircle = ServicesInnerCircle;

// --- Reemplazado: forzar render cuando la URL hash es #/services-inner-circle (con reintentos) ---
(function() {
  function renderServiceOnce() {
    try {
      if (!window.ServicesInnerCircle) return false;
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) return false;
      main.innerHTML = ServicesInnerCircle.render();
      if (typeof ServicesInnerCircle.after_render === 'function') {
        try { ServicesInnerCircle.after_render(); } catch (e) {}
      }
      return true;
    } catch (err) { return false; }
  }

  function attemptRenderWithRetries(maxAttempts = 30, intervalMs = 120) {
    let attempts = 0;
    const tryNow = () => {
      attempts++;
      const ok = renderServiceOnce();
      if (ok || attempts >= maxAttempts) clearInterval(iv);
    };
    // intentar inmediatamente y luego en intervalos
    tryNow();
    const iv = setInterval(tryNow, intervalMs);
  }

  function handleIfServiceHash() {
    try {
      const h = (location.hash || '').toLowerCase();
      if (!h.includes('/services-inner-circle')) return;
      // usar reintentos para cubrir race conditions con el Router
      attemptRenderWithRetries(40, 120);
    } catch (err) { /* ignore */ }
  }

  // Registrar
  try { document.addEventListener('DOMContentLoaded', handleIfServiceHash); } catch (e) {}
  try { window.addEventListener('hashchange', handleIfServiceHash); } catch (e) {}
  try { window.addEventListener('popstate', handleIfServiceHash); } catch (e) {}
  // intento inmediato por si el script se carga después y el hash ya está en la URL
  try { handleIfServiceHash(); } catch (e) {}
})();

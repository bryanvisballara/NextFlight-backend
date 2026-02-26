const ServicesEcommerceMentoring = {
  render() {
    return `
      <main class="service-page" style="min-height:80vh; padding:48px 20px; background:#080808; color:#efe6d6;">
        <style>
          .sem-container{ max-width:1100px; margin:0 auto; display:flex; gap:36px; align-items:flex-start; }
          .sem-image{ flex:0 0 46%; }
          .sem-image img{ width:100%; height:auto; display:block; border-radius:8px; box-shadow:0 18px 60px rgba(0,0,0,0.6); }
          .sem-content{ flex:1 1 auto; padding:12px 6px; }
          .sem-title{ font-size:36px; margin:0 0 12px; color:#fff; }
          .sem-subtitle{ color:#d4a955; font-weight:800; letter-spacing:1px; margin-bottom:18px; font-size:20px; }
          .sem-lead{ color:#cdbb9a; margin-bottom:18px; line-height:1.6; }
          .sem-list{ margin:12px 0 18px 18px; color:#efe6d6; }
          .sem-cta{ display:flex; gap:10px; align-items:center; margin-top:12px; }
          .sem-btn{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; padding:10px 16px; border-radius:6px; font-weight:800; border:0; cursor:pointer; }
          .sem-back{ background:transparent; border:1px solid rgba(255,255,255,0.06); color:#efe6d6; padding:8px 10px; border-radius:6px; cursor:pointer; }
          .sem-previews{ display:flex; gap:18px; flex-wrap:wrap; justify-content:center; margin-top:12px; width:100vw; max-width:none; margin-left: calc(50% - 50vw); box-sizing:border-box; }
          /* título full-width centrado en la página */
          .sem-title-block{
            width:100vw;
            margin-left: calc(50% - 50vw);
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:8px;
            box-sizing:border-box;
          }
          .sem-title-badge{
            display:inline-block;
            background:#2b2118;
            color:#d4a955;
            padding:10px 10px;
            border-radius:6px;
            font-weight:700;
          }
          .sem-title-main{
            margin:8px 0 18px;
            color:#fff;
            font-size:24px;
            text-align:center;
          }
          @media (max-width:880px){ .sem-container{ flex-direction:column; } .sem-image{ flex:0 0 auto; } .sem-title{ font-size:26px; } }
        </style>

        <div class="sem-container" aria-labelledby="sem-title">
          <div class="sem-image">
            <img src="assets/images/services-ecommerce-mentoring.png" alt="E-commerce Mentoring">
          </div>

          <div class="sem-content">
            <h1 id="sem-title" class="sem-title">E-commerce <span style="color:#d4a955;">Mentoring</span></h1>
            <div class="sem-subtitle">E-commerce Mentoring — Acelera tus ventas online</div>

            <p class="sem-lead">
              Mentoring y acompañamiento para optimizar tiendas, listings y escalar ventas en marketplaces.
            </p>

            <h4 style="color:#f6e7c9; margin-top:6px;">¿Qué incluye?</h4>
            <ul class="sem-list">
              <li>Optimización de listings y fichas de producto.</li>
              <li>Estrategias de pricing y logística.</li>
              <li>Campañas de adquisición y retención.</li>
              <li>Monitoreo de métricas y mejoras continuas.</li>
            </ul>

            <div class="sem-cta">
              <a class="sem-btn" href="https://wa.me/573003517982?text=Hola%2C%20estoy%20interesad%40%20en%20obtener%20una%20mentoria%20de%20E-commerce" target="_blank" rel="noopener noreferrer">Contactar</a>
              <button class="sem-back" id="sem-back">Volver</button>
            </div>
          </div>
        </div>

        <!-- Title + previews moved outside .sem-container to center on full viewport -->
        <div style="margin-top:28px;">
          <div class="sem-title-block" aria-hidden="false">
            <div class="sem-title-badge">Servicios</div>
            <h3 class="sem-title-main">Otros servicios</h3>
          </div>

          <div class="sem-previews">
            <a href="#/services-inner-circle" style="text-decoration:none; color:inherit;">
              <div style="width:320px; border-radius:12px; overflow:hidden; background:#0f0d0c; box-shadow:0 10px 30px rgba(0,0,0,0.6);">
                <img src="assets/images/services-inner-circle.png" alt="Inner Circle" style="width:100%; display:block;">
                <div style="padding:14px; background:#bfa971; color:#22160f; font-weight:800; text-align:center;">Inner Circle - Trading</div>
              </div>
            </a>

            <a href="#/services-viral-push" style="text-decoration:none; color:inherit;">
              <div style="width:320px; border-radius:12px; overflow:hidden; background:#0f0d0c; box-shadow:0 10px 30px rgba(0,0,0,0.6);">
                <img src="assets/images/services-viral-push.png" alt="Viral Push" style="width:100%; display:block;">
                <div style="padding:14px; background:#bfa971; color:#22160f; font-weight:800; text-align:center;">Viral Push</div>
              </div>
            </a>
          </div>
        </div>

      <!-- footer (copiado de HomePage) -->
      <style>
        /* Footer reducido y layout en tres columnas: brand | center | right */
        .mwi-footer { padding:80px 10px !important; background:transparent; color:#efe6d6; }
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
      </main>
    `;
  },

  after_render() {
    const contact = document.getElementById('sem-contact');
    if (contact && !contact.__hasHandler) {
      contact.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch (err) {}
        try { window.open('https://wa.me/message/DMWKUCUEYO2TH1', '_blank'); } catch (err) { window.location.href = 'https://wa.me/message/DMWKUCUEYO2TH1'; }
      });
      contact.__hasHandler = true;
    }

    const back = document.getElementById('sem-back');
    if (back && !back.__hasHandler) {
      back.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch (err) {}
        try { history.pushState(null, '', '#/'); } catch (err) {}
        try { if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') Router.navigate('/'); } catch (err) {}
        window.dispatchEvent(new Event('hashchange'));
      });
      back.__hasHandler = true;
    }
  }
};

if (typeof window !== 'undefined') window.ServicesEcommerceMentoring = ServicesEcommerceMentoring;
if (typeof module !== 'undefined' && module.exports) module.exports = ServicesEcommerceMentoring;

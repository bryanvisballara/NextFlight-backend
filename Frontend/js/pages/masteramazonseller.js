const MasterAmazonSeller = {
  render() {
    return `
      <main class="master-amazon" style="background:#080808;color:#efe6d6;min-height:80vh;padding:40px 20px;">
        <style>
          .mas-hero{ max-width:1200px; margin:0 auto 28px; display:flex; flex-direction:column; gap:18px; align-items:center; }
          /* Reducir imagen hero al 50% del ancho en escritorio, mantener responsive en móvil */
          .mas-hero-visual{ width:50%; max-width:600px; border-radius:20px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.6); }
          .mas-hero-visual img{ width:100%; height:auto; display:block; }
          /* Separator: barra dorada horizontal full-width (entre hero y siguiente sección) */
          .mas-separator{
            width:100vw;
            margin-left:calc(50% - 50vw);
            height:60px; /* aumentado */
            background:linear-gradient(90deg, rgba(212,169,85,1), rgba(212,169,85,0.7));
            box-shadow:0 6px 26px rgba(212,169,85,0.22), inset 0 0 28px rgba(212,169,85,0.10);
            border-radius:6px;
            margin-top:24px;
            margin-bottom:24px;
          }

          /* NUEVO: sección feature (texto izquierda / video derecha) */
          /* fondo full-bleed; contenido centrado dentro de .mas-feature-inner */
          .mas-feature{ width:100vw; margin-left:calc(50% - 50vw); box-sizing:border-box; padding:0; background:#0e0e0d; }
          .mas-feature-inner{ max-width:1200px; margin:0 auto; padding:36px 20px; display:grid; grid-template-columns:1fr 520px; gap:32px; align-items:center; box-sizing:border-box; }
          .mas-feature .left, .mas-feature-inner .left { color:#efe6d6; }
          .mas-feature h1.title-main{ font-size:56px; margin:0 0 12px; color:#d4a955; letter-spacing:2px; }
          .mas-feature .subtitle{ color:#d4a955; font-weight:700; margin-bottom:18px; }
          .mas-feature p.lead{ color:#efe6d6; line-height:1.6; margin-bottom:18px; }
          .mas-feature .achievements{ color:#efe6d6; margin-top:12px; }
          .mas-feature .achievements h3{ color:#d4a955; margin-bottom:12px; }
          .mas-feature .achievements ul{ margin-left:18px; line-height:1.6; }

          /* espacio para video: imagen de poster + play */
          .mas-video{ width:100%; height:auto; border-radius:8px; overflow:hidden; position:relative; background:#0f0d0c; box-shadow:0 20px 60px rgba(0,0,0,0.6); }
          .mas-video .poster{ display:block; width:100%; height:100%; background-image:url('assets/images/master-amazon-seller.png'); background-size:cover; background-position:center; padding-bottom:62%; } /* aspect */
          .mas-video .play{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:84px; height:84px; border-radius:50%; background:linear-gradient(90deg,#d4a955,#b8862f); display:flex; align-items:center; justify-content:center; font-weight:800; color:#22160f; font-size:28px; box-shadow:0 8px 30px rgba(212,169,85,0.18); cursor:pointer; }
          .mas-video .label{ position:absolute; left:0; right:0; bottom:0; padding:12px 14px; background:linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.6)); color:#efe6d6; text-align:center; font-weight:700; }

          .mas-intro{ max-width:1100px; margin:0 auto; text-align:center; }
          .mas-intro p.lead{ color:#cdbb9a; line-height:1.6; margin:8px 0 18px; }
          .mas-badge{ display:inline-block;background:#2b2118;color:#d4a955;padding:8px 12px;border-radius:6px;font-weight:700;margin-bottom:12px; }

          .mas-content{ max-width:1100px; margin:28px auto; display:grid; grid-template-columns:1fr 420px; gap:28px; align-items:start; }
          .mas-left{ color:#efe6d6; }
          .mas-left h2{ color:#fff; font-size:22px; margin:8px 0 12px; }
          .mas-left ul{ margin:12px 0 0 18px; color:#efe6d6; line-height:1.6; }
          .mas-right{ background:linear-gradient(180deg,#0f0d0c,#0b0a09); padding:18px; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.6); color:#efe6d6; }
          .mas-cta{ display:flex; gap:12px; margin-top:12px; }
          .mas-cta .btn{ padding:12px 16px; border-radius:8px; font-weight:800; cursor:pointer; border:0; }
          .btn-gold{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; }
          .btn-outline{ background:transparent; border:1px solid rgba(255,255,255,0.06); color:#efe6d6; }
          .mas-footer-note{ text-align:center; color:#a89266; font-size:13px; margin-top:20px; }

          /* SECCIÓN 3: Contenido (badge centrado + dos columnas TOC) */
          .mas-contents-section{ width:100vw; margin-left:calc(50% - 50vw); background:transparent; box-sizing:border-box; padding:36px 20px 60px; }
          .mas-contents-inner{ max-width:1200px; margin:0 auto; text-align:center; }
          .mas-contents-badge{ display:inline-block; background:#b8862f; color:#fff; padding:10px 22px; border-radius:8px; font-weight:800; font-size:20px; box-shadow:0 8px 24px rgba(0,0,0,0.5); margin-bottom:18px; }
          .mas-contents-title{ color:#efe6d6; font-size:18px; margin-bottom:8px; }
          .mas-toc{ margin-top:18px; display:grid; grid-template-columns: 1fr 1fr; gap:28px; align-items:start; text-align:left; color:#efe6d6; }
          .mas-toc-column{ padding:18px 22px; border-left:1px solid rgba(255,255,255,0.03); border-right:1px solid rgba(255,255,255,0.03); opacity:0; }
          .mas-toc-column ul{ list-style:none; margin:0; padding:0; column-gap:18px; }
          .mas-toc-column li{ margin:10px 0; color:#d9c59a; }
          .mas-toc-column li.small{ color:#efe6d6; font-size:14px; margin-left:14px; }
          
          .mas-toc-column.animate-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          
          .mas-toc-column.animate-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
          
          /* SECCIÓN 4: bloques alternados imagen-texto con separadores */
          .mas-section4{ width:100vw; margin-left:calc(50% - 50vw); background:transparent; box-sizing:border-box; padding:48px 20px; }
          .mas-section4-inner{ max-width:1200px; margin:0 auto; }
          .mas-section4-title{ text-align:center; color:#efe6d6; font-size:32px; margin-bottom:24px; }
          .mas-section4-separator{ width:100%; height:3px; background:linear-gradient(90deg, rgba(212,169,85,0.8), rgba(212,169,85,0.4)); margin:28px 0; border-radius:2px; }
          .mas-section4-block{ display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; margin-bottom:28px; }
          .mas-section4-block.reverse{ direction:rtl; }
          .mas-section4-block.reverse > *{ direction:ltr; }
          .mas-section4-image{ width:100%; border-radius:12px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.5); }
          .mas-section4-image img{ width:100%; height:auto; display:block; }
          .mas-section4-text{ color:#efe6d6; }
          .mas-section4-text .mas-badge{ margin-bottom:12px; }
          .mas-section4-text h3{ color:#d4a955; font-size:24px; margin:0 0 12px; }
          .mas-section4-text p{ color:#efe6d6; line-height:1.6; margin:0; }
          
          /* Animaciones slide-in */
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .mas-section4-block {
            opacity: 0;
          }
          
          .mas-section4-block.animate-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          
          .mas-section4-block.animate-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
          
          /* SECCIÓN 5: Testimonios (badge centrado + título + dos columnas con videos) */
          .mas-section5{ width:100vw; margin-left:calc(50% - 50vw); background:transparent; box-sizing:border-box; padding:48px 20px; }
          .mas-section5-inner{ max-width:1200px; margin:0 auto; text-align:center; }
          .mas-section5-title{ color:#efe6d6; font-size:28px; margin:12px 0 32px; line-height:1.4; }
          .mas-testimonials-grid{ display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-top:24px; }
          .mas-testimonial-card{ background:#1a1a1a; border-radius:16px; padding:0; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.6); position:relative; }
          .mas-testimonial-tag{ position:absolute; top:18px; left:18px; width:80px; height:32px; background:#bfa971; border-radius:16px 16px 16px 0; z-index:2; }
          .mas-testimonial-video{ width:100%; height:280px; background:#4a4a4a; display:flex; align-items:center; justify-content:center; color:#fff; font-size:32px; font-weight:700; position:relative; }
          .mas-testimonial-user{ display:flex; align-items:center; gap:14px; padding:18px 20px; background:#1a1a1a; }
          .mas-testimonial-user img{ width:54px; height:54px; border-radius:50%; object-fit:cover; }
          .mas-testimonial-user .info{ text-align:left; }
          .mas-testimonial-user .name{ color:#efe6d6; font-weight:700; font-size:16px; margin:0 0 4px; }
          .mas-testimonial-user .year{ color:#bfa971; font-size:13px; margin:0; }
          @media (max-width:980px){
            .mas-section4-block, .mas-section4-block.reverse{ grid-template-columns:1fr; direction:ltr; gap:18px; }
            .mas-section4-title{ font-size:24px; }
            .mas-testimonials-grid{ grid-template-columns:1fr; gap:24px; }
            .mas-section5-title{ font-size:22px; }
          }

          @media (max-width:880px){
            .mas-toc{ grid-template-columns:1fr; }
            .mas-contents-badge{ font-size:18px; padding:8px 18px; }
            .mas-toc-column{ padding:12px; }
          }

          @media (max-width:980px){
            .mas-content{ grid-template-columns:1fr; padding:0 8px; }
            /* en pantallas pequeñas la imagen hero vuelve a 100% */
            .mas-hero-visual{ width:100%; max-width:1100px; }
            .mas-separator{ height:400px; margin-top:400px; margin-bottom:400px; }
          }
        </style>

        <div class="mas-hero">
          <div class="mas-hero-visual" aria-hidden="false">
            <img src="assets/images/master-amazon-seller.png" alt="Amazon Seller Master">
          </div>
        </div>

        <!-- Separador dorado full-width entre hero y sección feature -->
        <div class="mas-separator" aria-hidden="true"></div>

         <!-- NUEVA SECCIÓN: fondo full-bleed; contenido centrado en .mas-feature-inner -->
         <div class="mas-feature" aria-hidden="false">
          <div class="mas-feature-inner">
            <div class="left">
              <div class="mas-badge">Conoce mas</div>

              <h1 class="title-main">AMAZON SELLER</h1>
              <div class="subtitle">Master avalado por el Modern Wealth Institute</div>
              <p class="lead">Master orientado en el conocimiento profundo de las ventas en línea a través de la plataforma de ventas de Amazon. Es un ecosistema complejo por la cantidad de opciones y alcance global, ideal para quienes buscan escalar operaciones y ventas.</p>
              <div class="achievements">
                <h3>Logros alcanzados</h3>
                <ul>
                  <li>Apertura exitosa dentro de la plataforma.</li>
                  <li>Entender los métodos de distribución.</li>
                  <li>Entender los modos de venta.</li>
                  <li>Estrategias para lograr ventas a corto/largo plazo.</li>
                </ul>
              </div>
            </div>
            <div class="mas-video" role="button" aria-label="Ver video">
              <div class="poster"></div>
              <div class="play">▶</div>
              <div class="label">Master en Amazon Seller Central</div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 3: Contenido (badge centrado + TOC de dos columnas) -->
        <section class="mas-contents-section" aria-labelledby="mas-contents-title">
          <div class="mas-contents-inner">
            <div class="mas-badge" role="presentation">Contenido</div>
            <div id="mas-contents-title" class="mas-contents-title" aria-hidden="true"></div>
            <div class="mas-toc" role="navigation" aria-label="Tabla de contenido">
              <div class="mas-toc-column">
                <ul>
                  <li>1. Apertura de cuentas</li>
                  <li class="small">1.1 Tipos de cuenta, que vas a necesitar y consideraciones importantes</li>
                  <li class="small">1.2 Sigue estos pasos</li>
                  <li>2. Define tu modelo de negoci: Retail arbitrage - Wholesale - Brand Boosting</li>
                  <li class="small">2.1 Retail arbitrage</li>
                  <li class="small">2.2 Wholesale</li>
                  <li class="small">2.3 Brand boosting</li>
                  <li>3. Define tu modo de operar - logística, FBM - FBA</li>
                  <li class="small">3.1 FBM</li>
                  <li class="small">3.2 FBA</li>
                  <li>4. Seguridad y bloqueos</li>
                  <li class="small">4.1 No pierdas tiempo, evitate problemas futuros.</li>
                  <li>5. Retail arbitrage</li>
                  <li class="small">5.1 Cómo encontrar productos</li>
                  <li class="small">5.2 Cómo encontrar proveedores</li>
                  <li class="small">5.3 OJO, antes de comprar y abastecerte, HAZ ESTO</li>
                  <li class="small">5.4 Seguimiento de ventas</li>
                  <li>6. Wholesale</li>
                  <li class="small">6.1 Cómo encontrar productos</li>
                  <li class="small">6.2 Cómo encontrar proveedores</li>
                  <li class="small">6.3 OJO, antes de comprar y abastecerte, HAZ ESTO</li>
                  <li class="small">6.4 Seguimiento de ventas</li>
                </ul>
              </div>
              <div class="mas-toc-column">
                <ul>
                  <li>7. Brand Boosting</li>
                  <li class="small">7.1 Nichos, define que vas a vender</li>
                  <li class="small">7.2 Registro de marca USPTO</li>
                  <li class="small">7.3 Amazon Brand Registry accelerator program</li>
                  <li class="small">7.4 GTIN para tus productos</li>
                  <li class="small">7.5 A+ content</li>
                  <li class="small">7.6 Diseña tu tienda</li>
                  <li class="small">7.7 Impulsa tu marca</li>
                  <li>8. Gestión de envíos y devoluciones</li>
                  <li class="small">8.1 Cómo enviar tus productos a las bodegas siendo FBA</li>
                  <li class="small">8.2 Cómo enviar tus productos a los clientes siendo FBM</li>
                  <li class="small">8.3 Tipos de devoluciones</li>
                  <li class="small">8.4 Inventario extraviado (FBA)</li>
                  <li class="small">8.5 Cómo retirar tu inventario (FBA)</li>
                  <li>9. Account health & performance notification</li>
                  <li class="small">9.1 Definiciones</li>
                  <li>10. Payments & business reports</li>
                  <li class="small">10.1 Pagos</li>
                  <li class="small">10.2 Reportes financieros para tu negocio</li>
                  <li>11. Cómo reportar algún error, solicitar documentos o pedir ayuda en el seller</li>
                  <li class="small">11.1 Botón AYUDA</li>
                  <li>12. Cuentas bloqueadas</li>
                  <li class="small">12.1 Que hiciste</li>
                  <li class="small">12.2 Plan de acción</li>
                  <li>13. Extras y actualizaciones</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- SECCIÓN 4: bloques alternados imagen-texto con separadores -->
        <section class="mas-section4" aria-labelledby="mas-section4-title">
          <div class="mas-section4-inner">
            <h2 id="mas-section4-title" class="mas-section4-title">Domina la venta de alto rendimiento en Amazon</h2>
            <div class="mas-section4-separator" aria-hidden="true"></div>

            <!-- Bloque 1: imagen izquierda / texto derecha -->
            <div class="mas-section4-block">
              <div class="mas-section4-image">
                <img src="assets/images/img1amazon.png" alt="VENTAS DIARIAS">
              </div>
              <div class="mas-section4-text">
                <div class="mas-badge">VENTAS DIARIAS</div>
                <h3>Optimiza tu desempeño diario</h3>
                <p>Supervisar métricas clave para potenciar las ventas y lograr mejores resultados de performance.</p>
              </div>
            </div>

            <div class="mas-section4-separator" aria-hidden="true"></div>

            <!-- Bloque 2: texto izquierda / imagen derecha -->
            <div class="mas-section4-block reverse">
              <div class="mas-section4-image">
                <img src="assets/images/img2amazon.png" alt="Paso 2">
              </div>
              <div class="mas-section4-text">
                <div class="mas-badge">DISTRIBUCIÓN & LOGÍSTICA</div>
                <h3>Organiza de manera eficiente tus pedidos</h3>
                <p>Gestionar pedidos, controlar inventarios y coordinar envíos eficientemente.</p>
              </div>
            </div>

            <div class="mas-section4-separator" aria-hidden="true"></div>

            <!-- Bloque 3: imagen izquierda / texto derecha -->
            <div class="mas-section4-block">
              <div class="mas-section4-image">
                <img src="assets/images/img3amazon.png" alt="Paso 3">
              </div>
              <div class="mas-section4-text">
                <div class="mas-badge">GESTIÓN PUBLICITARIA</div>
                <h3>Maximiza ventas de manera inteligente</h3>
                <p>Analizar reportes financieros y optimizar campanas publicitarias para maximizar el ROI.</p>
              </div>
            </div>

            <div class="mas-section4-separator" aria-hidden="true"></div>
          </div>
        </section>

        <!-- SECCIÓN 5: Testimonios (badge + título + dos columnas con videos) -->
        <section class="mas-section5" aria-labelledby="mas-section5-title">
          <div class="mas-section5-inner">
            <div class="mas-badge" role="presentation">Testimonios</div>
            <h2 id="mas-section5-title" class="mas-section5-title">Lo que nuestros alumnos dicen<br>de nuestro Master</h2>
            
            <div class="mas-testimonials-grid">
              <!-- Tarjeta 1 -->
              <div class="mas-testimonial-card">
                <div class="mas-testimonial-tag" aria-hidden="true"></div>
                <div class="mas-testimonial-video" role="img" aria-label="Video testimonial">
                  VIDEO
                </div>
                <div class="mas-testimonial-user">
                  <img src="assets/images/testimonial-juan.jpg" alt="Juan Hernandez">
                  <div class="info">
                    <div class="name">Juan Hernandez</div>
                    <div class="year">Suscrito el 2024</div>
                  </div>
                </div>
              </div>

              <!-- Tarjeta 2 -->
              <div class="mas-testimonial-card">
                <div class="mas-testimonial-tag" aria-hidden="true"></div>
                <div class="mas-testimonial-video" role="img" aria-label="Video testimonial">
                  VIDEO
                </div>
                <div class="mas-testimonial-user">
                  <img src="assets/images/testimonial-camilo.jpg" alt="Camilo Lara">
                  <div class="info">
                    <div class="name">Camilo Lara</div>
                    <div class="year">Suscrito el 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mwi-masters">

  <div class="mwi-masters-container">

    <span class="mwi-badge">Conoce mas Masters</span>

    <h2 class="mwi-masters-title">
      Líder global en la formación <br>
      y dominio de los negocios modernos
    </h2>

    <div class="mwi-masters-carousel">

      <a href="#/masters/amazon-seller" class="mwi-master-card" data-master="amazon" onclick="openMasterAmazonInline(event)">
        <img src="assets/images/master-amazon-seller.png" alt="Amazon Seller Master">
        <div class="mwi-master-overlay">
          <h3>Amazon Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/trading" class="mwi-master-card" data-master="trading" onclick="openMasterTradingInline(event)">
        <img src="assets/images/master-trading.png" alt="Trading Master">
        <div class="mwi-master-overlay">
          <h3>Trading<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/vida-proposito" class="mwi-master-card" data-master="vida" onclick="openMasterVidaInline(event)">
        <img src="assets/images/master-vida-proposito.png" alt="Vida con Propósito">
        <div class="mwi-master-overlay">
          <h3>Vida con propósito<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/cripto-arbitrage" class="mwi-master-card" data-master="cripto" onclick="openMasterCriptoInline(event)">
        <img src="assets/images/master-cripto-arbitrage.png" alt="Cripto Arbitrage">
        <div class="mwi-master-overlay">
          <h3>Cripto Arbitrage<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/ebay-seller" class="mwi-master-card" data-master="ebay" onclick="openMasterEbayInline(event)">
        <img src="assets/images/master-ebay-seller.png" alt="Ebay Seller">
        <div class="mwi-master-overlay">
          <h3>Ebay Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/direccion-empresarial" class="mwi-master-card" data-master="empresarial" onclick="openMasterEmpresarialInline(event)">
        <img src="assets/images/master-gestion-empresarial.png" alt="Dirección Empresarial">
        <div class="mwi-master-overlay">
          <h3>Dirección Empresarial<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/master-meli" class="mwi-master-card" data-master="meli" onclick="openMasterMeliInline(event)">
        <img src="assets/images/master-meli.png" alt="Top Seller MeLi">
        <div class="mwi-master-overlay">
          <h3>Top Seller MeLi<br><span>Master</span></h3>
        </div>
      </a>

      <a href="masters/shein-seller.html" class="mwi-master-card">
        <img src="assets/images/master-shein-seller.png" alt="Shein Seller">
        <div class="mwi-master-overlay">
          <h3>Shein Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="masters/social-media.html" class="mwi-master-card">
        <img src="assets/images/master-social-media.png" alt="Social Media Management">
        <div class="mwi-master-overlay">
          <h3>Social Media Management<br><span>Master</span></h3>
        </div>
      </a>

    </div>

  </div>

</section>

<!-- footer (incrustado manualmente, layout ajustado) -->
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

        ${(typeof Footer !== 'undefined' && typeof Footer.render === 'function') ? Footer.render() : ''}
      </main>
    `;
  },

  after_render() {
    // Intersection Observer para animar los bloques
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const block = entry.target;
          if (block.classList.contains('reverse')) {
            block.classList.add('animate-right');
          } else {
            block.classList.add('animate-left');
          }
          observer.unobserve(block);
        }
      });
    }, {
      threshold: 0.2
    });

    const blocks = document.querySelectorAll('.mas-section4-block');
    blocks.forEach(block => {
      observer.observe(block);
    });

    // Intersection Observer para animar las columnas de TOC
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const columns = entry.target.querySelectorAll('.mas-toc-column');
          if (columns.length >= 2) {
            columns[0].classList.add('animate-left');
            columns[1].classList.add('animate-right');
          }
          tocObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    const tocElement = document.querySelector('.mas-toc');
    if (tocElement) {
      tocObserver.observe(tocElement);
    }

    const join = document.getElementById('mas-join');
    if (join && !join.__hasHandler) {
      join.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch (err) {}
        try { window.open('https://wa.me/message/DMWKUCUEYO2TH1', '_blank'); } catch (err) { window.location.href = 'https://wa.me/message/DMWKUCUEYO2TH1'; }
      });
      join.__hasHandler = true;
    }
    const contact = document.getElementById('mas-contact');
    if (contact && !contact.__hasHandler) {
      contact.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch (err) {}
        try { window.open('https://wa.me/message/DMWKUCUEYO2TH1', '_blank'); } catch (err) { window.location.href = 'https://wa.me/message/DMWKUCUEYO2TH1'; }
      });
      contact.__hasHandler = true;
    }
  }
};

if (typeof window !== 'undefined') window.MasterAmazonSeller = MasterAmazonSeller;
if (typeof module !== 'undefined' && module.exports) module.exports = MasterAmazonSeller;

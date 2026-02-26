/**
 * PÁGINA: PERFIL DE MAESTRO
 * Ruta: /maestro/:slug
 * Muestra hero, presentación, logros, masters impartidos,
 * qué aprenderás, mensaje personal (video) y testimonios.
 */

const MasterProfilePage = {
  /**
   * Perfiles: datos base por slug (sobrescribibles desde backend en futuro)
   */
  PROFILES: {
    'bryan-visbal': {
      name: 'Bryan Visbal',
      role: 'Mentor — MWI',
      specialty: 'Master en Amazon FBA | Mentor en Escalamiento de Negocios',
      quote: 'Transformo conocimiento en resultados reales.',
      photo: 'assets/images/bryan.jpeg',
      videoUrl: '',
      achievements: {
        salesUsd: 1000000,
        countries: 8,
        students: 450,
        certs: ['Amazon SPN', 'E-commerce Growth'],
        brands: ['Amazon FBA', 'eBay', 'MeLi', 'SHEIN']
      },
      testimonials: [
        { photo: 'assets/images/testimonial-camilo.jpg', name: 'Camilo G.', result: 'Duplicó ventas en 90 días' },
        { photo: 'assets/images/testimonial-juan.jpg', name: 'Juan S.', result: 'Primera tienda rentable en 60 días' }
      ],
      bullets: [
        'Diseño de estrategias aplicables desde el día 1',
        'Optimización de listings y aumento de conversión',
        'Gestión de riesgo y escalamiento sostenible',
        'Errores típicos a evitar en e-commerce'
      ]
    },
    'tilsia-lara': {
      name: 'Tilsia Lara',
      role: 'Mentora — MWI',
      specialty: 'Formación y dirección empresarial',
      quote: 'Transformo decisiones estratégicas en crecimiento real',
      photo: 'assets/images/tilsia.jpeg',
      videoUrl: '',
      achievements: { salesUsd: 800000, countries: 5, students: 300, certs: ['Brand Strategy'], brands: ['Instagram', 'YouTube'] },
      testimonials: [
        { photo: 'assets/images/testimonial-juan.jpg', name: 'Juan S.', result: 'Branding claro y consistente' }
      ],
      bullets: [
        'Pensamiento estratégico empresarial',
        'Dirección efectiva y liderazgo organizacional',
        'Control y crecimiento sostenible'
      ]
    },
    'antonio-vergel': {
      name: 'Antonio Vergel',
      role: 'Mentor — MWI',
      specialty: 'Vida con Propósito | Liderazgo y Familia',
      quote: 'Dirigir la vida con propósito transforma generaciones.',
      photo: 'assets/images/antonio.jpeg',
      achievements: { salesUsd: 1200000, countries: 6, students: 380, certs: ['Lean Ops'], brands: ['ERP', 'Ops'] },
      testimonials: [],
      bullets: [
        'Alinear tu vida, tu fe y tus decisiones',
        'Fortalecer tu matrimonio y tu familia',
        'Vivir con propósito más allá del éxito material'
      ]
    },
    'daniel-visbal': {
      name: 'Daniel Visbal',
      role: 'Mentor — MWI',
      specialty: 'Trading | Gestión de Riesgo',
      quote: 'Transformo conocimiento en resultados reales.',
      photo: 'assets/images/danielv.jpeg',
      achievements: { salesUsd: 0, countries: 4, students: 250, certs: ['Trading Pro'], brands: ['TradingView'] },
      testimonials: [],
      bullets: [ 'Estrategias probadas', 'Riesgo controlado', 'Psicología del trader' ]
    },
    'daniel-delavalle': {
      name: 'Daniel De Lavalle',
      role: 'Mentor — MWI',
      specialty: 'Trading Expert',
      quote: 'La consistencia nace de una correcta gestión del capital.',
      photo: 'assets/images/danield.jpeg',
      achievements: { salesUsd: 0, countries: 3, students: 200, certs: ['Day Trading'], brands: ['MetaTrader'] },
      testimonials: [],
      bullets: [ 'Gestión inteligente del capital', 'Control del riesgo y del drawdown', 'Disciplina y consistencia operativa' ]
    }
  },

  buildVideoEmbed(url) {
    const u = String(url || '').trim();
    if (!u) return '';
    const ytMatch = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{6,})/);
    if (ytMatch && ytMatch[1]) {
      const id = ytMatch[1];
      const src = `https://www.youtube.com/embed/${id}?rel=0`;
      return `<div class="embed-wrap"><iframe src="${src}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    }
    const vmMatch = u.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vmMatch && vmMatch[1]) {
      const id = vmMatch[1];
      const src = `https://player.vimeo.com/video/${id}`;
      return `<div class="embed-wrap"><iframe src="${src}" title="Vimeo video" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u)) {
      return `<video controls src="${u}" style="width:100%; height:100%;"></video>`;
    }
    return `<div class="embed-wrap"><iframe src="${u}" frameborder="0" allowfullscreen></iframe></div>`;
  },

  render(slug) {
    if (!AuthManager.isAuthenticated()) { Router.navigate('/login'); return ''; }
    let p = this.PROFILES[slug] || {
      name: slug,
      role: 'Mentor — MWI',
      specialty: 'Mentoría especializada',
      quote: 'Transformo conocimiento en resultados reales.',
      photo: null,
      bio: '',
      videoUrl: '',
      achievements: { salesUsd: 0, countries: 0, students: 0, certs: [], brands: [] },
      testimonials: [],
      bullets: []
    };

    // Overlay con overrides desde StorageManager (admin)
    try {
      const mentors = (typeof StorageManager !== 'undefined' && StorageManager.getAllMentors) ? StorageManager.getAllMentors() : [];
      const override = mentors.find(m => (m.slug || '').trim() === String(slug).trim());
      if (override) {
        if (override.name) p.name = override.name;
        if (override.photo) p.photo = override.photo;
        if (override.role) p.role = override.role;
        if (override.specialty) p.specialty = override.specialty;
        if (override.quote) p.quote = override.quote;
        if (typeof override.videoUrl === 'string') p.videoUrl = override.videoUrl;
        if (typeof override.bio === 'string') p.bio = override.bio;
        if (Array.isArray(override.bullets)) p.bullets = override.bullets;
        if (Array.isArray(override.assignedMasters)) p.assignedMasters = override.assignedMasters;
        if (Array.isArray(override.assignedMasterIds)) p.assignedMasterIds = override.assignedMasterIds;
        if (Array.isArray(override.achievementsCustom)) p.achievementsCustom = override.achievementsCustom;
      }
    } catch (e) { /* ignore */ }

    const mastersAll = StorageManager.getAllMasters() || [];
    const mastersByInstructor = mastersAll.filter(m => (m.instructor || '').toLowerCase() === (p.name || '').toLowerCase());
    const photo = p.photo || Utils.getPlaceholderImage(900, 520, p.name || 'MWI');
    const isBryan = slug === 'bryan-visbal';
    const isTilsia = slug === 'tilsia-lara';
    const isDaniel = slug === 'daniel-delavalle';

    const fmt = (n) => new Intl.NumberFormat('en-US').format(n || 0);

    // buildVideoEmbed ahora es un método en el objeto (ver más arriba)

    const currentUser = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser) ? AuthManager.getCurrentUser() : null;
    const isPaid = !!(currentUser && currentUser.isPaid === true);
    const ctaButtons = `
              <button id="cta-masters" class="btn-gold">Acceder a sus Masters</button>
              ${!isPaid ? '<button id="cta-join" class="btn-gold">Unirme a Modern Wealth Institute</button>' : ''}
            `;

    // Prefer instagram from admin overrides if provided
    const instagramUrl = (p && typeof p.instagramUrl === 'string' && p.instagramUrl.trim()) ? p.instagramUrl.trim() : '';

    return `
      <div class="mentor-page">
        ${Header.render(false, true, true, true)}
        <style>
          .mentor-page .mwi-header { padding: 8px 0; height: 58px; }
          .mentor-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .mentor-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .mentor-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .mentor-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }
          /* Perfil en header: mover al borde derecho y aumentar tamaño */
          .mentor-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
          .mentor-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
          .mentor-page .mwi-header .mwi-header-actions .profile-menu { right:0; }

          /* Mobile: center logo and keep icons at corners */
          @media (max-width: 640px) {
            .mentor-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .mentor-page .mwi-header .mwi-logo { justify-self:center; }
            .mentor-page .mwi-header .mwi-header-actions { right:10px; top:10px; transform:none; }
            .mentor-page .menu-toggle { left:10px; top:10px; transform:none; }
          }

          .mentor-page main { padding: 24px 20px; color:#efe6d6; background-color:#0f0f0f; background-image:linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url('assets/images/fondodashboard.png'); background-size:cover; background-position:center; background-repeat:no-repeat; }
          .hero { display:grid; grid-template-columns: 420px 1fr; gap:18px; align-items:center; background:rgba(20,18,18,.6); border:1px solid rgba(212,169,85,.18); border-radius:12px; padding:16px; }
          .hero .photo { height:320px; border-radius:10px; background:linear-gradient(135deg,#12100f,#1e1a16); border:1px solid rgba(212,169,85,.22); background-size:cover; background-position:center; }
          ${(isBryan || isTilsia) ? `.hero .photo { background-image:none; }` : `.hero .photo { background-image:url('${photo}'); }`}
          /* Carousel para Bryan */
          .hero .photo .carousel { position:relative; width:100%; height:100%; overflow:hidden; border-radius:10px; }
          .hero .photo .slide { position:absolute; inset:0; background-size:contain; background-position:center; background-repeat:no-repeat; background-color:#0f0d0c; opacity:0; transition: opacity .6s ease; }
          .hero .photo .slide.active { opacity:1; }
          .hero .name { font-size:28px; font-weight:800; color:#f6e9c9; }
          .hero .role { color:#d4a955; font-weight:800; margin-top:2px; }
          .hero .spec { color:#cdbb9a; margin-top:8px; }
          .hero .quote { margin-top:12px; font-size:18px; color:#e8dcc0; }
          .hero .socials { margin-top:10px; display:flex; align-items:center; gap:8px; }
          .hero .ig-btn { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; }
          .hero .ig-btn:hover { background:rgba(26,24,22,.6); }
          .hero .ig-btn svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.6; }

          /* Mobile-only: place text above photo and reduce photo size */
          @media (max-width: 640px) {
            .hero { display:flex; flex-direction: column; gap:12px; }
            .hero > div:nth-child(2) { order: -1; }
            .hero .photo { width:100%; height:220px; background-size:cover; background-position:center; border-radius:10px; }
            .hero .name { font-size:24px; }
            .hero .quote { font-size:16px; }
          }

          .section { margin-top:18px; background:rgba(20,18,18,.6); border:1px solid rgba(212,169,85,.18); border-radius:12px; padding:16px; }
          .section h2 { color:#f6e9c9; font-size:22px; font-weight:800; margin:0 0 10px; }

          .bio { color:#cdbb9a; line-height:1.6; }

          .ach-grid { display:grid; grid-template-columns: repeat(5, 1fr); gap:12px; }
          @media (max-width:1100px){ .ach-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width:720px){ .ach-grid { grid-template-columns: 1fr; } }
          .ach-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; text-align:center; }
          .ach-card .val { color:#f6e9c9; font-weight:800; font-size:18px; }
          .ach-card .label { color:#cdbb9a; font-size:13px; }

          .masters-list { display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; }
          @media (max-width:980px){ .masters-list { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width:640px){ .masters-list { grid-template-columns: 1fr; } }
          .master-card { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; display:grid; grid-template-rows:auto auto auto; gap:8px; }
          .master-card .title { color:#efe6d6; font-weight:800; }
          .master-card .sub { color:#cdbb9a; }
          .master-card .cta { display:flex; gap:8px; }
          .btn-gold { appearance:none; border:none; padding:8px 12px; border-radius:6px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }

          .bullets { display:grid; row-gap:8px; color:#e8dcc0; }
          .bullets .row { display:flex; align-items:center; gap:10px; }
          .bullets .row .check svg { width:18px; height:18px; fill:none; stroke:#d4a955; stroke-width:2; }

          .video { aspect-ratio:16/9; background:#0f0d0c; border:1px solid rgba(212,169,85,.18); border-radius:10px; display:flex; align-items:center; justify-content:center; color:#cdbb9a; overflow:hidden; }
          .video .embed-wrap { position:relative; width:100%; height:100%; }
          .video .embed-wrap iframe { position:absolute; inset:0; width:100%; height:100%; }

          .testimonials { display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; }
          @media (max-width:820px){ .testimonials { grid-template-columns: 1fr; } }
          .testimonial { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:12px; display:grid; grid-template-columns: 52px 1fr; gap:10px; align-items:center; }
          .testimonial .ph { width:52px; height:52px; border-radius:50%; background:#1d1a19; border:1px solid rgba(212,169,85,.18); background-size:cover; background-position:center; }
          .testimonial .name { color:#efe6d6; font-weight:800; }
          .testimonial .res { color:#cdbb9a; font-size:13px; }

          .cta-final { display:flex; gap:10px; align-items:center; justify-content:center; }
        </style>

        <main>
          <!-- 1. Hero -->
          <section class="hero">
            <div class="photo" aria-hidden="true">
              ${isBryan ? `
                <div class="carousel">
                  <div class="slide active" style="background-image:url('assets/images/bryan1.jpeg')"></div>
                  <div class="slide" style="background-image:url('assets/images/bryan2.jpeg')"></div>
                  <div class="slide" style="background-image:url('assets/images/bryan3.jpeg')"></div>
                </div>
              ` : (isTilsia ? `
                <div class="carousel">
                  <div class="slide active" style="background-image:url('assets/images/tilsia1.jpeg')"></div>
                  <div class="slide" style="background-image:url('assets/images/tilsia2.jpeg')"></div>
                  <div class="slide" style="background-image:url('assets/images/tilsia3.jpeg')"></div>
                </div>
              ` : '')}
            </div>
            <div>
              <div class="name">${p.name}</div>
              <div class="role">${p.role}</div>
              <div class="spec">${p.specialty}</div>
              <div class="quote">“${p.quote}”</div>
              ${(instagramUrl || isBryan) ? `
                <div class="socials">
                  <a class="ig-btn" href="${instagramUrl || 'https://www.instagram.com/bryanvisbal?igsh=MWJ6Nm1tMDl6b3JzOA%3D%3D&utm_source=qr'}" target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram del mentor">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17" cy="7" r="1.5"/>
                    </svg>
                  </a>
                </div>
              ` : ''}
            </div>
          </section>

          <!-- 2. Presentación -->
          <section class="section">
            <h2>¿Quién es este maestro?</h2>
            <div class="bio">
              ${
                (p.bio && p.bio.trim())
                  ? p.bio
                  : (isBryan
                      ? 'Con más de 5 años de experiencia en ecommerce internacional, ha ayudado a cientos de emprendedores a construir negocios rentables y escalables, combinando estrategia, mentalidad y ejecución real.'
                      : isTilsia
                        ? 'Tilsia Lara es una experta en gestión organizacional con una sólida trayectoria en dirección institucional. Como Headmaster de Berkley School, ha perfeccionado su enfoque estratégico para liderar equipos y optimizar procesos, ayudando a construir modelos de gestión eficientes y orientados a resultados sostenibles.'
                        : slug === 'antonio-vergel'
                          ? 'Antonio Vergel es un empresario con más de 30 años de trayectoria como fundador y director de una empresa de ingeniería civil especializada en geotecnia, liderando proyectos de alto impacto con visión estratégica, disciplina y excelencia.\n\nParalelamente a su carrera empresarial, ha dedicado más de 20 años al liderazgo espiritual y familiar como pastor, líder de la Red Familiar y asesor de matrimonios y familias, acompañando a cientos de personas a construir vidas sólidas, relaciones saludables y hogares con fundamento.\n\nSu enfoque integra principios empresariales, liderazgo personal y valores espirituales, demostrando que el éxito verdadero no se mide solo en resultados financieros, sino en propósito, carácter y legado. En Modern Wealth Institute, Antonio forma personas que desean alinear su vida, su familia y su llamado con una visión clara y trascendente.'
                          : isDaniel
                            ? 'Daniel De Lavalle es un mentor especializado en trading disciplinado y gestión de capital en mercados financieros. Su enfoque se basa en la ejecución real, el control del riesgo y la toma de decisiones objetivas en entornos de alta volatilidad.\n\nA lo largo de su trayectoria ha acompañado a traders a desarrollar sistemas operativos sostenibles, alejados de la improvisación y del trading emocional. Su metodología prioriza la protección del capital, la consistencia a largo plazo y la correcta lectura del mercado, aplicando principios profesionales utilizados por operadores institucionales.\n\nEn Modern Wealth Institute, Daniel forma traders que entienden que el verdadero éxito no está en una operación ganadora, sino en la gestión correcta de cientos de decisiones consecutivas.'
                              : 'Con más de 8 años de experiencia en ecommerce internacional, ha ayudado a cientos de emprendedores a construir negocios rentables y escalables, combinando estrategia, mentalidad y ejecución real.'
                    )
              }
            </div>
          </section>

          <!-- 3. Logros & Autoridad -->
          <section class="section">
            <h2>Logros & Autoridad</h2>
            <div class="ach-grid">
              ${Array.isArray(p.achievementsCustom) && p.achievementsCustom.length ? `
                ${p.achievementsCustom.map(a => `
                  <div class="ach-card"><div class="val">${Utils.escapeHtml(a.val || '')}</div><div class="label">${Utils.escapeHtml(a.label || '')}</div></div>
                `).join('')}
              ` : `${isTilsia ? `
                <div class="ach-card"><div class="val">+40 años</div><div class="label">Dirección & gestión institucional</div></div>
                <div class="ach-card"><div class="val">Liderazgo directivo</div><div class="label">Gestión de equipos y procesos</div></div>
                <div class="ach-card"><div class="val">+300</div><div class="label">Profesionales bajo su mando</div></div>
                <div class="ach-card"><div class="val">Estrategia organizacional</div><div class="label">Planificación y toma de decisiones</div></div>
                <div class="ach-card"><div class="val">Transformación institucional</div><div class="label">Modelos de gestión sostenibles</div></div>
              ` : slug === 'antonio-vergel' ? `
                <div class="ach-card"><div class="val">+30 años</div><div class="label">Empresario en ingeniería civil y geotecnia</div></div>
                <div class="ach-card"><div class="val">Empresas consolidadas</div><div class="label">Construcción y dirección a largo plazo</div></div>
                <div class="ach-card"><div class="val">+20 años</div><div class="label">Liderazgo pastoral y familiar</div></div>
                <div class="ach-card"><div class="val">+1.000</div><div class="label">Familias y matrimonios asesorados</div></div>
                <div class="ach-card"><div class="val">Legado generacional</div><div class="label">Propósito, valores y liderazgo</div></div>
              ` : isDaniel ? `
                <div class="ach-card"><div class="val">+6 años</div><div class="label">Experiencia en trading activo</div></div>
                <div class="ach-card"><div class="val">+1.500</div><div class="label">Operaciones ejecutadas en vivo</div></div>
                <div class="ach-card"><div class="val">Riesgo controlado</div><div class="label">Gestión profesional del drawdown</div></div>
                <div class="ach-card"><div class="val">+200</div><div class="label">Traders formados</div></div>
                <div class="ach-card"><div class="val">Consistencia operativa</div><div class="label">Enfoque a largo plazo</div></div>
              ` : `
                <div class="ach-card"><div class="val">+USD $${fmt(p.achievements.salesUsd)}</div><div class="label">Ventas gestionadas</div></div>
                <div class="ach-card"><div class="val">${fmt(p.achievements.countries)}</div><div class="label">Países</div></div>
                <div class="ach-card"><div class="val">+${fmt(p.achievements.students)}</div><div class="label">Alumnos formados</div></div>
                <div class="ach-card"><div class="val">${(p.achievements.certs||[]).join(', ')}</div><div class="label">Certificaciones</div></div>
                <div class="ach-card"><div class="val">${(p.achievements.brands||[]).join(', ')}</div><div class="label">Marcas / Proyectos</div></div>
              `}`}
            </div>
          </section>

          <!-- 4. Masters impartidos -->
          <section class="section">
            <h2>Masters impartidos por este Maestro</h2>
            <div class="masters-list">
              ${Array.isArray(p.assignedMasterIds) && p.assignedMasterIds.length ? `
                ${(() => {
                  try {
                    const all = (typeof StorageManager !== 'undefined' && StorageManager.getAllMasters) ? StorageManager.getAllMasters() : [];
                    const byId = (id) => all.find(ms => ms.id === id);
                    return p.assignedMasterIds.map(id => {
                      const ms = byId(id) || { id, title: id, category: '', level: '' };
                      const title = Utils.escapeHtml(ms.title || id);
                      const sub = `${Utils.escapeHtml(ms.category || '')}${ms.level ? ' · Nivel ' + Utils.escapeHtml(ms.level) : ''}`;
                      const isPlayer = !String(id).startsWith('master-');
                      const btn = isPlayer
                        ? `<button class="btn-gold" data-player-slug="${Utils.escapeHtml(id)}">Ver contenido</button>`
                        : `<button class="btn-gold" data-master="${Utils.escapeHtml(id)}" data-action="master">Ver contenido</button>`;
                      return `
                        <div class="master-card">
                          <div class="title">${title}</div>
                          ${sub.trim() ? `<div class="sub">${sub}</div>` : ''}
                          <div class="cta">${btn}</div>
                        </div>
                      `;
                    }).join('');
                  } catch (e) { return ''; }
                })()}
              ` : `${slug === 'antonio-vergel' ? `
                <div class="master-card">
                  <div class="title">Vida con Propósito</div>
                  <div class="sub">Liderazgo y Familia</div>
                  <div class="cta">
                    <a class="btn-gold" href="http://127.0.0.1:5500/#/master-player/vida-proposito" target="_blank" rel="noopener noreferrer">Ver contenido</a>
                  </div>
                </div>
              ` : slug === 'daniel-delavalle' ? `
                <div class="master-card">
                  <div class="title">Gestión de Capital en Mercados Financieros</div>
                  <div class="sub">Trading disciplinado</div>
                  <div class="cta">
                    <a class="btn-gold" href="http://127.0.0.1:55/#/master-player/trading-capital" target="_blank" rel="noopener noreferrer">Ver contenido</a>
                  </div>
                </div>
               
              ` : isTilsia ? `
                <div class="master-card">
                  <div class="title">Operación, Gestión y Dirección Empresarial</div>
                  <div class="sub">Formación directiva</div>
                  <div class="cta">
                    <button class="btn-gold" data-player-slug="gestion-empresarial">Ver contenido</button>
                  </div>
                </div>
              ` : isBryan ? `
                <div class="master-card">
                  <div class="title">Amazon Seller</div>
                  <div class="cta">
                    <button class="btn-gold" data-player-slug="amazon-seller">Ver contenido</button>
                  </div>
                </div>
                <div class="master-card">
                  <div class="title">eBay Seller Hub</div>
                  <div class="cta">
                    <button class="btn-gold" data-player-slug="ebay-seller">Ver contenido</button>
                  </div>
                </div>
                <div class="master-card">
                  <div class="title">Top Seller Mercado Libre</div>
                  <div class="cta">
                    <button class="btn-gold" data-player-slug="meli-top-seller">Ver contenido</button>
                  </div>
                </div>
                <div class="master-card">
                  <div class="title">SHEIN Seller</div>
                  <div class="cta">
                    <button class="btn-gold" data-player-slug="shein-seller">Ver contenido</button>
                  </div>
                </div>
              ` : `
                ${mastersByInstructor.length ? mastersByInstructor.map(m => `
                  <div class="master-card">
                    <div class="title">${m.title}</div>
                    <div class="sub">${m.category} · Nivel ${m.level}</div>
                    <div class="cta">
                      <button class="btn-gold" data-master="${m.id}" data-action="contenido">Ver contenido</button>
                      <button class="btn-gold" data-master="${m.id}" data-action="master">Ver Master completo</button>
                    </div>
                  </div>
                `).join('') : `
                  <div style="color:#cdbb9a;">Aún no hay masters asignados a este maestro en la base de datos.</div>
                `}
              `}`}
            </div>
          </section>

          <!-- 5. Qué aprenderás -->
          <section class="section">
            <h2>Qué aprenderás con este Maestro</h2>
            <div class="bullets">
              ${(p.bullets||[]).map(b => `<div class="row"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>${b}</span></div>`).join('')}
            </div>
          </section>

          <!-- 7. Mensaje personal (video) -->
          <section class="section">
            <h2>Mensaje personal del Maestro</h2>
            <div class="video">
              ${p.videoUrl ? this.buildVideoEmbed(p.videoUrl) : 'Video próximamente'}
            </div>
          </section>

          <!-- 8. Testimonios -->
          ${((p.testimonials||[]).length && !(isBryan || isTilsia)) ? `
          <section class="section">
            <h2>Testimonios</h2>
            <div class="testimonials">
              ${p.testimonials.map(t => `<div class="testimonial"><div class="ph" style="background-image:url('${t.photo}')"></div><div><div class="name">${t.name}</div><div class="res">${t.result}</div></div></div>`).join('')}
            </div>
          </section>` : ''}

          <!-- 9. CTA final -->
          <section class="section">
            <div class="cta-final">
              ${ctaButtons}
            </div>
          </section>
        </main>
        <!-- Sidebar overlay (igual a Masters/Podcast) -->
        <style>
          .mentor-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .mentor-sidebar.open { display:block; }
          .mentor-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .mentor-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); }
          .mentor-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .mentor-sidebar .nav-item:hover { color:#f6e9c9; }
          .mentor-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
        </style>
        <div id="mentor-sidebar" class="mentor-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-item" id="mentor-nav-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
            <div class="nav-item" id="mentor-nav-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
            <div class="nav-item" id="mentor-nav-podcast"><span class="icon"><svg viewBox="0 0 24 24"><rect x="9" y="4" width="6" height="10" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 20v-4"/></svg></span><span>Podcast</span></div>
            <div class="nav-item" id="mentor-nav-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
            ${isPaid ? `<div class="nav-item" id="mentor-nav-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>` : ''}
            <div class="nav-item" id="mentor-nav-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
          </aside>
        </div>
        <!-- Modal Afiliación (reutilizado del Dashboard) -->
        <style>
          .mentor-page .mwi-modal { display:none; position:fixed; inset:0; z-index:1000; }
          .mentor-page .mwi-modal.open { display:block; }
          .mentor-page .mwi-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
          .mentor-page .mwi-modal .content { position:relative; max-width:900px; margin:40px auto; background:linear-gradient(180deg,#151313,#0f0f0f); border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); }
          .mentor-page .mwi-modal .content .inner { padding:20px; display:grid; grid-template-columns: 1fr 330px; gap:18px; }
          @media (max-width: 900px) { .mentor-page .mwi-modal .content .inner { grid-template-columns: 1fr; } }
          .mentor-page .mwi-modal .title { color:#a47c3b; font-size:28px; font-weight:800; text-align:center; margin:6px 0 4px; }
          .mentor-page .mwi-modal .subtitle { color:#cdbb9a; text-align:center; margin-bottom:12px; }
          .mentor-page .mwi-modal .features {
            background-color:#141212;
            background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border:1px solid rgba(212,169,85,.15);
            border-radius:10px;
            padding:16px;
          }
          .mentor-page .mwi-modal .features .label { color:#efe6d6; font-size:22px; font-weight:700; margin-bottom:10px; }
          .mentor-page .mwi-modal .features .item { display:flex; align-items:center; gap:10px; color:#e8dcc0; padding:6px 0; }
          .mentor-page .mwi-modal .features .item .check svg { width:18px; height:18px; fill:none; stroke:#d4a955; stroke-width:2; }
          .mentor-page .mwi-modal .plan {
            background-color:#141212;
            background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border:1px solid rgba(212,169,85,.22);
            border-radius:10px;
            padding:16px;
            box-shadow: inset 0 0 0 1px rgba(212,169,85,.05);
          }
          .mentor-page .mwi-modal .plan .badge { display:flex; align-items:center; justify-content:center; margin-bottom:8px; }
          .mentor-page .mwi-modal .plan .badge img { width:88px; height:88px; object-fit:contain; filter:drop-shadow(0 0 6px rgba(212,169,85,.25)); }
          .mentor-page .mwi-modal .plan .name { color:#f6e9c9; font-size:24px; font-weight:800; text-align:center; margin-bottom:8px; }
          .mentor-page .mwi-modal .plan .bullets { color:#e8dcc0; display:grid; row-gap:8px; text-align:center; }
          .mentor-page .mwi-modal .plan .bullets .row { display:flex; align-items:center; justify-content:center; gap:10px; }
          .mentor-page .mwi-modal .plan .bullets .row .dot { width:8px; height:8px; border-radius:50%; background:#d4a955; box-shadow:0 0 6px rgba(212,169,85,.3); }
          .mentor-page .mwi-modal .plan .sep-line { height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.85), rgba(212,169,85,0.0)); margin:10px 0; }
          .mentor-page .mwi-modal .plan .price { color:#f6e9c9; text-align:center; font-weight:800; font-size:22px; margin:10px 0 2px; }
          .mentor-page .mwi-modal .plan .price .amt { font-size:32px; letter-spacing:.4px; }
          .mentor-page .mwi-modal .plan .price .sub { font-size:15px; font-weight:600; }
          .mentor-page .mwi-modal .actions { display:flex; flex-direction:column; gap:10px; margin-top:12px; align-items:center; }
          .mentor-page .mwi-modal .btn-pay { appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.4px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); width:70%; }
          .mentor-page .mwi-modal .btn-cancel { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 16px; border-radius:8px; font-weight:700; width:70%; }
          .mentor-page .mwi-modal .foot { display:flex; align-items:center; justify-content:center; gap:10px; color:#cdbb9a; padding:12px 20px; border-top:1px solid rgba(212,169,85,.18); text-align:center; }
          .mentor-page .mwi-modal .foot .lock svg { width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:1.6; }
          .mentor-page .mwi-modal .close { position:absolute; right:10px; top:10px; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; }
          .mentor-page .mwi-modal .close svg { width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:2; }
        </style>
        <div id="affiliacion-modal" class="mwi-modal" aria-hidden="true" aria-modal="true" role="dialog">
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
                <div class="price"><span>USD</span> <span class="amt">499</span><div class="sub">Pago único</div></div>
              </div>
            </div>
            <div class="foot"><span class="lock"><svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span><span>Tu cuenta está activa, pero el contenido está bloqueado hasta completar tu afiliación.</span></div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}

    // Intentar cargar overrides del backend (public) para que el video se actualice
    try {
      const m = (window.location.hash || '').match(/\/maestro\/([^\/\?]+)/);
      const slug = m ? m[1] : null;
      if (slug) {
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        fetch(`${base}/mentors/${slug}`)
          .then(async r => {
            const data = await r.json().catch(() => ({}));
            return data && data.mentor ? data.mentor : null;
          })
          .then(mentor => {
            if (mentor && mentor.videoUrl) {
              const videoEl = document.querySelector('.section .video');
              try { if (videoEl) videoEl.innerHTML = this.buildVideoEmbed(mentor.videoUrl); } catch (e) { /* ignore */ }
            }
          })
          .catch(() => { /* ignore */ });
      }
    } catch (e) { /* ignore */ }

    // Manejo del botón del header (menu toggle) y sidebar
    const sidebar = document.getElementById('mentor-sidebar');
    const toggleBtn = document.getElementById('podcast-menu-toggle'); // header toggle id reutilizado
    toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
    sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });

    // Nav actions dentro del sidebar
    const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
    document.getElementById('mentor-nav-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
    document.getElementById('mentor-nav-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
    document.getElementById('mentor-nav-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
    document.getElementById('mentor-nav-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
    document.getElementById('mentor-nav-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
    document.getElementById('mentor-nav-support')?.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    });

    // CTAs dentro de masters impartidos
    try {
      // Prioridad: si hay slug de reproductor, navegar al MasterPlayerPage
      document.querySelectorAll('.master-card .btn-gold').forEach(btn => {
        const playerSlug = btn.getAttribute('data-player-slug');
        if (playerSlug) {
          btn.addEventListener('click', () => Router.navigate(`/master-player/${playerSlug}`));
          return; // no seguir evaluando data-master si hay playerSlug
        }
        const masterId = btn.getAttribute('data-master');
        const action = btn.getAttribute('data-action');
        btn.addEventListener('click', () => {
          if (!masterId) return;
          if (action === 'contenido') Router.navigate(`/master/${masterId}`);
          else Router.navigate(`/master/${masterId}`);
        });
      });
    } catch (e) {}

    // CTAs finales
    document.getElementById('cta-masters')?.addEventListener('click', () => Router.navigate('/masters'));
    // Modal Afiliación: reutiliza comportamiento del Dashboard
    const modal = document.getElementById('affiliacion-modal');
    const openModal = () => { if (!modal) { Router.navigate('/payments'); return; } modal.classList.add('open'); document.body.style.overflow = 'hidden'; try { document.getElementById('btn-modal-pay')?.focus(); } catch (e) {} };
    const closeModal = () => { if (!modal) return; modal.classList.remove('open'); document.body.style.overflow = ''; };
    document.getElementById('cta-join')?.addEventListener('click', openModal);
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('btn-modal-cancel')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (ev) => { const target = ev.target; if (target && target.getAttribute && target.getAttribute('data-close') === 'true') closeModal(); });
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeModal(); });
    document.getElementById('btn-modal-pay')?.addEventListener('click', () => { try { closeModal(); Router.navigate('/payments'); } catch (e) { Router.navigate('/payments'); } });

    // Carousel auto-rotación para Bryan y Tilsia
    try {
      const isBryan = window.location.hash.includes('/maestro/bryan-visbal');
      const isTilsia = window.location.hash.includes('/maestro/tilsia-lara');
      if (isBryan || isTilsia) {
        const slides = Array.from(document.querySelectorAll('.hero .photo .slide'));
        if (slides.length) {
          let idx = 0;
          setInterval(() => {
            slides[idx]?.classList.remove('active');
            idx = (idx + 1) % slides.length;
            slides[idx]?.classList.add('active');
          }, 4000);
        }
      }
    } catch (e) {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MasterProfilePage;
}

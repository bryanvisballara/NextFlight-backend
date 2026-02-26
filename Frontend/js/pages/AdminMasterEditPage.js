const AdminMasterEditPage = {
  render(masterId) {
    const user = AuthManager.getCurrentUser();
    if (!user || user.role !== 'admin') {
      Router.navigate('/');
      return '';
    }

    const mentors = Array.from(new Set(StorageManager.getAllMasters()
      .map(m => (m.instructor || '').trim())
      .filter(n => !!n)));
    const mentorsOptions = mentors.length
      ? mentors.map(n => `<option value="${Utils.escapeHtml(n)}">${Utils.escapeHtml(n)}</option>`).join('')
      : '<option value="">— Sin mentores registrados —</option>';

    const defaultVimeo = '76979871';

    // Render layout igual al de creación
    return `
      ${Sidebar.render()}
      <div class="main-content">
        <style>
          .master-player-page { padding: 20px; color:#efe6d6; }
          .mp-layout { display:grid; grid-template-columns: 65% 35%; gap:20px; }
          .mp-left { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-right { background:#141212; border:1px solid rgba(212,169,85,.18); border-radius:10px; padding:16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
          .mp-right * { box-sizing: border-box; }
          .mp-back { appearance:none; border:1px solid rgba(212,169,85,.35); background:rgba(0,0,0,.35); color:#d4a955; font-weight:700; border-radius:6px; padding:6px 10px; font-size:12px; cursor:pointer; margin-bottom:10px; }
          .mp-back:hover { background:rgba(26,24,22,.8); }
          .mp-module { color:#cdbb9a; font-size:14px; font-weight:600; letter-spacing:.2px; }
          .mp-title { color:#f6e9c9; font-size:28px; font-weight:800; margin:8px 0 12px; }
          .mp-player { position:relative; width:100%; padding-bottom:56.25%; border-radius:10px; overflow:hidden; border:1px solid rgba(212,169,85,.18); background:#0f0d0f; }
          .mp-player iframe { position:absolute; inset:0; width:100%; height:100%; }
          .mp-playlist-title { color:#f6e9c9; font-size:18px; font-weight:800; margin-bottom:10px; }
          .mp-module-item { margin:8px 0; }
          .mp-module-toggle { width:100%; display:flex; align-items:center; gap:8px; padding:6px; border-radius:6px; cursor:pointer; border:1px solid rgba(212,169,85,.14); background:transparent; color:#efe6d6; font-weight:800; text-align:left; font-size:12px; }
          .mp-module-toggle:hover { background:#1a1816; }
          .mp-module-toggle .chev { color:#d4a955; font-weight:800; width:18px; display:inline-block; }
          .mp-sublist { margin:6px 0 0 28px; padding-left:0; max-width: calc(100% - 28px); }
          .mp-subitem { display:flex; align-items:center; gap:10px; padding:8px; border-radius:6px; border:1px solid rgba(212,169,85,.10); cursor:pointer; }
          .mp-subitem + .mp-subitem { margin-top:6px; }
          .mp-subitem .num { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(212,169,85,.10); color:#d4a955; font-weight:800; font-size:12px; }
          .mp-subitem .txt { color:#efe6d6; font-weight:600; font-size:14px; }
          .mp-subitem.active { background:#1a1816; border-color: rgba(212,169,85,.22); }
          .mp-addbox { display:grid; grid-template-columns: 1fr auto; gap:8px; padding:10px; border:1px dashed rgba(212,169,85,.35); border-radius:8px; background:rgba(0,0,0,.20); }
          .mp-addbox input, .mp-addbox select { padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; }
          .mp-add-sm { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) 150px; gap:8px; margin:8px 0; align-items:center; max-width:100%; }
          .mp-add-sm button { width:100%; }
          .master-player-page .btn { padding:6px 10px; font-size:12px; border-radius:6px; }
          .master-player-page .btn-small { padding:5px 8px; font-size:11px; border-radius:6px; }
          .master-player-page .btn-primary { font-weight:700; }
        </style>

        <main class="master-player-page">
          <div class="admin-topbar" style="display:flex; justify-content:flex-start; align-items:center; gap:8px; margin-bottom:12px; width:65%; margin-right:auto;">
            <input id="create-master-title" type="text" placeholder="Título del master" />
          </div>
          <div class="mp-layout">
            <section class="mp-left">
              <button class="mp-back" type="button" aria-label="Volver a Masters" onclick="Router.navigate('/admin/masters')">← Volver a Masters</button>
              <div class="mp-module" id="mp-left-module">Sin módulo</div>
              <div class="mp-title" id="mp-left-title">Sin video</div>
              <div class="mp-player">
                <iframe id="mp-left-iframe" src="https://player.vimeo.com/video/${defaultVimeo}?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            </section>
            <aside class="mp-right">
              <div class="mp-playlist-title">Lista de contenidos</div>
              <div class="mp-addbox" style="grid-template-columns: 1fr auto;">
                <input id="create-module-title" type="text" placeholder="Añadir nuevo módulo (título)" />
                <button class="btn btn-small btn-primary" onclick="AdminMasterCreate_addModule()">Añadir módulo</button>
              </div>

              <div id="mp-modules-list"></div>
            </aside>
          </div>
          <div class="admin-create-actions" style="margin-top:14px; display:flex; gap:8px; align-items:center;">
            <select id="create-master-mentor" style="padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6;">
              <option value="">Selecciona mentor</option>
              ${mentorsOptions}
            </select>
            <button class="btn btn-primary" onclick="AdminMasterEdit_saveMaster('${masterId}')">Guardar master</button>
            <button class="btn" onclick="AdminMasterEdit_uploadCover('${masterId}')">Subir portada</button>
            <button class="btn" onclick="AdminMasterEdit_previewMaster('${masterId}')">Ver como alumno</button>
            <button class="btn btn-small" onclick="AdminMasterEdit_deleteMasterPrompt('${masterId}')">Eliminar master</button>
          </div>
        </main>
        
      </div>
    `;
  },
  // Agrupa playlist en módulos y submódulos (como en MasterPlayer)
  groupPlaylist(list) {
    const modules = [];
    let current = null;
    (list || []).forEach((it) => {
      const title = typeof it === 'string' ? it : (it && it.title) || '';
      if (!title) return;
      const isModule = /^\d+\.\s/.test(title);
      const isSubmodule = /^\d+\.\d+/.test(title);
      if (isModule) {
        current = { title, children: [] };
        modules.push(current);
        return;
      }
      if (isSubmodule) {
        if (!current) {
          current = { title: title.replace(/^(\d+)\..*/, '$1. Módulo'), children: [] };
          modules.push(current);
        }
        current.children.push(title);
        return;
      }
      current = { title, children: [] };
      modules.push(current);
    });
    return modules;
  },

  // Construye módulos/submódulos a partir de un playlist simple
  seedFromPlaylist(masterId, playlist) {
    const grouped = AdminMasterEditPage.groupPlaylist(playlist);
    let order = 0;
    return grouped.map((g, i) => {
      order += 1;
      const modId = `module-${masterId}-${i+1}`;
      const submodules = (g.children || []).map((t, j) => ({ id: `sub-${masterId}-${i+1}-${j+1}`, title: t }));
      return { id: modId, masterId, title: g.title, description: '', order, videos: [], submodules, duration: '', active: true };
    });
  },

  // Playlists iniciales tomadas de MasterPlayerPage
  getSeedPlaylists() {
    return {
      'ebay-seller': [
        { title: '1. Introducción a eBay y su Ecosistema' },
        { title: '1.1 ¿Qué es eBay y cómo funciona?' },
        { title: '1.2 Tipos de cuentas y estructuras de tarifas' },
        { title: '1.3 Cómo funciona la venta internacional' },
        { title: '1.4 Reglas y políticas importantes' },
        { title: '2. Apertura y configuración de tu cuenta de vendedor.' },
        { title: '2.1 Crear tu cuenta paso a paso' },
        { title: '2.2 Configuración de pagos y Payoneer' },
        { title: '2.3 Definir políticas de envío y devoluciones' },
        { title: '2.4 Ajustes de impuestos y facturación' },
        { title: '2.5 Seguridad de la cuenta y verificación' },
        { title: '3. Investigación de productos y nichos rentables' },
        { title: '3.1 Cómo encontrar productos ganadores' },
        { title: '3.2 Analizando competencia y demanda' },
        { title: '3.3 Herramientas de investigación y estadísticas' },
        { title: '3.4 Productos trending vs evergreen' },
        { title: '3.5 eBay Dropshipping' },
        { title: '4. Creación de listados que venden' },
        { title: '4.1 Redacción de títulos irresistibles' },
        { title: '4.2 Fotografías profesionales y edición' },
        { title: '4.3 Descripciones optimizadas para SEO interno' },
        { title: '4.4 Plantillas y formatos de listado' },
        { title: '4.5 Estrategias de pricing y promociones' },
        { title: '4.6 Tips para listados internacionales' },
        { title: '5. Gestión de inventario y logística' },
        { title: '5.1 Cómo organizar y clasificar tu inventario' },
        { title: '5.2 Métodos de envío eficientes: nacional vs. internacional' },
        { title: '5.3 Gestión de devoluciones y reemplazos' },
        { title: '5.4 Integración de herramientas para gestión de stock' },
        { title: '6. Estrategias de Marketing en eBay' },
        { title: '6.1 Usando eBay Ads para promocionar tus productos' },
        { title: '6.2 Creación de ofertas y descuentos para atraer compradores' },
        { title: '6.3 Estrategias de cross-selling y bundle deals' },
        { title: '6.4 Cómo mejorar tu posicionamiento en los resultados de búsqueda' },
        { title: '6.5 Promociones específicas por temporada y eventos' },
        { title: '7. Atención al Cliente y Gestión de Reputación' },
        { title: '7.1 Cómo ofrecer un excelente servicio al cliente' },
        { title: '7.2 Responder preguntas y manejar quejas eficazmente' },
        { title: '7.3 Estrategias para recibir y gestionar feedback positivo' },
        { title: '7.4 Cómo evitar sanciones y mantener la cuenta en buen estado' },
        { title: '7.5 Solución de problemas comunes en las ventas' },
        { title: '8. Análisis de métricas y escalado de ventas' },
        { title: '8.1 Entendiendo tus KPIs' },
        { title: '8.2 Reportes de ventas y rendimiento' },
        { title: '8.3 Identificación de productos estrella' },
        { title: '8.4 Plan de escalado de la cuenta' },
        { title: '9. Extras y actualizaciones' }
      ],
      'meli-top-seller': [
        { title: '1. Introducción a MercadoLibre' },
        { title: '1.1 Qué es MercadoLibre y cómo funciona' },
        { title: '1.2 Tipos de cuentas y niveles de vendedor' },
        { title: '1.3 Comisiones, cargos y costos' },
        { title: '1.4 Reglas y políticas clave' },
        { title: '1.4 Errores comunes de los principiantes' },
        { title: '2. Creación y Configuración de la Cuenta.' },
        { title: '2.1 Apertura de cuenta paso a paso' },
        { title: '2.2 Configuración de Mercado Pago' },
        { title: '2.3 Datos fiscales y facturación' },
        { title: '2.4 Políticas de envíos y devoluciones' },
        { title: '2.5 Seguridad y protección de la cuenta' },
        { title: '3. Publicaciones que Destacan' },
        { title: '3.1 Investigación de productos y categorías' },
        { title: '3.2 Títulos optimizados y palabras clave' },
        { title: '3.3 Fotografías que cumplen políticas y convierten' },
        { title: '3.4 Descripciones claras y persuasivas' },
        { title: '3.5 Estrategias de precio dentro del marketplace' },
        { title: '4. Logística, Envíos e Inventario' },
        { title: '4.1 Mercado Envíos: funcionamiento y beneficios' },
        { title: '4.2 Gestión y control de inventario' },
        { title: '4.3 Preparación y despacho de pedidos' },
        { title: '4.4 Manejo de devoluciones y reclamos' },
        { title: '4.5 Optimización de tiempos de entrega' },
        { title: '5. Reputación y Atención al Cliente' },
        { title: '5.1 Cómo funciona el sistema de reputación' },
        { title: '5.2 Respuesta efectiva a preguntas' },
        { title: '5.3 Manejo de reclamos y mediaciones' },
        { title: '5.4 Estrategias para mantener calificaciones altas' },
        { title: '6. Crecimiento y Optimización' },
        { title: '6.1 Métricas clave dentro de MercadoLibre' },
        { title: '6.2 Mejora del posicionamiento en búsquedas' },
        { title: '6.3 Publicidad interna y promociones' },
        { title: '6.4 Escalado ordenado de la cuenta' },
        { title: '6.5 Organización profesional del negocio' },
        { title: '7. Extras y actualizaciones' }
      ],
      'shein-seller': [
        { title: '1. Introducción a Shein Marketplace' },
        { title: '1.1 Qué es Shein y cómo funciona su marketplace' },
        { title: '1.2 Oportunidades y requisitos para vendedores' },
        { title: '1.3 Comisiones, cargos y estructura de costos' },
        { title: '1.4 Políticas y estándares de calidad' },
        { title: '2. Configuración de Cuenta de Vendedor' },
        { title: '2.1 Registro y verificación paso a paso' },
        { title: '2.2 Configuración de métodos de pago' },
        { title: '2.3 Datos fiscales y documentación requerida' },
        { title: '2.4 Configuración de políticas de envío' },
        { title: '3. Gestión de Catálogo y Productos' },
        { title: '3.1 Investigación de tendencias y nichos rentables' },
        { title: '3.2 Creación de fichas de producto optimizadas' },
        { title: '3.3 Fotografía y contenido visual de alto impacto' },
        { title: '3.4 Descripciones persuasivas y SEO interno' },
        { title: '4. Estrategias de Precio y Márgenes' },
        { title: '4.1 Análisis competitivo de precios' },
        { title: '4.2 Cálculo de costos y márgenes reales' },
        { title: '4.3 Promociones y descuentos estratégicos' },
        { title: '4.4 Optimización de rentabilidad por producto' },
        { title: '5. Logística y Fulfillment' },
        { title: '5.1 Opciones de envío y fulfillment' },
        { title: '5.2 Gestión de inventario internacional' },
        { title: '5.3 Tiempos de entrega y tracking' },
        { title: '5.4 Manejo de devoluciones y cambios' },
        { title: '6. Atención al Cliente y Reputación' },
        { title: '6.1 Sistema de valoraciones y reviews' },
        { title: '6.2 Gestión efectiva de consultas' },
        { title: '6.3 Resolución de reclamos y disputas' },
        { title: '6.4 Construcción de reputación sólida' },
        { title: '7. Marketing y Posicionamiento' },
        { title: '7.1 Optimización para búsquedas internas' },
        { title: '7.2 Publicidad y promociones en Shein' },
        { title: '7.3 Estrategias de visibilidad y conversión' },
        { title: '7.4 Análisis de métricas y performance' },
        { title: '8. Escalado y Crecimiento' },
        { title: '8.1 Expansión de catálogo estratégica' },
        { title: '8.2 Automatización de procesos' },
        { title: '8.3 Diversificación de productos' },
        { title: '8.4 Planificación de crecimiento sostenible' }
      ],
      'trading-capital': [
        { title: '1. Fundamentos del mercado financiero' },
        { title: '1.1 Qué es realmente el mercado financiero' },
        { title: '1.2 Participantes del mercado (retail vs institucional)' },
        { title: '1.3 Tipos de mercado (Forex - indices - acciones - cripto)' },
        { title: '1.4 Horarios, sesiones y liquidez' },
        { title: '1.5 Mitos comunes del trading' },
        { title: '2. Estructura del mercado' },
        { title: '2.1 Tendencias, rango y transiciones' },
        { title: '2.2 Máximos y mínimos relevantes' },
        { title: '2.3 Estructura alcista vs bajista' },
        { title: '2.4 Rupturas reales vs falsas' },
        { title: '2.5 Contexto antes de operar' },
        { title: '3. Oferta, demanda y liquidez' },
        { title: '3.1 Qué es liquidez y por qué mueve el mercado' },
        { title: '3.2 Zonas de oferta y demanda' },
        { title: '3.3 Barridos de liquidez' },
        { title: '3.4 Trampas del mercado' },
        { title: '3.5 Confirmaciones válidas' },
        { title: '4. Análisis técnico funcional' },
        { title: '4.1 Soportes y resistencias bien trazados.' },
        { title: '4.2 Timeframes y su función' },
        { title: '4.3 Confluencias técnicas' },
        { title: '4.4 Errores comunes en el análisis técnico' },
        { title: '4.5 Limpieza del tráfico (menos es más)' },
        { title: '5. Herramientas de operativa' },
        { title: '5.1 Indicadores: Cuándo sí y cuándo no' },
        { title: '5.2 Medias móviles y su uso correctivo' },
        { title: '5.3 RSI, MACD y osciladores (uso práctico)' },
        { title: '5.4 Price action aplicado' },
        { title: '5.5 Configuración ideal del gráfico' },
        { title: '6. Estrategias de entrada' },
        { title: '6.1 Tipos de entrada (anticipada vs confirmada)' },
        { title: '6.2 Entradas en tendencia' },
        { title: '6.3 Entradas en rango' }
      ],
      'cripto-arbitrage': [
        { title: '1. Fundamentos del cripto arbitraje' },
        { title: '1.1 Qué es el arbitraje y qué NO es' },
        { title: '1.2 Tipos de arbitraje en cripto' },
        { title: '1.3 Por qué existen ineficiencias de precio' },
        { title: '1.4 Riesgos reales del arbitraje' },
        { title: '1.5 Expectativas realistas de rentabilidad' },
        { title: '2. Exchanges, pares y estructuras de mercado' },
        { title: '2.1 Funcionamiento de los exchanges centralizados' },
        { title: '2.2 Liquidez, profundidad de mercados y spreads' },
        { title: '2.3 Pares de trading y monedas puente' },
        { title: '2.4 Comisiones, fees ocultos y costos reales' },
        { title: '2.4 Tiempos de depósito y retiro' },
        { title: '3. Tipos de arbitraje y estrategias' },
        { title: '3.1 Arbitraje simple entre exchanges' },
        { title: '3.2 Arbitraje triangular' },
        { title: '3.3 Arbitraje entre pares spot' },
        { title: '3.4 Arbitraje con stablecoins' },
        { title: '3.5 Ventajas y limitaciones de cada estrategia' },
        { title: '4. Ejecución, velocidad y gestión del riesgo' },
        { title: '4.1 Timing y sincronización de operaciones' },
        { title: '4.2 Slippage y cómo reducirlo' },
        { title: '4.3 Gestión de capital aplicada al arbitraje' },
        { title: '4.4 Control de riesgo operativo' },
        { title: '4.5 Errores comunes en la operación' },
        { title: '5. Automatización, herramientas y escalado' },
        { title: '5.1 Herramientas para detectar arbitrajes' },
        { title: '5.2 Uso responsable de software y bots' },
        { title: '5.3 Automatización parcial vs total' },
        { title: '5.4 Escalado progresivo de capital' },
        { title: '5.5 Medición de resultados y optimización' },
        { title: '6. Mentalidad y profesionalización' },
        { title: '6.1 Disciplina y control emocional' },
        { title: '6.2 Gestión de expectativas' },
        { title: '6.3 Consistencia vs oportunidades aisladas' },
        { title: '6.4 Registro y análisis de operaciones' },
        { title: '6.5 Sostenibilidad a largo plazo' },
        { title: '7. Extras y actualizaciones' }
      ],
      'gestion-empresarial': [
        { title: '1. Visión Integral de la Empresa.' },
        { title: '1.1 La empresa como sistema organizacional' },
        { title: '1.2 Relación entre operación, gestión y dirección' },
        { title: '1.3 Objetivos empresariales y alineación estratégica' },
        { title: '1.4 Ciclos de planificación y control' },
        { title: '2. Estructura Organizacional y Roles.' },
        { title: '2.1 Diseño de estructuras organizativas' },
        { title: '2.2 Definición de funciones y responsabilidades' },
        { title: '2.3 Coordinación entre áreas' },
        { title: '2.4 Delegación y niveles de autoridad' },
        { title: '3. Gestión de Procesos Operativos' },
        { title: '3.1 Identificación y mapeo de procesos' },
        { title: '3.2 Estandarización y documentación' },
        { title: '3.3 Indicadores operativos (KPIs)' },
        { title: '3.4 Mejora continua y eficiencia operativa' },
        { title: '3.5 Control de calidad y desempeño' },
        { title: '4. Gestión Administrativa y Financiera' },
        { title: '4.1 Principios de administración empresarial' },
        { title: '4.2 Control presupuestal y flujo de caja' },
        { title: '4.3 Análisis financiero para directivos' },
        { title: '4.4 Toma de decisiones basada en información financiera' },
        { title: '5. Dirección Estratégica' },
        { title: '5.1 Planeación estratégica empresarial' },
        { title: '5.2 Análisis del entorno y del negocio' },
        { title: '5.3 Definición de objetivos estratégicos' },
        { title: '5.4 Seguimiento y ajuste de la estrategia' },
        { title: '6. Gestión del Talento y Liderazgo.' },
        { title: '6.1 Gestión del talento humano' },
        { title: '6.2 Liderazgo organizacional' },
        { title: '6.3 Comunicación interna efectiva' },
        { title: '6.4 Evaluación del desempeño' },
        { title: '6.5 Cultura organizacional' },
        { title: '7. Control, Indicadores y Toma de Decisiones' },
        { title: '7.1 Sistemas de control de gestión' },
        { title: '7.2 Cuadros de mando e indicadores clave' },
        { title: '7.3 Análisis de resultados' },
        { title: '7.4 Toma de decisiones directivas' }
      ],
      'vida-proposito': [
        { title: '1. Fundamentos del matrimonio con propósito' },
        { title: '1.1 El matrimonio como proyecto de vida' },
        { title: '1.2 Principios y valores que sostienen el hogar' },
        { title: '1.3 Compromiso, respeto y unidad' },
        { title: '1.4 Construcción de una visión común' },
        { title: '2. Comunicación y convivencia en el hogar' },
        { title: '2.1 Comunicación consciente y empática' },
        { title: '2.2 Manejo de conflictos y desacuerdos' },
        { title: '2.3 Escucha activa y acuerdos saludables' },
        { title: '2.4 Fortalecimiento del vínculo emocional' },
        { title: '3. Crianza y formación de los hijos' },
        { title: '3.1 Rol de los padres en la formación integral' },
        { title: '3.2 Disciplina con amor y límites sanos' },
        { title: '3.3 Ejemplo, valores y acompañamiento' },
        { title: '3.4 Construcción de confianza y seguridad emocional' },
        { title: '3.5 Crianza guiada por principios' },
        { title: '4. Vida espiritual y dirección familiar' },
        { title: '4.1 La fe como el fundamento del hogar.' },
        { title: '4.2 Caminar juntos en propósito' },
        { title: '4.3 Oración y reflexión en familia' },
        { title: '4.4 Decisiones familiares con dirección espiritual' },
        { title: '5. Crecimiento, restauración y proyección familiar' },
        { title: '5.1 Sanar heridas y fortalecer relaciones' },
        { title: '5.2 Restauración del vinculo matrimonial' },
        { title: '5.3 Construcción de un hogar resiliente' },
        { title: '5.4 Proyección familiar y legado' },
        { title: '6. Identidad, roles y responsabilidad en familia' },
        { title: '6.1 Identidad personal y matrimonial' },
        { title: '6.2 Roles dentro del hogar' },
        { title: '6.3 Responsabilidad y corresponsabilidad familiar' },
        { title: '6.4 Equilibrio entre pareja, familia y vida personal' },
        { title: '6.5 Manejo de finanzas familiares' },
        { title: '7. Matrimonio ejemplar y testimonio familiar' },
        { title: '7.1 El hogar como ejemplo para otros' },
        { title: '7.2 Matrimonio consciente y coherente' },
        { title: '7.3 Influencia positiva en el entorno' },
        { title: '7.4 Construcción de un testimonio familiar con propósito' },
        { title: '8. Extras y actualizaciones' }
      ],
      'social-media': [
        { title: '1. Fundamentos de Social Media' },
        { title: '1.1 Ecosistema digital y redes sociales principales' },
        { title: '1.2 Algoritmos y cómo funcionan las plataformas' },
        { title: '1.3 Psicología del usuario en redes sociales' },
        { title: '1.4 Tendencias actuales y futuras' },
        { title: '2. Estrategia de Contenido' },
        { title: '2.1 Definición de objetivos y audiencia' },
        { title: '2.2 Creación de calendario editorial' },
        { title: '2.3 Tipos de contenido según plataforma' },
        { title: '2.4 Storytelling y narrativa visual' },
        { title: '2.5 Copywriting para redes sociales' },
        { title: '3. Producción de Contenido' },
        { title: '3.1 Fotografía y video para redes sociales' },
        { title: '3.2 Herramientas de diseño y edición' },
        { title: '3.3 Creación de contenido viral' },
        { title: '3.4 Reels, Stories, TikToks y formatos emergentes' },
        { title: '4. Community Management' },
        { title: '4.1 Construcción y gestión de comunidades' },
        { title: '4.2 Engagement y interacción estratégica' },
        { title: '4.3 Manejo de crisis y comentarios negativos' },
        { title: '4.4 Moderación y protocolos de respuesta' },
        { title: '5. Publicidad en Redes Sociales' },
        { title: '5.1 Meta Ads (Facebook e Instagram)' },
        { title: '5.2 TikTok Ads y campañas virales' },
        { title: '5.3 LinkedIn Ads para B2B' },
        { title: '5.4 YouTube Ads y estrategia de video' },
        { title: '5.5 Optimización de presupuesto y ROAS' },
        { title: '6. Analítica y Métricas' },
        { title: '6.1 KPIs esenciales por plataforma' },
        { title: '6.2 Herramientas de analítica avanzada' },
        { title: '6.3 Interpretación de datos y reportes' },
        { title: '6.4 A/B testing y optimización continua' },
        { title: '7. Monetización y Crecimiento' },
        { title: '7.1 Modelos de monetización en redes sociales' },
        { title: '7.2 Marketing de influencers y colaboraciones' },
        { title: '7.3 Estrategias de crecimiento orgánico' },
        { title: '7.4 Escalado de cuentas y marcas personales' },
        { title: '8. Gestión Profesional' },
        { title: '8.1 Herramientas de gestión y automatización' },
        { title: '8.2 Trabajo con clientes y agencias' },
        { title: '8.3 Propuestas comerciales y cotizaciones' },
        { title: '8.4 Construcción de portafolio profesional' }
      ]
    };
  },
  init(masterId) {
    console.log('INIT AdminMasterEditPage', masterId);
    try {
      const backBtn = document.querySelector('.mp-back');
      if (backBtn) backBtn.addEventListener('click', () => Router.navigate('/admin/masters'));
    } catch (e) {}
    (async function(){
      try {
        const token = localStorage.getItem('mwi:token');
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const id = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
        const resp = await fetch(base + '/admin/masters/' + encodeURIComponent(id), { headers: { Authorization: 'Bearer ' + token } });
        if (!resp.ok) { throw new Error('Master no encontrado'); }
        const data = await resp.json();
        const master = (data && (data.items || (data.master && data.master.items))) ? (data.master || data) : null;
        console.log('MASTER RECIBIDO:', master);
        console.log('ITEMS:', master?.items);
        if (!master) { throw new Error('Master inválido'); }
        try {
          const t = document.getElementById('create-master-title'); if (t) t.value = master.title || '';
          const s = document.getElementById('create-master-mentor'); if (s) s.value = (master.mentorSlug || (Array.isArray(master.mentorSlugs) ? master.mentorSlugs[0] : '') || '');
          const cover = master.thumbnail || null;
          if (cover) {
          }
        } catch(e) {}
        const items = Array.isArray(master.items) ? master.items : [];
        try {
          const container = document.getElementById('mp-modules-list');
          if (!container) return;
          container.innerHTML = '';
          const modulesArr = items.map(function(m, idx){ return { mod: m, itemIndex: idx }; })
            .sort(function(a,b){ return (a.mod.order||0) - (b.mod.order||0); });
          modulesArr.forEach(function(entry){
            const mod = entry.mod;
            const itemIndex = entry.itemIndex;
            const moduleEl = document.createElement('div');
            moduleEl.className = 'mp-module-item';
            moduleEl.innerHTML = '\n              <div style="display:flex; align-items:center; gap:8px;">\n                <button class="mp-module-toggle" style="flex:1;">\n                  <span class="chev">›</span>\n                  ' + (mod.title||'') + '\n                </button>\n                <div class="mp-module-actions" style="display:flex; gap:8px;">\n                  <button class="btn btn-small">Editar</button>\n                  <button class="btn btn-small">Eliminar</button>\n                </div>\n              </div>\n              <div class="mp-edit-panel" style="display:none; margin-top:8px; border:1px dashed rgba(212,169,85,.35); border-radius:8px; background:rgba(0,0,0,.20); padding:10px;">\n                <input class="mp-edit-title" type="text" value="' + (mod.title||'') + '" style="padding:8px 10px; border-radius:8px; border:1px solid rgba(212,169,85,.22); background:#141212; color:#efe6d6; width:100%;" />\n              </div>\n              <div class="mp-sublist" style="display:none;"></div>\n            ';
            const toggle = moduleEl.querySelector('.mp-module-toggle');
            const sublist = moduleEl.querySelector('.mp-sublist');
            const actions = moduleEl.querySelector('.mp-module-actions');
            const editBtn = actions && actions.querySelector('.btn.btn-small:nth-child(1)');
            const delBtn = actions && actions.querySelector('.btn.btn-small:nth-child(2)');
            const editPanel = moduleEl.querySelector('.mp-edit-panel');
            // Prepare module edit panel with Save/Cancel
            if (editPanel) {
              const controls = document.createElement('div');
              controls.style.display = 'flex';
              controls.style.gap = '8px';
              controls.style.marginTop = '8px';
              controls.innerHTML = '<button class="btn btn-small btn-primary" type="button">Guardar</button><button class="btn btn-small" type="button">Cancelar</button>';
              editPanel.appendChild(controls);
            }
            toggle.addEventListener('click', function(){ sublist.style.display = (sublist.style.display === 'none' ? 'block' : 'none'); });
            if (editBtn && editPanel) {
              editBtn.addEventListener('click', function(){
                editPanel.style.display = (editPanel.style.display === 'none' ? 'block' : 'none');
              });
              const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
              const slug = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
              const token = localStorage.getItem('mwi:token');
              const saveBtn = editPanel.querySelector('.btn.btn-small.btn-primary');
              const cancelBtn = editPanel.querySelector('.btn.btn-small:not(.btn-primary)');
              const titleInput = editPanel.querySelector('.mp-edit-title');
              if (saveBtn) {
                saveBtn.addEventListener('click', async function(){
                  const newTitle = (titleInput && titleInput.value || '').trim();
                  if (!newTitle) { try { Utils.showPopupError('Título requerido'); } catch {} return; }
                  try {
                    const resp = await fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items/${itemIndex}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? ('Bearer ' + token) : undefined
                      },
                      body: JSON.stringify({ title: newTitle })
                    });
                    if (!resp.ok) throw new Error('Error actualizando módulo');
                    editPanel.style.display = 'none';
                    try { Utils.showToast && Utils.showToast('Módulo actualizado'); } catch {}
                    Router.navigate(`/admin/masters/${slug}`);
                  } catch (e) {
                    console.error(e);
                    try { Utils.showPopupError && Utils.showPopupError('No se pudo actualizar el módulo'); } catch {}
                  }
                });
              }
              if (cancelBtn) {
                cancelBtn.addEventListener('click', function(){ editPanel.style.display = 'none'; });
              }
            }
            if (delBtn) {
              delBtn.addEventListener('click', function(){
                const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
                const slug = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
                const token = localStorage.getItem('mwi:token');
                const confirmDelete = typeof Utils !== 'undefined' && Utils.confirm ? Utils.confirm('¿Eliminar módulo?') : confirm('¿Eliminar módulo?');
                if (!confirmDelete) return;
                fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items/${itemIndex}`, {
                  method: 'DELETE',
                  headers: { 'Authorization': token ? ('Bearer ' + token) : undefined }
                }).then(function(resp){
                  if (!resp.ok) throw new Error('Error eliminando módulo');
                  try { Utils.showToast && Utils.showToast('Módulo eliminado'); } catch {}
                  Router.navigate(`/admin/masters/${slug}`);
                }).catch(function(e){
                  console.error(e);
                  try { Utils.showPopupError && Utils.showPopupError('No se pudo eliminar el módulo'); } catch {}
                });
              });
            }
            const lessonsArr = (Array.isArray(mod.lessons)?mod.lessons:[]).map(function(ls, lidx){ return { lesson: ls, lessonIndex: lidx }; })
              .sort(function(a,b){ return (a.lesson.order||0) - (b.lesson.order||0); });
            lessonsArr.forEach(function(lentry, idx){
              const lesson = lentry.lesson;
              const lessonIndex = lentry.lessonIndex;
              const sub = document.createElement('div');
              sub.className = 'mp-subitem';
              sub.innerHTML = '\n                <div class="num">' + (idx+1) + '</div>\n                <div class="txt">' + (lesson.title||'') + '</div>\n                <div class="mp-sub-actions" style="margin-left:auto; display:flex; gap:8px;">\n                  <button class="btn btn-small" type="button">Editar</button>\n                  <button class="btn btn-small" type="button">Eliminar</button>\n                </div>\n              ';
              // Click en el texto o número reproduce
              const play = function(){
                const titleEl = document.getElementById('mp-left-title'); if (titleEl) titleEl.textContent = lesson.title || '';
                const iframe = document.getElementById('mp-left-iframe');
                const url = lesson.videoUrl ? lesson.videoUrl : 'https://player.vimeo.com/video/76979871';
                if (iframe) iframe.src = url;
              };
              (sub.querySelector('.num')||sub).addEventListener('click', play);
              (sub.querySelector('.txt')||sub).addEventListener('click', play);
              // Acciones de submódulo
              const subActions = sub.querySelector('.mp-sub-actions');
              const subEdit = subActions && subActions.querySelector('.btn.btn-small:nth-child(1)');
              const subDel = subActions && subActions.querySelector('.btn.btn-small:nth-child(2)');
              if (subEdit) {
                subEdit.addEventListener('click', function(){
                  // Crear panel de edición inline bajo el submódulo
                  let editRow = sub.nextElementSibling;
                  const isEditRow = editRow && editRow.classList && editRow.classList.contains('mp-sub-edit');
                  if (!isEditRow) {
                    editRow = document.createElement('div');
                    editRow.className = 'mp-sub-edit';
                    editRow.style.margin = '6px 0 0 28px';
                    editRow.innerHTML = '\n                      <div class="mp-add-sm">\n                        <input class="mp-sub-edit-title" type="text" placeholder="Nombre" />\n                        <input class="mp-sub-edit-url" type="text" placeholder="Link del video" />\n                        <div style="display:flex; gap:8px;">\n                          <button class="btn btn-small btn-primary" type="button">Guardar</button>\n                          <button class="btn btn-small" type="button">Cancelar</button>\n                        </div>\n                      </div>\n                    ';
                    sub.parentNode.insertBefore(editRow, sub.nextSibling);
                  }
                  const titleInput = editRow.querySelector('.mp-sub-edit-title');
                  const urlInput = editRow.querySelector('.mp-sub-edit-url');
                  const saveBtn = editRow.querySelector('.btn.btn-small.btn-primary');
                  const cancelBtn = editRow.querySelector('.btn.btn-small:not(.btn-primary)');
                  if (titleInput) titleInput.value = lesson.title || '';
                  if (urlInput) urlInput.value = lesson.videoUrl || '';
                      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
                      const slug = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
                      const token = localStorage.getItem('mwi:token');
                  saveBtn.onclick = async function(){
                    const newTitle = (titleInput && titleInput.value || '').trim();
                    const newUrl = (urlInput && urlInput.value || '').trim();
                    if (!newTitle) { try { Utils.showPopupError('Nombre requerido'); } catch {} return; }
                    try {
                      const resp = await fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items/${itemIndex}/lessons/${lessonIndex}` , {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': token ? ('Bearer ' + token) : undefined
                        },
                        body: JSON.stringify({ title: newTitle, videoUrl: newUrl })
                      });
                      if (!resp.ok) throw new Error('Error actualizando submódulo');
                      // Actualizar UI local
                      lesson.title = newTitle;
                      lesson.videoUrl = newUrl;
                      const titleEl = sub.querySelector('.txt'); if (titleEl) titleEl.textContent = newTitle;
                      editRow.remove();
                      try { Utils.showPopup && Utils.showPopup('Submódulo actualizado', 'Éxito'); } catch {}
                    } catch (e) {
                      console.error(e);
                      try { Utils.showPopupError && Utils.showPopupError('No se pudo actualizar'); } catch {}
                    }
                  };
                  cancelBtn.onclick = function(){ editRow.remove(); };
                });
              }
              if (subDel) {
                subDel.addEventListener('click', function(){
                  const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
                  const slug = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
                  const token = localStorage.getItem('mwi:token');
                  const ok = (typeof Utils !== 'undefined' && Utils.confirm) ? Utils.confirm('¿Eliminar submódulo?') : confirm('¿Eliminar submódulo?');
                  if (!ok) return;
                  fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items/${itemIndex}/lessons/${lessonIndex}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': token ? ('Bearer ' + token) : undefined }
                  }).then(function(resp){
                    if (!resp.ok) throw new Error('Error eliminando submódulo');
                    try { Utils.showToast && Utils.showToast('Submódulo eliminado'); } catch {}
                    Router.navigate(`/admin/masters/${slug}`);
                  }).catch(function(e){
                    console.error(e);
                    try { Utils.showPopupError && Utils.showPopupError('No se pudo eliminar el submódulo'); } catch {}
                  });
                });
              }
              sublist.appendChild(sub);
            });
            // Fila para añadir submódulo al final de la lista
            const addRow = document.createElement('div');
            addRow.className = 'mp-add-sm';
            addRow.style.marginTop = '8px';
            addRow.innerHTML = '\n              <input class="mp-sub-title" type="text" placeholder="Nombre del submódulo" />\n              <input class="mp-sub-url" type="text" placeholder="Link del video" />\n              <button class="btn btn-small btn-primary" type="button">Añadir submódulo</button>\n            ';
            const addBtn = addRow.querySelector('button');
            addBtn.addEventListener('click', function(){
              const titleInput = addRow.querySelector('.mp-sub-title');
              const urlInput = addRow.querySelector('.mp-sub-url');
              const newTitle = (titleInput && titleInput.value || '').trim();
              const newUrl = (urlInput && urlInput.value || '').trim();
              if (!newTitle) { try { Utils.showPopupError('Nombre requerido'); } catch {} return; }
              const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
              const slug = (typeof masterId === 'string' && masterId) || Router.currentRoute.split('/').pop();
              const token = localStorage.getItem('mwi:token');
              fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items/${itemIndex}/lessons`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? ('Bearer ' + token) : undefined
                },
                body: JSON.stringify({ title: newTitle, videoUrl: newUrl })
              }).then(function(resp){
                if (!resp.ok) throw new Error('Error añadiendo submódulo');
                try { Utils.showToast && Utils.showToast('Submódulo añadido'); } catch {}
                titleInput && (titleInput.value = '');
                urlInput && (urlInput.value = '');
                Router.navigate(`/admin/masters/${slug}`);
              }).catch(function(e){
                console.error(e);
                try { Utils.showPopupError && Utils.showPopupError('No se pudo añadir el submódulo'); } catch {}
              });
            });
            sublist.appendChild(addRow);
            container.appendChild(moduleEl);
          });
        } catch(e) { console.error('Error cargando contenidos', e); }
        // Cargar mentores en el selector
        try {
          const selected = master.mentorSlug || (Array.isArray(master.mentorSlugs) ? master.mentorSlugs[0] : '');
          await (async function loadMentorsSelect(selectedMentorSlug){
            const select = document.getElementById('create-master-mentor');
            if (!select) return;
            select.innerHTML = '<option value="">Cargando mentores...</option>';
            try {
              const token = localStorage.getItem('mwi:token');
              const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
              const res = await fetch(`${base}/admin/mentors`, { headers: { Authorization: token ? ('Bearer ' + token) : undefined } });
              const data = await res.json();
              const mentors = Array.isArray(data.mentors) ? data.mentors : [];
              if (!mentors.length) { select.innerHTML = '<option value="">— Sin mentores registrados —</option>'; return; }
              select.innerHTML = '<option value="">Selecciona mentor</option>';
              mentors.forEach(function(m){
                const opt = document.createElement('option');
                opt.value = m.slug;
                opt.textContent = m.name || m.slug;
                if (selectedMentorSlug && m.slug === selectedMentorSlug) opt.selected = true;
                select.appendChild(opt);
              });
            } catch(err) {
              console.error('Error cargando mentores', err);
              select.innerHTML = '<option value="">Error cargando mentores</option>';
            }
          })(selected);
        } catch(e) {}
        try { window.AdminMasterCreate_currentMasterId = id; } catch {}
      } catch(err) {
        console.error(err);
        try { Utils.showError('Master no encontrado'); } catch(_e) {}
        try { Router.navigate('/admin/masters'); } catch(_e2) {}
      }
    })();
  },

  // API helper
  api(path, method, body) {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const token = localStorage.getItem('mwi:token');
    return fetch(base + path, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? ('Bearer ' + token) : undefined
      },
      body: body ? JSON.stringify(body) : undefined
    });
  },
  
  // Modal simple reutilizando helpers del create
  
  openEditor(moduleId) {
    try { const cur = document.getElementById('am-modal'); if (cur) cur.remove(); } catch {}
    const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return Utils.showPopupError('Módulo no encontrado');
    const subs = Array.isArray(mod.submodules) ? mod.submodules : [];
    const modal = document.createElement('div');
    modal.id = 'am-modal';
    modal.className = 'am-modal';
    modal.innerHTML = `
      <div class="overlay" data-close="true"></div>
      <div class="box" role="dialog" aria-modal="true">
        <header>
          <h3>Editar módulo</h3>
          <button aria-label="Cerrar" data-close="true">×</button>
        </header>
        <div class="row">
          <input id="mod-title-${moduleId}" value="${mod.title}" placeholder="Nuevo título del módulo" />
          <button class="btn" onclick="AdminMasterEditPage.saveTitle('${moduleId}')">Guardar título</button>
        </div>
        <div class="row">
          <input id="sub-title-${moduleId}" placeholder="Título del submódulo" />
          <button class="btn" onclick="AdminMasterEditPage.addSubmodule('${moduleId}')">Agregar submódulo</button>
        </div>
        ${subs.length ? `<ul class="submodules">${subs.map(sm => `<li>${sm.title}</li>`).join('')}</ul>` : ''}
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { AdminMasterEditPage.closeEditor(); } });
  },

  closeEditor() { try { const cur = document.getElementById('am-modal'); if (cur) cur.remove(); } catch {} },

  saveTitle(moduleId) {
    const input = document.getElementById(`mod-title-${moduleId}`);
    const title = input?.value.trim();
    if (!title) return Utils.showPopupError('Título requerido');
    const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
    const idx = modules.findIndex(m => m.id === moduleId);
    if (idx === -1) return Utils.showPopupError('Módulo no encontrado');
    modules[idx].title = title;
    StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
    try { const mid = modules[idx].masterId; window.dispatchEvent(new CustomEvent('mwi:masters:updated', { detail: { masterId: mid } })); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', masterId: mid, at: Date.now() })); } catch {}
    Utils.showSuccess('Título actualizado');
    AdminMasterEditPage.closeEditor();
    Router.reload();
  },

  addSubmodule(moduleId) {
    const input = document.getElementById(`sub-title-${moduleId}`);
    const title = input?.value.trim();
    if (!title) return Utils.showPopupError('Título de submódulo requerido');
    const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return Utils.showPopupError('Módulo no encontrado');
    mod.submodules = Array.isArray(mod.submodules) ? mod.submodules : [];
    mod.submodules.push({ id: `sub-${Date.now()}`, title });
    StorageManager.set(StorageManager.KEYS.MODULES_DB, modules);
    try { const mid = mod.masterId; window.dispatchEvent(new CustomEvent('mwi:masters:updated', { detail: { masterId: mid } })); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', masterId: mid, at: Date.now() })); } catch {}
    Utils.showSuccess('Submódulo agregado');
    AdminMasterEditPage.closeEditor();
    Router.reload();
  },

  seedAmazonModules(masterId) {
    const def = [
      { n: 1, title: 'Apertura de cuentas', subs: ['Tipos de cuenta, que vas a necesitar y consideraciones importantes', 'Sigue estos pasos'] },
      { n: 2, title: 'Define tu modelo de negocio: Retail arbitrage - Wholesale - Brand Boosting', subs: ['Retail arbitrage', 'Wholesale', 'Brand boosting'] },
      { n: 3, title: 'Define tu modo de operar - logística, FBM - FBA', subs: ['FBM', 'FBA'] },
      { n: 4, title: 'Seguridad y bloqueos', subs: ['No pierdas tiempo, evítate problemas futuros.'] },
      { n: 5, title: 'Retail arbitrage', subs: ['Cómo encontrar productos', 'Cómo encontrar proveedores', 'OJO, antes de comprar y abastecerte, HAZ ESTO', 'Seguimiento de ventas'] },
      { n: 6, title: 'Wholesale', subs: ['Cómo encontrar productos', 'Cómo encontrar proveedores', 'OJO, antes de comprar y abastecerte, HAZ ESTO', 'Seguimiento de ventas'] },
      { n: 7, title: 'Brand Boosting', subs: ['Nichos, define qué vas a vender', 'Registro de marca USPTO', 'Amazon Brand Registry accelerator program', 'GTIN para tus productos', 'A+ content', 'Diseña tu tienda', 'Impulsa tu marca'] },
      { n: 8, title: 'Gestión de envíos y devoluciones', subs: ['Cómo enviar tus productos a las bodegas siendo FBA', 'Cómo enviar tus productos a los clientes siendo FBM', 'Tipos de devoluciones', 'Inventario extraviado (FBA)', 'Cómo retirar tu inventario (FBA)'] },
      { n: 9, title: 'Account health & performance notification', subs: ['Definiciones'] },
      { n: 10, title: 'Payments & business reports', subs: ['Pagos', 'Reportes financieros para tu negocio'] },
      { n: 11, title: 'Cómo reportar algún error, solicitar documentos o pedir ayuda en el seller', subs: ['Botón AYUDA'] },
      { n: 12, title: 'Cuentas bloqueadas', subs: ['Qué hiciste', 'Plan de acción'] },
      { n: 13, title: 'Extras y actualizaciones', subs: [] }
    ];
    return def.map((d) => ({ id: `module-amazon-${d.n}`, masterId, title: `${d.n}. ${d.title}`, description: '', order: d.n, videos: [], submodules: d.subs.map((s, i) => ({ id: `sub-amazon-${d.n}-${i+1}`, title: s })), duration: '', active: true }));
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminMasterEditPage;
}

// Edit-specific global handlers
try {
  if (typeof window !== 'undefined') {
    window.AdminMasterCreate_addModule = function() {
      try {
        const titleEl = document.getElementById('create-module-title');
        const title = (titleEl && titleEl.value || '').trim();
        if (!title) { try { Utils.showPopupError && Utils.showPopupError('Título requerido'); } catch {} return; }
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const token = localStorage.getItem('mwi:token');
        const slug = (Router.currentRoute && Router.currentRoute.split('/').pop()) || window.AdminMasterCreate_currentMasterId;
        fetch(`${base}/admin/masters/${encodeURIComponent(slug)}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': token ? ('Bearer ' + token) : undefined },
          body: JSON.stringify({ title })
        }).then(function(resp){
          if (!resp.ok) throw new Error('Error añadiendo módulo');
          titleEl && (titleEl.value = '');
          try { Utils.showToast && Utils.showToast('Módulo añadido'); } catch {}
          Router.navigate(`/admin/masters/${slug}`);
        }).catch(function(e){
          console.error(e);
          try { Utils.showPopupError && Utils.showPopupError('No se pudo añadir el módulo'); } catch {}
        });
      } catch (e) {}
    };
    window.AdminMasterEdit_saveMaster = function(masterId) {
      const titleEl = document.getElementById('create-master-title');
      const mentorEl = document.getElementById('create-master-mentor');
      const title = (titleEl?.value || '').trim();
      const mentor = (mentorEl?.value || '').trim();
      if (!title) return Utils.showPopupError('Título del master requerido');
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token');
      fetch(`${base}/admin/masters/${encodeURIComponent(masterId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': token ? ('Bearer ' + token) : undefined },
        body: JSON.stringify({ title, shortTitle: title, mentorSlug: mentor || '' })
      }).then(function(resp){
        if (!resp.ok) throw new Error('Error guardando master');
        try { Utils.showSuccess && Utils.showSuccess('Master guardado'); } catch {}
      }).catch(function(e){
        console.error(e);
        try { Utils.showPopupError && Utils.showPopupError('No se pudo guardar el master'); } catch {}
      });
    };
    window.AdminMasterEdit_deleteMasterPrompt = function(masterId) {
      const html = `
        <div style="padding:22px; color:#efe6d6;">
          <h3 style="margin:0 0 8px; color:#f6e9c9;">Confirmar eliminación</h3>
          <p style="margin:0 0 14px; color:#cdbb9a;">¿Seguro que quieres eliminar este master?</p>
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button class="btn" onclick="closeAuthModal()">No</button>
            <button class="btn btn-primary" onclick="AdminMasterEdit_deleteMaster('${masterId}')">Sí</button>
          </div>
        </div>`;
      try { window.openAuthModal(html); } catch { Utils.showPopup('¿Seguro que quieres eliminar este master?', 'Eliminar master'); }
    };
    window.AdminMasterEdit_deleteMaster = async function(masterId) {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token') || '';
      try {
        const resp = await fetch(`${base}/admin/masters/${encodeURIComponent(masterId)}`, {
          method: 'DELETE',
          headers: { Authorization: token ? ('Bearer ' + token) : undefined }
        });
        const data = await resp.json().catch(()=>({}));
        if (!resp.ok) throw new Error(data && data.message ? data.message : 'Error eliminando master');
        // Limpiar caches locales para mantener coherencia de la UI
        const masters = StorageManager.get(StorageManager.KEYS.MASTERS_DB) || [];
        StorageManager.set(StorageManager.KEYS.MASTERS_DB, masters.filter(m => m.id !== masterId));
        const modules = StorageManager.get(StorageManager.KEYS.MODULES_DB) || [];
        const toDelete = modules.filter(m => m.masterId === masterId).map(m => m.id);
        StorageManager.set(StorageManager.KEYS.MODULES_DB, modules.filter(m => m.masterId !== masterId));
        const videos = StorageManager.get(StorageManager.KEYS.VIDEOS_DB) || [];
        StorageManager.set(StorageManager.KEYS.VIDEOS_DB, videos.filter(v => !toDelete.includes(v.moduleId)));
        try { closeAuthModal(); } catch {}
        try { window.dispatchEvent(new CustomEvent('mwi:masters:updated', { detail: { masterId } })); localStorage.setItem('mwi:evt', JSON.stringify({ t:'masters-updated', masterId, at: Date.now() })); } catch {}
        Utils.showSuccess('Master eliminado de MongoDB');
        Router.navigate('/admin/masters');
      } catch (err) {
        console.error('Eliminar master (edit) error:', err);
        Utils.showPopupError('No se pudo eliminar el master');
      }
    };
    window.AdminMasterEdit_uploadCover = async function(masterId) {
      if (!masterId) return Utils.showPopupError('Master inválido');
      try {
        const raw = prompt('Pega la URL de la imagen (http/https)');
        if (raw === null) return; // cancelado
        const fileUrl = String(raw || '').trim();
        if (!/^https?:\/\//i.test(fileUrl)) {
          return Utils.showPopupError('URL inválida. Debe empezar por http(s)');
        }
        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        const token = localStorage.getItem('mwi:token');
        const resp2 = await fetch(`${base}/admin/masters/${encodeURIComponent(masterId)}/cover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': token ? ('Bearer ' + token) : undefined },
          body: JSON.stringify({ fileUrl })
        });
        const data = await resp2.json().catch(()=>({}));
        if (!resp2.ok) throw new Error(data && data.message ? data.message : 'Error actualizando portada');
        try { Utils.showSuccess && Utils.showSuccess('Portada actualizada'); } catch {}
      } catch (err) {
        console.error('Actualizar portada (URL) error:', err);
        Utils.showPopupError('No se pudo actualizar la portada');
      }
    };
    window.AdminMasterEdit_previewMaster = function(masterId) {
      if (!masterId) return;
      try {
        // Navegar al player público con bypass de redirección para admins
        Router.navigate(`/master-player/${masterId}?noredirect=1`);
      } catch (e) {
        try { window.location.hash = `#/master-player/${masterId}?noredirect=1`; } catch (_) {}
      }
    };
  }
} catch (e) {}

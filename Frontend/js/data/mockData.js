/**
 * MODERN WEALTH INSTITUTE - MOCK DATA
 * 
 * Este archivo contiene todos los datos simulados de la plataforma.
 * En producción, estos datos vendrán de Firebase/Supabase.
 * 
 * ESTRUCTURA:
 * - users: Usuarios del sistema (alumnos y administradores)
 * - masters: Programas educativos principales
 * - modules: Módulos que componen cada master
 * - videos: Videos individuales dentro de cada módulo
 * - podcast: Episodios del MW Podcast
 * - userProgress: Progreso de cada alumno en sus masters
 */

const MOCK_DATA = {
  /**
   * USUARIOS DEL SISTEMA
   * Roles: 'student' (alumno) | 'admin' (administrador)
   * 
   * Usuarios de prueba:
   * - Alumno: alumno@mwi.com / password123
   * - Admin: admin@mwi.com / admin123
   */
  users: [
    {
      id: 'user-001',
      email: 'alumno@mwi.com',
      password: 'password123', // En producción esto estará hasheado
      firstName: 'Juan',
      lastName: 'Pérez',
      role: 'student',
      active: true,
      enrolledMasters: ['master-001', 'master-002'], // Masters a los que tiene acceso
      registeredAt: '2024-01-15',
      avatar: null // URL del avatar (placeholder)
    },
    {
      id: 'user-002',
      email: 'maria@mwi.com',
      password: 'password123',
      firstName: 'María',
      lastName: 'González',
      role: 'student',
      active: true,
      enrolledMasters: ['master-001'],
      registeredAt: '2024-02-10',
      avatar: null
    },
    {
      id: 'user-003',
      email: 'admin@mwi.com',
      password: 'admin123',
      firstName: 'Carlos',
      lastName: 'Administrador',
      role: 'admin',
      active: true,
      enrolledMasters: [], // Los admins no tienen masters asignados
      registeredAt: '2023-12-01',
      avatar: null
    },
    {
      id: 'user-004',
      email: 'pedro@mwi.com',
      password: 'password123',
      firstName: 'Pedro',
      lastName: 'Martínez',
      role: 'student',
      active: false, // Usuario inactivo
      enrolledMasters: ['master-003'],
      registeredAt: '2024-03-05',
      avatar: null
    }
  ],

  /**
   * MASTERS - Programas Educativos
   * Cada master contiene múltiples módulos
   */
  masters: [
    {
      id: 'master-001',
      title: 'Master en Inversión Inmobiliaria',
      shortTitle: 'Inversión Inmobiliaria',
      description: 'Aprende a invertir en bienes raíces y generar ingresos pasivos a través de propiedades. Desde la búsqueda hasta la gestión de tu portafolio.',
      thumbnail: null, // URL de imagen placeholder
      duration: '12 semanas',
      level: 'Intermedio',
      instructor: 'Roberto Vázquez',
      category: 'Inversiones',
      modules: ['module-001', 'module-002', 'module-003'], // IDs de módulos
      totalVideos: 24,
      active: true,
      featured: true // Aparece en homepage
    },
    {
      id: 'master-002',
      title: 'Master en Trading y Mercados Financieros',
      shortTitle: 'Trading Financiero',
      description: 'Domina el arte del trading profesional. Análisis técnico, gestión de riesgo, psicología del trader y estrategias probadas.',
      thumbnail: null,
      duration: '16 semanas',
      level: 'Avanzado',
      instructor: 'Laura Fernández',
      category: 'Trading',
      modules: ['module-004', 'module-005', 'module-006', 'module-007'],
      totalVideos: 32,
      active: true,
      featured: true
    },
    {
      id: 'master-003',
      title: 'Master en Creación de Negocios Digitales',
      shortTitle: 'Negocios Digitales',
      description: 'Crea y escala tu negocio digital desde cero. E-commerce, infoproductos, marketing digital y automatización.',
      thumbnail: null,
      duration: '10 semanas',
      level: 'Principiante',
      instructor: 'Diego Morales',
      category: 'Emprendimiento',
      modules: ['module-008', 'module-009', 'module-010'],
      totalVideos: 20,
      active: true,
      featured: true
    },
    {
      id: 'master-004',
      title: 'Master en Criptomonedas y Blockchain',
      shortTitle: 'Cripto & Blockchain',
      description: 'Comprende el mundo de las criptomonedas, blockchain y DeFi. Inversión segura y oportunidades en Web3.',
      thumbnail: null,
      duration: '8 semanas',
      level: 'Intermedio',
      instructor: 'Ana Ruiz',
      category: 'Criptomonedas',
      modules: ['module-011', 'module-012'],
      totalVideos: 16,
      active: true,
      featured: false
    }
    ,
    // Masters visibles en el portal de usuario (#/masters)
    { id: 'amazon-seller', title: 'Amazon Seller Master', shortTitle: 'Amazon', description: '', thumbnail: 'assets/images/master-amazon-seller.png', duration: '', level: '', instructor: '', category: 'Ecommerce', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'ebay-seller', title: 'eBay Seller Hub Master', shortTitle: 'eBay', description: '', thumbnail: 'assets/images/master-ebay-seller.png', duration: '', level: '', instructor: '', category: 'Ecommerce', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'meli-top-seller', title: 'Top Seller Mercado Libre Master', shortTitle: 'Mercado Libre', description: '', thumbnail: 'assets/images/master-meli.png', duration: '', level: '', instructor: '', category: 'Ecommerce', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'shein-seller', title: 'SHEIN Seller Master', shortTitle: 'SHEIN', description: '', thumbnail: 'assets/images/master-shein-seller.png', duration: '', level: '', instructor: '', category: 'Ecommerce', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'trading-capital', title: 'Gestión de Capital en Mercados Financieros Master', shortTitle: 'Trading', description: '', thumbnail: 'assets/images/master-trading.png', duration: '', level: '', instructor: '', category: 'Trading', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'cripto-arbitrage', title: 'Cripto Arbitrage Master', shortTitle: 'Cripto', description: '', thumbnail: 'assets/images/master-cripto-arbitrage.png', duration: '', level: '', instructor: '', category: 'Cripto', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'gestion-empresarial', title: 'Operación, Dirección y Gestión Empresarial Master', shortTitle: 'Empresarial', description: '', thumbnail: 'assets/images/master-gestion-empresarial.png', duration: '', level: '', instructor: '', category: 'Empresarial', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'vida-proposito', title: 'Vida con Propósito Master', shortTitle: 'Vida', description: '', thumbnail: 'assets/images/master-vida-proposito.png', duration: '', level: '', instructor: '', category: 'Desarrollo Personal', modules: [], totalVideos: 0, active: true, featured: false },
    { id: 'social-media', title: 'Social Media Top Seller Master', shortTitle: 'Social Media', description: '', thumbnail: 'assets/images/master-social-media.png', duration: '', level: '', instructor: '', category: 'Marketing', modules: [], totalVideos: 0, active: true, featured: false }
  ],

  /**
   * MÓDULOS
   * Cada módulo pertenece a un master y contiene varios videos
   */
  modules: [
    // Módulos del Master 001 - Inversión Inmobiliaria
    {
      id: 'module-001',
      masterId: 'master-001',
      title: 'Módulo 1: Fundamentos de la Inversión Inmobiliaria',
      description: 'Introducción al mundo de las inversiones en bienes raíces, tipos de propiedades y estrategias básicas.',
      order: 1,
      videos: ['video-001', 'video-002', 'video-003'],
      duration: '2 horas',
      active: true
    },
    {
      id: 'module-002',
      masterId: 'master-001',
      title: 'Módulo 2: Análisis de Mercado y Ubicación',
      description: 'Cómo analizar el mercado inmobiliario, identificar oportunidades y evaluar ubicaciones estratégicas.',
      order: 2,
      videos: ['video-004', 'video-005', 'video-006'],
      duration: '2.5 horas',
      active: true
    },
    {
      id: 'module-003',
      masterId: 'master-001',
      title: 'Módulo 3: Financiamiento y ROI',
      description: 'Opciones de financiamiento, cálculo de rentabilidad y gestión del flujo de caja.',
      order: 3,
      videos: ['video-007', 'video-008'],
      duration: '1.5 horas',
      active: true
    },

    // Módulos del Master 002 - Trading Financiero
    {
      id: 'module-004',
      masterId: 'master-002',
      title: 'Módulo 1: Introducción a los Mercados',
      description: 'Conceptos fundamentales, tipos de mercados y funcionamiento de las bolsas.',
      order: 1,
      videos: ['video-009', 'video-010', 'video-011'],
      duration: '2 horas',
      active: true
    },
    {
      id: 'module-005',
      masterId: 'master-002',
      title: 'Módulo 2: Análisis Técnico Avanzado',
      description: 'Patrones de velas, indicadores técnicos y lectura de gráficos profesionales.',
      order: 2,
      videos: ['video-012', 'video-013', 'video-014'],
      duration: '3 horas',
      active: true
    },
    {
      id: 'module-006',
      masterId: 'master-002',
      title: 'Módulo 3: Gestión de Riesgo',
      description: 'Protección del capital, stop loss, position sizing y psicología del trading.',
      order: 3,
      videos: ['video-015', 'video-016'],
      duration: '2 horas',
      active: true
    },
    {
      id: 'module-007',
      masterId: 'master-002',
      title: 'Módulo 4: Estrategias Profesionales',
      description: 'Estrategias probadas, backtesting y optimización de sistemas de trading.',
      order: 4,
      videos: ['video-017', 'video-018', 'video-019'],
      duration: '2.5 horas',
      active: true
    },

    // Módulos del Master 003 - Negocios Digitales
    {
      id: 'module-008',
      masterId: 'master-003',
      title: 'Módulo 1: Validación de Ideas de Negocio',
      description: 'Cómo validar tu idea antes de invertir tiempo y dinero.',
      order: 1,
      videos: ['video-020', 'video-021'],
      duration: '1.5 horas',
      active: true
    },
    {
      id: 'module-009',
      masterId: 'master-003',
      title: 'Módulo 2: Creación de Productos Digitales',
      description: 'Infoproductos, cursos online, membresías y modelos de negocio digitales.',
      order: 2,
      videos: ['video-022', 'video-023', 'video-024'],
      duration: '2 horas',
      active: true
    },
    {
      id: 'module-010',
      masterId: 'master-003',
      title: 'Módulo 3: Marketing y Ventas Online',
      description: 'Estrategias de marketing digital, embudos de venta y automatización.',
      order: 3,
      videos: ['video-025', 'video-026'],
      duration: '2 horas',
      active: true
    },

    // Módulos del Master 004 - Cripto & Blockchain
    {
      id: 'module-011',
      masterId: 'master-004',
      title: 'Módulo 1: Fundamentos de Blockchain',
      description: 'Qué es blockchain, cómo funciona y sus aplicaciones.',
      order: 1,
      videos: ['video-027', 'video-028'],
      duration: '1.5 horas',
      active: true
    },
    {
      id: 'module-012',
      masterId: 'master-004',
      title: 'Módulo 2: Inversión en Criptomonedas',
      description: 'Estrategias de inversión, wallets, exchanges y seguridad.',
      order: 2,
      videos: ['video-029', 'video-030'],
      duration: '2 horas',
      active: true
    }
  ],

  /**
   * VIDEOS
   * Cada video pertenece a un módulo específico
   * URLs de Vimeo son placeholders - reemplazar con videos reales
   */
  videos: [
    // Videos del Módulo 001
    {
      id: 'video-001',
      moduleId: 'module-001',
      title: 'Bienvenida e Introducción al Master',
      description: 'Presentación del programa y objetivos de aprendizaje.',
      vimeoId: '76979871', // Video de ejemplo de Vimeo
      duration: '15:30',
      order: 1,
      type: 'intro',
      resources: [] // Links a materiales adicionales
    },
    {
      id: 'video-002',
      moduleId: 'module-001',
      title: 'Tipos de Propiedades para Invertir',
      description: 'Residencial, comercial, industrial: ventajas y desventajas de cada tipo.',
      vimeoId: '76979871',
      duration: '22:45',
      order: 2,
      type: 'lesson',
      resources: [
        { title: 'PDF: Comparativa de Propiedades', url: '#' }
      ]
    },
    {
      id: 'video-003',
      moduleId: 'module-001',
      title: 'Estrategias de Inversión Inmobiliaria',
      description: 'Buy and hold, fix and flip, propiedades en renta: qué estrategia elegir.',
      vimeoId: '76979871',
      duration: '28:15',
      order: 3,
      type: 'lesson',
      resources: []
    },

    // Videos del Módulo 002
    {
      id: 'video-004',
      moduleId: 'module-002',
      title: 'Análisis de Mercado Inmobiliario',
      description: 'Herramientas y métricas para analizar el mercado.',
      vimeoId: '76979871',
      duration: '25:00',
      order: 1,
      type: 'lesson',
      resources: []
    },
    {
      id: 'video-005',
      moduleId: 'module-002',
      title: 'Ubicación: El Factor Más Importante',
      description: 'Cómo evaluar ubicaciones y predecir valorización.',
      vimeoId: '76979871',
      duration: '30:20',
      order: 2,
      type: 'lesson',
      resources: []
    },
    {
      id: 'video-006',
      moduleId: 'module-002',
      title: 'Due Diligence y Evaluación de Propiedades',
      description: 'Checklist completo para evaluar una propiedad antes de comprar.',
      vimeoId: '76979871',
      duration: '35:10',
      order: 3,
      type: 'lesson',
      resources: [
        { title: 'Checklist de Due Diligence', url: '#' }
      ]
    },

    // Videos del Módulo 003
    {
      id: 'video-007',
      moduleId: 'module-003',
      title: 'Opciones de Financiamiento',
      description: 'Hipotecas, préstamos, socios: cómo financiar tu inversión.',
      vimeoId: '76979871',
      duration: '26:40',
      order: 1,
      type: 'lesson',
      resources: []
    },
    {
      id: 'video-008',
      moduleId: 'module-003',
      title: 'Cálculo de ROI y Flujo de Caja',
      description: 'Métricas financieras esenciales y calculadoras de rentabilidad.',
      vimeoId: '76979871',
      duration: '32:15',
      order: 2,
      type: 'lesson',
      resources: [
        { title: 'Calculadora ROI (Excel)', url: '#' }
      ]
    },

    // Videos del Módulo 004 - Trading
    {
      id: 'video-009',
      moduleId: 'module-004',
      title: 'Introducción a los Mercados Financieros',
      description: 'Qué son las bolsas, cómo funcionan y tipos de activos.',
      vimeoId: '76979871',
      duration: '20:00',
      order: 1,
      type: 'intro',
      resources: []
    },
    {
      id: 'video-010',
      moduleId: 'module-004',
      title: 'Tipos de Órdenes y Plataformas',
      description: 'Market orders, limit orders y cómo usar plataformas de trading.',
      vimeoId: '76979871',
      duration: '24:30',
      order: 2,
      type: 'lesson',
      resources: []
    },
    {
      id: 'video-011',
      moduleId: 'module-004',
      title: 'Horarios de Mercado y Volatilidad',
      description: 'Cuándo operar y cómo aprovechar la volatilidad.',
      vimeoId: '76979871',
      duration: '18:45',
      order: 3,
      type: 'lesson',
      resources: []
    },

    // Más videos para otros módulos (simplificado)
    { id: 'video-012', moduleId: 'module-005', title: 'Velas Japonesas', vimeoId: '76979871', duration: '30:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-013', moduleId: 'module-005', title: 'Indicadores Técnicos', vimeoId: '76979871', duration: '28:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-014', moduleId: 'module-005', title: 'Patrones de Precio', vimeoId: '76979871', duration: '32:00', order: 3, type: 'lesson', resources: [] },
    { id: 'video-015', moduleId: 'module-006', title: 'Stop Loss y Take Profit', vimeoId: '76979871', duration: '25:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-016', moduleId: 'module-006', title: 'Psicología del Trading', vimeoId: '76979871', duration: '27:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-017', moduleId: 'module-007', title: 'Estrategia de Tendencia', vimeoId: '76979871', duration: '30:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-018', moduleId: 'module-007', title: 'Estrategia de Rango', vimeoId: '76979871', duration: '28:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-019', moduleId: 'module-007', title: 'Backtesting de Estrategias', vimeoId: '76979871', duration: '35:00', order: 3, type: 'lesson', resources: [] },

    // Videos Negocios Digitales
    { id: 'video-020', moduleId: 'module-008', title: 'Validación de Mercado', vimeoId: '76979871', duration: '22:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-021', moduleId: 'module-008', title: 'MVP y Testing', vimeoId: '76979871', duration: '26:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-022', moduleId: 'module-009', title: 'Creación de Cursos Online', vimeoId: '76979871', duration: '28:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-023', moduleId: 'module-009', title: 'Membresías y Suscripciones', vimeoId: '76979871', duration: '24:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-024', moduleId: 'module-009', title: 'Infoproductos Rentables', vimeoId: '76979871', duration: '30:00', order: 3, type: 'lesson', resources: [] },
    { id: 'video-025', moduleId: 'module-010', title: 'Embudos de Venta', vimeoId: '76979871', duration: '32:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-026', moduleId: 'module-010', title: 'Automatización de Marketing', vimeoId: '76979871', duration: '29:00', order: 2, type: 'lesson', resources: [] },

    // Videos Cripto
    { id: 'video-027', moduleId: 'module-011', title: 'Qué es Blockchain', vimeoId: '76979871', duration: '20:00', order: 1, type: 'intro', resources: [] },
    { id: 'video-028', moduleId: 'module-011', title: 'Aplicaciones de Blockchain', vimeoId: '76979871', duration: '25:00', order: 2, type: 'lesson', resources: [] },
    { id: 'video-029', moduleId: 'module-012', title: 'Wallets y Seguridad', vimeoId: '76979871', duration: '28:00', order: 1, type: 'lesson', resources: [] },
    { id: 'video-030', moduleId: 'module-012', title: 'Estrategias de Inversión Cripto', vimeoId: '76979871', duration: '30:00', order: 2, type: 'lesson', resources: [] }
  ],

  /**
   * PODCAST - Episodios del MW Podcast
   */
  podcast: [
    {
      id: 'podcast-001',
      title: 'EP #1 - Cómo Empezar a Invertir con Poco Dinero',
      description: 'En este episodio hablamos sobre las estrategias para comenzar tu viaje de inversión incluso si tienes un presupuesto limitado.',
      host: 'Roberto Vázquez',
      guest: 'Laura Fernández',
      duration: '45:30',
      publishedAt: '2024-11-15',
      audioUrl: null, // URL del audio (placeholder)
      youtubeId: null, // Si el podcast también está en YouTube
      thumbnail: null,
      category: 'Inversiones',
      featured: true
    },
    {
      id: 'podcast-002',
      title: 'EP #2 - Errores Comunes en Trading',
      description: 'Los 10 errores más comunes que cometen los traders principiantes y cómo evitarlos.',
      host: 'Laura Fernández',
      guest: null,
      duration: '38:20',
      publishedAt: '2024-11-22',
      audioUrl: null,
      youtubeId: null,
      thumbnail: null,
      category: 'Trading',
      featured: true
    },
    {
      id: 'podcast-003',
      title: 'EP #3 - Mentalidad Millonaria',
      description: 'Cómo desarrollar la mentalidad correcta para construir riqueza a largo plazo.',
      host: 'Roberto Vázquez',
      guest: 'Diego Morales',
      duration: '52:15',
      publishedAt: '2024-11-29',
      audioUrl: null,
      youtubeId: null,
      thumbnail: null,
      category: 'Mindset',
      featured: true
    },
    {
      id: 'podcast-004',
      title: 'EP #4 - El Futuro de las Criptomonedas',
      description: 'Análisis profundo sobre el futuro de Bitcoin, Ethereum y el ecosistema cripto.',
      host: 'Ana Ruiz',
      guest: null,
      duration: '41:00',
      publishedAt: '2024-12-06',
      audioUrl: null,
      youtubeId: null,
      thumbnail: null,
      category: 'Criptomonedas',
      featured: false
    },
    {
      id: 'podcast-005',
      title: 'EP #5 - Construyendo tu Imperio Digital',
      description: 'De cero a 6 cifras: la historia real de emprendedores digitales exitosos.',
      host: 'Diego Morales',
      guest: 'Roberto Vázquez',
      duration: '48:30',
      publishedAt: '2024-12-13',
      audioUrl: null,
      youtubeId: null,
      thumbnail: null,
      category: 'Emprendimiento',
      featured: false
    }
  ],

  /**
   * PROGRESO DEL ALUMNO
   * Registro del progreso de cada usuario en sus masters
   */
  userProgress: [
    {
      userId: 'user-001',
      masterId: 'master-001',
      completedVideos: ['video-001', 'video-002', 'video-003', 'video-004'], // IDs de videos completados
      currentModule: 'module-002',
      currentVideo: 'video-005',
      progressPercentage: 35, // % de avance en el master
      startedAt: '2024-01-20',
      lastAccessedAt: '2024-12-20'
    },
    {
      userId: 'user-001',
      masterId: 'master-002',
      completedVideos: ['video-009', 'video-010'],
      currentModule: 'module-004',
      currentVideo: 'video-011',
      progressPercentage: 15,
      startedAt: '2024-02-01',
      lastAccessedAt: '2024-12-18'
    },
    {
      userId: 'user-002',
      masterId: 'master-001',
      completedVideos: ['video-001', 'video-002'],
      currentModule: 'module-001',
      currentVideo: 'video-003',
      progressPercentage: 12,
      startedAt: '2024-02-15',
      lastAccessedAt: '2024-12-19'
    }
  ],

  /**
   * NOTIFICACIONES (Mock)
   */
  notifications: [
    {
      id: 'notif-001',
      userId: 'user-001',
      title: 'Nuevo módulo disponible',
      message: 'El Módulo 3 de Inversión Inmobiliaria ya está disponible.',
      type: 'info',
      read: false,
      createdAt: '2024-12-20T10:30:00'
    },
    {
      id: 'notif-002',
      userId: 'user-001',
      title: 'Nuevo episodio del podcast',
      message: 'Ya puedes escuchar el EP #5 - Construyendo tu Imperio Digital.',
      type: 'podcast',
      read: true,
      createdAt: '2024-12-13T08:00:00'
    }
  ],

  /**
   * MENSAJES (Mock)
   */
  messages: [
    {
      id: 'msg-001',
      userId: 'user-001',
      from: 'Soporte MWI',
      subject: 'Bienvenido a Modern Wealth Institute',
      body: 'Gracias por unirte a nuestra comunidad. Estamos aquí para apoyarte en tu camino hacia la libertad financiera.',
      read: true,
      createdAt: '2024-01-15T09:00:00'
    },
    {
      id: 'msg-002',
      userId: 'user-001',
      from: 'Roberto Vázquez',
      subject: 'Recursos adicionales del Master',
      body: 'Hola Juan, te comparto algunos recursos adicionales que te ayudarán con el Módulo 2.',
      read: false,
      createdAt: '2024-12-19T14:30:00'
    }
  ]
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOCK_DATA;
}
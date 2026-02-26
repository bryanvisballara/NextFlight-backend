/**
 * STORAGE MANAGER
 * 
 * Maneja el almacenamiento local (localStorage) de la aplicación.
 * En producción, esto se reemplazaría con llamadas a Firebase/Supabase.
 * 
 * FUNCIONES:
 * - Guardar y recuperar datos del localStorage
 * - Gestión de sesión de usuario
 * - Gestión de progreso del alumno
 */

const StorageManager = {
  // Claves para localStorage
  KEYS: {
    CURRENT_USER: 'mwi_current_user',
    USER_PROGRESS: 'mwi_user_progress',
    USERS_DB: 'mwi_users_db',
    MASTERS_DB: 'mwi_masters_db',
    MODULES_DB: 'mwi_modules_db',
    VIDEOS_DB: 'mwi_videos_db',
    PODCAST_DB: 'mwi_podcast_db',
    NOTIFICATIONS: 'mwi_notifications',
    MESSAGES: 'mwi_messages',
    MENTORS_DB: 'mwi_mentors_db',
    LIVE_SESSIONS_DB: 'mwi_live_sessions_db'
  },

  /**
   * Inicializa el almacenamiento con mock data si no existe
   */
  initialize() {
    // Verificar si ya hay datos en localStorage
    if (!this.get(this.KEYS.USERS_DB)) {
      console.log('Inicializando base de datos local con mock data...');
      this.set(this.KEYS.USERS_DB, MOCK_DATA.users);
      this.set(this.KEYS.MASTERS_DB, MOCK_DATA.masters);
      this.set(this.KEYS.MODULES_DB, MOCK_DATA.modules);
      this.set(this.KEYS.VIDEOS_DB, MOCK_DATA.videos);
      this.set(this.KEYS.PODCAST_DB, MOCK_DATA.podcast);
      this.set(this.KEYS.USER_PROGRESS, MOCK_DATA.userProgress);
      this.set(this.KEYS.NOTIFICATIONS, MOCK_DATA.notifications);
      this.set(this.KEYS.MESSAGES, MOCK_DATA.messages);
      console.log('Base de datos local inicializada correctamente.');
    }

    // Asegurar base de mentores con valores por defecto si no existe
    if (!this.get(this.KEYS.MENTORS_DB)) {
      const defaultMentors = [
        { id: 'mentor-bryan-visbal', slug: 'bryan-visbal', name: 'Bryan Visbal' },
        { id: 'mentor-tilsia-lara', slug: 'tilsia-lara', name: 'Tilsia Lara' },
        { id: 'mentor-daniel-delavalle', slug: 'daniel-delavalle', name: 'Daniel De Lavalle' },
        { id: 'mentor-antonio-vergel', slug: 'antonio-vergel', name: 'Antonio Vergel' },
        { id: 'mentor-daniel-visbal', slug: 'daniel-visbal', name: 'Daniel Visbal' }
      ];
      this.set(this.KEYS.MENTORS_DB, defaultMentors);
    }

    // Inicializar sesiones en vivo si no existe
    if (!this.get(this.KEYS.LIVE_SESSIONS_DB)) {
      const sampleSessions = [
        { id: 'live-1', title: 'Trading en Vivo', instructor: 'daniel-delavalle', time: 'Hoy, 8:00 PM', requiresAffiliation: true, ctaLabel: 'INGRESAR', ctaRoute: '/services' },
        { id: 'live-2', title: 'Ecommerce Sourcing en Vivo', instructor: 'bryan-visbal', time: '2 MAY, 7:00 PM', requiresAffiliation: true, ctaLabel: 'INGRESAR', ctaRoute: '/services' }
      ];
      this.set(this.KEYS.LIVE_SESSIONS_DB, sampleSessions);
    }
  },

  /**
   * Guarda un valor en localStorage
   * @param {string} key - Clave
   * @param {any} value - Valor a guardar (se convierte automáticamente a JSON)
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
      return false;
    }
  },

  /**
   * Recupera un valor de localStorage
   * @param {string} key - Clave
   * @returns {any} Valor recuperado (parseado desde JSON)
   */
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error leyendo de localStorage:', error);
      return null;
    }
  },

  /**
   * Elimina un valor de localStorage
   * @param {string} key - Clave a eliminar
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
      return false;
    }
  },

  /**
   * Limpia todo el localStorage (usar con precaución)
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
      return false;
    }
  },

  /**
   * Guarda el usuario actual en sesión
   * @param {Object} user - Objeto de usuario
   */
  setCurrentUser(user) {
    return this.set(this.KEYS.CURRENT_USER, user);
  },

  /**
   * Obtiene el usuario actual en sesión
   * @returns {Object|null} Usuario actual o null si no hay sesión
   */
  getCurrentUser() {
    return this.get(this.KEYS.CURRENT_USER);
  },

  /**
   * Cierra la sesión del usuario actual
   */
  clearCurrentUser() {
    return this.remove(this.KEYS.CURRENT_USER);
  },

  /**
   * Verifica si hay un usuario en sesión
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Obtiene todos los usuarios de la base de datos
   * @returns {Array} Lista de usuarios
   */
  getAllUsers() {
    return this.get(this.KEYS.USERS_DB) || [];
  },

  /**
   * Guarda un nuevo usuario en la base de datos
   * @param {Object} user - Usuario a guardar
   */
  saveUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    return this.set(this.KEYS.USERS_DB, users);
  },

  /**
   * Actualiza un usuario existente
   * @param {Object} updatedUser - Usuario actualizado
   */
  updateUser(updatedUser) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      return this.set(this.KEYS.USERS_DB, users);
    }
    return false;
  },

  /**
   * Obtiene todos los masters
   * @returns {Array} Lista de masters
   */
  getAllMasters() {
    return this.get(this.KEYS.MASTERS_DB) || [];
  },

  /**
   * Obtiene un master por ID
   * @param {string} masterId - ID del master
   * @returns {Object|null} Master encontrado o null
   */
  getMasterById(masterId) {
    const masters = this.getAllMasters();
    return masters.find(m => m.id === masterId) || null;
  },

  /**
   * Obtiene los módulos de un master específico
   * @param {string} masterId - ID del master
   * @returns {Array} Lista de módulos
   */
  getModulesByMaster(masterId) {
    const modules = this.get(this.KEYS.MODULES_DB) || [];
    return modules.filter(m => m.masterId === masterId).sort((a, b) => a.order - b.order);
  },

  /**
   * Obtiene un módulo por ID
   * @param {string} moduleId - ID del módulo
   * @returns {Object|null} Módulo encontrado o null
   */
  getModuleById(moduleId) {
    const modules = this.get(this.KEYS.MODULES_DB) || [];
    return modules.find(m => m.id === moduleId) || null;
  },

  /**
   * Obtiene los videos de un módulo específico
   * @param {string} moduleId - ID del módulo
   * @returns {Array} Lista de videos
   */
  getVideosByModule(moduleId) {
    const videos = this.get(this.KEYS.VIDEOS_DB) || [];
    return videos.filter(v => v.moduleId === moduleId).sort((a, b) => a.order - b.order);
  },

  /**
   * Obtiene un video por ID
   * @param {string} videoId - ID del video
   * @returns {Object|null} Video encontrado o null
   */
  getVideoById(videoId) {
    const videos = this.get(this.KEYS.VIDEOS_DB) || [];
    return videos.find(v => v.id === videoId) || null;
  },

  /**
   * Obtiene el progreso de un usuario en un master específico
   * @param {string} userId - ID del usuario
   * @param {string} masterId - ID del master
   * @returns {Object|null} Progreso encontrado o null
   */
  getUserProgress(userId, masterId) {
    const allProgress = this.get(this.KEYS.USER_PROGRESS) || [];
    return allProgress.find(p => p.userId === userId && p.masterId === masterId) || null;
  },

  /**
   * Actualiza el progreso de un usuario en un master
   * @param {string} userId - ID del usuario
   * @param {string} masterId - ID del master
   * @param {Object} progressData - Datos del progreso a actualizar
   */
  updateUserProgress(userId, masterId, progressData) {
    const allProgress = this.get(this.KEYS.USER_PROGRESS) || [];
    const index = allProgress.findIndex(p => p.userId === userId && p.masterId === masterId);
    
    if (index !== -1) {
      // Actualizar progreso existente
      allProgress[index] = { ...allProgress[index], ...progressData };
    } else {
      // Crear nuevo progreso
      allProgress.push({
        userId,
        masterId,
        completedVideos: [],
        progressPercentage: 0,
        startedAt: new Date().toISOString(),
        ...progressData
      });
    }
    
    return this.set(this.KEYS.USER_PROGRESS, allProgress);
  },

  /**
   * Marca un video como completado para un usuario
   * @param {string} userId - ID del usuario
   * @param {string} masterId - ID del master
   * @param {string} videoId - ID del video
   */
  markVideoAsCompleted(userId, masterId, videoId) {
    const progress = this.getUserProgress(userId, masterId) || {};
    const completedVideos = progress.completedVideos || [];
    
    if (!completedVideos.includes(videoId)) {
      completedVideos.push(videoId);
      
      // Calcular nuevo porcentaje de progreso
      const master = this.getMasterById(masterId);
      const progressPercentage = Math.round((completedVideos.length / master.totalVideos) * 100);
      
      return this.updateUserProgress(userId, masterId, {
        completedVideos,
        progressPercentage,
        lastAccessedAt: new Date().toISOString()
      });
    }
    
    return true;
  },

  /**
   * Obtiene todos los episodios del podcast
   * @returns {Array} Lista de episodios
   */
  getAllPodcast() {
    return this.get(this.KEYS.PODCAST_DB) || [];
  },

  /**
   * Obtiene notificaciones de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Array} Lista de notificaciones
   */
  getUserNotifications(userId) {
    const notifications = this.get(this.KEYS.NOTIFICATIONS) || [];
    return notifications.filter(n => n.userId === userId);
  },

  /**
   * Obtiene mensajes de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Array} Lista de mensajes
   */
  getUserMessages(userId) {
    const messages = this.get(this.KEYS.MESSAGES) || [];
    return messages.filter(m => m.userId === userId);
  }
  ,

  /**
   * MENTORES
   */
  getAllMentors() {
    return this.get(this.KEYS.MENTORS_DB) || [];
  },

  saveMentor(mentor) {
    const mentors = this.getAllMentors();
    mentors.push(mentor);
    return this.set(this.KEYS.MENTORS_DB, mentors);
  },

  updateMentor(updatedMentor) {
    const mentors = this.getAllMentors();
    const idx = mentors.findIndex(m => m.id === updatedMentor.id);
    if (idx !== -1) {
      mentors[idx] = { ...mentors[idx], ...updatedMentor };
      return this.set(this.KEYS.MENTORS_DB, mentors);
    }
    return false;
  },

  deleteMentor(mentorId) {
    const mentors = this.getAllMentors();
    const next = mentors.filter(m => m.id !== mentorId);
    return this.set(this.KEYS.MENTORS_DB, next);
  }
  ,

  /**
   * SESIONES EN VIVO
   */
  getLiveSessions() {
    return this.get(this.KEYS.LIVE_SESSIONS_DB) || [];
  },

  saveLiveSession(session) {
    const sessions = this.getLiveSessions();
    sessions.push(session);
    return this.set(this.KEYS.LIVE_SESSIONS_DB, sessions);
  },

  updateLiveSession(updatedSession) {
    const sessions = this.getLiveSessions();
    const idx = sessions.findIndex(s => s.id === updatedSession.id);
    if (idx !== -1) {
      sessions[idx] = { ...sessions[idx], ...updatedSession };
      return this.set(this.KEYS.LIVE_SESSIONS_DB, sessions);
    }
    return false;
  },

  deleteLiveSession(sessionId) {
    const sessions = this.getLiveSessions();
    const next = sessions.filter(s => s.id !== sessionId);
    return this.set(this.KEYS.LIVE_SESSIONS_DB, next);
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
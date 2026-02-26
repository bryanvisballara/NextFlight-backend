/**
 * PÁGINA: LISTA DE MASTERS
 * 
 * Vista completa de todos los masters del alumno.
 */

const MastersListPage = {
  /**
   * Renderiza la lista de masters
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user) {
      Router.navigate('/login');
      return '';
    }

    const allMasters = StorageManager.getAllMasters();
    const userMasters = user.enrolledMasters || [];
    const enrolledMasters = allMasters.filter(m => userMasters.includes(m.id));

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>Mis Masters</h1>
          <p>Programas educativos a los que tienes acceso</p>
        </div>

        <div class="masters-content">
          ${enrolledMasters.length > 0 ? `
            <div class="masters-list-grid">
              ${enrolledMasters.map(master => this.renderMasterCard(master, user)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <h3>No tienes masters asignados</h3>
              <p>Contacta a soporte para obtener acceso a nuestros programas.</p>
              <a href="/support" data-link class="btn btn-primary">Contactar Soporte</a>
            </div>
          `}
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una card de master
   */
  renderMasterCard(master, user) {
    const thumbnail = master.thumbnail || Utils.getPlaceholderImage(400, 250, master.shortTitle);
    const progress = StorageManager.getUserProgress(user.id, master.id);
    const progressPercent = progress ? progress.progressPercentage : 0;

    return `
      <div class="master-list-card">
        <div class="master-list-image">
          <img src="${thumbnail}" alt="${master.title}">
          <span class="master-level-badge">${master.level}</span>
        </div>
        <div class="master-list-content">
          <h3>${master.title}</h3>
          <p class="master-description">${master.description}</p>
          
          <div class="master-meta-grid">
            <div class="meta-item">
              <span class="meta-icon">👤</span>
              <span>${master.instructor}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">📹</span>
              <span>${master.totalVideos} videos</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">⏱️</span>
              <span>${master.duration}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">📂</span>
              <span>${master.modules.length} módulos</span>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-info">
              <span>Tu progreso</span>
              <span class="progress-percent">${progressPercent}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <a href="/master/${master.id}" data-link class="btn btn-primary btn-full">
            ${progressPercent > 0 ? 'Continuar Master' : 'Comenzar Master'}
          </a>
        </div>
      </div>
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    // Inicialización si es necesaria
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MastersListPage;
}

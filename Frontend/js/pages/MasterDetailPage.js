/**
 * PÁGINA: DETALLE DE MASTER
 * 
 * Vista detallada de un master con sus módulos y videos.
 */

const MasterDetailPage = {
  /**
   * Renderiza el detalle del master
   */
  render(masterId) {
    const user = AuthManager.getCurrentUser();
    if (!user) {
      Router.navigate('/login');
      return '';
    }

    // Verificar acceso
    if (!AuthManager.hasAccessToMaster(masterId)) {
      Router.navigate('/dashboard');
      Utils.showError('No tienes acceso a este master');
      return '';
    }

    const master = StorageManager.getMasterById(masterId);
    if (!master) {
      Router.navigate('/404');
      return '';
    }

    const modules = StorageManager.getModulesByMaster(masterId);
    const progress = StorageManager.getUserProgress(user.id, masterId);

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <a href="/masters" data-link class="back-link">← Volver a Mis Masters</a>
          <h1>${master.title}</h1>
          <p>${master.description}</p>
        </div>

        <div class="master-detail-content">
          <!-- Info del Master -->
          <div class="master-info-card">
            <div class="master-info-grid">
              <div class="info-item">
                <span class="info-label">Instructor</span>
                <span class="info-value">👤 ${master.instructor}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Duración</span>
                <span class="info-value">⏱️ ${master.duration}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Nivel</span>
                <span class="info-value">📊 ${master.level}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Videos</span>
                <span class="info-value">📹 ${master.totalVideos}</span>
              </div>
            </div>

            ${progress ? `
              <div class="progress-section">
                <div class="progress-info">
                  <span>Tu progreso en este master</span>
                  <span class="progress-percent">${progress.progressPercentage}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${progress.progressPercentage}%"></div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Módulos -->
          <div class="modules-section">
            <h2>Módulos del Master</h2>
            <div class="modules-list">
              ${modules.map(module => this.renderModuleCard(module, masterId, progress)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una card de módulo
   */
  renderModuleCard(module, masterId, progress) {
    const videos = StorageManager.getVideosByModule(module.id);
    const completedVideos = progress ? progress.completedVideos : [];
    const completedCount = videos.filter(v => completedVideos.includes(v.id)).length;

    return `
      <div class="module-card">
        <div class="module-header">
          <h3>${module.title}</h3>
          <span class="module-duration">⏱️ ${module.duration}</span>
        </div>
        <p class="module-description">${module.description}</p>
        
        <div class="module-progress">
          <span>${completedCount} de ${videos.length} videos completados</span>
        </div>

        <div class="videos-list">
          ${videos.map((video, index) => {
            const isCompleted = completedVideos.includes(video.id);
            return `
              <a href="/master/${masterId}/module/${module.id}?video=${video.id}" 
                 data-link 
                 class="video-item ${isCompleted ? 'completed' : ''}">
                <span class="video-number">${index + 1}</span>
                <span class="video-title">${video.title}</span>
                <span class="video-duration">${video.duration}</span>
                ${isCompleted ? '<span class="check-icon">✓</span>' : ''}
              </a>
            `;
          }).join('')}
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
  module.exports = MasterDetailPage;
}

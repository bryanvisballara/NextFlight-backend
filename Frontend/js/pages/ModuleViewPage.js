/**
 * PÁGINA: VISTA DE MÓDULO CON VIDEO
 * 
 * Vista de video individual con reproductor embebido de Vimeo.
 */

const ModuleViewPage = {
  /**
   * Renderiza la vista del módulo con video
   */
  render(masterId, moduleId) {
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
    const module = StorageManager.getModuleById(moduleId);
    const videos = StorageManager.getVideosByModule(moduleId);
    
    if (!master || !module) {
      Router.navigate('/404');
      return '';
    }

    // Obtener el video actual de los parámetros de la URL o el primero
    const urlParams = Router.getUrlParams();
    const videoId = urlParams.video || (videos.length > 0 ? videos[0].id : null);
    const currentVideo = videoId ? StorageManager.getVideoById(videoId) : null;

    const progress = StorageManager.getUserProgress(user.id, masterId);
    const completedVideos = progress ? progress.completedVideos : [];

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <a href="/master/${masterId}" data-link class="back-link">← Volver al Master</a>
          <h1>${module.title}</h1>
          <p>${module.description}</p>
        </div>

        <div class="module-view-content">
          <div class="video-section">
            ${currentVideo ? `
              <!-- Reproductor de Video -->
              <div class="video-player-container">
                <div class="video-player">
                  ${currentVideo.fileUrl ? `
                    <video src="${currentVideo.fileUrl}" controls style="width:100%;height:100%;background:#000;border:none;border-radius:8px;"></video>
                  ` : `
                    <iframe 
                      referrerpolicy="no-referrer"
                      src="https://player.vimeo.com/video/${currentVideo.vimeoId}?title=0&byline=0&portrait=0&controls=1&pip=0" 
                      frameborder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowfullscreen
                      style="width: 100%; height: 100%;">
                    </iframe>
                  `}
                </div>
              </div>

              <!-- Info del Video -->
              <div class="video-info">
                <h2>${currentVideo.title}</h2>
                <p>${currentVideo.description}</p>
                <div class="video-meta">
                  <span>⏱️ ${currentVideo.duration}</span>
                </div>
                
                ${currentVideo.resources && currentVideo.resources.length > 0 ? `
                  <div class="video-resources">
                    <h4>Recursos adicionales:</h4>
                    <ul>
                      ${currentVideo.resources.map(resource => `
                        <li><a href="${resource.url}" target="_blank">${resource.title}</a></li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="video-actions">
                  ${completedVideos.includes(currentVideo.id) ? `
                    <button class="btn btn-success" disabled>✓ Completado</button>
                  ` : `
                    <button 
                      class="btn btn-primary" 
                      onclick="markVideoAsCompleted('${user.id}', '${masterId}', '${currentVideo.id}')">
                      Marcar como Completado
                    </button>
                  `}
                </div>
              </div>
            ` : `
              <div class="empty-state">
                <p>No hay videos disponibles en este módulo.</p>
              </div>
            `}
          </div>

          <!-- Lista de Videos del Módulo -->
          <div class="playlist-section">
            <h3>Videos del Módulo</h3>
            <div class="playlist">
              ${videos.map((video, index) => {
                const isActive = currentVideo && video.id === currentVideo.id;
                const isCompleted = completedVideos.includes(video.id);
                return `
                  <a href="/master/${masterId}/module/${moduleId}?video=${video.id}" 
                     data-link 
                     class="playlist-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                    <span class="playlist-number">${index + 1}</span>
                    <div class="playlist-info">
                      <span class="playlist-title">${video.title}</span>
                      <span class="playlist-duration">${video.duration}</span>
                    </div>
                    ${isCompleted ? '<span class="check-icon">✓</span>' : ''}
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    try {
      const iframe = document.querySelector('.video-player iframe');
      const user = (typeof AuthManager !== 'undefined' && AuthManager.getCurrentUser && AuthManager.getCurrentUser()) || null;
      const isPaid = !!( (user && (user.role === 'admin' || user.isPaid === true)) || (typeof window !== 'undefined' && window.MWI_IS_PAID) );
      if (!iframe || isPaid) return;
      const ensureVimeoApi = (ready) => {
        if (window.Vimeo && window.Vimeo.Player) return ready();
        const s = document.createElement('script');
        s.src = 'https://player.vimeo.com/api/player.js';
        s.onload = ready; document.head.appendChild(s);
      };
      const showGate = () => {
        let ov = document.getElementById('module-preview-gate');
        const box = document.querySelector('.video-player');
        if (!box) return;
        if (!ov) {
          ov = document.createElement('div');
          ov.id = 'module-preview-gate';
          ov.style.position = 'absolute'; ov.style.inset = '0'; ov.style.display = 'flex';
          ov.style.alignItems = 'center'; ov.style.justifyContent = 'center'; ov.style.background = 'rgba(0,0,0,.75)';
          ov.style.color = '#efe6d6'; ov.style.zIndex = '5'; ov.style.textAlign = 'center';
          ov.innerHTML = `<div style="max-width:520px; padding:16px;"><h3 style="margin:0 0 8px; color:#f6e9c9;">Contenido bloqueado</h3><p style="margin:0 0 12px; color:#cdbb9a;">Has visto el preview de 30 segundos. Afíliate para acceder al video completo y a todos los beneficios.</p><div style="display:flex; gap:8px; justify-content:center;"><button class="btn btn-primary" onclick="window.openAffiliationModal && window.openAffiliationModal()">Afiliarse ahora</button><button class="btn" onclick="Router.navigate('/pricing')">Ver planes</button></div></div>`;
        }
        if (!box.querySelector('#module-preview-gate')) box.appendChild(ov);
      };
      ensureVimeoApi(() => {
        try {
          const player = new window.Vimeo.Player(iframe);
          iframe.__mvBlocked = false;
          try { if (iframe.__mvTimer) { clearTimeout(iframe.__mvTimer); iframe.__mvTimer = null; } } catch {}
          player.on('play', () => {
            if (iframe.__mvBlocked) { player.pause().catch(()=>{}); showGate(); return; }
            try { if (iframe.__mvTimer) { clearTimeout(iframe.__mvTimer); } } catch {}
            iframe.__mvTimer = setTimeout(() => {
              iframe.__mvBlocked = true;
              player.pause().catch(()=>{});
              showGate();
            }, 30000);
          });
          player.on('pause', () => { if (iframe.__mvBlocked) showGate(); });
          player.on('loaded', () => { iframe.__mvBlocked = false; try { if (iframe.__mvTimer) clearTimeout(iframe.__mvTimer); iframe.__mvTimer=null; } catch {} });
          player.on('ended', () => { try { if (iframe.__mvTimer) clearTimeout(iframe.__mvTimer); iframe.__mvTimer=null; } catch {} });
          player.on('timeupdate', (d) => {
            if (!iframe.__mvBlocked && d && typeof d.seconds === 'number' && d.seconds >= 30) {
              iframe.__mvBlocked = true;
              player.pause().catch(() => {});
              showGate();
            }
          });
        } catch (e) { console.error('ModuleView gate error:', e); }
      });
    } catch (e) { console.error(e); }
  }
};

/**
 * Función global para marcar video como completado
 */
function markVideoAsCompleted(userId, masterId, videoId) {
  StorageManager.markVideoAsCompleted(userId, masterId, videoId);
  Utils.showSuccess('Video marcado como completado');
  // Recargar la página para actualizar el UI
  Router.reload();
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModuleViewPage;
}

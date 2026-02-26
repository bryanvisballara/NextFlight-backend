/**
 * PÁGINA: 404 - NO ENCONTRADA
 * 
 * Página mostrada cuando una ruta no existe.
 */

const NotFoundPage = {
  /**
   * Renderiza la página 404
   */
  render() {
    const isAuthenticated = AuthManager.isAuthenticated();

    return `
      ${isAuthenticated ? Sidebar.render() : Header.render()}
      
      <div class="${isAuthenticated ? 'main-content' : 'page-content'}">
        <div class="not-found-page">
          <div class="not-found-content">
            <h1 class="not-found-title">404</h1>
            <h2>Página No Encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>

            <!-- Mostrar la ruta solicitada para debugging -->
            <p class="not-found-path" style="font-size:12px;color:#888;margin-top:8px;">
              Intentaste: ${typeof window !== 'undefined' ? (window.location.hash || window.location.pathname) : ''}
            </p>

            <div class="not-found-actions">
              ${isAuthenticated ? `
                <a href="/dashboard" data-link class="btn btn-primary">Ir al Dashboard</a>
              ` : `
                <a href="/" data-link class="btn btn-primary">Volver al Inicio</a>
              `}
              <!-- botón adicional para reintentar (handler en init) -->
              <button class="btn btn-secondary btn-retry" type="button" style="margin-left:10px;">Reintentar</button>
            </div>
          </div>
        </div>
      </div>

      ${!isAuthenticated ? Footer.render() : ''}
    `;
  },

  /**
   * Inicializa la página
   */
  init() {
    // Log para depuración cuando se renderiza la 404
    try { console.warn('[NotFoundPage] rendered for', window.location.href); } catch (e) {}

    // Intento único automático cuando existe un hash (evita bucles con sessionStorage)
    const currentHash = (typeof location !== 'undefined' && location.hash) ? location.hash : '';
    const retryKey = '__mwi_notfound_retry';
    if (currentHash && currentHash !== '#/' && typeof sessionStorage !== 'undefined' && !sessionStorage.getItem(retryKey)) {
      try {
        sessionStorage.setItem(retryKey, '1');
      } catch (e) {}
      setTimeout(() => {
        if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
          Router.navigate(currentHash.replace(/^#/, ''));
        } else {
          // fallback a navegación completa
          try {
            const target = currentHash.startsWith('#') ? currentHash.slice(1) : currentHash || '/';
            window.location.href = target;
          } catch (e) { /* ignore */ }
        }
        // limpiar flag después de unos segundos
        setTimeout(() => { try { sessionStorage.removeItem(retryKey); } catch (e) {} }, 4000);
      }, 200);
    }

    // Handler del botón "Reintentar"
    const retryBtn = document.querySelector('.not-found-actions .btn-retry');
    if (retryBtn && !retryBtn.__hasHandler) {
      retryBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') Router.navigate('/');
        else window.location.href = '/';
      });
      retryBtn.__hasHandler = true;
    }
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotFoundPage;
}
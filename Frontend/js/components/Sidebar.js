/**
 * COMPONENTE SIDEBAR
 * 
 * Barra lateral de navegación para el portal del alumno.
 * Muestra el menú de navegación y la información del usuario.
 */

const Sidebar = {
  /**
   * Renderiza el sidebar
   * @returns {string} HTML del sidebar
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user) return '';

    const isAdmin = user.role === 'admin';
    const initials = Utils.getInitials(user.firstName || user.name || '', user.lastName || '');
    const currentPath = Router.currentRoute;

    return `
      <aside class="sidebar">
        <!-- Header del sidebar con información del usuario -->
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <h2>MWI</h2>
          </div>
          <div class="user-info">
            <div class="user-avatar">
              ${user.avatar ? `<img src="${user.avatar}" alt="${user.firstName || user.name || ''}">` : `<span>${initials}</span>`}
            </div>
            <div class="user-details">
              <p class="user-name">${(user.firstName || '')} ${(user.lastName || '')}</p>
              <p class="user-role">${isAdmin ? 'Administrador' : 'Alumno'}</p>
            </div>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="sidebar-nav">
          ${isAdmin ? this.renderAdminMenu(currentPath) : this.renderStudentMenu(currentPath)}
        </nav>

        <!-- Footer del sidebar -->
        <div class="sidebar-footer">
          <button class="btn-logout" onclick="handleLogout()">
            <span class="icon">➤</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    `;
  },

  /**
   * Renderiza el menú para alumnos
   */
  renderStudentMenu(currentPath) {
    const user = AuthManager.getCurrentUser();
    const isPaid = !!(user && user.isPaid);
    const menuItems = [
      { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
      { path: '/masters', icon: '🎓', label: 'Mis Masters' },
      { path: '/podcast', icon: '🎧', label: 'MW Podcast' },
      { path: '/services', icon: '⭐', label: 'Servicios' },
      { path: '/messages', icon: '✉️', label: 'Mensajes' },
      { path: '/notifications', icon: '🔔', label: 'Notificaciones' },
      { path: '/support', icon: '💬', label: 'Soporte' }
    ];

    // Condicional: mostrar Partner Center solo si el usuario es pago
    if (isPaid) {
      menuItems.splice(4, 0, { path: '/partner-center', icon: '🤝', label: 'MWI Partner Center' });
      menuItems.splice(5, 0, { path: '/inner-circle', icon: '📈', label: 'MWI Inner Circle' });
    }

    return menuItems.map(item => {
      const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
      const extraClass = item.path === '/partner-center' ? ' partner-link' : '';
      const extraStyle = item.path === '/partner-center' ? ' style="color:#00a35c;"' : '';
      return `
        <a href="${item.path}" 
           data-link 
           class="nav-item${extraClass} ${isActive ? 'active' : ''}"${extraStyle}>
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `;
    }).join('');
  },

  /**
   * Renderiza el menú para administradores
   */
  renderAdminMenu(currentPath) {
    const menuItems = [
      { path: '#/admin', icon: '🏠', label: 'Dashboard' },
      { path: '#/admin/users', icon: '👥', label: 'Usuarios' },
      { path: '#/admin/masters', icon: '🎓', label: 'Masters' },
      { path: '#/admin/podcast', icon: '🎧', label: 'Podcast' },
      { path: '#/admin/mentors', icon: '🧑‍🏫', label: 'Mentores' },
      { path: '#/admin/live-sessions', icon: '📺', label: 'Sesiones en vivo' },
      { path: '#/admin/config', icon: '⚙️', label: 'Pricing & Email marketing' },
      { path: '#/admin/history-payments', icon: '📄', label: 'Histórico de pagos' }
    ];

    return menuItems.map(item => {
      const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
      return `
        <a href="${item.path}" 
           data-link 
           class="nav-item ${isActive ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `;
    }).join('');
  }
};

/**
 * Handler global para cerrar sesión
 */
function handleLogout() {
  try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
  try { localStorage.removeItem('mwi:token'); } catch {}
  try { Utils.showSuccess('Sesión cerrada correctamente.'); } catch {}
  try {
    if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
      Router.navigate('/');
    } else {
      window.location.hash = '#/';
    }
  } catch {}
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sidebar;
}
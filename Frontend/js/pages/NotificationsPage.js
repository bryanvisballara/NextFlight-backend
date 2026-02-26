/**
 * PÁGINA: NOTIFICACIONES
 * 
 * Vista de notificaciones del usuario (mock).
 */

const NotificationsPage = {
  /**
   * Renderiza la página de notificaciones
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user) {
      Router.navigate('/login');
      return '';
    }

    const notifications = StorageManager.getUserNotifications(user.id);

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>🔔 Notificaciones</h1>
          <p>Mantente al día con tus actualizaciones</p>
        </div>

        <div class="notifications-content">
          ${notifications.length > 0 ? `
            <div class="notifications-list">
              ${notifications.map(notif => this.renderNotificationCard(notif)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <p>No tienes notificaciones todavía.</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una card de notificación
   */
  renderNotificationCard(notif) {
    const date = Utils.formatDate(notif.createdAt, 'long');
    const time = Utils.formatDate(notif.createdAt, 'time');

    const typeIcons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      podcast: '🎧'
    };

    const icon = typeIcons[notif.type] || typeIcons.info;

    return `
      <div class="notification-card ${notif.read ? 'read' : 'unread'}">
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
          <h4>${notif.title}</h4>
          <p>${notif.message}</p>
          <span class="notification-date">${date} ${time}</span>
        </div>
        ${!notif.read ? '<span class="unread-dot"></span>' : ''}
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
  module.exports = NotificationsPage;
}
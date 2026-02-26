/**
 * PÁGINA: MENSAJES
 * 
 * Vista de mensajes del usuario (mock).
 */

const MessagesPage = {
  /**
   * Renderiza la página de mensajes
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user) {
      Router.navigate('/login');
      return '';
    }

    const messages = StorageManager.getUserMessages(user.id);

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>✉️ Mensajes</h1>
          <p>Tu buzón de mensajes</p>
        </div>

        <div class="messages-content">
          ${messages.length > 0 ? `
            <div class="messages-list">
              ${messages.map(message => this.renderMessageCard(message)).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <p>No tienes mensajes todavía.</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  /**
   * Renderiza una card de mensaje
   */
  renderMessageCard(message) {
    const date = Utils.formatDate(message.createdAt, 'long');
    const time = Utils.formatDate(message.createdAt, 'time');

    return `
      <div class="message-card ${message.read ? 'read' : 'unread'}">
        <div class="message-header">
          <span class="message-from"><strong>${message.from}</strong></span>
          <span class="message-date">${date} ${time}</span>
        </div>
        <h3 class="message-subject">${message.subject}</h3>
        <p class="message-body">${message.body}</p>
        ${!message.read ? '<span class="unread-badge">Nuevo</span>' : ''}
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
  module.exports = MessagesPage;
}
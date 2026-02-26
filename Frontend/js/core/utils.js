/**
 * UTILIDADES GENERALES
 * 
 * Funciones auxiliares reutilizables en toda la aplicación.
 */

const Utils = {
  /**
   * Formatea una fecha en español
   * @param {string} dateString - Fecha en formato ISO
   * @param {string} format - Formato deseado ('short', 'long', 'time')
   * @returns {string} Fecha formateada
   */
  formatDate(dateString, format = 'short') {
    const date = new Date(dateString);
    
    const options = {
      short: { year: 'numeric', month: '2-digit', day: '2-digit' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit' }
    };

    return date.toLocaleDateString('es-ES', options[format] || options.short);
  },

  /**
   * Formatea duración de video (mm:ss)
   * @param {string} duration - Duración (ej: '15:30')
   * @returns {string} Duración formateada
   */
  formatDuration(duration) {
    return duration;
  },

  /**
   * Trunca un texto a un número máximo de caracteres
   * @param {string} text - Texto a truncar
   * @param {number} maxLength - Longitud máxima
   * @returns {string} Texto truncado
   */
  truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  /**
   * Genera un color aleatorio en formato hex
   * @returns {string} Color hex
   */
  randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  },

  /**
   * Genera iniciales desde un nombre completo
   * @param {string} firstName - Nombre
   * @param {string} lastName - Apellido
   * @returns {string} Iniciales
   */
  getInitials(firstName, lastName) {
    const f = (typeof firstName === 'string' && firstName.trim()) ? firstName.trim() : '';
    const l = (typeof lastName === 'string' && lastName.trim()) ? lastName.trim() : '';
    if (!f && !l) return '';
    if (f && l) return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();
    const single = f || l;
    const parts = single.split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    return parts[0].charAt(0).toUpperCase();
  },

  /**
   * Valida si una cadena está vacía
   * @param {string} str - Cadena a validar
   * @returns {boolean}
   */
  isEmpty(str) {
    return !str || str.trim().length === 0;
  },

  /**
   * Sanitiza HTML para prevenir XSS
   * @param {string} str - Cadena a sanitizar
   * @returns {string} Cadena sanitizada
   */
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Muestra un mensaje de éxito temporal
   * @param {string} message - Mensaje a mostrar
   */
  showSuccess(message) {
    this.showToast(message, 'success');
  },

  /**
   * Muestra un mensaje de error temporal
   * @param {string} message - Mensaje a mostrar
   */
  showError(message) {
    this.showToast(message, 'error');
  },

  /**
   * Muestra un mensaje de información temporal
   * @param {string} message - Mensaje a mostrar
   */
  showInfo(message) {
    this.showToast(message, 'info');
  },

  /**
   * Muestra un popup modal con un mensaje.
   * Si el modal global está disponible, lo usa; si no, hace fallback a alert().
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del popup
   */
  showPopup(message, title = 'Aviso') {
    const safeMsg = this.escapeHtml(String(message || ''));
    const safeTitle = this.escapeHtml(String(title || ''));
    if (typeof window !== 'undefined' && typeof window.openAuthModal === 'function') {
      const html = `
        <div style="padding:22px; color:#efe6d6;">
          <h3 style="margin:0 0 8px; color:#f6e9c9;">${safeTitle}</h3>
          <p style="margin:0 0 14px; color:#cdbb9a;">${safeMsg}</p>
          <div style="text-align:right;">
            <button class="btn btn-primary" onclick="closeAuthModal()">Entendido</button>
          </div>
        </div>`;
      try { window.openAuthModal(html); return; } catch (e) {}
    }
    try { alert(`${title}\n\n${message}`); } catch (e) { console.error('Popup fallback error', e); }
  },

  /**
   * Popup específico de error.
   * @param {string} message - Mensaje de error
   */
  showPopupError(message) {
    this.showPopup(message, 'Error');
  },

  /**
   * Muestra un popup de confirmación con botones Aceptar/Cancelar.
   * Usa el modal global si está disponible; fallback a window.confirm.
   * @param {string} message
   * @param {string} title
   * @param {Function} onYes
   * @param {Function} onNo
   */
  showConfirm(message, title = 'Confirmación', onYes = null, onNo = null) {
    const safeMsg = this.escapeHtml(String(message || ''));
    const safeTitle = this.escapeHtml(String(title || ''));
    // Modal integrado
    if (typeof window !== 'undefined' && typeof window.openAuthModal === 'function') {
      const html = `
        <div style="padding:22px; color:#efe6d6;">
          <h3 style="margin:0 0 8px; color:#f6e9c9;">${safeTitle}</h3>
          <p style="margin:0 0 14px; color:#cdbb9a;">${safeMsg}</p>
          <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button id="mwi-confirm-cancel" class="btn btn-secondary">Cancelar</button>
            <button id="mwi-confirm-yes" class="btn btn-primary">Sí, eliminar</button>
          </div>
        </div>`;
      try {
        window.openAuthModal(html);
        setTimeout(() => {
          try {
            const yesBtn = document.getElementById('mwi-confirm-yes');
            const cancelBtn = document.getElementById('mwi-confirm-cancel');
            yesBtn && yesBtn.addEventListener('click', () => { try { window.closeAuthModal(); } catch {} if (typeof onYes === 'function') onYes(); });
            cancelBtn && cancelBtn.addEventListener('click', () => { try { window.closeAuthModal(); } catch {} if (typeof onNo === 'function') onNo(); });
          } catch (e) {}
        }, 10);
        return;
      } catch (e) {}
    }
    // Fallback confirm
    try {
      const ok = window.confirm(`${title}\n\n${message}`);
      if (ok) { if (typeof onYes === 'function') onYes(); }
      else { if (typeof onNo === 'function') onNo(); }
    } catch (e) {
      // Último recurso: popup simple
      this.showPopup(message, title);
    }
  },

  /**
   * Sistema de toast/notificaciones
   * @param {string} message - Mensaje
   * @param {string} type - Tipo (success, error, info)
   */
  showToast(message, type = 'info') {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Añadir al contenedor
    toastContainer.appendChild(toast);

    // Animar entrada
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Remover después de 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  },

  /**
   * Debounce para limitar ejecución de funciones
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @returns {Function}
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Genera un ID único
   * @returns {string}
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Crea un elemento HTML desde una cadena
   * @param {string} html - HTML string
   * @returns {Element}
   */
  createElementFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  },

  /**
   * Añade listener a múltiples elementos
   * @param {string} selector - Selector CSS
   * @param {string} event - Evento
   * @param {Function} handler - Handler
   */
  addEventListenerAll(selector, event, handler) {
    document.querySelectorAll(selector).forEach(element => {
      element.addEventListener(event, handler);
    });
  },

  /**
   * Carga un script dinámicamente
   * @param {string} src - URL del script
   * @returns {Promise}
   */
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  /**
   * Obtiene un placeholder de imagen
   * @param {number} width - Ancho
   * @param {number} height - Alto
   * @param {string} text - Texto
   * @returns {string} URL de la imagen
   */
  getPlaceholderImage(width, height, text = 'MWI') {
    return `https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fb4s71j5einxskpnx32l1.jpg`;
  },

  /**
   * Copia texto al portapapeles
   * @param {string} text - Texto a copiar
   */
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showSuccess('Copiado al portapapeles');
      }).catch(() => {
        this.showError('Error al copiar');
      });
    } else {
      // Fallback para navegadores antiguos
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showSuccess('Copiado al portapapeles');
    }
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
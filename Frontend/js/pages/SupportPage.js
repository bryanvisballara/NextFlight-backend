/**
 * PÁGINA: SOPORTE
 * 
 * Página de contacto y soporte técnico.
 */

const SupportPage = {
  /**
   * Renderiza la página de soporte
   */
  render() {
    const user = AuthManager.getCurrentUser();
    if (!user) {
      Router.navigate('/login');
      return '';
    }

    return `
      ${Sidebar.render()}
      
      <div class="main-content">
        <div class="content-header">
          <h1>💬 Soporte</h1>
          <p>Estamos aquí para ayudarte</p>
        </div>

        <div class="support-content">
          <div class="support-grid">
            <!-- Formulario de Contacto -->
            <div class="support-form-card">
              <h2>Contáctanos</h2>
              <p>Envíanos tu consulta y te responderemos a la brevedad.</p>
              
              <form id="supportForm" class="support-form">
                <div class="form-group">
                  <label for="subject">Asunto</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    placeholder="Asunto de tu consulta"
                  />
                </div>

                <div class="form-group">
                  <label for="category">Categoría</label>
                  <select id="category" name="category" required>
                    <option value="">Selecciona una categoría</option>
                    <option value="technical">Soporte Técnico</option>
                    <option value="billing">Facturación</option>
                    <option value="content">Contenido</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    required 
                    placeholder="Describe tu consulta o problema..."
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-full">Enviar Mensaje</button>
              </form>
            </div>

            <!-- Información de Contacto -->
            <div class="support-info-card">
              <h3>Otras formas de contacto</h3>
              
              <div class="contact-method">
                <span class="contact-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>soporte@modernwealthinstitute.com</p>
                </div>
              </div>

              <div class="contact-method">
                <span class="contact-icon">📞</span>
                <div>
                  <strong>Teléfono</strong>
                  <p>+1 (555) 123-4567</p>
                  <small>Lunes a Viernes, 9:00 - 18:00</small>
                </div>
              </div>

              <div class="contact-method">
                <span class="contact-icon">💬</span>
                <div>
                  <strong>Chat en vivo</strong>
                  <p>Disponible en horario de oficina</p>
                </div>
              </div>

              <hr>

              <h3>Preguntas Frecuentes</h3>
              <ul class="faq-list">
                <li><a href="#">¿Cómo accedo a los videos?</a></li>
                <li><a href="#">¿Cómo descargo los recursos?</a></li>
                <li><a href="#">¿Puedo cambiar mi contraseña?</a></li>
                <li><a href="#">¿Cuánto tiempo tengo acceso?</a></li>
              </ul>
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
    const form = document.getElementById('supportForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(e.target);
    });
  },

  /**
   * Maneja el envío del formulario
   */
  handleSubmit(form) {
    const subject = form.subject.value;
    const category = form.category.value;
    const message = form.message.value;

    // Simulación de envío
    Utils.showSuccess('Mensaje enviado correctamente. Te contactaremos pronto.');
    form.reset();
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SupportPage;
}
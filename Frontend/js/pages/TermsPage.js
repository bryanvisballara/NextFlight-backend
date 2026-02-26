const TermsPage = {
  render() {
    return `
      ${Header.render()}
      <main class="terms-page" style="color:#efe6d6; padding:30px 16px; max-width:1100px; margin:0 auto;">
        <span class="mwi-badge">Términos & Condiciones</span>
        <h1 style="margin:8px 0 16px;">Términos y Condiciones de Modern Wealth Institute</h1>
        <p style="color:#cdbb9a;">Última actualización: 26 de diciembre de 2025</p>

        <section style="margin-top:20px;">
          <h2>1. Aceptación de los términos</h2>
          <p>Al acceder y utilizar la plataforma de Modern Wealth Institute ("MWI"), aceptas estos términos y condiciones. Si no estás de acuerdo, por favor no uses la plataforma.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>2. Cuenta y acceso</h2>
          <ul>
            <li>Debes proporcionar información veraz y mantener la seguridad de tus credenciales.</li>
            <li>MWI puede suspender o cancelar cuentas por incumplimiento de estos términos.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>3. Pagos y suscripciones</h2>
          <ul>
            <li>Los precios se muestran antes de la compra y pueden cambiar con previo aviso.</li>
            <li>Las suscripciones y accesos a programas son personales e intransferibles.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>4. Propiedad intelectual</h2>
          <p>Todos los contenidos (videos, materiales, textos, marcas) son propiedad de MWI o de sus licenciantes. Queda prohibida su reproducción o distribución sin autorización.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>5. Uso aceptable</h2>
          <ul>
            <li>No intentes vulnerar la seguridad, extraer datos de manera no autorizada, ni compartir accesos.</li>
            <li>Respeta a otros usuarios y al equipo de MWI en todos los canales.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>6. Limitación de responsabilidad</h2>
          <p>MWI ofrece educación y herramientas con fines formativos. Los resultados pueden variar y dependen de tu implementación. MWI no garantiza resultados específicos ni se responsabiliza por decisiones financieras o de negocio tomadas por el usuario.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>7. Privacidad</h2>
          <p>El tratamiento de datos personales se realiza conforme a nuestra Política de Privacidad. Consulta el documento para conocer tus derechos y cómo protegemos tu información.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>8. Modificaciones</h2>
          <p>MWI puede actualizar estos términos. Si el cambio es relevante, lo notificaremos por los canales disponibles. El uso posterior implica aceptación de la versión actualizada.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>9. Jurisdicción y contacto</h2>
          <p>Estos términos se rigen por las leyes aplicables en la jurisdicción de operación de MWI. Para consultas: soporte@modernwealth.institute.</p>
        </section>

        <div style="margin-top:24px;">
          <button class="mwi-btn mwi-btn-outline" data-link href="#/">Volver al inicio</button>
        </div>
      </main>
      ${Footer.render()}
    `;
  },
  after_render() {
    // No-op por ahora; se puede añadir lógica específica si es necesario
  }
};

if (typeof window !== 'undefined') window.TermsPage = TermsPage;
if (typeof module !== 'undefined' && module.exports) module.exports = TermsPage;

const PrivacyPage = {
  render() {
    return `
      ${Header.render()}
      <main class="privacy-page" style="color:#efe6d6; padding:30px 16px; max-width:1100px; margin:0 auto;">
        <span class="mwi-badge">Política de Privacidad</span>
        <h1 style="margin:8px 0 16px;">Política de Privacidad de Modern Wealth Institute</h1>
        <p style="color:#cdbb9a;">Última actualización: 26 de diciembre de 2025</p>

        <section style="margin-top:20px;">
          <h2>1. Información que recolectamos</h2>
          <ul>
            <li>Datos de registro: nombre, correo, teléfono y preferencias.</li>
            <li>Datos de uso: progreso de cursos, interacción con contenido y métricas técnicas.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>2. Finalidad del tratamiento</h2>
          <ul>
            <li>Prestar y mejorar los servicios educativos.</li>
            <li>Gestionar cuentas, pagos, soporte y comunicaciones relevantes.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>3. Bases legales</h2>
          <p>Tratamos datos conforme a bases legales aplicables: cumplimiento contractual, consentimiento, intereses legítimos y obligaciones legales.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>4. Compartición y proveedores</h2>
          <p>Podemos compartir datos con proveedores que apoyan la operación (alojamiento, analítica, pagos), bajo acuerdos de confidencialidad y seguridad.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>5. Seguridad</h2>
          <p>Aplicamos medidas técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o alteración.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>6. Retención</h2>
          <p>Conservamos datos mientras exista una relación activa y por el tiempo necesario para cumplir obligaciones legales.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>7. Tus derechos</h2>
          <ul>
            <li>Acceso, rectificación, supresión, oposición y portabilidad, según aplique.</li>
            <li>Para ejercer derechos, contáctanos en soporte@modernwealth.institute.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>8. Cookies y analítica</h2>
          <p>Usamos cookies para recordar preferencias y mejorar la experiencia. Puedes gestionarlas desde tu navegador.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>9. Cambios a esta política</h2>
          <p>Actualizaremos esta política cuando sea necesario. Publicaremos la nueva versión y, si corresponde, notificaremos cambios relevantes.</p>
        </section>

        <div style="margin-top:24px;">
          <button class="mwi-btn mwi-btn-outline" data-link href="#/">Volver al inicio</button>
        </div>
      </main>
      ${Footer.render()}
    `;
  },
  after_render() {
    // No-op por ahora
  }
};

if (typeof window !== 'undefined') window.PrivacyPage = PrivacyPage;
if (typeof module !== 'undefined' && module.exports) module.exports = PrivacyPage;

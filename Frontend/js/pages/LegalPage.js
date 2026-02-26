const LegalPage = {
  render() {
    return `
      ${Header.render()}
      <main class="legal-page" style="color:#efe6d6; padding:30px 16px; max-width:1100px; margin:0 auto;">
        <span class="mwi-badge">Aviso Legal</span>
        <h1 style="margin:8px 0 16px;">Aviso Legal de Modern Wealth Institute</h1>
        <p style="color:#cdbb9a;">Última actualización: 26 de diciembre de 2025</p>

        <section style="margin-top:20px;">
          <h2>1. Titular del sitio</h2>
          <p>Modern Wealth Institute (MWI) es el titular del presente sitio web y de sus contenidos educativos. Para contacto oficial: soporte@modernwealth.institute.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>2. Naturaleza informativa y educativa</h2>
          <p>Los contenidos de MWI tienen fines formativos. No constituyen asesoramiento financiero, legal o fiscal. Las decisiones tomadas por el usuario son de su exclusiva responsabilidad.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>3. Propiedad intelectual</h2>
          <p>Las marcas, textos, diseños, videos y materiales son propiedad de MWI o de sus licenciantes. Queda prohibida su reproducción sin autorización expresa.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>4. Limitación de responsabilidad</h2>
          <p>MWI no garantiza resultados específicos derivados del uso de los contenidos. No nos responsabilizamos por pérdidas, daños o perjuicios derivados de decisiones basadas en la información presentada.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>5. Enlaces externos</h2>
          <p>El sitio puede contener enlaces a terceros. MWI no controla ni se responsabiliza por el contenido, políticas o prácticas de esos sitios.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>6. Condiciones de uso</h2>
          <p>El uso del sitio implica aceptar nuestras políticas y términos aplicables. El usuario se compromete a utilizar la plataforma de manera ética y conforme a la ley.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>7. Jurisdicción</h2>
          <p>Este aviso se rige por las leyes aplicables en la jurisdicción de operación de MWI. Controversias se resolverán ante los tribunales competentes.</p>
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

if (typeof window !== 'undefined') window.LegalPage = LegalPage;
if (typeof module !== 'undefined' && module.exports) module.exports = LegalPage;

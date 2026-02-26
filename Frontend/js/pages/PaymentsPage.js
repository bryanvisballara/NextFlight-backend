const PaymentsPage = {
  render() {
    return `
      ${Header.render()}
      <main class="payments-page" style="color:#efe6d6; padding:30px 16px; max-width:1100px; margin:0 auto;">
        <span class="mwi-badge">Política de Pagos</span>
        <h1 style="margin:8px 0 16px;">Política de Pagos de Modern Wealth Institute</h1>
        <p style="color:#cdbb9a;">Última actualización: 26 de diciembre de 2025</p>

        <section style="margin-top:20px;">
          <h2>1. Métodos de pago aceptados</h2>
          <p>Aceptamos tarjetas de crédito y débito, plataformas de pagos compatibles y otros métodos disponibles según tu país.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>2. Facturación y comprobantes</h2>
          <p>Emitimos comprobantes de pago y/o facturas conforme a la normativa aplicable. Para solicitudes de facturación, contáctanos en soporte@modernwealth.institute.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>3. Suscripciones y renovaciones</h2>
          <ul>
            <li>Las suscripciones se renuevan automáticamente cuando corresponda, salvo que canceles antes de la fecha de renovación.</li>
            <li>Puedes gestionar tu suscripción desde tu cuenta o solicitando soporte.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>4. Reembolsos</h2>
          <ul>
            <li>Los reembolsos se consideran caso por caso, según el programa y las políticas específicas informadas al momento de la compra.</li>
            <li>Para evaluar un reembolso, escríbenos dentro de los primeros 7 días desde la compra explicando tu situación.</li>
          </ul>
        </section>

        <section style="margin-top:20px;">
          <h2>5. Impagos y acceso</h2>
          <p>En caso de impago o cobros rechazados, el acceso al contenido puede ser suspendido hasta regularizar la situación.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>6. Seguridad de pagos</h2>
          <p>Trabajamos con proveedores confiables y aplicamos medidas de seguridad para procesar pagos de forma segura.</p>
        </section>

        <section style="margin-top:20px;">
          <h2>7. Contacto</h2>
          <p>Para cualquier consulta relacionada con pagos, contáctanos en soporte@modernwealth.institute.</p>
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

if (typeof window !== 'undefined') window.PaymentsPage = PaymentsPage;
if (typeof module !== 'undefined' && module.exports) module.exports = PaymentsPage;

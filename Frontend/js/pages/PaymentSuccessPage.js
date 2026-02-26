const PaymentSuccessPage = {
  render() {
    return `
      <div class="payment-success-page" style="min-height:60vh;padding:24px;color:#efe6d6;background:#0f0f0f;">
        ${Header.render(false, true, true, true)}
        <main style="max-width:900px;margin:20px auto;background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:12px;padding:20px;box-shadow:0 10px 26px rgba(0,0,0,.45);">
          <h1 style="margin:0 0 8px;color:#f6e9c9;">¡Felicidades! Ya eres miembro oficial del Modern Wealth Institute</h1>
          <p style="color:#e8dcc0;line-height:1.7;margin:0 0 10px;">
            Hoy no compraste una membresía. Tomaste una decisión consciente de crecimiento, disciplina y visión a largo plazo.
          </p>
          <ul style="color:#e8dcc0;line-height:1.7;margin:0 0 14px;padding-left:18px;">
            <li>Acceso completo a todos los masters actuales</li>
            <li>Acceso automático a futuros masters</li>
            <li>Actualizaciones permanentes sin costo adicional</li>
            <li>Plataforma privada 24/7</li>
            <li>Comunidad enfocada en crecimiento real</li>
          </ul>
          <div style="text-align:center;margin-top:14px;">
            <a id="ps-go-home" data-link href="/dashboard" style="display:inline-block;background:#d4a955;color:#2a1f0b;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:10px;border:1px solid rgba(212,169,85,.55);">Ir al Dashboard</a>
          </div>
        </main>
        ${Footer.render()}
      </div>
    `;
  },
  init() {
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
    // Sanitize / ignore MP query params; nothing else to do.
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaymentSuccessPage;
}

/**
 * PÁGINA: VERIFICACIÓN EXITOSA
 * Muestra confirmación de cuenta verificada y CTA para volver a Home.
 */

const VerificationSucessPage = {
  render() {
    return `
      ${Header.render(true)}
      <main style="min-height:60vh; background:linear-gradient(180deg,#080808,#0f0f0f); padding:40px 16px;">
        <section style="max-width:980px; margin:0 auto;">
          <div style="background:linear-gradient(180deg,#141212,#0f0d0c); border:1px solid rgba(212,169,85,0.18); border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,0.6); padding:28px; text-align:center; color:#efe6d6;">
            <h1 style="color:#f6e9c9; font-size:28px; font-weight:800; margin:6px 0 8px;">¡Correo verificado con éxito!</h1>
            <p style="color:#cdbb9a; font-size:16px; margin:0 0 4px;">Bienvenido al Modern Wealth Institute.</p>
            <p style="color:#cdbb9a; font-size:16px; margin:0 0 16px;">Tu cuenta está activa y lista para que accedas a nuestro contenido.</p>
            <button id="btn-go-home" type="button" style="appearance:none; border:none; padding:12px 18px; border-radius:8px; font-weight:800; letter-spacing:.4px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95);">
              Ir al home page
            </button>
          </div>
        </section>
      </main>
      ${Footer.render()}
    `;
  },
  after_render() {
    try { Header.init(); } catch {}
    const btn = document.getElementById('btn-go-home');
    if (btn && !btn.__hasHandler) {
      btn.addEventListener('click', (e) => {
        try { e.preventDefault(); } catch {}
        if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
          Router.navigate('/');
        } else {
          try { window.location.hash = '#/'; } catch {}
        }
      });
      btn.__hasHandler = true;
    }
  },
  init() {
    this.after_render();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = VerificationSucessPage;
}

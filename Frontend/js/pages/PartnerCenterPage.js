/**
 * PÁGINA: MWI Partner Center
 * Placeholder inicial con secciones y guardia de seguridad.
 */

const PartnerCenterPage = {
  render() {
    return `
      <div class="partner-center-page">
        ${Header.render(false, true, true, true)}
        <style>
          .partner-center-page .mwi-header { padding: 8px 0; height: 58px; }
          .partner-center-page .mwi-header .mwi-header-inner { height: 58px; display:grid; grid-template-columns: 210px 1fr; align-items:center; position:relative; }
          .partner-center-page .mwi-header .mwi-logo { justify-self:start; align-self:center; }
          .partner-center-page .menu-toggle { position:absolute; left:10px; top:70%; transform: translateY(-50%); width:46px; height:46px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; z-index: 2; }
          .partner-center-page .menu-toggle svg { width:24px; height:24px; stroke:#d4a955; fill:none; stroke-width:2; }
          .partner-center-page .mwi-header .mwi-header-actions { position:absolute !important; right:10px; top:70%; transform:translateY(-50%); z-index: 3; }
          .partner-center-page .mwi-header .mwi-header-actions .profile-btn { width:42px !important; height:42px !important; }
          .partner-center-page .mwi-header .mwi-header-actions .profile-menu { right:0; }
          /* Mobile: center logo in header */
          @media (max-width: 640px) {
            .partner-center-page .mwi-header .mwi-header-inner { grid-template-columns: 1fr; }
            .partner-center-page .mwi-header .mwi-logo { justify-self: center; }
          }
        </style>
        <main class="partner-center" style="min-height:60vh;padding:24px;color:#efe6d6;background:#0f0f0f;">
        <h1 style="margin:0 0 12px;color:#f6e9c9;">MWI Partner Center</h1>
        <style>
          /* Mobile layout: clean grid splits and centered text */
          @media (max-width: 640px) {
            .partner-center { padding: 16px !important; }
            .pc-overview-section h3, .pc-coupon-section h3 { text-align: center; }
            .pc-overview-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .pc-overview-grid > div { text-align: center; }
            .pc-coupon-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .pc-coupon-grid > div { text-align: center; }
            .pc-ranks-section h3, .pc-overrides-section h3, .pc-sales-section h3, .pc-payments-section h3 { text-align:center; }
            .pc-ranks-section ul, .pc-payments-section ul { text-align:center; padding-left:0 !important; list-style-position: inside; }
            .pc-ranks-section p { text-align:center; }
            .pc-overrides-section p, .pc-overrides-section ul { text-align:center; }
            /* Sales table: shrink and fit inside section */
            .pc-sales-section { padding: 10px !important; }
            .pc-sales-section table { width:100% !important; table-layout: fixed; font-size: 12px; }
            .pc-sales-section thead tr, .pc-sales-section tbody tr { display:grid; grid-template-columns: repeat(6, minmax(0, 1fr)); }
            .pc-sales-section th, .pc-sales-section td { text-align:center !important; padding: 6px !important; line-height: 1.2; word-break: break-word; }
            .pc-sales-section .pc-head-btn { display:inline-block; padding:2px 6px; border:1px solid rgba(209,161,86,.45); background:rgba(209,161,86,.10); color:#d4a955; border-radius:6px; font-weight:700; cursor:pointer; font-size:12px; line-height:1.1; }
            .pc-sales-section .pc-head-btn:hover { background:rgba(209,161,86,.18); border-color:rgba(209,161,86,.65); color:#ffffff; }
          }
        </style>

        <!-- Sección 1 – Overview -->
        <section class="pc-overview-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Overview</h3>
          <div class="pc-overview-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Ventas de la semana</div>
              <div id="pc-month-sales" style="color:#f6e9c9;font-weight:800;font-size:18px;">0</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Recompensa activa (%)</div>
              <div id="pc-commission-percent" style="color:#f6e9c9;font-weight:800;font-size:18px;">--</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Recompensas acumuladas (USD)</div>
              <div id="pc-total-comp" style="color:#f6e9c9;font-weight:800;font-size:18px;">$0</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Próximo pago</div>
              <div id="pc-next-pay-date" style="color:#f6e9c9;font-weight:800;font-size:18px;">--/--/----</div>
            </div>
          </div>
        </section>

        <!-- Sección 2 – Mi Cupón -->
        <section class="pc-coupon-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Mi Cupón</h3>
          <div class="pc-coupon-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Código</div>
              <div id="pc-coupon-code" style="color:#f6e9c9;font-weight:800;font-size:18px;">--</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Precio actual</div>
              <div id="pc-price-current" style="color:#f6e9c9;font-weight:800;font-size:18px;">USD --</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Precio con cupón</div>
              <div id="pc-price-discount" style="color:#f6e9c9;font-weight:800;font-size:18px;">USD --</div>
            </div>
            <div style="background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
              <div style="color:#cdbb9a;font-weight:700;">Descuento</div>
              <div style="color:#f6e9c9;font-weight:800;font-size:18px;">50%</div>
            </div>
          </div>
        </section>

        <!-- Sección 3 – 1. Recompensas directas -->
        <section class="pc-ranks-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">1. Recompensas directas</h3>
          <ul style="color:#e8dcc0;line-height:1.6; list-style:none; padding-left:0;">
            <li>Recibe actualmente el 40% de la compra de todos tus referidos</li>
          </ul>
        </section>

        <!-- Sección 3.1 – 2. Overrides de equipo -->
        <section class="pc-overrides-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">2. Overrides de equipo (ingresos por liderazgo)</h3>
          <p style="color:#e8dcc0; line-height:1.7;">
            En Modern Wealth Institute (MWI) no solo generas ingresos por tus ventas directas, sino también por el crecimiento y desempeño de tu equipo. El programa MWI Partners Center reconoce tu impacto como líder y mentor dentro de la comunidad mediante recompensas overrides.
          </p>
          <h4 style="color:#d4a955; margin:10px 0 6px;">¿Qué son los overrides?</h4>
          <p style="color:#cdbb9a; line-height:1.7;">
            Los overrides son bonificaciones adicionales que recibes cuando una persona que tú invitaste (o alguien invitado por esa persona) realiza una venta, siempre que exista una relación directa de referencia.
          </p>
          <h4 style="color:#d4a955; margin:10px 0 6px;">¿Cómo funcionan?</h4>
          <ul style="color:#e8dcc0; line-height:1.7;">
            <li><strong> Override 1:</strong> Recibes un 5% adicional por cada venta realizada por un Partner que tú hayas referido directamente.</li>
            <li><strong> Override 2:</strong> Recibes un 3% adicional por cada venta realizada por un Partner que haya sido referido por uno de tus referidos directos.</li>
            <li><strong> Override 3 en adelante:</strong> No generan recompensas.</li>
          </ul>
          <h4 style="color:#d4a955; margin:10px 0 6px;">Reglas importantes</h4>
          <ul style="color:#e8dcc0; line-height:1.7;">
            <li>Los overrides no reemplazan tu recompensa directa; son un beneficio adicional.</li>
            <li>Los overrides se aplican solo si existe una relación válida de referencia.</li>
            <li>El sistema tiene un límite máximo de recompensas por venta, lo que garantiza sostenibilidad y equidad para todos los MWI Partners.</li>
            <li>Las ventas reembolsadas no generan overrides.</li>
          </ul>
          <h4 style="color:#d4a955; margin:10px 0 6px;">¿Por qué existen los overrides?</h4>
          <ul style="color:#e8dcc0; line-height:1.7;">
            <li>Liderar también debe ser recompensado.</li>
            <li>Enseñar a otros a vender es más valioso que vender solo.</li>
            <li>El crecimiento en equipo crea ingresos más estables y escalables.</li>
          </ul>
          <h4 style="color:#d4a955; margin:10px 0 6px;">Conclusión</h4>
          <p style="color:#e8dcc0; line-height:1.7;">
            Mientras más personas ayudes a crecer, más crecen tus ingresos. En MWI no solo vendes, construyes un negocio.
          </p>
        </section>

        <!-- Sección 4 – Ventas y Recompensas -->
        <section class="pc-sales-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Ventas y Recompensas</h3>
          <style>
            /* Acciones en encabezados: estilo global (desktop + mobile) */
            .pc-sales-section .pc-head-btn { display:inline-block; padding:2px 6px; border:1px solid rgba(209,161,86,.45); background:rgba(209,161,86,.10); color:#d4a955; border-radius:6px; font-weight:700; cursor:pointer; font-size:12px; line-height:1.1; transition: color .15s ease, background .15s ease, border-color .15s ease; }
            .pc-sales-section .pc-head-btn:hover { background:rgba(209,161,86,.18); border-color:rgba(209,161,86,.65); color:#ffffff; }
          </style>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="color:#cdbb9a;text-align:left;">
                <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.22);">Fecha</th>
                <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.22);"><span id="pc-head-direct" class="pc-head-btn">40% recompensa</span></th>
                <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.22);"><span id="pc-head-ov1" class="pc-head-btn">Override 1</span></th>
                <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.22);"><span id="pc-head-ov2" class="pc-head-btn">Override 2</span></th>
                <th style="padding:8px;border-bottom:1px solid rgba(212,169,85,.22);">Recompensa total</th>
              </tr>
            </thead>
            <tbody>
              <tr style="color:#e8dcc0;">
                <td id="pc-table-date" style="padding:8px;">--</td>
                <td style="padding:8px;">
                  <div id="pc-table-percent">$0</div>
                </td>
                <td style="padding:8px;">
                  <div id="pc-table-ov1">$0</div>
                </td>
                <td style="padding:8px;">
                  <div id="pc-table-ov2">$0</div>
                </td>
                <td id="pc-table-total" style="padding:8px;">$0</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Sección 5 – Pagos -->
        <section class="pc-payments-section" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Pagos</h3>
          <ul style="color:#e8dcc0;line-height:1.6;">
            <li>Pagos semanales</li>
            <li>Reembolsos no generan recompensas</li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- Sección 5.1 – Historial de pagos -->
        <section class="pc-payments-history" style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Historial de pagos</h3>
          <style>
            .pc-payments-history table { width:100%; border-collapse:collapse; }
            .pc-payments-history th, .pc-payments-history td { padding:8px; border-bottom:1px solid rgba(212,169,85,.22); color:#e8dcc0; text-align:left; }
            @media (max-width:640px) {
              .pc-payments-history th, .pc-payments-history td { font-size:12px; padding:6px; text-align:center; }
              .pc-payments-history thead tr, .pc-payments-history tbody tr { display:grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
            }
          </style>
          <table>
            <thead>
              <tr style="color:#cdbb9a;">
                <th>Fecha</th>
                <th>Periodo</th>
                <th>Monto pagado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody id="pc-payments-history-body">
              <tr><td colspan="4" style="text-align:center;color:#cdbb9a;">Sin pagos registrados</td></tr>
            </tbody>
          </table>
        </section>

        <!-- Sección 6 – Selecciona tu método de depósito -->
        <section style="background:#141212;border:1px solid rgba(212,169,85,.18);border-radius:10px;padding:12px;margin-bottom:16px;">
          <h3 style="margin-top:0;color:#f6e9c9;">Selecciona tu método de depósito</h3>
          <style>
            /* Radios: apariencia consistente y elegante, especialmente en móvil */
            .pc-radio { appearance:none; -webkit-appearance:none; width:18px; height:18px; border-radius:50%; border:2px solid rgba(212,169,85,.6); background:transparent; display:inline-block; position:relative; flex:0 0 auto; }
            .pc-radio:focus { outline:none; box-shadow:0 0 0 3px rgba(212,169,85,.15); }
            .pc-radio:checked { border-color:#d4a955; background:rgba(212,169,85,.10); }
            .pc-radio:checked::after { content:''; position:absolute; left:50%; top:50%; width:8px; height:8px; transform:translate(-50%,-50%); border-radius:50%; background:#d4a955; }
            @media (max-width:640px) {
              .pc-radio { width:16px; height:16px; border-width:2px; }
              .pc-radio:checked::after { width:6px; height:6px; }
              /* Evitar desalineación de texto en móvil */
              .pc-radio + span { line-height:1.2; }
            }
          </style>
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px;">
            <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;">
              <input class="pc-radio" type="radio" name="pc-deposit-method" id="pc-method-usdt" value="USDT" aria-label="USDT BEP20"/>
              <span>USDT BEP20</span>
            </label>
            <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;">
              <input class="pc-radio" type="radio" name="pc-deposit-method" id="pc-method-usa" value="USA" aria-label="USA BANK"/>
              <span>USA BANK</span>
            </label>
            <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;">
              <input class="pc-radio" type="radio" name="pc-deposit-method" id="pc-method-col" value="CO" aria-label="COLOMBIA BANK"/>
              <span>COLOMBIA BANK</span>
            </label>
          </div>

          <div id="pc-form-usdt" style="display:none;background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;margin-bottom:10px;">
            <div style="color:#cdbb9a;font-weight:700;margin-bottom:8px;">USDT BEP20</div>
            <input id="pc-usdt-wallet" type="text" placeholder="Wallet USDT BEP20 (BEP20 / BSC)" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button id="pc-save-usdt" style="padding:10px 12px;border-radius:8px;background:#d4a955;color:#0f0f0f;border:none;font-weight:700;cursor:pointer;">Guardar</button>
            </div>
          </div>

          <div id="pc-form-usa" style="display:none;background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;margin-bottom:10px;">
            <div style="color:#cdbb9a;font-weight:700;margin-bottom:8px;">USA BANK</div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
              <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;"><input class="pc-radio" type="radio" name="pc-usa-type" id="pc-usa-type-individual" value="individual" aria-label="Cuenta individual"/> <span>Individual</span></label>
              <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;"><input class="pc-radio" type="radio" name="pc-usa-type" id="pc-usa-type-business" value="business" aria-label="Cuenta business"/> <span>Business</span></label>
            </div>
            <div id="pc-form-usa-individual" style="display:none;">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                <input id="pc-usa-ind-first" type="text" placeholder="Recipient first name" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-usa-ind-last" type="text" placeholder="Recipient last name" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-usa-ind-routing" type="text" placeholder="ACH routing number" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-usa-ind-account" type="text" placeholder="ACH account number" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
              </div>
            </div>
            <div id="pc-form-usa-business" style="display:none;">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                <input id="pc-usa-bus-name" type="text" placeholder="Business name" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <span></span>
                <input id="pc-usa-bus-routing" type="text" placeholder="ACH routing number" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-usa-bus-account" type="text" placeholder="ACH account number" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button id="pc-save-usa" style="padding:10px 12px;border-radius:8px;background:#d4a955;color:#0f0f0f;border:none;font-weight:700;cursor:pointer;">Guardar</button>
            </div>
          </div>

          <div id="pc-form-col" style="display:none;background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;margin-bottom:10px;">
            <div style="color:#cdbb9a;font-weight:700;margin-bottom:8px;">COLOMBIA BANK</div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">
              <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;"><input class="pc-radio" type="radio" name="pc-col-type" id="pc-col-type-natural" value="natural" aria-label="Persona natural"/> <span>Natural</span></label>
              <label style="display:flex;align-items:center;gap:8px;color:#e8dcc0;cursor:pointer;"><input class="pc-radio" type="radio" name="pc-col-type" id="pc-col-type-juridica" value="juridica" aria-label="Persona jurídica"/> <span>Jurídica</span></label>
            </div>
            <div id="pc-form-col-natural" style="display:none;">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                <input id="pc-col-nat-first" type="text" placeholder="Nombre" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-nat-last" type="text" placeholder="Apellido" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-nat-doc" type="text" placeholder="Documento de identidad" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-nat-bank" type="text" placeholder="Nombre de banco" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-nat-type" type="text" placeholder="Tipo de cuenta" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-nat-account" type="text" placeholder="Número de cuenta" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
              </div>
            </div>
            <div id="pc-form-col-juridica" style="display:none;">
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                <input id="pc-col-jur-name" type="text" placeholder="Nombre de la empresa" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-jur-nit" type="text" placeholder="NIT (sin dígito de verificación)" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-jur-bank" type="text" placeholder="Nombre de banco" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-jur-type" type="text" placeholder="Tipo de cuenta" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
                <input id="pc-col-jur-account" type="text" placeholder="Número de cuenta" style="padding:10px;border-radius:8px;border:1px solid rgba(212,169,85,.22);background:#0f0f0f;color:#f6e9c9;"/>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button id="pc-save-col" style="padding:10px 12px;border-radius:8px;background:#d4a955;color:#0f0f0f;border:none;font-weight:700;cursor:pointer;">Guardar</button>
            </div>
          </div>

          <!-- Resumen del método seleccionado -->
          <div id="pc-payout-summary" style="display:none;background:#12100f;border:1px solid rgba(212,169,85,.22);border-radius:8px;padding:12px;">
            <div style="color:#cdbb9a;font-weight:700;margin-bottom:6px;">Método de depósito seleccionado:</div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div id="pc-payout-selected" style="color:#f6e9c9;font-weight:800;">--</div>
              <button id="pc-payout-remove" style="appearance:none;border:1px solid rgba(209,161,86,.55);background:rgba(209,161,86,.08);color:#e8dcc0;padding:8px 12px;border-radius:8px;font-weight:700;cursor:pointer;">Eliminar</button>
            </div>
          </div>
        </section>
        <!-- Toast y Modal de confirmación -->
        <style>
          .pc-toast { display:none; position:fixed; left:50%; transform:translateX(-50%); bottom:20px; background:#141212; color:#f6e9c9; border:1px solid rgba(212,169,85,.22); border-radius:8px; padding:10px 14px; z-index:1001; box-shadow:0 10px 26px rgba(0,0,0,.45); }
          .pc-modal { display:none; position:fixed; inset:0; z-index:1002; }
          .pc-modal.open { display:block; }
          .pc-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .pc-modal .content { position:relative; max-width:460px; margin:80px auto; background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45); padding:16px; }
          .pc-modal .title { color:#f6e9c9; font-size:18px; font-weight:800; margin:0 0 8px; }
          .pc-modal .msg { color:#e8dcc0; line-height:1.5; }
          .pc-modal .actions { display:flex; gap:10px; margin-top:12px; justify-content:flex-end; }
          .pc-modal .btn { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:10px 14px; border-radius:8px; font-weight:700; cursor:pointer; }
          .pc-modal .btn.primary { border-color: rgba(209,161,86,.95); background:linear-gradient(180deg,#D1A156,#7A5A22); color:#2a1f0b; }
        </style>
        <div id="pc-save-toast" class="pc-toast">Guardado</div>
        <div id="pc-confirm-modal" class="pc-modal" role="dialog" aria-hidden="true">
          <div class="overlay" data-close="true"></div>
          <div class="content" role="document">
            <div class="title">Confirmación</div>
            <div id="pc-confirm-msg" class="msg">¿Deseas confirmar?</div>
            <div class="actions">
              <button id="pc-confirm-cancel" class="btn">Cancelar</button>
              <button id="pc-confirm-accept" class="btn primary">Aceptar</button>
            </div>
          </div>
        </div>
        <!-- Modal de detalle de ingresos -->
        <style>
          .pc-detail-modal { display:none; position:fixed; inset:0; z-index:1003; }
          .pc-detail-modal.open { display:block; }
          .pc-detail-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .pc-detail-modal .content { position:relative; max-width:520px; margin:80px auto; background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45); padding:16px; }
          .pc-detail-modal .title { color:#f6e9c9; font-size:18px; font-weight:800; margin:0 0 8px; display:flex; justify-content:space-between; align-items:center; }
          .pc-detail-modal .close { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:6px 10px; border-radius:8px; font-weight:700; cursor:pointer; font-size:12px; }
          .pc-detail-modal table { width:100%; border-collapse:collapse; }
          .pc-detail-modal th, .pc-detail-modal td { padding:8px; border-bottom:1px solid rgba(212,169,85,.22); color:#e8dcc0; text-align:left; }
        </style>
        <div id="pc-detail-modal" class="pc-detail-modal" role="dialog" aria-hidden="true">
          <div class="overlay" data-close="true"></div>
          <div class="content" role="document">
            <div class="title"><span id="pc-detail-title">Detalle</span> <button id="pc-detail-close" class="close">Cerrar</button></div>
            <table>
              <thead>
                <tr style="color:#cdbb9a;">
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>% de recompensa</th>
                  <th>Recompensa total</th>
                </tr>
              </thead>
              <tbody id="pc-detail-body">
                <tr><td colspan="4" style="text-align:center;color:#cdbb9a;">Sin registros</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        </main>
        <!-- Sidebar overlay for Partner Center -->
        <style>
          .partner-sidebar { display:none; position:fixed; inset:0; z-index:1000; }
          .partner-sidebar.open { display:block; }
          .partner-sidebar .overlay { position:absolute; inset:0; background:rgba(0,0,0,.6); }
          .partner-sidebar aside { position:absolute; left:0; top:0; bottom:0; width:260px; padding:16px 12px; background:#0e0e0d; border-right:1px solid rgba(212,169,85,.18); box-shadow: 0 10px 26px rgba(0,0,0,.45); display:flex; flex-direction:column; }
          .partner-sidebar .nav-item { position:relative; padding:10px 8px; color:#d4a955; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; }
          .partner-sidebar .nav-item:hover { color:#f6e9c9; }
          .partner-sidebar .nav-item .icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
          .partner-sidebar .nav-bottom { margin-top:auto; border-top:1px solid rgba(212,169,85,.12); padding-top:8px; }
        </style>
        <div id="partner-sidebar" class="partner-sidebar" aria-hidden="true" role="dialog">
          <div class="overlay" data-close="true"></div>
          <aside>
            <div class="nav-items">
              <div class="nav-item" id="pc-nav-dashboard"><span class="icon"><svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg></span><span>Dashboard</span></div>
              <div class="nav-item" id="pc-nav-masters"><span class="icon"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg></span><span>Masters</span></div>
              <div class="nav-item" id="pc-nav-podcast"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 5a7 7 0 0 1 7 7v5"/><path d="M5 17v-5a7 7 0 0 1 7-7"/><circle cx="12" cy="12" r="3"/></svg></span><span>Podcast</span></div>
              <div class="nav-item" id="pc-nav-services"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></span><span>Servicios</span></div>
              <div class="nav-item" id="pc-nav-partner"><span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span>MWI Partner Center</span></div>
              <div class="nav-item" id="pc-nav-inner-circle"><span class="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span>MWI Inner Circle</span></div>
            </div>
            <div class="nav-bottom">
              <div class="nav-item" id="pc-nav-support"><span class="icon"><svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg></span><span>Soporte</span></div>
              <div class="nav-item" id="pc-nav-logout"><span class="icon"><svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg></span><span>Cerrar sesión</span></div>
            </div>
          </aside>
        </div>
        ${Footer.render()}
      </div>
    `;
  },
  async init() {
    // Seguridad: solo usuarios pagos (considera backend y flag global)
    const user = AuthManager.getCurrentUser();
    const localPaid = !!(user && user.isPaid);
    const flagPaid = !!(typeof window !== 'undefined' && window.MWI_IS_PAID);
    let isPaid = localPaid || flagPaid;
    try {
      const token = localStorage.getItem('mwi:token');
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      if (token) {
        const res = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const { user: me } = await res.json();
          isPaid = !!(me && me.isPaid);
          // Sync local storage for consistency
          try { if (user) { user.isPaid = isPaid; StorageManager.setCurrentUser(user); } } catch {}
        }
      }
    } catch {}
    if (!isPaid) { Router.navigate('/dashboard'); return; }
    // Inicializar header
    try { if (typeof Header !== 'undefined' && typeof Header.init === 'function') Header.init(); } catch {}
    // Fetch membership price (USD) from backend and update UI
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const r = await fetch(`${base}/api/config/pricing/membership`);
      const j = await r.json().catch(() => ({}));
      if (r.ok && j && typeof j.priceUSD === 'number') {
        const p = Number(j.priceUSD);
        const curEl = document.getElementById('pc-price-current');
        const discEl = document.getElementById('pc-price-discount');
        if (curEl) curEl.textContent = `USD ${p}`;
        if (discEl) discEl.textContent = `USD ${Math.round(p * 0.5)}`;
        // Also store for other components if needed
        try { window.MWI_MEMBERSHIP_PRICE_USD = p; } catch {}
      }
    } catch (e) { /* ignore network errors */ }
    // Helper: weekly boundaries ending Friday 18:00 America/Bogota
    const weeklyBoundaries = () => {
      const now = new Date();
      const bogotaOffsetMs = 5 * 60 * 60 * 1000;
      const bogotaRef = new Date(now.getTime() - bogotaOffsetMs);
      const day = bogotaRef.getUTCDay();
      const diffToFri = (5 - day + 7) % 7;
      const endUtcMs = Date.UTC(bogotaRef.getUTCFullYear(), bogotaRef.getUTCMonth(), bogotaRef.getUTCDate() + diffToFri, 23, 0, 0, 0);
      const startUtcMs = endUtcMs - (7 * 24 * 60 * 60 * 1000);
      return { start: new Date(startUtcMs), end: new Date(endUtcMs - 1) };
    };

    // Fetch commissions from backend and update weekly sales count (level 0)
    try {
      const token = localStorage.getItem('mwi:token') || '';
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      if (token) {
        const r = await fetch(`${base}/partner/commissions`, { headers: { Authorization: `Bearer ${token}` } });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j) {
          // Compute weekly sales count within current weekly boundaries (level 0 only)
          try {
            const list = Array.isArray(j.items) ? j.items : [];
            const { start, end } = weeklyBoundaries();
            const sEl = document.getElementById('pc-month-sales');
            const cnt = list.filter((it) => {
              const d = new Date(it.createdAt || it.updatedAt || Date.now());
              return Number(it.level) === 0 && d >= start && d <= end;
            }).length;
            if (sEl) sEl.textContent = String(cnt);
          } catch {}
        }
      }
    } catch {}
    // Weekly outstanding: commissions weekly - payments weekly (display in 'Recompensas acumuladas (USD)')
    try {
      const token = localStorage.getItem('mwi:token') || '';
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      if (token) {
        const { start, end } = weeklyBoundaries();
        const qs = new URLSearchParams({ start: start.toISOString(), end: end.toISOString() });
        const rW = await fetch(`${base}/partner/commissions/weekly?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
        const jW = await rW.json().catch(()=>({ summary: { total: 0 } }));
        let weekCommissionTotal = 0;
        if (rW.ok && jW && jW.summary && typeof jW.summary.total === 'number') {
          weekCommissionTotal = Number(jW.summary.total || 0);
        }
        const rP = await fetch(`${base}/partner/payments`, { headers: { Authorization: `Bearer ${token}` } });
        const jP = await rP.json().catch(()=>({ payments: [] }));
        const sTxt = start.toISOString().slice(0,10);
        const eTxt = end.toISOString().slice(0,10);
        const periodKey = `${sTxt} to ${eTxt}`;
        const payments = Array.isArray(jP.payments) ? jP.payments : [];
        const weekPaid = payments.filter(p => String(p.period || '') === periodKey)
          .reduce((acc, p) => acc + Number(p.amount || 0), 0);
        const outstanding = Math.max(0, Math.round((weekCommissionTotal - weekPaid) * 100) / 100);
        // Display weekly outstanding in the existing 'Recompensas acumuladas (USD)' card
        try {
          const totalEl = document.getElementById('pc-total-comp');
          if (totalEl) totalEl.textContent = `$${outstanding.toFixed(2)}`;
        } catch {}
      }
    } catch {}
    // Generar código de cupón inmodificable por regla: MWI-nombreSinEspacios-últimos4delTel
    try {
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      const token = localStorage.getItem('mwi:token');
      let name = (user && user.name) ? String(user.name) : '';
      let phone = (user && user.phone) ? String(user.phone) : '';
      // También capturar email para persistencia por usuario
      this.__userEmail = (user && user.email) ? String(user.email) : '';
      if (token && (!name || !phone)) {
        const res = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const { user: me } = await res.json();
          name = String(me && me.name || name || '');
          phone = String(me && me.phone || phone || '');
          this.__userEmail = String(me && me.email || this.__userEmail || '');
        }
      }
      const nameNoSpaces = (name || '').replace(/\s+/g, '');
      const last4 = (phone || '').replace(/\D/g, '').slice(-4) || '0000';
      const code = `MWI-${nameNoSpaces}-${last4}`;
      this.__couponCode = code;
      const el = document.getElementById('pc-coupon-code');
      if (el) el.textContent = code;
    } catch (e) { /* ignore */ }

    // Calcular ventas de la semana y rango + % recompensa
    try {
      const { start: weekStart, end: weekEnd } = weeklyBoundaries();
      let weeklySales = 0;
      // Intentar leer base local de ventas de partner si existe
      try {
        const raw = localStorage.getItem('mwi_partner_sales');
        if (raw) {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            weeklySales = arr.filter((it) => {
              const d = new Date(it.date || it.createdAt || it.fecha || 0);
              return d >= weekStart && d <= weekEnd;
            }).length;
          }
        }
      } catch {}
      // Determinar rango y porcentaje (placeholder)
      let rank = 'partner core';
      let percent = 30;
      if (weeklySales >= 6 && weeklySales <= 10) { rank = 'partner pro'; percent = 35; }
      else if (weeklySales >= 11) { rank = 'partner elite'; percent = 40; }
      // Actualizar Overview
      const rEl = document.getElementById('pc-rank-name');
      const sEl = document.getElementById('pc-month-sales');
      const pEl = document.getElementById('pc-commission-percent');
      if (rEl) rEl.textContent = rank;
      if (sEl) sEl.textContent = String(weeklySales);
      if (pEl) pEl.textContent = '40%';
      // Actualizar columna de % en tabla placeholder
      // Ventas y Recompensas: totales por semana (Sáb→Vier)
      try {
        const priceUSD = Number(window.MWI_MEMBERSHIP_PRICE_USD || 0);
        const { start: weekStart2, end: weekEnd2 } = weeklyBoundaries();
        const fmtDate = (d) => {
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          const yyyy = d.getFullYear();
          return `${mm}/${dd}/${yyyy}`;
        };
        const dateCell = document.getElementById('pc-table-date');
        if (dateCell) dateCell.textContent = `${fmtDate(weekStart2)} - ${fmtDate(weekEnd2)}`;
        // Fill the table with WEEKLY totals from backend
        try {
          const token = localStorage.getItem('mwi:token') || '';
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
          const qs = new URLSearchParams({ start: weekStart2.toISOString(), end: weekEnd2.toISOString() });
          if (token) {
            const rW = await fetch(`${base}/partner/commissions/weekly?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
            const jW = await rW.json().catch(()=>({ summary: {} }));
            if (rW.ok && jW && jW.summary) {
              const percentCell = document.getElementById('pc-table-percent');
              const ov1Cell = document.getElementById('pc-table-ov1');
              const ov2Cell = document.getElementById('pc-table-ov2');
              const totalCell = document.getElementById('pc-table-total');
              if (percentCell) percentCell.textContent = `$${Number(jW.summary.direct || 0).toFixed(2)}`;
              if (ov1Cell) ov1Cell.textContent = `$${Number(jW.summary.override1 || 0).toFixed(2)}`;
              if (ov2Cell) ov2Cell.textContent = `$${Number(jW.summary.override2 || 0).toFixed(2)}`;
              if (totalCell) totalCell.textContent = `$${Number(jW.summary.total || 0).toFixed(2)}`;
            }
          }
        } catch {}

        // Detalle modal
        const detailModal = document.getElementById('pc-detail-modal');
        const detailTitle = document.getElementById('pc-detail-title');
        const detailBody = document.getElementById('pc-detail-body');
        const detailClose = document.getElementById('pc-detail-close');
        const openDetail = async (kind) => {
          const empty = `<tr><td colspan="4" style="text-align:center;color:#cdbb9a;">Sin registros</td></tr>`;
          if (kind === 'direct') {
            try {
              const token = localStorage.getItem('mwi:token') || '';
              const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
              if (!token) { throw new Error('no token'); }
              const { start: weekStart2, end: weekEnd2 } = weeklyBoundaries();
              const qs = new URLSearchParams({ start: weekStart2.toISOString(), end: weekEnd2.toISOString() });
              const r = await fetch(`${base}/partner/commissions/direct?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
              const j = await r.json().catch(() => ({ items: [] }));
              const items = Array.isArray(j.items) ? j.items : [];
              const rows = items.map((it) => {
                const d = new Date(it.date || Date.now());
                const name = String(it.buyerName || '--');
                const pct = 40;
                const amt = Number(it.reward || 0);
                return `<tr><td>${fmtDate(d)}</td><td>${name}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
              }).join('');
              if (detailTitle) detailTitle.textContent = 'Detalle: 40% recompensa';
              if (detailBody) detailBody.innerHTML = rows || empty;
              if (detailModal) detailModal.classList.add('open');
              return;
            } catch {}
          }
          if (kind === 'ov1') {
            try {
              const token = localStorage.getItem('mwi:token') || '';
              const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
              if (!token) { throw new Error('no token'); }
              const { start: weekStart2, end: weekEnd2 } = weeklyBoundaries();
              const qs = new URLSearchParams({ start: weekStart2.toISOString(), end: weekEnd2.toISOString() });
              const r = await fetch(`${base}/partner/commissions/override1?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
              const j = await r.json().catch(() => ({ items: [] }));
              const items = Array.isArray(j.items) ? j.items : [];
              const rows = items.map((it) => {
                const d = new Date(it.date || Date.now());
                const leader = String(it.leaderName || '--');
                const referred = String(it.referredName || '--');
                const pct = 5;
                const amt = Number(it.reward || 0);
                const userCell = `Líder: ${leader} — Referido: ${referred}`;
                return `<tr><td>${fmtDate(d)}</td><td>${userCell}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
              }).join('');
              if (detailTitle) detailTitle.textContent = 'Detalle: Override 1 (5%)';
              if (detailBody) detailBody.innerHTML = rows || empty;
              if (detailModal) detailModal.classList.add('open');
              return;
            } catch {}
          }
          // Override 2 from backend
          try {
            const token = localStorage.getItem('mwi:token') || '';
            const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
            if (!token) { throw new Error('no token'); }
            const { start: weekStart2, end: weekEnd2 } = weeklyBoundaries();
            const qs = new URLSearchParams({ start: weekStart2.toISOString(), end: weekEnd2.toISOString() });
            const r = await fetch(`${base}/partner/commissions/override2?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
            const j = await r.json().catch(() => ({ items: [] }));
            const items = Array.isArray(j.items) ? j.items : [];
            const rows = items.map((it) => {
              const d = new Date(it.date || it.saleDate || it.createdAt || Date.now());
              const leader = String(it.leaderName || '--');
              const referred = String(it.referredName || '--');
              const pct = 3;
              const amt = Number(it.reward || it.amount || 0);
              const userCell = `Líder: ${leader} — Referido: ${referred}`;
              return `<tr><td>${fmtDate(d)}</td><td>${userCell}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
            }).join('');
            // Sync table cell with modal sum
            const totalOverride2 = items.reduce((acc, it) => acc + Number(it.reward || it.amount || 0), 0);
            const ov2Cell = document.getElementById('pc-table-ov2');
            if (ov2Cell) ov2Cell.textContent = `$${totalOverride2.toFixed(2)}`;
            if (detailTitle) detailTitle.textContent = 'Detalle: Override 2 (3%)';
            if (detailBody) detailBody.innerHTML = rows || empty;
            if (detailModal) detailModal.classList.add('open');
            return;
          } catch {}
          if (detailModal) detailModal.classList.add('open');
        };
        detailClose?.addEventListener('click', () => { try { detailModal.classList.remove('open'); } catch {} });
        detailModal?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { try { detailModal.classList.remove('open'); } catch {} } });
        document.getElementById('pc-head-direct')?.addEventListener('click', () => openDetail('direct'));
        document.getElementById('pc-head-ov1')?.addEventListener('click', () => openDetail('ov1'));
        document.getElementById('pc-head-ov2')?.addEventListener('click', () => openDetail('ov2'));
      } catch {}
      // Próximo pago: fecha del viernes de la semana actual
      try {
        const now = new Date();
        const day = now.getDay(); // 0=Sun ... 5=Fri
        const diff = (5 - day + 7) % 7; // days to next Friday (0 if today is Friday)
        const nextFriday = new Date(now);
        nextFriday.setDate(now.getDate() + diff);
        const mm = String(nextFriday.getMonth() + 1).padStart(2, '0');
        const dd = String(nextFriday.getDate()).padStart(2, '0');
        const yyyy = nextFriday.getFullYear();
        const text = `${mm}/${dd}/${yyyy}`;
        const npEl = document.getElementById('pc-next-pay-date');
        if (npEl) npEl.textContent = text;
      } catch {}
    } catch {}

    // Método de depósito: UI y persistencia
    try {
      const payoutKey = 'mwi_partner_payout';
      const getData = () => { try { const raw = localStorage.getItem(payoutKey); return raw ? JSON.parse(raw) : {}; } catch { return {}; } };
      const setData = (obj) => { try { localStorage.setItem(payoutKey, JSON.stringify(obj || {})); } catch {} };
      // Mapa por email para que el admin lo lea en fallback
      const mapKey = 'mwi_partner_payouts';
      const getMap = () => { try { const raw = localStorage.getItem(mapKey); return raw ? JSON.parse(raw) : {}; } catch { return {}; } };
      const setMap = (obj) => { try { localStorage.setItem(mapKey, JSON.stringify(obj || {})); } catch {} };
      const couponMapKey = 'mwi_partner_payouts_by_coupon';
      const getCouponMap = () => { try { const raw = localStorage.getItem(couponMapKey); return raw ? JSON.parse(raw) : {}; } catch { return {}; } };
      const setCouponMap = (obj) => { try { localStorage.setItem(couponMapKey, JSON.stringify(obj || {})); } catch {} };
      const writeMapRecord = (methodCode, details) => {
        const emailLc = String(this.__userEmail || '').toLowerCase();
        if (!emailLc) { showToast('No se pudo obtener tu email'); return; }
        const map = getMap();
        const record = {
          email: this.__userEmail,
          coupon: this.__couponCode || '',
          method: methodCode,
          details: details || {},
          updatedAt: new Date().toISOString()
        };
        map[emailLc] = record;
        setMap(map);
        // También indexar por cupón para fallback
        const cMap = getCouponMap();
        const cKey = String(this.__couponCode || '').toLowerCase();
        if (cKey) {
          cMap[cKey] = record;
          setCouponMap(cMap);
        }
      };

      // Helpers: modal confirm & toast
      const modal = document.getElementById('pc-confirm-modal');
      const modalMsg = document.getElementById('pc-confirm-msg');
      const modalCancel = document.getElementById('pc-confirm-cancel');
      const modalAccept = document.getElementById('pc-confirm-accept');
      const openConfirm = (message, onAccept) => {
        if (modalMsg) modalMsg.textContent = message || '¿Deseas confirmar?';
        if (modal) modal.classList.add('open');
        const close = () => { try { modal.classList.remove('open'); } catch {} };
        const onCancel = () => { close(); cleanup(); };
        const onOk = () => { close(); cleanup(); try { onAccept && onAccept(); } catch {} };
        const cleanup = () => {
          try { modalCancel && modalCancel.removeEventListener('click', onCancel); } catch {}
          try { modalAccept && modalAccept.removeEventListener('click', onOk); } catch {}
        };
        modalCancel && modalCancel.addEventListener('click', onCancel);
        modalAccept && modalAccept.addEventListener('click', onOk);
        modal?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { close(); cleanup(); } });
      };
      const toast = document.getElementById('pc-save-toast');
      const showToast = (text) => {
        if (toast) { toast.textContent = text || 'Guardado'; toast.style.display = 'block'; setTimeout(() => { try { toast.style.display = 'none'; } catch {} }, 1800); }
      };

      // Summary updater
      const summaryBox = document.getElementById('pc-payout-summary');
      const summaryLabel = document.getElementById('pc-payout-selected');
      const removeBtn = document.getElementById('pc-payout-remove');
      const methodLabel = (data) => {
        if (!data || !data.method) return '--';
        if (data.method === 'USDT') return 'USDT BEP20';
        if (data.method === 'USA') return `USA BANK (${(data.usa && data.usa.type) ? (data.usa.type === 'business' ? 'Business' : 'Individual') : '—'})`;
        if (data.method === 'CO') return `COLOMBIA BANK (${(data.co && data.co.type) ? (data.co.type === 'juridica' ? 'Jurídica' : 'Natural') : '—'})`;
        return '--';
      };
      const updateSummary = () => {
        const saved = getData();
        if (saved && saved.method) {
          if (summaryLabel) summaryLabel.textContent = methodLabel(saved);
          if (summaryBox) summaryBox.style.display = 'block';
        } else {
          if (summaryBox) summaryBox.style.display = 'none';
        }
      };

      // Fetch backend default payout to reflect in UI even if local storage is empty
      const applyBackendDefault = async () => {
        try {
          const token = localStorage.getItem('mwi:token') || '';
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
          if (!token) return;
          const r = await fetch(`${base}/partner/payout`, { headers: { Authorization: `Bearer ${token}` } });
          const j = await r.json().catch(()=>({}));
          const p = j && j.payout ? j.payout : null;
          if (!p || !p.code) return;
          // Map backend code to local storage structure
          const data = getData();
          switch (String(p.code)) {
            case 'USDT_BEP20':
              data.method = 'USDT';
              data.usdt = { wallet: (p.details && p.details.walletAddress) ? p.details.walletAddress : (p.details && p.details.wallet) || '' };
              break;
            case 'USA_BANK_INDIVIDUAL':
              data.method = 'USA';
              data.usa = { type: 'individual', individual: p.details || {} };
              break;
            case 'USA_BANK_BUSINESS':
              data.method = 'USA';
              data.usa = { type: 'business', business: p.details || {} };
              break;
            case 'CO_BANK_NAT':
              data.method = 'CO';
              data.co = { type: 'natural', natural: p.details || {} };
              break;
            case 'CO_BANK_JUR':
              data.method = 'CO';
              data.co = { type: 'juridica', juridica: p.details || {} };
              break;
            default:
              return;
          }
          setData(data);
          // Reflect radios and fields
          const m = data.method;
          if (m === 'USDT' && usdtRadio) usdtRadio.checked = true;
          if (m === 'USA' && usaRadio) usaRadio.checked = true;
          if (m === 'CO' && colRadio) colRadio.checked = true;
          showMethod(m);
          // Pre-fill details
          if (data.usdt && data.usdt.wallet) { const el = document.getElementById('pc-usdt-wallet'); if (el) el.value = data.usdt.wallet; }
          if (data.usa && data.usa.type) { const t = data.usa.type; if (t === 'individual' && usaIndRadio) usaIndRadio.checked = true; if (t === 'business' && usaBusRadio) usaBusRadio.checked = true; showUSAType(t); }
          if (data.usa && data.usa.individual) {
            const ind = data.usa.individual;
            const f = document.getElementById('pc-usa-ind-first'); const l = document.getElementById('pc-usa-ind-last'); const r2 = document.getElementById('pc-usa-ind-routing'); const a2 = document.getElementById('pc-usa-ind-account');
            if (f) f.value = ind.firstName || ''; if (l) l.value = ind.lastName || ''; if (r2) r2.value = ind.routing || ''; if (a2) a2.value = ind.account || '';
          }
          if (data.usa && data.usa.business) {
            const bus = data.usa.business;
            const n = document.getElementById('pc-usa-bus-name'); const r3 = document.getElementById('pc-usa-bus-routing'); const a3 = document.getElementById('pc-usa-bus-account');
            if (n) n.value = bus.businessName || ''; if (r3) r3.value = bus.routing || ''; if (a3) a3.value = bus.account || '';
          }
          if (data.co && data.co.type) { const t = data.co.type; if (t === 'natural' && colNatRadio) colNatRadio.checked = true; if (t === 'juridica' && colJurRadio) colJurRadio.checked = true; showCOType(t); }
          if (data.co && data.co.natural) {
            const nat = data.co.natural;
            const f = document.getElementById('pc-col-nat-first'); const l = document.getElementById('pc-col-nat-last'); const d = document.getElementById('pc-col-nat-doc'); const b = document.getElementById('pc-col-nat-bank'); const tEl = document.getElementById('pc-col-nat-type'); const a = document.getElementById('pc-col-nat-account');
            if (f) f.value = nat.firstName || ''; if (l) l.value = nat.lastName || ''; if (d) d.value = nat.document || ''; if (b) b.value = nat.bank || ''; if (tEl) tEl.value = nat.accountType || ''; if (a) a.value = nat.account || '';
          }
          if (data.co && data.co.juridica) {
            const jur = data.co.juridica;
            const n = document.getElementById('pc-col-jur-name'); const nit = document.getElementById('pc-col-jur-nit'); const b = document.getElementById('pc-col-jur-bank'); const tEl = document.getElementById('pc-col-jur-type'); const a = document.getElementById('pc-col-jur-account');
            if (n) n.value = jur.businessName || ''; if (nit) nit.value = jur.nit || ''; if (b) b.value = jur.bank || ''; if (tEl) tEl.value = jur.accountType || ''; if (a) a.value = jur.account || '';
          }
          updateSummary();
        } catch {}
      };

      const usdtRadio = document.getElementById('pc-method-usdt');
      const usaRadio = document.getElementById('pc-method-usa');
      const colRadio = document.getElementById('pc-method-col');
      const formUSDT = document.getElementById('pc-form-usdt');
      const formUSA = document.getElementById('pc-form-usa');
      const formCOL = document.getElementById('pc-form-col');
      const showMethod = (m) => {
        if (formUSDT) formUSDT.style.display = (m === 'USDT') ? 'block' : 'none';
        if (formUSA) formUSA.style.display = (m === 'USA') ? 'block' : 'none';
        if (formCOL) formCOL.style.display = (m === 'CO') ? 'block' : 'none';
      };
      usdtRadio && usdtRadio.addEventListener('change', () => showMethod('USDT'));
      usaRadio && usaRadio.addEventListener('change', () => showMethod('USA'));
      colRadio && colRadio.addEventListener('change', () => showMethod('CO'));

      const usaIndRadio = document.getElementById('pc-usa-type-individual');
      const usaBusRadio = document.getElementById('pc-usa-type-business');
      const usaIndForm = document.getElementById('pc-form-usa-individual');
      const usaBusForm = document.getElementById('pc-form-usa-business');
      const showUSAType = (t) => {
        if (usaIndForm) usaIndForm.style.display = (t === 'individual') ? 'block' : 'none';
        if (usaBusForm) usaBusForm.style.display = (t === 'business') ? 'block' : 'none';
      };
      usaIndRadio && usaIndRadio.addEventListener('change', () => showUSAType('individual'));
      usaBusRadio && usaBusRadio.addEventListener('change', () => showUSAType('business'));

      const colNatRadio = document.getElementById('pc-col-type-natural');
      const colJurRadio = document.getElementById('pc-col-type-juridica');
      const colNatForm = document.getElementById('pc-form-col-natural');
      const colJurForm = document.getElementById('pc-form-col-juridica');
      const showCOType = (t) => {
        if (colNatForm) colNatForm.style.display = (t === 'natural') ? 'block' : 'none';
        if (colJurForm) colJurForm.style.display = (t === 'juridica') ? 'block' : 'none';
      };
      colNatRadio && colNatRadio.addEventListener('change', () => showCOType('natural'));
      colJurRadio && colJurRadio.addEventListener('change', () => showCOType('juridica'));

      const saved = getData();
      if (saved && saved.method) {
        const m = saved.method;
        if (m === 'USDT' && usdtRadio) usdtRadio.checked = true;
        if (m === 'USA' && usaRadio) usaRadio.checked = true;
        if (m === 'CO' && colRadio) colRadio.checked = true;
        showMethod(m);
      }
      if (saved && saved.usdt && saved.usdt.wallet) {
        const el = document.getElementById('pc-usdt-wallet');
        if (el) el.value = saved.usdt.wallet;
      }
      if (saved && saved.usa) {
        const t = saved.usa.type || 'individual';
        if (t === 'individual' && usaIndRadio) usaIndRadio.checked = true;
        if (t === 'business' && usaBusRadio) usaBusRadio.checked = true;
        showUSAType(t);
        if (saved.usa.individual) {
          const ind = saved.usa.individual;
          const f = document.getElementById('pc-usa-ind-first');
          const l = document.getElementById('pc-usa-ind-last');
          const r = document.getElementById('pc-usa-ind-routing');
          const a = document.getElementById('pc-usa-ind-account');
          if (f) f.value = ind.firstName || '';
          if (l) l.value = ind.lastName || '';
          if (r) r.value = ind.routing || '';
          if (a) a.value = ind.account || '';
        }
        if (saved.usa.business) {
          const bus = saved.usa.business;
          const n = document.getElementById('pc-usa-bus-name');
          const r = document.getElementById('pc-usa-bus-routing');
          const a = document.getElementById('pc-usa-bus-account');
          if (n) n.value = bus.businessName || '';
          if (r) r.value = bus.routing || '';
          if (a) a.value = bus.account || '';
        }
      }
      if (saved && saved.co) {
        const t = saved.co.type || 'natural';
        if (t === 'natural' && colNatRadio) colNatRadio.checked = true;
        if (t === 'juridica' && colJurRadio) colJurRadio.checked = true;
        showCOType(t);
        if (saved.co.natural) {
          const nat = saved.co.natural;
          const f = document.getElementById('pc-col-nat-first');
          const l = document.getElementById('pc-col-nat-last');
          const d = document.getElementById('pc-col-nat-doc');
          const b = document.getElementById('pc-col-nat-bank');
          const tEl = document.getElementById('pc-col-nat-type');
          const a = document.getElementById('pc-col-nat-account');
          if (f) f.value = nat.firstName || '';
          if (l) l.value = nat.lastName || '';
          if (d) d.value = nat.document || '';
          if (b) b.value = nat.bank || '';
          if (tEl) tEl.value = nat.accountType || '';
          if (a) a.value = nat.account || '';
        }
        if (saved.co.juridica) {
          const jur = saved.co.juridica;
          const n = document.getElementById('pc-col-jur-name');
          const nit = document.getElementById('pc-col-jur-nit');
          const b = document.getElementById('pc-col-jur-bank');
          const tEl = document.getElementById('pc-col-jur-type');
          const a = document.getElementById('pc-col-jur-account');
          if (n) n.value = jur.businessName || '';
          if (nit) nit.value = jur.nit || '';
          if (b) b.value = jur.bank || '';
          if (tEl) tEl.value = jur.accountType || '';
          if (a) a.value = jur.account || '';
        }
      }

      const saveUSDT = document.getElementById('pc-save-usdt');
      saveUSDT && saveUSDT.addEventListener('click', () => {
        const walletEl = document.getElementById('pc-usdt-wallet');
        const wallet = walletEl ? String(walletEl.value || '').trim() : '';
        if (!wallet) { showToast('Ingresa tu wallet USDT BEP20'); return; }
        openConfirm('Confirma que tu wallet es USDT BEP20. IMPORTANTE: La comisión de retiro es del 3%.', () => {
          const data = getData();
          data.method = 'USDT';
          data.usdt = { wallet };
          setData(data);
          // Persistir por email para dashboard admin
          writeMapRecord('USDT_BEP20', { usdt: { wallet } });
          // Persistir en backend
          try {
            const token = localStorage.getItem('mwi:token') || '';
            const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
            fetch(`${base}/partner/payout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ method: 'USDT_BEP20', details: { wallet }, coupon: this.__couponCode || '' })
            }).catch(()=>{});
          } catch {}
          updateSummary();
          showToast('Guardado');
        });
      });

      const saveUSA = document.getElementById('pc-save-usa');
      saveUSA && saveUSA.addEventListener('click', () => {
        const type = (usaIndRadio && usaIndRadio.checked) ? 'individual' : ((usaBusRadio && usaBusRadio.checked) ? 'business' : 'individual');
        const data = getData();
        data.method = 'USA';
        data.usa = { type };
        if (type === 'individual') {
          const f = document.getElementById('pc-usa-ind-first');
          const l = document.getElementById('pc-usa-ind-last');
          const r = document.getElementById('pc-usa-ind-routing');
          const a = document.getElementById('pc-usa-ind-account');
          data.usa.individual = { firstName: f ? f.value : '', lastName: l ? l.value : '', routing: r ? r.value : '', account: a ? a.value : '' };
        } else {
          const n = document.getElementById('pc-usa-bus-name');
          const r = document.getElementById('pc-usa-bus-routing');
          const a = document.getElementById('pc-usa-bus-account');
          data.usa.business = { businessName: n ? n.value : '', routing: r ? r.value : '', account: a ? a.value : '' };
        }
        openConfirm('Confirma que tus datos son correctos. La comisión de retiro es del 6% más un fee de $3.', () => {
          setData(data);
          // Persistir por email para dashboard admin
          const details = (type === 'individual') ? { usa: { type, individual: data.usa.individual } } : { usa: { type, business: data.usa.business } };
          writeMapRecord(type === 'business' ? 'USA_BANK_BUSINESS' : 'USA_BANK_INDIVIDUAL', details);
          // Persistir en backend
          try {
            const token = localStorage.getItem('mwi:token') || '';
            const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
            const code = (type === 'business') ? 'USA_BANK_BUSINESS' : 'USA_BANK_INDIVIDUAL';
            fetch(`${base}/partner/payout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ method: code, details, coupon: this.__couponCode || '' })
            }).catch(()=>{});
          } catch {}
          updateSummary();
          showToast('Guardado');
        });
      });

      const saveCOL = document.getElementById('pc-save-col');
      saveCOL && saveCOL.addEventListener('click', () => {
        const type = (colNatRadio && colNatRadio.checked) ? 'natural' : ((colJurRadio && colJurRadio.checked) ? 'juridica' : 'natural');
        const data = getData();
        data.method = 'CO';
        data.co = { type };
        if (type === 'natural') {
          const f = document.getElementById('pc-col-nat-first');
          const l = document.getElementById('pc-col-nat-last');
          const d = document.getElementById('pc-col-nat-doc');
          const b = document.getElementById('pc-col-nat-bank');
          const tEl = document.getElementById('pc-col-nat-type');
          const a = document.getElementById('pc-col-nat-account');
          data.co.natural = { firstName: f ? f.value : '', lastName: l ? l.value : '', document: d ? d.value : '', bank: b ? b.value : '', accountType: tEl ? tEl.value : '', account: a ? a.value : '' };
        } else {
          const n = document.getElementById('pc-col-jur-name');
          const nit = document.getElementById('pc-col-jur-nit');
          const b = document.getElementById('pc-col-jur-bank');
          const tEl = document.getElementById('pc-col-jur-type');
          const a = document.getElementById('pc-col-jur-account');
          data.co.juridica = { businessName: n ? n.value : '', nit: nit ? nit.value : '', bank: b ? b.value : '', accountType: tEl ? tEl.value : '', account: a ? a.value : '' };
        }
        const details = (type === 'natural') ? { co: { type, natural: data.co.natural } } : { co: { type, juridica: data.co.juridica } };
        openConfirm('Confirma que tus datos son correctos. La comisión de retiro es del 5% + 4x1000.', () => {
          setData(data);
          // Persistir por email para dashboard admin
          writeMapRecord(type === 'juridica' ? 'CO_BANK_JUR' : 'CO_BANK_NAT', details);
          // Persistir en backend
          try {
            const token = localStorage.getItem('mwi:token') || '';
            const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
            const code = (type === 'juridica') ? 'CO_BANK_JUR' : 'CO_BANK_NAT';
            fetch(`${base}/partner/payout`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ method: code, details, coupon: this.__couponCode || '' })
            }).catch(()=>{});
          } catch {}
          updateSummary();
          showToast('Guardado');
        });
      });

      // Eliminar selección
      removeBtn && removeBtn.addEventListener('click', () => {
        try { localStorage.removeItem(payoutKey); } catch {}
        // Eliminar del mapa por email
        try {
          const emailLc = String(this.__userEmail || '').toLowerCase();
          if (emailLc) {
            const map = getMap();
            if (map && map[emailLc]) { delete map[emailLc]; setMap(map); }
          }
        } catch {}
        // Eliminar del mapa por cupón
        try {
          const cKey = String(this.__couponCode || '').toLowerCase();
          if (cKey) {
            const cMap = getCouponMap();
            if (cMap && cMap[cKey]) { delete cMap[cKey]; setCouponMap(cMap); }
          }
        } catch {}
        // Reset UI
        try {
          const inputs = [usdtRadio, usaRadio, colRadio, usaIndRadio, usaBusRadio, colNatRadio, colJurRadio];
          inputs.forEach(i => { if (i) i.checked = false; });
          if (formUSDT) formUSDT.style.display = 'none';
          if (formUSA) formUSA.style.display = 'none';
          if (formCOL) formCOL.style.display = 'none';
        } catch {}
        updateSummary();
        showToast('Método eliminado');
      });

      // Mostrar resumen inicial si existe y luego aplicar backend default (si lo hay)
      updateSummary();
      applyBackendDefault();
    } catch {}
    // Historial de pagos del usuario: mostrar historial semanal (mismo total que Ventas y Recompensas) acumulativo
    try {
      const token = localStorage.getItem('mwi:token') || '';
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      if (token) {
        const tbody = document.getElementById('pc-payments-history-body');
        const r = await fetch(`${base}/partner/commissions/history-weekly`, { headers: { Authorization: `Bearer ${token}` } });
        const j = await r.json().catch(()=>({ items: [] }));
        const list = Array.isArray(j.items) ? j.items : [];
        if (tbody) {
          if (!list.length) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#cdbb9a;">Sin pagos registrados</td></tr>`;
          } else {
            const rows = list.map(it => {
              const dt = new Date(it.date || Date.now());
              const dateText = dt.toLocaleDateString();
              const per = it.period || '';
              const amt = Number(it.amount || 0).toFixed(2);
              const sTxt = per.split(' to ')[0];
              const eTxt = per.split(' to ')[1];
              const startISO = `${sTxt}T00:00:00.000Z`;
              const endISO = `${eTxt}T23:59:59.999Z`;
              return `<tr>
                <td>${dateText}</td>
                <td>${per}</td>
                <td>$${amt}</td>
                <td><button class="pc-week-detail-btn" data-start="${startISO}" data-end="${endISO}" data-period="${per}" style="appearance:none;border:1px solid rgba(209,161,86,.55);background:rgba(209,161,86,.08);color:#e8dcc0;padding:6px 8px;border-radius:8px;font-weight:700;cursor:pointer;font-size:12px;">Ver detalles</button></td>
              </tr>`;
            }).join('');
            tbody.innerHTML = rows;
            // Attach click handlers for detail buttons
            const buttons = Array.from(document.querySelectorAll('.pc-week-detail-btn'));
            buttons.forEach(btn => {
              btn.addEventListener('click', async () => {
                const startISO = btn.getAttribute('data-start');
                const endISO = btn.getAttribute('data-end');
                const periodStr = btn.getAttribute('data-period') || '';
                await (async () => {
                  const detailModal = document.getElementById('pc-detail-modal');
                  const detailTitle = document.getElementById('pc-detail-title');
                  const detailBody = document.getElementById('pc-detail-body');
                  const empty = `<tr><td colspan="4" style="text-align:center;color:#cdbb9a;">Sin registros</td></tr>`;
                  const fmtDate = (d) => {
                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                    const dd = String(d.getDate()).padStart(2, '0');
                    const yyyy = d.getFullYear();
                    return `${mm}/${dd}/${yyyy}`;
                  };
                  try {
                    const token = localStorage.getItem('mwi:token') || '';
                    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
                    const qs = new URLSearchParams({ start: startISO, end: endISO });
                    const [r0, r1, r2] = await Promise.all([
                      fetch(`${base}/partner/commissions/direct?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } }),
                      fetch(`${base}/partner/commissions/override1?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } }),
                      fetch(`${base}/partner/commissions/override2?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
                    ]);
                    const j0 = await r0.json().catch(()=>({ items: [] }));
                    const j1 = await r1.json().catch(()=>({ items: [] }));
                    const j2 = await r2.json().catch(()=>({ items: [] }));
                    const items0 = Array.isArray(j0.items) ? j0.items : [];
                    const items1 = Array.isArray(j1.items) ? j1.items : [];
                    const items2 = Array.isArray(j2.items) ? j2.items : [];
                    const rows0 = items0.map(it => {
                      const d = new Date(it.date || Date.now());
                      const name = String(it.buyerName || '--');
                      const pct = 40;
                      const amt = Number(it.reward || 0);
                      return `<tr><td>${fmtDate(d)}</td><td>${name}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
                    }).join('');
                    const rows1 = items1.map(it => {
                      const d = new Date(it.date || Date.now());
                      const leader = String(it.leaderName || '--');
                      const referred = String(it.referredName || '--');
                      const pct = 5;
                      const amt = Number(it.reward || 0);
                      const userCell = `Líder: ${leader} — Referido: ${referred}`;
                      return `<tr><td>${fmtDate(d)}</td><td>${userCell}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
                    }).join('');
                    const rows2 = items2.map(it => {
                      const d = new Date(it.date || Date.now());
                      const leader = String(it.leaderName || '--');
                      const referred = String(it.referredName || '--');
                      const pct = 3;
                      const amt = Number(it.reward || 0);
                      const userCell = `Líder: ${leader} — Referido: ${referred}`;
                      return `<tr><td>${fmtDate(d)}</td><td>${userCell}</td><td>${pct}%</td><td>$${amt.toFixed(2)}</td></tr>`;
                    }).join('');
                    const allRows = [rows0, rows1, rows2].filter(Boolean).join('');
                    if (detailTitle) detailTitle.textContent = `Detalle semanal: ${periodStr}`;
                    if (detailBody) detailBody.innerHTML = allRows || empty;
                    if (detailModal) detailModal.classList.add('open');
                  } catch {}
                })();
              });
            });
          }
        }
      }
    } catch {}
    // Sidebar toggle and actions
    try {
      const sidebar = document.getElementById('partner-sidebar');
      const toggleBtn = document.getElementById('podcast-menu-toggle');
      toggleBtn && toggleBtn.addEventListener('click', () => { sidebar && sidebar.classList.add('open'); document.body.style.overflow = 'hidden'; });
      sidebar?.addEventListener('click', (ev) => { const t = ev.target; if (t && t.getAttribute && t.getAttribute('data-close') === 'true') { sidebar.classList.remove('open'); document.body.style.overflow = ''; } });
      const unlock = () => { try { document.body.style.overflow = ''; document.documentElement.style.overflow = ''; } catch (e) {} sidebar && sidebar.classList.remove('open'); };
      document.getElementById('pc-nav-dashboard')?.addEventListener('click', () => { unlock(); Router.navigate('/dashboard'); });
      document.getElementById('pc-nav-masters')?.addEventListener('click', () => { unlock(); Router.navigate('/masters'); });
      document.getElementById('pc-nav-podcast')?.addEventListener('click', () => { unlock(); Router.navigate('/podcast'); });
      document.getElementById('pc-nav-services')?.addEventListener('click', () => { unlock(); Router.navigate('/services'); });
      document.getElementById('pc-nav-partner')?.addEventListener('click', () => { unlock(); Router.navigate('/partner-center'); });
      document.getElementById('pc-nav-inner-circle')?.addEventListener('click', () => { unlock(); Router.navigate('/inner-circle'); });
      document.getElementById('pc-nav-support')?.addEventListener('click', () => {
        const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
        try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
      });
      document.getElementById('pc-nav-logout')?.addEventListener('click', () => {
        try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
        try { localStorage.removeItem('mwi:token'); } catch {}
        unlock();
        try { Router.navigate('/'); } catch { try { window.location.hash = '#/'; } catch {} }
      });
    } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PartnerCenterPage;
}

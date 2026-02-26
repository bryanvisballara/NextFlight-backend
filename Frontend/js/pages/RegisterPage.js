/**
 * PÁGINA: REGISTRO / LOGIN
 * 
 * Página de registro y acceso para usuarios.
 */

// Resolver servicio existente de forma segura (sin imports/require)
const authRegister =
  (window.MWI && window.MWI.AuthService && typeof window.MWI.AuthService.register === 'function')
    ? window.MWI.AuthService.register
    : null;

const RegisterPage = {
  /**
   * Renderiza la página (incluye pestañas para Registrar / Iniciar sesión)
   */
  render() {
    return `
    <style>
      /* Register / Login styles (dark theme, inputs negros, texto blanco, acentos dorados) */
      .auth-page{ min-height:60vh; display:flex; align-items:center; justify-content:center; padding:40px 16px; background:linear-gradient(180deg,#080808,#0f0f0f); color:#efe6d6; }
      .auth-container{ width:100%; max-width:980px; display:flex; align-items:center; justify-content:center; }
      .auth-box{ background:linear-gradient(180deg,#141212,#0f0d0c); padding:28px; border-radius:12px; box-shadow:0 12px 40px rgba(0,0,0,0.6); border:1px solid rgba(212,169,85,0.06); width:100%; }
      .auth-tabs{ display:flex; gap:18px; margin-bottom:18px; }
      .auth-tabs .tab{ background:none; border:0; color:#bfa971; font-weight:800; cursor:pointer; padding:6px 8px; font-size:14px; }
      .auth-tabs .tab.active{ color:#f6e9c9; border-bottom:3px solid rgba(212,169,85,0.18); padding-bottom:6px; }
      .auth-form{ display:block; max-width:720px; }
      .form-row{ display:flex; gap:12px; }
      .form-group{ margin-bottom:12px; flex:1; }
      label{ display:block; color:#d0bfa0; font-size:13px; margin-bottom:6px; }
      input[type="text"], input[type="email"], input[type="password"], input[type="tel"], select{
        width:100%; padding:12px 14px; background:#151515; color:#efe6d6; border-radius:8px; border:1px solid rgba(255,255,255,0.04);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
      }
      input::placeholder{ color:rgba(235,220,190,0.45); }
      .checkbox-label{ display:inline-flex; gap:8px; align-items:center; justify-content:flex-start; flex-wrap:nowrap; color:#cdbb9a; font-size:13px; }
      .checkbox-label input[type="checkbox"]{ width:18px; height:18px; vertical-align:middle; margin:0; }
      .btn{ display:inline-block; padding:10px 14px; border-radius:8px; cursor:pointer; border:0; }
      .btn-primary{ background:linear-gradient(90deg,#d4a955,#b8862f); color:#1b120d; font-weight:800; }
      .btn-full{ width:100%; padding:12px 16px; }
      .auth-footer{ margin-top:12px; color:#cdbb9a; font-size:13px; }
      .link-primary{ color:#d4a955; text-decoration:underline; }
      @media (max-width:720px){
        .form-row{ flex-direction:column; }
        .auth-box{ padding:18px; }
      }
    </style>

    ${Header.render(false)}
      
      <main class="auth-page">
        <div class="auth-container">
          <div class="auth-box">

            <div class="auth-tabs">
              <button id="tab-register" class="tab active" type="button">Registrar</button>
              <button id="tab-login" class="tab" type="button">Iniciar sesión</button>
            </div>

            <div id="tab-content-register" class="tab-content">
              <form id="registerForm" class="auth-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">Nombre</label>
                    <input type="text" id="firstName" name="firstName" required placeholder="Tu nombre" autocomplete="given-name" />
                  </div>

                  <div class="form-group">
                    <label for="lastName">Apellido</label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Tu apellido" autocomplete="family-name" />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required placeholder="nombre@correo.com" autocomplete="email" />
                </div>

                <!-- agregado: selector de país + input de teléfono -->
                <div class="form-group">
                  <label for="country-select">Número de teléfono</label>
                  <div style="display:flex; gap:8px; align-items:center;">
                    <!-- placeholder limpio (sin icono) -->
                    <select id="country-select" name="country" style="flex:0 0 150px; padding:8px; background:#151515; color:#efe6d6; border-radius:6px; border:1px solid rgba(255,255,255,0.04);">
                      <option value="" disabled selected>País</option>
                      <option value="+93">Afghanistan (+93)</option>
                      <option value="+355">Albania (+355)</option>
                      <option value="+213">Algeria (+213)</option>
                      <option value="+1684">American Samoa (+1684)</option>
                      <option value="+376">Andorra (+376)</option>
                      <option value="+244">Angola (+244)</option>
                      <option value="+1264">Anguilla (+1264)</option>
                      <option value="+1268">Antigua &amp; Barbuda (+1268)</option>
                      <option value="+54">Argentina (+54)</option>
                      <option value="+374">Armenia (+374)</option>
                      <option value="+297">Aruba (+297)</option>
                      <option value="+61">Australia (+61)</option>
                      <option value="+43">Austria (+43)</option>
                      <option value="+994">Azerbaijan (+994)</option>
                      <option value="+1242">Bahamas (+1242)</option>
                      <option value="+973">Bahrain (+973)</option>
                      <option value="+880">Bangladesh (+880)</option>
                      <option value="+1246">Barbados (+1246)</option>
                      <option value="+375">Belarus (+375)</option>
                      <option value="+32">Belgium (+32)</option>
                      <option value="+501">Belize (+501)</option>
                      <option value="+229">Benin (+229)</option>
                      <option value="+1441">Bermuda (+1441)</option>
                      <option value="+975">Bhutan (+975)</option>
                      <option value="+591">Bolivia (+591)</option>
                      <option value="+387">Bosnia &amp; Herzegovina (+387)</option>
                      <option value="+267">Botswana (+267)</option>
                      <option value="+55">Brazil (+55)</option>
                      <option value="+246">British Indian Ocean Territory (+246)</option>
                      <option value="+1284">British Virgin Islands (+1284)</option>
                      <option value="+673">Brunei (+673)</option>
                      <option value="+359">Bulgaria (+359)</option>
                      <option value="+226">Burkina Faso (+226)</option>
                      <option value="+257">Burundi (+257)</option>
                      <option value="+855">Cambodia (+855)</option>
                      <option value="+237">Cameroon (+237)</option>
                      <option value="+1">Canada (+1)</option>
                      <option value="+238">Cape Verde (+238)</option>
                      <option value="+1345">Cayman Islands (+1345)</option>
                      <option value="+236">Central African Republic (+236)</option>
                      <option value="+235">Chad (+235)</option>
                      <option value="+56">Chile (+56)</option>
                      <option value="+86">China (+86)</option>
                      <option value="+61">Christmas Island (+61)</option>
                      <option value="+61">Cocos (Keeling) Islands (+61)</option>
                      <option value="+57" selected>Colombia (+57)</option>
                      <option value="+269">Comoros (+269)</option>
                      <option value="+682">Cook Islands (+682)</option>
                      <option value="+506">Costa Rica (+506)</option>
                      <option value="+385">Croatia (+385)</option>
                      <option value="+53">Cuba (+53)</option>
                      <option value="+599">Curacao (+599)</option>
                      <option value="+357">Cyprus (+357)</option>
                      <option value="+420">Czech Republic (+420)</option>
                      <option value="+243">Democratic Republic of the Congo (+243)</option>
                      <option value="+45">Denmark (+45)</option>
                      <option value="+253">Djibouti (+253)</option>
                      <option value="+1767">Dominica (+1767)</option>
                      <option value="+1-809">Dominican Republic (+1-809)</option>
                      <option value="+593">Ecuador (+593)</option>
                      <option value="+20">Egypt (+20)</option>
                      <option value="+503">El Salvador (+503)</option>
                      <option value="+240">Equatorial Guinea (+240)</option>
                      <option value="+291">Eritrea (+291)</option>
                      <option value="+372">Estonia (+372)</option>
                      <option value="+251">Ethiopia (+251)</option>
                      <option value="+500">Falkland Islands (+500)</option>
                      <option value="+298">Faroe Islands (+298)</option>
                      <option value="+679">Fiji (+679)</option>
                      <option value="+358">Finland (+358)</option>
                      <option value="+33">France (+33)</option>
                      <option value="+689">French Polynesia (+689)</option>
                      <option value="+241">Gabon (+241)</option>
                      <option value="+220">Gambia (+220)</option>
                      <option value="+995">Georgia (+995)</option>
                      <option value="+49">Germany (+49)</option>
                      <option value="+233">Ghana (+233)</option>
                      <option value="+350">Gibraltar (+350)</option>
                      <option value="+30">Greece (+30)</option>
                      <option value="+299">Greenland (+299)</option>
                      <option value="+1473">Grenada (+1473)</option>
                      <option value="+1671">Guam (+1671)</option>
                      <option value="+502">Guatemala (+502)</option>
                      <option value="+44">Guernsey (+44)</option>
                      <option value="+224">Guinea (+224)</option>
                      <option value="+245">Guinea-Bissau (+245)</option>
                      <option value="+592">Guyana (+592)</option>
                      <option value="+509">Haiti (+509)</option>
                      <option value="+504">Honduras (+504)</option>
                      <option value="+852">Hong Kong (+852)</option>
                      <option value="+36">Hungary (+36)</option>
                      <option value="+354">Iceland (+354)</option>
                      <option value="+91">India (+91)</option>
                      <option value="+62">Indonesia (+62)</option>
                      <option value="+98">Iran (+98)</option>
                      <option value="+964">Iraq (+964)</option>
                      <option value="+353">Ireland (+353)</option>
                      <option value="+44">Isle of Man (+44)</option>
                      <option value="+972">Israel (+972)</option>
                      <option value="+39">Italy (+39)</option>
                      <option value="+225">Ivory Coast (+225)</option>
                      <option value="+1876">Jamaica (+1876)</option>
                      <option value="+81">Japan (+81)</option>
                      <option value="+44">Jersey (+44)</option>
                      <option value="+962">Jordan (+962)</option>
                      <option value="+7">Kazakhstan (+7)</option>
                      <option value="+254">Kenya (+254)</option>
                      <option value="+686">Kiribati (+686)</option>
                      <option value="+383">Kosovo (+383)</option>
                      <option value="+965">Kuwait (+965)</option>
                      <option value="+996">Kyrgyzstan (+996)</option>
                      <option value="+856">Laos (+856)</option>
                      <option value="+371">Latvia (+371)</option>
                      <option value="+961">Lebanon (+961)</option>
                      <option value="+266">Lesotho (+266)</option>
                      <option value="+231">Liberia (+231)</option>
                      <option value="+218">Libya (+218)</option>
                      <option value="+423">Liechtenstein (+423)</option>
                      <option value="+370">Lithuania (+370)</option>
                      <option value="+352">Luxembourg (+352)</option>
                      <option value="+853">Macao (+853)</option>
                      <option value="+389">Macedonia (+389)</option>
                      <option value="+261">Madagascar (+261)</option>
                      <option value="+265">Malawi (+265)</option>
                      <option value="+60">Malaysia (+60)</option>
                      <option value="+960">Maldives (+960)</option>
                      <option value="+223">Mali (+223)</option>
                      <option value="+356">Malta (+356)</option>
                      <option value="+692">Marshall Islands (+692)</option>
                      <option value="+222">Mauritania (+222)</option>
                      <option value="+230">Mauritius (+230)</option>
                      <option value="+52">Mexico (+52)</option>
                      <option value="+691">Micronesia (+691)</option>
                      <option value="+373">Moldova (+373)</option>
                      <option value="+377">Monaco (+377)</option>
                      <option value="+976">Mongolia (+976)</option>
                      <option value="+382">Montenegro (+382)</option>
                      <option value="+1664">Montserrat (+1664)</option>
                      <option value="+212">Morocco (+212)</option>
                      <option value="+258">Mozambique (+258)</option>
                      <option value="+95">Myanmar (+95)</option>
                      <option value="+264">Namibia (+264)</option>
                      <option value="+674">Nauru (+674)</option>
                      <option value="+977">Nepal (+977)</option>
                      <option value="+31">Netherlands (+31)</option>
                      <option value="+687">New Caledonia (+687)</option>
                      <option value="+64">New Zealand (+64)</option>
                      <option value="+505">Nicaragua (+505)</option>
                      <option value="+227">Niger (+227)</option>
                      <option value="+234">Nigeria (+234)</option>
                      <option value="+683">Niue (+683)</option>
                      <option value="+850">North Korea (+850)</option>
                      <option value="+1670">Northern Mariana Islands (+1670)</option>
                      <option value="+47">Norway (+47)</option>
                      <option value="+968">Oman (+968)</option>
                      <option value="+92">Pakistan (+92)</option>
                      <option value="+680">Palau (+680)</option>
                      <option value="+970">Palestine (+970)</option>
                      <option value="+507">Panama (+507)</option>
                      <option value="+675">Papua New Guinea (+675)</option>
                      <option value="+595">Paraguay (+595)</option>
                      <option value="+51">Peru (+51)</option>
                      <option value="+63">Philippines (+63)</option>
                      <option value="+48">Poland (+48)</option>
                      <option value="+351">Portugal (+351)</option>
                      <option value="+1">Puerto Rico (+1)</option>
                      <option value="+974">Qatar (+974)</option>
                      <option value="+242">Republic of the Congo (+242)</option>
                      <option value="+262">Réunion (+262)</option>
                      <option value="+40">Romania (+40)</option>
                      <option value="+7">Russia (+7)</option>
                      <option value="+250">Rwanda (+250)</option>
                      <option value="+1869">Saint Kitts &amp; Nevis (+1869)</option>
                      <option value="+1758">Saint Lucia (+1758)</option>
                      <option value="+1784">Saint Vincent &amp; the Grenadines (+1784)</option>
                      <option value="+685">Samoa (+685)</option>
                      <option value="+378">San Marino (+378)</option>
                      <option value="+239">Sao Tome &amp; Principe (+239)</option>
                      <option value="+966">Saudi Arabia (+966)</option>
                      <option value="+221">Senegal (+221)</option>
                      <option value="+381">Serbia (+381)</option>
                      <option value="+248">Seychelles (+248)</option>
                      <option value="+232">Sierra Leone (+232)</option>
                      <option value="+65">Singapore (+65)</option>
                      <option value="+1721">Sint Maarten (+1721)</option>
                      <option value="+421">Slovakia (+421)</option>
                      <option value="+386">Slovenia (+386)</option>
                      <option value="+677">Solomon Islands (+677)</option>
                      <option value="+252">Somalia (+252)</option>
                      <option value="+27">South Africa (+27)</option>
                      <option value="+82">South Korea (+82)</option>
                      <option value="+211">South Sudan (+211)</option>
                      <option value="+34">Spain (+34)</option>
                      <option value="+94">Sri Lanka (+94)</option>
                      <option value="+249">Sudan (+249)</option>
                      <option value="+597">Suriname (+597)</option>
                      <option value="+46">Sweden (+46)</option>
                      <option value="+41">Switzerland (+41)</option>
                      <option value="+963">Syria (+963)</option>
                      <option value="+886">Taiwan (+886)</option>
                      <option value="+992">Tajikistan (+992)</option>
                      <option value="+255">Tanzania (+255)</option>
                      <option value="+66">Thailand (+66)</option>
                      <option value="+670">Timor-Leste (+670)</option>
                      <option value="+228">Togo (+228)</option>
                      <option value="+676">Tonga (+676)</option>
                      <option value="+1868">Trinidad &amp; Tobago (+1868)</option>
                      <option value="+216">Tunisia (+216)</option>
                      <option value="+90">Turkey (+90)</option>
                      <option value="+993">Turkmenistan (+993)</option>
                      <option value="+1649">Turks &amp; Caicos Islands (+1649)</option>
                      <option value="+688">Tuvalu (+688)</option>
                      <option value="+1340">U.S. Virgin Islands (+1340)</option>
                      <option value="+256">Uganda (+256)</option>
                      <option value="+380">Ukraine (+380)</option>
                      <option value="+971">United Arab Emirates (+971)</option>
                      <option value="+44">United Kingdom (+44)</option>
                      <option value="+1">United States (+1)</option>
                      <option value="+598">Uruguay (+598)</option>
                      <option value="+998">Uzbekistan (+998)</option>
                      <option value="+678">Vanuatu (+678)</option>
                      <option value="+379">Vatican City (+379)</option>
                      <option value="+58">Venezuela (+58)</option>
                      <option value="+84">Vietnam (+84)</option>
                      <option value="+681">Wallis &amp; Futuna (+681)</option>
                      <option value="+212">Western Sahara (+212)</option>
                      <option value="+967">Yemen (+967)</option>
                      <option value="+260">Zambia (+260)</option>
                      <option value="+263">Zimbabwe (+263)</option>
                    </select>
                    <input type="tel" id="phone" name="phone" placeholder="Número de teléfono" style="flex:1; padding:8px; background:#151515; color:#efe6d6; border-radius:6px; border:1px solid rgba(255,255,255,0.04);" />
                  </div>
                </div>

                <div class="form-group">
                  <label for="master">Master de mayor interés</label>
                  <select id="master" name="master" style="width:100%; padding:8px; background:#151515; color:#efe6d6; border-radius:6px; border:1px solid rgba(255,255,255,0.04);">
                    <option value="">Selecciona una opción</option>
                    <option value="Amazon Seller Master">Amazon Seller Master</option>
                    <option value="eBay Seller hub Master">eBay Seller hub Master</option>
                    <option value="SHEIN Seller Master">SHEIN Seller Master</option>
                    <option value="Top Seller Mercado Libre Master">Top Seller Mercado Libre Master</option>
                    <option value="Gestión de capital en mercados financieros Master (TRADING)">Gestión de capital en mercados financieros Master (TRADING)</option>
                    <option value="Cripto Arbitrage Master">Cripto Arbitrage Master</option>
                    <option value="Social Media Management & Content Creator Master">Social Media Management & Content Creator Master</option>
                    <option value="Vida con propósito Master">Vida con propósito Master</option>
                    <option value="Operación, gestión y dirección empresarial Master">Operación, gestión y dirección empresarial Master</option>
                    <option value="Podcast">Podcast</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" id="password" name="password" required placeholder="Crea una contraseña" autocomplete="new-password" />
                </div>

                <div class="form-group">
                  <label for="confirmPassword">Confirmar contraseña</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Repite tu contraseña" autocomplete="new-password" />
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" name="terms" id="terms" required />
                    <span>Acepto los <a href="#/terms" data-link class="link-primary">términos y condiciones</a></span>
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-full">Crear cuenta</button>
              </form>
            </div>

            <div id="tab-content-login" class="tab-content" style="display:none;">
              <form id="loginForm" class="auth-form">
                <div class="form-group">
                  <label for="loginEmail">Email</label>
                  <input type="email" id="loginEmail" name="email" required placeholder="nombre@correo.com" autocomplete="email" />
                </div>

                <div class="form-group">
                  <label for="loginPassword">Contraseña</label>
                  <input type="password" id="loginPassword" name="password" required placeholder="Tu contraseña" autocomplete="current-password" />
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" name="remember" />
                    <span>Recuérdame</span>
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-full">Entrar</button>
              </form>
            </div>

            <div class="auth-footer">
              <p id="auth-message" class="auth-message" aria-live="polite"></p>
            </div>
          </div>
        </div>
      </main>

      ${Footer.render()}
    `;
  },

  /**
   * Inicializa handlers tras renderizar (se llama desde HomePage o enrutador)
   */
  after_render() {
    // Tabs
    const tabRegister = document.getElementById('tab-register');
    const tabLogin = document.getElementById('tab-login');
    const contentRegister = document.getElementById('tab-content-register');
    const contentLogin = document.getElementById('tab-content-login');
    const authMessage = document.getElementById('auth-message');

    if (tabRegister && tabLogin) {
      tabRegister.addEventListener('click', (e) => {
        e.preventDefault();
        // Preferir abrir el modal global si está disponible
        if (typeof openRegister === 'function') { openRegister(); return; }

        // fallback: comportamiento local original
        if (contentRegister && contentLogin) {
          tabRegister.classList.add('active');
          tabLogin.classList.remove('active');
          contentRegister.style.display = '';
          contentLogin.style.display = 'none';
          if (authMessage) authMessage.textContent = '';
        }
      });

      tabLogin.addEventListener('click', (e) => {
        e.preventDefault();
        // Preferir abrir el modal global si está disponible
        if (typeof openLogin === 'function') { openLogin(); return; }

        // fallback: comportamiento local original
        if (contentRegister && contentLogin) {
          tabLogin.classList.add('active');
          tabRegister.classList.remove('active');
          contentLogin.style.display = '';
          contentRegister.style.display = 'none';
          if (authMessage) authMessage.textContent = '';
        }
      });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegister(e.target);
      });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin(e.target);
      });
    }
  },

  /**
   * Inicializa (compatibilidad): llamado por HomePage cuando inserta RegisterPage.render() dentro del modal
   */
  init() {
    const form = document.getElementById('registerForm') || document.getElementById('register-form');
    if (!form) return;

    if (!form.__hasHandler) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleRegister(e.target);
      });
      form.__hasHandler = true;
    }
  },

  /**
   * Muestra un overlay de carga a pantalla completa
   */
  showLoadingOverlay(message = 'Procesando...') {
    try {
      // Evitar múltiples overlays
      if (this._loadingEl && this._loadingEl.parentNode) return;

      const overlay = document.createElement('div');
      overlay.id = 'mwi-loading-overlay';
      overlay.setAttribute('role', 'alert');
      overlay.setAttribute('aria-live', 'assertive');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(0,0,0,0.66)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '9999';

      const box = document.createElement('div');
      box.style.background = 'linear-gradient(180deg,#171515,#0f0d0c)';
      box.style.border = '1px solid rgba(212,169,85,0.22)';
      box.style.borderRadius = '12px';
      box.style.padding = '18px 22px';
      box.style.minWidth = '280px';
      box.style.boxShadow = '0 10px 28px rgba(0,0,0,0.55)';
      box.style.color = '#e8dcc0';
      box.style.display = 'flex';
      box.style.flexDirection = 'column';
      box.style.alignItems = 'center';
      box.style.gap = '12px';

      const styleTag = document.createElement('style');
      styleTag.textContent = `@keyframes mwi-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`;
      overlay.appendChild(styleTag);

      const spinner = document.createElement('div');
      spinner.style.width = '42px';
      spinner.style.height = '42px';
      spinner.style.border = '4px solid rgba(212,169,85,0.18)';
      spinner.style.borderTopColor = '#d4a955';
      spinner.style.borderRadius = '50%';
      spinner.style.animation = 'mwi-spin 0.9s linear infinite';

      const msgEl = document.createElement('div');
      msgEl.textContent = message;
      msgEl.style.fontWeight = '800';
      msgEl.style.color = '#f6e9c9';
      msgEl.style.textAlign = 'center';
      msgEl.style.fontSize = '14px';

      box.appendChild(spinner);
      box.appendChild(msgEl);
      overlay.appendChild(box);

      document.body.appendChild(overlay);
      this._loadingEl = overlay;
    } catch (e) { /* no-op */ }
  },

  /**
   * Oculta el overlay de carga
   */
  hideLoadingOverlay() {
    try {
      if (this._loadingEl && this._loadingEl.parentNode) {
        this._loadingEl.parentNode.removeChild(this._loadingEl);
      }
    } catch (e) { /* no-op */ }
    this._loadingEl = null;
  },

  /**
   * Maneja el envío del formulario de registro
   */
  async handleRegister(form) {
    const isLocalDev = (typeof window !== 'undefined') && (['localhost', '127.0.0.1'].includes(window.location.hostname));
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const startTs = Date.now();
    this.showLoadingOverlay('Creando tu cuenta...');
    // Obtener y componer campos
    const rawFirst = form.firstName?.value?.trim() || '';
    const rawLast = form.lastName?.value?.trim() || '';
    const fallbackName = form.name?.value?.trim() || '';
    const name = (rawFirst || rawLast) ? `${rawFirst} ${rawLast}`.trim() : fallbackName;
    const email = form.email?.value?.trim() || '';
    const masterInterest = form.master?.value || '';
    const rawPhone = form.phone?.value?.trim() || '';
    const countryCode = (document.getElementById('country-select')?.value || '').trim();
    const digits = rawPhone.replace(/\D+/g, '');
    let phone = '';
    if (countryCode) {
      // countryCode already includes '+' (e.g., '+57')
      phone = `${countryCode}${digits}`;
    } else if (rawPhone) {
      phone = rawPhone.startsWith('+') ? rawPhone : (digits ? `+${digits}` : '');
    }
    const password = form.password?.value || '';

    // Validaciones locales mínimas
    if (!name || !email || !password) {
      Utils.showError('Completa los campos requeridos');
      return;
    }
    // Validación: master de mayor interés obligatorio
    if (!masterInterest) {
      Utils.showPopupError('Debes escoger el master de mayor interes');
      return;
    }

    // Nota: validación de duplicados se delega al backend.
    // Si el backend no está disponible, el flujo seguirá intentando registro
    // y mostrará errores genéricos de conexión.

    // Intentar servicio expuesto (si existe); si no, usar fetch directo al backend
    const tryService = async () => {
      if (!authRegister) return null;
      try {
        return await authRegister({ name, email, phone, password, interestMaster: masterInterest });
      } catch (e) {
        return null;
      }
    };

    const tryFetch = async () => {
      const payload = { name, email, phone, password, interestMaster: masterInterest };
      const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
      try {
        console.info('[Register] intentando POST', base, payload);
        const res = await fetch(`${base}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          return { success: true, ...data };
        }
        // Propagar status y mensaje del backend para poder mapear duplicados
        console.warn('[Register] respuesta no OK', res.status, data);
        return { success: false, status: res.status, message: data?.message || 'Error de registro', errors: data?.errors || null };
      } catch (e) {
        console.error('[Register] error de red con', base, e);
      }
      return { success: false, message: 'No se pudo contactar el servidor' };
    };

    try {
      const viaService = await tryService();
      const result = viaService || await tryFetch();

      if (result && result.success) {
        const safeEmail = Utils.escapeHtml(email);
        const msg = `
          Hemos enviado un correo de verificación a ${safeEmail}.
          Revisa tu bandeja de entrada o spam.
        `;
        // Asegurar un tiempo mínimo de visualización del loader (~5s)
        const minDelayMs = 5000;
        const elapsed = Date.now() - startTs;
        const waitMs = Math.max(0, minDelayMs - elapsed);
        setTimeout(() => {
          this.hideLoadingOverlay();
          if (submitBtn) submitBtn.disabled = false;
          Utils.showPopup(msg, 'Registro exitoso');
        }, waitMs);
        // No auto-login ni navegación: esperar verificación de correo
        return;
      }

      // En producción: no crear usuarios locales ni fallback offline

      // En producción: si no se pudo contactar el servidor, mostrar error (sin crear usuario local)
      if (!isLocalDev && result && !result.success && /No se pudo contactar/i.test(result.message || '')) {
        this.hideLoadingOverlay();
        if (submitBtn) submitBtn.disabled = false;
        Utils.showError('No fue posible registrar tu cuenta. Intenta nuevamente más tarde.');
        return;
      }

      const rawMsg = Array.isArray(result?.errors)
        ? result.errors.join(', ')
        : (result?.message || 'Error de registro');
      const looksDuplicate = (result && (result.status === 409 || result.status === 400))
        ? (/duplicate|exists|registrad/i.test(rawMsg))
        : (/duplicate|exists|registrad/i.test(rawMsg));
      // Mensaje específico si el backend retornó duplicados
      let finalMsg = rawMsg;
      this.hideLoadingOverlay();
      if (submitBtn) submitBtn.disabled = false;
      if (looksDuplicate) {
        const lower = (rawMsg || '').toLowerCase();
        const emailHint = lower.includes('email') || lower.includes('correo');
        const phoneHint = lower.includes('phone') || lower.includes('tel') || lower.includes('telefono') || lower.includes('teléfono');
        finalMsg = (emailHint && phoneHint)
          ? 'El correo y el número ya fueron registrados'
          : (emailHint ? 'El correo ya está registrado' : (phoneHint ? 'El número ya fue registrado' : 'El correo o el teléfono ya fueron registrados previamente'));
        Utils.showPopupError(finalMsg);
      } else {
        Utils.showError(finalMsg);
      }
    } catch (err) {
      this.hideLoadingOverlay();
      if (submitBtn) submitBtn.disabled = false;
      Utils.showError('Error de conexión. Intenta nuevamente.');
      console.error('[Register] error', err);
    }
  },

  /**
   * Maneja el envío del formulario de login
   */
  async handleLogin(form) {
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      Utils.showError('Email y contraseña son requeridos');
      return;
    }

    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const startTs = Date.now();
    this.showLoadingOverlay('Iniciando sesión...');

    const finalizeSuccess = (target) => {
      const minDelayMs = 5000;
      const elapsed = Date.now() - startTs;
      const waitMs = Math.max(0, minDelayMs - elapsed);
      setTimeout(() => {
        this.hideLoadingOverlay();
        if (submitBtn) submitBtn.disabled = false;
        Utils.showSuccess('Ingreso exitoso');
        if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
          Router.navigate(target);
        } else {
          try { window.location.hash = '#' + target; } catch {}
        }
      }, waitMs);
    };

    try {
      if (window.MWI?.AuthService?.login) {
        const res = await window.MWI.AuthService.login({ email, password });
        if (res?.success) {
          if (res.token) localStorage.setItem('mwi:token', res.token);
          // Backfill de contraseña en base local si falta
          try {
            const users = (typeof StorageManager !== 'undefined' && StorageManager.getAllUsers) ? StorageManager.getAllUsers() : [];
            const u = users.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
            if (u && (!u.password || u.password === '')) {
              u.password = password;
              StorageManager.updateUser(u);
            }
          } catch {}
          // Obtener perfil desde backend para establecer rol en sesión
          try {
            const meRes = await fetch(`${base}/auth/me`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('mwi:token') || ''}` }
            });
            const meData = await meRes.json().catch(() => ({}));
            if (meRes.ok && meData && meData.user) {
              const fullName = meData.user.name || '';
              const parts = fullName.split(' ');
              const firstName = parts[0] || '';
              const lastName = parts.slice(1).join(' ') || '';
              const mappedRole = meData.user.role === 'admin' ? 'admin' : 'student';
              const userForSession = {
                id: meData.user._id || meData.user.id || `user-${Date.now()}`,
                email: meData.user.email,
                firstName,
                lastName,
                role: mappedRole,
                isPaid: !!meData.user.isPaid,
                active: true,
                enrolledMasters: []
              };
              StorageManager.setCurrentUser(userForSession);
            }
          } catch {}
          const target = AuthManager.isAdmin() ? '/admin' : '/dashboard';
          finalizeSuccess(target);
          return;
        }
        throw new Error(res?.message || 'Credenciales inválidas');
      }

      const r = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        if (data.token) localStorage.setItem('mwi:token', data.token);
        // Backfill de contraseña en base local si falta
        try {
          const users = (typeof StorageManager !== 'undefined' && StorageManager.getAllUsers) ? StorageManager.getAllUsers() : [];
          const u = users.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
          if (u && (!u.password || u.password === '')) {
            u.password = password;
            StorageManager.updateUser(u);
          }
        } catch {}
        // Obtener perfil desde backend para establecer rol en sesión
        try {
          const meRes = await fetch(`${base}/auth/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('mwi:token') || ''}` }
          });
          const meData = await meRes.json().catch(() => ({}));
          if (meRes.ok && meData && meData.user) {
            const fullName = meData.user.name || '';
            const parts = fullName.split(' ');
            const firstName = parts[0] || '';
            const lastName = parts.slice(1).join(' ') || '';
            const mappedRole = meData.user.role === 'admin' ? 'admin' : 'student';
            const userForSession = {
              id: meData.user._id || meData.user.id || `user-${Date.now()}`,
              email: meData.user.email,
              firstName,
              lastName,
              role: mappedRole,
              isPaid: !!meData.user.isPaid,
              active: true,
              enrolledMasters: []
            };
            StorageManager.setCurrentUser(userForSession);
          }
        } catch {}
        const target = AuthManager.isAdmin() ? '/admin' : '/dashboard';
        finalizeSuccess(target);
        return;
      }

      // Fallback local: AuthManager
      const localRes = AuthManager.login(email, password);
      if (localRes && localRes.success) {
        try { localStorage.setItem('mwi:token', 'dev-local'); } catch {}
        Utils.showSuccess('Ingreso exitoso');
        const target = AuthManager.isAdmin() ? '/admin' : '/dashboard';
        Router.navigate(target);
        return;
      }

      throw new Error(data?.message || 'Credenciales inválidas');
    } catch (err) {
      console.error('[Login] error', err);
      // Último intento local si el catch es por network
      try {
        const localRes = AuthManager.login(email, password);
        if (localRes && localRes.success) {
          try { localStorage.setItem('mwi:token', 'dev-local'); } catch {}
          const target = AuthManager.isAdmin() ? '/admin' : '/dashboard';
          finalizeSuccess(target);
          return;
        }
      } catch {}
      this.hideLoadingOverlay();
      if (submitBtn) submitBtn.disabled = false;
      Utils.showPopupError('Usuario o contraseña incorrectas, intente denuevo');
    }
  }
};

// Exportar para CommonJS si aplica (no usado en navegador)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RegisterPage;
}
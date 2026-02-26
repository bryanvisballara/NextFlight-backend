/**
 * PÁGINA: HOMEPAGE PÚBLICA
 * 
 * Página principal con información sobre el instituto, masters, beneficios y podcast.
 */

const HomePage = {
  /**
   * Renderiza la homepage
   */
  render() {
    const masters = StorageManager.getAllMasters().filter(m => m.featured);
    // Podcast carousel will be populated from MongoDB via API in after_render()

    return `
      ${Header.render()}
      
      <main class="homepage">
       <!-- HERO – PDF 1:1 -->
<section class="mwi-hero">
  <div class="mwi-hero-bg"></div>

  <div class="mwi-hero-card">
    <h1>
      Expande tu mente, tu energía y tus habilidades<br />
      <span> para vivir con libertad</span>
    </h1>

    <p class="mwi-hero-subtitle">
      Masters diseñados para desarrollar riqueza, claridad, bienestar y propósito.
      Aprende a tomar control de tu dinero, tu energía y tus decisiones.
    </p>

    <div class="mwi-hero-actions">
      <button id="open-register" class="mwi-btn mwi-btn-gold" type="button">Regístrate ahora</button>
      <a href="#/login" class="mwi-btn mwi-btn-outline">Inicia sesión</a>
    </div>
  </div>
</section>

<!-- Modal de registro (diseño actualizado: panel izquierdo de marca + panel derecho con formulario) -->
<style>
/* RESET básico para modal */
/* Cambiado a grid + place-items para centrar el popup box */
.mwi-modal{
  position:fixed;
  inset:0;
  display:grid;              /* was: flex */
  place-items:center;        /* centra vertical y horizontalmente */
  z-index:9999;
  padding:20px;
}
.mwi-modal-backdrop{ position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(3px); z-index:9998; }

/* Contenedor principal: ratio próximo a la imagen de referencia (no perfecto 1:1 para dar altura) */
.mwi-modal-content{
  position:relative;
  width:min(980px,94vw);
  max-height:calc(100vh - 40px);
  display:flex;
  border-radius:12px;
  overflow:hidden;
  background:#0e0e0d; /* was #0f0b09 — updated to RGB(14,14,13) */
  box-shadow:0 20px 60px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,0,0,0.45);
  border:1px solid rgba(212,169,85,0.09);
  z-index:9999;
  margin:auto; /* asegura centrado dentro del contenedor grid */
}

.mwi-modal-close{
  position:absolute; top:18px; right:18px; z-index:10010;
  width:36px; height:36px; border-radius:6px; background:transparent; color:#e8d7b3;
  border:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; justify-content:center; cursor:pointer;
  font-size:20px;
}

/* LEFT: imagen de marca, textura y contenido */
.mwi-modal-left{
  flex:0 0 42%;
  min-width:320px;
  background-image: url('assets/images/modal-left-bg.jpg'), linear-gradient(#1b140f,#100a08);
  background-size:cover;
  background-position:center;
  color:#d9c29a;
  padding:36px 28px;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  gap:20px;
}
.mwi-modal-left .mwi-modal-logo{ width:140px; filter: drop-shadow(0 6px 18px rgba(212,169,85,0.12)); }
.mwi-modal-left h3{ color:#f6e7c9; font-size:20px; margin:6px 0 0; letter-spacing:1px; }
.mwi-modal-left p{ color:#cdbb9a; margin:10px 0 14px; font-size:13px; }
.mwi-modal-left ul{ color:#bfa67b; margin:0 0 8px 18px; font-size:13px; }

/* Separator: barra dorada con brillo */
.mwi-modal-separator{
  width:2px;
  background:linear-gradient(180deg, rgba(212,169,85,0.95), rgba(212,169,85,0.2));
  box-shadow:0 0 20px rgba(212,169,85,0.18);
  margin:0;
}

/* RIGHT: formulario, tipografía y scroll */
.mwi-modal-right{
  flex:1 1 auto;
  padding:28px 36px;
  background:linear-gradient(180deg,#1b1512,#0f0a08);
  color:#efe6d6;
  overflow:auto;
  box-sizing:border-box;
  position:relative;
}

/* Tabs estilo */
.mwi-auth-tabs{ display:flex; gap:18px; align-items:flex-end; margin-bottom:18px; }
.mwi-auth-tabs button{
  background:transparent; border:0; color:#bfa971; font-weight:800; padding:8px 6px; cursor:pointer; font-size:14px;
  position:relative;
}
.mwi-auth-tabs button.active{
  color:#f6e9c9;
}
.mwi-auth-tabs button.active::after{
  content:""; position:absolute; left:0; right:0; bottom:-8px; height:3px; background:linear-gradient(90deg,#d4a955,#b8862f);
  border-radius:3px; box-shadow:0 6px 18px rgba(212,169,85,0.16);
}

/* Form estilo: campos con bordes oscuros y acentos dorados */
.mwi-register-form { max-width:520px; }
.mwi-register-form label{ display:block; margin-bottom:14px; color:#d0bfa0; font-size:14px; }
.mwi-field{
  position:relative;
}
.mwi-field input, .mwi-field select{
  width:100%; padding:14px 14px 14px 44px; border-radius:8px; border:1px solid rgba(255,255,255,0.06);
  background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.12)); color:#efe6d6; outline:none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 6px 18px rgba(0,0,0,0.5);
  transition:box-shadow .15s, border-color .12s;
}
.mwi-field input::placeholder{ color:rgba(235,220,190,0.45); }
.mwi-field .mwi-input-icon{
  position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#d4a955; font-size:16px; opacity:0.95;
}
.mwi-field select{ -webkit-appearance:none; appearance:none; background-image: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.06) 50%), linear-gradient(135deg, rgba(255,255,255,0.03) 50%, transparent 50%); background-position: calc(100% - 18px) calc(1em + 2px), calc(100% - 13px) calc(1em + 2px); background-size: 8px 8px, 8px 8px; background-repeat:no-repeat; padding-right:36px; }

.mwi-field input:focus, .mwi-field select:focus{
  border-color: rgba(212,169,85,0.95);
  box-shadow: 0 8px 30px rgba(212,169,85,0.06), inset 0 1px 0 rgba(255,255,255,0.02);
}

/* Social buttons removed */

.mwi-terms{ display:inline-flex; gap:8px; align-items:center; justify-content:flex-start; color:#cdbb9a; font-size:13px; margin-top:6px; }
.mwi-terms input[type="checkbox"]{ width:18px; height:18px; margin:0; vertical-align:middle; accent-color:#d4a955; }

.mwi-btn-create{
  width:100%; margin-top:14px; padding:14px; border-radius:8px; font-weight:900; letter-spacing:1px;
  background:linear-gradient(90deg,#d4a955,#b8862f); color:#22160f; border:none; box-shadow:0 10px 30px rgba(214,150,40,0.18);
}

.mwi-modal-note{ text-align:center; color:#a89266; font-size:12px; margin-top:12px; }

/* Responsive */
@media (max-width:880px){
  .mwi-modal-content{ flex-direction:column; width:calc(100% - 24px); max-height:calc(100vh - 24px); border-radius:10px; }
  .mwi-modal-left{ flex:0 0 auto; width:100%; padding:18px; text-align:center; }
  .mwi-modal-separator{ display:none; }
  .mwi-modal-right{ padding:18px; }
  .mwi-register-form{ max-width:100%; }
}
</style>

<!-- Modal HTML -->
<div id="register-modal" class="mwi-modal" aria-hidden="true" style="display:none;">
  <div class="mwi-modal-backdrop" id="register-modal-backdrop"></div>

  <div class="mwi-modal-content" role="dialog" aria-modal="true" aria-labelledby="register-modal-title">
    <button id="register-modal-close" class="mwi-modal-close" aria-label="Cerrar">✕</button>

    <div class="mwi-modal-left" aria-hidden="false">
      <div>
        <h3>MODERN WEALTH<br/>INSTITUTE</h3>
        <p>Accede a tu formación profesional en negocios digitales y financieros.</p>
        <ul>
          <li>Masters certificados</li>
          <li>Acceso 24/7</li>
          <li>Plataforma privada</li>
          <li>Podcast</li>
          <li>Sesiones en vivo</li>
          <li>Actualizaciones constantes</li>
          <li>Mentorías personalizadas</li>
        </ul>
      </div>

      <div style="font-size:12px;color:#b79a6f;">
        <strong>© Modern Wealth Institute</strong><br/>
        Formación práctica y resultados medibles.
      </div>
    </div>

    <div class="mwi-modal-separator" aria-hidden="true"></div>

    <!-- Reemplazar la sección del modal HTML para usar el formulario inline recuperado -->
    <section id="register-modal-body" class="mwi-modal-right">
      <div class="mwi-auth-tabs">
         <button class="active" type="button" onclick="showRegisterInRegisterModal(); return false;">REGISTRARME</button>
         <button type="button" onclick="showLoginInRegisterModal(); return false;">INICIAR SESIÓN</button>
       </div>
       
 
      <form id="register-form" class="mwi-register-form" autocomplete="off">
        <label>Nombre completo
          <div class="mwi-field">
            <span class="mwi-input-icon">👤</span>
            <input name="name" placeholder="Escribe tu nombre completo" required>
          </div>
        </label>

        <label>Correo electrónico
          <div class="mwi-field">
            <span class="mwi-input-icon">✉️</span>
            <input type="email" name="email" placeholder="nombre@correo.com" required>
          </div>
        </label>

        <label>Número de teléfono
          <div class="mwi-field" style="display:flex; gap:8px;">
            <select id="country-select" name="country" style="flex:0 0 110px; padding-left:6px; background:#151515; color:#efe6d6; border-radius:6px; border:1px solid rgba(255,255,255,0.04);">
              <option value="">País</option>
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

            <input name="phone" placeholder="Número de teléfono" style="flex:1; padding-left:14px;">
          </div>
        </label>

        <label>Contraseña
          <div class="mwi-field">
            <span class="mwi-input-icon">🔒</span>
            <input type="password" name="password" placeholder="Crea una contraseña segura" required>
          </div>
        </label>

        <label>Master de mayor interés
          <div class="mwi-field">
            <span class="mwi-input-icon">🎓</span>
            <select name="master">
              <option value="">Selecciona una opción</option>
              <option value="Amazon Seller Master">Amazon Seller Master</option>
              <option value="eBay Seller Hub Master">eBay Seller Hub Master</option>
              <option value="SHEIN Seller Master">SHEIN Seller Master</option>
              <option value="Top Seller Mercado Libre Master">Top Seller Mercado Libre Master</option>
              <option value="Gestión de capital en mercados financieros (TRADING) Master">Gestión de capital en mercados financieros (TRADING) Master</option>
              <option value="Cripto Arbitrage Master">Cripto Arbitrage Master</option>
              <option value="Social Media Management & Content Creator Master">Social Media Management & Content Creator Master</option>
              <option value="Vida con propósito Master">Vida con propósito Master</option>
              <option value="Operación, gestión y dirección empresarial Master">Operación, gestión y dirección empresarial Master</option>
              <option value="Podcast">Podcast</option>
            </select>
          </div>
        </label>

        

        <label class="mwi-terms"><input type="checkbox" name="terms" required> Acepto <a href="#/terms" data-link style="color:#d4a955; text-decoration:underline;">términos y condiciones</a></label>

        <button class="mwi-btn-create" type="submit">CREAR CUENTA</button>

        <p class="mwi-modal-note">Al registrarte obtendrás acceso a la plataforma educativa del instituto.</p>
      </form>
    </section>
  </div>
</div>

<!-- NEW: Modal INDEPENDIENTE para INICIAR SESIÓN (mismo estilo, separado del register-modal) -->
<div id="login-modal" class="mwi-modal" aria-hidden="true" style="display:none;">
  <div class="mwi-modal-backdrop" id="login-modal-backdrop"></div>

  <div class="mwi-modal-content" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
    <button id="login-modal-close" class="mwi-modal-close" aria-label="Cerrar">✕</button>

    <div class="mwi-modal-left" aria-hidden="false">
      <div>
        <h3>MODERN WEALTH<br/>INSTITUTE</h3>
        <p>Accede a tu formación profesional en negocios digitales y financieros.</p>
        <!-- agregado: lista de beneficios (lado izquierdo del modal de login) -->
        <ul>
          <li>Masters certificados</li>
          <li>Acceso 24/7</li>
          <li>Plataforma privada</li>
          <li>Podcast</li>
          <li>Sesiones en vivo</li>
          <li>Actualizaciones constantes</li>
          <li>Mentorías personalizadas</li>
        </ul>
      </div>

      <div style="font-size:12px;color:#b79a6f;">
        <strong>© Modern Wealth Institute</strong><br/>
        Formación práctica y resultados medibles.
      </div>
    </div>
    

    <div class="mwi-modal-separator" aria-hidden="true"></div>

    <section class="mwi-modal-right" aria-labelledby="login-modal-title" style="max-width:520px;">
      <form id="login-form-modal" class="mwi-login-form" autocomplete="off">
      <div class="mwi-auth-tabs">
         <button type="button" onclick="switchLoginToRegisterInline(); return false;">REGISTRARME</button>
          <button class="active" type="button" onclick="showLoginInRegisterModal(); return false;">INICIAR SESIÓN</button>

       </div>
        <label>Correo electrónico
          <div class="mwi-field">
            <span class="mwi-input-icon">✉️</span>
            <input type="email" name="loginEmail" placeholder="nombre@correo.com" required>
          </div>
        </label>

        <label>Contraseña
          <div class="mwi-field">
            <span class="mwi-input-icon">🔒</span>
            <input type="password" name="loginPassword" placeholder="contraseña" required>
          </div>
        </label>
        

        <div style="display:flex; align-items:center; gap:12px; margin-top:8px;">
          <label class="mwi-terms" style="margin:0;">
            <input type="checkbox" name="remember"> Recordarme
          </label>
          <a href="/forgot-password" data-link style="margin-left:auto; color:#d4a955;">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="mwi-btn-create" style="margin-top:16px;">Iniciar sesión</button>
      </form>
    </section>
  </div>
</div>

<div class="mwi-hero-divider"></div>
<section class="mwi-trust">
  <h2 class="mwi-trust-title">
    Más de <span>9000</span> alumnos han confiado en nosotros
  </h2>
</section>
<section class="mwi-about">

  <!-- Frase superior -->
  <div class="mwi-about-top">
  </div>

  <!-- Contenido principal -->
  <div class="mwi-about-content">

    <!-- Texto -->
    <div class="mwi-about-text">
      <span class="mwi-badge">Acerca de nosotros</span>

      <h2>
        MODERN WEALTH<br />
        INSTITUTE
      </h2>

      <p class="mwi-description">
        Brindamos educación moderna, accesible y orientada a resultados,
        diseñada para que cualquier persona desarrolle habilidades prácticas 
        que impulsen su crecimiento personal, profesional y financiero, 
        creando una vida más consciente, libre y sostenible en el mundo actual.
      </p>

      <h4>Identidad</h4>
      <ul>
        <li>Modernidad</li>
        <li>Credibilidad</li>
        <li>Escalabilidad</li>
        <li>Libertad</li>
      </ul>
    </div>

    <!-- Imagen -->
    <div class="mwi-about-image">
      <img src="assets/images/about-mwi.png" alt="Modern Wealth Institute">

      <div class="mwi-students-badge">
        <strong>9k+</strong>
        <span>alumnos</span>
      </div>
    </div>

  </div>
</section>

<section class="mwi-services">

  <span class="mwi-badge">Servicios</span>

  <h2 class="mwi-services-title">
    Impúlsate con nuestros servicios
  </h2>

  <div class="mwi-services-grid">

    <!-- Card 1 -->
    <a href="#/services-inner-circle" class="mwi-service-card" data-link role="button">
      <div class="mwi-service-image">
        <img src="assets/images/services-inner-circle.png" alt="">
      </div>
    </a>

    <!-- Card 2 -->
    <a href="#/services-viral-push" class="mwi-service-card" data-link role="button">
      <div class="mwi-service-image">
        <img src="assets/images/services-viral-push.png" alt="">
      </div>
    </a>

    <!-- Card 3 -->
    <a href="#/services-ecommerce-mentoring" class="mwi-service-card" data-link role="button">
      <div class="mwi-service-image">
        <img src="assets/images/services-ecommerce-mentoring.png" alt="">
      </div>
    </a>

  </div> <!-- cierre de mwi-services-grid -->

</section>

<section class="mwi-masters">

  <div class="mwi-masters-container">

    <span class="mwi-badge">Masters</span>

    <h2 class="mwi-masters-title">
      Líder global en la formación <br>
      y dominio de los negocios modernos
    </h2>

    <div class="mwi-masters-carousel">

      <a href="#/masters/amazon-seller" class="mwi-master-card" data-master="amazon" onclick="openMasterAmazonInline(event)">
        <img src="assets/images/master-amazon-seller.png" alt="Amazon Seller Master">
        <div class="mwi-master-overlay">
          <h3>Amazon Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/trading" class="mwi-master-card" data-master="trading" onclick="openMasterTradingInline(event)">
        <img src="assets/images/master-trading.png" alt="Trading Master">
        <div class="mwi-master-overlay">
          <h3>Trading<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/vida-proposito" class="mwi-master-card" data-master="vida" onclick="openMasterVidaInline(event)">
        <img src="assets/images/master-vida-proposito.png" alt="Vida con Propósito">
        <div class="mwi-master-overlay">
          <h3>Vida con propósito<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/cripto-arbitrage" class="mwi-master-card" data-master="cripto" onclick="openMasterCriptoInline(event)">
        <img src="assets/images/master-cripto-arbitrage.png" alt="Cripto Arbitrage">
        <div class="mwi-master-overlay">
          <h3>Cripto Arbitrage<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/ebay-seller" class="mwi-master-card" data-master="ebay" onclick="openMasterEbayInline(event)">
        <img src="assets/images/master-ebay-seller.png" alt="Ebay Seller">
        <div class="mwi-master-overlay">
          <h3>Ebay Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/direccion-empresarial" class="mwi-master-card" data-master="empresarial" onclick="openMasterEmpresarialInline(event)">
        <img src="assets/images/master-gestion-empresarial.png" alt="Dirección Empresarial">
        <div class="mwi-master-overlay">
          <h3>Dirección Empresarial<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/master-meli" class="mwi-master-card" data-master="meli" onclick="openMasterMeliInline(event)">
        <img src="assets/images/master-meli.png" alt="Top Seller MeLi">
        <div class="mwi-master-overlay">
          <h3>Top Seller MeLi<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/shein-seller" class="mwi-master-card" data-master="shein" onclick="openMasterSheinInline(event)">
        <img src="assets/images/master-shein-seller.png" alt="Shein Seller">
        <div class="mwi-master-overlay">
          <h3>Shein Seller<br><span>Master</span></h3>
        </div>
      </a>

      <a href="#/masters/social-media" class="mwi-master-card" data-master="social" onclick="openMasterSocialInline(event)">
        <img src="assets/images/master-social-media.png" alt="Social Media Management">
        <div class="mwi-master-overlay">
          <h3>Social Media Management<br><span>Master</span></h3>
        </div>
      </a>

    </div>

  </div>

</section>
<!-- Podcasts carousel (inline below Masters) -->
<section class="mwi-podcasts" style="margin-top:64px;">

  <div class="mwi-masters-container">

    <span class="mwi-badge">Podcasts</span>

    <h2 class="mwi-masters-title">
      Episodios destacados del Podcast MWI
    </h2>

    <div class="mwi-masters-carousel" id="podcast-carousel">
      <!-- podcasts from mongo -->
    </div>

  </div>

</section>
<section class="mwi-testimonials">

  <span class="mwi-badge">Testimonios</span>

  <h2 class="mwi-testimonials-title">
    Lo que nuestros alumnos dicen <br>
    de nuestros programas
  </h2>

  <div class="mwi-testimonials-grid">

    <!-- Testimonio 1 -->
    <div class="mwi-testimonial-card">

      <div class="mwi-testimonial-tag"></div>

      <div class="mwi-testimonial-arrow">↗</div>

      <div class="mwi-testimonial-stars">
        ★★★★★
      </div>

      <blockquote>
        Me incursioné por el master de Amazon y no pasó ni un mes desde que lo terminé y ya tenía ventas en la plataforma.
      </blockquote>

      <div class="mwi-testimonial-user">
        <img src="assets/images/testimonial-juan.jpg" alt="Juan Hernandez">
        <div>
          <strong>Juan Hernandez</strong>
          <span>Suscrito el 2024</span>
        </div>
      </div>

    </div>

    <!-- Testimonio 2 -->
    <div class="mwi-testimonial-card">

      <div class="mwi-testimonial-tag"></div>

      <div class="mwi-testimonial-arrow">↗</div>

      <div class="mwi-testimonial-stars">
        ★★★★★
      </div>

      <blockquote>
        He probado diferentes academias, lo que Modern Wealth enseña es realmente diferente a lo que pueden encontrar en internet.
      </blockquote>

      <div class="mwi-testimonial-user">
        <img src="assets/images/testimonial-camilo.jpg" alt="Camilo Lara">
        <div>
          <strong>Camilo Lara</strong>
          <span>Suscrito el 2025</span>
        </div>
      </div>

    </div>

  </div>

</section>


<!-- footer (incrustado manualmente, layout ajustado) -->
      <style>
        /* Footer reducido y layout en tres columnas: brand | center | right */
        .mwi-footer { padding:12px 10px !important; background:transparent; color:#efe6d6; }
        .mwi-footer * { box-sizing:border-box; }
        .mwi-footer-newsletter { display:flex; gap:8px; align-items:center; margin-bottom:12px; justify-content:center; }
        .mwi-footer-newsletter input { padding:6px 8px; font-size:12px; height:32px; min-width:200px; }
        .mwi-footer-newsletter button { padding:6px 10px; font-size:12px; }

        .mwi-footer-content {
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:24px;
          width:100%;
          max-width:1100px;
          margin:0 auto;
        }

        /* Marca (izquierda) */
        .mwi-footer-brand { flex:0 0 260px; display:flex; gap:8px; flex-direction:column; align-items:center; text-align:center; }
        .mwi-footer-brand img { width:140px; height:auto; display:block; margin-bottom:6px; }
        .mwi-footer-brand p { font-size:13px; margin:0; line-height:1.2; color:#efe6d6; }

        /* Centro: 'Trabaja con nosotros' centrado */
        .mwi-footer-column.center { flex:1 1 auto; text-align:center; }
        .mwi-footer-column.center h4 { margin-bottom:8px; }
        .mwi-footer-column.center ul { padding:0; margin:0; list-style:none; display:inline-block; text-align:left; }

        /* Derecha: legal alineado a la derecha */
        .mwi-footer-column.right { flex:0 0 260px; text-align:right; }
        .mwi-footer-column.right ul { padding:0; margin:0; list-style:none; }

        .mwi-footer-column h4 { font-size:13px; margin:0 0 6px; color:#d4a955; }
        .mwi-footer-column ul li { font-size:12px; margin-bottom:6px; }
        .mwi-footer-bottom { font-size:12px; padding:8px 0; text-align:center; margin-top:8px; color:#bfa971; }

        @media (max-width:880px) {
          .mwi-footer-content { flex-direction:column; align-items:center; gap:12px; padding:0 10px; }
          .mwi-footer-brand { justify-content:center; align-items:center; }
          .mwi-footer-brand img { width:110px; }
          .mwi-footer-column.center ul { display:block; text-align:center; }
          .mwi-footer-column.right { text-align:center; }
        }
      </style>

      <footer class="mwi-footer">
        <!-- Newsletter (colocado arriba, centrado) -->
        <div class="mwi-footer-newsletter" style="max-width:1100px; margin:0 auto 12px;">
           <input type="email" placeholder="Correo electrónico">
           <button>Suscríbete</button>
         </div>

         <!-- Contenido distribuido -->
         <div class="mwi-footer-content">
          <!-- Marca (izquierda, logo encima del texto) -->
          <div class="mwi-footer-brand">
            <img src="assets/images/logo-mwi-gold.png" alt="Modern Wealth Institute">
            <p>Educación que transforma<br>conocimiento en oportunidades.</p>
          </div>

           <!-- Trabaja con nosotros (centro) -->
           <div class="mwi-footer-column center">
             <h4>Trabaja con nosotros</h4>
             <ul>
               <li><a href="https://wa.me/573003517982?text=estoy%20interesad%40%20en%20participar%20en%20el%20affiliate%20program%2C%20podrias%20darme%20mas%20informacion%3F" target="_blank" rel="noopener noreferrer">Affiliate Program</a></li>
               <li><a href="https://wa.me/573003517982?text=Hola%2C%20estoy%20interesad%40%20en%20a%C3%B1adir%20un%20master%20a%20su%20portafolio%20de%20masters" target="_blank" rel="noopener noreferrer">Mentorship Alliance</a></li>
               <li><a href="https://wa.me/573003517982?text=Hola%2C%20quisiera%20saber%20si%20hay%20vacantes%20para%20trabajar%20con%20el%20Modern%20Wealth%20Institute" target="_blank" rel="noopener noreferrer">Job Qualify</a></li>
             </ul>
           </div>

           <!-- Legal (derecha) -->
           <div class="mwi-footer-column right">
             <h4>Legal</h4>
             <ul>
               <li><a href="#/terms" data-link>Términos & Condiciones</a></li>
               <li><a href="#/privacy" data-link>Política de Privacidad</a></li>
               <li><a href="#/payments" data-link>Política de Pagos</a></li>
               <li><a href="#/legal" data-link>Aviso Legal</a></li>
             </ul>
           </div>
         </div>

         <!-- Línea inferior -->
         <div class="mwi-footer-bottom">
           <span>© 2025 Modern Wealth Institute. Todos los derechos reservados.</span>
         </div>
       </footer>

      ${Footer.render()}
    `;
  },

  /**
   * Inicializa handlers para abrir/cerrar el modal de registro.
   * Asegúrate de que tu enrutador llame a HomePage.after_render()
   * tras insertar el HTML en el DOM.
   */
  after_render() {
    // ⛔ No ejecutar lógica si ya hay sesión
    try {
      if (typeof AuthManager !== 'undefined' && AuthManager.isAuthenticated && AuthManager.isAuthenticated()) return;
    } catch (_) {}
        // Load podcast featured episodes from MongoDB and render into homepage carousel
        async function loadPodcastFromMongo() {
          try { console.log('⏳ Loading podcasts from Mongo...'); } catch (_) {}
          try {
            const episodes = await (window.PodcastService && typeof window.PodcastService.getHomepage === 'function'
              ? window.PodcastService.getHomepage()
              : Promise.resolve([]));
            try { console.log('🎧 Episodes:', episodes); } catch (_) {}
            const container = document.getElementById('podcast-carousel');
            if (!container) return;

            container.innerHTML = (episodes || []).map((p, i) => `
              <a href="#" class="mwi-master-card"
                 data-podcast="${p._id || p.id || ''}"
                 onclick="openRegisterGlobal(event)"
                 style="position:relative;">

                <img src="${p.image || p.thumbnail || (i===0?'assets/images/img1podcast.png':i===1?'assets/images/img2podcast.png':i===2?'assets/images/img3podcast.png':'assets/images/img1podcast.png')}"
                     alt="${p.title || ''}"
                     onerror="this.src='assets/images/logo-mwi-gold.png'"
                     style="display:block;width:100%;height:100%;object-fit:cover;border-radius:6px;" />

                <div class="mwi-master-overlay">
                  <h3>${p.title || ''}<br><span>${p.duration || ''}</span></h3>
                </div>

                <div style="position:absolute;left:12px;top:12px;
                  background:rgba(0,0,0,0.55);
                  color:#d4a955;
                  font-weight:800;
                  padding:4px 8px;
                  border-radius:6px;">
                  PODCAST
                </div>

                <div style="position:absolute;right:12px;top:12px;
                  background:rgba(0,0,0,0.55);
                  color:#fff;
                  padding:4px 8px;
                  border-radius:50%;
                  width:32px;height:32px;
                  display:flex;align-items:center;justify-content:center;">
                  ▶
                </div>
              </a>
            `).join('');
          } catch (e) {
            console.error('Podcast load error', e);
          }
        }

        // Trigger load after DOM ready for HomePage
        try { loadPodcastFromMongo(); } catch (e) {}
    const regModal = document.getElementById('register-modal');
    const loginModal = document.getElementById('login-modal');

    const openReg = () => {
      if (!regModal) return;
      regModal.style.display = 'block';
      regModal.setAttribute('aria-hidden', 'false');
      const first = regModal.querySelector('input, button, select, textarea, a');
      if (first) first.focus();
      document.documentElement.style.overflow = 'hidden';
    };
    const closeReg = () => {
      if (!regModal) return;
      regModal.style.display = 'none';
      regModal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    };

    const openLogin = () => {
      if (!loginModal) return;
      loginModal.style.display = 'block';
      loginModal.setAttribute('aria-hidden', 'false');
      const first = loginModal.querySelector('input, button, select, textarea, a');
      if (first) first.focus();
      document.documentElement.style.overflow = 'hidden';
    };
    const closeLogin = () => {
      if (!loginModal) return;
      loginModal.style.display = 'none';
      loginModal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    };

    // Delegated clicks: abrir/cerrar modales (separados)
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!t || !t.closest) return;

      // detectar botón "Acerca de nosotros" (id o texto del enlace)
      const aboutBtn = t.closest('#about-btn') || (t.closest('a') && (t.closest('a').textContent || '').trim().toLowerCase().includes('acerca de nosotros') ? t.closest('a') : null);
      if (aboutBtn) {
        e.preventDefault();
        // cerrar modales si están abiertos
        if (regModal && regModal.style.display === 'block') closeReg();
        if (loginModal && loginModal.style.display === 'block') closeLogin();
        // scroll suave al bloque .mwi-about ajustando por header
        const scrollToAbout = () => {
          const target = document.querySelector('.mwi-about');
          if (!target) return;
          const header = document.querySelector('.mwi-header');
          const offset = header ? header.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 12;
          window.scrollTo({ top, behavior: 'smooth' });
        };
        setTimeout(scrollToAbout, 60);
        return;
      }

      if (t.closest('#open-register') || t.closest('a[href="#/register"]') || t.closest('a[href="/register"]')) {
        e.preventDefault(); openReg(); return;
      }
      if (t.closest('#open-login') || t.closest('a[href="#/login"]') || t.closest('a[href="/login"]') || (t.closest('a[data-link]') && t.closest('a[data-link]').getAttribute('href') === '/login')) {
        e.preventDefault(); openLogin(); return;
      }
      if (t.closest('#register-modal-close') || t.closest('#register-modal-backdrop')) {
        e.preventDefault(); closeReg(); return;
      }
      if (t.closest('#login-modal-close') || t.closest('#login-modal-backdrop')) {
        e.preventDefault(); closeLogin(); return;
      }
    });

    // Escape: close login first, otherwise register
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (loginModal && loginModal.style.display === 'block') closeLogin();
        else if (regModal && regModal.style.display === 'block') closeReg();
      }
    });

    // Register submit handler (attach once)
    const registerForm = document.getElementById('register-form');
    if (registerForm && !registerForm.__hasHandler) {
      registerForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const name = form.name ? form.name.value.trim() : '';
        const email = form.email ? form.email.value.trim() : '';
        const country = form.country ? form.country.value : '';
        const phone = form.phone ? form.phone.value.trim() : '';
        const password = form.password ? form.password.value : '';
        const master = form.master ? form.master.value : '';
        const termsAccepted = form.terms && form.terms.checked;
        if (!termsAccepted) { Utils.showError('Debes aceptar los términos y condiciones'); return; }
        if (!email || !password || !name) { Utils.showError('Completa los campos requeridos'); return; }
        const result = AuthManager.register({ name, email, password, phone: country + phone, master });
        if (result && result.success) { Utils.showSuccess(result.message || 'Registro exitoso'); closeReg(); Router.navigate(AuthManager.getDefaultRoute()); }
        else Utils.showError((result && result.message) || 'Error al registrar');
      });
      registerForm.__hasHandler = true;
    }

    // --- Login submit handler (attach once) ---
    const loginForm = document.getElementById('login-form-modal');
    if (loginForm && !loginForm.__hasHandler) {
      loginForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const email = loginForm.loginEmail ? loginForm.loginEmail.value.trim() : (loginForm.querySelector('[name="loginEmail"]')||{}).value || '';
        const password = loginForm.loginPassword ? loginForm.loginPassword.value : (loginForm.querySelector('[name="loginPassword"]')||{}).value || '';
        if (!email || !password) { Utils.showError('Email y contraseña son requeridos'); return; }

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        const startTs = Date.now();
        // Preferir overlay del RegisterPage; fallback ligero local
        let usedLocalOverlay = false;
        const showLocalOverlay = (msg) => {
          usedLocalOverlay = true;
          try {
            const overlay = document.createElement('div');
            overlay.id = 'mwi-loading-overlay-home-login';
            overlay.style.position = 'fixed'; overlay.style.inset = '0'; overlay.style.background = 'rgba(0,0,0,0.66)';
            overlay.style.display = 'flex'; overlay.style.alignItems = 'center'; overlay.style.justifyContent = 'center'; overlay.style.zIndex = '9999';
            const s = document.createElement('style'); s.textContent = '@keyframes mwi-spin-hl {from{transform:rotate(0)}to{transform:rotate(360deg)}}'; overlay.appendChild(s);
            const box = document.createElement('div'); box.style.background = 'linear-gradient(180deg,#171515,#0f0d0c)'; box.style.border = '1px solid rgba(212,169,85,.22)'; box.style.borderRadius = '12px'; box.style.padding = '18px 22px'; box.style.minWidth = '280px'; box.style.boxShadow = '0 10px 28px rgba(0,0,0,.55)'; box.style.color = '#e8dcc0'; box.style.display = 'flex'; box.style.flexDirection = 'column'; box.style.alignItems = 'center'; box.style.gap = '12px';
            const spinner = document.createElement('div'); spinner.style.width = '42px'; spinner.style.height = '42px'; spinner.style.border = '4px solid rgba(212,169,85,.18)'; spinner.style.borderTopColor = '#d4a955'; spinner.style.borderRadius = '50%'; spinner.style.animation = 'mwi-spin-hl .9s linear infinite';
            const msgEl = document.createElement('div'); msgEl.textContent = msg || 'Iniciando sesión...'; msgEl.style.fontWeight = '800'; msgEl.style.color = '#f6e9c9'; msgEl.style.textAlign = 'center'; msgEl.style.fontSize = '14px';
            box.appendChild(spinner); box.appendChild(msgEl); overlay.appendChild(box); document.body.appendChild(overlay);
          } catch {}
        };
        const hideLocalOverlay = () => { try { document.getElementById('mwi-loading-overlay-home-login')?.remove(); } catch {} };

        try {
          if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.showLoadingOverlay === 'function') {
            RegisterPage.showLoadingOverlay('Iniciando sesión...');
          } else {
            showLocalOverlay('Iniciando sesión...');
          }
        } catch { showLocalOverlay('Iniciando sesión...'); }

        const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
        try {
          const res = await fetch(`${base}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            // Ocultar overlay en error
            try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.hideLoadingOverlay === 'function') RegisterPage.hideLoadingOverlay(); } catch {}
            if (usedLocalOverlay) hideLocalOverlay();
            if (submitBtn) submitBtn.disabled = false;
            Utils.showError(data.message || 'Credenciales inválidas');
            return;
          }

          if (data.token) localStorage.setItem('mwi:token', data.token);
          try {
            const roleRaw = (data.role ?? (data.user && data.user.role));
            const userObj = {
              id: data.id ?? data.userId ?? `user-${Date.now()}`,
              name: data.name ?? '',
              email: data.email ?? email,
              role: (roleRaw == null ? roleRaw : String(roleRaw).toLowerCase()),
              isPaid: data.isPaid ?? false
            };
            localStorage.setItem('mwi:user', JSON.stringify(userObj));
          } catch {}

          // Asegurar un tiempo mínimo de overlay (~5s)
          const minDelayMs = 5000;
          const elapsed = Date.now() - startTs;
          const waitMs = Math.max(0, minDelayMs - elapsed);
          setTimeout(async () => {
            try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.hideLoadingOverlay === 'function') RegisterPage.hideLoadingOverlay(); } catch {}
            if (usedLocalOverlay) hideLocalOverlay();
            if (submitBtn) submitBtn.disabled = false;
            Utils.showSuccess('Ingreso exitoso');
            closeLogin();
            try { await AuthManager.bootstrap(); } catch {}
            Router.navigate(AuthManager.getDefaultRoute());
          }, waitMs);
          return;
        } catch (err) {
          console.error('[Modal Login] error', err);
          try { if (typeof RegisterPage !== 'undefined' && typeof RegisterPage.hideLoadingOverlay === 'function') RegisterPage.hideLoadingOverlay(); } catch {}
          if (usedLocalOverlay) hideLocalOverlay();
          if (submitBtn) submitBtn.disabled = false;
          Utils.showError('Error de conexión');
        }
      });
      loginForm.__hasHandler = true;
    }

    // --- Nuevo: interceptar clicks en los cards de servicios y render inline ---
    (function() {
      const serviceAnchors = document.querySelectorAll('a.mwi-service-card[href]');
      if (!serviceAnchors || !serviceAnchors.length) return;
      serviceAnchors.forEach(a => {
        if (a.__hasServiceHandler) return;
        // usar capture para prevenir la navegación por defecto lo antes posible
        a.addEventListener('click', (ev) => {
          try { ev.preventDefault(); } catch (e) {}
          const href = (a.getAttribute('href') || '').toLowerCase();
          // extraer slug (ej: #/services-inner-circle or /services-inner-circle)
          let slug = href.split('#/')[1] || href.replace(/^\//, '');
          slug = (slug || '').replace(/^\/+/, '');
          if (!slug) return;
          try { history.pushState(null, '', '#/' + slug); } catch (e) {}
          // render inline según slug
          if (slug === 'services-inner-circle' && window.ServicesInnerCircle) {
            const main = document.querySelector('main.homepage') || document.querySelector('main');
            if (main) {
              main.innerHTML = window.ServicesInnerCircle.render();
              window.scrollTo(0, 0);
              try { if (typeof window.ServicesInnerCircle.after_render === 'function') window.ServicesInnerCircle.after_render(); } catch (err) {}
            }
            return;
          }
          // placeholders para los demás servicios
          const main = document.querySelector('main.homepage') || document.querySelector('main');
          if (!main) return;
          if (slug === 'services-viral-push') {
            main.innerHTML = '<main style="padding:48px;color:#efe6d6;"><h1>Viral Push</h1><p>Próximamente...</p></main>';
            window.scrollTo(0, 0);
            return;
          }
          if (slug === 'services-ecommerce-mentoring') {
            main.innerHTML = '<main style="padding:48px;color:#efe6d6;"><h1>E-commerce Mentoring</h1><p>Próximamente...</p></main>';
            window.scrollTo(0, 0);
            return;
          }
        }, true); // capture = true
        a.__hasServiceHandler = true;
      });
    })();
},

 }; // end of HomePage
 
 // Añadir manejo global delegado para abrir/cerrar el modal aunque after_render no se haya llamado
 (function() {
  const openRegisterGlobal = () => {
    const modal = document.getElementById('register-modal');
    if (!modal) return;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    const first = modal.querySelector('input, button, select, textarea, a');
    if (first) first.focus();
    document.documentElement.style.overflow = 'hidden';
  };
  const openLoginGlobal = () => {
    const modal = document.getElementById('login-modal');
    if (!modal) return;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    const first = modal.querySelector('input, button, select, textarea, a');
    if (first) first.focus();
    document.documentElement.style.overflow = 'hidden';
  };
  const closeAllGlobal = () => {
    // Guard clause: no ejecutar lógica si ya está autenticado
    try {
      if (typeof AuthManager !== 'undefined' && typeof AuthManager.isAuthenticated === 'function' && AuthManager.isAuthenticated()) {
        return;
      }
    } catch (_) { /* noop */ }
    const reg = document.getElementById('register-modal');
    const log = document.getElementById('login-modal');
    if (reg) { reg.style.display = 'none'; reg.setAttribute('aria-hidden','true'); }
    if (log) { log.style.display = 'none'; log.setAttribute('aria-hidden','true'); }
    document.documentElement.style.overflow = '';
  };

  // Interceptar clicks en anchors de servicios (capture) y renderizar ServicesInnerCircle inline
  function __captureServiceLinks(ev) {
    try {
        const a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      try { history.pushState(null, '', '#/' + slug); } catch (e) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) return;
      if (slug === 'services-inner-circle') {
        ensureServicesScriptLoaded().then(() => {
          if (window.ServicesInnerCircle) {
            main.innerHTML = window.ServicesInnerCircle.render();
            window.scrollTo(0, 0);
            try { if (typeof window.ServicesInnerCircle.after_render === 'function') window.ServicesInnerCircle.after_render(); } catch (err) {}
          }
        }).catch(() => {
          // fallback: setea hash para que otros listeners lo manejen
          try { window.location.hash = '#/services-inner-circle'; } catch (e) {}
        });
        return;
      }
      if (slug === 'services-viral-push') {
        ensureViralScriptLoaded().then(() => {
          if (window.ServicesViralPush) {
            main.innerHTML = window.ServicesViralPush.render();
            window.scrollTo(0, 0);
            try { if (typeof window.ServicesViralPush.after_render === 'function') window.ServicesViralPush.after_render(); } catch (err) {}
            return;
          }
          // fallback simple
          main.innerHTML = '<main style="padding:48px;color:#efe6d6;"><h1>Viral Push</h1><p>Próximamente...</p></main>';
          window.scrollTo(0, 0);
        }).catch(() => {
          try { window.location.hash = '#/services-viral-push'; } catch (e) {}
        });
        return;
      }
      if (slug === 'services-ecommerce-mentoring') {
        ensureEcommerceScriptLoaded().then(() => {
          if (window.ServicesEcommerceMentoring) {
            main.innerHTML = window.ServicesEcommerceMentoring.render();
            window.scrollTo(0, 0);
            try { if (typeof window.ServicesEcommerceMentoring.after_render === 'function') window.ServicesEcommerceMentoring.after_render(); } catch (err) {}
            return;
          }
          main.innerHTML = '<main style="padding:48px;color:#efe6d6;"><h1>E-commerce Mentoring</h1><p>Próximamente...</p></main>';
          window.scrollTo(0, 0);
        }).catch(() => {
          try { window.location.hash = '#/services-ecommerce-mentoring'; } catch (e) {}
        });
        return;
      }
    } catch (err) { /* ignore */ }
  }
  try { document.addEventListener('click', __captureServiceLinks, true); } catch (e) {}

  // Guardar HTML original y funciones para swap inline entre register <-> login dentro del mismo popup
  (function() {
    function showLoginInRegisterModal() {
      const regModal = document.getElementById('register-modal');
      const loginModal = document.getElementById('login-modal');
      // close register if open, then open login modal
      if (regModal) { regModal.style.display = 'none'; regModal.setAttribute('aria-hidden','true'); }
      if (loginModal) {
        loginModal.style.display = 'block';
        loginModal.setAttribute('aria-hidden','false');
        const first = loginModal.querySelector('input, button, select, textarea, a');
        if (first) first.focus();
        document.documentElement.style.overflow = 'hidden';
      }
    }

    function showRegisterInRegisterModal() {
      const regModal = document.getElementById('register-modal');
      const loginModal = document.getElementById('login-modal');
      if (loginModal) { loginModal.style.display = 'none'; loginModal.setAttribute('aria-hidden','true'); }
      if (regModal) {
        regModal.style.display = 'block';
        regModal.setAttribute('aria-hidden','false');
        const first = regModal.querySelector('input, button, select, textarea, a');
        if (first) first.focus();
        document.documentElement.style.overflow = 'hidden';
      }
    }

    // Desde login modal: abrir register modal (no cerrar fondo ni navegar)
    function switchLoginToRegisterInline() {
      const loginModal = document.getElementById('login-modal');
      if (loginModal) { loginModal.style.display = 'none'; loginModal.setAttribute('aria-hidden','true'); }
      const regModal = document.getElementById('register-modal');
      if (regModal) {
        regModal.style.display = 'block';
        regModal.setAttribute('aria-hidden','false');
        const first = regModal.querySelector('input, button, select, textarea, a');
        if (first) first.focus();
        document.documentElement.style.overflow = 'hidden';
      }
    }

    if (typeof window !== 'undefined') {
      window.showLoginInRegisterModal = showLoginInRegisterModal;
      window.showRegisterInRegisterModal = showRegisterInRegisterModal;
      window.switchLoginToRegisterInline = switchLoginToRegisterInline;
    }
  })();

  // Verified modal logic removed: we now redirect to /#/verification-success

  // Capture-phase handler: intercepta enlaces "Acerca de nosotros" y evita cambiar la URL
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    const href = (a.getAttribute('href') || '').toLowerCase();
    const txt = (a.textContent || '').trim().toLowerCase();
    const isAbout = href.includes('#/about') || href.includes('/about') || txt.includes('acerca de nosotros');
    if (!isAbout) return;
    e.preventDefault();
    // cerrar modales abiertos
    const reg = document.getElementById('register-modal');
    const log = document.getElementById('login-modal');
    if (reg && reg.style.display === 'block') { reg.style.display = 'none'; reg.setAttribute('aria-hidden','true'); }
    if (log && log.style.display === 'block') { log.style.display = 'none'; log.setAttribute('aria-hidden','true'); }

    const scrollToAbout = () => {
      const target = document.querySelector('.mwi-about');
      if (!target) return false;
      const header = document.querySelector('.mwi-header');
      const offset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      return true;
    };

    if (!scrollToAbout()) {
      // si no está la sección (no estamos en homepage), navegar a home y reintentar
      if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') Router.navigate('/');
      else window.location.href = '/#/';
      let attempts = 0;
      const maxAttempts = 30;
      const iv = setInterval(() => {
        attempts++;
        if (scrollToAbout() || attempts >= maxAttempts) clearInterval(iv);
      }, 150);
    }
  }, true);

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    // Intercept links to "about" early (capture phase equivalent behavior)
    try {
      const anchor = t.closest && t.closest('a');
      const href = anchor && (anchor.getAttribute('href') || '').toLowerCase();
      const text = anchor && (anchor.textContent || '').trim().toLowerCase();
      const isAboutLink = href && (href.includes('/about') || href.includes('#/about')) || text && text.includes('acerca de nosotros');
      if (isAboutLink) {
        e.preventDefault();
        // close any open modal
        const reg = document.getElementById('register-modal');
        const log = document.getElementById('login-modal');
        if (reg && reg.style.display === 'block') { reg.style.display = 'none'; reg.setAttribute('aria-hidden','true'); }
        if (log && log.style.display === 'block') { log.style.display = 'none'; log.setAttribute('aria-hidden','true'); }

        const scrollToAboutNow = () => {
          const target = document.querySelector('.mwi-about');
          if (!target) return false;
          const header = document.querySelector('.mwi-header');
          const offset = header ? header.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 12;
          window.scrollTo({ top, behavior: 'smooth' });
          return true;
        };

        // If .mwi-about present now -> scroll, otherwise navigate home then retry
        if (!scrollToAboutNow()) {
          if (typeof Router !== 'undefined' && typeof Router.navigate === 'function') {
            Router.navigate('/');
          } else {
            window.location.href = '/#/';
          }
          // retry after render / small delay (tries few times)
          let attempts = 0;
          const maxAttempts = 20;
          const interval = setInterval(() => {
            attempts++;
            if (scrollToAboutNow() || attempts >= maxAttempts) clearInterval(interval);
          }, 150);
        }
        return;
      }
    } catch (err) {
      // ignore and continue to other handlers
    }
    if (t.closest('#open-register') || t.closest('a[href="#/register"]') || t.closest('a[href="/register"]')) {
      e.preventDefault(); openRegisterGlobal(); return;
    }
    if (t.closest('#open-login') || t.closest('a[href="#/login"]') || t.closest('a[href="/login"]') || (t.closest('a[data-link]') && t.closest('a[data-link]').getAttribute('href') === '/login')) {
      e.preventDefault(); openLoginGlobal(); return;
    }
    if (t.closest('#register-modal-close') || t.closest('#register-modal-backdrop') || t.closest('#login-modal-close') || t.closest('#login-modal-backdrop')) {
      e.preventDefault(); closeAllGlobal(); return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const reg = document.getElementById('register-modal');
      const log = document.getElementById('login-modal');
      if (log && log.style.display === 'block') { log.style.display = 'none'; log.setAttribute('aria-hidden','true'); document.documentElement.style.overflow=''; }
      else if (reg && reg.style.display === 'block') { reg.style.display = 'none'; reg.setAttribute('aria-hidden','true'); document.documentElement.style.overflow=''; }
    }
  });

  // Insertar al final del IIFE (antes de "})();")
  // --- FORCE: renderizar ServicesInnerCircle cuando el hash es #/services-inner-circle ---
  function __renderServiceHashImmediate() {
    try {
      const h = (location.hash || '').toLowerCase();
      if (!h.includes('/services-inner-circle')) return;
      if (!window.ServicesInnerCircle) return;
      // deferir para que cualquier router responda primero (evita race conditions)
      setTimeout(() => {
        const main = document.querySelector('main.homepage') || document.querySelector('main');
        if (!main) return;
        try {
          main.innerHTML = window.ServicesInnerCircle.render();
          if (typeof window.ServicesInnerCircle.after_render === 'function') {
            window.ServicesInnerCircle.after_render();
          }
        } catch (err) { /* ignore */ }
      }, 0);
    } catch (err) { /* ignore */ }
  }

  // loader dinámico para ServicesInnerCircle (devuelve Promise)
  function ensureServicesScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.ServicesInnerCircle) return Promise.resolve(window.ServicesInnerCircle);
    const existing = document.querySelector('script[data-services-inner="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.ServicesInnerCircle));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/ServicesInnerCircle.js';
      s.async = true;
      s.setAttribute('data-services-inner', '1');
      s.onload = () => resolve(window.ServicesInnerCircle);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para el nuevo componente Viral Push (otro.js)
  function ensureViralScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.ServicesViralPush) return Promise.resolve(window.ServicesViralPush);
    const existing = document.querySelector('script[data-viral="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.ServicesViralPush));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/otro.js';
      s.async = true;
      s.setAttribute('data-viral', '1');
      s.onload = () => resolve(window.ServicesViralPush);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para E-commerce Mentoring (servicesEcommerce.js)
  function ensureEcommerceScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.ServicesEcommerceMentoring) return Promise.resolve(window.ServicesEcommerceMentoring);
    const existing = document.querySelector('script[data-ecom="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.ServicesEcommerceMentoring));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/servicesEcommerce.js';
      s.async = true;
      s.setAttribute('data-ecom', '1');
      s.onload = () => resolve(window.ServicesEcommerceMentoring);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Amazon Seller (masteramazonseller.js)
  function ensureMasterAmazonScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterAmazonSeller) return Promise.resolve(window.MasterAmazonSeller);
    const existing = document.querySelector('script[data-master-amazon="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterAmazonSeller));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/masteramazonseller.js';
      s.async = true;
      s.setAttribute('data-master-amazon', '1');
      s.onload = () => resolve(window.MasterAmazonSeller);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Trading (mastertrading.js)
  function ensureMasterTradingScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterTrading) return Promise.resolve(window.MasterTrading);
    const existing = document.querySelector('script[data-master-trading="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterTrading));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastertrading.js';
      s.async = true;
      s.setAttribute('data-master-trading', '1');
      s.onload = () => resolve(window.MasterTrading);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Vida (mastervida.js)
  function ensureMasterVidaScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterVida) return Promise.resolve(window.MasterVida);
    const existing = document.querySelector('script[data-master-vida="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterVida));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastervida.js';
      s.async = true;
      s.setAttribute('data-master-vida', '1');
      s.onload = () => resolve(window.MasterVida);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Cripto (mastercripto.js)
  function ensureMasterCriptoScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterCripto) return Promise.resolve(window.MasterCripto);
    const existing = document.querySelector('script[data-master-cripto="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterCripto));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastercripto.js';
      s.async = true;
      s.setAttribute('data-master-cripto', '1');
      s.onload = () => resolve(window.MasterCripto);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master eBay (masterebay.js)
  function ensureMasterEbayScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterEbay) return Promise.resolve(window.MasterEbay);
    const existing = document.querySelector('script[data-master-ebay="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterEbay));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/masterebay.js';
      s.async = true;
      s.setAttribute('data-master-ebay', '1');
      s.onload = () => resolve(window.MasterEbay);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Empresarial (masterempresarial.js)
  function ensureMasterEmpresarialScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterEmpresarial) return Promise.resolve(window.MasterEmpresarial);
    const existing = document.querySelector('script[data-master-empresarial="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterEmpresarial));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/masterempresarial.js';
      s.async = true;
      s.setAttribute('data-master-empresarial', '1');
      s.onload = () => resolve(window.MasterEmpresarial);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master MeLi (mastermeli.js)
  function ensureMasterMeliScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterMeli) return Promise.resolve(window.MasterMeli);
    const existing = document.querySelector('script[data-master-meli="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterMeli));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastermeli.js';
      s.async = true;
      s.setAttribute('data-master-meli', '1');
      s.onload = () => resolve(window.MasterMeli);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Shein (mastershein.js)
  function ensureMasterSheinScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterShein) return Promise.resolve(window.MasterShein);
    const existing = document.querySelector('script[data-master-shein="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterShein));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastershein.js';
      s.async = true;
      s.setAttribute('data-master-shein', '1');
      s.onload = () => resolve(window.MasterShein);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // loader dinámico para Master Social Media (mastersocialmedia.js)
  function ensureMasterSocialScriptLoaded() {
    if (typeof window === 'undefined') return Promise.reject();
    if (window.MasterSocialMedia) return Promise.resolve(window.MasterSocialMedia);
    const existing = document.querySelector('script[data-master-social="1"]');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(window.MasterSocialMedia));
        existing.addEventListener('error', reject);
      });
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/pages/mastersocialmedia.js';
      s.async = true;
      s.setAttribute('data-master-social', '1');
      s.onload = () => resolve(window.MasterSocialMedia);
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }

  // función global invocada desde el onclick del card Amazon (carga y render inline)
  if (typeof window !== 'undefined') {
    window.openMasterAmazonInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/amazon-seller'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/amazon-seller'; } catch (_) {}; return; }
      ensureMasterAmazonScriptLoaded().then(() => {
        if (window.MasterAmazonSeller) {
          try {
            main.innerHTML = window.MasterAmazonSeller.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterAmazonSeller.after_render === 'function') {
              try { window.MasterAmazonSeller.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/amazon-seller'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/amazon-seller'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/amazon-seller'; } catch (_) {}
      });
    };

    window.openMasterTradingInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/trading'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/trading'; } catch (_) {}; return; }
      ensureMasterTradingScriptLoaded().then(() => {
        if (window.MasterTrading) {
          try {
            main.innerHTML = window.MasterTrading.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterTrading.after_render === 'function') {
              try { window.MasterTrading.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/trading'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/trading'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/trading'; } catch (_) {}
      });
    };

    window.openMasterVidaInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/vida-proposito'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/vida-proposito'; } catch (_) {}; return; }
      ensureMasterVidaScriptLoaded().then(() => {
        if (window.MasterVida) {
          try {
            main.innerHTML = window.MasterVida.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterVida.after_render === 'function') {
              try { window.MasterVida.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/vida-proposito'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/vida-proposito'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/vida-proposito'; } catch (_) {}
      });
    };

    window.openMasterCriptoInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/cripto-arbitrage'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/cripto-arbitrage'; } catch (_) {}; return; }
      ensureMasterCriptoScriptLoaded().then(() => {
        if (window.MasterCripto) {
          try {
            main.innerHTML = window.MasterCripto.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterCripto.after_render === 'function') {
              try { window.MasterCripto.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/cripto-arbitrage'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/cripto-arbitrage'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/cripto-arbitrage'; } catch (_) {}
      });
    };

    window.openMasterEbayInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/ebay-seller'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/ebay-seller'; } catch (_) {}; return; }
      ensureMasterEbayScriptLoaded().then(() => {
        if (window.MasterEbay) {
          try {
            main.innerHTML = window.MasterEbay.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterEbay.after_render === 'function') {
              try { window.MasterEbay.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/ebay-seller'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/ebay-seller'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/ebay-seller'; } catch (_) {}
      });
    };

    window.openMasterEmpresarialInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/direccion-empresarial'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/direccion-empresarial'; } catch (_) {}; return; }
      ensureMasterEmpresarialScriptLoaded().then(() => {
        if (window.MasterEmpresarial) {
          try {
            main.innerHTML = window.MasterEmpresarial.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterEmpresarial.after_render === 'function') {
              try { window.MasterEmpresarial.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/direccion-empresarial'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/direccion-empresarial'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/direccion-empresarial'; } catch (_) {}
      });
    };

    // Global opener for Register modal (used by Podcasts cards)
    window.openRegisterGlobal = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try {
        const regModal = document.getElementById('register-modal');
        if (!regModal) return;
        regModal.style.display = 'block';
        regModal.setAttribute('aria-hidden', 'false');
        const first = regModal.querySelector('input, button, select, textarea, a');
        if (first) first.focus();
        document.documentElement.style.overflow = 'hidden';
      } catch (_) {}
    };

    window.openMasterMeliInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/master-meli'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/master-meli'; } catch (_) {}; return; }
      ensureMasterMeliScriptLoaded().then(() => {
        if (window.MasterMeli) {
          try {
            main.innerHTML = window.MasterMeli.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterMeli.after_render === 'function') {
              try { window.MasterMeli.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/master-meli'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/master-meli'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/master-meli'; } catch (_) {}
      });
    };

    window.openMasterSocialInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/social-media'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/social-media'; } catch (_) {}; return; }
      ensureMasterSocialScriptLoaded().then(() => {
        if (window.MasterSocialMedia) {
          try {
            main.innerHTML = window.MasterSocialMedia.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterSocialMedia.after_render === 'function') {
              try { window.MasterSocialMedia.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/social-media'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/social-media'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/social-media'; } catch (_) {}
      });
    };

    // NEW: Shein Master inline loader (usable from any carousel)
    window.openMasterSheinInline = function(ev) {
      try { if (ev && ev.preventDefault) ev.preventDefault(); } catch (_) {}
      try { history.pushState(null, '', '#/masters/shein-seller'); } catch (_) {}
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}; return; }
      ensureMasterSheinScriptLoaded().then(() => {
        if (window.MasterShein) {
          try {
            main.innerHTML = window.MasterShein.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterShein.after_render === 'function') {
              try { window.MasterShein.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
      });
    };
  }

  // Global capture: intercept links to Shein Master from any carousel/page
  function __captureSheinMasterLinks(ev) {
    try {
      // Do not intercept for admins; let router/editor behavior proceed
      if (typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin()) return;
      const a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      if (!a) return;
      const hrefRaw = a.getAttribute('href') || '';
      const href = hrefRaw.toLowerCase();
      const isSheinLink = href.includes('/masters/shein-seller') || href.includes('masters/shein-seller');
      if (!isSheinLink) return;
      ev.preventDefault();
      ev.stopPropagation();
      // Prefer inline render; fallback to hash for router
      try { history.pushState(null, '', '#/masters/shein-seller'); } catch (_) {}
      if (typeof window.openMasterSheinInline === 'function') {
        try { window.openMasterSheinInline(ev); return; } catch (_) {}
      }
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/shein-seller'; } catch (_) {} ; return; }
      ensureMasterSheinScriptLoaded().then(() => {
        if (window.MasterShein) {
          try {
            main.innerHTML = window.MasterShein.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterShein.after_render === 'function') {
              try { window.MasterShein.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/shein-seller'; } catch (_) {}
      });
    } catch (err) { /* ignore */ }
  }
  try { document.addEventListener('click', __captureSheinMasterLinks, true); } catch (e) {}

  // Global capture: intercept links to Social Media Master from any carousel/page
  function __captureSocialMasterLinks(ev) {
    try {
      // Do not intercept for admins; let router/editor behavior proceed
      if (typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin()) return;
      const a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
      if (!a) return;
      const hrefRaw = a.getAttribute('href') || '';
      const href = hrefRaw.toLowerCase();
      const isSocialLink = href.includes('/masters/social-media') || href.includes('masters/social-media');
      if (!isSocialLink) return;
      ev.preventDefault();
      ev.stopPropagation();
      // Prefer inline render; fallback to hash for router
      try { history.pushState(null, '', '#/masters/social-media'); } catch (_) {}
      if (typeof window.openMasterSocialInline === 'function') {
        try { window.openMasterSocialInline(ev); return; } catch (_) {}
      }
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) { try { window.location.hash = '#/masters/social-media'; } catch (_) {} ; return; }
      ensureMasterSocialScriptLoaded().then(() => {
        if (window.MasterSocialMedia) {
          try {
            main.innerHTML = window.MasterSocialMedia.render();
            window.scrollTo(0, 0);
            if (typeof window.MasterSocialMedia.after_render === 'function') {
              try { window.MasterSocialMedia.after_render(); } catch (_) {}
            }
          } catch (err) {
            try { window.location.hash = '#/masters/social-media'; } catch (_) {}
          }
        } else {
          try { window.location.hash = '#/masters/social-media'; } catch (_) {}
        }
      }).catch(() => {
        try { window.location.hash = '#/masters/social-media'; } catch (_) {}
      });
    } catch (err) { /* ignore */ }
  }
  try { document.addEventListener('click', __captureSocialMasterLinks, true); } catch (e) {}

  // Render Social Media master when hash matches (direct navigation or router changes)
  function ensureRenderWhenHashMasterSocial() {
    try {
      // Do not auto-render marketing page for admins
      if (typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin()) return;
      const h = (location.hash || '').toLowerCase();
      if (!h.includes('/masters/social-media')) return;
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) return;
      ensureMasterSocialScriptLoaded().then(() => {
        if (!window.MasterSocialMedia) return;
        try {
          main.innerHTML = window.MasterSocialMedia.render();
          if (typeof window.MasterSocialMedia.after_render === 'function') {
            try { window.MasterSocialMedia.after_render(); } catch (_) {}
          }
          window.scrollTo(0, 0);
        } catch (_) {}
      }).catch(() => { /* ignore */ });
    } catch (_) { /* ignore */ }
  }
  try { document.addEventListener('DOMContentLoaded', ensureRenderWhenHashMasterSocial); } catch (e) {}
  try { window.addEventListener('hashchange', ensureRenderWhenHashMasterSocial); } catch (e) {}
  try { window.addEventListener('popstate', ensureRenderWhenHashMasterSocial); } catch (e) {}
  try { ensureRenderWhenHashMasterSocial(); } catch (e) {}

  // Render Shein master when hash matches (direct nav or router changes)
  function ensureRenderWhenHashMasterShein() {
    try {
      // Do not auto-render marketing page for admins
      if (typeof AuthManager !== 'undefined' && AuthManager.isAdmin && AuthManager.isAdmin()) return;
      const h = (location.hash || '').toLowerCase();
      if (!h.includes('/masters/shein-seller')) return;
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) return;
      ensureMasterSheinScriptLoaded().then(() => {
        if (!window.MasterShein) return;
        try {
          main.innerHTML = window.MasterShein.render();
          if (typeof window.MasterShein.after_render === 'function') {
            try { window.MasterShein.after_render(); } catch (_) {}
          }
          window.scrollTo(0, 0);
        } catch (_) {}
      }).catch(() => { /* ignore */ });
    } catch (_) { /* ignore */ }
  }
  try { document.addEventListener('DOMContentLoaded', ensureRenderWhenHashMasterShein); } catch (e) {}
  try { window.addEventListener('hashchange', ensureRenderWhenHashMasterShein); } catch (e) {}
  try { window.addEventListener('popstate', ensureRenderWhenHashMasterShein); } catch (e) {}
  try { ensureRenderWhenHashMasterShein(); } catch (e) {}

  // intento para renderizar el componente (devuelve true si se aplicó)
  function tryRenderServicesInnerCircleOnce() {
    try {
      if (!window.ServicesInnerCircle) return false;
      const main = document.querySelector('main.homepage') || document.querySelector('main');
      if (!main) return false;
      main.innerHTML = window.ServicesInnerCircle.render();
      if (typeof window.ServicesInnerCircle.after_render === 'function') {
        try { window.ServicesInnerCircle.after_render(); } catch (e) {}
      }
      return true;
    } catch (err) { return false; }
  }

  // reintentar varias veces para cubrir race conditions con el Router
  function attemptRenderWithRetries(maxAttempts = 40, intervalMs = 120) {
    let attempts = 0;
    const tryNow = () => {
      attempts++;
      const ok = tryRenderServicesInnerCircleOnce();
      if (ok || attempts >= maxAttempts) clearInterval(iv);
    };
    tryNow();
    const iv = setInterval(tryNow, intervalMs);
  }

  // Si el hash actual corresponde, cargar script y forzar render
  function ensureRenderWhenHashService() {
    try {
      const h = (location.hash || '').toLowerCase();
      if (!h.includes('/services-inner-circle')) return;
      // primero cargar script (si no está), luego reintentar render varias veces
      ensureServicesScriptLoaded().then(() => {
        // small defer then retries
        setTimeout(() => attemptRenderWithRetries(40, 120), 0);
      }).catch(() => {
        // fallback: intentar render directo si script ya estaba presente
        attemptRenderWithRetries(40, 120);
      });
    } catch (err) { /* ignore */ }
  }

  // registrar para carga directa / navegación
  try { document.addEventListener('DOMContentLoaded', ensureRenderWhenHashService); } catch (e) {}
  try { window.addEventListener('hashchange', ensureRenderWhenHashService); } catch (e) {}
  try { window.addEventListener('popstate', ensureRenderWhenHashService); } catch (e) {}
  // intento inmediato por si el script se carga después y el hash ya está en la URL
  try { ensureRenderWhenHashService(); } catch (e) {}
})();
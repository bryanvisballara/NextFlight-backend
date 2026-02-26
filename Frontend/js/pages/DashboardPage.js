/**
 * PÁGINA: DASHBOARD (token backend requerido)
 */

const DashboardPage = {
  render() {
    // Placeholder estático; datos reales se inyectan desde Mongo por loader global
    // Evitar parpadeo: no renderizar contenido de podcast hasta tener datos reales
    const membershipPrice = Number((typeof StorageManager !== 'undefined' && StorageManager.get) ? (StorageManager.get('mwi_membership_price') || 499) : 499);

    return `
      <div class="dashboard-page">
      ${Header.render(false, true)}
      <style>
        /* Header compact on dashboard (preserve logo size) */
        .dashboard-page .mwi-header { padding: 2px 0; height: 60px; }
        .dashboard-page .mwi-header .mwi-header-inner { height: 46px; display: grid; grid-template-columns: 210px 1fr; align-items: center; padding: 0; }
        /* Desktop: increase header height so logo fits inside */
        @media (min-width: 641px) {
          .dashboard-page .mwi-header { padding: 8px 0; height: 72px; }
          .dashboard-page .mwi-header .mwi-header-inner { height: 72px; }
        }
        .dashboard-page .mwi-header .mwi-logo { justify-self: start; align-self: center; position: static; transform: translateY(-12%); }
        @media (max-width: 640px) {
          .dashboard-page .mwi-header .mwi-header-inner { grid-template-columns: 182px 1fr; }
        }
        /* Sidebar styling and hover effects */
        .dash-sidebar { background:#0e0e0d; }
        .dash-sidebar .nav-item { position:relative; padding:8px 6px; color:#d4a955; cursor:pointer; transition:color .18s ease-in-out; display:flex; align-items:center; gap:10px; }
        .dash-sidebar .nav-item.nav-master { color:#efe6d6; }
        .dash-sidebar .nav-item::before,
        .dash-sidebar .nav-item::after { content:""; position:absolute; left:6px; right:6px; height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.95), rgba(212,169,85,0.0)); transform:scaleX(0); transform-origin:center; transition:transform .18s ease-in-out; }
        .dash-sidebar .nav-item::before { top:2px; }
        .dash-sidebar .nav-item::after { bottom:2px; }
        .dash-sidebar .nav-item:hover { color:#f6e9c9; }
        .dash-sidebar .nav-item:hover::before,
        .dash-sidebar .nav-item:hover::after { transform:scaleX(1); }

        .dash-sidebar .nav-icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
        .dash-sidebar .nav-item:hover .nav-icon svg { stroke:#f6e9c9; }
        /* Partner Center item with distinct text color */
        .dash-sidebar .nav-item.nav-partner { color:#00a35c; }

        .dash-sidebar .nav-avatar { width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,#f6e9c9,#d4a955); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; color:#0e0e0d; border:1px solid rgba(212,169,85,.25); }
        .dash-sidebar .nav-photo { width:28px; height:28px; border-radius:50%; object-fit:cover; border:1px solid rgba(212,169,85,.25); background:#1a1816; }
        /* Center section typography */
        .dashboard-page #dash-title { font-size: 32px; line-height: 1.2; }
        .dashboard-page #dash-subtitle { font-size: 18px; }
        /* Metrics boxes under subtitle */
        .dashboard-page .dash-metrics { display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; margin-top:14px; }
        @media (max-width: 820px) { .dashboard-page .dash-metrics { grid-template-columns: 1fr; } }
        .dashboard-page .metric-card { background:#12100f; border:1px solid rgba(212,169,85,.28); border-radius:8px; padding:14px 16px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.06); }
        .dashboard-page .metric-header { display:flex; align-items:center; gap:10px; color:#efe6d6; font-weight:600; letter-spacing:.2px; }
        .dashboard-page .metric-icon svg { width:22px; height:22px; stroke:#d4a955; fill:none; stroke-width:1.8; }
        .dashboard-page .metric-sub { color:#cdbb9a; margin-top:6px; font-size:14px; }
        .dashboard-page .metric-value { color:#f6e9c9; font-size:22px; font-weight:800; margin-top:6px; }
        /* CTA button with side lines */
        .dashboard-page .dash-cta-wrap { display:flex; align-items:center; gap:14px; margin-top:18px; }
        .dashboard-page .dash-cta-line { flex:1; height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.85), rgba(212,169,85,0.0)); }
        .dashboard-page .dash-cta-btn { appearance:none; border:none; padding:10px 18px; border-radius:6px; font-weight:800; letter-spacing:.6px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
        .dashboard-page .dash-cta-btn:hover { filter:brightness(1.06); transform:translateY(-1px); transition:all .15s ease; }
        /* Podcast section */
        .dashboard-page .dash-podcast-title { margin:22px 0 8px; color:#f6e9c9; font-size:22px; font-weight:700; }
        .dashboard-page .podcast-card { background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:10px; padding:12px; display:grid; grid-template-columns: 260px 1fr; gap:14px; align-items:stretch; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
        @media (max-width: 820px) { .dashboard-page .podcast-card { grid-template-columns: 1fr; } }
        .dashboard-page .podcast-thumb { position:relative; background:linear-gradient(135deg,#12100f,#1e1a16); border:1px solid rgba(212,169,85,.18); border-radius:8px; height:160px; display:flex; align-items:center; justify-content:center; color:#f6e9c9; font-weight:800; letter-spacing:.3px; }
        .dashboard-page .podcast-info { height:100%; display:grid; grid-template-rows: auto auto auto; row-gap:12px; align-content:space-evenly; }
        .dashboard-page .podcast-title { color:#efe6d6; font-size:20px; font-weight:700; line-height:1.3; }
        .dashboard-page .podcast-guest { color:#cdbb9a; font-size:14px; font-weight:700; }
        .dashboard-page .podcast-desc { color:#cdbb9a; font-size:14px; line-height:1.4; }
        .dashboard-page .podcast-duration-badge { position:absolute; right:8px; bottom:8px; background:rgba(0,0,0,.6); color:#f6e9c9; border:1px solid rgba(212,169,85,.28); border-radius:6px; padding:4px 8px; font-weight:700; font-size:12px; }
        .dashboard-page .podcast-btn { width:160px; margin:0 auto; display:inline-block; }
        /* Announcement line below podcast */
        .dashboard-page .dash-announcement { display:flex; justify-content:center; align-items:center; gap:10px; margin-top:12px; color:#d4a955; text-align:center; }
        .dashboard-page .dash-announcement .icon svg { width:20px; height:20px; stroke:#d4a955; fill:none; stroke-width:1.6; }
        .dashboard-page .dash-announcement .text { font-weight:600; letter-spacing:.2px; text-shadow: 0 1px 0 rgba(0,0,0,.6); }
        /* Benefits section */
        .dashboard-page .benefits-title { margin:22px 0 8px; color:#f6e9c9; font-size:26px; font-weight:800; text-align:center; }
        .dashboard-page .benefits-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:14px; }
        @media (max-width: 1024px) { .dashboard-page .benefits-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .dashboard-page .benefits-grid { grid-template-columns: 1fr; } }
        .dashboard-page .benefit-card { background:#141212; border:1px solid rgba(212,169,85,.22); border-radius:10px; padding:14px; display:flex; align-items:center; gap:12px; box-shadow: inset 0 0 0 1px rgba(212,169,85,.05); }
        .dashboard-page .benefit-icon svg { width:32px; height:32px; stroke:#d4a955; fill:none; stroke-width:1.6; }
        .dashboard-page .benefit-icon.fill svg { fill:#d4a955; stroke:none; }
        .dashboard-page .benefit-text { color:#efe6d6; line-height:1.3; }
        .dashboard-page .benefit-text .sub { color:#cdbb9a; font-size:14px; }
        /* Right panel styling */
        .dashboard-page .right-panel {
          background-color:#141212;
          background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border:1px solid rgba(212,169,85,.12);
          border-radius:10px;
          padding:16px;
          box-shadow: inset 0 0 0 1px rgba(212,169,85,.04);
        }
        .dashboard-page .profile-card { text-align:center; }
        .dashboard-page .profile-card .avatar { width:96px; height:96px; border-radius:50%; margin:0 auto 8px; background:#1d1a19; position:relative; box-shadow: inset 0 0 0 2px rgba(212,169,85,.25); overflow:hidden; }
        .dashboard-page .profile-card .avatar::after { content:""; position:absolute; inset:-4px; border-radius:50%; border:2px solid #d4a955; filter:drop-shadow(0 0 2px rgba(212,169,85,.35)); }
        .dashboard-page .profile-card .avatar-initials { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:28px; color:#e8dcc0; letter-spacing:.5px; }
        .dashboard-page .profile-card .name { color:#f6e9c9; font-size:22px; font-weight:800; }
        .dashboard-page .profile-card .aff { color:#d4a955; font-weight:700; margin-top:2px; }
        .dashboard-page .btn-outline-gold { width:100%; margin-top:12px; appearance:none; border-radius:6px; padding:8px 12px; color:#e8dcc0; background:rgba(209,161,86,.08); border:1px solid rgba(209,161,86,.55); font-weight:700; }
        .dashboard-page .btn-outline-gold:hover { background:rgba(209,161,86,.14); }
        .dashboard-page .section-divider { height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.35), rgba(212,169,85,0.0)); margin:14px 0; }
        .dashboard-page .live-title { color:#f6e9c9; font-size:22px; font-weight:800; margin:4px 0 8px; }
        .dashboard-page .live-card { background:#171514; border:1px solid rgba(212,169,85,.16); border-radius:10px; padding:10px; display:grid; grid-template-columns: 52px 1fr auto; align-items:center; gap:10px; margin-bottom:10px; }
        .dashboard-page .live-card .inst-avatar { width:44px; height:44px; border-radius:50%; background:#1d1a19; position:relative; box-shadow: inset 0 0 0 2px rgba(212,169,85,.25); }
        .dashboard-page .live-card .inst-avatar::after { content:""; position:absolute; inset:-3px; border-radius:50%; border:2px solid #d4a955; }
        .dashboard-page .live-card .inst-photo { width:44px; height:44px; border-radius:50%; object-fit:cover; border:1px solid rgba(212,169,85,.25); background:#1a1816; display:none; }
        .dashboard-page .live-card .meta { display:flex; flex-direction:column; gap:2px; }
        .dashboard-page .live-card .title { color:#efe6d6; font-weight:800; }
        .dashboard-page .live-card .sub { color:#cdbb9a; font-size:13px; display:flex; align-items:center; gap:6px; }
        .dashboard-page .live-card .sub .lock svg { width:16px; height:16px; stroke:#d4a955; fill:none; stroke-width:1.6; }
        .dashboard-page .live-card .time { color:#cdbb9a; font-size:14px; }
        .dashboard-page .btn-gold-sm { appearance:none; border:none; padding:8px 14px; border-radius:6px; font-weight:800; letter-spacing:.3px; color:#2a1f0b; background:linear-gradient(180deg,#D1A156,#7A5A22); box-shadow: 0 1px 0 rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25); border:1px solid rgba(209,161,86,.95); }
        .dashboard-page .btn-gold-sm:hover { filter:brightness(1.06); }

        /* Community section */
        .dashboard-page .community-title { color:#f6e9c9; font-size:22px; font-weight:800; margin:12px 0 8px; text-align:center; }
        .dashboard-page .community-card { background:#171514; border:1px solid rgba(212,169,85,.16); border-radius:10px; padding:10px; display:grid; grid-template-columns: 52px 1fr auto; align-items:center; gap:10px; margin-bottom:10px; }
        .dashboard-page .community-card .comm-icon svg { width:44px; height:44px; stroke:#d4a955; fill:none; stroke-width:1.6; }
        .dashboard-page .community-card .meta { display:flex; flex-direction:column; gap:2px; }
        .dashboard-page .community-card .title { color:#efe6d6; font-weight:800; }
        .dashboard-page .community-card .sub { color:#cdbb9a; font-size:13px; }

        /* Mobile: stack center above right panel, keep left sidebar intact */
        @media (max-width: 640px) {
          /* Remove top, right and bottom padding on main for phones */
          .dashboard-page main { padding: 0 0 0 0 !important; }
          /* Two-column grid: left sidebar (col 1), content (col 2) stacked */
          .dashboard-page .dash-grid { grid-template-columns: 160px 320px !important; grid-template-rows: auto auto !important; gap:0 !important; overflow-x:auto; margin-left:0 !important; }
          .dashboard-page .dash-grid > .dash-sidebar { grid-column: 1; grid-row: 1 / span 2; }
          .dashboard-page .dash-grid > section { grid-column: 2; grid-row: 1; }
          .dashboard-page .dash-grid > .right-panel { grid-column: 2; grid-row: 2; }

          .dashboard-page .right-panel { padding:12px; max-width: 100%; margin:0; }
          .dashboard-page .live-card { grid-template-columns: 44px 1fr; align-items:start; }
          /* Make the button container span both columns so the button isn't cramped */
          .dashboard-page .live-card > div:last-child { grid-column: 1 / -1; justify-self: start; margin-top: 8px; }
          .dashboard-page .live-card .btn-gold-sm { display:inline-block; }
          .dashboard-page .community-card { grid-template-columns: 44px 1fr; align-items:start; }
          .dashboard-page .community-card > div:last-child { grid-column: 1 / -1; justify-self: start; margin-top: 8px; }
          .dashboard-page .live-title, .dashboard-page .community-title { text-align:left; }
        }

        /* Modal overlay and content (Afiliación) */
        .dashboard-page .mwi-modal { display:none; position:fixed; inset:0; z-index:1000; overflow:auto; }
        .dashboard-page .mwi-modal.open { display:block; }
        .dashboard-page .mwi-modal .overlay { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter: blur(2px); }
        .dashboard-page .mwi-modal .content { position:relative; max-width:860px; margin:24px auto; background:linear-gradient(180deg,#151313,#0f0f0f); border:1px solid rgba(212,169,85,.28); border-radius:12px; box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 0 1px rgba(212,169,85,.08); max-height:none; overflow:visible; }
        .dashboard-page .mwi-modal .content .inner { padding:16px; display:grid; grid-template-columns: 1fr 300px; gap:12px; }
        @media (max-width: 900px) { .dashboard-page .mwi-modal .content .inner { grid-template-columns: 1fr; } }
        .dashboard-page .mwi-modal .title { color:#a47c3b; font-size:24px; font-weight:800; text-align:center; margin:6px 0 2px; }
        .dashboard-page .mwi-modal .subtitle { color:#cdbb9a; text-align:center; margin-bottom:8px; font-size:14px; }
        .dashboard-page .mwi-modal .features {
          background-color:#141212;
          background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border:1px solid rgba(212,169,85,.15);
          border-radius:10px;
          padding:12px;
        }
        .dashboard-page .mwi-modal .features .label { color:#efe6d6; font-size:20px; font-weight:700; margin-bottom:8px; }
        .dashboard-page .mwi-modal .features .item { display:flex; align-items:center; gap:8px; color:#e8dcc0; padding:4px 0; font-size:14px; }
        .dashboard-page .mwi-modal .features .item .check svg { width:16px; height:16px; fill:none; stroke:#d4a955; stroke-width:2; }
        .dashboard-page .mwi-modal .plan {
          background-color:#141212;
          background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border:1px solid rgba(212,169,85,.22);
          border-radius:10px;
          padding:12px;
          box-shadow: inset 0 0 0 1px rgba(212,169,85,.05);
        }
        .dashboard-page .mwi-modal .plan .badge { display:flex; align-items:center; justify-content:center; margin-bottom:6px; }
        .dashboard-page .mwi-modal .plan .badge img { width:76px; height:76px; object-fit:contain; filter:drop-shadow(0 0 6px rgba(212,169,85,.25)); }
        .dashboard-page .mwi-modal .plan .name { color:#f6e9c9; font-size:20px; font-weight:800; text-align:center; margin-bottom:6px; }
        .dashboard-page .mwi-modal .plan .bullets { color:#e8dcc0; display:grid; row-gap:6px; text-align:center; font-size:14px; }
        .dashboard-page .mwi-modal .plan .bullets .row { display:flex; align-items:center; justify-content:center; gap:10px; }
        .dashboard-page .mwi-modal .plan .bullets .row .dot { width:8px; height:8px; border-radius:50%; background:#d4a955; box-shadow:0 0 6px rgba(212,169,85,.3); }
        .dashboard-page .mwi-modal .plan .sep-line { height:1px; background:linear-gradient(90deg, rgba(212,169,85,0.0), rgba(212,169,85,0.85), rgba(212,169,85,0.0)); margin:8px 0; }
        .dashboard-page .mwi-modal .plan .price { color:#f6e9c9; text-align:center; font-weight:800; font-size:20px; margin:8px 0 2px; }
        .dashboard-page .mwi-modal .plan .price .amt { font-size:28px; letter-spacing:.3px; }
        .dashboard-page .mwi-modal .plan .price .sub { font-size:13px; font-weight:600; }
        .dashboard-page .mwi-modal .actions { display:flex; flex-direction:column; gap:10px; margin-top:12px; align-items:center; }
        .dashboard-page .mwi-modal .btn-pay { appearance:none; border:none; padding:11px 16px; border-radius:8px; font-weight:800; letter-spacing:.4px; width:68%; display:flex; align-items:center; justify-content:center; gap:8px; }
        /* Provider-specific styles */
        .dashboard-page .mwi-modal .btn-pay.mp { color:#fff; background:linear-gradient(90deg,#00AEEF,#0077C8); border:1px solid #007EC8; box-shadow: 0 1px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.12); }
        .dashboard-page .mwi-modal .btn-pay.mp:hover { filter:brightness(1.06); }
        .dashboard-page .mwi-modal .btn-pay.stripe { color:#fff; background:linear-gradient(90deg,#635BFF,#7A6EFF); border:1px solid #635BFF; box-shadow: 0 1px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.12); }
        .dashboard-page .mwi-modal .btn-pay.stripe:hover { filter:brightness(1.06); }
        .dashboard-page .mwi-modal .btn-cancel { appearance:none; border:1px solid rgba(209,161,86,.55); background:rgba(209,161,86,.08); color:#e8dcc0; padding:9px 14px; border-radius:8px; font-weight:700; width:68%; }
        .dashboard-page .mwi-modal .foot { display:flex; align-items:center; justify-content:center; gap:10px; color:#cdbb9a; padding:12px 20px; border-top:1px solid rgba(212,169,85,.18); text-align:center; line-height:1.3; flex-wrap:wrap; }
        .dashboard-page .mwi-modal .foot .lock svg { width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:1.6; }
        .dashboard-page .mwi-modal .close { position:absolute; right:10px; top:10px; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.35); border:1px solid rgba(212,169,85,.25); cursor:pointer; }
        .dashboard-page .mwi-modal .close svg { width:18px; height:18px; stroke:#d4a955; fill:none; stroke-width:2; }
        .dashboard-page .mwi-modal .pay-note { font-size:12px; color:#cdbb9a; text-align:center; margin-top:0; }
        .dashboard-page .mwi-modal .pay-wrap { display:flex; flex-direction:column; gap:0; align-items:center; width:100%; }
        .dashboard-page .mwi-modal .coupon-note { font-size:12px; color:#cdbb9a; text-align:center; margin-top:6px; }

        /* Phone: shrink modal to fit viewport without inner scrolling */
        @media (max-width: 640px) {
          .dashboard-page .mwi-modal { overflow:auto; }
          #affiliacion-modal .content { width:92vw; max-width:360px; max-height:none; margin:12px auto; overflow:visible; }
          #affiliacion-modal .content .inner { padding:10px; gap:8px; }
          #affiliacion-modal .title { font-size:18px; margin:4px 0; }
          #affiliacion-modal .subtitle { font-size:12px; margin-bottom:6px; }
          #affiliacion-modal .features { padding:8px; }
          #affiliacion-modal .features .label { font-size:15px; margin-bottom:6px; }
          #affiliacion-modal .features .item { padding:3px 0; font-size:12px; gap:6px; }
          #affiliacion-modal .plan { padding:8px; }
          #affiliacion-modal .plan .badge img { width:56px; height:56px; }
          #affiliacion-modal .plan .name { font-size:16px; margin-bottom:6px; }
          #affiliacion-modal .plan .bullets { row-gap:5px; font-size:12px; }
          #affiliacion-modal .plan .price { font-size:16px; margin:6px 0 2px; }
          #affiliacion-modal .plan .price .amt { font-size:22px; }
          #affiliacion-modal .plan .price .sub { font-size:12px; }
          #affiliacion-modal .btn-pay, #affiliacion-modal .btn-cancel { width:100%; padding:8px 12px; font-size:12px; }
          #affiliacion-modal .foot { padding:8px 10px; font-size:11px; }
          #affiliacion-modal .close { width:30px; height:30px; }
        }
      </style>
      <main style="min-height:60vh;padding:24px 24px 24px 0;color:#efe6d6;background-color:#0f0f0f;background-image:url('assets/images/fondodashboard.png');background-size:cover;background-position:center;background-repeat:no-repeat;">
        <div class="dash-grid" style="width:100%;margin:0;display:grid;grid-template-columns:210px 1fr 320px;gap:20px;">
          <aside class="dash-sidebar" style="position:relative;padding:16px 12px;">
            <!-- Líneas doradas verticales -->
            <div style="position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#d4a955,#b8862f);"></div>
            <div style="position:absolute;right:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,#d4a955,#b8862f);"></div>

            <div style="display:flex;flex-direction:column;gap:10px;">
              <div id="nav-dashboard" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><path d="M3 10.5l9-7 9 7"/><path d="M5 10v9h14v-9"/></svg>
              </span><span class="nav-text">Dashboard</span></div>
              <div id="nav-masters" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M12 5a3 3 0 0 1 3 3v3H9V8a3 3 0 0 1 3-3z"/></svg>
              </span><span class="nav-text">Masters</span></div>
              <div id="nav-podcast" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><rect x="9" y="4" width="6" height="10" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 20v-4"/></svg>
              </span><span class="nav-text">MWI Podcast</span></div>
              <div id="nav-services" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
              </span><span class="nav-text">Servicios</span></div>

              <div style="height:12px;"></div>
              <div style="color:#cdbb9a;font-weight:800;letter-spacing:.6px;margin:6px 0 4px;padding:0 6px;">MENTORES</div>

              

              <div style="height:12px;"></div>
              <div id="nav-support" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><path d="M6 14v-3a6 6 0 1 1 12 0v3"/><path d="M6 18h4l1 2h2l1-2h4"/></svg>
              </span><span class="nav-text">Soporte</span></div>
              <div id="nav-logout" class="nav-item"><span class="nav-icon">
                <svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg>
              </span><span class="nav-text">Cerrar sesión</span></div>
            </div>
          </aside>
          <section style="background-color:#0e0e0d;background-image:linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('assets/images/fondodashboard.png');background-size:cover;background-position:center;background-repeat:no-repeat;border:1px solid rgba(212,169,85,.08);border-radius:10px;padding:16px;">
            <h2 id="dash-title" style="margin-top:0;color:#f6e9c9;">Bienvenido</h2>
            <p id="dash-subtitle" style="margin:6px 0 12px;color:#cdbb9a;font-size:20px;">Estas a un paso de acceder a todo el instituto.</p>
            <div class="dash-metrics">
              <div class="metric-card">
                <div class="metric-header"><span class="metric-icon">
                  <svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                </span><span class="metric-title">Masters activos</span></div>
                <div class="metric-value" id="metric-masters-value">0</div>
                <!-- Optional subtext: 0 / Todos -->
                <!-- <div class="metric-sub">0 / Todos</div> -->
              </div>

              <div class="metric-card">
                <div class="metric-header"><span class="metric-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg>
                </span><span class="metric-title">Podcasts disponibles</span></div>
                <div class="metric-sub">Acceso libre</div>
              </div>

              <div class="metric-card">
                <div class="metric-header"><span class="metric-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg>
                </span><span class="metric-title">Afiliación</span></div>
                <div class="metric-sub" id="metric-affiliation-status">No activa</div>
              </div>
            </div>
            <div id="dash-status" style="margin-top:12px;color:#cdbb9a;">Cargando perfil...</div>
            <div class="dash-cta-wrap">
              <span class="dash-cta-line"></span>
              <button id="btn-activate" class="dash-cta-btn">ACTIVAR MEMBRESÍA</button>
              <span class="dash-cta-line"></span>
            </div>
            <h3 class="dash-podcast-title">MWI Podcast</h3>
            <div id="mwi-podcast-section" style="display:none"></div>
            <div id="dash-benefits-block">
              <div class="dash-announcement">
                <span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span>
                <span class="text">Accede a masters, videos y sesiones en vivo activando tu afiliación</span>
              </div>
              <h3 class="benefits-title">Lo que adquieres con tu afiliación:</h3>
              <div class="benefits-grid">
                <div class="benefit-card">
                  <span class="benefit-icon fill"><svg viewBox="0 0 24 24"><path d="M3 7l9-3 9 3v4l-9 3-9-3V7z"/><path d="M3 11v6l9 3 9-3v-6"/></svg></span>
                  <div class="benefit-text"><div>Acceso completo</div><div class="sub">a todos los Masters</div></div>
                </div>
                <div class="benefit-card">
                  <span class="benefit-icon"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h2M12 9h2M16 9h2"/></svg></span>
                  <div class="benefit-text"><div>Más de 100 horas</div><div class="sub">de contenido de valor</div></div>
                </div>
                <div class="benefit-card">
                  <span class="benefit-icon fill"><svg viewBox="0 0 24 24"><path d="M6 4l10 8-10 8z"/><rect x="18" y="6" width="2" height="12" rx="1"/><rect x="21" y="6" width="2" height="12" rx="1"/></svg></span>
                  <div class="benefit-text"><div>Sesiones en vivo</div><div class="sub">exclusivamente para afiliados</div></div>
                </div>
                <div class="benefit-card">
                  <span class="benefit-icon fill"><svg viewBox="0 0 24 24"><path d="M12 3c-4 0-8 3-8 7 0 6 8 11 8 11s8-5 8-11c0-4-4-7-8-7z"/></svg></span>
                  <div class="benefit-text"><div>Actualizaciones</div><div class="sub">material extra</div></div>
                </div>
              </div>
              <div class="dash-cta-wrap" style="margin-top:16px;">
                <span class="dash-cta-line"></span>
                <button id="btn-activate-2" class="dash-cta-btn">ACTIVAR MEMBRESÍA</button>
                <span class="dash-cta-line"></span>
              </div>
            </div>

            <div id="dash-partner-stats" style="display:none;">
              <h3 class="benefits-title">MWI Partner Center STATS</h3>
              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-text">
                    <div>Ventas de la semana</div>
                    <div id="dash-pc-sales" class="sub">0</div>
                  </div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-text">
                    <div>Recompensa activa (%)</div>
                    <div id="dash-pc-percent" class="sub">40%</div>
                  </div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-text">
                    <div>Recompensas acumuladas (USD)</div>
                    <div id="dash-pc-total" class="sub">$0</div>
                  </div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-text">
                    <div>Próximo pago</div>
                    <div id="dash-pc-next-pay-date" class="sub">--/--/----</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside class="right-panel">
            <div class="profile-card">
              <div id="profile-avatar" class="avatar">
                <div id="profile-avatar-initials" class="avatar-initials">—</div>
              </div>
              <div id="u-name" class="name">—</div>
              <div id="u-aff-status" class="aff">Afiliación no activa</div>
            </div>
            <div class="section-divider"></div>
            <div class="live-title">Sesiones en Vivo</div>
            <div id="live-sessions-container"></div>
            <div class="community-title">Haz parte de nuestra comunidad</div>
            <div class="community-card" id="community-instagram">
              <div class="comm-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="4"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17" cy="7" r="1.5"/>
                </svg>
              </div>
              <div class="meta">
                <div class="title">Instagram oficial</div>
                <div class="sub">Modern Wealth Institute</div>
              </div>
              <div><button id="btn-instagram-follow" class="btn-gold-sm">SIGUENOS</button></div>
            </div>
            <div class="community-card" id="community-telegram">
              <div class="comm-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 3L3 11l6 2 2 6 4-8 6-8z"/>
                </svg>
              </div>
              <div class="meta">
                <div class="title">Canal de Telegram</div>
                <div class="sub">Únete a la comunidad oficial</div>
              </div>
              <div><button id="btn-telegram-join" class="btn-gold-sm">UNIRSE</button></div>
            </div>
          </aside>
        </div>
      </main>

      <!-- Modal Afiliación -->
      <div id="affiliacion-modal" class="mwi-modal" aria-hidden="true" aria-modal="true" role="dialog">
        <div class="overlay" data-close="true"></div>
        <div class="content" role="document">
          <button class="close" id="modal-close" aria-label="Cerrar">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>
          </button>
          <div class="title">Activa tu membresía en Modern Wealth Institute</div>
          <div class="subtitle">Desbloquea el acceso completo a todos los masters del instituto.</div>
          <div class="inner">
            <div class="features">
              <div class="label">Incluye acceso a:</div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Todos los masters <strong>actuales</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Nuevos masters <strong>futuros</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Actualizaciones <strong>permanentes</strong></span></div>
              <div class="item"><span class="check"><svg viewBox="0 0 24 24"><path d="M20 6l-11 11-5-5"/></svg></span><span>Plataforma privada 24/7</span></div>
              <div class="actions">
                <div class="pay-wrap" style="gap:10px;">
                  <button id="btn-modal-mp" class="btn-pay mp" aria-label="Sigue con MercadoPago">
                    <span>Sigue con MercadoPago</span>
                  </button>
                  <button id="btn-modal-stripe" class="btn-pay stripe" aria-label="Sigue con Stripe">
                    <span>Sigue con Stripe</span>
                  </button>
                  <div class="pay-note">🔒 Pago único · Acceso inmediato · Plataforma privada</div>
                </div>
                <button id="btn-modal-cancel" class="btn-cancel">Cancelar</button>
              </div>
            </div>
            <div class="plan">
              <div class="badge"><img src="assets/images/logopop.png" alt="Logo" /></div>
              <div class="name">Acceso Institucional</div>
              <div class="sep-line"></div>
              <div class="bullets">
                <div class="row"><span class="dot"></span><span>Incorporación Institucional Completa</span></div>
                <div class="row"><span class="dot"></span><span>Portafolio académico integral</span></div>
              </div>
              <div class="sep-line"></div>
              <div class="coupon-box" style="display:flex;flex-direction:column;gap:8px;">
                <input id="aff-coupon-input" type="text" placeholder="Ingresa tu cupón de descuento" style="width:100%;padding:10px;border-radius:8px;background:#151515;color:#efe6d6;border:1px solid rgba(255,255,255,0.08);" />
                <div class="coupon-action-wrap" style="display:flex;flex-direction:column;gap:0;">
                  <button id="aff-coupon-redeem" class="btn-gold-sm" style="width:100%;text-align:center;">REDIMIR CUPÓN</button>
                  <div class="coupon-assist" style="margin-top:0;color:#cdbb9a;font-size:13px;line-height:1.4;text-align:center;">
                    <div>¿No tienes un cupón? Escríbenos y uno de nuestros asesores te ayudará a activarlo.</div>
                    <div style="margin-top:2px;">
                      <button id="aff-coupon-whatsapp" class="btn-outline-gold" style="width:50%;display:block;margin:0 auto;padding:4px 8px;font-size:12px;line-height:1.2;">Hablar con un asesor</button>
                    </div>
                  </div>
                </div>
                <div id="aff-coupon-message" class="coupon-help" style="font-size:12px;color:#cdbb9a;min-height:16px;"></div>
              </div>
              <div class="sep-line"></div>
              <div class="price" style="display:flex;flex-direction:column;gap:6px;">
                <div class="row-base"><span>USD</span> <span id="aff-modal-price-base" class="amt">${membershipPrice}</span><div class="sub">Pago único</div></div>
                <div id="aff-price-discount-wrap" class="row-discount" style="display:none;color:#cdbb9a;">
                  <span>Con cupón (50%):</span>
                  <span style="margin-left:8px;">USD</span> <span id="aff-modal-price-discount" class="amt">${Math.round(membershipPrice * 0.5)}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="foot"><span class="lock"><svg viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></span><span>Tu cuenta está activa, pero el contenido está bloqueado hasta que seas miembro oficial del instituto.</span></div>
        </div>
      </div>
      ${Footer.render()}
      </div>
    `;
  },

  async init() {
    const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';
    const token = localStorage.getItem('mwi:token');
    let currentEmail = null;
    const statusEl = document.getElementById('dash-status');
    // Forzar altura compacta del header solo en dashboard (manteniendo tamaño del logo)
    try {
      const headerEl = document.querySelector('.dashboard-page .mwi-header') || document.querySelector('.mwi-header');
      if (headerEl) headerEl.style.padding = '2px 0';
    } catch (e) {}
    if (!token) { Router.navigate('/register'); return; }

    try {
      const res = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { user } = await res.json();
      document.getElementById('dash-title').textContent = `Bienvenido, ${user?.name || ''}`;
      document.getElementById('u-name').textContent = user?.name || '';
      // Avatar: iniciales por defecto (nombre y apellido)
      try {
        const initialsEl = document.getElementById('profile-avatar-initials');
        const nm = String(user?.name || '').trim();
        const parts = nm.split(/\s+/);
        const initials = ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
        if (initialsEl) initialsEl.textContent = initials || '•';
      } catch (e) {}
      const emailEl = document.getElementById('u-email');
      if (emailEl) emailEl.textContent = user?.email || '';
      currentEmail = (user && user.email) ? String(user.email).toLowerCase() : null;
      const isPaidUser = !!(user && (user.role === 'admin' || user.isPaid === true));
      if (statusEl) { statusEl.textContent = 'Perfil cargado'; statusEl.style.display = 'none'; }
      // Metrics: Masters activos (depende de afiliación) + estado de afiliación
      const mastersValueEl = document.getElementById('metric-masters-value');
      const affiliationEl = document.getElementById('metric-affiliation-status');
      // Cargar masters activos reales desde Mongo solo para usuarios pagos
      const loadMastersActiveCount = async (isPaid) => {
        if (!mastersValueEl) return;
        if (!isPaid) { mastersValueEl.textContent = '0'; return; }
        try {
          const resp = await fetch(`${base}/api/masters`);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const masters = await resp.json();
          const count = Array.isArray(masters) ? masters.length : 0;
          mastersValueEl.textContent = String(count);
        } catch (err) {
          console.error('Error cargando masters activos:', err);
          mastersValueEl.textContent = '0';
        }
      };
      await loadMastersActiveCount(isPaidUser);
      if (affiliationEl) affiliationEl.textContent = isPaidUser ? 'Activa' : 'No activa';
      // Reflect affiliation on right panel + hide activation CTAs for paid users
      const rightAffEl = document.getElementById('u-aff-status');
      if (rightAffEl) { rightAffEl.textContent = isPaidUser ? 'Afiliación activa' : 'Afiliación no activa'; }
      if (isPaidUser) {
        // Hide subtitle for active users
        try { const sub = document.getElementById('dash-subtitle'); if (sub) sub.style.display = 'none'; } catch {}
        try { document.getElementById('btn-activate')?.closest('.dash-cta-wrap')?.style.setProperty('display','none'); } catch {}
        try { document.getElementById('btn-activate-2')?.closest('.dash-cta-wrap')?.style.setProperty('display','none'); } catch {}
        // Insert Partner Center into sidebar after Servicios
        try {
          const servicesItem = document.getElementById('nav-services');
          if (servicesItem && servicesItem.parentElement && !document.getElementById('nav-partner-center')) {
            const pc = document.createElement('div');
            pc.id = 'nav-partner-center';
            pc.className = 'nav-item nav-partner';
            pc.innerHTML = `<span class="nav-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.8L12 17l-5.6 3.9 1.1-6.8L3 8.9 9 8l3-6z"/></svg></span><span class="nav-text">MWI Partner Center</span>`;
            servicesItem.parentElement.insertBefore(pc, servicesItem.nextSibling);
            pc.addEventListener('click', () => Router.navigate('/partner-center'));
          }
          // Insert Inner Circle into sidebar after Partner Center
          if (servicesItem && servicesItem.parentElement && !document.getElementById('nav-inner-circle')) {
            const afterNode = document.getElementById('nav-partner-center') || servicesItem;
            const ic = document.createElement('div');
            ic.id = 'nav-inner-circle';
            ic.className = 'nav-item';
            ic.innerHTML = `<span class="nav-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg></span><span class="nav-text">MWI Inner Circle</span>`;
            servicesItem.parentElement.insertBefore(ic, afterNode.nextSibling);
            ic.addEventListener('click', () => Router.navigate('/inner-circle'));
          }
        } catch {}
      }
      // Toggle benefits vs partner stats blocks
      try {
        const benefitsBlock = document.getElementById('dash-benefits-block');
        const partnerStatsBlock = document.getElementById('dash-partner-stats');
        if (isPaidUser) {
          if (benefitsBlock) benefitsBlock.style.display = 'none';
          if (partnerStatsBlock) partnerStatsBlock.style.display = 'block';
        } else {
          if (benefitsBlock) benefitsBlock.style.display = 'block';
          if (partnerStatsBlock) partnerStatsBlock.style.display = 'none';
        }
      } catch {}

      // If paid, compute Partner Center stats aligned with PartnerCenterPage (backend truth)
      if (isPaidUser) {
        try {
          const sEl = document.getElementById('dash-pc-sales');
          const pEl = document.getElementById('dash-pc-percent');
          const tEl = document.getElementById('dash-pc-total');
          const npEl = document.getElementById('dash-pc-next-pay-date');
          // Weekly boundaries (Fri cutoff, America/Bogota)
          const weeklyBoundaries = () => {
            const now = new Date();
            const bogotaOffsetMs = 5 * 60 * 60 * 1000;
            const bogotaRef = new Date(now.getTime() - bogotaOffsetMs);
            const day = bogotaRef.getUTCDay();
            const diffToFri = (5 - day + 7) % 7;
            const endUtcMs = Date.UTC(
              bogotaRef.getUTCFullYear(),
              bogotaRef.getUTCMonth(),
              bogotaRef.getUTCDate() + diffToFri,
              23, 0, 0, 0
            );
            const startUtcMs = endUtcMs - (7 * 24 * 60 * 60 * 1000);
            return { start: new Date(startUtcMs), end: new Date(endUtcMs - 1) };
          };
          // Static active reward percent
          if (pEl) pEl.textContent = '40%';
          // Weekly sales count (level 0) from backend commissions
          try {
            if (token) {
              const r = await fetch(`${base}/partner/commissions`, { headers: { Authorization: `Bearer ${token}` } });
              const j = await r.json().catch(() => ({}));
              if (r.ok && j) {
                const list = Array.isArray(j.items) ? j.items : [];
                const { start, end } = weeklyBoundaries();
                const cnt = list.filter((it) => {
                  const d = new Date(it.createdAt || it.updatedAt || Date.now());
                  return Number(it.level) === 0 && d >= start && d <= end;
                }).length;
                if (sEl) sEl.textContent = String(cnt);
              }
            }
          } catch {}
          // Weekly outstanding: weekly commissions total - payments made for this weekly period
          try {
            if (token) {
              const { start, end } = weeklyBoundaries();
              const qs = new URLSearchParams({ start: start.toISOString(), end: end.toISOString() });
              const rW = await fetch(`${base}/partner/commissions/weekly?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
              const jW = await rW.json().catch(() => ({ summary: { total: 0 } }));
              let weekCommissionTotal = 0;
              if (rW.ok && jW && jW.summary && typeof jW.summary.total === 'number') {
                weekCommissionTotal = Number(jW.summary.total || 0);
              }
              const rP = await fetch(`${base}/partner/payments`, { headers: { Authorization: `Bearer ${token}` } });
              const jP = await rP.json().catch(() => ({ payments: [] }));
              const sTxt = start.toISOString().slice(0, 10);
              const eTxt = end.toISOString().slice(0, 10);
              const periodKey = `${sTxt} to ${eTxt}`;
              const payments = Array.isArray(jP.payments) ? jP.payments : [];
              const weekPaid = payments
                .filter(p => String(p.period || '') === periodKey)
                .reduce((acc, p) => acc + Number(p.amount || 0), 0);
              const outstanding = Math.max(0, Math.round((weekCommissionTotal - weekPaid) * 100) / 100);
              if (tEl) tEl.textContent = `$${outstanding.toFixed(2)}`;
            }
          } catch {}
          // Next payment date: Friday of current week
          try {
            const now = new Date();
            const day = now.getDay();
            const diff = (5 - day + 7) % 7; // 5=Friday
            const nextFriday = new Date(now);
            nextFriday.setDate(now.getDate() + diff);
            const mm = String(nextFriday.getMonth() + 1).padStart(2, '0');
            const dd = String(nextFriday.getDate()).padStart(2, '0');
            const yyyy = nextFriday.getFullYear();
            const text = `${mm}/${dd}/${yyyy}`;
            if (npEl) npEl.textContent = text;
          } catch {}
        } catch {}
      }
      // Save global flag for other pages
      try { window.MWI_IS_PAID = isPaidUser; } catch {}
    } catch (e) {
      console.error('[Dashboard] /auth/me', e);
      // Mantener al usuario en el dashboard si hay error al cargar perfil
      if (statusEl) { statusEl.textContent = ''; statusEl.style.display = 'none'; }
    }

    // Sidebar actions
    const nav = {
      dash: document.getElementById('nav-dashboard'),
      masters: document.getElementById('nav-masters'),
      podcast: document.getElementById('nav-podcast'),
      services: document.getElementById('nav-services'),
      support: document.getElementById('nav-support'),
      logout: document.getElementById('nav-logout')
    };
    nav.dash && nav.dash.addEventListener('click', () => Router.navigate('/dashboard'));
    nav.masters && nav.masters.addEventListener('click', () => Router.navigate('/masters'));
    nav.podcast && nav.podcast.addEventListener('click', () => Router.navigate('/podcast'));
    nav.services && nav.services.addEventListener('click', () => Router.navigate('/services'));
    nav.support && nav.support.addEventListener('click', () => {
      const url = 'https://wa.me/573003517982?text=Hola%2C%20necesito%20soporte%20con%20mi%20cuenta%20MWI';
      try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { console.error('support open error', e); }
    });

    // Logout action from sidebar
    nav.logout && nav.logout.addEventListener('click', () => {
      try { if (typeof AuthManager !== 'undefined' && AuthManager.logout) AuthManager.logout(); } catch {}
      try { localStorage.removeItem('mwi:token'); } catch {}
      try { Router.navigate('/'); } catch { window.location.hash = '#/'; }
    });

    // Carga dinámica de mentores desde Mongo y popula la barra lateral
    async function loadDashboardMentors() {
      try {
        const service = window.MentorService;
        if (!service || typeof service.getAll !== 'function') return;
        const mentors = await service.getAll();
        if (!Array.isArray(mentors)) return;
        const supportEl = document.getElementById('nav-support');
        const parent = supportEl && supportEl.parentElement ? supportEl.parentElement : document.querySelector('.dash-sidebar');
        if (!parent) return;
        // Eliminar cualquier item de mentor previo (evitar duplicados)
        Array.from(parent.querySelectorAll('.nav-master')).forEach(n => n.remove());
        // Insertar cada mentor antes del soporte
        mentors.forEach(m => {
          const name = (m && m.name) ? String(m.name) : '';
          const slug = (m && m.slug) ? String(m.slug) : '';
          const photoUrl = (m && m.photoUrl) ? String(m.photoUrl) : '';
          if (!slug) return;
          const div = document.createElement('div');
          div.className = 'nav-item nav-master';
          div.setAttribute('data-master', slug);
          div.innerHTML = `
            <img class="nav-photo" alt="${Utils.escapeHtml(name)}" style="display:none;" />
            <span class="nav-avatar" data-name="${Utils.escapeHtml(name)}"></span>
            <span class="nav-text">${Utils.escapeHtml(name)}</span>
          `;
          // Iniciales fallback
          const avatar = div.querySelector('.nav-avatar');
          if (avatar) {
            const parts = name.trim().split(/\s+/);
            avatar.textContent = ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '•';
          }
          // Foto real si existe
          const img = div.querySelector('.nav-photo');
          if (img && photoUrl) {
            img.onload = () => { img.style.display = 'inline-block'; if (avatar) avatar.style.display = 'none'; };
            img.onerror = () => { img.style.display = 'none'; if (avatar) avatar.style.display = 'flex'; };
            img.src = photoUrl;
          } else {
            if (img) img.style.display = 'none';
            if (avatar) avatar.style.display = 'flex';
          }
          // Navegación al perfil del mentor
          div.addEventListener('click', () => {
            if (slug) Router.navigate(`/maestro/${slug}`); else Router.navigate('/masters');
          });
          // Insertar antes de Soporte
          if (supportEl && parent) parent.insertBefore(div, supportEl);
          else parent.appendChild(div);
        });
      } catch (e) {
        console.error('❌ Dashboard mentors error', e);
      }
    }

    // Removed right-panel logout button

    // CTA: Activate affiliation
    const modal = document.getElementById('affiliacion-modal');
    const openModal = () => {
      if (!modal) return;
      // Refresh price from backend (fallback to storage) and toggle discount row
      (async () => {
        try {
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
          const r = await fetch(`${base}/api/config/pricing/membership`);
          const j = await r.json().catch(() => ({}));
          const priceUSD = (j && typeof j.priceUSD === 'number') ? j.priceUSD : null;
          const baseEl = document.getElementById('aff-modal-price-base');
          const discEl = document.getElementById('aff-modal-price-discount');
          const wrapEl = document.getElementById('aff-price-discount-wrap');
          const inputEl = document.getElementById('aff-coupon-input');
          const basePrice = (priceUSD != null) ? Number(priceUSD) : Number((typeof StorageManager !== 'undefined' && StorageManager.get) ? (StorageManager.get('mwi_membership_price') || 499) : 499);
          if (baseEl) baseEl.textContent = String(basePrice);
          if (discEl) discEl.textContent = String(Math.round(basePrice * 0.5));
          const showDiscount = inputEl && inputEl.value && String(inputEl.value).trim().length > 0;
          if (wrapEl) wrapEl.style.display = showDiscount ? 'block' : 'none';
        } catch (e) {
          try {
            const baseEl = document.getElementById('aff-modal-price-base');
            const discEl = document.getElementById('aff-modal-price-discount');
            const wrapEl = document.getElementById('aff-price-discount-wrap');
            const inputEl = document.getElementById('aff-coupon-input');
            const p = Number((typeof StorageManager !== 'undefined' && StorageManager.get) ? (StorageManager.get('mwi_membership_price') || 499) : 499);
            if (baseEl) baseEl.textContent = String(p);
            if (discEl) discEl.textContent = String(Math.round(p * 0.5));
            const showDiscount = inputEl && inputEl.value && String(inputEl.value).trim().length > 0;
            if (wrapEl) wrapEl.style.display = showDiscount ? 'block' : 'none';
          } catch {}
        }
      })();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      // focus trap start element
      try { document.getElementById('btn-modal-mp')?.focus(); } catch (e) {}
    };
    // Expose for other modules (e.g., live sessions loader)
    try { window.openAffiliationModal = openModal; } catch (e) {}
    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    const activateBtn = document.getElementById('btn-activate');
    activateBtn && activateBtn.addEventListener('click', openModal);
    const activateBtn2 = document.getElementById('btn-activate-2');
    activateBtn2 && activateBtn2.addEventListener('click', openModal);

    // Auto-open modal if navigated with flag (e.g., from player overlay)
    try {
      const params = (typeof Router !== 'undefined' && Router.getUrlParams) ? Router.getUrlParams() : (function(){
        try { const q = (window.location.hash.split('?')[1] || ''); return Object.fromEntries(new URLSearchParams(q)); } catch(e) { return {}; }
      })();
      const trigger = (String(params.aff || '').toLowerCase() === '1' || String(params.openAff || '').toLowerCase() === '1' || String(params.aff || '').toLowerCase() === 'true' || String(params.openAff || '').toLowerCase() === 'true');
      if (trigger) openModal();
    } catch (e) { /* ignore */ }

    // Modal controls
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('btn-modal-cancel')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (ev) => {
      const target = ev.target;
      if (target && target.getAttribute && target.getAttribute('data-close') === 'true') closeModal();
    });
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeModal(); });
    // Coupon redeem: validate with backend, toggle price on success
    let __couponValidated = false;
    let __couponCode = null;
    try {
      const inputEl = document.getElementById('aff-coupon-input');
      const redeemBtn = document.getElementById('aff-coupon-redeem');
      const msgEl = document.getElementById('aff-coupon-message');
      const wrapEl = document.getElementById('aff-price-discount-wrap');
      const baseEl = document.getElementById('aff-modal-price-base');
      const discEl = document.getElementById('aff-modal-price-discount');

      // Reset state on input change
      inputEl?.addEventListener('input', () => {
        __couponValidated = false;
        __couponCode = null;
        if (msgEl) { msgEl.textContent = ''; msgEl.style.color = '#cdbb9a'; }
        if (wrapEl) wrapEl.style.display = 'none';
        if (baseEl) { baseEl.style.textDecoration = 'none'; baseEl.style.color = '#f6e9c9'; }
      });

      redeemBtn?.addEventListener('click', async () => {
        try {
          const raw = (inputEl?.value || '').trim();
          if (!raw) { if (msgEl) { msgEl.textContent = 'Ingresa un cupón'; msgEl.style.color = '#cdbb9a'; } return; }
          if (!window.PaymentService || typeof window.PaymentService.validateCoupon !== 'function') {
            if (msgEl) { msgEl.textContent = 'Servicio no disponible'; msgEl.style.color = '#ff6b6b'; }
            return;
          }
          redeemBtn.disabled = true;
          redeemBtn.textContent = 'VALIDANDO...';
          const res = await window.PaymentService.validateCoupon(raw);
          if (res && res.valid) {
            __couponValidated = true;
            __couponCode = raw;
            if (msgEl) { msgEl.textContent = 'Cupón validado: descuento 50% aplicado'; msgEl.style.color = '#7ad07a'; }
            const baseVal = Number(baseEl ? baseEl.textContent : 0) || 0;
            if (discEl) discEl.textContent = String(Math.round(baseVal * 0.5));
            if (wrapEl) wrapEl.style.display = 'block';
            if (baseEl) { baseEl.style.textDecoration = 'line-through'; baseEl.style.color = '#cdbb9a'; }
          } else {
            __couponValidated = false;
            __couponCode = null;
            if (msgEl) { msgEl.textContent = 'Cupón inválido'; msgEl.style.color = '#ff6b6b'; }
            if (wrapEl) wrapEl.style.display = 'none';
            if (baseEl) { baseEl.style.textDecoration = 'none'; baseEl.style.color = '#f6e9c9'; }
          }
        } catch (e) {
          __couponValidated = false;
          __couponCode = null;
          if (msgEl) { msgEl.textContent = 'Cupón inválido'; msgEl.style.color = '#ff6b6b'; }
          if (wrapEl) wrapEl.style.display = 'none';
          if (baseEl) { baseEl.style.textDecoration = 'none'; baseEl.style.color = '#f6e9c9'; }
        } finally {
          redeemBtn.disabled = false;
          redeemBtn.textContent = 'REDIMIR CUPÓN';
        }
      });
    } catch {}

    // WhatsApp assist button
    try {
      const wbtn = document.getElementById('aff-coupon-whatsapp');
      if (wbtn) {
        const url = 'https://wa.me/573003517982?text=Hola,%20quiero%20mi%20cupón%20para%20activar%20la%20membresía';
        wbtn.addEventListener('click', () => {
          try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { window.location.href = url; }
        });
      }
    } catch {}

    // MercadoPago checkout
    document.getElementById('btn-modal-mp')?.addEventListener('click', async (ev) => {
      const btn = ev && ev.currentTarget ? ev.currentTarget : document.getElementById('btn-modal-mp');
      try {
        if (btn) { btn.disabled = true; btn.textContent = 'REDIRIGIENDO...'; }
        let couponCode = null;
        try { couponCode = __couponValidated ? (__couponCode || null) : null; } catch {}
        try {
          const params = (typeof Router !== 'undefined' && Router.getUrlParams) ? Router.getUrlParams() : (function(){
            try { const q = (window.location.hash.split('?')[1] || ''); return Object.fromEntries(new URLSearchParams(q)); } catch(e) { return {}; }
          })();
          if (!couponCode) couponCode = params.coupon || params.c || null;
        } catch {}
        if (!window.PaymentService || typeof window.PaymentService.createCheckout !== 'function') {
          throw new Error('Servicio de pagos no disponible');
        }
        const url = await window.PaymentService.createCheckout(couponCode);
        closeModal();
        try { window.location.href = url; } catch (e) { window.location.assign(url); }
      } catch (err) {
        console.error('[Dashboard] iniciar MP checkout error', err);
        if (typeof Utils !== 'undefined' && typeof Utils.showError === 'function') {
          Utils.showError(err && err.message ? err.message : 'No se pudo iniciar el checkout con MercadoPago');
        }
        if (btn) { btn.disabled = false; btn.textContent = 'Sigue con MercadoPago'; }
      }
    });

    // Stripe checkout
    document.getElementById('btn-modal-stripe')?.addEventListener('click', async (ev) => {
      const btn = ev && ev.currentTarget ? ev.currentTarget : document.getElementById('btn-modal-stripe');
      try {
        if (btn) { btn.disabled = true; btn.textContent = 'REDIRIGIENDO...'; }
        let couponCode = null;
        try { couponCode = __couponValidated ? (__couponCode || null) : null; } catch {}
        try {
          const params = (typeof Router !== 'undefined' && Router.getUrlParams) ? Router.getUrlParams() : (function(){
            try { const q = (window.location.hash.split('?')[1] || ''); return Object.fromEntries(new URLSearchParams(q)); } catch(e) { return {}; }
          })();
          if (!couponCode) couponCode = params.coupon || params.c || null;
        } catch {}
        if (!window.PaymentService || typeof window.PaymentService.createStripeCheckout !== 'function') {
          throw new Error('Servicio de pagos no disponible');
        }
        const url = await window.PaymentService.createStripeCheckout(couponCode);
        closeModal();
        try { window.location.href = url; } catch (e) { window.location.assign(url); }
      } catch (err) {
        console.error('[Dashboard] iniciar Stripe checkout error', err);
        if (typeof Utils !== 'undefined' && typeof Utils.showError === 'function') {
          Utils.showError(err && err.message ? err.message : 'No se pudo iniciar el checkout con Stripe');
        }
        if (btn) { btn.disabled = false; btn.textContent = 'Sigue con Stripe'; }
      }
    });

    // Live update price in modal when admin changes it
    try {
      window.addEventListener('mwi:membershipPriceChanged', (ev) => {
        const p = (ev && ev.detail && typeof ev.detail.price !== 'undefined') ? ev.detail.price : null;
        if (p === null) return;
        const baseEl = document.getElementById('aff-modal-price-base');
        const discEl = document.getElementById('aff-modal-price-discount');
        if (baseEl) { try { baseEl.textContent = String(p); } catch (e) {} }
        if (discEl) { try { discEl.textContent = String(Math.round(Number(p) * 0.5)); } catch (e) {} }
      });
    } catch (e) {}

    // Podcast: cargar desde Mongo y render sin parpadeo
    const wirePodcastButton = (root) => {
      try {
        const progressFill = (root || document).querySelector('#podcast-progress-fill');
        const btnPodcast = (root || document).querySelector('#btn-podcast');
        const progressRaw = localStorage.getItem('mwi:podcast:progress') || '0';
        const progress = Math.max(0, Math.min(100, parseFloat(progressRaw)));
        if (progressFill) progressFill.style.width = progress + '%';
        if (btnPodcast) {
          btnPodcast.textContent = (progress > 0 && progress < 100) ? 'CONTINUAR' : 'VER VIDEO';
          if (!btnPodcast.__mwi_wired) {
            btnPodcast.__mwi_wired = true;
            btnPodcast.addEventListener('click', () => Router.navigate('/podcast'));
          }
        }
      } catch {}
    };
    try {
      const section = document.getElementById('mwi-podcast-section');
      if (section) {
        let ep = null;
        try {
          if (window.PodcastService && typeof window.PodcastService.getFeaturedForDashboard === 'function') {
            ep = await window.PodcastService.getFeaturedForDashboard();
          } else {
            const resp = await fetch(`${base}/api/podcast/featured-one`);
            if (resp.ok) ep = await resp.json();
          }
        } catch {}
        if (ep) {
          const cover = ep.image || ep.thumbnail || (typeof Utils !== 'undefined' && Utils.getPlaceholderImage ? Utils.getPlaceholderImage(260, 160, 'Podcast') : '');
          const title = ep.title || 'MWI Podcast';
          const guest = ep.guest || '';
          const desc = ep.description || '';
          const dur = ep.duration || '';
          section.innerHTML = `
            <div class="podcast-card">
              <div class="podcast-thumb" style="background-image:url('${cover}'); background-size:cover; background-position:center;">
                ${dur ? `<div class=\"podcast-duration-badge\">${dur}</div>` : ''}
              </div>
              <div class="podcast-info">
                <div class="podcast-title" id="podcast-episode-title">${(typeof Utils !== 'undefined' && Utils.escapeHtml) ? Utils.escapeHtml(title) : title}</div>
                ${guest ? `<div class=\"podcast-guest\">Invitado: ${(typeof Utils !== 'undefined' && Utils.escapeHtml) ? Utils.escapeHtml(guest) : guest}</div>` : ''}
                <div class="podcast-desc">${(typeof Utils !== 'undefined' && Utils.escapeHtml) ? Utils.escapeHtml(desc) : desc}</div>
                <button id="btn-podcast" class="dash-cta-btn podcast-btn">VER VIDEO</button>
              </div>
            </div>`;
          section.style.display = 'block';
          wirePodcastButton(section);
        } else {
          section.style.display = 'none';
        }
      }
    } catch {}
    // Live session buttons: gate by affiliation status and use session CTA
    const affIsActive = !!window.MWI_IS_PAID;
    document.querySelectorAll('.live-card .btn-gold-sm').forEach(btn => {
      if (btn.__mwi_wired) return;
      btn.__mwi_wired = true;
      btn.addEventListener('click', () => {
        const requiresAff = (btn.getAttribute('data-requires-aff') || '0') === '1';
        const route = btn.getAttribute('data-cta-route') || '/services';
        if (requiresAff && !affIsActive) { openModal(); return; }
        // If route is external (e.g., Google Meet), open new tab
        if (/^https?:\/\//i.test(route)) {
          try { window.open(route, '_blank', 'noopener,noreferrer'); } catch (e) { window.location.href = route; }
        } else {
          Router.navigate(route);
        }
      });
    });

    // Live card photos: load from Mongo mentors (photoUrl), fallback to avatar initials
    try {
      (async () => {
        const mentors = (window.MentorService && typeof window.MentorService.getAll === 'function')
          ? await window.MentorService.getAll()
          : [];
        const bySlug = Object.create(null);
        (mentors || []).forEach(m => { if (m && m.slug) bySlug[m.slug] = m; });
        document.querySelectorAll('.live-card').forEach(card => {
          if (card.__mwi_photo_wired) return;
          card.__mwi_photo_wired = true;
          const slug = (card.getAttribute('data-instructor') || '').trim();
          const mentor = bySlug[slug] || {};
          const img = card.querySelector('.inst-photo');
          const avatar = card.querySelector('.inst-avatar');
          const url = mentor.photoUrl || '';
          if (img && url) {
            img.src = url;
            img.onload = () => { img.style.display = 'inline-block'; if (avatar) avatar.style.display = 'none'; };
            img.onerror = () => { img.style.display = 'none'; if (avatar) avatar.style.display = 'block'; };
          } else {
            if (img) img.style.display = 'none';
            if (avatar) {
              avatar.style.display = 'block';
              const parts = String(mentor.name || slug || '').trim().split(/\s+/);
              avatar.textContent = ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
            }
          }
        });
      })();
    } catch (e) { /* ignore */ }

    // Community buttons: Instagram & Telegram
    try {
      document.getElementById('btn-instagram-follow')?.addEventListener('click', () => {
        const url = 'https://www.instagram.com/modernwealthinstitute?igsh=OXVjbGsyZWs3cmV3&utm_source=qr';
        try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { console.error('instagram open error', e); }
      });
      document.getElementById('btn-telegram-join')?.addEventListener('click', () => {
        const url = 'https://t.me/modernwealthinstitute';
        try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { console.error('telegram open error', e); }
      });
    } catch (e) { /* ignore */ }

    // Avatar upload eliminado: se muestra avatar por iniciales del usuario

    // Cargar mentores en sidebar desde Mongo
    try {
      setTimeout(() => { try { loadDashboardMentors(); } catch {} }, 0);
    } catch {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardPage;
}

(function(){
  // Global loader to populate Home podcast carousel, independent of after_render
  window.__loadHomePodcasts = async function () {
    try {
      const container = document.getElementById('podcast-carousel');
      if (!container) return; // Home not in DOM yet

      try { console.log('🎧 Loading podcasts from Mongo...'); } catch (e) {}

      // Prefer PodcastService if available (handles base URL); fallback to fetch with API_URL
      let episodes = [];
      try {
        if (window.PodcastService && typeof window.PodcastService.getHomepage === 'function') {
          episodes = await window.PodcastService.getHomepage();
        } else {
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
          const url = `${base}/api/podcast/homepage`;
          const res = await fetch(url);
          episodes = await res.json();
        }
      } catch (e) {
        console.error('❌ Podcast fetch failed', e);
        return;
      }

      try { console.log('🎧 Episodes:', episodes); } catch (e) {}

      if (!Array.isArray(episodes) || episodes.length === 0) {
        container.innerHTML = '';
        return;
      }

      container.innerHTML = episodes.map((p, i) => `
        <a href="#" class="mwi-master-card"
           onclick="openRegisterGlobal(event)"
           style="position:relative;">

          <img src="${(p.image || p.thumbnail || (i===0?'assets/images/img1podcast.png':i===1?'assets/images/img2podcast.png':i===2?'assets/images/img3podcast.png':'assets/images/img1podcast.png'))}"
               onerror="this.src='assets/images/logo-mwi-gold.png'"
               alt="${p.title || ''}"
               style="display:block;width:100%;height:100%;object-fit:cover;border-radius:6px;" />

          <div class="mwi-master-overlay">
            <h3>${p.title || ''}<br><span>${p.duration || ''}</span></h3>
          </div>

          <div style="position:absolute;left:12px;top:12px;
            background:rgba(0,0,0,.55);
            color:#d4a955;
            font-weight:800;
            padding:4px 8px;
            border-radius:6px;">
            PODCAST
          </div>

          <div style="position:absolute;right:12px;top:12px;
            background:rgba(0,0,0,.55);
            color:#fff;
            width:32px;height:32px;
            display:flex;align-items:center;justify-content:center;
            border-radius:50%;">
            ▶
          </div>
        </a>
      `).join('');
    } catch (err) {
      console.error('❌ Podcast load failed', err);
    }
  };

  // Global loader to populate Dashboard live sessions
  window.__loadDashboardLiveSessions = async function () {
    try {
      const container = document.getElementById('live-sessions-container');
      const title = document.querySelector('.live-title');
      if (!title) return;

      // Prefer explicit container; fallback: clear siblings after title
      if (container) {
        // Prevent concurrent/double render if already loading or rendered
        if (container.dataset.loading === '1') return;
        if (container.dataset.rendered === '1' && container.childElementCount > 0) return;
        container.dataset.loading = '1';
        container.innerHTML = '';
      } else {
        let node = title.nextElementSibling;
        while (node && node.classList && node.classList.contains('live-card')) {
          const next = node.nextElementSibling;
          node.remove();
          node = next;
        }
      }

      let sessions = [];
      try {
        if (window.LiveSessionService && typeof window.LiveSessionService.getDashboardSessions === 'function') {
          sessions = await window.LiveSessionService.getDashboardSessions();
        } else {
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
          const url = `${base}/api/livesessions/dashboard`;
          const res = await fetch(url);
          sessions = await res.json();
        }
      } catch (err) {
        console.error('❌ LiveSessions fetch failed', err);
        return;
      }

      if (!Array.isArray(sessions) || sessions.length === 0) {
        if (container) container.innerHTML = '';
        return;
      }

      // Deduplicate by `_id` or `id`
      const dedup = {};
      (sessions || []).forEach(s => { const key = s._id || s.id || JSON.stringify(s); dedup[key] = s; });
      sessions = Object.values(dedup);

      let mentors = [];
      try {
        mentors = (window.MentorService && typeof window.MentorService.getAll === 'function')
          ? await window.MentorService.getAll()
          : [];
      } catch (e) { mentors = []; }

      sessions.forEach((s) => {
        const slug = s.instructor || s.mentorSlug || '';
        const mentor = mentors.find(m => (m.slug || '') === slug) || {};
        const name = (mentor && mentor.name) ? mentor.name : slug;
        const requiresAff = (typeof s.requiresAffiliation === 'boolean') ? s.requiresAffiliation : true;
        const timeText = s.time || s.scheduledAtText || (s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : '');
        const ctaLabel = s.ctaLabel || 'INGRESAR';
        const ctaRoute = s.ctaRoute || s.meetLink || s.meetUrl || '/services';

        const div = document.createElement('div');
        div.className = 'live-card';
        div.setAttribute('data-instructor', slug);
        div.innerHTML = `
          <img class="inst-photo" style="display:none"/>
          <div class="inst-avatar"></div>
          <div class="meta">
            <div class="title">${Utils.escapeHtml(s.title || '')}</div>
            <div class="sub">
              ${Utils.escapeHtml(name || '')}
               ${requiresAff ? `<span class="lock">
                 <svg viewBox="0 0 24 24">
                   <rect x="3" y="10" width="18" height="10" rx="2"/>
                   <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
                 </svg>
               </span>` : ''}
            </div>
            <div class="time">${Utils.escapeHtml(timeText)}</div>
          </div>
          <div>
            <button class="btn-gold-sm"
              data-cta-route="${Utils.escapeHtml(ctaRoute)}"
              data-requires-aff="${requiresAff ? '1' : '0'}">
              ${Utils.escapeHtml(ctaLabel)}
            </button>
          </div>
        `;

        if (container) { container.appendChild(div); } else { title.after(div); }

        // Load mentor photo from Mongo and toggle avatar fallback
        try {
          const img = div.querySelector('.inst-photo');
          const avatar = div.querySelector('.inst-avatar');
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
        } catch (_) {}
      });

      // Re-wire button actions after injection (reuse dashboard logic)
      try {
        const affIsActive = !!window.MWI_IS_PAID;
        document.querySelectorAll('.live-card .btn-gold-sm').forEach(btn => {
          if (btn.__mwi_wired) return;
          btn.__mwi_wired = true;
          btn.addEventListener('click', () => {
            const requiresAff = (btn.getAttribute('data-requires-aff') || '0') === '1';
            const route = btn.getAttribute('data-cta-route') || '/services';
            if (requiresAff && !affIsActive) { try { window.openAffiliationModal && window.openAffiliationModal(); } catch {} return; }
            if (/^https?:\/\//i.test(route)) {
              try { window.open(route, '_blank', 'noopener,noreferrer'); } catch (e) { window.location.href = route; }
            } else {
              try { Router.navigate(route); } catch (e) { window.location.hash = '#'+route.replace(/^#?\//,'/'); }
            }
          });
        });
        if (container) { container.dataset.rendered = '1'; container.dataset.loading = '0'; }
      } catch (e) { /* ignore */ }
    } catch (e) {
      console.error('❌ Dashboard live sessions error', e);
    }
  };

  // Global loader to populate Dashboard featured podcast (single episode)
  window.__loadDashboardPodcast = async function () {
    try {
      // Ensure we're on dashboard by checking for the known elements
      const dashRoot = document.querySelector('.dashboard-page');
      if (!dashRoot) return;

      // Query existing nodes without modifying HTML structure
      const thumbEl = dashRoot.querySelector('.podcast-card .podcast-thumb');
      const durEl = dashRoot.querySelector('.podcast-card .podcast-duration-badge');
      const titleEl = dashRoot.querySelector('#podcast-episode-title') || dashRoot.querySelector('.podcast-card .podcast-title');
      const descEl = dashRoot.querySelector('.podcast-card .podcast-desc');
      const btn = dashRoot.querySelector('#btn-podcast');

      let ep = null;
      try {
        if (window.PodcastService && typeof window.PodcastService.getFeaturedForDashboard === 'function') {
          ep = await window.PodcastService.getFeaturedForDashboard();
        } else {
          const base = (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || '';
          const url = `${base}/api/podcast/featured-one`;
          const res = await fetch(url);
          ep = await res.json();
        }
      } catch (e) {
        console.error('❌ Dashboard podcast fetch failed', e);
        return;
      }

      if (!ep) return;

      try { if (titleEl) titleEl.textContent = ep.title || 'MWI Podcast'; } catch {}
      try { if (descEl) descEl.textContent = ep.description || ''; } catch {}
      try { if (durEl) durEl.textContent = ep.duration || '0:00'; } catch {}

      // Thumbnail background: prefer `image`, fallback to `thumbnail`
      const imgUrl = ep.image || ep.thumbnail || '';
      if (thumbEl && imgUrl) {
        try {
          thumbEl.style.backgroundImage = `url('${imgUrl}')`;
          thumbEl.style.backgroundSize = 'cover';
          thumbEl.style.backgroundPosition = 'center';
        } catch {}
      }

      // Button navigates to podcast page
      if (btn && !btn.__mwi_wired) {
        btn.__mwi_wired = true;
        btn.onclick = () => {
          try { Router.navigate('/podcast'); } catch (e) { window.location.hash = '#/podcast'; }
        };
      }
    } catch (e) {
      console.error('❌ Dashboard podcast error', e);
    }
  };
})();

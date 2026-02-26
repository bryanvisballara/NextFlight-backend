// Simple service to initiate Mercado Pago checkout via backend

(function(){
  const getBase = () => (window.API_URL) || (window.MWI && window.MWI.API_BASE_URL) || 'https://mwi-backend.onrender.com';

  async function createCheckout(couponCode) {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base}/api/mp/create-checkout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ couponCode: couponCode || null })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo crear el checkout';
        throw new Error(msg);
      }
      const url = data && (data.checkoutUrl || data.init_point || data.sandbox_init_point);
      if (!url) throw new Error('Checkout no disponible');
      return url;
    } catch (e) {
      throw e;
    }
  }

  // Stripe: create one-time membership payment via backend provider router
  async function createStripeCheckout(couponCode) {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base}/api/payments/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ method: 'stripe', couponCode: couponCode || null })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo crear el pago con Stripe';
        throw new Error(msg);
      }
      const url = data && data.checkoutUrl;
      if (!url) throw new Error('Checkout de Stripe no disponible');
      return url;
    } catch (e) {
      throw e;
    }
  }

  async function validateCoupon(code) {
    const base = getBase();
    const res = await fetch(`${base}/api/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data && (data.error || data.message)) || 'No se pudo validar el cupón');
    }
    return data; // { valid: boolean, coupon?: {...}, message?: string }
  }

  // Create subscription for Inner Circle signals (MercadoPago Preapproval)
  async function createSignalsSubscription() {
    const base = getBase();
    const fallbackBase = 'https://mwi-backend.onrender.com';
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      let res;
      try {
        res = await fetch(`${base}/api/mp/signals/subscribe`, { method: 'POST', headers });
      } catch (networkErr) {
        // DNS/Network error: try fallback base
        try { console.warn('Primary API failed, trying fallback', { base, error: String(networkErr && networkErr.message || networkErr) }); } catch {}
        if (base !== fallbackBase) {
          res = await fetch(`${fallbackBase}/api/mp/signals/subscribe`, { method: 'POST', headers });
        } else {
          throw networkErr;
        }
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || `No se pudo crear la suscripción (HTTP ${res.status})`;
        try { console.error('Signals subscription error:', { status: res.status, data }); } catch {}
        throw new Error(msg);
      }
      const url = data && (data.init_point || data.preapproval_url || data.checkoutUrl);
      if (!url) throw new Error('Suscripción no disponible');
      return url;
    } catch (e) {
      throw e;
    }
  }

  // Stripe subscription for Inner Circle (Signals)
  async function createStripeSignalsSubscription() {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base}/api/payments/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ method: 'stripe', type: 'subscription', plan: 'inner_circle' })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo crear la suscripción con Stripe';
        throw new Error(msg);
      }
      const url = data && data.checkoutUrl;
      if (!url) throw new Error('Suscripción con Stripe no disponible');
      return url;
    } catch (e) { throw e; }
  }

  async function getSignalsTelegramLink() {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base}/api/signals/telegram-link`, { method: 'GET', headers });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo obtener el link de Telegram';
        throw new Error(msg);
      }
      const url = data && data.url;
      if (!url) throw new Error('Link no disponible');
      return url;
    } catch (e) { throw e; }
  }

  async function cancelSignalsSubscription() {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${base}/api/signals/cancel`, { method: 'POST', headers });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo cancelar la suscripción';
        throw new Error(msg);
      }
      return data;
    } catch (e) { throw e; }
  }

  // Verify subscription after login (server-side activation)
  async function verifySignalsSubscription() {
    const base = getBase();
    try {
      const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('mwi:token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      // Try Stripe verify first
      let res = await fetch(`${base}/api/signals/verify-stripe`, { method: 'POST', headers });
      let data = await res.json().catch(() => ({}));
      if (res.ok && data && data.ok) return data;
      // Fallback to Mercado Pago verify
      res = await fetch(`${base}/api/mp/verify-subscription`, { method: 'POST', headers });
      data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || 'No se pudo verificar la suscripción';
        throw new Error(msg);
      }
      return data;
    } catch (e) { throw e; }
  }

  window.PaymentService = { createCheckout, createStripeCheckout, validateCoupon, createSignalsSubscription, createStripeSignalsSubscription, getSignalsTelegramLink, cancelSignalsSubscription, verifySignalsSubscription };
})();

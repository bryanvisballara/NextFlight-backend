// Global API configuration
// Sets a single base URL for backend requests
(function(){
  try {
    var PROD_URL = 'https://mwi-backend.onrender.com';
    var DEV_URL = 'http://127.0.0.1:5050';
    var isLocal = false;
    try { isLocal = /localhost|127\.0\.0\.1/.test(window.location && window.location.hostname); } catch (e) { isLocal = false; }
    // Allow override via existing value; prefer local backend when running locally
    window.API_URL = window.API_URL || (isLocal ? DEV_URL : PROD_URL);
    // Mirror into MWI namespace for existing references
    window.MWI = window.MWI || {};
    window.MWI.API_BASE_URL = window.API_URL;
  } catch (e) {
    // no-op
  }
})();

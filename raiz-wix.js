/*
 * raiz-wix.js — ponte leve entre o site (Design Canvas) e o CMS do Wix Headless.
 * Lê coleções públicas via token de visitante (OAuth anônimo). Somente leitura.
 * Se qualquer passo falhar, quem chama usa o conteúdo local de fallback — o site
 * nunca fica em branco.
 */
(function () {
  var CLIENT_ID = 'f1ecae77-4b36-42c5-a6c6-5a25292b0742';
  var TOKEN_URL = 'https://www.wixapis.com/oauth2/token';
  var QUERY_URL = 'https://www.wixapis.com/wix-data/v2/items/query';
  var STORE_KEY = 'raiz_wix_token';

  var tokenPromise = null;

  function readStoredToken() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (o && o.token && o.exp && o.exp > Date.now() + 30000) return o.token;
    } catch (e) {}
    return null;
  }

  function storeToken(token, expiresIn) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        token: token,
        exp: Date.now() + ((expiresIn || 14400) * 1000)
      }));
    } catch (e) {}
  }

  function getToken() {
    var cached = readStoredToken();
    if (cached) return Promise.resolve(cached);
    if (tokenPromise) return tokenPromise;
    tokenPromise = fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: CLIENT_ID, grantType: 'anonymous' })
    })
      .then(function (r) {
        if (!r.ok) throw new Error('token ' + r.status);
        return r.json();
      })
      .then(function (j) {
        if (!j.access_token) throw new Error('sem access_token');
        storeToken(j.access_token, j.expires_in);
        tokenPromise = null;
        return j.access_token;
      })
      .catch(function (e) {
        tokenPromise = null;
        throw e;
      });
    return tokenPromise;
  }

  /**
   * query(collectionId, options) -> Promise<Array<data>>
   * options.sort: [{ fieldName, order }]  (order: 'ASC' | 'DESC')
   * options.limit: número (default 100)
   * Retorna só o objeto `data` de cada item.
   */
  function query(collectionId, options) {
    options = options || {};
    return getToken().then(function (token) {
      return fetch(QUERY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          dataCollectionId: collectionId,
          query: {
            sort: options.sort || [],
            paging: { limit: options.limit || 100 }
          }
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('query ' + r.status);
          return r.json();
        })
        .then(function (j) {
          return (j.dataItems || []).map(function (it) { return it.data; });
        });
    });
  }

  window.RaizWix = { query: query, getToken: getToken, CLIENT_ID: CLIENT_ID };
})();

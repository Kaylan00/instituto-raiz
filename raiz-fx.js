// Efeitos globais do Instituto Raiz: cursor personalizado + botão Doar flutuante
(function () {
  if (window.__raizFx) return; window.__raizFx = true;
  var st = document.createElement('style');
  st.textContent = '@keyframes raiz-pulse{0%{box-shadow:0 0 0 0 rgba(217,58,33,.55)}70%{box-shadow:0 0 0 26px rgba(217,58,33,0)}100%{box-shadow:0 0 0 0 rgba(217,58,33,0)}}';
  document.head.appendChild(st);

  // Botão Doar flutuante (todas as páginas menos a própria Doar)
  if (!/doar/i.test(decodeURIComponent(location.pathname)) && !document.getElementById('raiz-fab')) {
    var fab = document.createElement('a');
    fab.id = 'raiz-fab'; fab.href = 'doar.html';
    fab.style.cssText = 'position:fixed;right:28px;bottom:28px;z-index:90;background:#D93A21;color:#F4EEDF;text-decoration:none;padding:18px 30px;border-radius:999px;font-family:Anton,sans-serif;font-size:17px;text-transform:uppercase;letter-spacing:1px;border:2px solid #1B2E1C;animation:raiz-pulse 2.4s ease-out infinite;opacity:0;pointer-events:none;transition:opacity .4s ease,transform .4s ease,background .2s ease;transform:translateY(16px);display:inline-flex;align-items:center;gap:8px;';
    fab.innerHTML = 'Doar <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style="flex:none"><path d="M12 21s-7.5-4.6-10.2-9.2C.3 8.9 1.6 5.3 5 4.4c2-.5 3.9.3 5 1.9 1.1-1.6 3-2.4 5-1.9 3.4.9 4.7 4.5 3.2 7.4C19.5 16.4 12 21 12 21z"/></svg>';
    fab.onmouseenter = function () { fab.style.background = '#1B2E1C'; };
    fab.onmouseleave = function () { fab.style.background = '#D93A21'; };
    document.body.appendChild(fab);
  }
  var fabT = function () {
    var f = document.getElementById('raiz-fab'); if (!f) return;
    var on = (window.scrollY || document.documentElement.scrollTop || 0) > 500;
    f.style.opacity = on ? '1' : '0';
    f.style.pointerEvents = on ? 'auto' : 'none';
    f.style.transform = on ? 'translateY(0)' : 'translateY(16px)';
  };
  document.addEventListener('scroll', fabT, true);
  setInterval(fabT, 400);

  // Menu hambúrguer (mobile) — nav é remontado pelo runtime, então tenta até existir
  var burgerReady = false;
  var burgerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var setupBurger = function () {
    if (burgerReady) return;
    var nav = document.querySelector('nav[data-screen-label="Navegação"]');
    if (!nav) return;
    var menu = nav.lastElementChild;
    if (!menu || menu === nav.firstElementChild) return;
    burgerReady = true;
    menu.classList.add('raiz-nav-menu');
    menu.style.background = getComputedStyle(nav).backgroundColor;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'raiz-burger';
    btn.setAttribute('aria-label', 'Abrir menu');
    var navColor = getComputedStyle(nav.firstElementChild).color;
    btn.style.color = navColor || '#1B2E1C';
    btn.innerHTML = burgerIcon;
    nav.appendChild(btn);
    var close = function () { nav.classList.remove('raiz-nav-open'); btn.innerHTML = burgerIcon; };
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('raiz-nav-open');
      btn.innerHTML = open ? closeIcon : burgerIcon;
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  };
  setupBurger();
  setInterval(setupBurger, 400);

  // Cursor personalizado (só onde há mouse)
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  var ring = document.createElement('div');
  ring.setAttribute('aria-hidden', 'true');
  ring.style.cssText = 'position:fixed;top:0;left:0;width:38px;height:38px;border:2px solid #D93A21;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-100px,-100px);transition:width .25s ease,height .25s ease,background .25s ease,margin .25s ease;margin:-19px 0 0 -19px;';
  document.body.appendChild(ring);
  var mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    var t = e.target.closest && e.target.closest('a, button, input, select, textarea');
    ring.style.width = t ? '58px' : '38px';
    ring.style.height = t ? '58px' : '38px';
    ring.style.margin = t ? '-29px 0 0 -29px' : '-19px 0 0 -19px';
    ring.style.background = t ? 'rgba(240,212,92,.25)' : 'transparent';
  });
  (function lerp() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(lerp);
  })();
})();

(function () {
  if (window.__SOLVER_LMS_UI__) return;
  window.__SOLVER_LMS_UI__ = true;

  function addFab() {
    if (document.getElementById('__solver_fab')) return;
    var btn = document.createElement('button');
    btn.id = '__solver_fab';
    btn.textContent = 'AI';
    btn.style.cssText = 'position:fixed;right:14px;bottom:14px;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg, #0f0c29, #302b63, #24243e);color:#0ff;border:2px solid #0ff;font:bold 14px monospace;cursor:pointer;z-index:999999;box-shadow:0 0 15px #0ff;transition:0.3s;';
    btn.onmouseover = () => { btn.style.transform = 'scale(1.1)'; btn.style.boxShadow = '0 0 25px #0ff'; };
    btn.onmouseout = () => { btn.style.transform = 'scale(1)'; btn.style.boxShadow = '0 0 15px #0ff'; };
    
    // Kích hoạt giải toàn bộ trang
    btn.onclick = function () { 
      document.querySelectorAll('.que input[type="radio"], .que input[type="checkbox"]').forEach(i => i.checked = false);
      location.reload(); 
    };
    document.body.appendChild(btn);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') addFab();
  else window.addEventListener('load', addFab);
})();
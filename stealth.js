(function () {
  Object.defineProperty(Document.prototype, 'hidden', { get: function () { return false; }, configurable: true });
  Object.defineProperty(Document.prototype, 'visibilityState', { get: function () { return 'visible'; }, configurable: true });
  Object.defineProperty(Document.prototype, 'webkitHidden', { get: function () { return false; }, configurable: true });
  Object.defineProperty(Document.prototype, 'webkitVisibilityState', { get: function () { return 'visible'; }, configurable: true });
  
  Document.prototype.hasFocus = function () { return true; };
  window.onblur = null;
  window.onfocus = null;
  window.blur = function () {};
  window.focus = function () {};

  var blockEvents = ['visibilitychange', 'webkitvisibilitychange', 'blur', 'focus', 'pagehide', 'pageshow'];
  var origAdd = EventTarget.prototype.addEventListener;
  
  EventTarget.prototype.addEventListener = function (type, listener, opts) {
    if (blockEvents.indexOf(type) !== -1 && (this === document || this === window)) return;
    return origAdd.call(this, type, listener, opts);
  };

  var origToString = Function.prototype.toString;
  Function.prototype.toString = function () {
    if (this === window.addEventListener || this === document.addEventListener) return 'function addEventListener() { [native code] }';
    return origToString.call(this);
  };

  Object.defineProperty(navigator, 'webdriver', { get: function () { return false; } });
  window.chrome = window.chrome || { runtime: {} };
  
  document.addEventListener('copy', function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener('paste', function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener('contextmenu', function (e) { e.stopImmediatePropagation(); }, true);
  document.exitFullscreen = function () { return Promise.resolve(); };
})();
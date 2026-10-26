(function () {
  // 1. Spoof visibility properties
  Object.defineProperty(Document.prototype, 'hidden', { get: function () { return false; }, configurable: true });
  Object.defineProperty(Document.prototype, 'visibilityState', { get: function () { return 'visible'; }, configurable: true });
  Object.defineProperty(Document.prototype, 'webkitHidden', { get: function () { return false; }, configurable: true });
  Object.defineProperty(Document.prototype, 'webkitVisibilityState', { get: function () { return 'visible'; }, configurable: true });
  
  // 2. Remove focus events
  Document.prototype.hasFocus = function () { return true; };
  window.onblur = null;
  window.onfocus = null;
  window.blur = function () {};
  window.focus = function () {};

  // 3. Block listening to tab change events
  var blockEvents = [
    'visibilitychange', 'webkitvisibilitychange', 'blur', 'focus', 
    'pagehide', 'pageshow', 'freeze', 'resume'
  ];
  
  var origAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, opts) {
    if (blockEvents.indexOf(type) !== -1 && (this === document || this === window)) {
      return; // Ignore these events entirely
    }
    return origAdd.call(this, type, listener, opts);
  };

  // 4. Spoof native functions
  var origToString = Function.prototype.toString;
  Function.prototype.toString = function () {
    if (this === window.addEventListener || this === document.addEventListener) {
      return 'function addEventListener() { [native code] }';
    }
    return origToString.call(this);
  };

  // 5. Block anti-cheat extensions detection
  Object.defineProperty(navigator, 'webdriver', { get: function () { return false; } });
  Object.defineProperty(navigator, 'plugins', { get: function () { return [1, 2, 3, 4, 5]; } });
  Object.defineProperty(navigator, 'languages', { get: function () { return ['vi-VN', 'vi', 'en-US']; } });

  window.chrome = window.chrome || { runtime: {} };

  // 6. Allow copy/paste in exams
  document.oncopy = null;
  document.oncut = null;
  document.onpaste = null;
  document.oncontextmenu = null;
  document.onkeydown = null;
  
  document.addEventListener('copy', function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener('paste', function (e) { e.stopImmediatePropagation(); }, true);
  document.addEventListener('contextmenu', function (e) { e.stopImmediatePropagation(); }, true);

  // 7. Prevent exit fullscreen
  document.exitFullscreen = function () { return Promise.resolve(); };
  document.webkitExitFullscreen = function () {};
})();
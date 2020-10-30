'use strict';
(function () {
  const MAIN_MOUSE_BUTTON = 0;

  function isEnterEvent(evt, action) {
    if (evt.key === `Enter`) {
      action();
    }
  }
  function isEscEvent(evt, action) {
    if (evt.key === `Escape`) {
      action();
    }
  }
  function isMainMouseClickEvent(evt, action) {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      action();
    }
  }
  window.util = {
    isEnterEvent,
    isMainMouseClickEvent,
    isEscEvent
  };

})();

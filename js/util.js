'use strict';
(function () {
  const MAIN_MOUSE_BUTTON = 0;

  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };
  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };
  const isMainMouseClickEvent = (evt, action) => {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      action();
    }
  };
  window.util = {
    isEnterEvent,
    isMainMouseClickEvent,
    isEscEvent
  };

})();

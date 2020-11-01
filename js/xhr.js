'use strict';
(function () {

  const REQUEST_URI = `https://21.javascript.pages.academy/keksobooking/data`;
  const MAX_TIMEOUT = 10000;

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => xhr.status === 200 ? onLoad(xhr.response) : onError(`Статус ответа:  ${xhr.status} ${xhr.statusText}`)
    );

    xhr.addEventListener(`error`, () => {
      onError(`Запрос не удался`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Ошибка! Ожидание сервера превысило ` + xhr.timeout + `мс`);
    });

    xhr.timeout = MAX_TIMEOUT;
    xhr.open(`GET`, REQUEST_URI);
    xhr.send();
  };

  window.xhr = {
    load
  };

})();
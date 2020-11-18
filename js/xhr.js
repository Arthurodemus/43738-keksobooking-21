'use strict';
(function () {

  const REQUEST_URI = `https://21.javascript.pages.academy/keksobooking/data`;
  const SEND_DATA_URI = `https://21.javascript.pages.academy/keksobooking`;
  const MAX_TIMEOUT = 10000;
  const STATUS_CODE_OK = 200;

  const load = (onLoad, onError, data = null) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => xhr.status === STATUS_CODE_OK ? onLoad(xhr.response) : onError(`Статус ответа:  ${xhr.status} ${xhr.statusText}`)
    );

    xhr.addEventListener(`error`, () => {
      onError(`Запрос не удался`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Ошибка! Ожидание сервера превысило ` + xhr.timeout + `мс`);
    });

    xhr.timeout = MAX_TIMEOUT;

    if (data) {
      xhr.open(`POST`, SEND_DATA_URI);
      xhr.send(data);
    } else {
      xhr.open(`GET`, REQUEST_URI);
      xhr.send();
    }


  };


  window.xhr = {
    load
  };

})();

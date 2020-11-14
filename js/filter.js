'use strict';

(function () {
  const MAX_FILTERED_ADS = 5;
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);

  const pricePerRoom = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  const filterHouses = (pinsData, filter) => {
    if (filter.value === `any`) {
      return true;
    }
    return pinsData.toString() === filter.value;
  };

  const filterHousesPrice = (pinsData, filter) => {
    if (filter.value === `any`) {
      return true;
    }
    return pinsData >= pricePerRoom[filter.value].min && pinsData <= pricePerRoom[filter.value].max;
  };

  const filterHousesCheckbox = (pinsData) => {
    const housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

    return Array.from(housingCheckbox).every((feature) => pinsData.indexOf(feature.value) >= 0);
  };

  const filterPinsData = (pinsData) => {
    let filteredPins = [];
    pinsData.forEach((element) => {
      if (filterHouses(element.offer.type, housingType) &&
        filterHousesPrice(element.offer.price, housingPrice) &&
        filterHouses(element.offer.rooms, housingRooms) &&
        filterHouses(element.offer.guests, housingGuests) &&
        filterHousesCheckbox(element.offer.features)) {
        filteredPins.push(element);
      }
    });

    if (filteredPins.length > MAX_FILTERED_ADS) {
      filteredPins.slice(MAX_FILTERED_ADS);
    }
    return filteredPins;
  };

  window.filter = {
    pinsData: filterPinsData
  };
})();

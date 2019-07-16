"use strict";

const path = require('path');

const getNav = () => {
  const back = document.createElement('i');
  back.setAttribute('class', 'fa fa-angle-double-left fa-2x');
  back.onclick = history.back;

  const forward = document.createElement('i');
  forward.setAttribute('class', 'fa fa-angle-double-right fa-2x');
  forward.onclick = history.forward;

  return {
    back,
    forward
  };
}

window.onload = () => {
  const scriptElement = document.createElement('script');
  scriptElement.src = 'https://use.fontawesome.com/8195baea46.js';
  document.body.appendChild(scriptElement);

  const navigationElements = getNav();

  const navigation = document.createElement('div');
  navigation.setAttribute('id', 'meetfranz-stackoverflow-navigation');
  navigation.appendChild(navigationElements.back);
  navigation.appendChild(navigationElements.forward);

  document.body.appendChild(navigation);
};

module.exports = Franz => {
  const getUnreadCount = () => {
    const count = document.querySelectorAll('.inbox-button-item .indicator-badge')[0].innerText
    Franz.setBadge(count);
  }

  Franz.injectCSS(path.join(__dirname, 'service.css'));

  Franz.loop(getUnreadCount);
};
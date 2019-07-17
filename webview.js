"use strict";

const path = require('path');
const config = require('./package.json').serviceConfig;

/**
 * Returns the navigational icons with their callback set
 */
const getNav = () => {
  const back = document.createElement('i');
  back.setAttribute('class', 'fa fa-arrow-left fa-2x');
  back.onclick = window.history.back;

  const forward = document.createElement('i');
  forward.setAttribute('class', 'fa fa-arrow-right fa-2x');
  forward.onclick = window.history.forward;

  const refresh = document.createElement('i');
  refresh.setAttribute('class', 'fa fa-refresh fa-2x');
  refresh.onclick = window.location.reload.bind(window.location);

  return {
    back,
    forward,
    refresh,
  };
}

/**
 * On load, we load the Font Awesome library, then set the navigational icons
 */
window.onload = () => {
  const scriptElement = document.createElement('script');
  scriptElement.src = config.fontAwesomeUrl;
  document.body.appendChild(scriptElement);

  const navigationElements = getNav();

  const navigation = document.createElement('div');
  navigation.setAttribute('id', config.domIDContainer);
  navigation.appendChild(navigationElements.back);
  navigation.appendChild(navigationElements.refresh);
  navigation.appendChild(navigationElements.forward);
  document.getElementById('left-sidebar').appendChild(navigation);

  setTimeout(window.location.reload.bind(window.location), config.refreshRateSec * 1000);
};

module.exports = Franz => {
  /**
   * Loop runs once a second
   */
  const onLoop = () => {
    getUnreadCount();
  }

  /**
   * Find unread messages and display as badge icons
   */
  const getUnreadCount = () => {
    const count = document.querySelectorAll('.inbox-button-item .indicator-badge')[0].innerText
    Franz.setBadge(count);
  }

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(onLoop);
};
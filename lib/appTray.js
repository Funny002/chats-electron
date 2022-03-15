const { nativeImage, Tray, Menu } = require('electron');
const { toolTip } = require('../config/index');
const { join } = require('path');

const icon = nativeImage.createFromPath(join(__dirname, '../public/favicon.png'));

module.exports = () => {
  const appTray = new Tray(icon);

  toolTip && appTray.setToolTip(toolTip);

  appTray.on('click', function(event, bounds, position) {
    console.log('click ->>', JSON.stringify({ event, bounds, position }));
  });

  appTray.on('double-click', function(event, bounds) {
    console.log('double-click ->>', JSON.stringify({ event, bounds }));
  });

  appTray.on('right-click', function(event, bounds) {
    console.log('right-click ->>', JSON.stringify({ event, bounds }));
  });

  appTray.on('mouse-move', function(event, position) {
    console.log('mouse-move ->>', JSON.stringify({ event, position }));
  });

  return appTray;
};
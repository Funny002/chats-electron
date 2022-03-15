const { BrowserWindow } = require('electron');
const { join } = require('path');

module.exports = (url, options) => {
  options = Object.assign({
    width: 400,
    height: 300,
    show: false,
    frame: false,
    center: true,
    resizable: false,
    transparent: true,
    webPreferences: {
      webgl: false,
      devTools: true,
      nodeIntegration: true,
      preload: join(__dirname + '/preload.js'),
    },
  }, options);

  const windowUi = new BrowserWindow(options);

  windowUi.loadURL(url);

  windowUi.on('ready-to-show', function() {
    windowUi.show();
  });

  return windowUi;
};

// const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
const { app } = require('electron');
const createWindow = require('./appWindow');
const createTray = require('./appTray');
const { port } = require('../config');

let appTray;
let appWindow;

app.on('ready', function() {
  appTray = createTray();
  appWindow = createWindow(`http://127.0.0.1:${port}/login`);
  appWindow.webContents.openDevTools();
  console.log('ready');
});

app.whenReady().then(function() {
  console.log('when -> ready');
});

app.on('activate', function() {
  if (!appWindow) appWindow = createWindow(`http://127.0.0.1:${port}/login`);
});

// let appTray = createTray();
// let appWindow = createWindow();
// const WebServer = require('./server');
// const { join } = require('path');
//
// app.disableHardwareAcceleration();
// app.disableDomainBlockingFor3DAPIs();
//
// let appTray;
// let appWindow;
// const server = new WebServer();
// const hasMacOs = process.platform === 'darwin';
//
// function createWindow () {
//   appWindow = new BrowserWindow({
//     width: 400,
//     height: 300,
//     show: false,
//     frame: false,
//     center: true,
//     hasShadow: true,
//     resizable: false,
//     transparent: true,
//     // backgroundColor: '#F8F9FDFF',
//     webPreferences: {
//       webgl: false,
//       devTools: true,
//       nodeIntegration: true,
//       preload: join(__dirname + '/preload.js'),
//       //   allowRunningInsecureContent: false,
//     },
//   });
//
//   // 跳转到登录页面
//   appWindow.loadURL(`http://127.0.0.1:${port}/login`);
//
//   appWindow.once('ready-to-show', () => {
//     appWindow.webContents.openDevTools();
//     appWindow.show();
//   });
//
//   // 关闭服务
//   appWindow.on('closed', () => {
//     appWindow = undefined;
//     // console.log('closed');
//     // server.quit();
//     // app.quit();
//   });
//
//   appWindow.on('restore', () => {
//     appWindow.restore();
//     console.log('restore', JSON.stringify({
//       'isModal': appWindow.isModal(),
//       'isNormal': appWindow.isNormal(),
//       'isVisible': appWindow.isVisible(),
//       'isMinimized': appWindow.isMinimized(),
//     }));
//   });
// }
//
// const Icon = nativeImage.createFromPath(join(__dirname, '../public/favicon.png'));

// function createTray () {
//   appTray = new Tray(Icon);
//
//   title && appTray.setTitle(title);
//
//   tooltip && appTray.setToolTip(tooltip);
//
//   const template = [
//     { type: 'separator' },
//     { id: '1', label: '退出', click: () => app.quit() },
//   ];
//
//   appTray.setContextMenu(Menu.buildFromTemplate(template));
//
//   appTray.on('click', function() {
//     if (appWindow.isVisible()) {
//       appWindow.hide();
//     } else {
//       appWindow.show();
//       appTray.setImage(Icon);
//     }
//   });
// }

// app.on('ready', () => {
//   // server.start(); // 启动服务
//   createWindow(); // 创建窗口
//   appTray = createTray();
// });
// app.on('activate', () => {
//   if (!appWindow) createWindow();
// });
//
// app.on('activate', () => {
//   if (!appWindow) createWindow();
// });
//
// app.on('will-quit', () => {
//   console.log('Cmd + Q, ->> app.quit()');
// });
//
// /* 窗口发起关闭 */
// ipcMain.on('react-window-quit', () => {
//   app.quit();
// });
//
// ipcMain.on('react-window-hide', () => {
//   appWindow.minimize();
// });

try {
  require('electron-reloader')(module);
} catch {
}
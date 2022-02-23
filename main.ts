import { app, BrowserWindow, Tray, Menu, MenuItemConstructorOptions } from 'electron';
import Config from './config';

const hasMac = process.platform === 'darwin';
let appWindow: null | BrowserWindow = null;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  let reData: null | Promise<void> = null;
  if (Config.model) {
    reData = appWindow.loadFile(__dirname + '/dist/index.html');
  } else {
    reData = appWindow.loadURL(`http://localhost:${Config.port}/`);
  }
  reData.then(() => {
    console.log('then => createTray');
    createTray();
  });
  appWindow.on('closed', () => {
    appWindow = null;
  });
  appWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (!appWindow) createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

/**
 * =============================================================================
 * Tray 系统托盘
 * =============================================================================
 */
let appTray: null | Tray = null;
const trayImagePath = __dirname + '/dist/favicon.png';

function createTray() {
  appTray = new Tray(trayImagePath);
  appTray.setTitle(Config.tray.title);
  appTray.setToolTip(Config.tray.toolTip);
  appTray.setContextMenu(createTrayMenu());
  appTray.on('click', function() {
    if (appWindow.isVisible()) {
      appWindow.hide();
    } else {
      appWindow.show();
      appTray.setImage(trayImagePath);
    }
  });
}

/**
 * =============================================================================
 * TrayMenu 系统托盘菜单
 * =============================================================================
 */
let appTrayMenu: null | Menu = null;

function createTrayMenu() {
  if (appTrayMenu) return appTrayMenu;
  // 初始化
  // let template: MenuItem[] = [];
  // if (hasMac) {
  // } else {
  //   // template.push(
  //   //   {
  //   //     checked: false,
  //   //     click(p0) {
  //   //     },
  //   //     commandId: 0,
  //   //     enabled: false,
  //   //     id: '',
  //   //     label: 'test',
  //   //     menu: undefined,
  //   //     registerAccelerator: false,
  //   //     sharingItem: undefined,
  //   //     sublabel: '',
  //   //     toolTip: '',
  //   //     type: 'normal',
  //   //     // 'normal' | 'separator' | 'submenu' | 'checkbox' | 'radio'
  //   //     userAccelerator: undefined,
  //   //     visible: false,
  //   //   },
  //   // );
  // }
  // Menu.buildFromTemplate([
  //   { label: 'test', type: 'radio', click: () => console.log('test') },
  //   { label: '退出', role: 'close', accelerator: 'CmdOrCtrl+Q' },
  // ])
  // role?: ('undo' | 'redo' | 'cut' | 'copy' | 'paste' | 'pasteAndMatchStyle' | 'delete' | 'selectAll' | 'reload' | 'forceReload' | 'toggleDevTools' | 'resetZoom' | 'zoomIn' | 'zoomOut' | 'toggleSpellChecker' | 'togglefullscreen' | 'window' | 'minimize' | 'close' | 'help' | 'about' | 'services' | 'hide' | 'hideOthers' | 'unhide' | 'quit' | 'startSpeaking' | 'stopSpeaking' | 'zoom' | 'front' | 'appMenu' | 'fileMenu' | 'editMenu' | 'viewMenu' | 'shareMenu' | 'recentDocuments' | 'toggleTabBar' | 'selectNextTab' | 'selectPreviousTab' | 'mergeAllWindows' | 'clearRecentDocuments' | 'moveTabToNewWindow' | 'windowMenu');
  const template: MenuItemConstructorOptions[] = [
    { label: '退出', role: 'close', click: () => app.quit() },
  ];
  appTrayMenu = Menu.buildFromTemplate(template);
  return appTrayMenu;
}
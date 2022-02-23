"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var config_1 = require("./config");
var hasMac = process.platform === 'darwin';
var appWindow = null;
function createWindow() {
    appWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    var reData = null;
    if (config_1["default"].model) {
        reData = appWindow.loadFile(__dirname + '/dist/index.html');
    }
    else {
        reData = appWindow.loadURL("http://localhost:".concat(config_1["default"].port, "/"));
    }
    reData.then(function () {
        console.log('then => createTray');
        createTray();
    });
    appWindow.on('closed', function () {
        appWindow = null;
    });
    appWindow.webContents.openDevTools();
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (!appWindow)
        createWindow();
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
/**
 * =============================================================================
 * Tray 系统托盘
 * =============================================================================
 */
var appTray = null;
var trayImagePath = __dirname + '/dist/favicon.png';
function createTray() {
    appTray = new electron_1.Tray(trayImagePath);
    appTray.setTitle(config_1["default"].tray.title);
    appTray.setToolTip(config_1["default"].tray.toolTip);
    appTray.setContextMenu(createTrayMenu());
    appTray.on('click', function () {
        if (appWindow.isVisible()) {
            appWindow.hide();
        }
        else {
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
var appTrayMenu = null;
function createTrayMenu() {
    if (appTrayMenu)
        return appTrayMenu;
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
    var template = [
        { label: '退出', role: 'close', click: function () { return electron_1.app.quit(); } },
    ];
    appTrayMenu = electron_1.Menu.buildFromTemplate(template);
    return appTrayMenu;
}

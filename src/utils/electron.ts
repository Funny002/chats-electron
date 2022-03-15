declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRenderer
    }
  }
}

interface IpcRendererEvent extends Event {
  ports: MessagePort[];
  sender: IpcRenderer;
  senderId: number;
}


interface IpcRenderer {
  send(channel: string, ...args: any[]): void

  sendSync(channel: string, ...args: any[]): any

  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this;
}

/** web调试兼容 */
const ipcRenderer = (window.electron || {}).ipcRenderer || {};

// 监听
export const on = ipcRenderer.on;

// 发送 ~ 异步
export const send = ipcRenderer.send;

// 发送 ~ 同步
export const sendSync = ipcRenderer.sendSync;

// 退出
export const quit = () => ipcRenderer.send('react-quit');

// 设置窗口状态
interface WindowSize {
  top?: number
  left?: number
  width?: number
  height?: number
}

export const setWindowState = (state: WindowState): any => {
  if (!state) return ipcRenderer.sendSync('getWindowState');
  ipcRenderer.send('setWindowState', state);
};

// 设置窗口大小
type  WindowState = 'show' | 'hide' | 'mini' | 'max' | 'normal'

export const setWindowSize = (size?: WindowSize): void => ipcRenderer.send('setSize', JSON.stringify(size));

export default { on, send, sendSync, setWindowSize, setWindowState };

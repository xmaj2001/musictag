import { ipcRenderer, contextBridge } from 'electron'
import Itags from '../src/types/Itags';

// --------- Expose some API to the Renderer process ---------

contextBridge.exposeInMainWorld('electronAPI', {
  readtags: (filePath: string) => ipcRenderer.invoke('readtags', filePath),
  writetags: (filePath: string, tags:Itags) => ipcRenderer.invoke('updatetags', filePath, tags),
  close: () => ipcRenderer.invoke('close'),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  // You can expose other APTs you need here.
  // ...
})

declare global {
  interface Window {
    electronAPI: {
      readtags: (filePath: string) => Promise<any>;
      writetags: (filePath: string, tags:Itags) => Promise<any>;
      close: () => Promise<any>;
    };
  }
}
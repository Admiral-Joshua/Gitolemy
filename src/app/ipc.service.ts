import { Injectable } from '@angular/core';
import { IpcRenderer } from "electron";

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private _ipc: IpcRenderer | undefined;
  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC could not be found / was not loaded.');
    }
  }

  public on(event: string, listener: any): void {
    if (!this._ipc) {return;}

    this._ipc.on(event, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {return;}

    this._ipc.send(channel, ...args);
  }
}

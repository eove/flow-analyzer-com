import { Observable, Subject } from 'rxjs';
import * as SerialPort from 'serialport';

type UninstallHandler = () => void;

interface ConnectionManager {
  connect: (portName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  data$: Observable<{}>;
  connected: boolean;
}

export function createConnectionManager(): ConnectionManager {
  const dataSource = new Subject();
  let port: SerialPort;
  let uninstallPortListeners: UninstallHandler;
  let isConnected = false;

  return {
    connect,
    disconnect,
    get data$() {
      return dataSource.asObservable();
    },
    get connected() {
      return isConnected;
    }
  };

  function connect(portName: string): Promise<void> {
    if (isConnected) {
      return Promise.reject(new Error('already connected'));
    }
    port = new SerialPort(portName, { autoOpen: false, baudRate: 19200 });
    uninstallPortListeners = installPortListeners();
    return new Promise((resolve, reject) => {
      port.open(error => {
        if (error) {
          const err = new Error(
            `Error when opening port ${portName} (${error.message})`
          );
          return reject(err);
        }
        isConnected = true;
        return resolve();
      });
    });

    function installPortListeners() {
      const onDataHandler = (data: any) => {
        dataSource.next(data);
      };
      port.on('data', onDataHandler);
      return () => {
        port.removeListener('data', onDataHandler);
      };
    }
  }

  function disconnect(): Promise<void> {
    if (!isConnected) {
      return Promise.reject(new Error('already disconnected'));
    }

    return runDisconnect().then(() => {
      if (uninstallPortListeners) {
        uninstallPortListeners();
      }
    });

    function runDisconnect() {
      return new Promise((resolve, reject) => {
        port.close(error => {
          if (error) {
            const err = new Error(
              `Error when disconnecting (${error.message})`
            );
            return reject(err);
          }
          isConnected = false;
          return resolve();
        });
      });
    }
  }
}

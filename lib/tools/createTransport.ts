import * as debugLib from 'debug';
import { Observable, Subject } from 'rxjs';
import * as SerialPort from 'serialport';

type UninstallHandler = () => void;

export interface Transport {
  connect: (portName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  write: (bytes: string) => Promise<any>;
  data$: Observable<{}>;
  connected: boolean;
}

interface TransportCreationOptions {
  debugEnabled?: boolean;
}

export function createTransport(options?: TransportCreationOptions): Transport {
  const { debugEnabled = false } = options || {};
  const debug = Object.assign(debugLib('transport'), { enabled: debugEnabled });
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
    },
    write
  };

  function connect(portName: string): Promise<void> {
    if (isConnected) {
      return Promise.reject(new Error('already connected'));
    }
    port = new SerialPort(portName, { autoOpen: false, baudRate: 19200 });
    uninstallPortListeners = installPortListeners();
    debug(`connecting to: ${portName}`);

    return new Promise((resolve, reject) => {
      port.open(error => {
        if (error) {
          const err = new Error(
            `Error when opening port ${portName} (${error.message})`
          );
          return reject(err);
        }
        isConnected = true;
        debug('connected.');
        return resolve();
      });
    });

    function installPortListeners() {
      const onDataHandler = (data: any) => {
        const received = data.toString();
        debug('received:', received.replace('\r', 'CR'));
        dataSource.next(received);
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
          debug('disconnected.');
          isConnected = false;
          return resolve();
        });
      });
    }
  }

  function write(bytes: string): Promise<any> {
    debug(`sending: ${bytes}`);
    return new Promise((resolve, reject) => {
      port.write(Buffer.from(bytes), writeError => {
        if (writeError) {
          const err = new Error(
            `Error when writing data (${writeError.message})`
          );
          reject(err);
        } else {
          debug(`wrote: ${bytes}`);
          port.drain(flushError => {
            if (flushError) {
              const err = new Error(
                `Error when flushing data (${flushError.message})`
              );
              reject(err);
            } else {
              debug(`flushed: ${bytes}`);
              resolve();
            }
          });
        }
      });
    });
  }
}

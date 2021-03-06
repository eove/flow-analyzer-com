import * as debugLib from 'debug';
import { Observable, Subject } from 'rxjs';
import * as SerialPort from 'serialport';

type UninstallHandler = () => void;

export interface Transport {
  connect: (portName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  write: (bytes: string) => Promise<any>;
  discover: () => Promise<Device[]>;
  data$: Observable<unknown>;
  event$: Observable<unknown>;
  connected: boolean;
}

interface TransportCreationOptions {
  debugEnabled?: boolean;
}

export interface Device {
  name: string;
}

export function createTransport(options?: TransportCreationOptions): Transport {
  const { debugEnabled = false } = options || {};
  const debug = Object.assign(debugLib('transport'), { enabled: debugEnabled });
  const dataSource = new Subject();
  const eventSource = new Subject();
  let port: SerialPort;
  let uninstallPortListeners: UninstallHandler;
  let isConnected = false;

  return {
    connect,
    disconnect,
    get data$() {
      return dataSource.asObservable();
    },
    get event$() {
      return eventSource.asObservable();
    },
    get connected() {
      return isConnected;
    },
    write,
    discover
  };

  function connect(portName: string): Promise<void> {
    if (isConnected) {
      return Promise.reject(new Error('already connected'));
    }
    const baudRate = 19200;
    port = new SerialPort(portName, { autoOpen: false, baudRate });
    uninstallPortListeners = installPortListeners();
    debug(`connecting to: ${portName}, baud rate: ${baudRate}`);

    return new Promise((resolve, reject) => {
      port.open(error => {
        if (error) {
          const err = new Error(
            `Error when opening port ${portName} (${error.message})`
          );
          return reject(err);
        }
        return resolve();
      });
    });

    function installPortListeners() {
      const onOpenHandler = () => {
        isConnected = true;
        debug('connected.');
        _sendEvent({ type: 'TRANSPORT_CONNECTED', payload: undefined });
      };

      const onDataHandler = (data: any) => {
        const received = data.toString();
        debug('received:', received.replace('\r', '\\r'));
        _sendData(received);
      };

      const onCloseHandler = () => {
        isConnected = false;
        debug('disconnected.');
        _sendEvent({ type: 'TRANSPORT_DISCONNECTED', payload: undefined });
      };

      port.on('open', onOpenHandler);
      port.on('data', onDataHandler);
      port.on('close', onCloseHandler);
      return () => {
        port.removeListener('open', onOpenHandler);
        port.removeListener('data', onDataHandler);
        port.removeListener('close', onCloseHandler);
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
          return resolve();
        });
      });
    }
  }

  function write(bytes: string): Promise<any> {
    const escapedBytes = bytes.replace('\r', '\\r');
    debug(`sending: ${escapedBytes}`);
    return new Promise((resolve, reject) => {
      port.write(Buffer.from(bytes), writeError => {
        if (writeError) {
          const err = new Error(
            `Error when writing data (${writeError.message})`
          );
          reject(err);
        } else {
          port.drain(flushError => {
            if (flushError) {
              const err = new Error(
                `Error when flushing data (${flushError.message})`
              );
              reject(err);
            } else {
              debug(`wrote: ${escapedBytes}`);
              resolve();
            }
          });
        }
      });
    });
  }

  async function discover(): Promise<Device[]> {
    try {
      const devices = await SerialPort.list();
      return devices.map((serialPort: any) => ({ name: serialPort.comName }));
    } catch (error) {
      throw new Error(`Error when discovering ports (${error.message})`);
    }
  }

  function _sendEvent(event: { type: string; payload: any }) {
    eventSource.next(event);
  }

  function _sendData(data: any) {
    dataSource.next(data);
  }
}

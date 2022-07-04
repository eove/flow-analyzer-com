import * as debugLib from 'debug';
import * as _ from 'lodash';
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
  const { debugEnabled } = _.defaults({}, options, { debugEnabled: false });
  const debug = debugLib('serial-transport');
  debug.enabled = debugEnabled;
  const dataSource = new Subject();
  const eventSource = new Subject();
  let port: SerialPort;
  let uninstallPortListeners: UninstallHandler | undefined;
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
    discover,
  };

  function connect(portName: string): Promise<void> {
    const baudRate = 19200;
    port = new SerialPort(portName, { autoOpen: false, baudRate });
    uninstallPortListeners = installPortListeners();
    debug(`connecting to: ${portName}, baud rate: ${baudRate}`);

    return new Promise((resolve, reject) => {
      port.open((error) => {
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
        port.removeAllListeners();
      };
    }
  }

  function disconnect(): Promise<void> {
    return runDisconnect().then(() => {
      if (uninstallPortListeners) {
        uninstallPortListeners();
        uninstallPortListeners = undefined;
      }
    });

    function runDisconnect(): Promise<void> {
      return new Promise((resolve, reject) => {
        port.close((error) => {
          if (error) {
            return reject(
              new Error(`Error when disconnecting (${error.message})`)
            );
          }
          return resolve();
        });
      });
    }
  }

  function write(bytes: string): Promise<void> {
    const escapedBytes = bytes.replace('\r', '\\r');
    debug(`sending: ${escapedBytes}`);
    return new Promise((resolve, reject) => {
      port.write(Buffer.from(bytes), (writeError) => {
        if (writeError) {
          return reject(
            new Error(`Error when writing data (${writeError.message})`)
          );
        } else {
          port.drain((flushError) => {
            if (flushError) {
              return reject(
                new Error(`Error when flushing data (${flushError.message})`)
              );
            } else {
              debug(`wrote: ${escapedBytes}`);
              return resolve();
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

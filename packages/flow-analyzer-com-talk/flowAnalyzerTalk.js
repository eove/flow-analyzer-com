#!/usr/bin/env node
const program = require('commander');
const { createCommunicator } = require('@eove/flow-analyzer-com-communicator');
const debug = require('debug')('flow-analyzer-talk');

const { version } = require('./package.json');

const {
  createShellClient,
  createShellServer,
  DEFAULT_CONFIG,
} = require('./lib');

program
  .command('com')
  .description('talk to flow analyzer')
  .option(
    '-p, --port-name [PORT_NAME]',
    'PORT_NAME is the USB port where the analyzer is connected',
    DEFAULT_CONFIG.USB_PORT
  )
  .option(
    '-l, --listen-shell-on [HOST:PORT]',
    'HOST:PORT is the inet to listen for ZMQ shell requests',
    `${DEFAULT_CONFIG.ZMQ_HOST}:${DEFAULT_CONFIG.ZMQ_PORT}`
  )
  .option(
    '-z, --zmq-sink [HOST:PORT]',
    'HOST:PORT is the zeromq address used by ZMQ dispatcher'
  )
  .option('-x, --exit-on-error', 'exit when error occurs', false)
  .option('-d, --debug-enabled', 'output debug messages to the console', false)
  .option(
    '-t, --transport-debug-enabled',
    'output low level debug messages to the console',
    false
  )
  .option(
    '-a, --analyzer [ANALYZER]',
    'ANALYZER is the analyzer type, one of [h4, pf300]',
    DEFAULT_CONFIG.DEVICE_TYPE
  )
  .action((options) => {
    const { portName } = options;
    const logAndExit = makeLogAndMayExit(options.exitOnError);
    try {
      debug.enabled = options.debugEnabled;
      options.deviceType = options.analyzer;
      debug(`creating communicator for device type: ${options.analyzer}`);
      const communicator = createCommunicator(options);
      communicator.event$.subscribe((event) => debug('event:', event));
      communicator.answer$.subscribe((answer) => debug('answer:', answer));
      const server = createShellServer(
        {
          communicator,
          debug: (...args) => debug(...args),
        },
        options
      );

      communicator
        .open(portName)
        .then(() => {
          server.start();
        })
        .catch((e) => logAndExit({ error: e }));
    } catch (e) {
      logAndExit({ error: e });
    }
  });

program
  .command('list-ports')
  .description('list avaiable ports')
  .action(() => {
    const communicator = createCommunicator();
    communicator.listPorts().then((ports) => {
      ports.map((p) => console.log(p.name));
    });
  });

program
  .command('shell')
  .description('run interactive shell to talk to com process')
  .option(
    '-s, --send-shell-on [HOST:PORT]',
    'HOST:PORT is the inet to send ZMQ requests to',
    `${DEFAULT_CONFIG.ZMQ_HOST}:${DEFAULT_CONFIG.ZMQ_PORT}`
  )
  .option(
    '-t, --timeout [TIMEOUT]',
    'TIMEOUT is the number of seconds to wait for the com answer',
    DEFAULT_CONFIG.ZMQ_TIMEOUT
  )
  .action((options) => {
    try {
      const client = createShellClient(
        {
          debug: (...args) => debug(...args),
        },
        options
      );
      client.start();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.version(version).parse(process.argv);

process.on('unhandledRejection', (reason, promise) => {
  const logAndExit = makeLogAndMayExit(true);
  logAndExit({ reason, promise, msg: 'Oops! unhandled rejection!' });
});

function makeLogAndMayExit(exitOnError) {
  return ({ reason, promise, error, msg = undefined }, rc = 1) => {
    if (msg) {
      console.error(msg);
    }
    if (error) {
      console.error(error);
    }
    if (reason) {
      console.error(reason);
    }
    if (promise) {
      console.error(promise);
    }
    if (exitOnError) {
      process.exit(rc);
    }
  };
}

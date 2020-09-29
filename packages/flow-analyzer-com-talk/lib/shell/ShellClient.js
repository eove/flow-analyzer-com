const _ = require('lodash');
const zerorpc = require('zerorpc');

const { PORT, HOST, TIMEOUT } = require('./config');
const ShellCommands = require('./ShellCommands');

class ShellClient {
  constructor(dependencies, options) {
    const { debug } = dependencies;
    this._opts = _.defaults({}, options, {
      host: HOST,
      port: PORT,
      timeout: TIMEOUT
    });
    this._debug = debug;
    this._client = new zerorpc.Client({ timeout: this._opts.timeout });
  }

  start() {
    const inet = `${this._opts.host}:${this._opts.port}`;
    this._debug(`shell client: will send requests on ${inet}`);
    this._client.connect(`tcp://${inet}`);
    new ShellCommands(this).start();
  }

  invoke(command, args) {
    return new Promise((resolve, reject) => {
      try {
        this._client.invoke('run', command, args, (error, res) => {
          if (error) {
            return reject(error);
          }
          return resolve(res);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = ShellClient;

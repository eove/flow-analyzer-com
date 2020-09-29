const _ = require('lodash');
const zerorpc = require('zerorpc');

const { PORT, HOST } = require('./config');

class ShellServer {
  constructor(dependencies, options) {
    const self = this;
    const { communicator, debug } = dependencies;
    this._opts = _.defaults({}, options, { host: HOST, port: PORT });
    this._debug = debug;
    this._communicator = communicator;
    this._server = new zerorpc.Server({
      run: function(command, args, reply) {
        self._communicator
          .request(command, args)
          .then(result => reply(null, result))
          .catch(e => reply(e));
      }
    });
  }

  start() {
    const inet = `${this._opts.host}:${this._opts.port}`;
    this._debug(`shell server: listening requests on ${inet}`);
    this._server.bind(`tcp://${inet}`);
    this._server.on('error', error => {
      this._debug('shell server error:', error);
    });
  }
}

module.exports = ShellServer;

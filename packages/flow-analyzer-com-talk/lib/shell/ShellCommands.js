const vorpal = require('vorpal')();
const { runCmdHandler, examplesCmdHandler } = require('./commands');

class ShellCommands {
  constructor(shellClient) {
    this._shellClient = shellClient;

    vorpal
      .command(
        'run [command] [args]',
        'Run the given [command], with optional JSON formatted [args] (see. examples)'
      )
      .action((run, cb) => runCmdHandler().handle(run, cb, this._shellClient));

    vorpal
      .command('examples', 'Show command examples')
      .action((run, cb) =>
        examplesCmdHandler().handle(run, cb, this._shellClient)
      );
  }

  start() {
    vorpal
      .delimiter('talk >')
      .history('talk-to-analyzer')
      .show();
  }
}

module.exports = ShellCommands;

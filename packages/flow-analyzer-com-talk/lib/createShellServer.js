const { ShellServer } = require('./shell');

module.exports = (dependencies, options) => {
  return new ShellServer(dependencies, getHostAndPort(options.listenShellOn));

  function getHostAndPort(inet) {
    if (inet) {
      return {
        host: inet.split(':')[0],
        port: inet.split(':')[1]
      };
    }
    return {};
  }
};

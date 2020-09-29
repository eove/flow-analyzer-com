const { ShellClient } = require('./shell');

module.exports = (dependencies, options) => {
  return new ShellClient(
    dependencies,
    Object.assign({}, options, getHostAndPort(options.sendShellOn))
  );

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

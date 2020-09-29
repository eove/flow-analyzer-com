const _ = require('lodash');
const prettyjson = require('prettyjson');

function create() {
  return {
    handle: (run, callback, client) => {
      const { command, args } = run;
      let cmdArgs = {};
      try {
        if (args !== undefined) {
          cmdArgs = JSON.parse(args);
        }
      } catch (e) {
        callback(e.toString());
      }

      client
        .invoke(command, cmdArgs)
        .then(result => {
          if (!isResultEmpty(result)) {
            console.log(prettyjson.render(result));
          }
          callback();
        })
        .catch(e => callback(e.toString()));
    }
  };

  function isResultEmpty(result) {
    if (Array.isArray(result)) {
      for (let res of result) {
        if (!_.isEmpty(res)) {
          return false;
        }
      }
      return true;
    }
    return _.isEmpty(result);
  }
}

module.exports = create;

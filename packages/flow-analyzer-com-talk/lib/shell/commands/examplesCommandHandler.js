/* eslint-disable max-len */

const HELP_MSG =
  '\
  measurements:\n\
    run READ_MEASUREMENT \'{"name": "humidity"}\'\n\
    run READ_MEASUREMENTS \'{"names": ["humidity", "peep"]}\'\n\
    run READ_MIN_MAX_MEASUREMENT \'{"name": "humidity", "samplesNb": 100, "durationMS": 2000}\'\n\
  settings:\n\
    run READ_SETTING \'{"name": "gazType"}\'\n\
    run WRITE_SETTING \'{"name": "gazType", "value": "Air"}\'\n\
  system:\n\
    run READ_SYSTEM_INFOS\n\
  execute:\n\
    run EXEC_SET_RS232_ECHO \'{"echoOn": true}\'\n\
  \n';

function create() {
  return {
    handle: (run, callback) => {
      console.log(HELP_MSG);
      callback();
    },
  };
}

module.exports = create;

module.exports = {
  createShellClient: require('./createShellClient'),
  createShellServer: require('./createShellServer'),
  DEFAULT_CONFIG: {
    ZMQ_PORT: require('./shell/config').PORT,
    ZMQ_HOST: require('./shell/config').HOST,
    ZMQ_TIMEOUT: require('./shell/config').TIMEOUT,
    USB_PORT: '/dev/tty.usbserial-14101',
    DEVICE_TYPE: 'pf300',
  },
};

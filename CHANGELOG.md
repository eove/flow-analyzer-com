# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 3.0.3 - 2024-10-02

## Changed

- serialport dependency updated to 11.0.1

# 3.0.2 - 2023-11-18

## Fixed

- [pf300] - pf300 devices does not respond to device type request ([#12](https://github.com/eove/flow-analyzer-com/issues/12))

# 3.0.1 - 2023-08-28

## Fixed

- [pf300-pro] - breath rate value stick to 0 on rs232 IMT protocol for pf300-pro devices ([#11](https://github.com/eove/flow-analyzer-com/issues/11))

# 3.0.0 - 2023-07-13

## Added

- [devices] - support h4, h5, pf300 and pf300 pro devices ([#6](https://github.com/eove/flow-analyzer-com/issues/6))

# 2.6.0 - 2023-05-17

## Changed

- [devices] - support citrex H5 devices ([#6](https://github.com/eove/flow-analyzer-com/issues/6))

# 2.5.0 - 2023-05-03

## Changed

- [system-info] - improve command to collect more information ([#7](https://github.com/eove/flow-analyzer-com/issues/7))

# 2.4.0 - 2021-11-03

### @eove/flow-analyzer-com-communicator

#### Changed

- serialport dependency updated to 9.2.5

# 2.3.3 - 2021-08-20

### @eove/flow-analyzer-com-communicator

#### Changed

- better (and localized) error messages

# 2.3.2 - 2021-08-19

### @eove/flow-analyzer-com-communicator

#### Fixed

- fix unhandled rejection and throw error if transport not connected

# 2.3.1 - 2021-08-18

Same as 2.3.0 (lerna issue...)

# 2.3.0 - 2021-08-18

### @eove/flow-analyzer-com-communicator

#### Changed

- update serialport dependency to 9.2.0

#### Added

- add max sequential write errors and auto-close when reaching max

## 2.2.0 - 2021-08-16

### @eove/flow-analyzer-com-communicator

#### Added

- add a `COMMUNICATION_START_FAILED` event when communication cannot be established

## 2.1.0 - 2021-08-16

### @eove/flow-analyzer-com-communicator

#### Changed

- ask serial number before considering connection is ok

#### Added

- add a `READ_SERIAL_NUMBER` command


# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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


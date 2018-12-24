# flow-analyzer-com [![Build Status](https://travis-ci.org/eove/pf300-com.svg?branch=master)](https://travis-ci.org/eove/pf300-com)

Node.js lib to communicate with [imtmedical](https://www.imtmedical.com/) gaz flow analyzers such as pf300 & citrex devices through serial port

## Install

`npm install`

## Usage

This lib exposes a communicator which may send commands to the gaz flow analyzer device and get answers.

```js
import { createCommunicator } from  '@eove/flow-analyzer-com';

const communicator = createCommunicator({ port: '/dev/ttyUSB0' });
communicator.sendCommand({ type: 'READ_MEASUREMENTS', payload: { measurements: ['flow'] })
   .then(console.log);
```

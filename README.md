# pf300-com [![Build Status](https://travis-ci.org/eove/pf300-com.svg?branch=master)](https://travis-ci.org/eove/pf300-com)

Node.js lib to communicate with pf300 devices through serial port

## Install

`npm install`

## Usage

```js
import { createCommunicator } from  '@eove/pf300-com';

const communicator = createCommunicator({ port: '/dev/ttyUSB0' });
communicator.sendCommand({ type: 'READ_MEASUREMENTS', payload: { measurements: ['flow'] })
   .then(console.log);
```

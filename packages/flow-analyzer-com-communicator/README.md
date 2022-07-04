# `flow-analyzer-com-communicator`

This lib exposes a `Communicator` to communicate with [imtmedical](https://www.imtmedical.com/) gaz flow analyzers such as pf300 & citrex devices through serial port.

## Supported devices

- PF300
- Citrex H4

## Install

`npm install`

## Usage

```js
import { createCommunicator } from '@eove/flow-analyzer-com';

const communicator = createCommunicator();

communicator
  .open('/dev/ttyUSB0')
  .then(() =>
    communicator
      .sendCommand({
        type: 'READ_MEASUREMENT',
        payload: { name: 'o2' }
      })
  )
  .then(console.log)
  .catch(console.error);
});
```

### API

Check the [API details](docs/api.md)

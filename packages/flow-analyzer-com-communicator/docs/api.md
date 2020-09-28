# Communicator API

## open

`open(portName: string): Promise<void>`

## close

`close(): Promise<void>`

## listPorts

`listPorts(): Promise<Device[]>`

## sendCommand

`sendCommand({type: string, payload?: any}): Promise<{}>`

Sends a command to the device and returns a Promise resolving the answer.

Example:

```javascript
const { createCommunicator } = require('@eove/flow-analyzer-com');

const communicator = createCommunicator();

communicator
  .connect('/dev/ttyUSB1')
  .then(() =>
    communicator.sendCommand({
      type: 'READ_MEASUREMENT',
      payload: { name: 'humidity' }
    })
  )
  .then(result => console.log(result));
```

Available commands:

```javascript
{
  type: 'READ_MEASUREMENT',
  payload: {
    name: 'humidity'
  }
},
```

```javascript
{
  type: 'READ_MEASUREMENTS',
  payload: {
    names: ['humidity', 'peep']
  }
},
```

```javascript
{
  type: 'READ_MIN_MAX_MEASUREMENT',
  payload: {
    name: 'humidity',
    samplesNb: 100,
    durationMS: 2000
  }
}
```

```javascript
{
  type: 'READ_SETTING',
  payload: {
    name: 'gazType'
  }
}
```

```javascript
{
  type: 'READ_ALL_SETTINGS',
}
```

```javascript
{ 
  type: 'WRITE_SETTING',
  payload: {
    name: 'gazType',
    value: 'Air'
  }
}
```

```javascript
{
  type: 'READ_SYSTEM_INFOS';
}
```

```javascript
{
  type: 'EXEC_SET_RS232_ECHO',
  payload: {
    echoOn: true
  }
}
```

## command\$

`command$: Observable<ProtocolCommand>`

Exposes an [Observable](http://reactivex.io/documentation/observable.html) pushing sent commands.

Example:

```javascript
const { createCommunicator } = require('@eove/flow-analyzer-com');

const communicator = createCommunicator();

communicator.command$.subscribe(command => console.log(command));

communicator
  .connect('/dev/ttyUSB1')
  .then(() =>
    communicator.sendCommand({
      type: 'READ_MEASUREMENT',
      payload: { name: 'humidity' }
    })
  );
```

## answer\$

`answer$: Observable<ProtocolAnswer>`

Exposes an [Observable](http://reactivex.io/documentation/observable.html) pushing received answers.

Example:

```javascript
const { createCommunicator } = require('@eove/flow-analyzer-com');

const communicator = createCommunicator();

communicator.answer$.subscribe(answer => console.log(answer));

communicator
  .connect('/dev/ttyUSB1')
  .then(() =>
    communicator.sendCommand({
      type: 'READ_MEASUREMENT',
      payload: { name: 'humidity' }
    })
  );
```

## data\$

`data$: Observable<Byte[]>`

Exposes an [Observable](http://reactivex.io/documentation/observable.html) pushing received raw data.

Example:

```javascript
const { createCommunicator } = require('@eove/flow-analyzer-com');

const communicator = createCommunicator();

communicator.data$.subscribe(data => console.log(data));

communicator
  .connect('/dev/ttyUSB1')
  .then(() =>
    communicator.sendCommand({
      type: 'READ_MEASUREMENT',
      payload: { name: 'humidity' }
    })
  );
```

## event\$

`event$: Observable<Byte[]>`

Exposes an [Observable](http://reactivex.io/documentation/observable.html) pushing received events from transport layer and communicator layor (such as connection events).

Example:

```javascript
const { createCommunicator } = require('@eove/flow-analyzer-com');

const communicator = createCommunicator();

communicator.event$.subscribe(data => console.log(data));

communicator
  .connect('/dev/ttyUSB1')
  .then(() =>
    communicator.sendCommand({
      type: 'READ_MEASUREMENT',
      payload: { name: 'humidity' }
    })
  );
```

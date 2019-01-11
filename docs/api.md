# Communicator API

## connect

`connect(portName: string): Promise<{}>`

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
    sendCommand({ type: 'READ_MEASUREMENT', payload: { name: 'humidity' } })
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
    sendCommand({ type: 'READ_MEASUREMENT', payload: { name: 'humidity' } })
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
    sendCommand({ type: 'READ_MEASUREMENT', payload: { name: 'humidity' } })
  );
```

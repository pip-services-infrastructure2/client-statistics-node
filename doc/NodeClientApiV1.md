# Client API (version 1) <br/> Statistics Microservices Client SDK for Node.js / ES2017

Node.js client API for Statistics microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [StatCounterTypeV1 enum](#enum1)
* [StatCounterV1 class](#class1)
* [StatCounterValueV1 class](#class2)
* [StatCounterValueSetV1 class](#class2)
* [IStatisticsClientV1 interface](#interface)
    - [getGroups()](#operation1)
    - [getCounters()](#operation2)
    - [incrementCounter()](#operation3)
    - [readOneCounter()](#operation4)
    - [readCounters()](#operation5)
* [StatisticsHttpClientV1 class](#client_http)
* [StatisticsSenecaClientV1 class](#client_seneca)
* [StatisticsDirectClientV1 class](#client_direct)
* [StatisticsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "client-statistics-node": "^1.0.0",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('client-statistics-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.StatisticsHttpClientV1(config);

// Open client connection to the microservice
await client.open(null);

console.log('Opened connection');
        
// Increment test counter
await client.incrementCounter(null, 'test_group', 'test_counter', 1);

// Read total counter
let  set = await client.readOneCounter(
    'test_group', 'test_counter',
    0, null, null
);

console.log('Total counter value is');
console.log(set.values[0].value);
        
// Close connection
await client.close(); 
```

### <a name="enum1"></a> StatCounterTypeV1 enum

Defines types for counter for different type intervals

**Properties:**
- Total: 0 - counter for all times
- Year: 1 - counter for specific year
- Month: 2 - counter for specific month
- Day: 3 - counter for specific day
- Hour: 4 - counter for specific hour

### <a name="class1"></a> StatCounterV1 class

Contains counter composite id: group + name

**Properties:**
- group: string - counters group name (typically - server or user id)
- name: string - counter name (can repeat in groups)

### <a name="class2"></a> StatCounterValueV1 class

Contains counter value for specific period

**Properties:**
- year: number - (optional) - year of the counter interval
- month: number - (optional) - month of the counter interval
- day: number - (optional) - day of the counter interval
- hour: number - (optional) - hour of the counter interval

### <a name="class2"></a> StatCounterValueSetV1 class

Set of counter values for range of time intervals

**Properties:**
- group: string - counters group name (typically - server or user id)
- name: string - counter name (can repeat in groups)
- type: StatCounterTypeV1 - time of aggregated time interval

## <a name="interface"></a> IStatisticsClientV1 interface

If you are using Typescript, you can use IStatisticsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IStatisticsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IStatisticsClientV1 {
    getGroups(correlationId, paging);
    getCounters(correlationId, filter, paging);
    incrementCounter(correlationId, group, name, value);
    readOneCounter(correlationId, group, name, type, fromTime, toTime, value);
    readCounters(correlationId, counter, type, fromTime, toTime);
}
```

### <a name="operation1"></a> getGroups(correlationId, paging)

Retrieves groups for all counters

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- returns: DataPage<string> - retrieved group names in paged format

### <a name="operation2"></a> getCounters(correlationId, filter, paging)

Retrieves system events by specified criteria

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - type: string - (optional) type events
  - source: string - (optional) server where events occured
  - severity: number - (optional) severity of events
  - from_time: Date - (optional) start of the time range
  - to_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)
- returns: DataPage<StatCounterV1> - retrieved StatCounterV1 objects in paged format

### <a name="operation3"></a> incrementCounter(correlationId, group, name, value)

Increments specific counter by group and name

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - counters group name (typically - server or user id)
- name: string - counter name (can repeat in groups)
- time: Date - point of time when aggregation shall happen
- value: number - incremental value for the specified interval

**Returns:**
- err: Error - occured error or null for success

### <a name="operation4"></a> readOneCounter(correlationId, group, name, type, fromTime, toTime, value)

Reads counter by group and name within specific time interval

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- group: string - counters group name (typically - server or user id)
- name: string - counter name (can repeat in groups)
- type: StatCounterTypeV1 - time of aggregated time interval
- from_time: Date - start of the time range
- to_time: Date - end of the time range

**Returns:**
- err: Error - occured error or null for success
- result: StatCounterValueSetV1 - set of retrieved counter values

### <a name="operation5"></a> readCounters(correlationId, counter, type, fromTime, toTime)

Reads multiple counters within specific time interval

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- counters: StatCounterV1[] - list of counters to be read
- type: StatCounterTypeV1 - time of aggregated time interval
- from_time: Date - start of the time range
- to_time: Date - end of the time range

**Returns:**
- err: Error - occured error or null for success
- result: StatCounterValueSetV1[] - array of retrieved counter value sets

 
## <a name="client_http"></a> StatisticsHttpClientV1 class

StatisticsHttpClientV1 is a client that implements HTTP protocol

```javascript
class StatisticsHttpClientV1 extends CommandableHttpClient implements IStatisticsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId);
    close(correlationId);
    getGroups(correlationId, paging);
    getCounters(correlationId, filter, paging);
    incrementCounter(correlationId, group, name, value);
    readOneCounter(correlationId, group, name, type, fromTime, toTime, value);
    readCounters(correlationId, counter, type, fromTime, toTime);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> StatisticsSenecaClientV1 class

StatisticsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class StatisticsSenecaClientV1 extends CommandableSenecaClient implements IStatisticsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId);
    close(correlationId);
    getGroups(correlationId, paging);
    getCounters(correlationId, filter, paging);
    incrementCounter(correlationId, group, name, value);
    readOneCounter(correlationId, group, name, type, fromTime, toTime, value);
    readCounters(correlationId, counter, type, fromTime, toTime);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> StatisticsDirectClientV1 class

StatisticsDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class StatisticsDirectClientV1 extends DirectClient implements IStatisticsClientV1 {
    constructor();        
    setReferences(references);
    open(correlationId);
    close(correlationId);
    getGroups(correlationId, paging);
    getCounters(correlationId, filter, paging);
    incrementCounter(correlationId, group, name, value);
    readOneCounter(correlationId, group, name, type, fromTime, toTime, value);
    readCounters(correlationId, counter, type, fromTime, toTime);
}
```

## <a name="client_null"></a> StatisticsNullClientV1 class

StatisticsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class StatisticsNullClientV1 implements IStatisticsClientV1 {
    constructor();
    getGroups(correlationId, paging);
    getCounters(correlationId, filter, paging);
    incrementCounter(correlationId, group, name, value);
    readOneCounter(correlationId, group, name, type, fromTime, toTime, value);
    readCounters(correlationId, counter, type, fromTime, toTime);
}
```

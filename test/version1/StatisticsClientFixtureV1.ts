const assert = require('chai').assert;

import { PagingParams } from 'pip-services3-commons-nodex';

import { StatCounterV1 } from '../../src/version1/StatCounterV1';
import { StatCounterIncrementV1 } from '../../src/version1/StatCounterIncrementV1';
import { StatCounterTypeV1 } from '../../src/version1/StatCounterTypeV1';
import { IStatisticsClientV1 } from '../../src/version1/IStatisticsClientV1';

export class StatisticsClientFixtureV1 {
    private _client: IStatisticsClientV1;
    
    constructor(client: IStatisticsClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        // Increment counter
        await this._client.incrementCounter(null, 'test', 'value1', null, 'UTC', 1);

        // Increment the same counter again
        await this._client.incrementCounters(
            null,
            [
                <StatCounterIncrementV1>{
                    group: 'test',
                    name: 'value1',
                    value: 2
                }
            ]
        );

        // Check all counters
        let page = await this._client.getCounters(
            null,
            null,
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Check total counters
        let set = await this._client.readOneCounter(
            null, 'test', 'value1', StatCounterTypeV1.Total, null, null, null);
        
        assert.isObject(set);
        assert.lengthOf(set.values, 1);

        let record = set.values[0];
        assert.equal(3, record.value);

        // Check counters by group
        let sets = await this._client.readCountersByGroup(
            null, 'test', StatCounterTypeV1.Total, null, null, null);

        assert.isArray(sets);
        assert.lengthOf(sets, 1);

        set = sets[0];
        assert.lengthOf(set.values, 1);

        record = set.values[0];
        assert.equal(3, record.value);

        // Check monthly counters
        sets = await this._client.readCounters(
            null,
            [new StatCounterV1('test', 'value1')],
            StatCounterTypeV1.Hour,
            new Date(),
            new Date(),
            'UTC'
        );

        assert.lengthOf(sets, 1);

        set = sets[0];
        assert.isObject(set);
        assert.lengthOf(set.values, 1);

        record = set.values[0];
        assert.equal(3, record.value);
    }
}

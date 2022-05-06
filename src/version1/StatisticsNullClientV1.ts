import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';
import { IStatisticsClientV1 } from './IStatisticsClientV1';

export class StatisticsNullClientV1 implements IStatisticsClientV1 {
    constructor(config?: any) {}

    public incrementCounter(correlationId: string, group: string, name: string, time: Date, timezone: string, value: number): Promise<DataPage<string>> {
        return;
    }

    public incrementCounters(correlationId: string, increments: StatCounterIncrementV1[]): Promise<void> {
        return;
    }
        
    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        return new DataPage<string>([], 0);
    }

    public async getCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<StatCounterV1>> {
        return new DataPage<StatCounterV1>([], 0);
    }

    public async readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1> {
        return new StatCounterValueSetV1(group, name, type, []);
    }

    public async readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        return [];
    }

    public async readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        let result = counters.map(c => new StatCounterValueSetV1(c.group, c.name, type, []));
        return result;
    }

}

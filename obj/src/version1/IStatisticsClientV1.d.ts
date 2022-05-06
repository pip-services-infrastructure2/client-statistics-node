import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';
export interface IStatisticsClientV1 {
    getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>>;
    getCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<StatCounterV1>>;
    incrementCounter(correlationId: string, group: string, name: string, time: Date, timezone: string, value: number): Promise<DataPage<string>>;
    incrementCounters(correlationId: string, increments: StatCounterIncrementV1[]): Promise<void>;
    readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1, fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1>;
    readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1, fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]>;
    readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1, fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]>;
}

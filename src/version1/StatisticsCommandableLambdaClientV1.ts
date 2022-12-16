import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';

import { IStatisticsClientV1 } from './IStatisticsClientV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';

export class StatisticsCommandableLambdaClientV1 extends CommandableLambdaClient implements IStatisticsClientV1 {

    constructor(config?: any) {
        super('statistics');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        return await this.callCommand(
            'get_groups',
            correlationId,
            {
                paging: paging
            }
        );
    }

    public async getCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<StatCounterV1>> {
        return await this.callCommand(
            'get_counters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }
        
    public async incrementCounter(correlationId: string, group: string, name: string,
        time: Date, timezone: string, value: number): Promise<DataPage<string>> {
        return await this.callCommand(
            'increment_counter',
            correlationId,
            {
                group: group,
                name: name,
                time: time,
                timezone: timezone,
                value: value
            }
        );
    }

    public async incrementCounters(correlationId: string, increments: StatCounterIncrementV1[]): Promise<void> {
        return await this.callCommand(
            'increment_counters',
            correlationId,
            {
                increments: increments
            }
        );
    }

    public async readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1> {
        return await this.callCommand(
            'read_one_counter',
            correlationId,
            {
                group: group,
                name: name,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            }
        );
    }

    public async readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        return await this.callCommand(
            'read_counters_by_group',
            correlationId,
            {
                group: group,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            }
        );
    }

    public async readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        return await this.callCommand(
            'read_counters',
            correlationId,
            {
                counters: counters,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            }
        );
    }

}

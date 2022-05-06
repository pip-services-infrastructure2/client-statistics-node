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

export class StatisticsLambdaClientV1 extends CommandableLambdaClient implements IStatisticsClientV1 {

    constructor(config?: any) {
        super('statistics');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        let timing = this.instrument(correlationId, 'statistics.get_groups');

        try {
            return await this.callCommand(
                'get_groups',
                correlationId,
                {
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getCounters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<StatCounterV1>> {
        let timing = this.instrument(correlationId, 'statistics.get_counters');

        try {
            return await this.callCommand(
                'get_counters',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
        
    public async incrementCounter(correlationId: string, group: string, name: string,
        time: Date, timezone: string, value: number): Promise<DataPage<string>> {
        let timing = this.instrument(correlationId, 'statistics.increment_counter');

        try {
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
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async incrementCounters(correlationId: string, increments: StatCounterIncrementV1[]): Promise<void> {
        let timing = this.instrument(correlationId, 'statistics.increment_counters');

        try {
            return await this.callCommand(
                'increment_counters',
                correlationId,
                {
                    increments: increments
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1> {
        let timing = this.instrument(correlationId, 'statistics.read_one_counter');

        try {
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
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        let timing = this.instrument(correlationId, 'statistics.read_counters_by_group');

        try {
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
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, timezone: string): Promise<StatCounterValueSetV1[]> {
        let timing = this.instrument(correlationId, 'statistics.read_counters');

        try {
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
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}

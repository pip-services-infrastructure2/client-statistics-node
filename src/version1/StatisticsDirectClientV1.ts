import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { IStatisticsClientV1 } from './IStatisticsClientV1';
//import { IStatisticsController } from 'service-statistics-node';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';

export class StatisticsDirectClientV1 extends DirectClient<any> implements IStatisticsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-statistics", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        let timing = this.instrument(correlationId, 'statistics.get_groups');
          
        try {
            return await this._controller.getGroups(correlationId, paging);
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
            return await this._controller.getCounters(correlationId, filter, paging);
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
            return await this._controller.incrementCounter(correlationId, group, name, time, timezone, value);
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
            await this._controller.incrementCounters(correlationId, increments);
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
            return await this._controller.readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone);
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
            return await this._controller.readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone);
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
            return await this._controller.readCounters(correlationId, counters, type, fromTime, toTime, timezone);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }   
    }
}
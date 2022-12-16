"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsCommandableLambdaClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class StatisticsCommandableLambdaClientV1 extends pip_services3_aws_nodex_1.CommandableLambdaClient {
    constructor(config) {
        super('statistics');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getGroups(correlationId, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_groups', correlationId, {
                paging: paging
            });
        });
    }
    getCounters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_counters', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    incrementCounter(correlationId, group, name, time, timezone, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('increment_counter', correlationId, {
                group: group,
                name: name,
                time: time,
                timezone: timezone,
                value: value
            });
        });
    }
    incrementCounters(correlationId, increments) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('increment_counters', correlationId, {
                increments: increments
            });
        });
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_one_counter', correlationId, {
                group: group,
                name: name,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            });
        });
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_counters_by_group', correlationId, {
                group: group,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            });
        });
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_counters', correlationId, {
                counters: counters,
                type: type,
                from_time: fromTime,
                to_time: toTime,
                timezone: timezone
            });
        });
    }
}
exports.StatisticsCommandableLambdaClientV1 = StatisticsCommandableLambdaClientV1;
//# sourceMappingURL=StatisticsCommandableLambdaClientV1.js.map
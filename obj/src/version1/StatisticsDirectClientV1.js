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
exports.StatisticsDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class StatisticsDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_2.Descriptor("service-statistics", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getGroups(correlationId, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.get_groups');
            try {
                let res = yield this._controller.getGroups(correlationId, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    getCounters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.get_counters');
            try {
                let res = yield this._controller.getCounters(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    incrementCounter(correlationId, group, name, time, timezone, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.increment_counter');
            try {
                let res = yield this._controller.incrementCounter(correlationId, group, name, time, timezone, value);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    incrementCounters(correlationId, increments) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.increment_counters');
            try {
                yield this._controller.incrementCounters(correlationId, increments);
                timing.endTiming();
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.read_one_counter');
            try {
                let res = yield this._controller.readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.read_counters_by_group');
            try {
                let res = yield this._controller.readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'statistics.read_counters');
            try {
                let res = yield this._controller.readCounters(correlationId, counters, type, fromTime, toTime, timezone);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.StatisticsDirectClientV1 = StatisticsDirectClientV1;
//# sourceMappingURL=StatisticsDirectClientV1.js.map
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
exports.StatisticsNullClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const StatCounterValueSetV1_1 = require("./StatCounterValueSetV1");
class StatisticsNullClientV1 {
    constructor(config) { }
    incrementCounter(correlationId, group, name, time, timezone, value) {
        return;
    }
    incrementCounters(correlationId, increments) {
        return;
    }
    getGroups(correlationId, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage([], 0);
        });
    }
    getCounters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage([], 0);
        });
    }
    readOneCounter(correlationId, group, name, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            return new StatCounterValueSetV1_1.StatCounterValueSetV1(group, name, type, []);
        });
    }
    readCountersByGroup(correlationId, group, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    readCounters(correlationId, counters, type, fromTime, toTime, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = counters.map(c => new StatCounterValueSetV1_1.StatCounterValueSetV1(c.group, c.name, type, []));
            return result;
        });
    }
}
exports.StatisticsNullClientV1 = StatisticsNullClientV1;
//# sourceMappingURL=StatisticsNullClientV1.js.map
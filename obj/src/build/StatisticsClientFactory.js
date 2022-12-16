"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const StatisticsNullClientV1_1 = require("../version1/StatisticsNullClientV1");
const StatisticsDirectClientV1_1 = require("../version1/StatisticsDirectClientV1");
const StatisticsCommandableHttpClientV1_1 = require("../version1/StatisticsCommandableHttpClientV1");
const StatisticsCommandableLambdaClientV1_1 = require("../version1/StatisticsCommandableLambdaClientV1");
class StatisticsClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(StatisticsClientFactory.NullClientV1Descriptor, StatisticsNullClientV1_1.StatisticsNullClientV1);
        this.registerAsType(StatisticsClientFactory.DirectClientV1Descriptor, StatisticsDirectClientV1_1.StatisticsDirectClientV1);
        this.registerAsType(StatisticsClientFactory.CmdHttpClientV1Descriptor, StatisticsCommandableHttpClientV1_1.StatisticsCommandableHttpClientV1);
        this.registerAsType(StatisticsClientFactory.CmdLambdaClientV1Descriptor, StatisticsCommandableLambdaClientV1_1.StatisticsCommandableLambdaClientV1);
    }
}
exports.StatisticsClientFactory = StatisticsClientFactory;
StatisticsClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'factory', 'default', 'default', '1.0');
StatisticsClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'client', 'null', 'default', '1.0');
StatisticsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'client', 'direct', 'default', '1.0');
StatisticsClientFactory.CmdHttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'client', 'commandable-http', 'default', '1.0');
StatisticsClientFactory.CmdLambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'client', 'commandable-lambda', 'default', '1.0');
//# sourceMappingURL=StatisticsClientFactory.js.map
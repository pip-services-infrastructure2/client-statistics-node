import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { StatisticsNullClientV1 } from '../version1/StatisticsNullClientV1';
import { StatisticsDirectClientV1 } from '../version1/StatisticsDirectClientV1';
import { StatisticsCommandableHttpClientV1 } from '../version1/StatisticsCommandableHttpClientV1';
import { StatisticsCommandableLambdaClientV1 } from '../version1/StatisticsCommandableLambdaClientV1';

export class StatisticsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-statistics', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-statistics', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-statistics', 'client', 'direct', 'default', '1.0');
	public static CmdHttpClientV1Descriptor = new Descriptor('service-statistics', 'client', 'commandable-http', 'default', '1.0');
	public static CmdLambdaClientV1Descriptor = new Descriptor('service-statistics', 'client', 'commandable-lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(StatisticsClientFactory.NullClientV1Descriptor, StatisticsNullClientV1);
		this.registerAsType(StatisticsClientFactory.DirectClientV1Descriptor, StatisticsDirectClientV1);
		this.registerAsType(StatisticsClientFactory.CmdHttpClientV1Descriptor, StatisticsCommandableHttpClientV1);
		this.registerAsType(StatisticsClientFactory.CmdLambdaClientV1Descriptor, StatisticsCommandableLambdaClientV1);
	}
	
}

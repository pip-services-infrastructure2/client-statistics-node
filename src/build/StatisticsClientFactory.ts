import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { StatisticsNullClientV1 } from '../version1/StatisticsNullClientV1';
import { StatisticsDirectClientV1 } from '../version1/StatisticsDirectClientV1';
import { StatisticsHttpClientV1 } from '../version1/StatisticsHttpClientV1';

export class StatisticsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-statistics', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-statistics', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-statistics', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-statistics', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(StatisticsClientFactory.NullClientV1Descriptor, StatisticsNullClientV1);
		this.registerAsType(StatisticsClientFactory.DirectClientV1Descriptor, StatisticsDirectClientV1);
		this.registerAsType(StatisticsClientFactory.HttpClientV1Descriptor, StatisticsHttpClientV1);
	}
	
}

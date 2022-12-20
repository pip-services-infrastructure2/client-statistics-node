import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { StatisticsMemoryPersistence } from 'service-statistics-node';
import { StatisticsController } from 'service-statistics-node';
import { StatisticsCommandableHttpServiceV1 } from 'service-statistics-node';
import { StatisticsCommandableHttpClientV1 } from '../../src/version1/StatisticsCommandableHttpClientV1';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('StatisticsCommandableHttpClientV1', ()=> {
    let service: StatisticsCommandableHttpServiceV1;
    let client: StatisticsCommandableHttpClientV1;
    let fixture: StatisticsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new StatisticsMemoryPersistence();
        let controller = new StatisticsController();

        service = new StatisticsCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-statistics', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-statistics', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-statistics', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new StatisticsCommandableHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new StatisticsClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { StatisticsMemoryPersistence } from 'service-statistics-node';
import { StatisticsController } from 'service-statistics-node';
import { StatisticsDirectClientV1 } from '../../src/version1/StatisticsDirectClientV1';
import { StatisticsClientFixtureV1 } from './StatisticsClientFixtureV1';

suite('StatisticsDirectClientV1', ()=> {
    let client: StatisticsDirectClientV1;
    let fixture: StatisticsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new StatisticsMemoryPersistence();
        let controller = new StatisticsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-statistics', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-statistics', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new StatisticsDirectClientV1();
        client.setReferences(references);

        fixture = new StatisticsClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});

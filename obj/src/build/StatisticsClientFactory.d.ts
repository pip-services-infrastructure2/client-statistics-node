import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';
export declare class StatisticsClientFactory extends Factory {
    static Descriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static CmdHttpClientV1Descriptor: Descriptor;
    static CmdLambdaClientV1Descriptor: Descriptor;
    constructor();
}

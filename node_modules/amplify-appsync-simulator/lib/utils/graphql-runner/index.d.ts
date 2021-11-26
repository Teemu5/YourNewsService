import { JWTToken, IAMToken } from '../auth-helpers/helpers';
import { AmplifyAppSyncSimulatorAuthenticationType } from '../../type-definition';
export declare type AppSyncGraphQLExecutionContext = {
    readonly sourceIp?: string;
    readonly jwt?: JWTToken;
    readonly iamToken?: IAMToken;
    headers: Record<string, string | string[]>;
    appsyncErrors?: Error[];
    requestAuthorizationMode: AmplifyAppSyncSimulatorAuthenticationType;
};
export * from './subscriptions-filter';

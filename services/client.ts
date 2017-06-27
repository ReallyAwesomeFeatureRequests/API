import {inject, injectable} from "inversify";

import {Service} from "./base-service";
import {iocTypes} from "../ioc-types";
import {ClientDbSchema} from "../schema/client";

@injectable()
export class ClientService extends Service {
    constructor(@inject(iocTypes.ClientDbSchema) clientDbSchema: ClientDbSchema) {
        super(clientDbSchema);
    }
}

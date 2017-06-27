import {inject, injectable} from "inversify";

import {Service} from "./base-service";
import {iocTypes} from "../ioc-types";
import {ThreadDbSchema} from "../schema/thread";

@injectable()
export class ThreadService extends Service {
    constructor(@inject(iocTypes.ThreadDbSchema) threadDbSchema: ThreadDbSchema) {
        super(threadDbSchema);
    }

    async getManyForFeature(id): Promise<any[]> {
        return this.dbSchema.schema.findAll({
            where: {feature: id},
            order: [
                ['updatedAt', 'DESC']
            ]
        });
    }
}

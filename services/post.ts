import {inject, injectable} from "inversify";
import * as assert from "assert";

import {Service} from "./base-service";
import {iocTypes} from "../ioc-types";
import {PostDbSchema} from "../schema/post";

@injectable()
export class PostService extends Service {
    constructor(@inject(iocTypes.PostDbSchema) postDbSchema: PostDbSchema) {
        super(postDbSchema);
    }

    async getManyForThread(id, page, limit): Promise<any[]> {
        assert(id, `Called getManyForThread with no id`);
        assert(page, `Called getManyForThread with no page`);
        assert(typeof limit === "number" && limit >= 0, `Called getManyForThread with no limit`);

        const skip = (page - 1) * limit;
        return this.dbSchema.schema.findAll({
            where: {thread: id},
            order: [
                ['createdAt', 'DESC']
            ],
            offset: skip,
            limit: limit
        });
    }

    async getCountForThread(id): Promise<number> {
        return this.dbSchema.schema.count({
            where: {thread: id}
        });
    }
}

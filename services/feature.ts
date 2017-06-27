import {inject, injectable} from "inversify";

import {Service} from "./base-service";
import {iocTypes} from "../ioc-types";
import {FeatureDbSchema} from "../schema/feature";
import * as assert from "assert";

@injectable()
export class FeatureService extends Service {
    constructor(@inject(iocTypes.FeatureDbSchema) private featureDbSchema: FeatureDbSchema) {
        super(featureDbSchema);
    }

    async getCountWithClient(client: number): Promise<number> {
        if (!client) {
            return super.getCount();
        }

        return this.featureDbSchema.schema.count({where: {client: client}});
    }

    async getManyWithClient(page: number, limit: number, client: number): Promise<any[]> {
        assert(page, `Called getMany with no page`);
        assert(typeof limit === "number" && limit >= 0, `Called getMany with no limit`);

        if (!client) {
            return super.getMany(page, limit);
        }

        const skip = (page - 1) * limit;
        return this.featureDbSchema.schema.findAll({
            offset: skip,
            limit: limit,
            where: {client: client}
        });
    }

    async create(args): Promise<any> {
        const {id} = await  super.create(args);

        await this.normalizeClientPriority(id);
        return this.getOne(id);
    }

    async destroy(id: string): Promise<any> {
        await super.destroy(id);

        await this.normalizeClientPriority(id);
        return this.getOne(id);
    }

    async update(id: string, args): Promise<any> {
        await super.update(id, args);

        await this.normalizeClientPriority(id);
        return this.getOne(id);
    }

    async close(id: string): Promise<any> {
        assert(id, `Called close with no id`);

        await this.dbSchema.schema.update({status: 'CLOSED'}, {where: {id: id}, limit: 1});

        await this.normalizeClientPriority(id);
        return this.getOne(id);
    }

    //todo not working preperyl for updating
    async getManyOpenRequestsForClient(clientId: string): Promise<any> {
        assert(clientId, `Called getManyForClient with no clientId`);

        //get all open requests from this client, sorted by priority going up then updated date going down
        return this.dbSchema.schema.findAll({
            where: {client: clientId, status: 'OPEN'},
            order: [
                ['clientPriority', 'ASC'],
                ['updatedAt', 'DESC'],
            ]
        });
    }

    private async normalizeClientPriority(id: string) {
        const featureRequests = await this.getManyOpenRequestsForClient(id);

        for (let index = 0; index < featureRequests.length; index++) {
            const featureRequest = featureRequests[index];
            const expectedPriority = index + 1;

            // if the priority is what we expect, then move on
            if (featureRequest.clientPriority === expectedPriority) {
                continue;
            }

            // otherwise update the record
            await this.update(featureRequest.id, {clientPriority: expectedPriority});
        }
    }
}

import {injectable} from "inversify";
import * as assert from "assert";

import {DbSchema} from "../schema/db-schema";

@injectable()
export abstract class Service {
    constructor(protected dbSchema: DbSchema) {
    }

    /**
     * Gets how many records there are in the database
     *
     * @returns {Promise<void>}
     */
    async getCount(): Promise<number> {
        return this.dbSchema.schema.count();
    }

    /**
     * Get many (all at the moment) records from the database
     *
     * @returns {Promise<any[]>}
     */
    async getMany(page: number, limit: number): Promise<any[]> {
        assert(page, `Called getMany with no page`);
        assert(typeof limit === "number" && limit >= 0, `Called getMany with no limit`);

        const skip = (page - 1) * limit;
        return this.dbSchema.schema.findAll({offset: skip, limit: limit});
    }

    /**
     * Gets a record from the database
     *
     * @param id
     * @returns {any}
     */
    async getOne(id): Promise<any> {
        assert(id, `Called getOne with no id`);

        return this.dbSchema.schema.findOne({where: {id: id}});
    }

    /**
     * Creates a record in db
     *
     * @param args
     * @returns {Promise<void>}
     */
    async create(args): Promise<any> {
        assert(args, `Called create with no args`);

        return this.dbSchema.schema.create(args);
    }

    /**
     * Destroys a record in database
     * @param id
     * @returns {Promise<void>}
     */
    async destroy(id): Promise<any> {
        assert(id, `Called destroy with no id`);

        return this.dbSchema.schema.destroy({where: {id: id}});
    }

    /**
     * Updates a record in database
     *
     * @param id
     * @param args
     * @returns {Promise<void>}
     */
    async update(id, args): Promise<any> {
        assert(id, `Called update with no id`);
        assert(args, `Called update with no args`);

        delete args.id;
        assert(!args.id, `Could not remove id from args`);

        await this.dbSchema.schema.update(args, {where: {id: id}, limit: 1});

        return this.getOne(id);
    }
}

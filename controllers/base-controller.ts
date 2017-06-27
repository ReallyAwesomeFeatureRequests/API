import {injectable} from "inversify";
import * as Boom from "boom";

import {Service} from "../services/base-service";

@injectable()
export abstract class Controller {
    protected internalServerErrorMessage: string;

    constructor(protected service: Service) {
        this.internalServerErrorMessage = `An unknown error has occurred. If this persists, please contact your administrator`;
    }

    async getMany(req, reply) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;

            const records = await this.service.getMany(page, limit);
            const totalCount = await this.service.getCount();

            reply(records).header('X-total-count', totalCount);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }

    async getOne(req, reply) {
        try {
            const record = await this.service.getOne(req.params.id);
            if (!record) {
                return reply(Boom.notFound(`Record not found`));
            }

            reply(record);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }

    async create(req, reply) {
        try {
            const record = await this.service.create(req.payload);

            reply(record).code(201);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }

    async destroy(req, reply) {
        try {
            const id = req.params.id;

            const record = await this.service.getOne(id);
            if (!record) {
                return reply(Boom.notFound(`Record not found`));
            }

            await this.service.destroy(id);

            reply(record);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }

    async update(req, reply) {
        try {
            const id = req.params.id;

            let record = await this.service.getOne(id);
            if (!record) {
                return reply(Boom.notFound(`Record not found`));
            }

            record = await this.service.update(id, req.payload);

            reply(record);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }
}

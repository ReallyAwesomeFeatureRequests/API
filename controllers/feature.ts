import {Controller} from "./base-controller";
import {inject, injectable} from "inversify";
import {iocTypes} from "../ioc-types";
import {FeatureService} from "../services/feature";
import * as Boom from "boom";

@injectable()
export class FeatureController extends Controller {
    constructor(@inject(iocTypes.FeatureService) private featureService: FeatureService) {
        super(featureService);
    }

    async getMany(req, reply) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const client = req.query.client;

            const records = await this.featureService.getManyWithClient(page, limit, client);
            const totalCount = await this.featureService.getCountWithClient(client);

            reply(records).header('X-total-count', totalCount);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }

    async close(req, reply) {
        try {
            const id = req.params.id;
            let record = await this.service.getOne(id);
            if (!record) {
                return reply(Boom.notFound(`Record not found`));
            }

            if (record.status !== 'OPEN') {
                return reply(Boom.badRequest(`Record isn't open`));
            }

            record = await this.featureService.close(id);

            reply(record);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }
}

import {inject, injectable} from "inversify";
import * as Boom from 'boom';

import {Controller} from "./base-controller";
import {iocTypes} from "../ioc-types";
import {ThreadService} from "../services/thread";

@injectable()
export class ThreadController extends Controller {
    constructor(@inject(iocTypes.ThreadService) private threadService: ThreadService) {
        super(threadService);
    }

    async getManyForFeature(req, reply) {
        try {
            const records = await this.threadService.getManyForFeature(req.params.id);

            reply(records);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }
}

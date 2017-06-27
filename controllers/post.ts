import {inject, injectable} from "inversify";
import * as Boom from "boom";

import {Controller} from "./base-controller";
import {iocTypes} from "../ioc-types";
import {PostService} from "../services/post";

@injectable()
export class PostController extends Controller {
    constructor(@inject(iocTypes.PostService) private postService: PostService) {
        super(postService);
    }

    async getManyForThread(req, reply) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;

            const records = await this.postService.getManyForThread(req.params.id, page, limit);
            const totalCount = await this.postService.getCountForThread(req.params.id);

            reply(records).header('X-total-count', totalCount);
        } catch (err) {
            console.error(err);
            reply(Boom.badImplementation(this.internalServerErrorMessage));
        }
    }
}

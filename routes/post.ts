import {Route} from "./base-route";
import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";
import {PostController} from "../controllers/post";
import {PostValidator} from "../validators/post";

@injectable()
export class PostRoute extends Route {
    constructor(@inject(iocTypes.Server) server: Server,
                @inject(iocTypes.PostController) private postController: PostController,
                @inject(iocTypes.PostValidator) private postValidator: PostValidator) {
        super(server);
    }

    addRoutes(): void {
        this.server.route({
            method: 'GET',
            path: `/threads/{id}/posts`,
            handler: (req, reply) => this.postController.getManyForThread(req, reply),
            config: {
                validate: this.postValidator.getManyForThreadValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/posts`,
            handler: (req, reply) => this.postController.getMany(req, reply),
            config: {
                validate: this.postValidator.getManyValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/posts/{id}`,
            handler: (req, reply) => this.postController.getOne(req, reply),
            config: {
                validate: this.postValidator.getOneValidation()
            }
        });

        this.server.route({
            method: 'DELETE',
            path: `/posts/{id}`,
            handler: (req, reply) => this.postController.destroy(req, reply),
            config: {
                validate: this.postValidator.destroyValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/posts`,
            handler: (req, reply) => this.postController.create(req, reply),
            config: {
                validate: this.postValidator.createValidation()
            }
        });

        this.server.route({
            method: 'PUT',
            path: `/posts/{id}`,
            handler: (req, reply) => this.postController.update(req, reply),
            config: {
                validate: this.postValidator.updateValidation()
            }
        });
    }
}

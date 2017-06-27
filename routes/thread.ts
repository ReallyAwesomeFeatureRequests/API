import {Route} from "./base-route";
import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";
import {ThreadController} from "../controllers/thread";
import {ThreadValidator} from "../validators/thread";

@injectable()
export class ThreadRoute extends Route {
    constructor(@inject(iocTypes.Server) server: Server,
                @inject(iocTypes.ThreadController) private threadController: ThreadController,
                @inject(iocTypes.ThreadValidator) private threadValidator: ThreadValidator) {
        super(server);
    }

    addRoutes(): void {
        this.server.route({
            method: 'GET',
            path: `/threads`,
            handler: (req, reply) => this.threadController.getMany(req, reply),
            config: {
                validate: this.threadValidator.getManyValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/threads/{id}`,
            handler: (req, reply) => this.threadController.getOne(req, reply),
            config: {
                validate: this.threadValidator.getOneValidation()
            }
        });

        this.server.route({
            method: 'DELETE',
            path: `/threads/{id}`,
            handler: (req, reply) => this.threadController.destroy(req, reply),
            config: {
                validate: this.threadValidator.destroyValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/threads`,
            handler: (req, reply) => this.threadController.create(req, reply),
            config: {
                validate: this.threadValidator.createValidation()
            }
        });

        this.server.route({
            method: 'PUT',
            path: `/threads/{id}`,
            handler: (req, reply) => this.threadController.update(req, reply),
            config: {
                validate: this.threadValidator.updateValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/features/{id}/threads`,
            handler: (req, reply) => this.threadController.getManyForFeature(req, reply),
            config: {
                validate: this.threadValidator.getManyForFeatureValidation()
            }
        });
    }
}

import {Route} from "./base-route";
import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";
import {FeatureController} from "../controllers/feature";
import {FeatureValidator} from "../validators/feature";

@injectable()
export class FeatureRoute extends Route {
    constructor(@inject(iocTypes.Server) server: Server,
                @inject(iocTypes.FeatureController) private featureController: FeatureController,
                @inject(iocTypes.FeatureValidator) private featureValidator: FeatureValidator) {
        super(server);
    }

    addRoutes(): void {
        this.server.route({
            method: 'GET',
            path: `/features`,
            handler: (req, reply) => this.featureController.getMany(req, reply),
            config: {
                validate: this.featureValidator.getManyValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/features/{id}`,
            handler: (req, reply) => this.featureController.getOne(req, reply),
            config: {
                validate: this.featureValidator.getOneValidation()
            }
        });

        this.server.route({
            method: 'DELETE',
            path: `/features/{id}`,
            handler: (req, reply) => this.featureController.destroy(req, reply),
            config: {
                validate: this.featureValidator.destroyValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/features`,
            handler: (req, reply) => this.featureController.create(req, reply),
            config: {
                validate: this.featureValidator.createValidation()
            }
        });

        this.server.route({
            method: 'PUT',
            path: `/features/{id}`,
            handler: (req, reply) => this.featureController.update(req, reply),
            config: {
                validate: this.featureValidator.updateValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/features/{id}/close`,
            handler: (req, reply) => this.featureController.close(req, reply),
            config: {
                validate: this.featureValidator.closeValidation()
            }
        });
    }
}

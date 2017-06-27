import {Route} from "./base-route";
import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";
import {ClientController} from "../controllers/client";
import {ClientValidator} from "../validators/client";

@injectable()
export class ClientRoute extends Route {
    constructor(@inject(iocTypes.Server) server: Server,
                @inject(iocTypes.ClientController) private clientController: ClientController,
                @inject(iocTypes.ClientValidator) private clientValidator: ClientValidator) {
        super(server);
    }

    addRoutes(): void {
        this.server.route({
            method: 'GET',
            path: `/clients`,
            handler: (req, reply) => this.clientController.getMany(req, reply),
            config: {
                validate: this.clientValidator.getManyValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/clients/{id}`,
            handler: (req, reply) => this.clientController.getOne(req, reply),
            config: {
                validate: this.clientValidator.getOneValidation()
            }
        });

        this.server.route({
            method: 'DELETE',
            path: `/clients/{id}`,
            handler: (req, reply) => this.clientController.destroy(req, reply),
            config: {
                validate: this.clientValidator.destroyValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/clients`,
            handler: (req, reply) => this.clientController.create(req, reply),
            config: {
                validate: this.clientValidator.createValidation()
            }
        });

        this.server.route({
            method: 'PUT',
            path: `/clients/{id}`,
            handler: (req, reply) => this.clientController.update(req, reply),
            config: {
                validate: this.clientValidator.updateValidation()
            }
        });
    }
}

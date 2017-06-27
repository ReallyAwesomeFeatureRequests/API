import {Route} from "./base-route";
import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";
import {ProductAreaController} from "../controllers/product-area";
import {ProductAreaValidator} from "../validators/product-area";

@injectable()
export class ProductAreaRoute extends Route {
    constructor(@inject(iocTypes.Server) server: Server,
                @inject(iocTypes.ProductAreaController) private productAreaController: ProductAreaController,
                @inject(iocTypes.ProductAreaValidator) private productAreaValidator: ProductAreaValidator) {
        super(server);
    }

    addRoutes(): void {
        this.server.route({
            method: 'GET',
            path: `/product-areas`,
            handler: (req, reply) => this.productAreaController.getMany(req, reply),
            config: {
                validate: this.productAreaValidator.getManyValidation()
            }
        });

        this.server.route({
            method: 'GET',
            path: `/product-areas/{id}`,
            handler: (req, reply) => this.productAreaController.getOne(req, reply),
            config: {
                validate: this.productAreaValidator.getOneValidation()
            }
        });

        this.server.route({
            method: 'DELETE',
            path: `/product-areas/{id}`,
            handler: (req, reply) => this.productAreaController.destroy(req, reply),
            config: {
                validate: this.productAreaValidator.destroyValidation()
            }
        });

        this.server.route({
            method: 'POST',
            path: `/product-areas`,
            handler: (req, reply) => this.productAreaController.create(req, reply),
            config: {
                validate: this.productAreaValidator.createValidation()
            }
        });

        this.server.route({
            method: 'PUT',
            path: `/product-areas/{id}`,
            handler: (req, reply) => this.productAreaController.update(req, reply),
            config: {
                validate: this.productAreaValidator.updateValidation()
            }
        });
    }
}

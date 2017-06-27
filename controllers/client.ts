import {Controller} from "./base-controller";
import {inject, injectable} from "inversify";
import {iocTypes} from "../ioc-types";
import {ClientService} from "../services/client";

@injectable()
export class ClientController extends Controller {
    constructor(@inject(iocTypes.ClientService) service: ClientService) {
        super(service);
    }
}

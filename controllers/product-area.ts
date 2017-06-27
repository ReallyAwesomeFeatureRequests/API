import {Controller} from "./base-controller";
import {inject, injectable} from "inversify";
import {iocTypes} from "../ioc-types";
import {ProductAreaService} from "../services/product-area";


@injectable()
export class ProductAreaController extends Controller {
    constructor(@inject(iocTypes.ProductAreaService) service: ProductAreaService) {
        super(service);
    }
}

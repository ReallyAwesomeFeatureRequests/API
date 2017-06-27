import {inject, injectable} from "inversify";

import {Service} from "./base-service";
import {iocTypes} from "../ioc-types";
import {ProductAreaDbSchema} from "../schema/product-area";

@injectable()
export class ProductAreaService extends Service {
    constructor(@inject(iocTypes.ProductAreaDbSchema) productAreaDbSchema: ProductAreaDbSchema) {
        super(productAreaDbSchema);
    }
}

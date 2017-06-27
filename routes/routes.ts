import {inject, injectable} from "inversify";

import {iocTypes} from "../ioc-types";
import {Route} from "./base-route";

@injectable()
export class Routes {
    constructor(@inject(iocTypes.ClientRoute) private clientRoute: Route,
                @inject(iocTypes.FeatureRoute) private featureRoute: Route,
                @inject(iocTypes.PostRoute) private postRoute: Route,
                @inject(iocTypes.ProductAreaRoute) private productAreaRoute: Route,
                @inject(iocTypes.ThreadRoute) private threadRoute: Route) {
    }

    public addAllRoutes() {
        this.clientRoute.addRoutes();
        this.featureRoute.addRoutes();
        this.postRoute.addRoutes();
        this.productAreaRoute.addRoutes();
        this.threadRoute.addRoutes();
    }
}

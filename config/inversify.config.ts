//import reflect metadata so we can inject in rest of application
import "reflect-metadata";

import {Container} from "inversify";

import {AppConfig} from "./app-config";
import {DbConnector} from "../db-connector";
import {Server} from "../server";
import {Routes} from "../routes/routes";
import {iocTypes} from "../ioc-types";
import {ClientService} from "../services/client";
import {ClientRoute} from "../routes/client";
import {ClientController} from "../controllers/client";
import {ClientDbSchema} from "../schema/client";
import {ClientValidator} from "../validators/client";
import {ProductAreaRoute} from "../routes/product-area";
import {ProductAreaController} from "../controllers/product-area";
import {ProductAreaValidator} from "../validators/product-area";
import {ProductAreaService} from "../services/product-area";
import {ProductAreaDbSchema} from "../schema/product-area";
import {PostService} from "../services/post";
import {PostValidator} from "../validators/post";
import {PostController} from "../controllers/post";
import {PostRoute} from "../routes/post";
import {FeatureDbSchema} from "../schema/feature";
import {FeatureService} from "../services/feature";
import {FeatureValidator} from "../validators/feature";
import {FeatureController} from "../controllers/feature";
import {FeatureRoute} from "../routes/feature";
import {PostDbSchema} from "../schema/post";
import {ThreadRoute} from "../routes/thread";
import {ThreadController} from "../controllers/thread";
import {ThreadValidator} from "../validators/thread";
import {ThreadService} from "../services/thread";
import {ThreadDbSchema} from "../schema/thread";
import {App} from "../app";

export const iocContainer = new Container({defaultScope: "Singleton"});
export function initializeBindings() {
    if (iocContainer.isBound(iocTypes.App)) {
        return;
    }

    iocContainer.bind<AppConfig>(iocTypes.AppConfig).to(AppConfig);
    iocContainer.bind<DbConnector>(iocTypes.DbConnector).to(DbConnector);
    iocContainer.bind<Server>(iocTypes.Server).to(Server);
    iocContainer.bind<App>(iocTypes.App).to(App);

    // Routes
    iocContainer.bind<Routes>(iocTypes.Routes).to(Routes);

    // Client
    iocContainer.bind<ClientRoute>(iocTypes.ClientRoute).to(ClientRoute);
    iocContainer.bind<ClientController>(iocTypes.ClientController).to(ClientController);
    iocContainer.bind<ClientValidator>(iocTypes.ClientValidator).to(ClientValidator);
    iocContainer.bind<ClientService>(iocTypes.ClientService).to(ClientService);
    iocContainer.bind<ClientDbSchema>(iocTypes.ClientDbSchema).to(ClientDbSchema);

    // ProductArea
    iocContainer.bind<ProductAreaRoute>(iocTypes.ProductAreaRoute).to(ProductAreaRoute);
    iocContainer.bind<ProductAreaController>(iocTypes.ProductAreaController).to(ProductAreaController);
    iocContainer.bind<ProductAreaValidator>(iocTypes.ProductAreaValidator).to(ProductAreaValidator);
    iocContainer.bind<ProductAreaService>(iocTypes.ProductAreaService).to(ProductAreaService);
    iocContainer.bind<ProductAreaDbSchema>(iocTypes.ProductAreaDbSchema).to(ProductAreaDbSchema);

    // Feature
    iocContainer.bind<FeatureRoute>(iocTypes.FeatureRoute).to(FeatureRoute);
    iocContainer.bind<FeatureController>(iocTypes.FeatureController).to(FeatureController);
    iocContainer.bind<FeatureValidator>(iocTypes.FeatureValidator).to(FeatureValidator);
    iocContainer.bind<FeatureService>(iocTypes.FeatureService).to(FeatureService);
    iocContainer.bind<FeatureDbSchema>(iocTypes.FeatureDbSchema).to(FeatureDbSchema);

    // Post
    iocContainer.bind<PostRoute>(iocTypes.PostRoute).to(PostRoute);
    iocContainer.bind<PostController>(iocTypes.PostController).to(PostController);
    iocContainer.bind<PostValidator>(iocTypes.PostValidator).to(PostValidator);
    iocContainer.bind<PostService>(iocTypes.PostService).to(PostService);
    iocContainer.bind<PostDbSchema>(iocTypes.PostDbSchema).to(PostDbSchema);

    // Thread
    iocContainer.bind<ThreadRoute>(iocTypes.ThreadRoute).to(ThreadRoute);
    iocContainer.bind<ThreadController>(iocTypes.ThreadController).to(ThreadController);
    iocContainer.bind<ThreadValidator>(iocTypes.ThreadValidator).to(ThreadValidator);
    iocContainer.bind<ThreadService>(iocTypes.ThreadService).to(ThreadService);
    iocContainer.bind<ThreadDbSchema>(iocTypes.ThreadDbSchema).to(ThreadDbSchema);
}

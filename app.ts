import {inject, injectable} from "inversify";

import {DbConnector} from "./db-connector";
import {Server} from "./server";
import {Routes} from "./routes/routes";
import {iocTypes} from "./ioc-types";

/**
 * The Application
 *
 * Initializes the server, sets the routes, makes sure everything is connected properly
 */
@injectable()
export class App {
    initialized: boolean;

    constructor(@inject(iocTypes.DbConnector) private dbConnector: DbConnector,
                @inject(iocTypes.Server) public  server: Server,
                @inject(iocTypes.Routes) private  routes: Routes) {
    }

    public async initializeApp() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;


        console.info(`Environment: ${process.env.NODE_ENV}`);

        // connect to the db
        await this.dbConnector.connection.authenticate();
        console.info(`Connected to database`);

        // init server
        await this.server.initializeServer();
        const serverUri = JSON.stringify(this.server.server.info.uri);
        console.info(`Started server at ${serverUri}`);

        // add all routes
        this.routes.addAllRoutes();

        // add sanity route check
        this.server.server.route({
            method: "GET",
            path: '/',
            handler: (req, reply) => reply('SANITY!!!')
        });
    }
}

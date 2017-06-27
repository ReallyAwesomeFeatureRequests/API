import {inject, injectable} from "inversify";
import {Server} from "../server";
import {iocTypes} from "../ioc-types";

@injectable()
export abstract class Route {
    constructor(@inject(iocTypes.Server) private _server: Server) {
    }

    protected get server() {
        return this._server.server;
    }

    abstract addRoutes(): void;
}

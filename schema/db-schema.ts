import {inject, injectable} from "inversify";
import {iocTypes} from "../ioc-types";
import {DbConnector} from "../db-connector";

@injectable()
export abstract class DbSchema {
    schema;

    constructor(@inject(iocTypes.DbConnector) protected dbConnector: DbConnector) {
        this.schema = dbConnector.connection.import(this.getModel())
    }

    abstract getModel();
}

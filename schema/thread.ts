import {inject, injectable} from "inversify";
import {DbSchema} from "./db-schema";
import {DbConnector} from "../db-connector";
import {iocTypes} from "../ioc-types";

@injectable()
export class ThreadDbSchema extends DbSchema {
    constructor(@inject(iocTypes.DbConnector) dbConnector: DbConnector) {
        super(dbConnector);
    }

    getModel() {
        return `../models/thread`;
    }
}

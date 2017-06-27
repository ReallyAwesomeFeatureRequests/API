import * as Sequelize from 'sequelize';
import {inject, injectable} from 'inversify';

import {AppConfig} from './config/app-config';
import {iocTypes} from './ioc-types';

@injectable()
export class DbConnector {
    connection;

    constructor(@inject(iocTypes.AppConfig) private appConfig: AppConfig) {
        const dbConnectionOptions = {
            dbName: this.appConfig.database.name,
            dbUsername: this.appConfig.database.username,
            dbPassword: this.appConfig.database.password,
            dbHost: this.appConfig.database.host,
            dbDialect: this.appConfig.database.dialect,
            dbLogging: this.appConfig.database.logging,
            dbPort: this.appConfig.database.port
        };

        this.connection = this.createConnection(dbConnectionOptions);
    }

    private createConnection({dbName, dbUsername, dbPassword, dbHost, dbDialect, dbLogging}) {
        return new Sequelize(`${dbDialect}://${dbUsername}${dbPassword ? ':' + dbPassword : ''}@${dbHost}/${dbName}`, {
            logging: dbLogging
        });
    }
}

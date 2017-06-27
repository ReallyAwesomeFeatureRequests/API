import {injectable} from "inversify";

@injectable()
export class AppConfig {
    server: ServerConfig;
    database: DatabaseConfig;

    constructor() {
        this.initializeServer();
        this.initializeDatabse();
    }

    private initializeServer() {
        const portNumber = this.normalizePortNumber(process.env.PORT) || 3000;

        this.server = {
            portNumber: portNumber
        };
    }

    private initializeDatabse() {
        const portNumber = this.normalizePortNumber(process.env.RAFR_DB_PORT) || 3306;

        this.database = {
            name: process.env.RAFR_DB_NAME,
            username: process.env.RAFR_DB_USERNAME,
            password: process.env.RAFR_DB_PASSWORD,
            host: `${process.env.RAFR_DB_HOST}:${portNumber}`,
            port: portNumber,
            dialect: "mysql",
            logging: console.log,
        };
    }

    private normalizePortNumber(port){
        const portNumber = parseInt(port);
        if (!isNaN(portNumber) && portNumber > 0) {
            return portNumber;
        }
    }
}

interface ServerConfig {
    portNumber: number,
    host?: string
}

interface DatabaseConfig {
    name: string,
    username: string,
    password: string,
    host: string,
    port: number,
    dialect: string,
    logging: any
}

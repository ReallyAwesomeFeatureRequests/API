import * as hapi from "hapi";
import * as good from "good";
import {inject, injectable} from "inversify";

import {AppConfig} from "./config/app-config";
import {iocTypes} from "./ioc-types";

@injectable()
export class Server {
    server;
    initialized: boolean;

    constructor(@inject(iocTypes.AppConfig) private appConfig: AppConfig) {
        this.server = new hapi.Server();
    }

    public async initializeServer() {
        if(this.initialized){
            return;
        }
        this.initialized = true;

        //set connection
        this.server.connection({
            host: this.appConfig.server.host,
            port: this.appConfig.server.portNumber,
            routes: {
                cors: {
                    additionalExposedHeaders: [`X-total-count`]
                }
            }
        });

        // add logging
        await this.registerLogger();

        // start the server server
        return new Promise((resolve, reject) => this.server.start(err => {
            if (err) {
                return reject(err);
            }

            resolve();
        }));
    }

    /**
     * Adds logging to stdout for responses
     * @returns {Promise<T>}
     */
    private async registerLogger() {
        return new Promise((resolve, reject) => this.server.register({
            register: good,
            options: {
                reporters: {
                    myConsoleReporter: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{log: '*', response: '*'}]
                    }, {
                        module: 'good-console'
                    }, 'stdout']
                }
            }
        }, err => {
            if (err) {
                return reject(err);
            }

            resolve();
        }));
    }
}

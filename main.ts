import {initializeBindings, iocContainer} from "./config/inversify.config";
import {App} from "./app";
import {iocTypes} from "./ioc-types";

// initialize the ioc bindings so we can inject properly
initializeBindings();

// create instance of app and inject dependencies
const app = iocContainer.get<App>(iocTypes.App);

// initialize app
app.initializeApp()
    .catch(handleUncaughtError);

process.on('uncaughtException', handleUncaughtError);
process.on('unhandledRejection', (reason, promise) =>
    console.warn(`Unhandled Rejection at: Promise ${promise}, reason: ${reason}`)
);

function handleUncaughtError(error) {
    // if there is an uncaught error log it and exit the application
    // NOTE: exiting an application is really bad but this isn't gonna happen unless something really really catastrophic happens, at which point out best bet is to kill this node process and alert the process manager running it that we did. The manager will the take care of running a new process so we have no down time
    console.error(error);
    process.exit(-1);
}

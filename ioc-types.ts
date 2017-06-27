/**
 * The Types that are to bind to instances for dependency injection.
 *
 * Types should always be Symbols
 * @type {{}}
 */
export const iocTypes = {
    App: Symbol("App"),
    AppConfig: Symbol("AppConfig"),
    DbConnector: Symbol("DbConnector"),
    Server: Symbol("Server"),
    Routes: Symbol("Routes"),
    DbSchema: Symbol("DbSchema"),

    ClientService: Symbol("ClientService"),
    ClientRoute: Symbol("ClientRoute"),
    ClientController: Symbol("ClientController"),
    ClientDbSchema: Symbol("ClientDbSchema"),
    ClientValidator: Symbol("ClientValidator"),

    ProductAreaService: Symbol("ProductAreaService"),
    ProductAreaRoute: Symbol("ProductAreaRoute"),
    ProductAreaController: Symbol("ProductAreaController"),
    ProductAreaDbSchema: Symbol("ProductAreaDbSchema"),
    ProductAreaValidator: Symbol("ProductAreaValidator"),

    FeatureService: Symbol("FeatureService"),
    FeatureRoute: Symbol("FeatureRoute"),
    FeatureController: Symbol("FeatureController"),
    FeatureDbSchema: Symbol("FeatureDbSchema"),
    FeatureValidator: Symbol("FeatureValidator"),

    PostService: Symbol("PostService"),
    PostRoute: Symbol("PostRoute"),
    PostController: Symbol("PostController"),
    PostDbSchema: Symbol("PostDbSchema"),
    PostValidator: Symbol("PostValidator"),

    ThreadService: Symbol("ThreadService"),
    ThreadRoute: Symbol("ThreadRoute"),
    ThreadController: Symbol("ThreadController"),
    ThreadDbSchema: Symbol("ThreadDbSchema"),
    ThreadValidator: Symbol("ThreadValidator")
};

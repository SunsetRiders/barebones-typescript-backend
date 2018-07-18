import * as Express from "express";
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import * as ExpressXRequestId from "express-x-request-id";
import * as Logger from "logger";
import * as ExpressErrorHandler from "express-error-handler";
import RouterMiddleware from "./router-middleware";
import RouteV1 from "../../layer/controller/v1";
import Config from "../environment/config";
import { IConfig } from "../environment/i-config";
import PostgresConnectionFactory from "../../layer/repository/factory/postrgres-connection-factory";

class Server {

  public readonly app: Express.Application;
  public readonly config: IConfig;
  public postgresConnectionPool;

  constructor(
    app: Express.Application = Express(),
    config: IConfig = Config.configFactory()
  ) {
    this.app = app;
    this.config = config;
  }

  public startDatabasePool(logger: Logger): void {
    this.postgresConnectionPool = new PostgresConnectionFactory(logger).fabricate();
  }

  public loadMiddleware(): void {
    this.app.use(Cors());
    this.app.use(BodyParser.json());
    this.app.use(ExpressXRequestId.requestMiddleware);
    this.app.use(ExpressXRequestId.responseMiddleware);
    this.app.use(Logger.injectLogger(this.config.logs));
    this.app.use(Logger.injectRequestLogger(this.config.logs));
    this.app.use(RouterMiddleware.initialMiddleware);
    this.app.use((req, res, next) => {
      req["pgDb"]  = this.postgresConnectionPool || null;
      return next();
    });
    this.app.use("/api/v1", RouteV1);
    this.app.use(RouterMiddleware.responseParser);
    this.app.use(RouterMiddleware.sendResponse);
    this.app.use(ExpressErrorHandler.middleware);
  }

}

export default Server;

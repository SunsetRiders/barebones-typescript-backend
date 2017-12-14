import * as Express from "express";
import * as GetConfig from "getconfig";
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import * as ExpressXRequestId from "express-x-request-id";
import * as Logger from "logger";
import * as ExpressErrorHandler from "express-error-handler";
import MiddlewareService from "../../layer/service/middleware-service";
import RouteV1 from "../../layer/service/v1";

class Server {

  public readonly app: any;

  constructor() {
    this.app = Express();
    this.callMiddleware();
  }

  private callMiddleware(): void {
    this.app.use(Cors());
    this.app.use(BodyParser.json());
    this.app.use(ExpressXRequestId.requestMiddleware);
    this.app.use(ExpressXRequestId.responseMiddleware);
    this.app.use(Logger.injectLogger(global.app.config.get("logs")));
    this.app.use(Logger.injectRequestLogger());
    this.app.use(MiddlewareService.initialMiddleware);
    this.app.use("/api/v1", RouteV1);
    this.app.use(MiddlewareService.responseValidatorMw);
    this.app.use(MiddlewareService.sendResponseMw);
    this.app.use(ExpressErrorHandler.middleware);
  }

}

export default Server;

import "reflect-metadata"; // Always first
// tslint:disable-next-line:ordered-imports
import * as bodyParser from "body-parser";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { Database } from "sqlite3";
import "./controllers/websiteController";
import { Website } from "./models/Website";
import { WebsiteRepository } from "./repositories/websiteRepository";
import { WebsiteRepositoryImpl } from "./repositories/websiteRepositoryImpl";
import { TYPES } from "./types";

export class Server {
  readonly container: Container;

  constructor() {
    this.container = new Container();
    this.container
      .bind<WebsiteRepository>(TYPES.WebsiteRepository)
      .to(WebsiteRepositoryImpl);

    this.container
      .bind<Database>(TYPES.Database)
      .toDynamicValue(() => new Database("db.sqlite3"));
  }

  get(): InversifyExpressServer {
    const server = new InversifyExpressServer(this.container);
    server.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
    });
    return server;
  }
}

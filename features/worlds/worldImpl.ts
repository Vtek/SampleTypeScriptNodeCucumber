import { World } from "cucumber";
import { setWorldConstructor } from "cucumber";
import { Database } from "sqlite3";
import { Server } from "../../src/server";
import { TYPES } from "../../src/types";
import { Context } from "./context";

export class WorldImpl implements World {
  readonly server: Server;

  constructor() {
    this.server = new Server();
    this.server.container
      .rebind<Database>(TYPES.Database)
      .toDynamicValue(() => new Database(":memory:"))
      .inSingletonScope();
  }

  getContext<TContext extends Context>(c: {
    new (server: Server): TContext;
  }): TContext {
    return new c(this.server);
  }
}

setWorldConstructor(WorldImpl);

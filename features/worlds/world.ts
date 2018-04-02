import { World } from "cucumber";
import { Server } from "../../src/server";
import { Context } from "./context";

declare module "cucumber" {
  interface World {
    readonly server: Server;
    getContext<TContext extends Context>(c: {
      new (server: Server): TContext;
    }): TContext;
  }
}

import { Server } from "../../src/server";

export abstract class Context {
  readonly server: Server;
  constructor(server: Server) {
    this.server = server;
  }
}

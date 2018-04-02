import { Server } from "../../../src/server";
import { Context } from "../../worlds/context";

export class AddContext extends Context {
  actual: {
    statusCode: number;
  };

  constructor(server: Server) {
    super(server);
  }
}

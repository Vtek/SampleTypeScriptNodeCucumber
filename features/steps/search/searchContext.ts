import { Database } from "sqlite3";
import { Website } from "../../../src/models/Website";
import { Server } from "../../../src/server";
import { TYPES } from "../../../src/types";
import { Context } from "../../worlds/context";

export class SearchContext extends Context {
  actual: {
    statusCode: number;
    websites: Website[];
  };

  constructor(server: Server) {
    super(server);
  }

  add(website: Website): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const database = this.server.container.get<Database>(TYPES.Database);
      database.serialize(() => {
        const statement = database.prepare(
          "INSERT INTO Website VALUES(?, ?, ?)"
        );
        statement.run(
          [website.url, website.title, website.description],
          err => {
            if (err) {
              reject(err);
            }
            statement.finalize();
            resolve();
          }
        );
      });
    });
  }
}

import { TableDefinition } from "cucumber";
import { Website } from "../../src/models/Website";

export function convertToWebsites(table: TableDefinition): Website[] {
  const websites: Website[] = [];
  const rows = table.rows();
  for (let i = 0, l = rows.length; i < l; i++) {
    websites.push({
      description: rows[i][2],
      title: rows[i][1],
      url: rows[i][0]
    });
  }
  return websites;
}

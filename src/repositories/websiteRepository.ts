import { Website } from "../models/Website";

export interface WebsiteRepository {
  search(value: string): Promise<Website[]>;
  add(website: Website): Promise<void>;
}

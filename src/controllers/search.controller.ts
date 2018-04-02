import * as express from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  queryParam,
  response
} from "inversify-express-utils";
import { Website } from "../models/website";
import { WebsiteRepository } from "../repositories/websiteRepository";
import { TYPES } from "../types";

@controller("/search")
export class SearchController implements interfaces.Controller {
  constructor(
    @inject(TYPES.WebsiteRepository)
    private websiteRepository: WebsiteRepository
  ) {}

  @httpGet("/")
  async index(@queryParam("value") value, @response() res: express.Response) {
    if (!value) {
      res.sendStatus(400);
    } else {
      const websites = await this.websiteRepository.search(value);
      res.status(200).send(websites);
    }
  }
}

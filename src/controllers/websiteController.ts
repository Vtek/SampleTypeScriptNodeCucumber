import * as express from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  request,
  response
} from "inversify-express-utils";
import { Website } from "../models/website";
import { WebsiteRepository } from "../repositories/websiteRepository";
import { TYPES } from "../types";

@controller("/website")
export class WebsiteController implements interfaces.Controller {
  constructor(
    @inject(TYPES.WebsiteRepository)
    private websiteRepository: WebsiteRepository
  ) {}

  @httpGet("/")
  async index(@queryParam("search") value, @response() res: express.Response) {
    if (!value) {
      res.sendStatus(400);
    } else {
      const websites = await this.websiteRepository.search(value);
      res.status(200).send(websites);
    }
  }

  @httpPost("/")
  async post(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    await this.websiteRepository.add(req.body);
    res.sendStatus(200);
  }
}

import chai = require("chai");
import { expect } from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

import {
  CallbackStepDefinition,
  Given,
  TableDefinition,
  Then,
  When,
  World
} from "cucumber";

import { Website } from "../../../src/models/website";
import { convertToWebsites } from "../../utils/websiteUtils";

import "../../hooks/websiteHooks";
import "../../worlds/world";
import { AddContext } from "./addContext";

let context: AddContext = null;

When("I add a website on Google with the following information", function(
  table: TableDefinition,
  done: CallbackStepDefinition
) {
  context = this.getContext(AddContext);
  const app = this.server.get().build();
  const website = convertToWebsites(table)[0];
  chai
    .request(app)
    .post(`/website`)
    .send(website)
    .end((err, res) => {
      context.actual = {
        statusCode: res.status
      };
      done();
    });
});

Then("the website is added", function(done: CallbackStepDefinition) {
  expect(context.actual).to.be.deep.equal({
    statusCode: 200
  });
  done();
});

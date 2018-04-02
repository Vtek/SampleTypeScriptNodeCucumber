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
import { SearchContext } from "./searchContext";

let context: SearchContext = null;

Given("these websites on the web", function(
  table: TableDefinition,
  done: CallbackStepDefinition
) {
  context = this.getContext(SearchContext);
  Promise.all(
    Array.from(convertToWebsites(table), website => context.add(website))
  ).then(() => done());
});

When("I search for {string} on Google", function(
  searchValue: string,
  done: CallbackStepDefinition
) {
  const app = this.server.get().build();
  chai
    .request(app)
    .get(`/website?search=${searchValue}`)
    .end((err, res) => {
      context.actual = {
        statusCode: res.status,
        websites: res.body as Website[]
      };
      done();
    });
});

Then("results are", function(
  table: TableDefinition,
  done: CallbackStepDefinition
) {
  const expectedWebsites = convertToWebsites(table);

  expect(context.actual).to.be.deep.equal({
    statusCode: 200,
    websites: expectedWebsites
  });

  done();
});

Then("i have an error", function(done: CallbackStepDefinition) {
  const expectedStatusCode = 400;
  expect(context.actual.statusCode).to.be.equal(expectedStatusCode);
  done();
});

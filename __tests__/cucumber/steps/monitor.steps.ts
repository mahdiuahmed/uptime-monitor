/* eslint-disable @typescript-eslint/no-explicit-any */
import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";

let mockChecks: any[] = [];
let response: any[] | null = null;

Given("I am an authenticated user", function () {
  mockChecks = [
    {
      id: "123",
      user_id: "user_1",
      name: "My Website",
      url: "https://example.com",
      status: "online",
      created_at: new Date().toISOString(),
    },
  ];
});

When("I fetch my dashboard data", function () {
  response = mockChecks;
});

Then("I should see at least 1 website check in the list", function () {
  assert.ok(response && response.length > 0, "No checks returned");
});

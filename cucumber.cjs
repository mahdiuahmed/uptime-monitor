// cucumber.js
module.exports = {
  default: {
    require: [
      "./__tests__/cucumber/steps/**/*.ts",
      "./__tests__/cucumber/steps/**/*.feature",
    ],
    requireModule: ["ts-node/register"],
    paths: ["./__tests__/cucumber/features/**/*.feature"],
  },
};

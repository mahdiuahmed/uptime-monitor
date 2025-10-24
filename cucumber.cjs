// cucumber.js
module.exports = {
  default: {
    require: ["./__tests__/steps/**/*.ts", "./__tests__/steps/**/*.feature"],
    requireModule: ["ts-node/register"],
    paths: ["./__tests__/features/**/*.feature"],
    // publishQuiet: true,
    // format: ["progress"],
  },
};

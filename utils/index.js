const paths = require("./paths");
const logger = require("./logger");
const fs = require("./fs");
const { generateModule, createBaseStructure, installDependencies } = require("./generator");

module.exports = {
  paths,
  logger,
  fs,
  generator: {
    generate: generateModule,
    createBaseStructure,
    installDependencies,
  },
};

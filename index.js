#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

// Register Express Commands
const createExpress = require('./commands/express/createExpress');
const addExpress = require('./commands/express/addExpress');

// Register Next.js Commands
const createNext = require('./commands/nextjs/createNext');
const addNext = require('./commands/nextjs/addNext');

program
  .name('clix')
  .description('Clix-CLI: A powerful scaffolding tool')
  .version('1.0.0');

// Initializing commands
createExpress(program);
addExpress(program);
createNext(program);
addNext(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
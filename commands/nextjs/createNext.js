module.exports = (program) => {
  program
    .command('create:next <name>')
    .description('Create a new Next.js project')
    .action(async (name) => {
      console.log('Next.js project creation coming soon!');
    });
};

module.exports = (program) => {
  program
    .command('add:next')
    .description('Add Next.js modules')
    .action(async () => {
      console.log('Next.js module addition coming soon!');
    });
};
